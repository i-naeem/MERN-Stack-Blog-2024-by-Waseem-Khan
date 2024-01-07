import React from 'react';
import {Link} from 'react-router-dom';
const About = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            About Us
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            About Us Welcome to{' '}
            <span className="text-lg text-red-600 font-bold">FirstBlogging</span> your source for
            inspiration and insights! We're a tight-knit community passionate about sharing valuable
            content on a variety of topics.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Subscriber
            <svg
              className="w-5 h-5 ml-2 -mr-1"
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
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Read Public Articles
          </Link>
        </div>
        <div className="mt-5 lg:mt-0 lg:col-span-5 lg:flex">
          <img
            className="rounded-lg"
            src="https://www.waseemk.com/wp-content/uploads/2023/03/waseem.jpeg"
            alt="mockup"
          />
        </div>
      </div>
      <div className="container ms-auto px-4 py-8 ps-10">
        <article>
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">
            Who We Are
          </h1>
          <p className="max-w-full mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            We're a team of enthusiasts dedicated to bringing you bite-sized wisdom, helpful tips,
            and engaging stories.
          </p>
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">
            Why Subscribe?
          </h1>
          <p className="max-w-full mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Subscribing to FirstBlogging means staying in the loop with the latest trends, receiving
            exclusive content, and becoming part of a community that values your time.
          </p>
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">
            Our Promise
          </h1>
          <p className="max-w-full mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            We promise to deliver content that's not just informative but also enjoyable. Every post
            is crafted with you in mind, aiming to make your day a little brighter.
          </p>
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">
            Join Us
          </h1>
          <p className="max-w-full mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Ready for a daily dose of inspiration? Subscribe now and join our community! Let's make
            this journey together.
          </p>
        </article>
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Subscriber
          <svg
            className="w-5 h-5 ml-2 -mr-1"
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
    </section>
  );
};

export default About;
