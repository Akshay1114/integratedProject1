// main.js
// Initialize the map and set its view to a default location
const map = L.map('map').setView([51.505, -0.09], 13);

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable to store the user's marker
let userMarker;
let userPath = [];
let locationData = []

// Function to update the map with the user's location
function updateLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const acc = position.coords.accuracy;
            const locaData = {
                lat: lat,
                lon: lon,
                acc: acc
            }
            console.log(`Lat: ${lat}, Lon: ${lon}`); // Logging the position
            locationData.push(locaData)
            // Center the map on the user's location
            map.setView([lat, lon], 16);
console.log(locationData)
            // Add or update the marker for the user's location
            if (!userMarker) {
                userMarker = L.marker([lat, lon]).addTo(map);
                userMarker.bindPopup(`<b>You are here!</b><br>Lat: ${lat}, Lon: ${lon}`).openPopup();
            } else {
                userMarker.setLatLng([lat, lon]).update();
                userMarker.getPopup().setContent(`<b>You are here!</b><br>Lat: ${lat}, Lon: ${lon}`).openPopup();
            }

            // Track the user's path
            userPath.push([lat, lon]);
            L.polyline(userPath, {color: 'blue'}).addTo(map);
        }, error => {
            console.error(`Geolocation error: ${error.message}`); // Logging geolocation errors
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Call the function to update the location
updateLocation();
