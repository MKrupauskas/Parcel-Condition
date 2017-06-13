let data;
$.ajax({
  url: "data.json",
  async: false,
  success: function(tempData) {
    data = tempData;
  },
  dataType: "json",
  complete: function() {
    // call a function on complete
  }
});

let mapProp;
let map;
let marker;
let coordLat = data.live["2"];
let coordLng = data.live["3"];

function myMap() {
  mapProp = {
    center: new google.maps.LatLng(coordLat, coordLng),
    zoom: 16,
    panControl: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    rotateControl: false,
    styles: [
      { featureType: "all", elementType: "all", stylers: [{ hue: "#008eff" }] },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [{ saturation: "0" }, { lightness: "0" }]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          { visibility: "simplified" },
          { saturation: "-60" },
          { lightness: "-20" }
        ]
      }
    ]
  };
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  marker = new google.maps.Marker({
    position: mapProp.center,
    icon: "images/test.png"
  });

  marker.setMap(map);
}

// 10 seconds
setInterval(tick, 10000);

function tick() {
  var map;
  var data;
  $.ajax({
    url: "data.json",
    async: false,
    success: function(tempData) {
      data = tempData;
    },
    dataType: "json",
    complete: function() {
      // call a function on complete
    }
  });
  coordLat = data.live["2"];
  coordLng = data.live["3"];
  var latlng = new google.maps.LatLng(coordLat, coordLng);
  marker.setPosition(latlng);
}
