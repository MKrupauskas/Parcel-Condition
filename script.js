let mapProp;
let map;
let marker;
let coordLat = 0;
let coordLng = 0;
let data;

getData();
setInterval(changeData, 2000);


function changeData () {
  getData();
  coordLat = data.live["2"];
  coordLng = data.live["3"];
  let latlng = new google.maps.LatLng(coordLat, coordLng);
  marker.setPosition(latlng);
}

function getData () {
  $.ajax({
    url: "data.json",
    async: false,
    success: function(tempData) {
      data = tempData;
    },
    dataType: "json",
  });
}

function initMap() {
  mapProp = {
    center: new google.maps.LatLng(coordLat, coordLng),
    zoom: 16,
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
  map = new google.maps.Map(document.getElementById("map"), mapProp);
  marker = new google.maps.Marker({
    position: mapProp.center,
    icon: "images/test.png"
  });
  marker.setMap(map);
}
