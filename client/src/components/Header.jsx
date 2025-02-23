import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useState, useEffect } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    setShowSignOutConfirm(true);
  };

  const handleSignOutConfirm = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      dispatch(signOut());
      setShowSignOutConfirm(false);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOutCancel = () => {
    setShowSignOutConfirm(false);
  };

  useEffect(() => {
    if (!currentUser) {
      setShowSignOutConfirm(false);
    }
  }, [currentUser]);

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
            <li className="hidden sm:inline text-gray-700 hover:text-blue-600">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-gray-700 hover:text-blue-600">
              About
            </li>
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
          {currentUser && (
            <button
              onClick={handleSignOutClick}
              className="text-gray-700 hover:text-blue-600"
            >
              Sign Out
            </button>
          )}
          {/* Sign Out Confirmation Modal */}
          {showSignOutConfirm && (
            <div className="fixed inset-0 bg-blue bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Sign Out Confirmation
                </h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to sign out?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleSignOutCancel}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignOutConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
