var $ = require('jquery');
var ol = require('openlayers');
var Human = require('./js/human');
// var Komugi = require('./js/komugi');

$(function() {
  // var komugi = new Komugi();
  var human = new Human();

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        // source: new ol.source.BingMaps({
        //   imagerySet: 'Aerial',
        //   key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3'
        // })
        // source: new ol.source.TileJSON({url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.json'})
        // source: new ol.source.OSM()
        // source: new ol.source.MapQuest({layer: 'osm'})
        source: new ol.source.MapQuest({layer: 'sat'})
      }),
      human.get("layer")
    ],
    view: new ol.View({
      center: ol.proj.transform([0.00, 0.00],  'EPSG:4326', 'EPSG:3857'),
      zoom: 3,
      maxZoom: 3,
      minZoom: 3
    }),
    logo: false,

  });

  // Animation
  map.on('postcompose', function(event) {
    human.update(event);
    map.render();
  });

  map.render();

});
