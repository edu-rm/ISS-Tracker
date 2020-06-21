import L from 'leaflet';

const ISSIcon = new L.Icon({
    iconUrl: require('../../assets/iss.svg'),
    iconRetinaUrl: require('../../assets/iss_icon.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50,50),
    // className: 'leaflet-div-icon'
});

export default ISSIcon;