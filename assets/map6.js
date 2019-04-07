function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 49.282730, lng: -123.120735},
      mapTypeId: "roadmap"
    });
    setMarkers(map);
    setOrgMarkers(map);
  }
  
  function setMarkers(map) { var dbRef= firebase.database().ref('Parks');
  dbRef.on('child_added', function(snapshot) {
    var snap = snapshot.val();
    let image = "images/tree.png"
    new google.maps.Marker({
      position: {lat: parseFloat(snap.Latitude), lng: parseFloat(snap.Longitude)},
      map: map,
      icon: image
      });
    });
  }
  
  function setOrgMarkers(map) {
    var locationRef = firebase.database().ref('Location');
    locationRef.on('child_added', function(snapshot) {
      var snap = snapshot.val();
      new google.maps.Marker({
        position: {lat: parseFloat(snap.lat), lng: parseFloat(snap.lng)},
        map: map
        });
      });
    }