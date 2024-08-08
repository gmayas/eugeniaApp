import { useEffect, useState } from 'react'
//import { useHistory } from "react-router-dom";
import './App.css'
import { isLoggedIn } from './controllers/auth/auth'
import { AuthContext } from "./contexts/AuthContext";
//
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home.jsx";
import ErrorPage from './views/error-page.jsx';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Registration from './views/Registration.jsx';
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
    const response = await isLoggedIn();
    console.log('response:', response)
    if (!(response.data.success)) {
      setAuthState({ ...authState, success: false });
    } else {
      setAuthState({
        id_user: response.data.id_user,
        name_user: response.data.name_user,
        last_name_user: response.data.last_name_user,
        email_user: response.data.email_user,
        apartment_num_user: response.data.apartment_num_user,
        success: response.data.success
      });
    }
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
          <Header title="React App Practice" />
        </>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element= {<Registration />} />
        </Routes>
      </Router>
      <Footer />
    </AuthContext.Provider>
  )
};
//
export default App
