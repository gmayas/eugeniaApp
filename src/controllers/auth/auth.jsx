import Axios from 'axios';
//
let UrlApi = "http://localhost:4000/api/auth";
//
export const signIn = async (dataIn) => {
    try {
        console.log('dataIn: ', dataIn); 
        const data = {email_user: dataIn.emailUser, password_user: dataIn.passwordUser }
        let response = await Axios.post(`${UrlApi}/signInt`, data);
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

export const isLoggedIn = async () => {
    try {
        let response = await Axios.get(`${UrlApi}/auth`, { headers: { token: localStorage.getItem("token") } });
        //let dataReturn = await response.json()
        return response;
    } catch (e) {
        console.log(e);
        return {
            message: 'Error in API',
            success: false,
            error: e
        };
    };
};