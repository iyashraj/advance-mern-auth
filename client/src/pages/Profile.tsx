import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

const Profile: React.FC = () => {
  const { currentUser } = useSelector((root: any) => root.user);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({})

  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (fileRef.current?.files && fileRef.current.files.length > 0) {
      setSelectedImage(fileRef.current.files[0]);
    }
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (err:any) => {
        setImageUploadError(err);
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, profilePicture: downloadURL })
      );
      }
    );
  };

  useEffect(() => {
    if (selectedImage) {
      handleFileUpload(selectedImage);
    }
  }, [selectedImage]);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <div className="text-3xl font-semibold text-center my-7">Profile</div>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover shadow"
          onClick={() => fileRef.current.click()}
          src={currentUser?.profilePicture}
          alt="profile-picture"
        />
        {imageUploadError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercentage} %`}</span>
          ) : imagePercentage === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser?.username}
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser?.email}
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 font-semibold cursor-pointer ">
          Delete Account
        </span>
        <span className="text-red-700 font-semibold cursor-pointer ">
          Sign Out
        </span>
      </div>
    </div>
  );
};
export default Profile;
