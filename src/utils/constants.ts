import { StyleSheet } from "react-native";

export const markdownStyles = StyleSheet.create({
  body: {
    fontFamily: "LibreBaskerville-Regular",
    fontSize: 16,
    lineHeight: 25,
  },
  heading1: {
    fontSize: 32,
    fontFamily: "LibreBaskerville-Bold",
    marginBottom: 25,
    lineHeight: 35,
  },
  heading2: {
    fontSize: 24,
    fontFamily: "LibreBaskerville-Bold",
    marginVertical: 30,
    marginBottom: 8,
    lineHeight: 35,
  },
  heading3: {},
  heading4: {},
  heading5: {},
  heading6: {},
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
    marginVertical: 30,
  },
});
