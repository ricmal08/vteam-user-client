import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from "react-icons/md";
import { useForm } from 'react-hook-form';
import api_url from "../url.js";
import styled from 'styled-components';


function SettingsPage({user, setUser, setUserStatus}) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            street: user?.street || '',
            zipCode: user?.zipCode || '',
            city: user?.city || ''
        }
    });

    // Function that edit user
    async function onSubmit(data) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.log("Ingen användare inloggad!");
                return;
            }

            console.log("Data som skickas till backend:", data);

            const response = await fetch(`${api_url}users`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                 },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error("Misslyckades med uppdatering av konto", errorData.message);
            }
            console.log("Response patch user: ", response.ok, response.status);

            const updatedUser = await response.json();
            console.log(updatedUser);
            setUser(updatedUser);
            setUserStatus("updated-user");
            navigate("/user");

        } catch (error) {
            console.error("Något gick fel!", error);
        }
    }

    // Function that deletes user
    async function deleteAccount() {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.log("Ingen användare inloggad!");
                return;
            }

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
            localStorage.clear();
            // Navigate to login page
            navigate("/login");
        } catch (error) {
            console.error("Fel vid radering", error);
        }
        

    }

    return (
        <PageWrapper>
            <h1>Redigera konto</h1>
            <form className='edit-user' onSubmit={handleSubmit(onSubmit)}>
                <button type='button' className='back-btn' onClick={() => navigate("/user")}>
                    <MdArrowBackIosNew size={30}/>
                </button>

                <label htmlFor="firstName">Förnamn</label><br/>
                <input
                    type='text'
                    id='firstName'
                    {...register("firstName")} />

                <label htmlFor="lastName">Efternamn</label><br/>
                <input
                    type='text'
                    id='lastName'
                    {...register("lastName")} />

                <label htmlFor="street">Gatuadress</label><br/>
                <input
                    type='text'
                    id='street'
                    {...register("street")} />
                
                <label htmlFor="zipCode">Postkod</label><br/>
                <input
                    type='text'
                    id='zipCode'
                    {...register("zipCode")} />

                <label htmlFor="city">Stad</label><br/>
                <input
                    type='text'
                    id='city'
                    {...register("city")} />
                <input className="form-button" type="submit" value="Uppdatera konto" />
            </form>
            <button className='delete-btn' onClick={deleteAccount}>Radera Konto</button>
        </PageWrapper>
    )

}

const PageWrapper = styled.section`
    padding-bottom: 100px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;

    h1 {
        text-align: center;
    }

    label {
        margin-left: 10%;
        padding: 5px;
        font-size: 1em;
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

    .edit-user {
        margin: 0 auto;
        margin-top: 1rem;
        max-width: 500px;
        width: 80%;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        background-color: #fff;
        padding: 20px;
    }
    

    .delete-btn {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.2s;
        max-width: 500px;
        margin: 20px auto;
    }
    .delete-btn:hover {
        background-color: #c82333;
    }
    
    .form-button {
        font-size: 1em;
        margin-top: 20px;
        padding: 5px;
        border-radius: 10px;
        background-color: #10b981;
    }
    .form-button:hover  {
        cursor: pointer;
    }
    .back-btn {
        background: none;
        border: none;
        cursor: pointer;
        position: absolute;
    }
`;


export default SettingsPage;