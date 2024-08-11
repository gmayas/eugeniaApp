import Axios from 'axios';
//
const UrlApi = "http://localhost:4000/api/invitations";
//
export const getInvUserId = async (id_user) => {
    try {
        let response = await Axios.get(`${UrlApi}/getInvUserId/${id_user}`, { headers: { token: localStorage.getItem("token") } });
        //let dataReturn = await response.json()
        return response;
    } catch (e) {
        console.log(e);
        return {
            message: 'Error in API',
            error: e
        };
    };
};

