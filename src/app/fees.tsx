import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface FeeItem {
  title: string;
  price: number;
  quantity: number;
}

export default function FeesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse items passed from booking screen
  let items: FeeItem[] = [
    { title: 'ULTIMATE GAMER PASS', price: 1500, quantity: 1 },
    { title: 'ESPORTS TRAINING', price: 1500, quantity: 1 },
    { title: 'VIRTUAL REALITY', price: 750, quantity: 1 },
    { title: 'ESCAPE ROOM CHALLENGE', price: 750, quantity: 1 },
  ];

  if (params?.items) {
    try {
      items = JSON.parse(String(params.items));
    } catch (e) {
      // Fallback to defaults if parsing fails
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

  // Financial Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discountRate;
  const discountedTotal = subtotal - discountAmount;

  const vatRate = 0.15; // 15% VAT
  const vatAmount = discountedTotal * vatRate;
  const finalCost = discountedTotal + vatAmount;

  // Handle proceeding to booking with 0 cost check
  const handleProceedToBooking = () => {
    if (subtotal <= 0) {
      Alert.alert(
        'Empty Booking',
        'Please add at least one package/experience to your booking before proceeding.'
      );
      return;
    }

    router.push({
      pathname: '/confirmation',
      params: { totalAmount: finalCost.toFixed(2) },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require('../../assets/images/booking3.png')}
        style={styles.fullScreenBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
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
                <Text style={styles.mainTitle}>
                    <Text style={styles.sparkle}>✶ </Text>
                    <Text style={styles.boldTitle}>KNOW</Text> YOUR{' '}
                    <Text style={styles.boldTitle}>COST</Text>
                    <Text style={styles.sparkle}> ✶</Text>
                </Text>
                <Text style={styles.subtitle}>
                  Transparent pricing at a glance. Review your savings, total
                  tax, and final cost before securing your spot.
                </Text>
              </View>

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
                  <Text style={styles.breakdownLabel}>SUBTOTAL</Text>
                  <Text style={styles.breakdownValueCyan}>R {subtotal}</Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabelMuted}>
                    Discount ({discountRate * 100}%)
                  </Text>
                  <Text style={styles.breakdownValueMuted}>
                    -R {discountAmount.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabelCyan}>DISCOUNTED TOTAL</Text>
                  <Text style={styles.breakdownValueCyan}>
                    R {discountedTotal.toFixed(2)}
                  </Text>
                </View>

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

             {/* ACTION BUTTONS */}
                <View style={styles.actionButtonsContainer}>
                <Pressable
                    style={({ pressed }) => [
                    styles.primaryButton,
                    subtotal <= 0 && styles.disabledButton,
                    pressed && styles.buttonPressed,
                    ]}
                    onPress={handleProceedToBooking}
                >
                    <Text style={styles.primaryButtonText}>
                    PROCEED TO BOOKING
                    </Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                    ]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.primaryButtonText}>CANCEL BOOKING</Text>
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
    backgroundColor: '#000000',
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleSection: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 1,
    textAlign: 'center',
  },
  boldTitle: {
    fontWeight: '800',
  },
  sparkle: {
    color: '#FFFFFF',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  itemListContainer: {
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  itemPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF4C',
    marginVertical: 25,
  },
  breakdownSection: {
    gap: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    color: '#00D2FF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  breakdownLabelCyan: {
    color: '#00D2FF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  breakdownValueCyan: {
    color: '#00D2FF',
    fontSize: 16,
    fontWeight: '700',
  },
  breakdownLabelMuted: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
  },
  breakdownValueMuted: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
  },
  spacingMedium: {
    height: 8,
  },
  finalCostRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  finalCostLabel: {
    color: '#00D2FF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  finalCostValue: {
    color: '#00D2FF',
    fontSize: 20,
    fontWeight: '800',
  },
  actionButtonsContainer: {
    gap: 14,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingVertical: 14,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
  },
});