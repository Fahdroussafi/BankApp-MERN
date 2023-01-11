import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header flex items-center justify-between">
      <div className="logo">
        <Link className="logo-link" to="/">
          <span>POOR </span>BANK
        </Link>
      </div>
      {user ? (
        user.isAdmin === false ? (
          <>
            <div>
              <button className="btn">
                <Link to="/transactions">Transactions</Link>
              </button>
            </div>
            <div>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </>
        )
      ) : (
        <>
          <ul>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </ul>
        </>
      )}
    </header>
  );
}

export default Header;
