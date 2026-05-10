import React from "react";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
// import logout from '../../appwrite/auth'

function LogoutBtn({onClick}) {
    const dispatch=useDispatch();
    const logoutHandle=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
        if (onClick) onClick();
    }
    return (
        <button 
  className="nav-link inline-block px-6 py-2 duration-200 hover:text-green-700 rounded-full" 
  onClick={logoutHandle}
>
  Logout
</button>
    )
}

export default LogoutBtn;
