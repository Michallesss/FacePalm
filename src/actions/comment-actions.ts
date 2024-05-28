'use server';
import { z } from 'zod';
import { getUserMeLoader } from "@/services/get-user-me-loader";
import { createCommentService } from '@/services/comment-services';
import { redirect } from 'next/navigation';

const createCommentSchema = z.object({
  author: z.number(),
  content: z.string().min(1).max(512, {
    message: 'Content must be between 1 and 512 characters',
  }),
  post: z.string(),
});

export async function createCommentAction(prevState: any, formData: FormData) {
  const user = await getUserMeLoader();

  if (!user.ok) return {
    ...prevState,
    ZodErrors: null,
    StrapiErrors: user.error,
    message: 'Failed to Create Comment.',
  };

  const validatedFields = createCommentSchema.safeParse({
    author: user.data.id, // !!! NIE DZIAŁĄ !!!
    content: formData.get('content'),
    post:  formData.get('postId'), // !!! NIE DZIAŁĄ !!!
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

  return redirect(`/post/${validatedFields.data.post}`); // for reload page
};