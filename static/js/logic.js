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
  
