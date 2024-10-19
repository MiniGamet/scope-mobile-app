import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import Navbar from "../../_components/Navbar";
import EventCard from "../../_components/EventCard";

interface Event {
  id: string;
  title: string;
  date: Timestamp;
  imageUrl: string;
  description: string;
}

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Get all documents from the 'events' collection
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];

        // Set events to state
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Render each event
  const renderEvents = ({ item }: { item: Event }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Event", { event: item })} // Navigate to Event screen
    >
      <EventCard item={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.eventTitleContainer}>
        <Text style={styles.eventTitle}>events</Text>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvents}
      />
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  eventTitleContainer: {
    width: "100%",
    gap: 10,
  },
  eventTitle: {
    textTransform: "lowercase",
    fontFamily: "Gabarito-Medium",
    fontSize: 25,
    textAlign: "left",
    paddingHorizontal: 30,
  },
});

export default EventsScreen;
