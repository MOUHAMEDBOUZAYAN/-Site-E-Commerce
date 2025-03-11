import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./pages/Store";
import AdminPage from "./Components/AdminPage"
import Connect from "./pages/Connect";
import Navbar from "./Components/Navbar"

function App() {

  return (

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Connect />} />
          <Route path='/AdminPage' element={<AdminPage />} />
          <Route path='/Store' element={<Store />} />
        </Routes>
      </Router>

  );
}

export default App;
