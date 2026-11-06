import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function TabBar({ state, navigation }: any) {
  const router = useRouter();

  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              // Fallback to Expo Router's top-level router if navigation.navigate is undefined
              if (navigation?.navigate) {
                navigation.navigate(route.name);
              } else {
                router.push(
                  `/${route.name === "index" ? "" : route.name}` as any,
                );
              }
            }
          };

          const renderIcon = () => {
            const color = isFocused ? "#FFFFFF" : "#888888";
            const size = isFocused ? 18 : 20;

            switch (route.name) {
              case "index":
                return (
                  <Ionicons
                    name={isFocused ? "home" : "home-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "offers":
                return (
                  <Feather name="shopping-bag" size={size} color={color} />
                );
              case "booking":
                return (
                  <Ionicons
                    name={isFocused ? "pricetag" : "pricetag-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "contact":
                return (
                  <Ionicons
                    name={isFocused ? "chatbubble" : "chatbubble-outline"}
                    size={size}
                    color={color}
                  />
                );
              default:
                return (
                  <Ionicons name="square-outline" size={size} color={color} />
                );
            }
          };

          const label =
            route.name === "index"
              ? "Home"
              : route.name.charAt(0).toUpperCase() + route.name.slice(1);

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.activeTab]}
              activeOpacity={0.8}
            >
              {renderIcon()}
              {isFocused && <Text style={styles.activeTabText}>{label}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#000000",
    width: width * 0.88,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF1F",
  },
  tabItem: {
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B00",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 22,
    gap: 8,
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 14,
  },
});
