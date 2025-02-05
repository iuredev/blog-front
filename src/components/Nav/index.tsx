import { useState } from "react";
import { Link } from "react-router";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center ">
        <div className=" text-2xl font-bold">
          <Link to="/" className="font-family-system">
            IURE.DEV
          </Link>
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`lg:flex space-x-4 ${
            isOpen ? "block" : "hidden"
          } lg:block`}
        >
          <Link to="/about" className="text-white px-3 py-2">
            About
          </Link>
          <Link to="/blog" className="text-white  px-3 py-2">
            Blog
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
          onClick={closeMenu}
        >
          <div
            className="bg-gray-900 w-full h-full p-8 flex flex-col justify-center items-center text-white space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link
              to="/"
              className="text-white text-2xl  px-6 py-2"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white text-2xl  px-6 py-2"
              onClick={closeMenu}
            >
              About
            </Link>

            <Link
              to="/blog"
              className="text-white text-2xl  px-6 py-2"
              onClick={closeMenu}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
