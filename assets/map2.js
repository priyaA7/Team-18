function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 49.282730, lng: -123.120735},
    mapTypeId: "roadmap"
  });
  setMarkers(map);
  setDestMarkers(map);
  setStartMarkers(map);
}

function setMarkers(map) { var dbRef= firebase.database().ref('Rentals');
dbRef.on('child_added', function(snapshot) {
  var snap = snapshot.val();
  let image = "images/rental.png"
  new google.maps.Marker({
    position: {lat: parseFloat(snap.Latitude), lng: parseFloat(snap.Longitude)},
    map: map,
    icon: image
    });
  });
}

function setDestMarkers(map) {
  let destRef = firebase.database().ref('Destination/');
  destRef.on('value', function(snapshot) {
    let snap = snapshot.val();    
    new google.maps.Marker({
      position: {lat: parseFloat(snap.lat), lng: parseFloat(snap.lng)},
      map: map
    });
  });
}

function setStartMarkers(map) {
  let startRef = firebase.database().ref('Starting/');
  startRef.on('value', function(snapshot) {
    let snap = snapshot.val();    
    new google.maps.Marker({
      position: {lat: parseFloat(snap.lat), lng: parseFloat(snap.lng)},
      map: map
    });
  });
}