import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl text-gray-800">
            <span className="text-blue-600">Amirul</span>
            <span className="text-gray-800">Estate</span>
          </h1>
        </Link>
        <form className="bg-gray-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-gray-700"
          />
          <FaSearch className="text-gray-600 ml-2" />
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-gray-700 hover:text-blue-600">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-gray-700 hover:text-blue-600">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-8 w-8 object-cover border-2 border-gray-300"
              />
            ) : (
              <li className="text-gray-700 hover:text-blue-600">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
