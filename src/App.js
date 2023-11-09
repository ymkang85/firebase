import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';

const App = () => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ timeActive, setTimeActive ] = useState(false);

  useEffect(()=>{
    onAuthStateChanged( auth, (user) =>{
      setCurrentUser(user);
    })
  },[])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path = "/" element={
          <PrivateRoute>
            <Main />
          </PrivateRoute>
          } />
          <Route path="/login" element={
            !currentUser?.emailVerfied? <Login /> : <Navigate to="/" replace />
          }/>
          <Route path="/register" element={
            !currentUser?.emailVerfied? <Register /> : <Navigate to="/" replace />
          }/>
          <Route path="/Verify-email" element={<VerifyEmail />}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App