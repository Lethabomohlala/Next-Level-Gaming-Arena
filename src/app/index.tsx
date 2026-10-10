import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Feather, Ionicons } from '@expo/vector-icons';
import SlideMenu from './SlideMenu';

const { width } = Dimensions.get('window');

// Data for the horizontal feature cards
const CARDS = [
  { id: '1', title: 'ULTIMATE\nGAMER\nPASS' },
  { id: '2', title: 'VIRTUAL\nREALITY' },
  { id: '3', title: 'ESPORTS\nTRAINING' },
  { id: '4', title: 'ESCAPE\nROOM\nCHALLENGE' },
];

export default function GamingArenaScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require('../../assets/images/chill.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* TOP HEADER */}
          <View style={styles.topHeader}>
            <View style={styles.logoBadge}>
              <Image
                source={require('../../assets/images/logo.png')}
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
            {/* HERO CONTENT */}
            <View style={styles.heroSection}>
              <Text style={styles.eyebrow}>NEXT LEVEL GAMING ARENA</Text>

              <Text style={styles.mainTitle}>
                ELEVATE{'\n'}YOUR{'\n'}GAME
              </Text>

              <Text style={styles.description}>
                Experience premium gaming, Esports, and unforgettable events all in
                one place. Explore our packages, choose your experience, and take
                your game to the <Text style={styles.boldText}>Next Level.</Text>
              </Text>

              <TouchableOpacity style={styles.primaryButton} 
                onPress={() => router.push('/offers')}
                >
                <Text style={styles.primaryButtonText}>ENTER THE ARENA</Text>
              </TouchableOpacity>
            </View>

            {/* LEADERBOARD SECTION*/}
            <View style={styles.bottomLeaderboardSection}>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderTitle}>
                  ✶ TOP OF THE <Text style={styles.sectionHeaderBold}>LEADERBOARD!</Text> ✶
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsScrollContainer}
              >
                {CARDS.map((card) => (
                  <BlurView
                    key={card.id}
                    intensity={25}
                    tint="dark"
                    style={styles.card}
                  >
                    <Text style={styles.cardTitle}>{card.title}</Text>

                    <TouchableOpacity style={styles.cardFooter} 
                      onPress={() => router.push('/offers')}
                      >
                      <Text style={styles.cardLink}>View More</Text>
                      <View style={styles.arrowCircle}>
                        <Feather name="arrow-right" size={14} color="#000000" />
                      </View>
                    </TouchableOpacity>
                  </BlurView>
                ))}
              </ScrollView>
            </View>
          </ScrollView>

          {/* FLOATING BOTTOM TAB BAR */}
          <View style={styles.tabBarWrapper}>
            <View style={styles.tabBarContainer}>
              <TouchableOpacity style={styles.activeTab}>
                <Ionicons name="home-outline" size={20} color="#FFFFFF" />
                <Text style={styles.activeTabText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.tabItem} 
              onPress={() => router.push('/offers')}>
                <Feather name="shopping-bag" size={20} color="#888888" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.tabItem}
                onPress={() => router.push('/booking')}>
                <Ionicons name="pricetag-outline" size={20} color="#888888" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.tabItem}
                onPress={() => router.push('/contact')}>
                <Ionicons name="chatbubble-outline" size={20} color="#888888" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 90,
  },

  /* Top Header */
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoBadge: {
    width: 44,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  iconButton: {
    padding: 4,
  },

  /* Hero Section */
  heroSection: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  eyebrow: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1.2,
    marginBottom: 10,
    textAlign: 'right',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 40,
    textAlign: 'right',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 18,
    textAlign: 'right',
    maxWidth: width * 0.65,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: '900',
    color: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  primaryButtonText: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.8,
  },

  /* Bottom Leaderboard Section */
  bottomLeaderboardSection: {
    marginTop: 'auto',
  },
  sectionHeaderContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    letterSpacing: 1,
  },
  sectionHeaderBold: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* Horizontal Cards */
  cardsScrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 12,
  },
  card: {
    width: 140,
    height: 160,
    borderRadius: 20,
    padding: 14,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#5F1DAB',
    overflow: 'hidden',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0.8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLink: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  arrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Floating Bottom Navigation Bar */
  tabBarWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    width: width * 0.88,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF1F',
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B00',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    gap: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 14,
  },
  tabItem: {
    padding: 12,
  },
});
