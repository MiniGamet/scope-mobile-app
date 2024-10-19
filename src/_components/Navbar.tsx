import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeIconSvg from "../../src/assets/svgs/home-icon.svg"; // Adjust the path to your SVG file
import EventsIconSvg from "../../src/assets/svgs/events-icon.svg"; // Adjust the path to your SVG file
import SaveIconSvg from "../../src/assets/svgs/save-icon.svg"; // Adjust the path to your SVG file

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get current screen name

  // Function to handle navigation
  const handleNavigate = (screen: string) => {
    navigation.navigate(screen);
  };

  // Function to check if the screen is active
  const isActive = (screen: string) => route.name === screen;

  return (
    <View style={styles.navbar}>
      {/* Home Button */}
      <TouchableOpacity
        style={[
          styles.navButton,
          isActive("Home") && styles.activeButton, // Highlight active button
        ]}
        onPress={() => handleNavigate("Home")}
      >
        <HomeIconSvg
          width={30}
          height={30}
          color={isActive("Home") ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      {/* Events Button */}
      <TouchableOpacity
        style={[
          styles.navButton,
          isActive("Events") && styles.activeButton, // Highlight active button
        ]}
        onPress={() => handleNavigate("Events")}
      >
        <EventsIconSvg
          width={30}
          height={30}
          color={isActive("Events") ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      {/* Saved Button */}
      <TouchableOpacity
        style={[
          styles.navButton,
          isActive("Saved") && styles.activeButton, // Highlight active button
        ]}
        onPress={() => handleNavigate("Saved")}
      >
        <SaveIconSvg
          width={30}
          height={30}
          color={isActive("Saved") ? "#fff" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navButton: {
    padding: 15,
    borderRadius: 50,
  },
  activeButton: {
    backgroundColor: "#FFA640", // Highlight color for active button
  },
});

export default Navbar;
