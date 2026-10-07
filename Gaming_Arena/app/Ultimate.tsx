import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';

interface PassScreenProps {
  image: ImageSourcePropType;
  title: string;
  price: string;
  description: string;
  includes: string;
  priceColor?: string;
}

export default function PassScreen({
  image,
  title,
  price,
  description,
  includes,
  priceColor = '#00D9FF',
}: PassScreenProps) {

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.logo}>
          N
        </Text>

        <Text style={styles.menu}>
          ☰
        </Text>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HERO IMAGE */}
        <Image
          source={image}
          style={styles.heroImage}
        />

        {/* TITLE AND PRICE */}
        <View style={styles.titleRow}>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text
            style={[
              styles.price,
              { color: priceColor },
            ]}
          >
            {price}
          </Text>

        </View>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          {description}
        </Text>

        {/* INCLUDES */}
        <Text style={styles.includes}>

          <Text style={styles.includesTitle}>
            Includes
          </Text>

          {' | '}

          {includes}

        </Text>

        {/* BOOK BUTTON */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => console.log(`Booking ${title}`)}
        >
          <Text style={styles.bookText}>
            BOOK NOW
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  header: {
    position: 'absolute',
    top: 45,
    left: 20,
    right: 20,
    zIndex: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },

  menu: {
    color: '#FFFFFF',
    fontSize: 28,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  heroImage: {
    width: '100%',
    height: 380,
    resizeMode: 'cover',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 18,

    marginTop: 15,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',

    flex: 1,

    letterSpacing: 0.5,
  },

  price: {
    fontSize: 16,
    fontWeight: '900',

    marginLeft: 10,
  },

  description: {
    color: '#AFAFAF',

    fontSize: 11,

    lineHeight: 17,

    textAlign: 'center',

    paddingHorizontal: 25,

    marginTop: 20,
  },

  includes: {
    color: '#AFAFAF',

    fontSize: 9,

    lineHeight: 15,

    textAlign: 'center',

    paddingHorizontal: 20,

    marginTop: 20,
  },

  includesTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  bookButton: {
    backgroundColor: '#FFFFFF',

    alignSelf: 'flex-end',

    paddingHorizontal: 20,

    paddingVertical: 10,

    borderRadius: 20,

    marginTop: 15,

    marginRight: 18,
  },

  bookText: {
    color: '#000000',

    fontSize: 9,

    fontWeight: '900',
  },

});