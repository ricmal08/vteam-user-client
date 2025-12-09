# Vteam - User Client

Detta är frontend-repot för användargränssnittet.
Applikationen är byggd med React och Vite.

### Förutsättningar

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

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

- Installerat react-router-dom för navigering
- Installerat styled-components för att dela upp styling bättre
- Installerat leaflet react-leaflet @types/leaflet för kartor

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

### API

Skapat kontakt med vårt api på endpunkten /users där en get request används i UserProfile component. En post request sker i registrerings formulär.

För tillfället hämtas endast användare med index 0, och förutsätter att databasen inte är tom.

# refactor/user-interface-updates

- Installerat react-hook-form för enklare hantera formulär
  Ger mindre kod, validering direkt i register() och automatisk error hantering.

npm install behöver köras på nytt.

Refactorerat så att skapa konto matchar user.schema i backend med endast email och password även om vi ska använda OAuth senare.
LoginPage använder också react-hook-form. Loggar in genom api endpoint /users/:email, hanterar även errors vid fel lösenord, email med mera. Sparar i localStorage.
UserProfile fetchar användarens profil med endpoint /users/:email där emailen är sparad i localStorage från tidigare login. Krävs dock att man skapar ett konto och loggar in alternativt kör scriptet och loggar in med de befintliga användarna.

Lagt till en HistoryPage som innehåller en tabell med tidigare resor/fakturor där man kan klicka sig vidare på faktura för att då komma till InvoicePage där mer detaljer visas.

# feature/zones (kommer i nästa PR)

## Viktigt! Kör script i backend innan!

Hämtar stockholms zonen från scriptet. Använder en useState med array för att i framtiden kunna hantera flera zoner. Kolla gärna i console loggen för att se vad som skickas med vid fetch. Var viktigt att förstå hur GeoJson skickar en polygon med flera 'ringar' för att hämta och hantera rätt index i coordinates arrayen. Tvungen att ändra ordningen på koordinaterna som skickas från backend då GeoJson skickar longitude, latitude medans react-leaflet hanteras med latidude, longitude ordningen. Grön färg för att visa tillåten körning. Väldigt simpelt än sålänge.
