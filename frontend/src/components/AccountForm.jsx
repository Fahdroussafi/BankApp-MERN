import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, reset } from "../features/accounts/accountSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

function AccountForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.accounts
  );
  // const { accounts } = useSelector((state) => state.accounts);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createAccount({ name, amount }));
    setName("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Account name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Initial amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Account
          </button>
        </div>
      </form>
    </section>
  );
}

export default AccountForm;
