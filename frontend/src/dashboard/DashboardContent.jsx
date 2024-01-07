import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import SidebarNav from './SidebarNav';
import {Button} from 'flowbite-react';

const DashboardContent = () => {
  const [isToggle, setisToggle] = useState(false);
  const toggleMenu = () => {
    setisToggle((prevState) => !prevState);
  };
  return (
    <>
      <div className="w-screen flex">
        {!isToggle ? (
          <>
            <Button
              size="sm"
              className="absolute -rotate-90 -left-10 top-28 z-10 rounded-none rounded-r-sm sm:hidden"
              onClick={toggleMenu}
            >
              Open Menu
            </Button>
          </>
        ) : null}
        <div
          className={`w-64 ${
            !isToggle ? 'hidden' : 'block'
          } sm:block md:block min-h-screen sidebaradf dark:bg-gray-900 z-40 h-screen overflow-auto`}
          // className={`w-64 ${
          //   !isToggle ? 'sm:hidden' : 'block'
          // } min-h-screen sidebaradf dark:bg-gray-900`}
        >
          <aside
            className={`z-40 h-screen transition-transform -translate-x-${
              isToggle ? 0 : 'full'
            } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <SidebarNav toggleMenu={toggleMenu} />
          </aside>
        </div>
        <div className="flex-1 w-screen dashboadcontent dark:bg-gray-900 overflow-y-auto p-10 max-h-screen">
          {<Outlet />}
        </div>
      </div>
      {/* <div className="min-h-screen bg-white dark:bg-gray-900 p-4">{<Outlet />}</div> */}
    </>
  );
};

export default DashboardContent;
