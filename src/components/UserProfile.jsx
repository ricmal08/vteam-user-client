import { Link } from "react-router-dom";
import { MdContactMail } from "react-icons/md";
import { FaMapPin, FaUser } from "react-icons/fa";
import styled from 'styled-components';

function UserProfile({user}) {
  console.log("UserProfile renderas, user:", user);
  
  if (!user) {
    return <p>Laddar användare...Användare hittades inte</p>;
  }

  return (
    /*
    Returns profile page for user
    */
   <>
    <PageWrapper>
      <UserWrapper>
        <UserHead>
        <FaUser size={50}/>
        <h2 className="names">{user.firstName && user.lastName ? 
          `${user?.firstName} ${user?.lastName}` : 'Användare'}
        </h2>
          <span className='saldo'>Saldo { user?.balance }kr</span>
        </UserHead>
        <UserInfo>
          <InfoSection>
            <InfoTitle>
              <MdContactMail size={30}/> <span>Kontaktinformation</span>
            </InfoTitle>
            <InfoText>
              {user?.github ? `${user.username}` : `${user.email}`}
            </InfoText>
          </InfoSection>

          <InfoSection>
            <InfoTitle>
              <FaMapPin size={30}/> <span>Adress</span>
            </InfoTitle>
            <InfoText>
              {user?.street}, {user?.zipCode}, {user?.city}
            </InfoText>
          </InfoSection>

          <InfoSection>
            <InfoTitle>
              <span>Kontotyp</span>
            </InfoTitle>
            <KontoType className="konto">
              {user.github ? 'Github' : 'Standard'}
            </KontoType>
          </InfoSection>

        </UserInfo>
        <Footer>
          <StyledLink to="/settings">Redigera Konto</StyledLink>
          <StyledLink to="/history">Tidigare resor</StyledLink>
          <StyledLink to="/deposit">Fyll på saldo</StyledLink>
        </Footer>

      </UserWrapper>
    </PageWrapper>
  </>
  )
}

const PageWrapper = styled.section`
    padding-bottom: 100px;
`;

const UserWrapper = styled.section`
    margin: 0 auto;
    margin-top: 1rem;
    max-width: 500px;
    width: 80%;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    background-color: #fff; 
`;


const UserHead = styled.section`
    color: #000;
    padding: 30px 20px;
    text-align: center;
    background: linear-gradient(135deg, #55928c 0%, #3d6b66 100%);
    
    .saldo {
        display: inline-block;
        border-radius: 8px;
        padding: 6px 16px;
        font-weight: 600;
        margin-top: 10px;
        background-color: #b4b1b1ff;
        color: #000;
        margin: 10px;
        text-decoration: none;
    }

`;

const UserInfo = styled.section`
    padding: 30px 20px;
    background-color: #fff;
`;

const InfoSection = styled.section`
  margin-bottom: 30px;
`;

const InfoTitle = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 1.1em;
`;

const InfoText = styled.section`
  margin: 0;
  padding-left: 40px;
  color: #333;
  font-size: 1em;
`;

const KontoType = styled.span`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  background-color: #3f60f2ff;
  color: #fff;
  font-weight: 600;
  font-size: 0.9em;
`;

const Footer = styled.section`
      padding: 20px 30px 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
`;

const StyledLink = styled(Link)`
      display: inline-block;
      border-radius: 8px;
      padding: 8px 10px;
      font-weight: 600;
      margin-top: 10px;
      text-decoration: none;
      color: #000;
      background-color: #b4b1b1ff;
      white-space: nowrap;

      &:first-child {
        background-color: #3f60f2ff;
        color: #fff;
      }
      &:last-child {
        background-color: #10b981;
        color: #000;
      }
`;

export default UserProfile