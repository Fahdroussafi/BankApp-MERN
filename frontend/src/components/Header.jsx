import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import logo from "../assets/logo.png";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    window.location.href = "/";
  };

  return (
    <header className="mx-8 header flex items-center justify-between">
      <div className="flex-1">
        <>
          <Link to="/">
            <img
              className="bg-white rounded-full"
              src={logo}
              width={90}
              height={90}
              alt="logo"
            />
          </Link>
        </>
      </div>
      {user ? (
        user.isAdmin === false ? (
          <>
            <div className="navbar bg-base-100 ">
              <div className="flex-1">
                <Link to="/">
                  <img
                    className="bg-white rounded-full"
                    src={logo}
                    width={90}
                    height={90}
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="flex-none gap-2">
                <div className="form-control">
                  <Link
                    to="/transactions"
                    className="relative inline-block text-lg group"
                  >
                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Transactions</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </Link>
                </div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost">
                    <div>{user.name}</div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <button
                        onClick={onLogout}
                        className="relative inline-block px-4 py-2 font-medium group"
                      >
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative text-black group-hover:text-white">
                          Logout
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onLogout}
              className="relative inline-block px-4 py-2 font-medium group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-black group-hover:text-white">
                Logout
              </span>
            </button>
          </>
        )
      ) : (
        <></>
      )}
    </header>
  );
}
export default Header;
