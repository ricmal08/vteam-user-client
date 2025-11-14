import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Form';

function RegisterPage() {
  const navigate = useNavigate();

  /*
  Function to handle user login
  For now only set user-status in localstorage
  by using setUserStatus and then navigate to
  home page
  */
  function handleRegister(event) {
    event.preventDefault();

    alert("Tack för att du skapat ett konto hos oss!")
    navigate("/login");
  };

  /*
  Returns a login form that on submit calls
  for handleLogin
  */
  return (
    <Wrapper>
      <form className="register-form" onSubmit={handleRegister}>
        <h4>Skapa konto</h4>

        <p>Genom att skapa ett konto accepterar du vårt avtal</p>

        <label htmlFor="firstname">Förnamn</label><br/>
        <input type="text" name="firstname" id="firstname"></input><br/>

        <label htmlFor="lastname">Efternamn</label><br/>
        <input type="text" name="lastname" id="lastname"></input><br/>

        <label htmlFor="adress">Gatuadress</label><br/>
        <input type="text" name="adress" id="adress"></input><br/>

        <label htmlFor="city">Stad</label><br/>
        <input type="text" name="city" id="city"></input><br/>

        <label htmlFor="city">Postnummer</label><br/>
        <input type="text" name="zip-code" id="zip-code"></input><br/>

        <label htmlFor="email">Email</label><br/>
        <input type="text" name="email" id="email"></input><br/>

        <label htmlFor="password">Lösenord</label><br/>
        <input type="text" name="password" id="password"></input><br/>

        <input className="form-button" type="submit" value="Skapa konto"></input>
      </form>
    </Wrapper>
  )
}

export default RegisterPage