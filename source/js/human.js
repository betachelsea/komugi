var ol = require('openlayers');

var Human = function() {
  this.level = 1;
  this.lat = 36.55;
  this.lon = 136.65;
};

Human.prototype = {
  getVectorLayer: function() {
    // 画像指定
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor:[0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        scale: 0.2,
        src: 'images/hato.png'
      }))
    });
    var p = ol.proj.transform([this.lon, this.lat], 'EPSG:4326', 'EPSG:3857');
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(p),
    });
    iconFeature.setStyle(iconStyle);
    var vectorSource = new ol.source.Vector({
      features:[iconFeature]
    });
    return new ol.layer.Vector({
      source: vectorSource
    });
  }
};

module.exports = Human;
