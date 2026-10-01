import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      {/* Offers */}
      <Tabs.Screen
        name="offers"
        options={{
          title: "Offers",
        }}
      />

      {/* Booking */}
      <Tabs.Screen
        name="booking"
        options={{
          title: "Bookings",
        }}
      />

      {/* Contact */}
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact Us",
        }}
      />
    </Tabs>
  );
}