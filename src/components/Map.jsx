import { MapContainer, TileLayer } from 'react-leaflet'
import styled from 'styled-components';

/*
Renders a map using openstreetmap
*/
function Map() {
  return (
    <Wrapper>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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

/* export default function Map() {
  return (
    <div>
      <h1>This will be a Map component</h1>
    </div>
  );
} */