'use server';
// Services
import { getAuthToken } from "@/services/get-token";
// import sq from "sq";

// Types || Interfaces
export interface createPostProps {
  author: number;
  title: string;
  content: string;
  views: number;
  comments: number[];
  reactions: number[];
};

// import { IPost } from "@/interfaces/IPost";
// export interface getPostsProps {
//   data: [
//     IPost
//   ]
// }

const baseUrl = process.env.API_URL;

export async function createPostService(postData: createPostProps) {
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
  const url = new URL(`/api/posts/${postId}?populate=*`, baseUrl); // TODO: optimize populating

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
      by = "createdAt:desc";
      break;
    case "liked":
      by = "reactions:desc"; // TODO: sort by views array length
      break;
    case "viewed":
      by = "views:desc";
      break;
    case "commented":
      by = "comments:desc"; // TODO: sort by views array length
      break;
  }

  const url = new URL(`/api/posts?populate=*&sort[0]=${by}&pagination[page]=${startPage}&pagination[pageSize]=${pageSize}`, baseUrl); // TODO: optimize populating

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