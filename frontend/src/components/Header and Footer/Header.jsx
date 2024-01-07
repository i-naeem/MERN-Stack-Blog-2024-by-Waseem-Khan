import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/firstBlogging.png';
import {
  Button,
  Navbar,
  NavbarLink,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  DarkThemeToggle,
} from 'flowbite-react';
import {useAuthContext} from '../../context/AuthContext';

const Header = () => {
  const {logout, user} = useAuthContext();

  return (
    <Navbar
      container="true"
      className="z-50"
    >
      <NavbarBrand
        as={Link}
        to="/"
      >
        <img
          src={logo}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          firstBlogging
        </span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-3">
        <DarkThemeToggle />
        {user ? (
          <>
            <Link to="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                pill
                color="success"
                size="sm"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                pill
                outline
                color="blue"
                size="sm"
              >
                Sign up
              </Button>
            </Link>
          </>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink
          as={Link}
          to="/"
          active
        >
          Home
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/posts"
        >
          Blog
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/about"
        >
          About
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/dashboard"
        >
          Dashboard
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/contact"
        >
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
