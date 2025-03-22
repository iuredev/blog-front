import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 dartext-gray-300 sm:py-2 md:py-4">
      <div className="max-w-7xl mx-auto flex justify-between align-middle">
        <p className="text-sm"><Link to="/">© Iure Gomes</Link></p>

        <div className="flex space-x-6">
          <a
            href="https://instagram.com/iure.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-6 w-6 sm:h-5 sm:w-5 text-gray-300 hover:text-pink-500 transition duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/iure-silva"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-6 w-6 sm:h-5 sm:w-5 text-gray-300 hover:text-blue-700 transition duration-300" />
          </a>
          <a
            href="https://github.com/iuredev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-6 w-6 sm:h-5 sm:w-5 text-gray-300 hover:text-gray-500 transition duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
