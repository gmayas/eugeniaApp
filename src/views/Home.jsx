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
    const [invQuery, setInvQuery] = useState(false);
    const [invInfo, setInvInfo] = useState({});
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
            const data = response.data.data;
            console.log('data: ', data);
            if (data.some(x => x.id_inv !== null)) {
                setListInvUser(data);
                setInvQuery(false);
            };
        };
    };
    // 
    const seeInv = (data) => {
        console.log('data see: ', data);
        setInvInfo(data);
    };
    //
    const removeInv = (data) => {
        console.log('data remove: ', data);
    };

    const newInv = (data) => {
        console.log('data New: ', data);
    };
    //
    useEffect(() => {
        fetchData();
    }, [invQuery]);
    //
    //
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3 mt-3">
                    <button id="btnNewUser" className="btn btn-primary" type="button"
                        data-placement="top" title="Click add new"
                        onClick={() => newInv(id_user)}
                        data-bs-toggle="modal"
                        data-bs-target="#modalNewInv">
                        Add new + <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar4-event mb-1" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                            <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                </div>
                <div className="col-sm-6 mt-2">
                    <h2 className="text-white text-center">User invitations: {name_user}</h2>
                </div>
                <div className="col-sm-3 mt-3">
                    <form className="d-flex">
                        <input className="form-control me-sm-2" type="search" placeholder="Search" />
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit" data-placement="top" title="Click search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search mb-1" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg></button>
                    </form>
                </div>
            </div>
            {(Array.isArray(listInvUser) && listInvUser.length === 0) ? (
                <>
                    <h3 className="text-center hasNoInvitations" >Has no invitations</h3>
                </>
            ) : (
                <>
                    <div className="row row-cols-1 row-cols-md-2 hasInvitations">
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
                                                <h5 id="status" className="me-md-1 mt-1">Status: {value.status_inv}</h5>
                                                <h5 id="time" className="me-md-1 mt-1">Time: {value.time_status}</h5>
                                                <button id="btn-see" type="button" className="btn btn-primary btn-sm" data-placement="top" title="Click see invitation"
                                                    onClick={() => seeInv(value)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalSeeInv">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye mb-1" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                    </svg></button>
                                                <button type="button" className="btn btn-danger btn-sm btn-delete" data-placement="top" title="Click delete invitation"
                                                    onClick={() => removeInv(value)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalDeleteInv">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash mb-1" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                    </svg></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
            <div className="modal fade" id="modalSeeInv" tabindex="-1" aria-labelledby="modalSeeInv" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-5" id="modalSeeInv">Invitation: {padLeft(invInfo.id_inv, 10)}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <QRCode className="img-fluid rounded float-left img-thumbnail"
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "auto" }}
                                    value={`${UrlApi}/${invInfo.id_inv}`}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-3">
                                    <h5>Creation: </h5>
                                    <h5>Entry: </h5>
                                    <h5>Expiration: </h5>
                                </div>
                                <div className="col-sm-8">
                                    <h5>{moment(invInfo.creation_date_inv).format('dd-DD-MMM-YYYY, h:mm:ss a')}</h5>
                                    <h5>{moment(invInfo.entry_date_time_inv).format('dd-DD-MMM-YYYY, h:mm:ss a')}</h5>
                                    <h5>{moment(invInfo.expiration_date_inv).format('dd-DD-MMM-YYYY, h:mm:ss a')}</h5>
                                </div>
                                <div className="row">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-11 d-flex justify-content-between align-items-center">
                                        <h5>Status:  {invInfo.status_inv}</h5>
                                        <h5>Time:  {invInfo.time_status}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalDeleteInv" tabindex="-1" aria-labelledby="modalDeleteInv" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-exclamation-triangle-fill mt-2 mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            <h1 class="modal-title fs-5" id="modalDeleteInv">Warning!!!.</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card border-light bg-danger text-white">
                                <div class="card-body">
                                    <h4 class="card-title">Do you want to delete this invitation?</h4>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button id="btnOkDelete" type="button" class="btn btn-outline-danger"
                                data-bs-dismiss="modal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-exclamation-triangle-fill mb-1" viewBox="0 0 16 16">
                                    <path
                                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2">
                                    </path>
                                </svg>
                                Ok
                            </button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalNewInv" tabindex="-1" aria-labelledby="modalNewInv" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalNewInv">Add new Inv.</h1>
                            <button id="btnCloseNewInv" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card border-light">
                                <div class="card-body">
                                    <h3>New Invitation ...</h3>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button id="btnValReq" type="button" class="btn btn-primary">Validar</button>
                            <button id="btnOkNewInv" type="button" class="btn btn-success" data-bs-dismiss="modal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-plus-square" viewBox="0 0 16 16">
                                    <path
                                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                                Ok
                            </button>
                            <button id="btnCloseNewInvPrimary" type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;