import {useState} from 'react';

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getPost = async (post_id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/posts/${post_id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await response.json();

      setData(data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    getPost,
    loading,
    error,
    data,
  };
};

export default usePost;
