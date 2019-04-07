function initMap() {
  // Initialize Google Map within browser
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 49.282730, lng: -123.120735},
    mapTypeId: "roadmap"
  });
  // Function to display line between two points
  displayLine(map);
};

let line = [{lat: 49.270937, lng: -123.16214200000002}, {lat: 49.281954, lng: -123.11707439999998}]
function displayLine(map) {
  // Polyline - Google Map built in to produce line
  let bikePath = new google.maps.Polyline({
    path: line,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  bikePath.setMap(map);
};
    