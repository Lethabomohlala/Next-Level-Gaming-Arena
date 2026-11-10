import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SlideMenu from "../SlideMenu";

const { width } = Dimensions.get("window");

interface CatalogItem {
  id: string;
  title: string;
  price: number;
  type: "package" | "experience";
}

const CATALOG: CatalogItem[] = [
  { id: "1", title: "ULTIMATE GAMER PASS", price: 1500, type: "package" },
  { id: "2", title: "ESPORTS TRAINING", price: 1500, type: "package" },
  { id: "3", title: "VIRTUAL REALITY", price: 750, type: "experience" },
  { id: "4", title: "ESCAPE ROOM CHALLENGE", price: 750, type: "experience" },
];

const STATION_PASS_OPTIONS = ["1 Hour Pass", "2 Hours Pass | Popular"];

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stationPass, setStationPass] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(1);

  const getFormattedDate = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [dateStr, setDateStr] = useState(getFormattedDate(new Date()));

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleCalculateFees = () => {
    const selectedItems = CATALOG.filter((item) => quantities[item.id] > 0).map(
      (item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: quantities[item.id],
      }),
    );

    // 1. Check if at least one package or experience is selected
    if (selectedItems.length === 0) {
      alert("Please select at least one package or experience to continue.");
      return;
    }

    // 2. Name validation: Check for Name & Surname (at least two words)
    const trimmedName = name.trim();
    const nameParts = trimmedName.split(/\s+/);
    if (!trimmedName || nameParts.length < 2) {
      alert("Please enter both your First Name and Surname.");
      return;
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      alert("Please enter a valid email address format (e.g., user@example.com).");
      return;
    }

    // 4. Phone number validation: Ensure exactly 10 digits
    const cleanedPhone = phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // 5. Date validation
    if (!dateStr.trim()) {
      alert("Please select or enter a valid Date.");
      return;
    }

    // 6. Station pass validation
    if (!stationPass) {
      alert("Please select a Station Pass duration.");
      return;
    }

    const total = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    router.push({
      pathname: "/fees",
      params: {
        items: JSON.stringify(selectedItems),
        name: trimmedName,
        email: email.trim(),
        phone: cleanedPhone,
        date: dateStr,
        stationPass,
        guestCount: String(guestCount),
        totalAmount: String(total.toFixed(2)),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={require("../../../assets/images/booking.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Semi-transparent dark overlay */}
        <View style={styles.backgroundOverlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* TOP HEADER */}
          <View style={styles.topHeader}>
            <View style={styles.logoBadge}>
              <Image
                source={require("../../../assets/images/logo.png")}
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
            {/* HERO SECTION */}
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>SELECT{"\n"}YOUR THRILL</Text>

              <Text style={styles.heroSubtitle}>
                Choose one or more experiences to build your ultimate gaming
                session. Adjust quantities or add multiple packages to your
                booking before confirming your details.
              </Text>
            </View>

            {/* AVAILABLE PACKAGES */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>
                <Text style={styles.boldTitle}>AVAILABLE</Text> PACKAGES
              </Text>

              {CATALOG.filter((i) => i.type === "package").map((item) => (
                <BlurView
                  key={item.id}
                  intensity={30}
                  tint="dark"
                  style={styles.selectionCard}
                >
                  <Text style={styles.itemTitle}>
                    {item.title} <Text style={styles.priceDivider}>|</Text> R{" "}
                    {item.price}
                  </Text>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() => handleQtyChange(item.id, -1)}
                    >
                      <Feather name="minus" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>
                      {quantities[item.id]}
                    </Text>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() => handleQtyChange(item.id, 1)}
                    >
                      <Feather name="plus" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </BlurView>
              ))}
            </View>

            {/* AVAILABLE EXPERIENCES */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>
                <Text style={styles.boldTitle}>AVAILABLE</Text> EXPERIENCES
              </Text>

              {CATALOG.filter((i) => i.type === "experience").map((item) => (
                <BlurView
                  key={item.id}
                  intensity={30}
                  tint="dark"
                  style={styles.selectionCard}
                >
                  <Text style={styles.itemTitle}>
                    {item.title} <Text style={styles.priceDivider}>|</Text> R{" "}
                    {item.price}
                  </Text>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() => handleQtyChange(item.id, -1)}
                    >
                      <Feather name="minus" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>
                      {quantities[item.id]}
                    </Text>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() => handleQtyChange(item.id, 1)}
                    >
                      <Feather name="plus" size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </BlurView>
              ))}
            </View>

            {/* CLIENT DETAILS FORM */}
            <View style={styles.formContainer}>
              <Text style={styles.sectionHeader}>
                <Text style={styles.boldTitle}>CLIENT</Text> DETAILS
              </Text>

              {/* NAME */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name & Surname *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="John Doe"
                  placeholderTextColor="#888888"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* EMAIL */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Johndoe@example.com"
                  placeholderTextColor="#888888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* PHONE */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="0819924545"
                  placeholderTextColor="#888888"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              {/* DATE */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date ( DD MMM YYYY) *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="06-11-2026"
                  placeholderTextColor="#888888"
                  value={dateStr}
                  onChangeText={setDateStr}
                />
              </View>

              {/* STATION PASS DROPDOWN */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Station Pass *</Text>
                <TouchableOpacity
                  style={styles.dropdownInput}
                  onPress={() => setIsDropdownOpen(true)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={
                      stationPass
                        ? styles.dropdownValueText
                        : styles.dropdownPlaceholderText
                    }
                  >
                    {stationPass || "Select Session Length"}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color="#FF3B00" />
                </TouchableOpacity>
              </View>

              <Text style={styles.disclaimerText}>
                <Text style={styles.disclaimerBold}>Disclaimer</Text> | Specific booking hours and any 
                additional fees are pending final admin confirmation. A mandatory 15-minute
                sanitization buffer applies after play ends.
              </Text>

              {/* GUESTS COUNTER */}
              <View style={styles.guestSection}>
                <Text style={styles.inputLabel}>Number Of Guests *</Text>
                <View style={styles.guestRow}>
                  <TouchableOpacity
                    style={styles.guestCircleBtn}
                    onPress={() =>
                      setGuestCount((prev) => Math.max(1, prev - 1))
                    }
                  >
                    <Feather name="minus" size={18} color="#FFFFFF" />
                  </TouchableOpacity>

                  <Text style={styles.guestCountText}>{guestCount}</Text>

                  <TouchableOpacity
                    style={styles.guestCircleBtn}
                    onPress={() => setGuestCount((prev) => prev + 1)}
                  >
                    <Feather name="plus" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* CALCULATE FEES BUTTON */}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleCalculateFees}
              >
                <Text style={styles.primaryButtonText}>CALCULATE FEES</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>

      {/* DROPDOWN MODAL FOR STATION PASS */}
      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Session Length</Text>
            {STATION_PASS_OPTIONS.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.modalOption,
                  stationPass === option && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setStationPass(option);
                  setIsDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    stationPass === option && styles.modalOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
    backgroundColor: "rgba(0, 0, 0, 0.15)",
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
    paddingBottom: 110,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  boldTitle: {
    fontWeight: "800",
  },
  heroSubtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
    maxWidth: width * 0.75,
  },
  sectionContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  sectionHeader: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "400",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 15,
  },
  selectionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 15,
    overflow: "hidden",
  },
  itemTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  priceDivider: {
    color: "#FFFFFF88",
    fontWeight: "300",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  counterBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF88",
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    minWidth: 16,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#FF3B00",
  },
  dropdownInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FF3B00",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownPlaceholderText: {
    color: "#888888",
    fontSize: 16,
  },
  dropdownValueText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
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
  disclaimerBold: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  guestSection: {
    alignItems: "center",
    marginVertical: 16,
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginTop: 10,
  },
  guestCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  guestCountText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#000000",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#000000",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#FFFFFF",
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#FFFFFF",
  },
  modalOptionSelected: {
    backgroundColor: "#FF3B001A",
    borderRadius: 8,
  },
  modalOptionText: {
    color: "#CCCCCC",
    fontSize: 16,
    textAlign: "center",
  },
  modalOptionTextSelected: {
    color: "#FF3B00",
    fontWeight: "700",
  },
});