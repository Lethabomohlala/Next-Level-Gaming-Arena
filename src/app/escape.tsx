import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EscapeRoomScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../assets/images/escape.png")}
        style={styles.fullScreenBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.6)",
            "rgba(0,0,0,0.2)",
            "rgba(0,0,0,0.4)",
            "rgba(0,0,0,0.85)",
          ]}
          locations={[0, 0.25, 0.65, 1]}
          style={styles.gradientOverlay}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* TOP HEADER */}
            <View style={styles.topHeader}>
              <Pressable
                style={styles.backButton}
                onPress={() =>
                  router.push({
                    pathname: "/offers",
                    params: { existingItems: params?.existingItems },
                  })
                }
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
              {/* TOP: TITLE & PRICE */}
              <View style={styles.headerTitleSection}>
                <Text style={styles.mainTitle}>ESCAPE ROOM{"\n"}CHALLENGE</Text>
                <Text style={styles.priceTag}>R 750</Text>
              </View>

              {/* BOTTOM SECTION */}
              <View style={styles.bottomSection}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.cardBodyText}>
                    Test your logic, teamwork, and composure under pressure with
                    the <Text style={styles.boldText}>Escape Room Challenge!</Text>{" "}
                    Locked inside a themed, highly detailed physical environment,
                    you and your squad must work together to uncover hidden clues,
                    crack intricate codes, and solve a series of challenging puzzles
                    before the countdown hits zero. Designed to challenge
                    problem-solvers of all skill levels, this thrilling,
                    race-against-the-clock experience relies on sharp
                    communication and critical thinking. Can you solve the mystery,
                    beat the timer, and make your clean break?
                  </Text>

                  <View style={styles.includesSection}>
                    <Text style={styles.includesText}>
                      <Text style={styles.includesHeading}>INCLUDES</Text> ✦ Team
                      challenge ✦ Themed escape room ✦ Digital scorecard
                    </Text>
                  </View>
                </View>

                {/* CALL TO ACTION BUTTON */}
                <View style={styles.actionContainer}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.bookButton,
                      pressed && styles.bookButtonPressed,
                    ]}
                    onPress={() =>
                      router.push({
                        pathname: "/booking",
                      })
                    }
                  >
                    <Text style={styles.bookButtonText}>BOOK NOW</Text>
                  </Pressable>
                </View>
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
  fullScreenBackground: {
    flex: 1,
  },
  gradientOverlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: "space-between",
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
  headerTitleSection: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: 1,
  },
  priceTag: {
    color: "#FF3B1D",
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },
  bottomSection: {
    marginTop: "auto",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  cardBodyText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  includesSection: {
    marginTop: 20,
  },
  includesText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  includesHeading: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  actionContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  bookButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  bookButtonText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.8,
  },
});