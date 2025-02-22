import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  //firebase storage code, put this in the firebase console
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write:if
  //       request.resource.size < 2 * 1024 * 1024 &&
  //       request.resource.contentType.matches('image/.*')
  //     }
  //   }
  // }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleSignOutClick = () => {
    setShowSignOutConfirm(true);
  };

  const handleSignOutConfirm = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      dispatch(signOut());
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOutCancel = () => {
    setShowSignOutConfirm(false);
  };

  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="h-24 w-24 object-cover rounded-full mx-auto"
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error uploading image
            (image must be less than 2 mb)</span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-700">Uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <div className="flex flex-col gap-2 my-2">
          <input
            type="text"
            id="username"
            defaultValue={currentUser.username}
            placeholder="Username"
            className="bg-white outline-none p-3 rounded-lg"
          />
          <input
            type="text"
            id="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            className="bg-white outline-none p-3 rounded-lg"
          />
          <input
            type="text"
            id="password"
            placeholder="Password"
            className="bg-white outline-none p-3 rounded-lg"
          />
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95">
          Update
        </button>
      </form>
      <div className="flex justify-between max-w-md mx-auto my-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span 
          onClick={handleSignOutClick}
          className="text-red-700 cursor-pointer"
        >
          Sign Out
        </span>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Sign Out Confirmation</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
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
    </div>
  );
};

export default Profile;
