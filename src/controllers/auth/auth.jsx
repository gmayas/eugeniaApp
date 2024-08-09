import Axios from 'axios';
//
let UrlApi = "http://localhost:4000/api/auth";
//
export const signIn = async (dataIn) => {
    try {
        const data = {email_user: dataIn.emailUser, password_user: dataIn.passwordUser }
        console.log('data: ', data); 
        let response = await Axios.post(`${UrlApi}/signIn`, data);
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