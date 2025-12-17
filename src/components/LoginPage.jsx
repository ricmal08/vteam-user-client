import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IoLogoGithub } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { MdArrowBackIosNew } from "react-icons/md";
import styled from 'styled-components';
import Wrapper from '../assets/wrappers/Form';
import api_url from "../url.js";


function LoginPage({ setUserStatus }) {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  // UseState to handle different login methods. Enabling dynamic view of the lgoin page
  const [loginMethod, setLoginMethod] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  async function onSubmit(data) {
    setLoginError("");
    //Calls api to get user by email
    try {
      console.log("Datan: ", data);
      const response = await fetch(`${api_url}auth/login/normal`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Något gick fel vid inlogg!");
      }

      const { accessToken } = await response.json();

      console.log(`Token: ${accessToken}`)
      // Save in localStorage
      localStorage.setItem("accessToken", accessToken);
      setUserStatus("logged-in");
      //Navigate to home page if login success
      navigate("/");
    } catch(error) {
      setLoginError(error.message);
      console.error(error);
    }
  }

  /*const handleGithubLogin = () => {
    window.location.href = `${api_url}auth/login/github`;
  }*/


// First view to show different options to login
if (!loginMethod) {
  return (
    <LoginWrapper>
      <div className="login-form">
        <h4>Logga in på Rullverket</h4>
        <button type='button' className='button-option' onClick={() => setLoginMethod('email')}>
          <CiUser size={20}/> Använd E-post
        </button>

        <button type='button' className='button-option'>
          <IoLogoGithub size={20}/> Fortsätt med Github
        </button>
      </div>

      <div className='formalia'>
        <p>Genom att fortsätta med ett konto i <strong>Sverige</strong> godkänner du våra <strong>Användningsvillkor</strong> och
          bekräftar att du läst igenom vår <strong>Sekretesspolicy</strong> och <strong>Cookiepolicy</strong>
        </p>
      </div>
      <div className='create-account'>
        <button type='button' className='register-btn' onClick={() => navigate('/register')}>
          Har du inte ett konto? <span className='register'>Registrera dig</span>
        </button>
      </div>
    </LoginWrapper>
  )
}
  /*
  Returns a login form when loginMethod is 'email' that on submit calls
  for handleLogin
  */
  if (loginMethod === 'email') {
    return (
      <Wrapper>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <button type='button' className='back-btn' onClick={() => setLoginMethod(null)}>
            <MdArrowBackIosNew size={30}/>
          </button> 
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
  
}

const LoginWrapper = styled.section`
  margin: 0 auto;
  margin-top: 1rem;
  max-width: 500px;
  width: 90%;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;  
  background-color: #fff;
  padding: 30px 20px;

  h4 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .login-form {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
  }
  .button-option {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 18px 16px;
    background-color: #fff;
    border: 1px solid #d1d1d6;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 2rem;
  }
  .formalia {
    p {
      font-size: 12px;
      text-align: center;
      padding: 10px;
    }
  }
  .create-account {
    margin-top: 1rem;
    background-color: #ccc;
    border-top: 1px solid #ccd;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    margin: 2rem -20px -30px -20px;
  }
  .register-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  .register {
    color: #fc1b3dff;
    font-weight: 600;
  }
`;

export default LoginPage
