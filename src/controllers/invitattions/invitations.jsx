import Axios from 'axios';
//
const UrlApi = "http://localhost:4000/api/invitations";
//
export const getInvUserId = async (data) => {
    try {
        console.log('data Post:', data)
        if (data.id_inv === '') { data.id_inv = null; };
        let response = await Axios.post(`${UrlApi}/getInvUserId`, data, { headers: { token: localStorage.getItem("token") } });
        return response;
    } catch (e) {
        console.log(e);
        return {
            message: 'Error in API',
            error: e
        };
    };
};

export const deleteInvId = async (id_inv) => {
    try {
        console.log('id_inv delete:', id_inv)
        let response = await Axios.delete(`${UrlApi}/removeInvId/${id_inv}`, { headers: { token: localStorage.getItem("token") } });
        return response;
    } catch (e) {
        console.log(e);
        return {
            message: 'Error in API',
            error: e
        };
    };
};

export const createInvUser = async (data) => {
    try {
        console.log('data Post Create:', data)
        let response = await Axios.post(`${UrlApi}/createInvUser`, data, { headers: { token: localStorage.getItem("token") } });
        return response;
    } catch (e) {
        console.log(e);
        return {
            message: 'Error in API',
            error: e
        };
    };
};

