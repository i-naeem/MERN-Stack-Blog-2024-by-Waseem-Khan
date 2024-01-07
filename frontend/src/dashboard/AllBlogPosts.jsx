import React from 'react';
import {Link} from 'react-router-dom';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from 'flowbite-react';
import {usePostContext} from '../context/PostContext';
import {Error} from '../components/Error';

const AllBlogPosts = () => {
  const {posts, error, loading, deletePost} = usePostContext();

  if (loading) {
    return 'Loading';
  }

  return (
    <div className="overflow-x-auto">
      <Error error={error} />
      <div className="flex justify-between flex-wrap gap-2">
        <Button
          color="blue"
          pill
          className="mb-2"
        >
          <Link to="http://localhost:5173/dashboard/write-post">Create New Post</Link>
        </Button>
      </div>

      <Table hoverable>
        <TableHead>
          <TableHeadCell className="p-4">
            <Checkbox />
          </TableHeadCell>
          <TableHeadCell>Post name</TableHeadCell>
          <TableHeadCell>Post Category</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {posts?.length ? (
            <>
              {posts?.map((post) => (
                <TableRow
                  key={post._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="p-4">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {post.title}
                  </TableCell>
                  <TableCell>Sliver</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Link to={`/posts/${post._id}`}>
                      <Button
                        color="blue"
                        size="xs"
                        disabled={loading}
                      >
                        View
                      </Button>
                    </Link>
                    <Link to={`/dashboard/edit-post/${post._id}`}>
                      <Button
                        color="success"
                        size="xs"
                        disabled={loading}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="xs"
                      color="failure"
                      disabled={loading}
                      onClick={() => deletePost(post._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllBlogPosts;
