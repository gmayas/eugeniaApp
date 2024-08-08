import React, { useState, useContext } from "react";
//import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { signIn } from "../controllers/auth/auth"
//
const Login = () => {
    //   
    //let history = useHistory();
    const { setAuthState } = useContext(AuthContext);
    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    //
    const login = () => {
        const response = signIn({emailUser, passwordUser});
        console.log('response: ', response);
        if (!(response.success)) {
            alert(response.message);   // message
        } else {
            localStorage.setItem("token", response.token);
            setAuthState({
                id_user: response.data.id_user,
                name_user: response.data.name_user,
                last_name_user: response.data.last_name_user,
                email_user: response.data.email_user,
                apartment_num_user: response.data.email_user,
                success: response.data.success
            });
            //history.push("/");
        }
    };

    return (
        <div className="loginContainer">
          <label>Email User:</label>
          <input type="email" laceholder="Enter email" required 
            onChange={(event) => { setEmailUser(event.target.value) }} />
          <label>Password:</label>
          <input type="password" placeholder="Password" autocomplete="off" required 
            onChange={(event) => { setPasswordUser(event.target.value) }} />
          <button className="btn btn-primary" onClick={login}> Login </button>
        </div>
      );

};

export default Login;