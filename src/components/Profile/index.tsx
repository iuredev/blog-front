import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Profile = () => {
  return (
    <div className="dark:bg-gray-900 py-4">
      <div className="gap-2 md:gap-8 max-w-4xl mx-auto text-center flex flex-col md:flex-row items-center md:items-start">
        <div className="max-h-142 w-52 h-52 md:w-132 md:h-132 profile-image rounded-full border-2 border-gradient border-opacity-50">
          <img
            src="public/iure.jpg"
            alt="Iure Gomes"
            className=" object-contain object-center rounded-full "
          />
        </div>

        <div className="md:text-left">
          <h1 className="text-3xl font-semibold md:text-3xl mt-4 md:mt-0 text-gray-200">
            <Link to="/about" className="text-gray-400">
              Hey, I'm Iure 
            </Link>, a software engineer
          </h1>

          <div className="flex justify-center md:justify-start space-x-6 mt-6 text-sm">
            <a
              href="https://instagram.com/iure.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 *:hover:text-pink-500 *:transition *:duration-300"
            >
              <FaInstagram className="h-6 w-6 text-gray-300 " />
              <span className="hidden md:inline text-gray-300">Instagram</span>
            </a>
            <a
              href="https://linkedin.com/in/iure-silva"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 *:hover:text-blue-700  *:transition *:duration-300"
            >
              <FaLinkedin className="h-6 w-6 text-gray-300" />
              <span className="hidden md:inline text-gray-300">LinkedIn</span>
            </a>
            <a
              href="https://github.com/iuredev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 *:hover:text-gray-500 *:transition *:duration-300"
            >
              <FaGithub className="h-6 w-6 text-gray-300" />
              <span className="hidden md:inline text-gray-300">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
