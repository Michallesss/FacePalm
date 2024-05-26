'use client'; // ! NOT COMPLEAT
// Next
import Link from "next/link";
// import { useSearchParams } from "next/navigation"; // TODO: use later
// React
import { useState, useEffect } from "react";
import Post from "@/components/Post";
// Services 
import { getPostsService } from "@/services/post-services";
// Types || Interfaces
import { IPost } from "@/interfaces/IPost";
type By = 'newest' | 'liked' | 'commented' | any;

export default function Home() {
  // const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<By>(/*searchParams.get('by') || */'newest');
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Array<IPost>>();

  useEffect(() => { // ? https://stackoverflow.com/questions/77742713/how-to-use-async-await-inside-client-component-in-next-js || https://github.com/vercel/next.js/discussions/63862
    async function fetch() {
      const response = await getPostsService(sortBy, page, 10);
      // console.log(response); // ! For testing
      setData(response.data);
    } 
    fetch();
  }, [page, sortBy]);

  return (
    <section className="bg-white dark:bg-gray-900 h-full">
      <div className="flex justify-between px-4 py-4 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center">
          <a href="#" className="text-xl font-bold text-gray-900 dark:text-white">FacePalm</a>
        </div>
        <div className="flex items-center">
          <Link href="/post/create" className="text-gray-500 dark:text-gray-400">Sign In</Link>
          <Link href="/sign" className="ml-4 text-white bg-blue-500 px-4 py-2 rounded-md">Create Post</Link>
        </div>
      </div>
        
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">FacePalm</h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Sort by: {sortBy}.</p>
        </div> 

        <div className="flex justify-center mb-8">
          <button onClick={() => setSortBy('newest')} className={`mr-4 text-sm font-medium text-gray-500 dark:text-gray-400 ${sortBy === 'newest' ? 'text-primary-600 dark:text-primary-500' : ''}`}>Newest</button>
          <button onClick={() => setSortBy('liked')} className={`mr-4 text-sm font-medium text-gray-500 dark:text-gray-400 ${sortBy === 'liked' ? 'text-primary-600 dark:text-primary-500' : ''}`}>Liked</button>
          <button onClick={() => setSortBy('commented')} className={`mr-4 text-sm font-medium text-gray-500 dark:text-gray-400 ${sortBy === 'commented' ? 'text-primary-600 dark:text-primary-500' : ''}`}>Commented</button>
          <button onClick={() => setSortBy('viewed')} className={`text-sm font-medium text-gray-500 dark:text-gray-400 ${sortBy === 'viewed' ? 'text-primary-600 dark:text-primary-500' : ''}`}>Viewed</button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {data?.map((post, index) => (
            <Post key={index} id={post.id} title={post.attributes.title} date={post.attributes.createdAt} content={post.attributes.content} author={post.attributes.author?.data.attributes} />
          ))}
        </div>  
      </div>

      <div className="flex justify-center pb-8">
        <button onClick={() => setPage(page - 1)} className="mr-4 text-sm font-medium text-gray-500 dark:text-gray-400">Previous</button>
        <button onClick={() => setPage(page + 1)} className="text-sm font-medium text-gray-500 dark:text-gray-400">Next</button>
      </div>
    </section>
  );
}
