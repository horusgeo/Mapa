Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function calcula_dist(){

    lat1 = clickReguaArray[0].lat;
    lat2 = clickReguaArray[1].lat;

    lng1 = clickReguaArray[0].lng;
    lng2 = clickReguaArray[1].lng;

    dist = 6371*Math.acos(Math.cos(Math.radians(90-lat2))*Math.cos(Math.radians(90-lat1)) + Math.sin(Math.radians(90-lat2))*Math.sin(Math.radians(90-lat1))*Math.cos(Math.radians(lng1-lng2)));

    var num = 1000*dist;
    var resp;
    if(num >= 1000){
        num = num/1000;
        resp = num.toFixed(2) + " kilometros";
    }else{
        resp = num.toFixed(2) + " metros";
    }

    return resp;
}

function generatePinText(text, latlng){

    var nota = '<h2>' + text + '</h2>';
    var lat = '<br>Latitude: ' + latlng.lat.toFixed(2) + '</br>';
    var lng = '<br>Longitude: ' + latlng.lng.toFixed(2) + '</br>';

    return nota + lat + lng;

}