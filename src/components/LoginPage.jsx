import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Wrapper from '../assets/wrappers/Form';
import api_url from "../url.js";


function LoginPage({ setUserStatus }) {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  async function onSubmit(data) {
    setLoginError("");
    //Calls api to get user by email
    try {
      const response = await fetch(`${api_url}users/${data.email}`);

      if (!response.ok) {
        throw new Error("Användaren finns inte! Vänligen registrera dig");
      }

      const user = await response.json();

      //Check matching email and password
      if (user.password !== data.password) {
        throw new Error("Felaktigt lösenord!");
      }
  
      console.log(`Inloggad med: ${user.email}`)
      // Save in localStorage
      localStorage.setItem("user-email", user.email);
      setUserStatus("logged-in");
      //Navigate to home page if login success
      navigate("/");
  
    } catch(error) {
      setLoginError(error.message);
      console.error(error);
    }
  }

  /*
  Returns a login form that on submit calls
  for handleLogin
  */
  return (
    <Wrapper>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h4>Logga in</h4>

        <p>Ange den email adressen samt lösenord du använde vid registrering.</p>

        {loginError && <p className="error-message">{loginError}</p>}

        <label htmlFor="email">Email</label><br/>
        <input type="email"
          id="email"
          {...register("email", { required: true })}/><br/>
          {errors.email && <p className="error-message">Du måste fylla i email.</p>}

        <label htmlFor="password">Lösenord</label><br/>
        <input type="password"
          id="password"
          {...register("password", { required: true })}/><br/>
          {errors.password && <p className="error-message">Du måste fylla i lösenord.</p>}

        <input className="form-button" type="submit" value="logga in"></input>
      </form>
    </Wrapper>
  )
}

export default LoginPage