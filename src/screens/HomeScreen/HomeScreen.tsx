import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import PostCard from "../../_components/PostCard";
import {
  getDocs,
  collection,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Navbar from "../../_components/Navbar";
import { Post } from "../../utils/props";

SplashScreen.preventAutoHideAsync();

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // <-- NEW: refreshing state for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  // Extract fetch logic so we can call it on mount and on refresh.
  const fetchPosts = useCallback(async () => {
    try {
      // Optional: use orderBy to get newest posts first
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(fetchedPosts);
      // Note: filteredPosts will be recalculated by the effect below
    } catch (error) {
      console.error("Error fetching posts:", error);
      Alert.alert("Error", "Couldn't refresh posts. Try again later.");
    }
  }, []);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, [fetchPosts]);

  // Apply category filter
  useEffect(() => {
    let results = posts;

    // Filter by category first
    if (selectedCategory) {
      results = results.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Then apply search query
    if (searchQuery.trim() !== "") {
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(results);
  }, [selectedCategory, searchQuery, posts]);

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
      key={item.id}
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
        <Text style={styles.categoryTitle}>explore</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
    marginTop: 20,
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
  searchBar: {
    backgroundColor: "#e0e0e0ff",
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    fontSize: 18,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "80%",
    paddingLeft: 30,
    fontFamily: "Gabarito-Regular",
  },
});

export default HomeScreen;
