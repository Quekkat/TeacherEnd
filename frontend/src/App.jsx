import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./globalVariables";

import Login from './Components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import MainPage from './MainPage';
import SignInPage from './Components/SignInPage';

function App() {
  const {authUser} = useStore();
  return (
    <div>
      <Routes>
        <Route path="/login" element ={!authUser? <Login/>: <Navigate to="/"/>} />
        <Route path="/signin" element ={!authUser? <SignInPage/>: <Navigate to ="/"/>}/>
        
        <Route element ={<ProtectedRoutes/>}>
          <Route element ={<MainPage/>} path="/"/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
