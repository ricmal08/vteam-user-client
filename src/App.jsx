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
} from './components/index.js';
import api_url from './url.js';

function App() {

  const [userStatus, setUserStatus] = useState(
    localStorage.getItem("user-status") || "logged-out"
  );

  const [user, setUser] = useState(null);

  /*
  Function that fetch the user from api by accessToken from the localstorage.
  */
  async function fetchUser () {
    try {
      // token from localstorage saved while logging in
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.log("Ingen token tillgänglig!");
        setUser(null);
        return;
      }
      // Fetch userId by tokencheck from api
      const response = await fetch(`${api_url}auth/token/check`, {
        headers: { "Authorization": `Bearer ${accessToken}` }
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error("Kunde inte hämta token", errorData);
      }
      const userId = await response.json();

      if (!userId) {
        console.log("Användaren hittades inte");
        setUser(null);
        return;
      }

      // Fetch user by id
      const userResponse = await fetch(`${api_url}users/${userId}`);

      if (!userResponse.ok) {
        const userErrorData = await userResponse.json();
        throw new Error("Kunde inte hämta användaren", userErrorData);
      }

      const user = await userResponse.json();

      console.log(user);
      setUser(user);

      } catch (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
      }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUser();
    }
  }, []);

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


    </Routes>
    </>
  )
}

export default App
