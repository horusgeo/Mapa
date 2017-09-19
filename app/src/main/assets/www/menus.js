var contextmenuMap = [
    {
        text: 'Adicionar Marco',
        callback: addMarker
    },
    {
        text: 'Adicionar Marco Coordenada',
        callback: addMarkerCoord
    },
    {
        text: 'Adicionar Propriedade',
        callback: addProperty
    },
    {
        text: 'Centralizar Mapa',
        callback: centerMap
    }
];

function addMarker(e){
    L.marker(e.latlng).addTo(map).bindPopup("Abrir dialogo para adicionar informações");
}

function addMarkerCoord(e){

}

function addProperty(e){
    alert('Função para desenhar o poligono da propriedade');
}

function centerMap(e){
    map.panTo(e.latlng);
}
