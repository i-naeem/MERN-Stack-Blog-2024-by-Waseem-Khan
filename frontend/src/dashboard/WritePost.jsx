import React, {useRef, useState} from 'react';
import {Button} from 'flowbite-react';
import {usePostContext} from '../context/PostContext';
import {useNavigate} from 'react-router-dom';
import {Error} from '../components/Error';
import {Editor} from '@tinymce/tinymce-react';

const WritePost = () => {
  const [editorValue, setEditorValue] = useState('');
  const navigate = useNavigate();
  const {loading, error, createPost} = usePostContext();
  const fileRef = useRef();
  const slugRef = useRef();
  const titleRef = useRef();
  // const contentRef = useRef();

  const onCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('content', editorValue);
    formData.append('slug', slugRef.current.value);
    formData.append('featureImage', fileRef.current.files[0]);

    createPost(formData).then((post_id) => {
      if (post_id) {
        navigate(`/posts/${post_id}`);
      }
    });
  };
  const handleEditorChange = (content, editor) => {
    setEditorValue(content);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Write Post</h2>
        <Error error={error} />
        <form
          onSubmit={onCreate}
          action="#"
          encType="multipart/form-data"
        >
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
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Permalink: i.e this-blog-post-permalink"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Feature Image
              </label>
              <input
                ref={fileRef}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                accept="image/*"
                type="file"
                required
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <Editor
                apiKey="wmhkfzjaxur9l0o8yr6mi4vjont19gd8t0xovtqqidj4fb9h"
                init={{
                  plugins:
                    'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                  toolbar:
                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                  tinycomments_mode: 'embedded',
                  tinycomments_author: 'Author name',
                  mergetags_list: [
                    {value: 'First.Name', title: 'First Name'},
                    {value: 'Email', title: 'Email'},
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                }}
                // initialValue={editorValue}
                value={editorValue}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              color="blue"
              type="submit"
              disabled={loading}
            >
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WritePost;
