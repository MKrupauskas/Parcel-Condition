Authorization

loadJSON('https://www.emcom.eu/api/v1/device/3975/').header("Authorization", make_base_auth("Parcel-Condition","iot101").get(function(error,data){console.log(error);console.log(data);});




var clientId = "MyApp";
var clientSecret = "MySecret";

var authorizationBasic = (clientId + ':' + clientSecret);

var request = new XMLHttpRequest();
request.open('POST', oAuth.AuthorizationServer, true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
request.setRequestHeader('Accept', 'application/json');
request.send("username=John&password=Smith&grant_type=password");

request.onreadystatechange = function () {
    if (request.readyState === 4) {
       alert(request.responseText);
    }
};
