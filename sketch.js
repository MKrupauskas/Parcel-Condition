// function reqListener () {
//   console.log(this.responseText);
// }
//
// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.open("GET", "https://www.emcom.eu/api/v1/device/3975/");
//
// oReq.setRequestHeader(header, value);
// oReq.setRequestHeader(header, value);
// oReq.send();
//
//

// var oReq = new XMLHttpRequest();
//
// oReq.setRequestHeader(header, value);
// 
// var clientId = "Parcel-Condition";
// var clientSecret = "iot101";
//
// var authorizationBasic = (clientId + ':' + clientSecret);
//
// var request = new XMLHttpRequest();
// request.open('POST', oAuth.AuthorizationServer, true);
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
// request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
// request.setRequestHeader('Accept', 'application/json');
// request.send("username=John&password=Smith&grant_type=password");
//
// request.onreadystatechange = function () {
//     if (request.readyState === 4) {
//        alert(request.responseText);
//     }
// };

function setup() {
  // loadJSON('https://www.emcom.eu/api/v1/device/3975/').header("Authorization", make_base_auth("Parcel-Condition","iot101").get(function(error,data){console.log(error);console.log(data);}));

}

function draw() {

}
