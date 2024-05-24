'use server';
import { z } from 'zod';
import { cookies } from 'next/headers';

import { createCommentService } from '@/services/comment-services';
import { config } from './config';

const schemaComment = z.object({
  author: z.string(),
  content: z.string().min(1).max(512, {
    message: 'Content must be between 1 and 512 characters',
  }),
  date: z.date().default(() => new Date()),
  post: z.string(),
});

export async function createCommentAction(prevState: any, formData: FormData) {
  const validatedFields = schemaComment.safeParse({
    author: '1', // TODO: Get authorId from JWT cookies
    content: formData.get('content'),
    date: new Date(),
    post:  formData.get('postId'), // ?? Not really secure
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Create Comment.',
    }
  }

  const responseData = await createCommentService(validatedFields.data);

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
      message: 'Failed to Create Comment.',
    };
  }

  cookies().set('jwt', responseData.jwt, config);
};