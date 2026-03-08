import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import { axiosConfig } from "../util/config";
import { API_ENPOINTS } from "../util/apiEndpoints";
import toast from 'react-hot-toast'
import { Loader } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/uploadProfileImage";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  let profileImageUrl = "";

  if (!fullName.trim()) {
    setError("Full name is required !!");
    setIsLoading(false);
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter valid email address !!");
    setIsLoading(false);
    return;
  }

  if (!password.trim()) {
    setError("Password is required");
    setIsLoading(false);
    return;
  }

  setError(null);

  try {

    if(profilePhoto) {
      const imageUrl = await uploadProfileImage(profilePhoto);
      profileImageUrl = imageUrl || "";
    }

    const response = await axiosConfig.post(API_ENPOINTS.REGISTER, {
      fullName,
      email,
      password,
      profileImageUrl
    });

    if (response.status === 201) {
      toast.success("Account created successfully !!");
      navigate("/login");
    }
  } catch (error) {
    toast.error("Something went wrong!");
    setError(error.response?.data?.message || error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="h-screen w-full relative flex items-center justify-center">
      <div className="absolute w-full h-full blur-sm">
        <img
          src={assets.login_bg}
          alt="login background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full  flex items-center justify-center px-6">
        <div className="bg-white max-w-lg bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create an account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spendings and manage your finances with ease
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              {/* Profile Image  */}
              <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder={"Jhon Doe"}
                type={"text"}
              />

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder={"name@example.com"}
                type={"text"}
              />
              <div className=" relative col-span-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder={"*********"}
                  type={"password"}
                />
              </div>
            </div>
            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-center py-3 text-lg bg-purple-900 hover:bg-purple-500 text-white rounded-lg cursor-pointer active:scale-95 transition-all duration-300 shadow-md font-medium ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? <div className="w-full flex justify-center items-center"><Loader className="animate-spin " /></div> : "SIGN UP"}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
