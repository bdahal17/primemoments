import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/userSlice";
import {useNavigate} from "react-router-dom";
import {userLogin} from "../../service/userService.ts";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.isAuthenticated)
    const navigate = useNavigate();

  React.useEffect(() => {
    console.log('Login component mounted..', user);
  }, [user])

    const handleLogin = async () => {
      try {
          const user = await userLogin({username: 'test', password: 'test'});
          dispatch(login(user));
          navigate('/');
      } catch (error) {
            console.error('Login error:', error);
      }
    };

  return (
      <div style={{color: 'red'}}>
        Login Component
        <button
        onClick={() => {
            if(user) {
                navigate('/');
            } else if(!user) {
                dispatch(login());
                navigate('/');
            }
        }}
        >
            Test Button
        </button>
      </div>
  );
};
export default Login;
