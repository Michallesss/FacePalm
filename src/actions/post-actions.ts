'use server';
import { z } from 'zod';
import { cookies } from 'next/headers';

import { createPostService } from '@/services/post-services';
import { config } from './config';

const schemaPost = z.object({
  author: z.string(),
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

export async function createPostAction(formData: FormData) {
  const validatedFields = schemaPost.safeParse({
    author: '1', // TODO: Get authorId from JWT cookies
    title: formData.get('title'),
    content: formData.get('content'),
    date: new Date(),
    // views: 0,
    // likes: 0,
    // comments: [],
  });

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }

  const responseData = await createPostService(validatedFields.data);

  if (!responseData) {
    return {
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Create Post.',
    };
  }

  cookies().set('jwt', responseData.jwt, config);
}