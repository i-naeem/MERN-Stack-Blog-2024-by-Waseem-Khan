import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Sidebar} from 'flowbite-react';
import DashboardContent from './DashboardContent';
import {HiChartPie, HiInbox, HiViewBoards, HiTable} from 'react-icons/hi';
import {useAuthContext} from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';
import firstBlogging from '../assets/firstBlogging.png';
import {MdClose} from 'react-icons/md';
import {Outlet} from 'react-router-dom';

const SidebarNav = (props) => {
  const {logout, user} = useAuthContext();
  const decodedUser = user ? jwtDecode(user) : null;
  return (
    <>
      <Sidebar aria-label="Default sidebar example">
        <div className="flex justify-between align-content-center">
          <div>
            <Sidebar.Logo
              as={Link}
              to=""
              img={firstBlogging}
              // imgAlt="Flowbite logo"
            >
              Flowbite
            </Sidebar.Logo>
          </div>
          <div>
            <MdClose
              onClick={props.toggleMenu}
              className="text-2xl dark:text-gray-200 dark:hover:text-white cursor-pointer display-1 sm:hidden"
            />
          </div>
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as={Link}
              to=""
              icon={HiChartPie}
            >
              Dashboard
            </Sidebar.Item>
            {decodedUser && decodedUser.role === 'admin' && (
              <Sidebar.Item
                as={Link}
                to="users"
                icon={HiViewBoards}
                label="3"
                // labelColor="dark"
              >
                All Users
              </Sidebar.Item>
            )}
            {decodedUser && decodedUser.role === 'admin' && (
              <Sidebar.Item
                as={Link}
                to="posts"
                icon={HiViewBoards}
                label="3"
                // labelColor="dark"
              >
                All Posts
              </Sidebar.Item>
            )}
            {decodedUser && decodedUser.role === 'admin' && (
              <Sidebar.Item
                as={Link}
                to="write-post"
                icon={HiInbox}
              >
                Wirte Post
              </Sidebar.Item>
            )}
            <Sidebar.Item
              as={Link}
              to="profile"
              icon={HiTable}
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              icon={HiTable}
              onClick={logout}
            >
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default SidebarNav;
