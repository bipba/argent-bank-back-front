import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/UserDetailsPage";
import Error from "./components/Error/Error"

import Nav from './containers/Nav/Nav';

function App() {
  return (
    <>
      <Nav />
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route  path="*" element={<Error/>} />
        </Routes>
    </>
  );
}

export default App;
