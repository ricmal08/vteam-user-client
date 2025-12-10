import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function GithubCallback({ setUserStatus }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        console.log('token: ', token);

        if (!token) {
            navigate('/login');
            return;
        }

        localStorage.setItem('access-token', token);
        setUserStatus('logged-in');
        navigate('/');

    }, []);

    return <p>Loggar in med GitHub...</p>;
    
}

export default GithubCallback;