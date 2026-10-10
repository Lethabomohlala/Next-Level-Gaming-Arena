import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import SlideMenu from './SlideMenu';

const { width } = Dimensions.get('window');

interface BookingItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Booking Items State (Starts empty)
  const [items, setItems] = useState<BookingItem[]>(() => {
    if (params?.existingItems) {
      try {
        return JSON.parse(String(params.existingItems));
      } catch (e) {
        return [];
      }
    }
    return [];
  });


  // Client Details Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Automatically add item if passed via router params from detail pages
  useEffect(() => {
    if (params?.title && params?.price) {
      const newItemTitle = String(params.title);
      const newItemPrice = Number(params.price);

      setItems((prevItems) => {
        // Check if this exact title is already in the list
        const existingIndex = prevItems.findIndex((i) => i.title === newItemTitle);

        if (existingIndex > -1) {
          // If it exists, increment its quantity
          const updated = [...prevItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          return updated;
        }

        // If it's a new unique offer, add it to the list
        return [
          ...prevItems,
          {
            id: Date.now().toString() + Math.random(),
            title: newItemTitle,
            price: newItemPrice,
            quantity: 1,
          },
        ];
      });

      // Clear params to prevent duplicate triggers
      router.setParams({ title: undefined, price: undefined });
    }
  }, [params?.title, params?.price]);

  // Quantity Handlers
  const updateQuantity = (id: string, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === id);
      if (removedItem) {
        setSelectedOptions((prev) =>
          prev.filter((title) => title !== removedItem.title)
        );
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const toggleSelectionOption = (title: string) => {
    setSelectedOptions((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* TOP HERO SECTION WITH BACKGROUND */}
        <ImageBackground
          source={require('../../assets/images/booking.png')}
          style={styles.heroBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', '#000000']}
            locations={[0, 0.6, 1]}
            style={styles.gradientOverlay}
          >
            <SafeAreaView style={styles.safeHeaderArea}>
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

              <View style={styles.heroTitleContainer}>
                <Text style={styles.heroTitle}>
                  SELECT YOUR <Text style={styles.thinTitle}>THRILL</Text>
                </Text>
                <Text style={styles.heroSubtitle}>
                  Choose one or more experiences to build your ultimate gaming
                  session. Adjust quantities or add multiple packages to your
                  booking before confirming your details.
                </Text>
              </View>
            </SafeAreaView>

            {/* ITEM CARDS OVERLAY */}
            <View style={styles.itemsListContainer}>
              {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    No packages or experiences added yet.
                  </Text>
                </View>
              ) : (
                items.map((item) => (
                  <View key={item.id} style={styles.itemCard}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemPrice}>R {item.price}</Text>
                    </View>

                    <View style={styles.controlsRow}>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Feather name="minus" size={20} color="#FFFFFF" />
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>{item.quantity}</Text>

                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Feather name="plus" size={20} color="#FFFFFF" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.trashContainer}
                        onPress={() => removeItem(item.id)}
                      >
                        <Feather name="trash-2" size={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}

              <TouchableOpacity
                style={styles.addPackagesButton}
                onPress={() => router.push({
                  pathname: '/offers',
                  params: { existingItems: JSON.stringify(items) }
                })}
              >
                <Text style={styles.addPackagesText}>
                  ADD PACKAGES/EXPERIENCES
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* CLIENT DETAILS SECTION */}
        <View style={styles.formSection}>
          <Text style={styles.sectionHeaderTitle}>
            CLIENT <Text style={styles.thinTitle}>DETAILS</Text>
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name & Surname *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="John Doe"
              placeholderTextColor="#afafaf"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Johndoe@example.com"
              placeholderTextColor="#afafaf"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="081-992-4545"
              placeholderTextColor="#afafaf"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* NUMBER OF GUESTS */}
          <View style={styles.guestSection}>
            <Text style={styles.inputLabel}>Number Of Guests *</Text>
            <View style={styles.guestCounterRow}>
              <TouchableOpacity
                style={styles.guestQtyButton}
                onPress={() => setGuestCount((prev) => Math.max(1, prev - 1))}
              >
                <Feather name="minus" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.guestCountText}>{guestCount}</Text>

              <TouchableOpacity
                style={styles.guestQtyButton}
                onPress={() => setGuestCount((prev) => prev + 1)}
              >
                <Feather name="plus" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* CONFIRM SELECTION OPTIONS */}
          <Text style={[styles.sectionHeaderTitle, styles.confirmTitle]}>
            CONFIRM <Text style={styles.thinTitle}>SELECTION</Text>
          </Text>

          <View style={styles.radioGroup}>
            {items.length === 0 ? (
              <Text style={styles.noItemsText}>
                Add packages above to confirm selection.
              </Text>
            ) : (
              items.map((item) => {
                const isSelected = selectedOptions.includes(item.title);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.radioOption}
                    onPress={() => toggleSelectionOption(item.title)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected && styles.radioCircleActive,
                      ]}
                    />
                    <Text style={styles.radioText}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })
            )}
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.primaryPillButton}
              onPress={() =>
                router.push({
                  pathname: '/fees',
                  params: { items: JSON.stringify(items) },
                })
              }
            >
              <Text style={styles.primaryButtonText}>PROCEED TO CALCULATOR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FLOATING BOTTOM TAB BAR */}
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          
          {/* HOME */}
          <Pressable style={styles.tabItem} onPress={() => router.push('/')}>
            <Ionicons name="home-outline" size={20} color="#888888" />
          </Pressable>

          {/* OFFERS */}
          <Pressable
            style={styles.tabItem}
            onPress={() => router.push('/offers')}>
            <Ionicons name="bag-handle-outline" size={20} color="#888888" />
          </Pressable>

          {/* BOOKINGS */}
          <Pressable
            style={[styles.tabItem, styles.activeTab]}
            onPress={() => router.push('/booking')}>
            <Ionicons name="pricetag" size={18} color="#FFFFFF" />
            <Text style={styles.activeTabText}>Booking</Text>
          </Pressable>

          {/* CONTACT US */}
          <Pressable style={styles.tabItem}
            onPress={() => router.push('/contact')}>
            <Ionicons name="chatbubble-outline" size={20} color="#888888" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  heroBackground: {
    width: width,
  },
  gradientOverlay: {
    paddingBottom: 20,
  },
  safeHeaderArea: {
    paddingHorizontal: 0,
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
  heroTitleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    marginTop: 60,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
  thinTitle: {
    fontWeight: '300',
  },
  heroSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  itemsListContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  emptyText: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
  itemCard: {
    backgroundColor: '#000000BF',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
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
    fontWeight: '400',
    marginTop: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 2,
  },
  trashContainer: {
    marginLeft: 6,
    padding: 4,
  },
  addPackagesButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  addPackagesText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  formSection: {
    paddingHorizontal: 40,
    paddingTop: 30,
    backgroundColor: '#000000',
  },
  sectionHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#000000',
  },
  guestSection: {
    marginTop: 10,
    marginBottom: 30,
  },
  guestCounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  guestQtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestCountText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '400',
  },
  confirmTitle: {
    marginTop: 10,
    marginBottom: 30,
  },
  radioGroup: {
    gap: 16,
    marginBottom: 30,
  },
  noItemsText: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  radioCircleActive: {
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  radioText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  actionButtonsContainer: {
    alignItems: 'center',
    gap: 14,
    marginTop: 10,
  },
  primaryPillButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 250,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomBar: {
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