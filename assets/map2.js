

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 49.282730, lng: -123.120735},
      mapTypeId: "roadmap"
    });

    setMarkers(map);
  }

  function setMarkers(map) { var dbRef= firebase.database().ref('Rentals');
  dbRef.on('child_added', function(snapshot) {
      var snap = snapshot.val();
      var marker = new google.maps.Marker({
        position: {lat: parseFloat(snap.Latitude), lng: parseFloat(snap.Longitude)},
        map: map
    });
});
}

