import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Animated Circular Image Badge Component
function CircularTextBadge() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.circularBadgeContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Image
          source={require("../../assets/images/spin.png")}
          style={styles.badgeImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../assets/images/about.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.75)", "#000000"]}
          locations={[0, 0.6, 1]}
          style={styles.gradientOverlay}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* TOP HEADER */}
            <View style={styles.topHeader}>
              <Pressable
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => router.replace("/(tabs)")}
              >
                <Ionicons name="arrow-back" size={20} color="#000000" />
              </Pressable>

              <View style={styles.logoBadge}>
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* HERO SECTION WITH SPINNING BADGE AND BODY TEXT */}
              <View style={styles.heroSection}>
                <View style={styles.titleColumn}>
                  <Text style={styles.aboutTitle}>ABOUT{"\n"}US</Text>

                  {/* ROTATING SPIN IMAGE BADGE */}
                  <CircularTextBadge />
                </View>

                <View style={styles.descriptionColumn}>
                  <Text style={styles.aboutDescription}>
                    Founded in 2023 in the heart of Johannesburg,{" "}
                    <Text style={styles.boldText}>
                      Next Level Gaming & Esports Arena
                    </Text>{" "}
                    was built by Jason Naidoo, an avid gamer who saw a major gap
                    in the local gaming scene. While South Africa's passion for
                    Esports and gaming was rapidly growing, access to
                    high-performance equipment, specialized arena setups, and
                    organized competitive events remained limited. Driven to
                    solve this, Jason set out to build a modern venue that
                    bridges the gap, offering a space where players of all skill
                    levels can access top-tier gear, join competitive
                    tournaments, and share their passion with a vibrant
                    community.
                  </Text>
                </View>
              </View>

              {/* HORIZONTALLY SCROLLING CARDS SECTION (OUR MISSION & OUR VISION) */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsScrollContent}
                snapToInterval={width * 0.54 + 15}
                decelerationRate="fast"
              >
                {/* OUR MISSION CARD */}
                <BlurView intensity={30} tint="dark" style={styles.glassCard}>
                  <Text style={styles.cardTitle}>OUR{"\n"}MISSION</Text>
                  <Text style={styles.cardDescription}>
                    We are dedicated to driving the expansion of South Africa's
                    Esports and gaming ecosystem. By combining modern hardware,
                    inclusive community spaces, and competitive events, Next
                    Level provides an accessible platform where casual players
                    can socialise and aspiring pro-gamers can hone their skills.
                  </Text>
                </BlurView>

                {/* OUR VISION CARD */}
                <BlurView intensity={30} tint="dark" style={styles.glassCard}>
                  <Text style={styles.cardTitle}>OUR{"\n"}VISION</Text>
                  <Text style={styles.cardDescription}>
                    To be Africa's premier gaming and Esports destination,
                    cultivating an inclusive community where every player, from
                    casual gamer to aspiring pro, can unlock their full
                    potential. Empowering gamers to play, connect, and compete
                    at the next level in a vibrant, inclusive space.
                  </Text>
                </BlurView>
              </ScrollView>

              {/* START GAMING BUTTON */}
              <View style={styles.actionContainer}>
                <Pressable
                  style={({ pressed }) => [
                    styles.startGamingButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => router.push("/offers")}
                >
                  <Text style={styles.startGamingText}>START GAMING</Text>
                </Pressable>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoBadge: {
    width: 44,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "space-between",
  },
  titleColumn: {
    width: "35%",
    alignItems: "flex-start",
  },
  aboutTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 20,
  },
  circularBadgeContainer: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeImage: {
    width: 120,
    height: 120,
  },
  descriptionColumn: {
    width: "55%",
  },
  aboutDescription: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "left",
  },
  boldText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardsScrollContent: {
    paddingHorizontal: 30,
    gap: 15,
    paddingBottom: 30,
  },
  glassCard: {
    width: width * 0.54,
    height: 280,
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: "#FFFFFF",
    padding: 20,
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 15,
  },
  cardDescription: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
    textAlign: "center",
  },
  actionContainer: {
    alignItems: "center",
  },
  startGamingButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  startGamingText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.8,
  },
});