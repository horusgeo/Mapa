myMap = L.map('mapDiv',{
                minZoom: 9,
                maxZoom: 21})
                //.setView([-19.315, -43.636], 15);
                .setView([-13.046034, -51.881561], 10);
                
//myMap = L.map('mapDiv',{});



function removeLayers(){

    myMap.eachLayer(function(layer){
        myMap.removeLayer(layer);
    });

}

myMap.attributionControl.setPosition('bottomleft');
//L.control.scale().addTo(myMap);

/* *********************** LOCATE *********************** */

function onLocationFound(e) {
//    var radius = e.accuracy / 2;

    if(poseMarker) {
        myMap.removeLayer(poseMarker);
    }

    poseMarker = L.marker(e.latlng, {icon: iconPosePin}).addTo(myMap);
//           .bindPopup("You are within " + radius + " meters from this point").openPopup();

//    L.circle(e.latlng, radius).addTo(myMap);

    if(locateFlag==1){
        myMap.setView(poseMarker.getLatLng(), 18);
    }
}

function onLocationError(e) {
    alert(e.message);
}

myMap.on('locationfound', onLocationFound);
myMap.on('locationerror', onLocationError);

myMap.locate({watch: true, enableHighAccuracy: true});

function findLocation(){
    myMap.setView(poseMarker.getLatLng(), 18);
    locateFlag = 1;

    function stopLocate(){
        console.log("locateFlag");
        locateFlag=0;
        myMap.off('click', stopLocate);
        myMap.off('dragstart', stopLocate);
    }

    myMap.on('click', stopLocate);
    myMap.on('dragstart', stopLocate);

}


/* *********************** Load IMGS *********************** */

function loadImg(imgPath){


    var options = {
                minZoom: 9,
                maxZoom: 21,
                opacity: 1.0,
                tms: false
    };

    var path = imgPath + '/{z}/{x}/{y}.png';


    L.tileLayer(path, options).addTo(myMap);
    //L.tileLayer('{z}/{x}/{y}.png', options).addTo(myMap);

}

/* *********************** Load KML *********************** */

function loadKml(){
//    var runLayer1 = omnivore.kml('./kml/fd1.kml')
//        .on('ready', function() {
//            myMap.fitBounds(runLayer1.getBounds());
//        }).addTo(myMap);
//    var runLayer2 = omnivore.kml('./kml/fd2.kml')
//        .on('ready', function() {
//            myMap.fitBounds(runLayer.getBounds());
//        }).addTo(myMap);
//    var runLayer3 = omnivore.kml('./kml/fd3.kml')
//        .on('ready', function() {
//            myMap.fitBounds(runLayer.getBounds());
//        }).addTo(myMap);
//    var runLayer4 = omnivore.kml('./kml/fd4.kml')
//        .on('ready', function() {
//            myMap.fitBounds(runLayer.getBounds());
//        }).addTo(myMap);
//    var runLayer5 = omnivore.kml('./kml/fd5.kml')
//        .on('ready', function() {
//            myMap.fitBounds(runLayer5.getBounds());
//        }).addTo(myMap);

    var runLayer = omnivore.kml('./kml/fd_final.kml')
        .on('ready', function() {
            myMap.fitBounds(runLayer.getBounds());
        }).addTo(myMap);

//    var kmLayer = omnivore.kml('./kml/KM.kml')
//        .on('ready', function() {
//            myMap.fitBounds(runLayer.getBounds());
//    }).addTo(myMap);

//    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//        opacity: 0.2,
//    }).addTo(myMap);
}

/* *********************** Central Pin *********************** */

function startCentralPin(){
    centerMarker = L.marker(myMap.getCenter(), {icon: iconBlackPin})
                        .addTo(myMap)
                        .bindPopup(myMap.getCenter().toString())
                        .openPopup();

    myMap.on('move', function (e) {
		centerMarker.setLatLng(myMap.getCenter())
		            .bindPopup(myMap.getCenter().toString()).openPopup();
	});
}

function removeCentralPin(){
    myMap.removeLayer(centerMarker);
    myMap.off('move', null);
}

/* *********************** Click Points *********************** */


function clickPoints(){
    clickPointsArray.push(centerMarker.getLatLng());
    propertyPolygon.addLatLng(centerMarker.getLatLng()).addTo(myMap);
}

function clearPoints(){
    clickPointsArray = [];
    propertyPolygon.setLatLngs([]);
    removeCentralPin();
    myMap.removeLayer(propertyPolygon);
}

