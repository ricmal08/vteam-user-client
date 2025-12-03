import { useNavigate } from 'react-router-dom';
import api_url from "../url.js";
import Wrapper from '../assets/wrappers/Form.js';

function SettingsPage({user, setUser, setUserStatus}) {
    const navigate = useNavigate();
    // Function that deletes user
    async function deleteAccount() {
        try {
            const confirmed = window.confirm("Är du säker på att du vill radera ditt konto?");

            if (!confirmed) {
                return;
            }

            const userEmail = user.email;

            if (!userEmail) {
                console.log("Ingen användare inloggad!");
                setUser(null);
                return;
            }

            // Delete user
            const response = await fetch(`${api_url}users/${userEmail}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error("Kunde inte radera användare", errorData);
            }

            const data = await response.json();
            console.log("Lyckad radering av konto", data);

            setUser(null);
            setUserStatus("logged-out");
            localStorage.removeItem("user-email");
            // Navigate to login page
            navigate("/login");
        } catch (error) {
            console.error("Fel vid radering", error);
        }
        

    }

    return (
        // Vi kan fylla på med kanske mer saker såsom uppdatera användare, språk etc? 
        // vet inte vad som går efter oauth...
        <Wrapper>
            <button className='delete-btn' onClick={deleteAccount}>Radera Konto</button>
        </Wrapper>
    )

}

export default SettingsPage;