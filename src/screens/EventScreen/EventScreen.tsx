import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import Markdown from "react-native-markdown-display";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButtonSvg from "../../../src/assets/svgs/back-button.svg"; // Adjust the path to your SVG file
import { Event } from "../../utils/props";
// import { forHorizontalIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";

interface EventScreenProps {
  route: RouteProp<{ params: { event: Event } }, "params">; // Use appropriate type for your event
}

const EventScreen: React.FC<EventScreenProps> = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  const formattedDate = event.date.toDate().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const markdown = `# 🎉 [Event Name]

**Date:** [Event Date]  
**Time:** [Start Time] - [End Time]  
**Location:** [Event Location]  
**Organizer:** [Organizer Name or Organization]

---

## Description

Join us for [brief description of the event, e.g., "an exciting day of learning, networking, and fun!"] The event will feature [highlights of the event, e.g., "guest speakers, interactive sessions, and plenty of opportunities to connect with others in the community."] 

---

## Agenda

| Time        | Activity                          |
|-------------|-----------------------------------|
| [Start Time] | [Activity 1]                     |
| [Time]      | [Activity 2]                     |
| [Time]      | [Activity 3]                     |

---

## Speakers

- **[Speaker Name 1]**  
  *[Title/Role, e.g., "CEO of Company"]*  
  [Short bio or description of the speaker]

- **[Speaker Name 2]**  
  *[Title/Role, e.g., "Expert in Industry"]*  
  [Short bio or description of the speaker]

---

## How to Register

Please [register here](URL-to-registration-page) to secure your spot.

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));

\`\`\`

---

> Imagination is more important than knowledge

---

## Contact Information

For more information, please contact:  
**Email:** [contact@example.com]  
**Phone:** [Phone Number]  

---

We hope to see you there! 🎊
`;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: event.imageUrl }} // Display the post image
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackButtonSvg width={30} height={30} />
      </TouchableOpacity>
      <View style={styles.articleContainer}>
        <ScrollView style={styles.article}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.authorAndDate}>{formattedDate}</Text>

          <Markdown style={markdownStyles}>{markdown}</Markdown>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 350,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10, // Ensures it overlaps the image
    backgroundColor: "#EDEDED", // Optional: semi-transparent background for better visibility
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  articleContainer: {
    flex: 1, // Ensures it takes up the remaining space
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    marginTop: -50, // Overlap the image slightly
    paddingTop: 40,
    paddingHorizontal: 30,
  },
  article: {
    flexGrow: 1,
  },
  category: {
    fontSize: 18,
    fontFamily: "Gabarito-Regular",
    color: "#ABA9A9",
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  authorAndDate: {
    fontSize: 18,
    fontFamily: "Gabarito-Regular",
    color: "#ABA9A9",
    marginBottom: 25,
  },
  content: {
    fontSize: 18,
    marginBottom: 15,
  },
});

const markdownStyles = {
  body: {
    fontFamily: "LibreBaskerville-Regular",
    fontSize: 16,
  },
  heading1: {
    fontSize: 20,
    fontFamily: "LibreBaskerville-bold",
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "LibreBaskerville-bold",
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 50,
    lineHeight: 20,
  },
};

export default EventScreen;
