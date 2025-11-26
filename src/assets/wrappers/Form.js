import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  form {
    max-width: 500px;
    width: 80%;
    background-color: var(--color-main);
    margin-top: -65px;
    border-radius: 10px;
    border: solid 2px var(--color-shadow);
  }
  .login-form {
    min-height: 370px;
  }
  .register-form {
    min-height: 570px;
  }
  input {
    box-sizing: border-box;
    width: 80%;
    margin-left: 10%;
    margin-bottom: 5px;
    margin-top: 2px;
    padding: 2px;
    background-color: #fff;
    border: solid 2px var(--color-shadow);
    border-radius: 5px;
  }
  .form-button {
    font-size: 1em;
    margin-top: 20px;
    padding: 5px;
    background-color: var(--color-button);
    border: solid 2px var(--color-shadow);
    border-radius: 10px;
  }
  .form-button:hover  {
    cursor: pointer;
  }
  label {
    margin-left: 10%;
    padding: 5px;
    font-size: 1em;
  }
  h4 {
    margin-left: 10%;
    margin-top: 45px;
    margin-bottom: 5%;
  }
  p {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 5%;
  }
  .error-message {
    color: red;
    font-size: 0.9em;
    margin-top: 0;
    margin-bottom: 10px;
  }
`;

export default Wrapper;
