$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + 'getemployee.php?id='+id, displayEmployee);
});

function displayEmployee(data) {
	var employee = data.item;
	console.log(employee);
	$('#fullName').text(employee.Gerakan);
	$('#bacaan_arab').text(employee.Bacaan_Arab);
	$('#ket').text(employee.Ket);
	var malang = new google.maps.LatLng(employee.lat, employee.lng);
	var petaoption = {
        zoom: 15,
		center: new google.maps.LatLng(employee.lat, employee.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    map = new google.maps.Map(document.getElementById("mapku"),petaoption);	
	var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
    var directionsService = new google.maps.DirectionsService();
    var map;
	ambilan();
	initialize();
	var marker = new google.maps.Marker({
            position: malang,
            map: map,
            title: employee.nama
    });
	marker.setAnimation(google.maps.Animation.DROP);
}

function initialize() {
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directionsPanel"));
        google.maps.event.addListener(directionsDisplay,'directions_changed', function() {
          computeTotalDistance(directionsDisplay.directions);
        });
        calcRoute();
}

function calcRoute() {
        var request = {
          origin: latlng,
          destination: malang,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
      }
 function computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000.
        document.getElementById('total').innerHTML = total + 'km';
}
function ambilan(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			initial(position.coords.latitude,position.coords.longitude);
		});
	}
}

function initial(lat,lng) {
			var latlng = new google.maps.LatLng(lat, lng);
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
