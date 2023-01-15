import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      window.location.href = "/";
    }
    if (user && user.isAdmin === true) {
      window.location.href = "/dashboard";
    }
    if (isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const TogglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="h-screen font-sans from-gray-50 to-blue-500 bg-gradient-to-r flex justify-center items-center">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <form
                onSubmit={onSubmit}
                className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/NewLogo_CDM.svg/1200px-NewLogo_CDM.svg.png"
                  alt="logo"
                  className="w-1/2 mx-auto"
                />
                <div className="mt-2 text-left">
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                  </div>
                </div>
                <div className="mt-2 text-left">
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={onChange}
                      className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_password"
                      className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                    <i
                      className="absolute right-0 top-0 mt-3 mr-4 text-black cursor-pointer"
                      onClick={TogglePassword}
                    >
                      {passwordShown ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </i>
                  </div>
                </div>
                <div className="flex justify-center mb-5">
                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-start
                px-10 py-2 overflow-hidden font-bold rounded-full
                group"
                  >
                    <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
                    <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                      Login
                    </span>
                    <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
                  </button>
                </div>
                <div className="flex justify-center items-center mt-6">
                  <p className="text-center text-base text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 font-bold hover:text-blue-700"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
