import { StyleSheet } from "react-native";

export const markdownStyles = StyleSheet.create({
  body: {
    fontFamily: "LibreBaskerville-Regular",
    fontSize: 16,
    lineHeight: 25,
  },
  heading1: {
    fontSize: 28,
    marginTop: 35,
    marginBottom: 25,
    lineHeight: 35,
  },
  heading2: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
    lineHeight: 35,
  },
  heading3: {
    fontSize: 22,
    marginTop: 25,
    marginBottom: 15,
  },
  heading4: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  heading5: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  heading6: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
  },
  hr: {
    marginVertical: 30,
  },
  strong: {
    fontFamily: "LibreBaskerville-Bold",
  },
  em: {
    fontFamily: "LibreBaskerville-Italic",
  },
  s: {
    textDecorationLine: "line-through",
  },
  blockquote: {
    marginVertical: 10,
    padding: 15,
  },
  bullet_list: {
    marginVertical: 20,
    gap: 10,
  },
  ordered_list: {
    marginVertical: 20,
    gap: 10,
  },
  list_item: {},
  code_inline: {},
  code_block: {
    marginVertical: 30,
  },
  paragraph: {
    marginVertical: 15,
  },
});
