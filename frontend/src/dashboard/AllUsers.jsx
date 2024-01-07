import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Dropdown, DropdownItem} from 'flowbite-react';
import {useUserContext} from '../context/UserContext';
import toast, {Toaster} from 'react-hot-toast';

const AllUsers = () => {
  const {users, getUsers, loading, deleteUser, updateUser} = useUserContext();

  if (loading) {
    return 'Loading';
  }

  useEffect(() => {
    getUsers();
  }, []);

  const verifiedUser = (userId) => {
    updateUser(userId, {
      isVarified: true,
    }).then((status) => toast.success(`Verified Successfully`));
  };

  const rejectUser = (userId) => {
    updateUser(userId, {
      isVarified: false,
    }).then((status) => toast.success(`User Status has beeb Successfully Change`));
  };

  return (
    <>
      <Toaster />
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-center items-center">
        {users.map((user, index) => {
          return (
            <div
              key={user._id}
              className="flex flex-col justify-center items-center"
            >
              <Card className="w-full">
                <div className="flex justify-end px-4 pt-4">
                  <Dropdown
                    inline
                    label=""
                    color="white"
                  >
                    <DropdownItem>
                      <Link
                        to={`/dashboard/edit-user/${user?._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                        dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {' '}
                        Edit
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Export Data
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        to=""
                        onClick={() => deleteUser(user._id)}
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

                  <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                    {user.profile.name}
                  </h5>
                  <i className="text-gray-400 pb-1">{`@${user.username}`}</i>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.isVarified ? 'Verified' : 'Unverified'}
                  </span>
                  <div className="mt-4 flex space-x-3 lg:mt-6">
                    <Button
                      onClick={() => verifiedUser(user._id)}
                      size="sm"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => rejectUser(user._id)}
                      size="sm"
                      outline
                      color="failure"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllUsers;
