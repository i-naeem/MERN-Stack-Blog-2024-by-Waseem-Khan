import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Dropdown, DropdownItem} from 'flowbite-react';
import {useAuthContext} from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
  const {user} = useAuthContext();
  const decodedUser = user ? jwtDecode(user) : null;
  return (
    <Card className="max-w-sm">
      <div className="flex justify-end px-4 pt-4">
        <Dropdown
          inline
          label=""
        >
          <DropdownItem>
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Export Data
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </Link>
          </DropdownItem>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://www.flowbite-react.com/_next/image?url=%2Fimages%2Fpeople%2Fprofile-picture-3.jpg&w=96&q=75"
          alt="Waseem Khan"
        />

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {decodedUser.username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {' '}
          {decodedUser.isVarified ? 'Verified' : 'Unverified'}
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Link
            to="#"
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Accept
          </Link>
          <Link
            to="#"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Reject
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
