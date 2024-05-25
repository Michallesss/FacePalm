'use server';
import { z } from 'zod';
import { getUserMeLoader } from "@/services/get-user-me-loader";
import { createPostService } from '@/services/post-services';
import { redirect } from 'next/navigation';

const schemaPost = z.object({
  author: z.number(),
  title: z.string().min(1).max(64, {
    message: 'Title must be between 1 and 64 characters',
  }),
  content: z.string().min(1).max(1024, {
    message: 'Content must be between 1 and 1024 characters',
  }),
  date: z.date().default(() => new Date()),
  views: z.number().default(0),
  likes: z.number().default(0),
  comments: z.array(z.string()).default([]),
});

export async function createPostAction(prevState: any, formData: FormData) {
  const user = await getUserMeLoader();

  if (!user.ok) return {
    ...prevState,
    ZodErrors: null,
    StrapiErrors: user.error,
    message: 'Failed to Create Post.',
  };

  const validatedFields = schemaPost.safeParse({
    author: user.data.id, // !!! NIE DZIAŁĄ !!!
    title: formData.get('title'),
    content: formData.get('content'),
    date: new Date(),
    views: 0,
    likes: 0,
    comments: [],
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }

  const responseData = await createPostService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Create Post.',
    };
  }

  return redirect(`/post/${responseData.id}`);
}