import Axios from 'axios';
//
let UrlApi = "http://localhost:4000/api/auth";

//Login
export const signIn = async (dataIn) => {
    try {
        const data = {email_user: dataIn.emailUser, password_user: dataIn.passwordUser }
        console.log('data: ', data); 
        let response = await Axios.post(`${UrlApi}/signIn`, data);
        return response;
    } catch (e) {
        console.log(e);
        return {
            message: 'Error in API',
            error: e
        };
    };
};

//Register
export const signUp = async (dataIn) => {
    try {
        console.log('dataIn: ', dataIn); 
        let response = await Axios.post(`${UrlApi}/signUp`, dataIn);
        return response;
    } catch (e) {
        console.log(e);
        return {
            message: 'Error in API',
            error: e
        };
    };
};

//
export const isLoggedIn = async () => {
    try {
        let response = await Axios.get(`${UrlApi}/auth`, { headers: { token: localStorage.getItem("token") } });
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