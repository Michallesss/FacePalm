'use client';
import { useSearchParams } from "next/navigation";

enum SortBy {
  'newest',
  'liked',
  'commented'
}

export default function Home() {
  const searchParams = useSearchParams();
  const by/*: SortBy | null*/ = searchParams.get('by');

  return (
    <main>
      <h1>Landing</h1>
      <p>Sorted by: {by}</p>
    </main>
  );
}
