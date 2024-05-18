'use client';
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Post from "@/components/Post";

type By = 'newest' | 'liked' | 'commented' | any;

export default function Home() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<By>(searchParams.get('by') || 'newest');

  return (
    <section className="bg-white dark:bg-gray-900 h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">FacePalm</h2>
              <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Sort by: {sortBy}.</p>
          </div> 
          <div className="grid gap-8 lg:grid-cols-2">
            <Post label="How to quickly deploy a static website" date="14 days ago" text="Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers." link="" author={{ name: "Jese Leos", avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" }} />
            <Post label="Our first project with React" date="14 days ago" text="Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers." link="" author={{ name: "Bonnie Green", avatar: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" }} />                
          </div>  
      </div>
    </section>
  );
}
