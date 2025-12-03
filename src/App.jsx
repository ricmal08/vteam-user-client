import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { 
  MainPage,
  UserProfile,
  Nav,
  LoginPage,
  RegisterPage,
  SettingsPage,
} from './components/index.js';

function App() {

  const [userStatus, setUserStatus] = useState(
    localStorage.getItem("user-status") || "logged-out"
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("user-status", userStatus);
  }, [userStatus]);

  return (
    <>
    <Nav userStatus={userStatus} setUserStatus={setUserStatus}/>

    <Routes>

    <Route path='/' element={<MainPage userStatus={userStatus}/>} />
    <Route path='/user' element={<UserProfile user={user} setUser={setUser}/>} />
    <Route path='/login' element={<LoginPage setUserStatus={setUserStatus}/>} />
    <Route path='/register' element={<RegisterPage/>} />
    <Route path='/settings' element={<SettingsPage user={user} setUser={setUser} setUserStatus={setUserStatus}/>} />
    

    </Routes>
    </>
  )
}

export default App
