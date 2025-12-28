import { useState } from "react";


export function useGeolocation() {
    const [error, setError] = useState(null);
    const [position, setPosition] = useState(null);

    function getPosition() {
        if (!navigator.geolocation) {
            return setError('Geolocation är inte tillgänglig i webbläsaren');

        }


        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setPosition({ lat: latitude, lon: longitude });

            
            }, 
            (error) => {
                setError(error.message);
            }
        );
    }

    return {position, getPosition, error};
}