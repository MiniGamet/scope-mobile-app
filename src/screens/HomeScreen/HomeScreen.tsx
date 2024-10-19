import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import PostCard from "../../_components/PostCard";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Navbar from "../../_components/Navbar";

SplashScreen.preventAutoHideAsync();

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  category: string;
  createdAt: Timestamp;
  imageUrl: string;
  updatedAt?: Timestamp;
}

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts); // Initially show all posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Apply category filter
  useEffect(() => {
    if (selectedCategory) {
      const filtered = posts.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // Show all posts if no category is selected
    }
  }, [selectedCategory, posts]);

  const [loaded, error] = useFonts({
    "Gabarito-Bold": require("../../../src/assets/fonts/Gabarito-Bold.ttf"),
    "Gabarito-Medium": require("../../../src/assets/fonts/Gabarito-Medium.ttf"),
    "Gabarito-SemiBold": require("../../../src/assets/fonts/Gabarito-SemiBold.ttf"),
    "Gabarito-Regular": require("../../../src/assets/fonts/Gabarito-Regular.ttf"),
    "LibreBaskerville-Regular": require("../../../src/assets/fonts/LibreBaskerville-Regular.ttf"),
    "LibreBaskerville-Italic": require("../../../src/assets/fonts/LibreBaskerville-Italic.ttf"),
    "LibreBaskerville-Bold": require("../../../src/assets/fonts/LibreBaskerville-Bold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const categories = [
    { text: "all", color: "#d3d3d3" },
    { text: "lifestyle", color: "#F2B67E" },
    { text: "crime", color: "#8DBEC5" },
    { text: "art", color: "#C4ADF7" },
    { text: "food", color: "#E3869C" },
    { text: "announcement", color: "#FF9094" },
  ];

  const renderPosts = ({ item }: { item: Post }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Post", { post: item })}
    >
      <PostCard item={item} />
    </TouchableOpacity>
  );

  const renderCategory = ({
    item,
  }: {
    item: { text: string; color: string };
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.text == "all" ? null : item.text)}
    >
      <View style={[styles.category, { backgroundColor: item.color }]}>
        <Text style={styles.categoryText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} onLayout={handleOnLayout}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>explore by category</Text>
        <View style={styles.categories}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.text}
            renderItem={renderCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPosts}
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
  categoryContainer: {
    width: "100%",
    gap: 10,
  },
  categoryTitle: {
    textTransform: "lowercase",
    fontFamily: "Gabarito-Medium",
    fontSize: 25,
    textAlign: "left",
    paddingHorizontal: 30,
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
    paddingLeft: 30,
  },
  category: {
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginRight: 10,
    minWidth: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontFamily: "Gabarito-Medium",
    fontSize: 18,
  },
});

export default HomeScreen;
