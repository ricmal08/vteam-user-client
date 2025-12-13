import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { useEffect, useState } from "react";
import styled from 'styled-components';
import api_url from '../url';

// TODO
// fler färger för olika typer av zoner
// Color for the zone
const greenOption = { color: 'green' };

/*
Renders a map using openstreetmap
*/
function Map() {
  
  // usestate för staden som användaren kör i, kanske dropdown meny eller gps??
  const [userCity, setuserCity] = useState(null);

  // Array with zones for future with more zones
  const [zones, setZones] = useState([]);

  const [bikes, setBikes] = useState([]);
  

  // Fetch cities from api
  async function fetchCities() {
    try {
      const response = await fetch(`${api_url}cities`);

      console.log('response:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Kunde inte hämta städer", errorData);
      }

      const res = await response.json();
      console.log("cities: ", res);
      // Hårdkodar med sthlm nu från script
      setuserCity(res[0]);

    } catch (error) {
      console.log("Fel vid fetch av städer", error);

    }
    
  }


  // Fetch from zones in city
  async function fetchCityZones(cityId) {
    try {
      const response = await fetch(`${api_url}cities/${cityId}/zones`);

      console.log('response:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Kunde inte hämta zoner i staden", errorData);
      }

      const cityZones = await response.json();
      console.log('zone:', cityZones);

      setZones(cityZones);

    } catch (error) {
      console.error("Error while fetching zones:", error);
    }
    
  }

  // Fetch bikes in the city choosen by user
  async function fetchCityBikes(cityId) {
    try {
      const response = await fetch(`${api_url}cities/${cityId}/bikes`);

      console.log('response:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Kunde inte hämta bikes i staden", errorData);
      }

      const cityBikes = await response.json();
      console.log("Bikes: ", cityBikes);

      setBikes(cityBikes);

    } catch (error) {
      console.error("Error fetching av bikes", error);
    }

    
  }

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (userCity) {
      fetchCityZones(userCity._id);
      fetchCityBikes(userCity._id);
    }
  }, [userCity]);

// TODO
// Dynamiskt centrera kartan efter användarens position
  return (
    <Wrapper>
      <MapContainer center={[59.3293, 18.0686]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      {/* write the zone, need to flip the positions to lat long due to GeoJson sends long lat */}
      {zones.map((zone) => (
        <Polygon
          key={zone._id}
          // Map coordinates to be able to flip them, check console.log to see the array when fetching
          positions={zone.area.coordinates[0].map(coord => [coord[1], coord[0]])}
          // Set the color with the variabel
          pathOptions={greenOption}
        />

      ))}
      </MapContainer>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 60vh;

  .leaflet-container {
    height: 100%;
    width: 90%;
    margin-left: 5%;
    border-radius: 8px;
  }
`;

export default Map
