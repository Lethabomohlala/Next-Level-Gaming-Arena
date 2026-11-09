import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
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
import SlideMenu from "../SlideMenu";

const { width } = Dimensions.get("window");

interface OfferCardProps {
  title: string;
  description: string;
  price: string;
  onPress?: () => void;
}

function OfferCard({ title, description, price, onPress }: OfferCardProps) {
  return (
    <BlurView intensity={30} tint="dark" style={styles.cardContainer}>
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
          <Ionicons name="arrow-forward" size={18} color="#000000" />
        </Pressable>
      </View>
    </BlurView>
  );
}

export default function OffersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
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

      <ImageBackground
        source={require("../../../assets/images/offers.png")}
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
                Whether you're pushing for the top of the leaderboard or looking
                for an unforgettable day out with friends,{" "}
                <Text style={styles.boldText}>Next Level</Text> delivers an
                immersive offerings tailored to you.
              </Text>

              {/* TOGGLE BAR */}
              <BlurView
                intensity={25}
                tint="dark"
                style={styles.toggleContainer}
              >
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
              </BlurView>

              {/* CARDS LIST */}
              <View style={styles.cardsList}>
                {currentData.map((item) => (
                  <OfferCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    onPress={() =>
                      router.push({
                        pathname: item.route as any,
                        params: { existingItems: params?.existingItems },
                      })
                    }
                  />
                ))}
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
    backgroundColor: "rgba(0, 0, 0, 0.45)",
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
  scrollContent: {
    paddingBottom: 110,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  accentText: {
    color: "#FFFFFF",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 10,
    maxWidth: width * 0.75,
  },
  boldText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 40,
    borderWidth: 0.8,
    borderColor: "#FFFFFF",
    padding: 3,
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    overflow: "hidden",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  activeToggleButton: {
    backgroundColor: "#5F1DAB",
  },
  toggleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cardsList: {
    width: "100%",
    gap: 15,
  },
  cardContainer: {
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: "hidden",
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
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  cardDescription: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    marginBottom: 10,
  },
  cardPrice: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});