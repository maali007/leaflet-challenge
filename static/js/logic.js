// Step 1: Create the tile layer that will be the background of our map
var mbLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

// Step 2: Create earthquake layerGroup
var eQuakes = L.layerGroup();

// Step 3: Create a grayscale map and centered and zoomed in to US
var eqMap = L.map("mapid", {
    center: [
      39.50, -98.35
    ],
    zoom: 4,
    layers: [mbLayer, eQuakes]
  });
  
// Step 4: Specify earthquakes data url variable (I chose 2.5+ magnitude/week)
var eQuakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// Step 5: Grab the data with d3
d3.json(eQuakesURL, function(eQuakesInfo) {
  // Use depth for marker colors
  function chooseColor(depth) {
    switch(true) {
      case depth > 90:
        return "#ff5f65";
      case depth > 70:
        return "#fca35d";
      case depth > 50:
        return "#fdb73a";
      case depth > 30:
        return "#f6db40";
      case depth > 10:
        return "#dcf443";
      default:
        return "#a3f63e";
    }
  }

});