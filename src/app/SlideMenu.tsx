import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome5, Ionicons, FontAwesome6 } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

// Inline Icon Components
function MenuIcon({ size = 28, color = "#FFFFFF" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12H21M3 6H21M3 18H21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CloseIcon({ size = 28, color = "#FFFFFF" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function SlideMenu() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setModalVisible(true);
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.poly(4)),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible]);

  const navigateTo = (path: string) => {
    closeMenu();
    router.push(path as any);
  };

  return (
    <>
      {/* 3 Lines Hamburger Trigger Button */}
      <Pressable onPress={openMenu} style={styles.menuBtn}>
        <MenuIcon size={28} color="#FFFFFF" />
      </Pressable>

      {/* Slide-in Right Panel Modal */}
      <Modal visible={modalVisible} transparent animationType="none">
        <View style={styles.overlayContainer}>
          <Pressable style={styles.transparentBackdrop} onPress={closeMenu} />

          <Animated.View
            style={[
              styles.menuPanel,
              {
                paddingTop: insets.top + 16,
                paddingBottom: insets.bottom + 20,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Close Button */}
            <Pressable onPress={closeMenu} style={styles.closeBtn}>
              <CloseIcon size={28} color="#FFFFFF" />
            </Pressable>

            {/* Navigation Links */}
            <View style={styles.navLinks}>
              <Pressable onPress={() => navigateTo("/")}>
                <Text style={styles.navText}>HOME</Text>
              </Pressable>

              <Pressable onPress={() => navigateTo("/about")}>
                <Text style={styles.navText}>
                  ABOUT <Text style={styles.thinText}>US</Text>
                </Text>
              </Pressable>

              <Pressable onPress={() => navigateTo("/offers")}>
                <Text style={styles.navText}>OFFERINGS</Text>
              </Pressable>

              <Pressable onPress={() => navigateTo("/booking")}>
                <Text style={styles.navText}>BOOKINGS</Text>
              </Pressable>

              <Pressable onPress={() => navigateTo("/contact")}>
                <Text style={styles.navText}>
                  CONTACT <Text style={styles.thinText}>US</Text>
                </Text>
              </Pressable>
            </View>

            {/* Social Icons Footer */}
            <View style={styles.socialsContainer}>
              <Text style={styles.socialsTitle}>SOCIALS</Text>
              <View style={styles.socialIcons}>
                <Pressable>
                  <FontAwesome5 name="discord" size={20} color="#FFFFFF" />
                </Pressable>
                <Pressable>
                  <Ionicons name="logo-instagram" size={20} color="#FFFFFF" />
                </Pressable>
                <Pressable>
                  <FontAwesome6 name="x-twitter" size={18} color="#FFFFFF" />
                </Pressable>
                <Pressable>
                  <FontAwesome5 name="tiktok" size={18} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuBtn: {
    padding: 4,
  },
  overlayContainer: {
    flex: 1,
    flexDirection: "row",
  },
  transparentBackdrop: {
    width: width * 0.35,
    backgroundColor: "transparent",
  },
  menuPanel: {
    flex: 1,
    backgroundColor: "#5F1DAB",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B00",
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 15,
  },
  navLinks: {
    gap: 16,
    alignItems: "flex-end",
    paddingRight: 15,
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  thinText: {
    fontWeight: "300",
  },
  socialsContainer: {
    alignItems: "flex-end",
    paddingRight: 15,
    gap: 12,
  },
  socialsTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});