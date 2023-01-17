import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AccountForm from "../components/AccountForm";
import { getAccounts, reset } from "../features/accounts/accountSlice";
import Spinner from "../components/Spinner";
import AccountItem from "../components/AccountItem";
import { Helmet } from "react-helmet";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { accounts, isLoading, isError, message } = useSelector(
    (state) => state.accounts
  );

  useEffect(() => {
    if (!user || user.isAdmin === true) {
      navigate("/login");
    } else {
      dispatch(getAccounts());
    }

    const comparetime = () => {
      const time = localStorage.getItem("token_date");
      const currenttime = new Date().getTime();
      if (currenttime - time > 3600000) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("token_date");
        window.location.reload();
      }
    };

    comparetime();

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <section className="heading text-center text-xl">
        <h1>Welcome {user && user.name}</h1>
      </section>
      <AccountForm />

      <section className="content">
        {accounts.length > 0 ? (
          <div className="goals">
            {accounts.map((account) => (
              <AccountItem key={account._id} account={account} />
            ))}
          </div>
        ) : (
          <h1 className="text-center font-bold text-lg ">
            You have not set any accounts yet
          </h1>
        )}
      </section>
    </>
  );
}

export default Dashboard;
