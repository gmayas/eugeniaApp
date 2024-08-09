import { useEffect, useState } from 'react'
//import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//
import { isLoggedIn } from './controllers/auth/auth'
import { AuthContext } from "./contexts/AuthContext";
import { ProtectedRoutes, ProtectedRoutesOut } from "./utils/ProtectedRoutes.jsx"
//
import Login from "./views/Login";
import Home from "./views/Home.jsx";
import Register from './views/register.jsx';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { alertMsg } from "./components/alertMsg";
import './App.css'
//
const App = () => {
  //
  //let history = useHistory();
  const [authState, setAuthState] = useState({
    id_user: 0,
    name_user: "",
    last_name_user: "",
    email_user: "",
    apartment_num_user: "",
    success: false
  });
  //
  const fetchData = async () => {
    try {
      const response = await isLoggedIn();
      console.log('response:', response)
      if (response.data?.success) {
        setAuthState({
          id_user: response.data.id_user,
          name_user: response.data.name_user,
          last_name_user: response.data.last_name_user,
          email_user: response.data.email_user,
          apartment_num_user: response.data.apartment_num_user,
          success: response.data.success
        });
        alertMsg(`Hello ${response.data.name_user} welcome. 🙂👍`, 'Mensaje de Eugenia.', 'success');
      } else {
        setAuthState({ ...authState, success: false });
        alertMsg(`Login please. 🙂👍`, 'Mensaje de Eugenia.', 'info');
      }
    }
    catch (e) {
      console.log(e);
      alertMsg(`Error clg: ${e.message}.`, 'Mensaje de Eugenia.', 'error');
    };
  };
  //
  useEffect(() => {
    fetchData();
  }, []);
  //
  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      id_user: 0,
      name_user: "",
      last_name_user: "",
      email_user: "",
      apartment_num_user: "",
      success: false
    });
    //history.push("/login");
  };
  //
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <>
          <Header title="Eugenia App" />
        </>
        <Routes>
          <Route element={<ProtectedRoutesOut />}>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" exact element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </AuthContext.Provider>
  )
};
//
export default App
