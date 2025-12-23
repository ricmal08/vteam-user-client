import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';

function Nav({ userStatus, setUserStatus, setUser }) {
  const navigate = useNavigate();

  /*
  Function to handle user logout
  For now only set user-status in localstorage
  by using setUserStatus and then navigate to
  home page
  */
  function handleLogout() {
    setUserStatus("logged-out");
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.clear();
    navigate("/");
  };

  /*
  Returns a dynamic navbar that changes its content
  depending on user-status in localstorage passed
  by userStatus
  */
  return (
    <Wrapper>
      <Link className="nav-button" to="/">Hem</Link>
        {userStatus === "logged-in" ? (
          <>
          <Link className="nav-button" to='/user'>Konto</Link>
          <button onClick={handleLogout} className="nav-button">Logga ut</button>
          </>
        ) : (
          <>
            <Link className="nav-button" to='/login'>Logga in</Link>
          </>
        )}    
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background-color: var(--color-main);
  border-top: solid 2px var(--color-shadow);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 0.5rem;
  text-align: center;
  .nav-button {
      all: unset;
      display: inline-block;
      background-color: var(--color-button);
      margin: 0.5rem;
      padding: 0.5rem;
      border: solid 2px var(--color-shadow);
      border-radius: 10px;
  }
  .nav-button:hover  {
      cursor: pointer;
  }
`;

export default Nav