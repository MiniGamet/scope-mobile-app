import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import Markdown from "react-native-markdown-display";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Theme for syntax highlighting
import BackButtonSvg from "../../../src/assets/svgs/back-button.svg"; // Adjust the path to your SVG file
import { markdownStyles } from "../../utils/constants";
import { Post } from "../../utils/props";

interface PostScreenProps {
  route: RouteProp<{ params: { post: Post } }, "params">; // Use appropriate type for your post
}

const PostScreen: React.FC<PostScreenProps> = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();

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

  return (
    <View style={styles.container} key={post.id}>
      <Image
        style={styles.image}
        source={{ uri: post.imageUrl }} // Display the post image
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackButtonSvg width={30} height={30} />
      </TouchableOpacity>
      <View style={styles.articleContainer}>
        <ScrollView style={styles.article}>
          <View style={styles.header}>
            <Text style={styles.category}>{post.category}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.authorAndDate}>
              {post.authorName} &bull;{" "}
              {post.createdAt.toDate().toLocaleDateString()}
            </Text>
          </View>

          {renderMarkdown(post.content)}
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
  header: {
    marginBottom: 15,
  },
  category: {
    fontSize: 18,
    fontFamily: "Gabarito-Regular",
    color: "#ABA9A9",
    marginBottom: 5,
    textTransform: "capitalize",
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
  },
  content: {
    fontSize: 18,
    marginBottom: 15,
  },
});

export default PostScreen;
