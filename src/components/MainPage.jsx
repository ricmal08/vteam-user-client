import styled from 'styled-components';
import { 
  Map,
} from './index.js';

/*
Return map and header if user logged in else only header.
*/
function MainPage({ userStatus }) {
  return (
    <Wrapper>
      {userStatus === "logged-in" ? (
        <>
          <div className="header"><h1>Tillgängliga cyklar</h1></div>
          <Map />
        </>
      ) : (
        <>
          <div className="header"><h1>Välkommen</h1></div>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .header {
    text-align: center;
  }
  h1 {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`;

export default MainPage