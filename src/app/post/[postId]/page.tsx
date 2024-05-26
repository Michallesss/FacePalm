'use client'; // ! NOT COMPLEAT 
// Next 
import Link from 'next/link';
// React
import { useState, useEffect, use } from 'react';
import { useFormState } from 'react-dom';
// Components
import Comment from '@/components/Comment';
import { ZodErrors } from '@/components/ZodErrors';
import { StrapiErrors } from '@/components/StrapiErrors';
import { SubmitButton } from '@/components/SubmitButton';
// Actions || Services
import { createCommentAction } from '@/actions/comment-actions';
import { getPostService } from '@/services/post-services';

// State
const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
}

// Types || Interfaces
type PostParams = { params: { postId: string} };
import { IPost } from '@/interfaces/IPost';

export default function Post({ params }: PostParams) { // https://flowbite.com/blocks/publisher/blog-templates/
  const [formState, formAction] = useFormState(createCommentAction, INITIAL_STATE);
  const [data, setData] = useState<IPost>();

  useEffect(() => {
    async function fetch() {
      const response = await getPostService(params.postId);
      setData(response.data);
    }
    fetch();
  }, []);
  
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:text-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src={"https://avatars.githubusercontent.com/u/77624159?v=4"}
                  alt={data?.attributes.author?.data.attributes.username}
                />
                <div>
                  <Link
                    href={`/profile/${data?.attributes.author?.data.id}`}
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {data?.attributes.author?.data.attributes.username}
                  </Link>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time
                      pubdate=""
                      dateTime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {data?.attributes.createdAt}
                    </time>
                  </p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {data?.attributes.title}
            </h1>
          </header>
          <article> {/* Content section */}
            {data?.attributes.content}
          </article>
          <section className="not-format"> {/* Comment section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Discussion ({data?.attributes.comments?.data.length.toString()})
              </h2>
            </div>
            <form className="mb-6" action={formAction}>
              <input type='hidden' name='postId' id='postId' value={params.postId} />

              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                  defaultValue={""}
                />
                <ZodErrors error={formState?.zodErrors?.content} />
              </div>

              <SubmitButton
                text='Post comment'
                loadingText='Loading'
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              />
              <StrapiErrors error={formState?.strapiErrors} />

            </form>
            {data?.attributes.comments?.data.map((comment, index) => (
              <Comment key={index} content={comment.attributes.content} date={comment.attributes.createdAt} author={data?.attributes.author} /* filled with wrong data */ />
            ))}
          </section>
        </article>
      </div>
    </main>
  );
}