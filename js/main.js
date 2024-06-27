console.log('Welcome');
function getEle(id) {
  return document.getElementById(id);
}

getEle('startBtn').addEventListener('click', function() {
  console.log('Button clicked');
  mapContainer = getEle('mapContainer');
  getCurrentLocation()
  .then(location => {
    console.log("Location: " + location)
    mapContainer.innerHTML = location
  })
  .catch(error => console.error(error));
});

getEle('delBtn').addEventListener('click', function() {
    console.log('delete Button clicked');
    });

getEle('updBtn').addEventListener('click', function() {
    console.log('update button clicked');
    });

    function getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              // Retrieve latitude and longitude
              let latitude = position.coords.latitude;
              let longitude = position.coords.longitude;
    
              // Resolve the Promise with the coordinates
              resolve("latitude: " +latitude + ',' + "longitude: " + longitude);
            },
            function(error) {
              // Handle errors (e.g., user denied location access)
              reject("Error getting current location: " + error.message);
            }
          );
        } else {
          reject("Geolocation is not supported by this browser.");
        }
      });
    }
 