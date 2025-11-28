import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { useEffect, useState } from "react";
import styled from 'styled-components';

// Color for the zone
const greenOption = { color: 'green' };

/*
Renders a map using openstreetmap
*/
function Map() {
  // Array with zones for future with more zones
  const [zones, setZones] = useState([]);

  // Fetch from api
  async function fetchZones() {
    try {
      const response = await fetch("http://localhost:3000/zones/stockholm");

      console.log('response:', response.ok);

      if (!response.ok) {
        throw new Error("Kunde inte hämta zoner");
      }

      const zone = await response.json();
      console.log('zone:', zone);
      console.log('coordinates:', zone.area.coordinates);
      console.log('coordinates[0]', zone.area.coordinates[0]);

      setZones([zone]);

    } catch (error) {
      console.error("Error while fetching zones:", error);
    }
    
  }

  useEffect(() => {
    fetchZones();
  }, []);

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
