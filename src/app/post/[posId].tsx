'use client';
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div>
      <h1>Post: {postId}</h1>
    </div>
  );
}