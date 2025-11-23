import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api_url from "../url.js";
import Wrapper from '../assets/wrappers/Form';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  /*
  Function to handle user creation for now creates
  a new user only using name and lastname, calls
  the api that stores it in database.
  */
  async function handleRegister(event) {
    event.preventDefault();
    //Check if name and lastname is filled in form
    if (!name || !lastname) {
      console.log("Du måste fylla i namn");
    } else {
      //Calls api to insert new user
      const response = await fetch(`${api_url}users`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastname })
      });
      if (!response.ok) {
        console.log("Registrering misslyckades");
        return;
      }
      console.log("Tack för att du skapat ett konto hos oss!")
      //Navigate to login page if creation success
      navigate("/login");
      }
  };

  return (
    /*
    Returns a login form that on submit calls
    for handleRegister
    */
    <Wrapper>
      <form className="register-form" onSubmit={handleRegister}>
        <h4>Skapa konto</h4>

        <p>Genom att skapa ett konto accepterar du vårt avtal</p>

        <label htmlFor="firstname">Förnamn</label><br/>
        <input type="text" name="firstname" id="firstname" value={name} onChange={e => setName(e.target.value)}/><br/>

        <label htmlFor="lastname">Efternamn</label><br/>
        <input type="text" name="lastname" id="lastname" value={lastname} onChange={e => setLastname(e.target.value)}/><br/>

        <label htmlFor="adress">Gatuadress</label><br/>
        <input type="text" name="adress" id="adress"></input><br/>

        <label htmlFor="city">Stad</label><br/>
        <input type="text" name="city" id="city"></input><br/>

        <label htmlFor="city">Postnummer</label><br/>
        <input type="text" name="zip-code" id="zip-code"></input><br/>

        <label htmlFor="email">Email</label><br/>
        <input type="text" name="email" id="email"></input><br/>

        <label htmlFor="password">Lösenord</label><br/>
        <input type="password" name="password" id="password"></input><br/>

        <input className="form-button" type="submit" value="Skapa konto"></input>
      </form>
    </Wrapper>
  )
}

export default RegisterPage