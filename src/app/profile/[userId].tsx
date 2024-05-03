'use client';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div>
      <h1>Profile: {userId}</h1>
    </div>
  );
}