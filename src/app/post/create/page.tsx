'use client';
import { SubmitButton } from "@/components/SubmitButton";
import { createPostAction } from "@/actions/post-actions";
import { useFormState } from "react-dom";
import { ZodErrors } from "@/components/ZodErrors";
import { StrapiErrors } from "@/components/StrapiErrors";

const INITIAL_STATE = {
  ZodErrors: null,
  StrapiErrors: null,
  data: null,
  message: null,
};

export default function CreatePost() {
  const [formState, formAction] = useFormState(createPostAction, INITIAL_STATE);

  return (    
    <div className="bg-white dark:bg-gray-900 h-screen">
      <h1>Create Post</h1>
      <form className="max-w-sm mx-auto" action={formAction}>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <ZodErrors error={formState?.ZodErrors?.title} />
        
        <div className="mb-5">
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
          <textarea id="content" name="content" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
        </div>
        <ZodErrors error={formState?.ZodErrors?.content} />
        
        <div className="mb-5">
          <SubmitButton loadingText="Loading..." className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</SubmitButton>
        </div>
        <StrapiErrors error={formState?.StrapiErrors} />
      </form>
    </div>
  );
}