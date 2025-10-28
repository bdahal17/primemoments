import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/userSlice.ts";
import {useNavigate} from "react-router-dom";

const Account: React.FC = () => {

    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user.userInfo);
    const navigate = useNavigate();

    React.useEffect(() => {
        console.log('User info:', user);
    }, []);
    return (
        <div>
            <h1>Account Page</h1>
            <p>This is a placeholder for the Account component.</p>
            <button
                onClick={() => {
                    // Implement logout functionality here
                    // clear session jwt
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("authTokenExpiry")
                    // window.location.href = "/";
                    dispatch(logout());
                }}
            >
                logout
            </button>
        </div>
    );
};
export default Account;
