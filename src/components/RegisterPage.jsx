import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api_url from "../url.js";
import Wrapper from '../assets/wrappers/Form';

function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  async function onSubmit(data) {
    //Calls api to insert new user, validation is in register()
    try {
      const response = await fetch(`${api_url}users`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error("Registrering misslyckades");
      }

      console.log("Tack för att du skapat ett konto hos oss!")
        //Navigate to login page if creation success
        navigate("/login");

    } catch(error) {
      console.error(error);
    }
  }

  return (
    /*
    Returns a login form that on submit calls handleSubmit from react-hook-form
    */
    <Wrapper>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h4>Skapa konto</h4>

        <p>Genom att skapa ett konto accepterar du vårt avtal</p>

        <label htmlFor="email">Email</label><br/>
        <input
          type='email'
          id='email'
         {...register("email", { required: true })} /><br/>
        {errors.email && <p className="error-message">Du måste fylla i Email.</p>}

        <label htmlFor="password">Lösenord</label><br/>
        <input
          type='password'
          id='password'
         {...register("password", { required: true })} /><br/>
        {errors.password && <p className="error-message">Du måste fylla i lösenord.</p>}

        <input className="form-button" type="submit" value="Skapa konto" />
      </form>
    </Wrapper>
  )
}

export default RegisterPage