function createProperty(id, nome, tipo){

    var p = L.polygon(propertyPolygon.getLatLngs(),{});

    console.log(id);

    if(tipo=="Indefinido")
        p.color = "blue";
    if(tipo=="Aceito")
        p.color = "green";
    if(tipo=="CasoEspecial")
        p.color = "yellow";
    if(tipo=="Recusado")
        p.color = "red";

    console.log(id);
    p.bindPopup(nome);

    console.log(id);
    var aux = new Prop(p, id, tipo, nome);
    properties.push(aux);
    aux.getPoly().addTo(myMap);
    clearPoints();
    callBackProperty(aux.getPoly().getLatLngs());
}

/* *********************** Pin *********************** */

function startPin(){
    pinMarker = L.marker({}, {icon: iconYellowPin});
    startCentralPin();
}

function setPin(Text){

    pinMarker.setLatLng(centerMarker.getLatLng())
    myMap.removeLayer(pinMarker);
    pinMarker.addTo(myMap)
             .bindPopup(generatePinText(Text, centerMarker.getLatLng()))
             .openPopup();
}

function keepPin(){

    var aux = L.marker(pinMarker.getLatLng(), {icon: iconYellowPin})
                .addTo(myMap)
                .bindPopup(pinMarker.getPopup().getContent())
                .openPopup();

    pins.push(aux);
    cancelPin();
    callBackPin(aux);
}

function cancelPin(){
    removeCentralPin();
    myMap.removeLayer(pinMarker);
}

/* *********************** Regua *********************** */

function clickRegua(){
    startCentralPin();
    popup = L.popup({closeButton: false});

    clickReguaArray = [];
    reguaPolygon.setLatLngs([]);
}

function clickPinRegua(){

    if(clickReguaArray.length == 2){
        clickReguaArray.pop();
        clickReguaArray.push(centerMarker.getLatLng());
        var latlng = reguaPolygon.getLatLngs();
        latlng.pop();
        latlng.push(centerMarker.getLatLng());
        reguaPolygon.setLatLngs(latlng);
        popup
            .setLatLng(centerMarker.getLatLng())
            .openOn(myMap)
            .setContent(calcula_dist());
    }else{
        clickReguaArray.push(centerMarker.getLatLng());

        latlngBck = centerMarker.getLatLng();

        if(clickReguaArray.length==1){
            reguaPolygon.addLatLng(centerMarker.getLatLng()).addTo(myMap);
        }else if(clickReguaArray.length==2){
            popup
                .setLatLng(centerMarker.getLatLng())
                .openOn(myMap)
                .setContent(calcula_dist());
            reguaPolygon.addLatLng(centerMarker.getLatLng()).addTo(myMap);
        }
    }
}

function closeRegua(){
    clickReguaArray = [];
    reguaPolygon.setLatLngs([]);
    removeCentralPin();
    myMap.removeLayer(reguaPolygon);
    myMap.closePopup(popup);
}

/* *********************** CallBacks to Android *********************** */
function callBackProperty(prop){
    var lats = [];
    var lngs = [];
    for(i = 0; i < prop.length; i++){
        lats.push(prop[i].lat);
        lngs.push(prop[i].lng);
    }
    Android.callBackPropriedade(lats, lngs);
}

function callBackPin(pin){
    var l = pin.getLatLng();
    Android.callBackPins(l.lat, l.lng, pin.getPopup().getContent());
}

/* *********************** Populate Map *********************** */

function populatePin(texto, lat, lng){
    var aux = L.marker([lat,lng], {icon: iconYellowPin})
                    .addTo(myMap)
                    .bindPopup(texto)
                    .openPopup();

        pins.push(aux);
        aux.addTo(myMap);
}


function newProp(id, lat, lng, nome, tipo){

    var latlng = [];
    latlng.push(L.latLng(lat,lng));
    var p;

    if(tipo=="Indefinido")
        p = L.polygon(latlng, {color:"blue"});
    if(tipo=="Aceito")
        p = L.polygon(latlng, {color:"green"});
    if(tipo=="CasoEspecial")
        p = L.polygon(latlng, {color:"yellow"});
    if(tipo=="Recusado")
        p = L.polygon(latlng, {color:"red"});

    var aux = new Prop(p, id, tipo, nome);
    properties.push(aux);

}

function continueProp(lat, lng){

    var latlng = L.latLng(lat,lng);
    properties[properties.length-1].getPoly().addLatLng(latlng);

}

function addProp(){

    for (i=0;i<properties.length;i++){
        properties[i].getPoly().addTo(myMap);
    }

}

