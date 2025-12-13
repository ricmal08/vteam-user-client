import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function GithubCallback({ setUserStatus }) {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        console.log(token)

        if (token) {
        localStorage.setItem("accessToken", token);
        setUserStatus("logged-in");
        navigate("/");
        } 
    }, []);
    
    
}

export default GithubCallback;