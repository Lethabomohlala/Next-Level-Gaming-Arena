import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
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

const { width, height } = Dimensions.get("window");

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "What are your operating hours and location?",
    answer:
      "We are open Monday through Saturday from 09:00 AM to 18:00 PM and Closed on Sundays. Please check our official website for local address details.",
  },
  {
    question: "Can I bring my own peripherals or accounts?",
    answer:
      "Yes, players are welcome to bring their own headsets, mice, mechanical keyboards, or controllers. You can also log directly into your personal game accounts like Steam, Riot, Epic Games, or Battle.net.",
  },
  {
    question: "Age Requirements?",
    answer:
      "Gamers under 12 years old must be accompanied by a parent or legal guardian at all times. Guests aged 12+ are welcome to play unaccompanied during regular business operating hours.",
  },
  {
    question: "Food, Drinks & Equipment Care?",
    answer:
      "Sealed or bottled beverages are permitted in non-station zones, but intentional damage to gear carries full financial liability. We maintain a zero-tolerance policy for hardware abuse and unsportsmanlike behavior.",
  },
  {
    question: "Do I need to make a reservation?",
    answer:
      "Walk-ins are always welcome based on station availability, though booking online in advance is recommended. Tabletop and card gaming areas are free and operating on a first-come, first-served basis.",
  },
];

export default function FaqScreen() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../assets/images/faq.png")}
        style={styles.fullScreenBackground}
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
              {/* HEADER TITLE */}
              <View style={styles.headerTitleSection}>
                <Text style={styles.mainTitle}>GOT{"\n"}QUESTIONS?</Text>
              </View>

              {/* ACCORDION LIST (GLASSMORPHIC) */}
              <View style={styles.accordionContainer}>
                {FAQ_DATA.map((item, index) => {
                  const isExpanded = expandedIndex === index;
                  return (
                    <BlurView
                      key={index}
                      intensity={30}
                      tint="dark"
                      style={styles.accordionItem}
                    >
                      <Pressable
                        style={styles.accordionHeader}
                        onPress={() => toggleAccordion(index)}
                      >
                        <Text style={styles.questionText}>{item.question}</Text>
                        <View style={styles.iconContainer}>
                          <Ionicons
                            name={isExpanded ? "remove" : "add"}
                            size={20}
                            color="#FF3B00"
                          />
                        </View>
                      </Pressable>

                      {isExpanded && (
                        <View style={styles.accordionBody}>
                          <Text style={styles.answerText}>{item.answer}</Text>
                        </View>
                      )}
                    </BlurView>
                  );
                })}
              </View>

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
  fullScreenBackground: {
    width: width,
    height: height,
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
    paddingBottom: 40,
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
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 20,
    textAlign: "center",
  },
  accordionContainer: {
    gap: 15,
  },
  accordionItem: {
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: "#FFFFFF",
    overflow: "hidden",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    paddingRight: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  accordionBody: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    paddingTop: 12,
  },
  answerText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "300",
  },
  actionContainer: {
    alignItems: "center",
    marginTop: 40,
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
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.8,
  },
});