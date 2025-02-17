import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4 max-w-md mx-auto">
        <img src={currentUser.avatar} alt="profile" className="h-24 w-24 object-cover rounded-full mx-auto" />
        <div className="flex flex-col gap-2 my-2">
          <input type="text" id="username" placeholder="Username" className="bg-white outline-none p-3 rounded-lg" />
          <input type="text" id="email" placeholder="Email" className="bg-white outline-none p-3 rounded-lg" />
          <input type="text" id="password" placeholder="Password" className="bg-white outline-none p-3 rounded-lg" />
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95">Update</button>
      </form>
      <div className="flex justify-between max-w-md mx-auto my-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
