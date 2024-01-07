import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/firstBlogging.png';
const Footer = () => {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800 z-40">
      <div className="mx-auto max-w-screen-xl text-center">
        <img
          src={logo}
          alt="firstBlogging logo"
        />
        <Link
          to="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          FirstBlogging
        </Link>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Subscribe, Engage, Thrive: Your Daily Source of Inspiration
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <Link
              to="about"
              className="mr-4 hover:underline md:mr-6 "
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="mr-4 hover:underline md:mr-6"
            >
              Subscriber
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className="mr-4 hover:underline md:mr-6"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="FAQs"
              className="mr-4 hover:underline md:mr-6"
            >
              FAQs
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="mr-4 hover:underline md:mr-6"
            >
              Contact
            </Link>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023-2024{' '}
          <Link
            to="/"
            className="hover:underline"
          >
            waseemk™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
