import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet'
import { FaBatteryFull, FaBatteryThreeQuarters, FaBatteryHalf, FaBatteryQuarter } from "react-icons/fa";
import { useEffect, useState } from "react";
import L from "leaflet";
import styled from 'styled-components';
import api_url from '../url';

// TODO
// fler färger för olika typer av zoner
// Color for the zone
const zoneOptions = {
  city: { color: '#c8fac8', fillOpacity: 0.2 },
  parking: { color: '#4165e9ff', fillOpacity: 0.2 },
  invalid: { color: '#da4848ff', fillOpacity: 0.2},
  default: { color: 'grey', fillOpacity: 0.2 }
};


// A helper function to determine which battery icon to display in the popup
function getBatteryIcon(battery) {
  if (battery === 100) {
    return <FaBatteryFull size={20}/>;
  } else if (battery >= 60) {
    return <FaBatteryThreeQuarters size={20}/>;
  } else if (battery >= 40) {
    return <FaBatteryHalf size={20}/>;
  }
  return <FaBatteryQuarter size={20}/>;

}

/*
Renders a map using openstreetmap
*/
function Map() {
  
  // usestate för staden som användaren kör i, kanske dropdown meny eller gps??
  const [userCity, setuserCity] = useState(null);

  // Array with zones for future with more zones
  const [zones, setZones] = useState([]);

  const [bikes, setBikes] = useState([]);

  const [activeRide, setActiveRide] = useState(null);
  

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

  // Start a ride
  async function startRide(bikeId) {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Du måste vara inloggad för den här funktionen!");
        return;
      }

      const response = await fetch(`${api_url}ride/${bikeId}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${accessToken}` }
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error("Kunde inte starta resan", errorData);
      }

      const bikeStarted = await response.json();
      console.log("Resa startad: ", bikeStarted);
      setActiveRide(bikeId);
      localStorage.setItem("activeRide", bikeId);
    } catch (error) {
      console.error("Något gick fel: ", error.message);
      alert("Gick inte starta resa! Försök igen");
    }
    
  }

  // End the ride
  async function endRide(bikeId) {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Du måste vara inloggad för den här funktionen!");
        return;
      }

      const response = await fetch(`${api_url}ride/end/${bikeId}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${accessToken}` }
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error("Kunde inte avsluta resan", errorData);
      }

      const bikeStarted = await response.json();
      console.log("Resan avslutad: ", bikeStarted);
      setActiveRide(null);
      localStorage.removeItem("activeRide");
      fetchCityBikes(userCity._id);
    } catch (error) {
      console.error("Något gick fel: ", error.message);
      alert("Gick inte att avsluta resan! Försök igen");
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

  useEffect(() => {
  const savedRide = localStorage.getItem("activeRide");
  if (savedRide) {
    setActiveRide(savedRide);
  }
}, []);

const BikeIcon = L.icon({
  iconUrl: 'images/scooter.png',
  iconSize: [40, 40]
});


// TODO
// Dynamiskt centrera kartan efter användarens position
  return (
    <>
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
            pathOptions={zoneOptions[zone.typeOfZone] || zoneOptions.default}
          />
        ))}
        {/* Available bikes or active bike */}
        {(activeRide ? bikes.filter(bike => bike._id === activeRide) 
          : bikes.filter(bike => !bike.inUse)
          ).map((bike) => (
            <Marker key={bike._id}
              position={[bike.position.latitude, bike.position.longitude]}
              icon={BikeIcon}>
                <StyledPopup>
                  <div className='info-wrapper'>
                    <img className='scooter-icon' src="/images/scooter.png" alt="scooter" />
                    <p className='bike-id'><b>&#8470;</b> {bike._id}</p>
                  </div>
                  <p className='battery'>{getBatteryIcon(bike.battery)} {bike.battery}%</p>
                  <div className='button-wrap'>
                    {activeRide ? <button className='end' onClick={() => endRide(bike._id)}>Avsluta resan</button>
                      : <button className='start' onClick={() => startRide(bike._id)}>Starta åkturen</button>
                    }
                    
                  </div>
                  <p className='price'><strong>Pris</strong> <br />10kr + 2.50 kr/min</p>
                </StyledPopup>
              
            </Marker>
          ))}
        
        </MapContainer>
      </Wrapper>
    </>
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

const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    border-radius: 12px;
    padding: 15px;
  }
  .info-wrapper{
    display: flex;
    gap: 10px;
  }
  .battery {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
    justify-content: center;
  }
  .scooter-icon {
    width: 47px;
    height: 47px;
  }
  .bike-id {
    font-size: 10px;
  }
  .button-wrap {
    margin-top: 10px;
    text-align: center;
  }
  .start {
    background-color: #55928c;
    color: #fff;
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
  }
  .end {
    background-color: #f91a1aff;
    color: #fff;
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
  }
  .price {
    text-align: left;
    border-top: solid 1px #ccc;
    padding: 10px;
    font-size: 10px;
  }
`;

export default Map
