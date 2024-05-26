'use server';
import { getAuthToken } from "@/services/get-token";
// import sq from "sq";

interface PostProps {
  author: number;
  title: string;
  content: string;
  views: number;
  comments: number[];
  reactions: number[];
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
  const url = new URL(`/api/posts/${postId}`, baseUrl);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({}),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Get Post Service Error:", error);
    // throw error;
  }
}

export async function getPostsService(sortBy: string, startPage: number, pageSize: number) {
  let by = "";
  switch (sortBy) {
    case "newest":
      by = "date:desc";
      break;
    case "liked":
      by = "likes:desc";
      break;
    case "commented":
      by = "comments:desc"; // TODO: check this
      break;
  }

  const url = new URL(`/api/posts?sort[0]=${by}?pagination[page]=${startPage}?pagination[pageSize]=${pageSize}`, baseUrl);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({}),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Get Posts Service Error:", error);
    // throw error;
  }
}