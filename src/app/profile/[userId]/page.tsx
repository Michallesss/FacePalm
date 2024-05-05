'use client';
import { useParams } from 'next/navigation'

export default function Profile() {
  const params = useParams();

  return (
    <div>
      <h1>Profile: {params.userId}</h1>
    </div>
  );
}