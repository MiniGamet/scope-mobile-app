import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Timestamp } from "firebase/firestore";
import { Post } from "../utils/props";

interface PostCardProps {
  item: Post;
}

const PostCard: React.FC<PostCardProps> = ({ item }) => {
  const formattedDate = item.createdAt.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
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
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <View>
          <Text style={styles.info}>
            {item.authorName} &bull; {formattedDate}
          </Text>
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
    maxHeight: "100%",
    marginBottom: 15,
  },
  category: {
    textTransform: "capitalize",
    fontFamily: "Gabarito-Medium",
    fontSize: 17,
    color: "#ABA9A9",
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  title: {
    textTransform: "capitalize",
    fontFamily: "Gabarito-SemiBold",
    fontSize: 24,
    maxWidth: "100%",
    flexWrap: "wrap",
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

export default PostCard;
