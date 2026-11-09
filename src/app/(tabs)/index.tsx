import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SlideMenu from "../SlideMenu";

const { width } = Dimensions.get("window");

const CARDS = [
  { id: "1", title: "ULTIMATE\nGAMER\nPASS", route: "/ultimate" },
  { id: "2", title: "VIRTUAL\nREALITY", route: "/virtual" },
  { id: "3", title: "ESPORTS\nTRAINING", route: "/esports" },
  { id: "4", title: "ESCAPE\nROOM\nCHALLENGE", route: "/escape" },
];

export default function GamingArenaScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../../assets/images/chill.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
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
            {/* HERO CONTENT - Centered Mobile Layout */}
            <View style={styles.heroSection}>
              <Text style={styles.eyebrow}>
                WELCOME TO{"\n"}NEXT LEVEL GAMING ARENA
              </Text>

              <Text style={styles.mainTitle}>
                OUTPLAY{"\n"}YOUR{"\n"}PAST
              </Text>

              <Text style={styles.description}>
                Experience premium gaming, Esports, and unforgettable events all
                in one place. Explore our packages, choose your experience, and
                take your game to the{" "}
                <Text style={styles.boldText}>Next Level.</Text>
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/offers")}
              >
                <Text style={styles.primaryButtonText}>ENTER THE ARENA</Text>
              </TouchableOpacity>
            </View>

            {/* LEADERBOARD SECTION - Brought Up */}
            <View style={styles.bottomLeaderboardSection}>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderTitle}>
                  ✶ TOP OF THE{" "}
                  <Text style={styles.sectionHeaderBold}>LEADERBOARD!</Text> ✶
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsScrollContainer}
              >
                {CARDS.map((card) => (
                  <BlurView
                    key={card.id}
                    intensity={25}
                    tint="dark"
                    style={styles.card}
                  >
                    <Text style={styles.cardTitle}>{card.title}</Text>

                    <TouchableOpacity
                      style={styles.cardFooter}
                      onPress={() => router.push(card.route as any)}
                    >
                      <Text style={styles.cardLink}>View More</Text>
                      <View style={styles.arrowCircle}>
                        <Feather name="arrow-right" size={14} color="#000000" />
                      </View>
                    </TouchableOpacity>
                  </BlurView>
                ))}
              </ScrollView>
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
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 100,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
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
  heroSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 50,
  },
  eyebrow: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 1.5,
    marginBottom: 10,
    textAlign: "center",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  description: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
    maxWidth: width * 0.75,
  },
  boldText: {
    fontWeight: "800",
    color: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    marginTop: 15,
  },
  primaryButtonText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.8,
  },
  bottomLeaderboardSection: {
    marginTop: 30,
  },
  sectionHeaderContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  sectionHeaderBold: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  cardsScrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 12,
  },
  card: {
    width: 140,
    height: 160,
    borderRadius: 20,
    padding: 14,
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#FFFFFF",
    overflow: "hidden",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLink: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
  },
  arrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
