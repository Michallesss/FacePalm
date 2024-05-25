'use client';
import Comment from '@/components/Comment';
import { createCommentAction } from '@/actions/comment-actions';
import { useFormState } from 'react-dom';
import { ZodErrors } from '@/components/ZodErrors';
import { StrapiErrors } from '@/components/StrapiErrors';
import { SubmitButton } from '@/components/SubmitButton';

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
}

type PostParams = { params: { postId: string} };

export default function Post({ params }: PostParams) { // https://flowbite.com/blocks/publisher/blog-templates/
  const [formState, formAction] = useFormState(createCommentAction, INITIAL_STATE);

  const content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, animi? Esse omnis assumenda voluptas tenetur minus sequi cum nemo numquam debitis voluptatibus non porro reiciendis sapiente, repellat possimus impedit quaerat?";
  const author = { name: "Jese Leos", avatar: "https://flowbite.com/docs/images/people/profile-picture-2.jpg" };
  const date = "Feb. 8, 2022";
  const title = "Best practices for successful prototypes";
  const commentsCount = 3;

  // return <h1>Post: {params.postId}</h1>;
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:text-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format"> {/* Header section */}
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src={author.avatar}
                  alt={author.name}
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {author.name}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time
                      pubdate=""
                      dateTime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {date}
                    </time>
                  </p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {title}
            </h1>
          </header>
          <article> {/* Content section */}
            {content}
          </article>
          <section className="not-format"> {/* Comment section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Discussion ({commentsCount})
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
            {/* {.map((comment, index) => ())} */}
            <Comment content='lorem ipsum' date='Feb. 8, 2022' author={{ id: "-1", name: "Michael Gough", avatar: "https://flowbite.com/docs/images/people/profile-picture-2.jpg" }} />
            <Comment content='ipsum lorem' date='Mar. 12, 2022' author={{ id: "-1", name: "Bonnie Green", avatar: "https://flowbite.com/docs/images/people/profile-picture-3.jpg" }} />
            <Comment content='lorem ipsum chuj' date='Jun. 23, 2022' author={{ id: "-1", name: "Helene Engels", avatar: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg' }} />
          </section>
        </article>
      </div>
    </main>
  );
}