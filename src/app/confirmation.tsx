import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse parameters or fallback to default UI display values
  const totalAmount = params?.totalAmount ? String(params.totalAmount) : '3 881.25';
  const bookingId = params?.bookingId ? String(params.bookingId) : '#NLG22384';
  const bookingDate = params?.date ? String(params.date) : '28 Sept 2026';

  // Handle Back Button: Clear booking parameters and return to Offers screen
  const handleClearAndGoToOffers = () => {
    router.replace('/offers');
  };

  // Handle Home Button: Return directly to index.tsx
  const handleGoToHome = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require('../../assets/images/booking2.png')}
        style={styles.fullScreenBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.5)',
            'rgba(0,0,0,0.7)',
            'rgba(0,0,0,0.95)',
          ]}
          locations={[0, 0.4, 1]}
          style={styles.gradientOverlay}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* TOP HEADER */}
            <View style={styles.topHeader}>
            <Pressable
                style={styles.backButton}
                onPress={handleClearAndGoToOffers}
            >
                <Ionicons name="arrow-back" size={20} color="#000000" />
            </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* LOGO IMAGE */}
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>

              {/* MAIN TITLE & SUBTITLE */}
              <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>
                  <Text style={styles.boldTitle}>BOOKING </Text>
                  <Text style={styles.thinTitle}>CONFIRMED!</Text>
                </Text>
                <Text style={styles.subtitle}>
                  <Text style={styles.boldText}>You’re locked in.</Text> Booking request
                  has been sent, our team will contact you soon.{' '}
                  <Text style={styles.boldText}>Let the games begin!</Text>
                </Text>
              </View>

              {/* BOOKING DETAILS TABLE */}
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Booking ID</Text>
                  <Text style={styles.detailValueMuted}>{bookingId}</Text>
                </View>
                <View style={styles.rowDivider} />

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>{bookingDate}</Text>
                </View>
                <View style={styles.rowDivider} />

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payment Method</Text>
                  <Text style={styles.detailValue}>Pay At Venue</Text>
                </View>
                <View style={styles.rowDivider} />

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusText}>Confirmed</Text>
                  </View>
                </View>
              </View>

              {/* TOTAL AMOUNT BADGE */}
              <View style={styles.totalBadgeContainer}>
                <View style={styles.totalBadge}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalValue}>R {totalAmount}</Text>
                </View>
              </View>

              {/* BACK TO HOME BUTTON */}
                <View style={styles.actionContainer}>
                <Pressable
                    style={({ pressed }) => [
                    styles.homeButton,
                    pressed && styles.buttonPressed,
                    ]}
                    onPress={handleGoToHome}
                >
                    <Text style={styles.homeButtonText}>BACK TO HOME</Text>
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

/* Logo */
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logoImage: {
    width: 200,
    height: 200,
  },

  /* Title Section */
  titleSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    letterSpacing: 1,
    textAlign: 'center',
  },
  boldTitle: {
    fontWeight: '800',
  },
  thinTitle: {
    fontWeight: '300',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  boldText: {
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Details Table */
  detailsContainer: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  detailLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
  },
  detailValueMuted: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#FFFFFF4C',
  },
  statusPill: {
    backgroundColor: '#00D2FF',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  statusText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },

  /* Total Badge */
  totalBadgeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  totalBadge: {
    backgroundColor: '#FF3B1D',
    borderRadius: 35,
    paddingVertical: 14,
    paddingHorizontal: 40,
    width: 350,
    alignItems: 'center',
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 2,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  /* Home Button */
  actionContainer: {
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  homeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.8,
  },
});