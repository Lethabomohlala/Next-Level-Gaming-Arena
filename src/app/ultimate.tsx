import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function UltimateGamerPassScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* FULL-SCREEN BACKGROUND IMAGE */}
      <ImageBackground
        source={require('../../assets/images/ultimate.png')}
        style={styles.fullScreenBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.6)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.4)',
            'rgba(0,0,0,0.85)',
          ]}
          locations={[0, 0.25, 0.65, 1]}
          style={styles.gradientOverlay}
        >
          <SafeAreaView style={styles.safeArea}>
            
            {/* TOP HEADER */}
            <View style={styles.topHeader}>
              <Pressable
                style={styles.backButton}
                onPress={() => router.push("/offers")}>
                <Ionicons name="arrow-back" size={20} color="#000000" />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* TOP: TITLE & PRICE */}
              <View style={styles.headerTitleSection}>
                <Text style={styles.mainTitle}>
                  ULTIMATE <Text style={styles.thinTitle}>GAMER PASS</Text>
                </Text>
                <Text style={styles.priceTag}>R 1500</Text>
              </View>

              {/* BOTTOM SECTION: DESCRIPTION + INCLUDES + CTA */}
              <View style={styles.bottomSection}>
                
                {/* DESCRIPTION SECTION */}
                <View style={styles.descriptionContainer}>
                  <Text style={styles.cardBodyText}>
                    Lock in non-stop, high-octane gaming with the{' '}
                    <Text style={styles.boldText}>Ultimate Gamer Pass!</Text> Designed
                    for true gaming enthusiasts, this pass grants you unlimited
                    full-day access to our high-performance gaming stations, elite
                    setups, and full arena amenities. Jump into your favourite
                    multiplayer titles, grind competitive leaderboards, or squad up with
                    friends for the ultimate all-day gaming session. No timers, no
                    interruptions...just pure, uninterrupted gameplay from open to close.
                  </Text>

                  {/* INCLUDES TAGS */}
                  <View style={styles.includesSection}>
                    <Text style={styles.includesText}>
                      <Text style={styles.includesHeading}>INCLUDES</Text> ✦ PC gaming ✦
                      Console gaming ✦ High-speed internet ✦ Snack voucher ✦
                      Tournament entry
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
                    onPress={() => router.push({
                      pathname: '/booking',
                      params: { 
                        title: 'ULTIMATE GAMER PASS', 
                        price: '1500', 
                        existingItems: params?.existingItems // Carry it back to booking!
                      }
                    })}
                  >
                    <Text style={styles.bookButtonText}>BOOK NOW!</Text>
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
    backgroundColor: '#000000',
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
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 30,
    marginBottom: 20,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'right',
    letterSpacing: 1,
  },
  thinTitle: {
    fontWeight: '300',
  },
  priceTag: {
    color: '#0734EA',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'right',
    marginTop: 6,
  },
  bottomSection: {
    marginTop: 'auto',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  cardBodyText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'right',
  },
  boldText: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
  includesSection: {
    marginTop: 18,
  },
  includesText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'right',
  },
  includesHeading: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
  actionContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 40,
  },
  bookButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  bookButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});