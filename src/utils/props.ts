import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  category: string;
  createdAt: Timestamp;
  imageUrl: string;
  updatedAt?: Timestamp;
}

export interface Event {
  id: string;
  title: string;
  date: Timestamp;
  imageUrl: string;
  description: string;
}
