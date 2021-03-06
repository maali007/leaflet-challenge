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

  // Step 6: Create a GeoJSON layer with the features array
  L.geoJSON(eQuakesInfo, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        // Marker styling using magnitude for size (properties.mag) and depth for color (coordinates[2])
        // Magnitude multiplied by 3 for resizing (make bigger).
        {
          radius: (feature.properties.mag)*3,
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          fillOpacity: 0.75,
          color: "#000000",
          stroke: true,
          weight: 0.5
        }
      );
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: "
      + new Date(feature.properties.time) + "</p><hr><p>Magnitude: "
      + feature.properties.mag + "</p><hr><p>Depth: " + feature.geometry.coordinates[2] +"</p>");
    }
  }).addTo(eQuakes);
  // Pass layer to the createMap function
  eQuakes.addTo(eqMap);

    // Add legend
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    
    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
  for (var i =0; i < depth.length; i++) {
    div.innerHTML += 
    '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
      }
    return div;
  };
  legend.addTo(eqMap);

});