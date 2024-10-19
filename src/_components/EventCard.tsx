import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Timestamp } from "firebase/firestore";

interface EventCardProps {
  item: {
    id: string;
    title: string;
    date: Timestamp;
    imageUrl: string;
    description: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ item }) => {
  const formattedDate = item.date.toDate().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Image
            style={styles.image}
            source={{
              width: 180,
              height: 125,
              uri: item.imageUrl,
            }}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.info}>{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    // backgroundColor: "blue",
    maxWidth: "100%",
    width: 380,
    height: "100%",
    // paddingVertical: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    textTransform: "capitalize",
    fontFamily: "Gabarito-SemiBold",
    fontSize: 28,
  },
  info: {
    fontFamily: "Gabarito-Medium",
    fontSize: 17,
    color: "#ABA9A9",
  },
  image: {
    borderRadius: 25,
  },
});

export default EventCard;
