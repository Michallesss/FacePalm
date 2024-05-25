'use client';
import Form from '@/layouts/Form';
import Input from '@/components/Input';
import { SubmitButton } from "@/components/SubmitButton";
import { createPostAction } from "@/actions/post-actions";
import { useFormState } from "react-dom";
import { ZodErrors } from "@/components/ZodErrors";
import { StrapiErrors } from "@/components/StrapiErrors";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export default function CreatePost() {
  const [formState, formAction] = useFormState(createPostAction, INITIAL_STATE);

  return (    
    <Form title="Create Post" action={formAction}>
      <Input label="Title" name='title' type="text" autoComplete="off" required />
      <ZodErrors error={formState?.zodErrors?.title} />

      <Input label="Content" name='content' type="text" autoComplete="off" required />
      <ZodErrors error={formState?.zodErrors?.content} />

      <div>
        <SubmitButton
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          text="Post"
          loadingText="Loading"
        />
      </div>

      <StrapiErrors error={formState?.strapiErrors} />

      <p className="mt-10 text-center text-sm text-gray-500">
        You&apos;re new? {" "}
        <a href="up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</a>
      </p>
    </Form>
  );
}