import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="offers" options={{ title: "Offers" }} />
      <Tabs.Screen name="booking" options={{ title: "Booking" }} />
      <Tabs.Screen name="contact" options={{ title: "Contact Us" }} />
    </Tabs>
  );
}
