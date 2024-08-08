import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"
//
const Header = (props) => {
    //
    const { authState } = useContext(AuthContext);
    //
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" >{props.title}</a>
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
                                    <Link to={'/registration'} className="nav-link active">Registration</Link>
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
                </div>
            </div>
        </nav>
    )
}

export default Header;