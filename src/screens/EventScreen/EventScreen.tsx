import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import Markdown from "react-native-markdown-display";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButtonSvg from "../../../src/assets/svgs/back-button.svg"; // Adjust the path to your SVG file
import SaveButtonSvg from "../../../src/assets/svgs/save-icon.svg";
import SavedButtonSvg from "../../../src/assets/svgs/saved-icon.svg";
import { Event } from "../../utils/props";
import { markdownStyles } from "../../utils/constants";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Theme for syntax highlighting
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
// import { forHorizontalIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";

interface EventScreenProps {
  route: RouteProp<{ params: { event: Event } }, "params">; // Use appropriate type for your event
}

const EventScreen: React.FC<EventScreenProps> = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false); // State to track if the event is saved

  const formattedDate = event.date.toDate().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const renderMarkdown = (content: string) => {
    return (
      <Markdown
        style={markdownStyles}
        rules={{
          code_block: (node, children, parent, styles) => (
            <ScrollView horizontal>
              <SyntaxHighlighter language="javascript" style={atomDark}>
                {node.content}
              </SyntaxHighlighter>
            </ScrollView>
          ),
        }}
      >
        {content}
      </Markdown>
    );
  };

  // Function to save the event
  const toggleSaveEvent = async () => {
    try {
      const savedEvents = (await AsyncStorage.getItem("savedEvents")) || "[]";
      const savedEventsArray = JSON.parse(savedEvents);

      // Check if the event is already saved
      const eventIndex = savedEventsArray.findIndex(
        (savedEvent: Event) => savedEvent.id === event.id
      );

      if (eventIndex !== -1) {
        // If event is found in saved list, remove it (unsave)
        savedEventsArray.splice(eventIndex, 1);
        await AsyncStorage.setItem(
          "savedEvents",
          JSON.stringify(savedEventsArray)
        );
        setIsSaved(false); // Update state to reflect unsaved event
      } else {
        // If event is not found, add it to saved list
        savedEventsArray.push(event);
        await AsyncStorage.setItem(
          "savedEvents",
          JSON.stringify(savedEventsArray)
        );
        setIsSaved(true); // Update state to reflect saved event
      }
    } catch (error) {
      console.error("Failed to save/unsave the event: ", error);
      Alert.alert("Error", "Failed to save/unsave the event.");
    }
  };

  // Check if the event is already saved on load
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const savedEvents = (await AsyncStorage.getItem("savedEvents")) || "[]";
        const savedEventsArray = JSON.parse(savedEvents);

        const isAlreadySaved = savedEventsArray.find(
          (savedEvent: Event) => savedEvent.id === event.id
        );
        if (isAlreadySaved) {
          setIsSaved(true); // If already saved, update state
        }
      } catch (error) {
        console.error("Failed to check if event is saved: ", error);
      }
    };
    checkIfSaved();
  }, []);

  console.log(event.description);

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
          <View style={styles.articleHeader}>
            <View>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.authorAndDate}>{formattedDate}</Text>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={toggleSaveEvent}
            >
              {isSaved ? (
                <SavedButtonSvg width={30} height={30} />
              ) : (
                <SaveButtonSvg width={30} height={30} />
              )}
            </TouchableOpacity>
          </View>

          {renderMarkdown(event.description)}
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
  saveButton: {
    // position: "absolute",
    // top: 50,
    // left: 0,
    // zIndex: 10, // Ensures it overlaps the image
    // backgroundColor: "#EDEDED", // Optional: semi-transparent background for better visibility
    borderRadius: 50,
    // padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 10,
  },
  articleHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
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
    // marginBottom: 25,
  },
  content: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default EventScreen;
