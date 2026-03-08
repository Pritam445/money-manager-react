import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import { axiosConfig } from "../util/config";
import { API_ENPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import { Loader } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      const response = await axiosConfig.post(API_ENPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
         setError(error.response.data.message);
      }else{
        console.log('Something went worng !!', error);
        setError(error.message)
      }
      
      
    }finally{
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

      <div className="relative z-10 max-w-6xl flex items-center justify-center px-6">
        <div className="bg-white  w-100 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your login details
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder={"name@example.com"}
              type={"email"}
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

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-center py-3 text-lg bg-purple-900 hover:bg-purple-500 text-white rounded-lg cursor-pointer active:scale-95 transition-all duration-300 shadow-md font-medium ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
              {isLoading ? (
                <div className="w-full flex justify-center items-center">
                  <Loader className="animate-spin " />
                </div>
              ) : (
                "LOG IN"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
