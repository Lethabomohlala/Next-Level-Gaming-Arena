import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import SlideMenu from "./SlideMenu";

const { width } = Dimensions.get("window");

export default function ContactScreen() {
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Form Submission Handler
  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields before sending your message."
      );
      return;
    }

    Alert.alert(
      "Message Sent!",
      `Thank you, ${name.trim()}! We have received your inquiry and will contact you shortly.`,
      [
        {
          text: "OK",
          onPress: () => {
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safeArea}>
        {/* TOP HEADER */}
        <View style={styles.topHeader}>
          <View style={styles.logoBadge}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <SlideMenu />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* MAIN TITLE */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>
              <Text style={styles.sparkle}>✶ </Text>
              <Text style={styles.boldTitle}>GET </Text>
              <Text style={styles.thinTitle}>IN THE </Text>
              <Text style={styles.boldTitle}>GAME</Text>
              <Text style={styles.sparkle}> ✶</Text>
            </Text>
          </View>

          {/* CONTACT INFO DETAILS */}
          <View style={styles.infoSection}>
            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Visit Us</Text>
              <Text style={styles.infoValue}>
                157 Gaming Street, Johannesburg, South Africa
              </Text>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Call Us</Text>
              <Text style={styles.infoValue}>011 343 9956</Text>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Email Us</Text>
              <Text style={styles.infoValue}>info@nextlevelarena.co.za</Text>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Find Us</Text>
              <Text style={styles.infoValue}>
                Mon - Sat | 09:00 am - 18:00 pm
              </Text>
            </View>
          </View>

          {/* EMBEDDED MAP CONTAINER */}
          <View style={styles.mapCardContainer}>
            <View style={styles.mapCard}>
              <MapView
                style={styles.mapView}
                initialRegion={{
                  latitude: -26.1946301,
                  longitude: 28.031902,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                }}
                userInterfaceStyle="dark"
              >
                <Marker
                  coordinate={{
                    latitude: -26.1946301,
                    longitude: 28.031902,
                  }}
                  title="Next Level Gaming"
                  description="41 Juta St, Braamfontein"
                />
              </MapView>
            </View>
          </View>

          {/* SECONDARY TITLE */}
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderTitle}>
              <Text style={styles.boldTitle}>READY TO </Text>
              <Text style={styles.thinTitle}>MAKE YOUR MOVE?</Text>
            </Text>
          </View>

          {/* CONTACT FORM */}
          <View style={styles.formContainer}>
            {/* NAME & SURNAME */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name & Surname *</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#A0A0A0"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* EMAIL ADDRESS */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address *</Text>
              <TextInput
                style={styles.input}
                placeholder="Johndoe@example.com"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* PHONE NUMBER */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="081-992-4545"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* MESSAGE */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell us what you need..."
                placeholderTextColor="#A0A0A0"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {/* SUBMIT BUTTON */}
            <View style={styles.submitContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.sendButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>SEND MESSAGE</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* FLOATING BOTTOM TAB BAR */}
        <View style={styles.bottomBarContainer}>
          <View style={styles.bottomBar}>
            {/* HOME TAB */}
            <Pressable style={styles.tabItem} onPress={() => router.push("/")}>
              <Ionicons name="home-outline" size={20} color="#888888" />
            </Pressable>

            {/* OFFERS / PACKAGES TAB */}
            <Pressable
              style={styles.tabItem}
              onPress={() => router.push("/offers")}
            >
              <Ionicons name="bag-handle-outline" size={20} color="#888888" />
            </Pressable>

            {/* BOOKING TAB */}
            <Pressable
              style={styles.tabItem}
              onPress={() => router.push("/booking")}
            >
              <Ionicons name="pricetag-outline" size={20} color="#888888" />
            </Pressable>

            {/* CHAT / SUPPORT TAB (ACTIVE) */}
            <Pressable
              style={[styles.tabItem, styles.activeTab]}
              onPress={() => router.push("/contact")}
            >
              <Ionicons name="chatbubble" size={18} color="#FFFFFF" />
              <Text style={styles.activeTabText}>Contact Us</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 110,
  },

  /* Header */
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
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

  /* Main Title */
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    letterSpacing: 1,
    textAlign: "center",
  },
  boldTitle: {
    fontWeight: "800",
  },
  thinTitle: {
    fontWeight: "300",
  },
  sparkle: {
    color: "#FFFFFF",
  },

  /* Info Section */
  infoSection: {
    alignItems: "center",
    gap: 20,
    marginBottom: 30,
  },
  infoGroup: {
    alignItems: "center",
  },
  infoLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  infoValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },

  /* Map Container */
  mapCardContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  mapCard: {
    width: 350,
    height: 250,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF3B1D",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: {
    width: "100%",
    height: "100%",
  },

  /* Sub Header */
  subHeaderContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  subHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    letterSpacing: 1,
    textAlign: "center",
  },

  /* Form */
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 10,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000000",
  },
  textArea: {
    borderRadius: 20,
    height: 120,
    paddingTop: 14,
  },

  /* Submit Button */
  submitContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  sendButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.8,
  },

  /* Floating Bottom Navigation Bar */
  bottomBarContainer: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#000000",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#222222",
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "center",
    width: width * 0.88,
    justifyContent: "space-between",
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#FF3B1D",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
  },
  activeTabText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
  },
});