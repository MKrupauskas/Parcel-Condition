'use strict';

let map,
    data;
let legend = document.getElementById('legend');
const title = document.getElementById('title');
let coordLat,
    coordLng,
    temperature,
    humidity,
    battery;
let infoWindowContent,
    legendInfoContent;

function getData() {
    $.ajax({
        url: '../data.json',
        async: false,
        success: function(tempData) {
            data = tempData;
            coordLat = data['live']['2'];
            coordLng = data['live']['3'];
            temperature = data.live['200'];
            humidity = Math.round(data.live['220']);
            battery = data.live['10'];
        },
        dataType: 'json'
    });
}

function initMap() {
    getData();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true,
        center: new google.maps.LatLng(coordLat, coordLng),
        styles: [
            { featureType: 'all', elementType: 'all', stylers: [{ hue: '#008eff' }] },
            {
                featureType: 'poi',
                elementType: 'all',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'road',
                elementType: 'all',
                stylers: [{ saturation: '0' }, { lightness: '0' }]
            },
            {
                featureType: 'transit',
                elementType: 'all',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'water',
                elementType: 'all',
                stylers: [
                    { visibility: 'simplified' },
                    { saturation: '-60' },
                    { lightness: '-20' }
                ]
            }
        ]
    });

    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(coordLat, coordLng),
        icon: '../images/test.png',
        map: map
    });

    let infoWindow = new google.maps.InfoWindow();
    marker.addListener('click', function(event) {
        infoWindow.setContent(infoWindowContent);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
    });

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(title);
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(legend);

    changeData();
    setInterval(changeData, 2000);

    function changeMap() {
        getData();
        let latlng = new google.maps.LatLng(coordLat, coordLng);
        marker.setPosition(latlng);
    }

    setInterval(changeMap, 2000);
}

function changeData() {
    getData();

    infoWindowContent =
        "<div id='infoBox'><p>latitude: " +
        coordLat +
        '<br/>longitude: ' +
        coordLng +
        '</p></div>';
    legendInfoContent = [
        '<p id="info">Information</p>',
        '<p><b>Temperature: </b>' +
        temperature +
        '°C</br><span>(Optimal)</span></p>',
        '<p><b>Humidity: </b>' + humidity + '%</br><span>(Optimal)</span></p>',
        '<p ><b>Battery: </b>' + battery + '%</br><span>(Optimal)</span></p>',
        '<p><b>Condition: </b><span>Good</span></p>'
    ];

    drawLegend();
}

function drawLegend() {
    legend.innerHTML = '';
    for (let i = 0; i < legendInfoContent.length; i++) {
        let holder = document.createElement('div');
        holder.innerHTML = legendInfoContent[i];
        legend.appendChild(holder);
    }
}