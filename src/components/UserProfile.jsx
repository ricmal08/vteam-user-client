import { useEffect } from "react";
import api_url from "../url.js";
import styled from 'styled-components';

function UserProfile({user, setUser}) {
  /*
  Function that fetch the user from api by email from the localstorage.
  */
  async function fetchUser () {
    try {
      // email from localstorage saved while logging in
      const userEmail = localStorage.getItem("user-email");

      if (!userEmail) {
        console.log("Ingen användare inloggad!");
        setUser(null);
        return;
      }
      // Fetch user from api with email
      const response = await fetch(`${api_url}users/${userEmail}`);

      if (!response.ok) {
        throw new Error("Kunde inte hämta användare");
      }
      const user = await response.json();

      if (!user) {
        console.log("Användaren hittades inte");
        setUser(null);
        return;
      }
      console.log(user);
      setUser(user);

      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    /*
    Returns profile page with username from api
    */
    <Wrapper>
      <img src="/images/default-avatar.png" alt="avatar bild"></img>
        <ul>
          <li>Email: {user.email}</li>
        </ul>
      </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  background-color: var(--color-main);
  border-bottom: solid 5px var(--color-main-dark);
  img {
    margin: 15px;
    width: 33%;
    max-height: 100px;
    max-width: 100px;
    border-radius: 50%;
    background-color: var(--color-button);
  }
  ul {
    width: 100%;
    padding-top: 65px;
    background-color: var(--color-button);
    border-left: solid 3px var(--color-main-dark);
  }
  li {
    margin: 4px;
    padding-left: 4px;
    list-style-type: none;
  }
`;
export default UserProfile