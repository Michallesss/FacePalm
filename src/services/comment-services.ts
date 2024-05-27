'use server';

import { getAuthToken } from "@/services/get-token";

export interface CreateCommentProps {
  author: number;
  content: string;
  post: string;
};

const baseUrl = process.env.API_URL;

export async function createCommentService(commentData: CreateCommentProps) {
  const url = new URL("/api/comments", baseUrl);
  const authToken = getAuthToken();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...commentData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Create Comment Service Error:", error);
    // throw error;
  }
}

export async function getCommentsService(postId: string) {
  // ? localhost:1337/api/comments?post=1
}