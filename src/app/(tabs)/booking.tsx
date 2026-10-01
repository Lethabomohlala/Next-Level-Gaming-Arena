import { View, Text, StyleSheet } from "react-native";

export default function BookingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BOOKING SCREEN</Text>
      <Text style={styles.subtitle}>
        Navigation is working!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter_28pt-Bold",
    marginBottom: 8,
    color: "#ffffff",
  },
  subtitle: {
    fontFamily: "Inter_18pt-Light",
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
});