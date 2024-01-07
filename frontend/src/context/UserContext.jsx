import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';

const UserContext = createContext(null);
const UserContextProvider = (props) => {
  const location = useLocation();

  const [refresh, setRefresh] = useState(0);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {Authorization: Cookies.get('token')},
      });
      setError(null);
      setUsers(response.data.users);
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
    users,
    error,
    loading,
    getUsers,
    getUser: (user_id) => {
      return users.find((user) => user_id === user._id);
    },

    deleteUser: async (user_id) => {
      try {
        setLoading(true);
        const response = await axios.delete(`http://localhost:5000/api/users/${user_id}`, {
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

    updateUser: async (user_id, data) => {
      try {
        setLoading(true);
        const response = await axios.put(`http://localhost:5000/api/users/${user_id}`, data, {
          withCredentials: true,

          headers: {Authorization: Cookies.get('token')},
        });

        setError(null);
        doRefresh();
        return response.data.status;
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    },
  };

  // Reset the error between routes
  useEffect(() => {
    setError(null);
  }, [location]);

  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
