import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SlideMenu from "./SlideMenu";

const { width } = Dimensions.get("window");

interface OfferCardProps {
  title: string;
  description: string;
  price: string;
  onPress?: () => void;
}

function OfferCard({ title, description, price, onPress }: OfferCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.cardTextWrapper}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
          <Text style={styles.cardPrice}>{price}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.arrowButton,
            pressed && styles.arrowButtonPressed,
          ]}
          onPress={onPress}
        >
          <Ionicons name="arrow-forward" size={20} color="#000000" />
        </Pressable>
      </View>
    </View>
  );
}

export default function OffersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"packages" | "experiences">(
    "packages",
  );

  const packagesData = [
    {
      id: "1",
      title: "ULTIMATE GAMER PASS",
      description: "Unlimited gaming access for a full day.",
      price: "R1 500",
      route: "/ultimate",
    },
    {
      id: "2",
      title: "ESPORTS TRAINING",
      description:
        "Improve competitive gaming skills with professional coaching.",
      price: "R1 500",
      route: "/esports",
    },
  ];

  const experiencesData = [
    {
      id: "3",
      title: "VIRTUAL REALITY",
      description: "Explore immersive virtual reality games.",
      price: "R 750",
      route: "/virtual",
    },
    {
      id: "4",
      title: "ESCAPE ROOM CHALLENGE",
      description: "Solve puzzles and escape before time runs out.",
      price: "R 750",
      route: "/escape",
    },
  ];

  const currentData = activeTab === "packages" ? packagesData : experiencesData;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO SECTION */}
        <ImageBackground
          source={require("../../assets/images/offers.png")}
          style={styles.heroBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.5)", "#000000"]}
            locations={[0, 0.6, 1]}
            style={styles.gradientOverlay}
          >
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
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>

        {/* CONTENT SECTION */}
        <View style={styles.contentContainer}>
          {/* TITLE */}
          <Text style={styles.mainTitle}>
            PACKAGES <Text style={styles.accentText}>&</Text>
            {"\n"}
            EXPERIENCES
          </Text>

          {/* SUBTITLE */}
          <Text style={styles.subtitle}>
            Whether you're pushing for the top of the leaderboard or looking for
            an unforgettable day out with friends,{" "}
            <Text style={styles.boldText}>Next Level</Text> delivers an
            immersive offerings tailored to you.
          </Text>

          {/* TOGGLE BAR */}
          <View style={styles.toggleContainer}>
            <Pressable
              style={[
                styles.toggleButton,
                activeTab === "packages" && styles.activeToggleButton,
              ]}
              onPress={() => setActiveTab("packages")}
            >
              <Text style={styles.toggleText}>PACKAGES</Text>
            </Pressable>

            <Pressable
              style={[
                styles.toggleButton,
                activeTab === "experiences" && styles.activeToggleButton,
              ]}
              onPress={() => setActiveTab("experiences")}
            >
              <Text style={styles.toggleText}>EXPERIENCES</Text>
            </Pressable>
          </View>

          {/* CARDS LIST */}
          <View style={styles.cardsList}>
            {currentData.map((item) => (
              <OfferCard
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                onPress={() => router.push(item.route as any)}
              />
            ))}
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

          {/* OFFERS / PACKAGES TAB (ACTIVE) */}
          <Pressable
            style={[styles.tabItem, styles.activeTab]}
            onPress={() => router.push("/offers")}
          >
            <Ionicons name="bag-handle" size={18} color="#FFFFFF" />
            <Text style={styles.activeTabText}>Offers</Text>
          </Pressable>

          {/* DISCOUNTS / PROMOS TAB */}
          <Pressable style={styles.tabItem} 
          onPress={() => router.push("/")}
          >
            <Ionicons name="pricetag-outline" size={20} color="#888888" />
          </Pressable>

          {/* CHAT / SUPPORT TAB */}
          <Pressable style={styles.tabItem} onPress={() => {}}>
            <Ionicons name="chatbubble-outline" size={20} color="#888888" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    paddingBottom: 110,
  },

  /* Hero */
  heroBackground: {
    width: "100%",
    height: 400,
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

  /* Main Body */
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    alignItems: "center",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 32,
  },
  accentText: {
    color: "#FF3B1D",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 18,
    textAlign: "center",
    marginTop: 10,
    marginHorizontal: 10,
  },
  boldText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  /* Toggle Switch */
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#000000",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#222222",
    padding: 3,
    marginTop: 20,
    marginBottom: 30,
    width: "100%",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  activeToggleButton: {
    backgroundColor: "#FF3B1D",
  },
  toggleText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  /* Offer Cards */
  cardsList: {
    width: "100%",
    gap: 20,
  },
  cardContainer: {
    backgroundColor: "#000000",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#333333",
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTextWrapper: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  cardDescription: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 18,
    marginBottom: 10,
  },
  cardPrice: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  arrowButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
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
