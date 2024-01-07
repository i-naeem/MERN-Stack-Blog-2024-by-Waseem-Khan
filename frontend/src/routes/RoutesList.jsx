import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from '../components/Header and Footer/Header';
import About from '../pages/About';
import Contact from '../pages/Contact';
import HomePage from '../pages/HomePage';
import SinglePost from '../pages/SinglePost';
import Footer from '../components/Header and Footer/Footer';
import Main from '../dashboard/Main';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import AllBlogPosts from '../dashboard/AllBlogPosts';
import WritePost from '../dashboard/WritePost';
import EditPost from '../dashboard/EditPost';
import {useCurrentUser} from '../context/AuthContext';
import BlogPage from '../pages/BlogPage';
import AllUsers from '../dashboard/AllUsers';
import EditUser from '../dashboard/EditUser';
import {jwtDecode} from 'jwt-decode';
import Profile from '../dashboard/Profile';
import Cookies from 'js-cookie';

const RoutesList = () => {
  const user = useCurrentUser();
  const token = Cookies.get('token');
  const decoded = token ? jwtDecode(token) : null;
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/posts"
          element={<BlogPage />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/posts/:post_id"
          element={<SinglePost />}
          scrollToTop
        />

        <Route
          path="/dashboard"
          element={user ? <Main /> : <Navigate to="/login" />}
        >
          <Route
            index
            element={<h1 className="dark:text-white">Users List</h1>}
          />
          <Route
            path="profile"
            element={<Profile />}
          />
          <Route
            path="users"
            element={user && decoded.role === 'admin' ? <AllUsers /> : <Navigate to="/login" />}
          />
          <Route
            path="posts"
            element={user && decoded.role === 'admin' ? <AllBlogPosts /> : <Navigate to="/login" />}
          />
          <Route
            path="write-post"
            element={user && decoded.role === 'admin' ? <WritePost /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="edit-post/:post_id"
            element={user && decoded.role === 'admin' ? <EditPost /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="edit-user/:user_id"
            element={user && decoded.role === 'admin' ? <EditUser /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default RoutesList;
