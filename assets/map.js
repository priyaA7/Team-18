function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 49.282730, lng: -123.120735},
      zoom: 10,
      mapTypeId: "roadmap"
    });

    var Destination = document.getElementById("enteredDest");
    var searchBox = new google.maps.places.SearchBox(Destination);
    
    var location = document.getElementById("searchResult2");
    var locationBox = new google.maps.places.SearchBox(location);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
      locationBox.setBounds(map.getBounds());
    });
    
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      
      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
          if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
            }));
            
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();

            firebase.database().ref("Destination/").set({
                latitude: lat,
                longitude: lng
            });
        
            console.log("Latitude: ", lat);
            console.log("Longitude: ", lng);

            if (place.geometry.viewport) {
            // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    
    
    var markers2 = [];
    locationBox.addListener('places_changed', function() {
        let places = locationBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        
        markers2.forEach(function(marker) {
          marker.setMap(null);
        });
        markers2 = [];

        let bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }

          markers2.push(new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          }));

          let lat = place.geometry.location.lat();
          let lng = place.geometry.location.lng();

          firebase.database().ref("Starting/").set({
            latitude: lat,
            longitude: lng
          });
          
          if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
          } 
          else {
              bounds.extend(place.geometry.location);
          }
      });
      map.fitBounds(bounds);
    });
}