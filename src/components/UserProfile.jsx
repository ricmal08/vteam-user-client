import { useEffect } from "react";
import api_url from "../url.js";
import styled from 'styled-components';

function UserProfile({user, setUser}) {
  /*
  Function that gets all the users from the api, sets the
  first user found as user.
  */
  async function fetchUser () {
    try {
      // Fetch all users from api
      const response = await fetch(`${api_url}users`);
      const users = await response.json();
      // Set user as first found
      setUser(users[0]);

      } catch (error) {
        console.error("Error fetching users:", error);
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