import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import moment from 'moment';
import 'moment-timezone';
import { padLeft } from '../utils/miscellany';
import { AuthContext } from "../contexts/AuthContext";
import { getInvUserId } from "../controllers/invitattions/invitations";
//
const Home = () => {
    //
    const UrlApi = "http://localhost:4000/api/invitations";
    let navigate = useNavigate();
    const [listInvUser, setListInvUser] = useState([]);
    const { authState } = useContext(AuthContext);
    const { id_user, name_user } = authState;
    //
    const fetchData = async () => {
        // 
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            const response = await getInvUserId(id_user);
            console.log('respose: ', response);
            const data = response.data.data;
            console.log('data: ', data);
            if (data.some(x => x.id_inv !== null)) {
                setListInvUser(data);
            };
        };
    };
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
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3 text-center">
                                                    <div className="img-fluid rounded float-left img-thumbnail">
                                                        <QRCode
                                                            size={256}
                                                            style={{ height: "auto", maxWidth: "100%", width: "auto" }}
                                                            value={`${UrlApi}/${value.id_inv}`}
                                                            viewBox={`0 0 256 256`}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 text-left">
                                                    <h5>Invitation:</h5>
                                                    <h5>Creation:</h5>
                                                    <h5>Entry:</h5>
                                                    <h5>Expiration:</h5>
                                                </div>
                                                <div className="col-sm-6 text-left">
                                                    <h5>{padLeft(value.id_inv, 10)}</h5>
                                                    <h5>{moment(value.creation_date_inv).format('dd-DD-MMM-YYYY, h:mm:ss a')}</h5>
                                                    <h5>{moment(value.entry_date_time_inv).format('dd-DD-MMM-YYYY, h:mm:ss a')}</h5>
                                                    <h5>{moment(value.expiration_date_inv).format('dd-DD-MMM-YYYY, h:mm:ss a')}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <h5 className="me-md-1 mt-1">Status: {value.status_inv}</h5>
                                                <h5 className="me-md-1 mt-1">Time: {value.time_status}</h5>
                                                <button type="button" className="btn btn-primary btn-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square mb-1" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                    </svg> Modify</button>
                                                <button type="button" className="btn btn-danger btn-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash mb-1" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                    </svg> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )
            }
        </div>
    )
};

export default Home;