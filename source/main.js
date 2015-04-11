var $ = jQuery = require('jquery');
var Bootstrap = require('bootstrap');
var ol = require('openlayers');
var Human = require('./js/human');

var CountryJSON = "";//jsonデータ保持

var main = function() {
  var human = new Human();
  human.init(CountryJSON);
  var layerList = [
    new ol.layer.Tile({
      // source: new ol.source.BingMaps({
      //   imagerySet: 'Aerial',
      //   key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3'
      // })
      // source: new ol.source.TileJSON({url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.json'})
      // source: new ol.source.OSM()
      // source: new ol.source.MapQuest({layer: 'osm'})
      source: new ol.source.MapQuest({layer: 'sat'})
    })
  ];
  layerList = layerList.concat(human.getLayers());//配列結合
  var map = new ol.Map({
    target: 'map',
    layers: layerList,
    view: new ol.View({
      center: ol.proj.transform([0.00, 0.00],  'EPSG:4326', 'EPSG:3857'),
      maxZoom: 5,
      minZoom: 1,
      zoom: 1
    }),
    logo: false,

  });

  // Click
  var el = document.getElementById('popup');
  var popup = new ol.Overlay({
    element: el,
    positioning: 'top-center',
    stopEvent: false
  });
  map.addOverlay(popup);
  map.on('click', function(event) {
    var feature = map.forEachFeatureAtPixel(event.pixel,
      function(feature, layer) {
        return feature;
      });
    if (feature) {
      var geometry = feature.getGeometry();
      var coord = geometry.getCoordinates();
      popup.setPosition(coord);
      // TODO: popoverに表示されている文字が更新されない問題
      var showstr = feature.get('countryName');
      $(".popover-content").text(showstr);
      $(el).popover({
        'placement': 'top',
        'html': true,
        'content': function() {
          return showstr;
        }
      });
      $(el).popover('show');
    } else {
      $(el).popover('destroy');
    }
  });

  // OverMouse
  map.on('pointermove', function(e) {
    if (e.dragging) {
      $(el).popover('destroy');
      return;
    }
  });

  // Animation
  map.on('postcompose', function(event) {
    human.update(event);
    map.render();
  });

  //map.render();
};

$(function() {
  // data優先読み込み
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/country.json",
    dataType: "json",
    success: function(data) {
      CountryJSON = data;
      main();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
    }
  });
  //main();
});
