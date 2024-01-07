import React from 'react';
import {useCurrentUser} from '../context/AuthContext';
import Cookies from 'js-cookie';
import useFetch from '../hooks/useFetch';
import {Link} from 'react-router-dom';
import DOMPurify from 'dompurify';

const RelatedPosts = () => {
  const user = useCurrentUser();
  const getPostUrl = user ? 'http://localhost:5000/api/posts' : 'http://localhost:5000/public';
  const token = Cookies.get('token');
  const [data, loading, error] = useFetch(getPostUrl, token);
  const Posts = data;
  return (
    <aside
      aria-label="Related articles"
      className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
    >
      <div className="px-4 mx-auto max-w-screen-xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <h1>Loading</h1>
          ) : error ? (
            <h1>Error</h1>
          ) : Posts ? (
            <>
              {Posts?.posts.map((post, index) => {
                if (index < 4) {
                  return (
                    <article
                      key={post._id}
                      className="max-w-xs"
                    >
                      <Link to={`/posts/${post._id}`}>
                        <img
                          src={`http://localhost:5000/${post.featureImage}`}
                          className="mb-5 rounded-lg"
                          alt="Image 1"
                        />
                      </Link>
                      <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                      </h2>
                      <div key={post._id}>
                        <p
                          className="dark:text-gray-400"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.content.substring(0, 200)),
                          }}
                        />
                      </div>
                      <Link
                        to={`/posts/${post._id}`}
                        className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                      >
                        Read in 2 minutes
                      </Link>
                    </article>
                  );
                }
              })}
            </>
          ) : null}

          {Posts?.posts.map((post, index) => {
            <article className="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                  className="mb-5 rounded-lg"
                  alt="Image 1"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first office</a>
              </h2>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After months of
                preparation.
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 2 minutes
              </a>
            </article>;
          })}

          {/* <article className="max-w-xs">
            <a href="#">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
                className="mb-5 rounded-lg"
                alt="Image 2"
              />
            </a>
            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
              <a href="#">Enterprise design tips</a>
            </h2>
            <p className="mb-4  text-gray-500 dark:text-gray-400">
              Over the past year, Volosoft has undergone many changes! After months of preparation.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
            >
              Read in 12 minutes
            </a>
          </article>
          <article className="max-w-xs">
            <a href="#">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png"
                className="mb-5 rounded-lg"
                alt="Image 3"
              />
            </a>
            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
              <a href="#">We partnered with Google</a>
            </h2>
            <p className="mb-4  text-gray-500 dark:text-gray-400">
              Over the past year, Volosoft has undergone many changes! After months of preparation.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
            >
              Read in 8 minutes
            </a>
          </article>
          <article className="max-w-xs">
            <a href="#">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png"
                className="mb-5 rounded-lg"
                alt="Image 4"
              />
            </a>
            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
              <a href="#">Our first project with React</a>
            </h2>
            <p className="mb-4  text-gray-500 dark:text-gray-400">
              Over the past year, Volosoft has undergone many changes! After months of preparation.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
            >
              Read in 4 minutes
            </a>
          </article> */}
        </div>
      </div>
    </aside>
  );
};

export default RelatedPosts;
