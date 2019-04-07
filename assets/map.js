function initAutocomplete() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 49.282730, lng: -123.120735},
    zoom: 10,
    mapTypeId: "roadmap"
  });

  let Destination = document.getElementById("enteredDest");
  let searchBox = new google.maps.places.SearchBox(Destination);
    
  let location = document.getElementById("searchResult2");
  let locationBox = new google.maps.places.SearchBox(location);

  // Set bounds of map for both inputs
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
    locationBox.setBounds(map.getBounds());
  });
    
  // Initialize the following for Destination search box
  let markers = [];
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
      
      // Obtain latitude and longitude from Destination search
      let latitude = place.geometry.location.lat();
      let longitude = place.geometry.location.lng();

      // Write current Destination latitude and longitude to database
      firebase.database().ref("Destination/").set({
        lat: latitude,
        lng: longitude
      });
        
      if (place.geometry.viewport) {
      // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
    
    
  let markers2 = [];
  // Initialize the following for Starting position search box
  locationBox.addListener('places_changed', function() {
    let places = locationBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    
    // Clear any existing markers
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

      // Push a marker to markers2, to display on map
      markers2.push(new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      }));

      // Obtain latitude and longitude for Starting point
      let latitude = place.geometry.location.lat();
      let longitude = place.geometry.location.lng();

      // Write current Starting Pt latitude and longitude to database
      firebase.database().ref("Starting/").set({
        lat: latitude,
        lng: longitude
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