import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  HomeIcon,
  OffersIcon,
  BookingIcon,
  ContactIcon,
} from "./TabIcons";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: any) {
  const insets = useSafeAreaInsets();

    // Define the exact display order you want
    const ORDER = ["index", "home", "offers", "booking", "bookings", "contact"];

    // Sort routes based on ORDER array
    const sortedRoutes = [...state.routes].sort((a, b) => {
        const aIndex = ORDER.indexOf(a.name.toLowerCase());
        const bIndex = ORDER.indexOf(b.name.toLowerCase());
        return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    });

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      <View style={styles.tabBar}>
        {sortedRoutes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const routeName = route.name.toLowerCase();

          // 1. Explicitly assign each icon based on route name
          let Icon;
          if (routeName === "index" || routeName === "home") {
            Icon = HomeIcon;
          } else if (routeName === "offers") {
            Icon = OffersIcon;
          } else if (routeName === "booking" || routeName === "bookings") {
            Icon = BookingIcon; // Explicitly assigns BookingIcon here!
          } else if (routeName === "contact") {
            Icon = ContactIcon;
          } else {
            Icon = ContactIcon; // Default fallback
          }

          const label = options.title ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                styles.tab,
                isFocused && styles.selectedTab,
              ]}
            >
              <Icon
                size={24}
                color={isFocused ? "#FFFFFF" : "#000000"}
                strokeWidth={1.8}
              />

              {isFocused && (
                <Text style={styles.selectedLabel}>{label}</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  tabBar: {
    width: "100%",
    maxWidth: 380,
    height: 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    shadowColor: "#FE492C",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  tab: {
    height: 55,
    minWidth: 55,
    paddingHorizontal: 18,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  selectedTab: {
    backgroundColor: "#FE492C",
  },
  selectedLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter_24pt-Light"
  },
});