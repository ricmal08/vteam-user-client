import { useState } from "react";


export function useGeolocation() {
    const [error, setError] = useState(null);
    const [position, setPosition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function getPosition() {
        if (!navigator.geolocation) {
            return setError('Geolocation är inte tillgänglig i webbläsaren');

        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setIsLoading(false);
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setPosition({ lat: latitude, lon: longitude });

            
            }, 
            (error) => {
                setIsLoading(false);
                setError(error.message);
            }
        );
    }

    return {position, getPosition, error, isLoading};
}