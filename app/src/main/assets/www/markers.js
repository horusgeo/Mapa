var LeafIcon = L.Icon.extend({
    options: {
//        iconSize:     [38, 95],
//        shadowSize:   [50, 64],
        iconAnchor:   [16, 31],
//        shadowAnchor: [4, 62],
        popupAnchor:  [0, -35]
    }
});

var iconRedPin = new LeafIcon({iconUrl: './markers/marker_red.png'});
var iconGreenPin = new LeafIcon({iconUrl: './markers/marker_green.png'});
var iconBluePin = new LeafIcon({iconUrl: './markers/marker_blue.png'});
var iconBlackPin = new LeafIcon({iconUrl: './markers/marker_black.png'});
var iconYellowPin = new LeafIcon({iconUrl: './markers/marker_yellow.png'});

var iconPosePin = new LeafIcon({iconUrl: './markers/navigation-arrow-color.png'});




