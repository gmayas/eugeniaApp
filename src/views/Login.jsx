import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { signIn } from "../controllers/auth/auth";
import { alertMsg } from "../components/alertMsg";
//
const Login = () => {
  //   
  let navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  //
  const login = async () => {
    try {
      const response = await signIn({ emailUser, passwordUser });
      console.log('response: ', response);
      if (response.data?.success) {
        localStorage.setItem("token", response.data.token);
        setAuthState({
          id_user: response.data.id_user,
          name_user: response.data.name_user,
          last_name_user: response.data.last_name_user,
          email_user: response.data.email_user,
          apartment_num_user: response.data.email_user,
          success: response.data.success
        });
        alertMsg(`Hello ${response.data.name_user} welcome. 🙂👍`, 'Mensaje de Eugenia.', 'success');
        navigate("/");
      } else {
        alertMsg(`Error: ${response.error?.response?.data?.message}.`, 'Mensaje de Eugenia.', 'error');
      }
    }
    catch (e) {
      console.log(e);
      alertMsg(`Error: ${e.message}.`, 'Mensaje de Eugenia.', 'error');
    };
  };

  return (
    <div className="loginContainer">
      <div className="card border-primary" style={{ width: "250px" }}>
        <h4 className="card-header">Login</h4>
        <div className="card-body">
            <div class="mb-3">
              <label>Email User: </label>
              <input type="email" class="form-control border border-success" laceholder="Enter email" 
                onChange={(event) => { setEmailUser(event.target.value) }} />
            </div>
            <div class="mb-3">
              <label>Password: </label>
              <input type="password" class="form-control border border-success" placeholder="Password" autocomplete="off" 
                onChange={(event) => { setPasswordUser(event.target.value) }} />
            </div>
            <div className="d-md-flex justify-content-md-end">
              <button className="btn btn-primary" data-placement="top" title="Click Login" onClick={login}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg> Login
              </button>
            </div>
        </div>
      </div>
    </div>
  );

};

export default Login;