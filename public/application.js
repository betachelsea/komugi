(function(){
'use strict';
$(function() {
  console.log("hello");
});})();
(function(){
'use strict';
$(function() {
  alert("hogeoooo");
  var map = new ol.Map({
    target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.MapQuest({layer: 'sat'})
        })
      ],
      view: new ol.VIew({
        center: ol.proj.transform([37.41, 8.82],  'EPSG:4326', 'EPSG:3857'),
        zoom: 4
      })
  });
});
})();