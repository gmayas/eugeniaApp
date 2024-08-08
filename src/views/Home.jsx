import React, { useState, useEffect } from "react";
//import { useHistory } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { getInvUserId } from "../controllers/invitattions/invitations";
//
const Home = () => {
    //let history = useHistory();
    const [listInvUser, setListInvUser] = useState([]);
    //const { authState } = useContext(AuthContext);
    //const { id_user } =  authState;
    //

    const fetchData = async () => {
        // You can await here
        if (!localStorage.getItem("token")) {
            //history.push("/login");
        } else {
            const response = await getInvUserId(2);
            console.log('respose: ', response);
            const data = response.data;
            setListInvUser(data);
        };
    }

    useEffect(() => {
        fetchData();
    }, []);
    //
    return (
        <div className="container">
            <p> ---------------------- </p>
            <h1> Hola empezamos ----</h1>
        </div>
    )
};

export default Home;