import { BlurView } from "expo-blur";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import SlideMenu from "../SlideMenu";

const { width } = Dimensions.get("window");

export default function ContactScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleCall = () => {
    Linking.openURL("tel:0113439956");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:info@nextlevelarena.co.za");
  };

  const handleSendMessage = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields before sending your message.",
      );
      return;
    }

    Alert.alert(
      "Message Sent!",
      `Thank you, ${name.trim()}! The Next Level team at info@nextlevelarena.co.za will get back to you regarding your enquiry within 24 hours.`,
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
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../../assets/images/contact.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Semi-transparent dark overlay for background dimming */}
        <View style={styles.backgroundOverlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* TOP HEADER */}
          <View style={styles.topHeader}>
            <View style={styles.logoBadge}>
              <Image
                source={require("../../../assets/images/logo.png")}
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
              <Text style={styles.mainTitle}>GET IN THE{"\n"}GAME</Text>
            </View>

            {/* FROSTED GLASS CONTACT INFO CARD */}
            <BlurView intensity={30} tint="dark" style={styles.glassContainer}>
              <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Visit Us</Text>
                <Text style={styles.infoValue}>
                  157 Gaming Street, Johannesburg, South Africa
                </Text>
              </View>

              <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Call Us</Text>
                <Pressable onPress={handleCall}>
                  <Text style={[styles.infoValue, styles.linkText]}>
                    011 343 9956
                  </Text>
                </Pressable>
              </View>

              <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Email Us</Text>
                <Pressable onPress={handleEmail}>
                  <Text style={[styles.infoValue, styles.linkText]}>
                    info@nextlevelarena.co.za
                  </Text>
                </Pressable>
              </View>

              <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Find Us</Text>
                <Text style={styles.infoValue}>
                  Mon - Sat | 09:00 am - 18:00 pm
                </Text>
              </View>
            </BlurView>

            {/* NEED HELP / FORM TITLE */}
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderTitle}>NEED HELP?</Text>
            </View>

            {/* CONTACT FORM */}
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name & Surname *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#888888"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Johndoe@example.com"
                  placeholderTextColor="#888888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0819924545"
                  placeholderTextColor="#888888"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Message *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Tell Us What You Need..."
                  placeholderTextColor="#888888"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={250}
                  value={message}
                  onChangeText={setMessage}
                />
                <Text style={styles.characterCounter}>
                  {message.length}/250
                </Text>
              </View>

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

            {/* OUR LOCATION SECTION */}
            <View style={styles.locationHeaderContainer}>
              <Text style={styles.subHeaderTitle}>OUR LOCATION</Text>
            </View>

            {/* LIGHT MODE MAP CONTAINER */}
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
                  userInterfaceStyle="light"
                >
                  <Marker
                    coordinate={{
                      latitude: -26.1946301,
                      longitude: 28.031902,
                    }}
                    title="Next Level Gaming"
                    description="157 Gaming Street, Johannesburg"
                  />
                </MapView>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
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
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  glassContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFFFFF88",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
    gap: 20,
  },
  infoGroup: {
    alignItems: "center",
  },
  infoLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  infoValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#FFFFFF",
  },
  subHeaderContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  locationHeaderContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  subHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "center",
  },
  formContainer: {
    gap: 15,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "300",
    color: "#000000",
    borderWidth: 1,
    borderColor: "#FF3B00",
  },
  textArea: {
    borderRadius: 20,
    height: 110,
    paddingTop: 12,
  },
  characterCounter: {
    color: "#FF3B00",
    fontSize: 16,
    textAlign: "right",
    marginTop: 2,
    paddingRight: 10,
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 0,
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  sendButtonText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.8,
  },
  mapCardContainer: {
    alignItems: "center",
  },
  mapCard: {
    width: "100%",
    height: 280,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 100,
    borderColor: "#FF3B00",
    overflow: "hidden",
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
});
