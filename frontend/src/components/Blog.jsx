import React from 'react';
import useFetch from '../hooks/useFetch';
import {useCurrentUser} from '../context/AuthContext';
import BlogPostCard from './BlogPostCard';
import Cookies from 'js-cookie';

const Blog = () => {
  const user = useCurrentUser();
  const getPostUrl = user ? 'http://localhost:5000/api/posts' : 'http://localhost:5000/public';
  const token = Cookies.get('token');
  const [data, loading, error] = useFetch(getPostUrl, token);
  const Posts = data;
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Blog
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              We use an agile approach to test assumptions and connect with the needs of your
              audience early and often.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {loading ? (
              <h1>Loading</h1>
            ) : error ? (
              <h1>Error</h1>
            ) : Posts ? (
              <>
                {Posts?.posts.map((post) => (
                  <BlogPostCard
                    key={post._id}
                    post={post}
                  />
                ))}
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
