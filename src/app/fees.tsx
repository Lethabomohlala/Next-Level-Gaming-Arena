import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
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

interface FeeItem {
  title: string;
  price: number;
  quantity: number;
}

export default function FeesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse items passed from booking screen
  let items: FeeItem[] = [];

  if (params?.items) {
    try {
      items = JSON.parse(String(params.items));
    } catch (e) {
      items = [];
    }
  }

  // Calculate total number of booked items/packages
  const totalBookingsCount = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // Dynamic Tier Discount Logic
  let discountRate = 0;
  if (totalBookingsCount === 2) {
    discountRate = 0.05; // 5%
  } else if (totalBookingsCount === 3) {
    discountRate = 0.10; // 10%
  } else if (totalBookingsCount > 3) {
    discountRate = 0.15; // 15%
  }

  // Financial Calculations (Calculated directly from base package/experience prices)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discountRate;
  const discountedTotal = subtotal - discountAmount;

  const vatRate = 0.15; // 15% VAT
  const vatAmount = discountedTotal * vatRate;
  const finalCost = discountedTotal + vatAmount;

  const handleConfirmBooking = () => {
    router.push({
      pathname: "/confirmation",
      params: {
        ...params,
        totalAmount: finalCost.toFixed(2),
        bookingId: "#NLG" + Math.floor(10000 + Math.random() * 90000),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../assets/images/booking3.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Semi-transparent dark overlay */}
        <View style={styles.backgroundOverlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* TOP HEADER */}
          <View style={styles.topHeader}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
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
            {/* HEADER TITLE SECTION */}
            <View style={styles.headerTitleSection}>
              <Text style={styles.mainTitle}>
                KNOW{"\n"}
                <Text style={styles.boldTitle}>YOUR COST</Text>
              </Text>
              <Text style={styles.subtitle}>
                Transparent pricing at a glance. Review your savings, total
                tax, and final cost before securing your spot.
              </Text>
            </View>

            {/* FROSTED GLASS COST CONTAINER */}
            <BlurView intensity={30} tint="dark" style={styles.glassContainer}>
              {/* ITEMIZED LIST */}
              <View style={styles.itemListContainer}>
                {items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemPrice}>
                      R {item.price * item.quantity}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.divider} />

              {/* COST BREAKDOWN SECTION */}
              <View style={styles.breakdownSection}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabelCyan}>SUBTOTAL</Text>
                  <Text style={styles.breakdownValueCyan}>
                    R {subtotal.toLocaleString()}
                  </Text>
                </View>

                {discountRate > 0 && (
                  <>
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabelMuted}>
                        Discount ({discountRate * 100}%)
                      </Text>
                      <Text style={styles.breakdownValueMuted}>
                        -R {discountAmount.toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabelCyan}>
                        DISCOUNTED TOTAL
                      </Text>
                      <Text style={styles.breakdownValueCyan}>
                        R {discountedTotal.toFixed(2)}
                      </Text>
                    </View>
                  </>
                )}

                <View style={styles.spacingMedium} />

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabelMuted}>After Discount</Text>
                  <Text style={styles.breakdownValueMuted}>
                    R {discountedTotal.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabelMuted}>VAT (15%)</Text>
                  <Text style={styles.breakdownValueMuted}>
                    R {vatAmount.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* FINAL COST */}
              <View style={styles.finalCostRow}>
                <Text style={styles.finalCostLabel}>FINAL COST</Text>
                <Text style={styles.finalCostValue}>
                  R {finalCost.toFixed(2)}
                </Text>
              </View>
            </BlurView>

            {/* ACTION BUTTONS */}
            <View style={styles.actionButtonsContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleConfirmBooking}
              >
                <Text style={styles.primaryButtonText}>CONFIRM BOOKING</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => router.replace("/(tabs)")}
              >
                <Text style={styles.primaryButtonText}>CANCEL</Text>
              </Pressable>
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
  },
  headerTitleSection: {
    marginTop: 20,
    marginBottom: 24,
    alignItems: "center",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  boldTitle: {
    fontWeight: "800",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
    maxWidth: width * 0.75,
  },
  glassContainer: {
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 24,
    overflow: "hidden",
    marginBottom: 30,
  },
  itemListContainer: {
    gap: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
    flex: 1,
    paddingRight: 10,
  },
  itemPrice: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "300",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFFFFF4C",
    marginVertical: 18,
  },
  breakdownSection: {
    gap: 10,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  breakdownLabelCyan: {
    color: "#00D2FF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  breakdownValueCyan: {
    color: "#00D2FF",
    fontSize: 16,
    fontWeight: "700",
  },
  breakdownLabelMuted: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  breakdownValueMuted: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "300",
  },
  spacingMedium: {
    height: 6,
  },
  finalCostRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  finalCostLabel: {
    color: "#00D2FF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  finalCostValue: {
    color: "#00D2FF",
    fontSize: 16,
    fontWeight: "700",
  },
  actionButtonsContainer: {
    gap: 0,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.8,
  },
});