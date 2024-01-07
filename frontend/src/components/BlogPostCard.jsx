import React from 'react';
import {Link} from 'react-router-dom';
import DOMPurify from 'dompurify';

const BlogPostCard = ({post}) => {
  return (
    <article
      key={post._id}
      className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <Link to={`/posts/${post._id}`}>
        <img
          src={`http://localhost:5000/${post.featureImage}`}
          alt=""
          className="rounded-lg mb-4"
        />
      </Link>
      <div className="flex justify-between items-center mb-5 text-gray-500">
        {post.tags.map((tag) => {
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <svg
              className="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
            </svg>
            {tag}
          </span>;
        })}
        <span className="text-sm">14 days ago</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            className="w-7 h-7 rounded-full"
            src="https://www.waseemk.com/wp-content/uploads/2023/03/waseem.jpeg"
            alt="Waseem Khan Author avatar"
          />
          <span className="font-medium dark:text-white">Waseem Khan</span>
        </div>
        <Link
          to={`/posts/${post._id}`}
          className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
        >
          Read more
          <svg
            className="ml-2 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogPostCard;
