'use server';

interface CommentProps {
  author: string;
  content: string;
  date: Date;
  post: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function createCommentService(commentData: CommentProps) {
  const url = new URL("/api/comments", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  
}