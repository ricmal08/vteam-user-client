import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Form';

function LoginPage({ setUserStatus }) {
  const navigate = useNavigate();

  /*
  Function to handle user login
  For now only set user-status in localstorage
  by using setUserStatus and then navigate to
  home page
  */
  function handleLogin(event) {
    event.preventDefault();
    
    setUserStatus("logged-in");
    navigate("/");
  };

  /*
  Returns a login form that on submit calls
  for handleLogin
  */
  return (
    <Wrapper>
      <form className="login-form" onSubmit={handleLogin}>
        <h4>Logga in</h4>

        <p>Ange den email adressen samt lösenord du använde vid registrering.</p>

        <label htmlFor="email">Email</label><br/>
        <input type="text" name="email" id="email"></input><br/>

        <label htmlFor="password">Lösenord</label><br/>
        <input type="text" name="password" id="password"></input><br/>

        <input className="form-button" type="submit" value="logga in"></input>
      </form>
    </Wrapper>
  )
}

export default LoginPage