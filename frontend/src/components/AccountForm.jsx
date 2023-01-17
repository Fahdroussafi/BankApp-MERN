import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, reset } from "../features/accounts/accountSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

function AccountForm() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const dispatch = useDispatch();
  const { accounts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.accounts
  );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createAccount({ name, balance }));
    setName("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex justify-center items-center">
        <label htmlFor="my-modal" className="btn btn-success my-5 ">
          Add Account
        </label>
        {accounts.length > 0 && (
          <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative bg-white">
                <label
                  htmlFor="my-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <p className="py-4">
                  <span className="font-bold text-center block text-black">
                    You already have an account
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-white">
            <div className="mt-10">
              <section className="form">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <div className="relative z-0 mb-6 w-full group">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_name"
                        className="px-5 absolute text-sm text-white dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                      >
                        Account name
                      </label>
                    </div>

                    <div className="relative z-0 mb-6 w-full group">
                      <input
                        type="number"
                        name="balance"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_amount"
                        className="px-5 absolute text-sm text-white dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                      >
                        Initial amount
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="flex justify-center mb-5">
                      <button
                        type="submit"
                        className="relative inline-flex items-center justify-start
                px-10 py-2 overflow-hidden font-bold rounded-full
                group"
                      >
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-blue-600 transition-colors duration-200 ease-in-out group-hover:text-white">
                          Add account
                        </span>
                        <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
                      </button>
                    </div>
                  </div>
                </form>
              </section>
              <div className="modal-action">
                <label
                  htmlFor="my-modal"
                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  close
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountForm;
