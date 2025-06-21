import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useMenu } from "../context/MenuContext";

export default function HomeScreen() {
  const { menu } = useMenu();

  // Group menu items by course
  const groupedMenu: Record<string, typeof menu[0][]> = {};
  menu.forEach(item => {
    if (!groupedMenu[item.course]) groupedMenu[item.course] = [];
    groupedMenu[item.course].push(item);
  });

  const COURSE_ORDER = ["Starter", "Main", "Dessert"];

  // Calculate average price
  function getAveragePrice(items: typeof menu[0][]) {
    if (!items.length) return 0;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price;
    }
    return (total / items.length).toFixed(2);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image
          source={require("../../assets/images/cristo-logo.jpg")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.header}>Menu</Text>
      <FlatList
        data={COURSE_ORDER}
        keyExtractor={c => c}
        renderItem={({ item: course }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.courseHeader}>
              {course}
              {groupedMenu[course] && groupedMenu[course].length > 0 && (
                <Text style={styles.avgPrice}>
                  {"  "}Avg: R{getAveragePrice(groupedMenu[course])}
                </Text>
              )}
            </Text>
            {(groupedMenu[course] || []).map(menuItem => (
              <View key={menuItem.id} style={styles.menuItemRow}>
                <Text style={styles.menuItemName}>{menuItem.name}</Text>
                <Text style={styles.menuItemMeta}>
                  {menuItem.description} | R{menuItem.price}
                </Text>
              </View>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#A0522D", textAlign: "center", marginTop: 20 }}>
            No menu items found.
          </Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F3", padding: 24 },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 8,
  },
  logoImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F5EEE6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A0522D",
    marginBottom: 20,
    textAlign: "center",
  },
  courseHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#965C16",
    marginBottom: 8,
    marginTop: 12,
  },
  avgPrice: {
    fontWeight: "normal",
    fontSize: 14,
    color: "#A0522D",
  },
  menuItemRow: {
    backgroundColor: "#F5EEE6",
    borderRadius: 8,
    marginBottom: 8,
    padding: 10,
  },
  menuItemName: {
    fontWeight: "bold",
    color: "#A0522D",
    fontSize: 16,
  },
  menuItemMeta: {
    color: "#965C16",
    fontSize: 14,
    marginTop: 2,
  },
});