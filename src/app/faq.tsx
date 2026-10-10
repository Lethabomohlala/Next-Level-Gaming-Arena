import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
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
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.75)", "rgba(0,0,0,0.95)"]}
          locations={[0, 0.4, 1]}
          style={styles.gradientOverlay}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* TOP HEADER */}
            <View style={styles.topHeader}>
              <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={20} color="#000000" />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* HEADER TITLE */}
              <View style={styles.headerTitleSection}>
                <Text style={styles.mainTitle}>GOT QUESTIONS?</Text>
                <Text style={styles.subTitle}>WE’VE GOT ANSWERS.</Text>
              </View>

              {/* ACCORDION LIST */}
              <View style={styles.accordionContainer}>
                {FAQ_DATA.map((item, index) => {
                  const isExpanded = expandedIndex === index;
                  return (
                    <View key={index} style={styles.accordionItem}>
                      <Pressable
                        style={styles.accordionHeader}
                        onPress={() => toggleAccordion(index)}
                      >
                        <Text style={styles.questionText}>{item.question}</Text>
                        <View style={styles.iconContainer}>
                          <Ionicons
                            name={isExpanded ? "remove" : "add"}
                            size={18}
                            color="#FF3B1D"
                          />
                        </View>
                      </Pressable>

                      {isExpanded && (
                        <View style={styles.accordionBody}>
                          <Text style={styles.answerText}>{item.answer}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
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
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  /* Header */
  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleSection: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: "center",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 1,
    textAlign: "center",
  },
  subTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "300",
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 4,
  },
  accordionContainer: {
    gap: 20,
  },
  accordionItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    overflow: "hidden",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    paddingRight: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  accordionBody: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    paddingTop: 10,
  },
  answerText: {
    color: "#000000",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
  },
});
