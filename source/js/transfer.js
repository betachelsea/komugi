var ol = require('openlayers');
var Backbone = require('backbone');

var imageStyle = new ol.style.Circle({
    radius: 5,
      snapToPixel: false,
      fill: new ol.style.Fill({color: 'yellow'}),
      stroke: new ol.style.Stroke({color: 'red', width: 1})
});

var headInnerImageStyle = new ol.style.Style({
    image: new ol.style.Circle({
                 radius: 2,
          snapToPixel: false,
          fill: new ol.style.Fill({color: 'blue'})
        })
});

var headOuterImageStyle = new ol.style.Circle({
    radius: 5,
      snapToPixel: false,
      fill: new ol.style.Fill({color: 'black'})
});

var n = 30;
var omegaTheta = 30000; // Rotation period in ms
var R = 7e6;
var r = 2e6;
var p = 2e6;

var Transfer = Backbone.Model.extend({
  defaults: {
    start_latlng: [0, 0], //開始座標
    end_latlng: [0, 0], //終了座標
    //Export: 0, //輸出量
    //Import: 0, //輸入量
    distance: 0 //距離
  },
  initialize: function(attrs, options) {
    console.log("Calc");
    
  }
});
var TransferCollection = Backbone.Collection.extend({
  model: Transfer
});

var TransferManager = function() {
  this.transferCollection;
};
TransferManager.prototype = {
  initialize: function(json) {
    this.transferCollection = new TransferCollection();
    //console.log(this.transferCollection);
    var forSearchData = {};
    for (var n=0; n<json.length; n++) {
      forSearchData[json[n].country] = json[n];
    }
    console.log(forSearchData);
    for (var j=0; j<json.length; j++) {
      if (j > 10) continue;
      var item = json[j];
      var slat = item.lat;
      var slon = item.lon;
      var distance_list = item.distance_list;
      for (var i=0; i<distance_list.length; i++) {
        if (i > 5) continue;
        var hitCountryData = forSearchData[distance_list[i].country];
        if (!hitCountryData) continue;
        var elat = hitCountryData.lat;
        var elon = hitCountryData.lon;
        var transferModel = new Transfer({
          start_latlng: [slat, slon],
          end_latlng: [elat, elon],
          distance: distance_list[i].distance
        });
        this.transferCollection.push(transferModel);
      }
    }
    console.log(this.transferCollection);// 4000件くらいの国同士のつながりを保持
  },
  makeTransferRoutes: function() {
    
  },
  paint: function(map) {
    //var vectorContext = event.vectorContext;
    //var frameState = event.frameState;
    /*
    var theta = 2 * Math.PI * frameState.time / omegaTheta;
    var coordinates = [];
    var i;
    for (i = 0; i < n; ++i) {
    var t = theta + 2 * Math.PI * i / n;
    var x = (R + r) * Math.cos(t) + p * Math.cos((R + r) * t / r);
    var y = (R + r) * Math.sin(t) + p * Math.sin((R + r) * t / r);
    coordinates.push([x, y]);
    }*/
    //vectorContext.setImageStyle(imageStyle);
    
    var featureList = [];
    this.transferCollection.each(function(item){
      console.log(item);
      //var sp = new ol.geom.Point(item.get("start_latlng")[0], item.get("start_latlng")[1]);
      //var ep = new ol.geom.Point(item.get("end_latlng")[0], item.get("end_latlng")[1]);
      //var feature = new ol.Feature.Vector(new ol.Geometry.LineString([sp, ep]));
      var sp = ol.proj.transform(
        [item.get("start_latlng")[1], item.get("start_latlng")[0]],
        'EPSG:4326', 'EPSG:3857');
      var ep = ol.proj.transform(
        [item.get("end_latlng")[1], item.get("end_latlng")[0]],
        'EPSG:4326', 'EPSG:3857');
      var feature = new ol.Feature({
        geometry: new ol.geom.LineString([sp, ep]),
        name: 'Line'
      });
      featureList.push(feature);
      //console.log(item);
    });
    var layerLines = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: featureList
      })
    });
    //vector.addFeatures(featureList);
    map.addLayer(layerLines);
    /*
    vectorContext.drawMultiPointGeometry(
    new ol.geom.MultiPoint(coordinates), null);

    var headPoint = new ol.geom.Point(coordinates[coordinates.length - 1]);
    var headFeature = new ol.Feature(headPoint);
    vectorContext.drawFeature(headFeature, headInnerImageStyle);

    vectorContext.setImageStyle(headOuterImageStyle);
    vectorContext.drawMultiPointGeometry(headPoint, null);
    */
  }
};


module.exports = TransferManager;
