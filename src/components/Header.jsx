import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"
//
const Header = (props) => {
    //
    let navigate = useNavigate();
    const { authState, setAuthState } = useContext(AuthContext);
    //
    const logout = () => {
        localStorage.removeItem("token");
        setAuthState({
            id_user: 0,
            name_user: "",
            last_name_user: "",
            email_user: "",
            apartment_num_user: "",
            success: false
        });
        navigate("/login");
    };
    //
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand mb-1" >{props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        {!authState.success ? (
                            <>
                                <li className="nav-item">

                                    <Link to={'/login'} className="nav-link active">Login
                                        <span className="visually-hidden">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/register'} className="nav-link active">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link active">Home
                                        <span className="visually-hidden">(current)</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex">
                        {authState.success &&
                            <>
                                <h4 className="me-sm-2 mt-1">🙂🖐 Hello!! {authState.name_user}.</h4>
                                <button className="btn btn-danger my-2 my-sm-0"
                                    data-placement="top" title="Click Logout"
                                    onClick={logout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right mb-1" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg> Logout
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;