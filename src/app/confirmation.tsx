import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
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

const { width } = Dimensions.get("window");

let nextBookingSequence = 230110;

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Extract parameters with safe fallbacks matching booking.tsx / fees.tsx input
  const name = (params?.name as string) || "John Doe";
  const email = (params?.email as string) || "johndoe@example.com";
  const phone = (params?.phone as string) || "0819924545";
  const date = (params?.date as string) || "13-11-2026";
  const stationPass = (params?.stationPass as string) || "1 HOUR PASS";
  const guestCount = (params?.guestCount as string) || "3";
  const totalAmount = (params?.totalAmount as string) || "3881.25";
  const paymentMethod = "Cash/Card On Arrival";

  // Generate sequential Booking ID (e.g., NXL-230110)
  const bookingId = useMemo(() => {
    if (params?.bookingId && String(params.bookingId).startsWith("NXL-")) {
      return String(params.bookingId);
    }
    const currentId = `NXL-${nextBookingSequence}`;
    nextBookingSequence += 1;
    return currentId;
  }, [params?.bookingId]);

  // Format currency display
  const formattedTotal = useMemo(() => {
    const num = parseFloat(totalAmount);
    if (isNaN(num)) return `R ${totalAmount}`;
    return `R ${num.toLocaleString("en-ZA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, [totalAmount]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../assets/images/booking2.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Semi-transparent dark overlay for background dimming */}
        <View style={styles.backgroundOverlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* TOP HEADER with Back Button and Logo Badge */}
          <View style={styles.topHeader}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.push("/booking")}
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
            {/* HERO TITLE SECTION */}
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>BOOKING{"\n"}CONFIRMED!</Text>
              <Text style={styles.heroSubtitle}>
                You're locked in. Booking request has been sent, our team will
                contact you soon.
              </Text>
              <Text style={styles.boldCallout}>Let the games begin!</Text>
            </View>

            {/* FROSTED GLASS DETAILS CONTAINER */}
            <BlurView intensity={30} tint="dark" style={styles.glassContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>BOOKING ID</Text>
                <Text style={styles.detailValueBold}>{bookingId}</Text>
              </View>

              <View style={styles.rowDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>NAME & SURNAME</Text>
                <Text style={styles.detailValue}>{name}</Text>
              </View>

              <View style={styles.rowDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>EMAIL ADDRESS</Text>
                <Text style={styles.detailValue}>{email}</Text>
              </View>

              <View style={styles.rowDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>PHONE NUMBER</Text>
                <Text style={styles.detailValue}>{phone}</Text>
              </View>

              <View style={styles.rowDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>DATE</Text>
                <Text style={styles.detailValue}>{date}</Text>
              </View>

              <View style={styles.rowDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>STATION PASS</Text>
                <Text style={styles.detailValue}>
                  {stationPass.toUpperCase()}
                </Text>
              </View>

              <View style={styles.rowDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>NUMBER OF GUESTS</Text>
                <Text style={styles.detailValue}>{guestCount}</Text>
              </View>

              <View style={styles.rowDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>PAYMENT METHOD</Text>
                <Text style={styles.detailValue}>{paymentMethod}</Text>
              </View>
            </BlurView>

            {/* TOTAL AMOUNT BADGE */}
            <View style={styles.totalBadge}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>{formattedTotal}</Text>
            </View>

            {/* DISCLAIMER FOOTER NOTE */}
            <Text style={styles.disclaimerText}>
              Your booking request is being processed by the Next Level team.
              You will receive a confirmation email within 24 hours detailing
              your time slot, arena rules, and additional hour pass or upgrade
              options.
            </Text>

            {/* DISMISS BUTTON */}
            <Pressable
              style={({ pressed }) => [
                styles.dismissButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.dismissButtonText}>DISMISS</Text>
            </Pressable>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  heroSection: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: 1,
    textAlign: "center",

  },
  heroSubtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
    maxWidth: width * 0.75,
  },
  boldCallout: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  glassContainer: {
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: "#FFFFFF88",
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: "100%",
    overflow: "hidden",
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  detailLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  detailValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "300",
  },
  detailValueBold: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  rowDivider: {
    height: 0.5,
    backgroundColor: "#FFFFFF33",
    marginVertical: 6,
  },
  totalBadge: {
    backgroundColor: "#FF3B00",
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  totalValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  disclaimerText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginVertical: 12,
    paddingHorizontal: 10,
    maxWidth: width * 0.85,
  },
  dismissButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    marginTop: 15,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  dismissButtonText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.8,
  },
});
