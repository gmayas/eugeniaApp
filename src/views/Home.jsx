import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getInvUserId } from "../controllers/invitattions/invitations";
//
const Home = () => {

    const [listInvUser, setListInvUser] = useState([]);
    const { authState } = useContext(AuthContext);
    const { id_user, name_user } = authState;
    //
    const fetchData = async () => {
        // You can await here
        if (!localStorage.getItem("token")) {
            //history.push("/login");
        } else {
            const response = await getInvUserId(id_user);
            console.log('respose: ', response);
            const data = response.data.data;
            console.log('data: ', data);
            if (data.some(x => x.id_inv !== null)) {
                setListInvUser(data);
                //return false;  
            };
        };
        ;
    }
    //
    useEffect(() => {
        fetchData();
    }, []);
    //
    return (
        <div className="container">
            <div className="container text-white my-2">
                <h1 className="text-center mb-1">User invitations: {name_user}</h1>
            </div>
            {(Array.isArray(listInvUser) && listInvUser.length === 0) ? (
                <>
                    <h3 className="text-center hasNoInvitations" >Has no invitations</h3>
                </>
            ) : (
                <>
                    <div className="row row-cols-1 row-cols-md-2">
                        {listInvUser.map((value, index) => {
                            return (
                                <div key={index} className="list-group mt-2">
                                    <div className="card border-primary mb-2">
                                        <div className="card-header">Header</div>
                                        <div className="card-body">
                                            <h4 className="card-title">Primary card title</h4>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
};

export default Home;