import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {useCurrentUser} from './AuthContext';
import Cookies from 'js-cookie';

const PostContext = createContext(null);
const PostContextProvider = (props) => {
  const user = useCurrentUser();
  const location = useLocation();

  const [refresh, setRefresh] = useState(0);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    const url = user ? 'http://localhost:5000/api/posts' : 'http://localhost:5000/public';
    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: {Authorization: Cookies.get('token')},
      });
      setError(null);
      setPosts(response.data.posts);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const doRefresh = () => {
    setRefresh((p) => p + 1);
  };
  const values = {
    doRefresh,
    posts,
    error,
    loading,
    getPosts,
    getPost: (post_id) => {
      return posts.find((post) => post_id === post._id);
    },

    createPost: async (data) => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/posts/create', data, {
          withCredentials: true,
          headers: {
            Authorization: Cookies.get('token'),
            'Content-Type': 'multipart/form-data',
          },
        });

        setError(null);
        doRefresh();
        return response.data.post._id;
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    },

    deletePost: async (post_id) => {
      try {
        setLoading(true);
        const response = await axios.delete(`http://localhost:5000/api/posts/${post_id}`, {
          withCredentials: true,
          headers: {Authorization: Cookies.get('token')},
        });
        setError(null);
        doRefresh();
        return response.data._id;
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    },

    updatePost: async (post_id, data) => {
      try {
        setLoading(true);
        const response = await axios.put(`http://localhost:5000/api/posts/${post_id}`, data, {
          withCredentials: true,

          headers: {Authorization: Cookies.get('token')},
        });

        setError(null);
        doRefresh();
        return response.data.post_id;
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    },
  };

  useEffect(() => {
    getPosts();
  }, [refresh]);

  // Reset the error between routes
  useEffect(() => {
    setError(null);
  }, [location]);

  return <PostContext.Provider value={values}>{props.children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);

export default PostContextProvider;
