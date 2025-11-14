# Vteam - User Client

Detta är frontend-repot för användargränssnittet. 
Applikationen är byggd med React och Vite.


### Förutsättningar

*   [Docker](https://www.docker.com/products/docker-desktop/)
*   [Git](https://git-scm.com/)

### Installation

1.  **Klona repot**
   
    git clone git@github.com:ricmal08/vteam-user-client.git
    cd vteam-user-client
    

2.  **Starta med Docker Compose**
    Detta kommando bygger Docker-imagen och startar containern.

    docker-compose up -d


3.  **Öppna applikationen**
    Applikationen är nu tillgänglig på [http://localhost:3001](http://localhost:3001).





# stage one

* Installerat react-router-dom för navigering
* Installerat styled-components för att dela upp styling bättre
* Installerat leaflet react-leaflet @types/leaflet för kartor

mer info leaflet
https://ujjwaltiwari2.medium.com/a-guide-to-using-openstreetmap-with-react-70932389b8b1

dependencies tillagd i package.json npm install behöver köras på
nytt.

Skapat en dynamisk navbar som ändrar innehåll beroende på om man är inloggad
eller inte. Skapat några enkla vyer, "hem vy" Som visar antingen en tom sida
med texten "välkommen" eller en kart vy med rubriken "tillgängliga cyklar" om
användaren är inloggad. En login vy och en registretings vy med två olika formulär. Hårdkodad funktionalitet användaren loggas in om användaren trycker
på login knappen. Ny status sparas i localstorage. Samma för logga ut. Skapar
användaren ett konto ges ett alert message ut.


Skapat en enklare grundstyling med css modulerat med styled components. I nu
läget endast en gemensam wrapper för de båda formulären resterande css i respektive komponent.

Skapat file index.js för att samla komponenter för tydligare översikt och snyggare kod vid import.
