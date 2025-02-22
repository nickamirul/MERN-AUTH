import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent refresh the page when submit
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
        setLoading(false);
        setError(error.message); 
    }
  };

  // console.log(formData);

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-center font-semibold my-7 text-gray-800">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Username"
          className="p-3 rounded-lg bg-gray-100 border border-gray-300"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-gray-100 border border-gray-300"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-gray-100 border border-gray-300"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-3 text-sm text-gray-700">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-600 hover:underline">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
