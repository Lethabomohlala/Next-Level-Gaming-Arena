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

export default function EsportsTrainingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* FULL-SCREEN BACKGROUND IMAGE */}
      <ImageBackground
        source={require('../../assets/images/esports.png')}
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
                  ESPORTS <Text style={styles.thinTitle}>TRAINING</Text>
                </Text>
                <Text style={styles.priceTag}>R 1500</Text>
              </View>

              {/* BOTTOM SECTION: DESCRIPTION + INCLUDES + CTA */}
              <View style={styles.bottomSection}>
                {/* DESCRIPTION SECTION */}
                <View style={styles.descriptionContainer}>
                  <Text style={styles.cardBodyText}>
                    Take your gameplay to the competitive stage with the{' '}
                    <Text style={styles.boldText}>Esports Training Package!</Text>{' '}
                    Designed for aspiring pros, competitive squads, and serious
                    players looking to break through their skill ceilings, this
                    package combines structured practice with direct, professional
                    coaching. Gain in-depth tactical insights, refine your
                    mechanical execution and master map control under the guidance
                    of experienced Esports coaches. Whether you are perfecting team
                    coordination or fine-tuning individual micro-skills, train like
                    a champion in a professional arena environment built for
                    high-level performance.
                  </Text>

                  {/* INCLUDES TAGS */}
                  <View style={styles.includesSection}>
                    <Text style={styles.includesText}>
                      <Text style={styles.includesHeading}>INCLUDES</Text> ✦
                      Strategy coaching ✦ Team communication ✦ Match analysis ✦
                      Practice sessions ✦ Performance feedback
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
                        title: 'ESPORTS TRAINING', 
                        price: '1500',
                        existingItems: params?.existingItems 
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
    marginTop: 20,
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
    color: '#FF3B1D',
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
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 25,
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