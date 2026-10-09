import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Text as SvgText, TextPath } from 'react-native-svg';
import SlideMenu from './SlideMenu';

const { width } = Dimensions.get('window');

// Curved SVG Circular Badge Component
function CircularTextBadge() {
  const size = 180;
  const strokeWidth = 2;
  const r = (size - strokeWidth) / 2 - 20;
  const cx = size / 2;
  const cy = size / 2;

  const pathD = `M ${cx - r},${cy} a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`;

// Continuous Rotation Animation
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

return (
    <View style={styles.circularBadgeContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Path id="circlePath" d={pathD} fill="none" />
          <SvgText fill="#FFFFFF" fontSize="14" fontWeight="700" letterSpacing="2">
            <TextPath href="#circlePath" startOffset="0%">
              MADE FOR EVERYONE.    ✶ BUILT BY GAMERS. ✶
            </TextPath>
          </SvgText>
        </Svg>
      </Animated.View>
    </View>
  );
}

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO SECTION */}
        <ImageBackground
          source={require('../../assets/images/about.png')}
          style={styles.heroBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)', '#000000']}
            locations={[0, 0.7, 1]}
            style={styles.gradientOverlay}
          >
            <SafeAreaView style={styles.safeArea}>
              {/* HEADER */}
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

              {/* CURVED TEXT BADGE */}
              <CircularTextBadge />

              {/* ABOUT US BODY */}
              <View style={styles.aboutUsSection}>
                <Text style={styles.aboutTitle}>
                  ABOUT <Text style={styles.thinText}>US</Text>
                </Text>

                <Text style={styles.aboutDescription}>
                  Founded in 2023 in the heart of Johannesburg,{' '}
                  <Text style={styles.boldText}>
                    Next Level Gaming & Esports Arena
                  </Text>{' '}
                  was built by Jason Naidoo, an avid gamer who saw a major gap in the
                  local gaming scene. While South Africa's passion for Esports and
                  gaming was rapidly growing, access to high-performance equipment,
                  specialized arena setups, and organized competitive events remained
                  limited. Driven to solve this, Jason set out to build a modern venue
                  that bridges the gap, offering a space where players of all skill
                  levels can access top-tier gear, join competitive tournaments, and
                  share their passion with a vibrant community.
                </Text>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>

        {/* MISSION SECTION */}
        <View style={styles.missionSection}>
          <Text style={styles.missionTitle}>
            OUR <Text style={styles.thinText}>MISSION</Text>
          </Text>

          <Text style={styles.missionDescription}>
            We are dedicated to driving the expansion of South Africa's Esports and
            gaming ecosystem. By combining modern hardware, inclusive community
            spaces, and competitive events, Next Level provides an accessible
            platform where casual players can socialise and aspiring pro-gamers can
            hone their skills.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  heroBackground: {
    width: '100%',
    minHeight: 950,
  },
  gradientOverlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
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
  circularBadgeContainer: {
    position: 'absolute',
    top: 320,
    left: width * 0.36,
    width: 180,
    height: 180,
    zIndex: 5,
    marginVertical: -10,
  },
  aboutUsSection: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    marginBottom: 0,
  },
  aboutTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'right',
  },
  aboutDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
    maxWidth: width * 0.8,
  },
  thinText: {
    fontWeight: '300',
  },
  boldText: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  missionSection: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  missionTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'left',
  },
  missionDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
    maxWidth: width * 0.8,
  },
});