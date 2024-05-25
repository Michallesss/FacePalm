'use server';
import { getAuthToken } from "@/services/get-token";

interface PostProps {
  author: number;
  title: string;
  content: string;
  date: Date;
  views: number;
  likes: number;
  comments: string[];
};

const baseUrl = process.env.API_URL;

export async function createPostService(postData: PostProps) {
  const url = new URL("/api/posts", baseUrl);
  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ data: { ...postData }}),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Create Post Service Error:", error);
    // throw error;
  }
}

export async function getPostService(postId: string) {
  
}

export async function getPostsService() {
  
}