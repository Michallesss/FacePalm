'use server';

interface PostProps {
  author: string;
  title: string;
  content: string;
  date: Date;
  views: number;
  likes: number;
  comments: string[];
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function createPostService(postData: PostProps) {
  const url = new URL("/api/posts", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...postData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Create Post Service Error:", error);
  }
}

export async function getPostService(postId: string) {
  
}

export async function getPostsService() {
  
}