import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import { 
  MainPage,
  UserProfile,
  Nav,
  LoginPage,
  RegisterPage,
  SettingsPage,
  HistoryPage,
  InvoicePage,
  GithubCallback,
} from './components/index.js';

function App() {

  const [userStatus, setUserStatus] = useState(
    localStorage.getItem("user-status") || "logged-out"
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      setUserStatus("logged-in");
    }

    localStorage.setItem("user-status", userStatus);
  }, [userStatus]);

  return (
    
    <>
    <Nav userStatus={userStatus} setUserStatus={setUserStatus} setUser={setUser}/>
    
    <Routes>

    <Route path='/' element={<MainPage userStatus={userStatus}/>} />
    <Route path='/user' element={<UserProfile user={user} setUser={setUser}/>} />
    <Route path='/login' element={<LoginPage setUserStatus={setUserStatus}/>} />
    <Route path='/register' element={<RegisterPage/>} />
    <Route path='/settings' element={<SettingsPage user={user} setUser={setUser} setUserStatus={setUserStatus}/>} />
    <Route path='/history' element={<HistoryPage user={user} setUser={setUser} setUserStatus={setUserStatus}/>} />
    <Route path='/history/invoice/:id' element={<InvoicePage user={user} setUser={setUser} setUserStatus={setUserStatus}/>} />
    {/* <Route path='/auth/github/callback' element={<GithubCallback setUserStatus={setUserStatus}/>} /> */}


    </Routes>
    </>
  )
}

export default App
