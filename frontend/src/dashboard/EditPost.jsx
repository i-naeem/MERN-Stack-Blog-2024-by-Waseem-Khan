import React, {useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {usePostContext} from '../context/PostContext';
import {Error} from '../components/Error';

const EditPost = () => {
  const {getPost, error, loading, updatePost} = usePostContext();
  const navigate = useNavigate();
  const {post_id} = useParams();
  const post = getPost(post_id);

  const titleRef = useRef();
  const contentRef = useRef();
  const slugRef = useRef();

  const editPost = async (e) => {
    e.preventDefault();
    updatePost(post_id, {
      slug: slugRef.current.value,
      title: titleRef.current.value,
      content: contentRef.current.value,
    }).then((pid) => navigate(`/posts/${pid}`));
  };

  if (loading) {
    return 'Loading';
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Post</h2>
        <form
          action="#"
          onSubmit={editPost}
          encType="multipart/form-data"
        >
          <Error error={error} />
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Post Title
              </label>
              <input
                ref={titleRef}
                type="text"
                defaultValue={post?.title}
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Blog Post Title"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Permalink: it will improve your seo
              </label>
              <input
                ref={slugRef}
                type="text"
                defaultValue={post?.content}
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Permalink: i.e this-blog-post-permalink"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                ref={contentRef}
                defaultValue={post?.content}
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write a Blog Post here..."
                required
              ></textarea>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
