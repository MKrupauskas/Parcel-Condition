let mapProp;
let map;
let marker;
let coordLat = 0;
let coordLng = 0;
let data;

function getData() {
	$.ajax({
		url: 'data.json',
		async: false,
		success: function(tempData) {
			data = tempData;
			coordLat = data.live['2'];
			coordLng = data.live['3'];
		},
		dataType: 'json'
	});
}

function initMap() {
	getData();
	mapProp = {
		center: new google.maps.LatLng(coordLat, coordLng),
		zoom: 16,
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
	};
	map = new google.maps.Map(document.getElementById('map'), mapProp);
	marker = new google.maps.Marker({
		position: mapProp.center,
		icon: 'images/test.png'
	});
	marker.setMap(map);
	setInterval(changeData, 2000);
	map.panTo(new google.maps.LatLng(coordLat, coordLng));
}

function changeData() {
	getData();
	let latlng = new google.maps.LatLng(coordLat, coordLng);
	marker.setPosition(latlng);
}
