import {createContext, useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(Cookies.get('token'));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    user,
    error,
    loading,
    login: async function (username, password) {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username,
          password,
        });

        if (response.data.status === 'failed') {
          setUser(null);
        } else {
          setUser(response.data.authToken);
          Cookies.set('token', response.data.authToken, {expires: 7});
          setError(null);
        }
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    },
    signup: async function (userInfo) {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post('http://localhost:5000/api/auth/register', userInfo);

        if (response.data.status === 'failed') {
          setUser(null);
        } else {
          setUser(response.data.authToken);
          Cookies.set('token', response.data.authToken, {expires: 1 / (24 * 60)});
          setError(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    logout: async function () {
      try {
        setLoading(true);
        setUser(null);
        setError(null);
        Cookies.remove('token');
      } catch (error) {
      } finally {
        setLoading(false);
        navigate('/login');
      }
    },

    setUser: function (user) {
      setError(null);
      setUser(user);
      setLoading(false);
    },
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
export const useCurrentUser = () => !!useContext(AuthContext).user;
