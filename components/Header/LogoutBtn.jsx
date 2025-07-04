import conf from "../../src/conf/conf";
import { Client, Account, ID } from "appwrite";
import { useDispatch } from "react-redux";
import authService from "../../src/appwrite/auth";
import { logout } from "../../src/store/authSlice";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className={`text-lg font-bold px-4 py-2 rounded-xl bg-[#76ABAE] text-[#222831] hover:opacity-80 transition-colors duration-200 ${className}`}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
