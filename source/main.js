var $ = require('jquery');
var ol = require('openlayers');
var Komugi = require('./js/komugi');

$(function() {
  var komugi = new Komugi();
  alert( "komugi level" + komugi.level );
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      })
    ],
    view: new ol.View({
      center: ol.proj.transform([37.41, 8.82],  'EPSG:4326', 'EPSG:3857'),
      zoom: 4
    })
  });
});
