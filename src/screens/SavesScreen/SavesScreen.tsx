import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Event } from "../../utils/props"; // Adjust the path to your types
import EventCard from "../../_components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../_components/Navbar";
import { Timestamp } from "firebase/firestore";

const SavesScreen: React.FC = ({ navigation }) => {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);

  // Load saved events when the screen is mounted
  useEffect(() => {
    const loadSavedEvents = async () => {
      try {
        const savedEventsString =
          (await AsyncStorage.getItem("savedEvents")) || "[]";
        const parsedEvents = JSON.parse(savedEventsString);

        // Convert date strings back to Timestamp objects
        const convertedEvents = parsedEvents.map((event: Event) => ({
          ...event,
          //   date: event.date
          //     ? Timestamp.fromMillis(Date.parse(event.date))
          //     : null,
        }));

        setSavedEvents(convertedEvents);
      } catch (error) {
        console.error("Failed to load saved events: ", error);
      }
    };

    loadSavedEvents();
  }, [savedEvents]);

  // Render each event
  const renderEvents = ({ item }: { item: Event }) => {
    // Convert nanoseconds to milliseconds
    const millisecondsFromNano = item.date["nanoseconds"] / 1000000;
    // Create a Date object using the seconds
    const date = new Date(item.date["seconds"] * 1000);

    item = { ...item, date: Timestamp.fromDate(date) };

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => navigation.navigate("Event", { event: item })} // Navigate to Event screen
      >
        <EventCard item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.savesTitleContainer}>
        <Text style={styles.savesTitle}>saved</Text>
      </View>
      {savedEvents.length === 0 ? (
        <Text style={styles.noSavesTitle}>No saved events yet.</Text>
      ) : (
        <FlatList
          data={savedEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvents}
        />
      )}
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    gap: 20,
  },
  savesTitleContainer: {
    width: "100%",
    gap: 10,
  },
  savesTitle: {
    textTransform: "lowercase",
    fontFamily: "Gabarito-Medium",
    fontSize: 25,
    textAlign: "left",
    paddingHorizontal: 30,
  },
  noSavesTitle: {
    fontFamily: "Gabarito-Medium",
    fontSize: 25,
    textAlign: "left",
    paddingHorizontal: 30,
  },
  eventCard: {
    marginLeft: 25,
  },
});

export default SavesScreen;
