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
    country: "", //国名
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
  this.vectorSource = new ol.source.Vector();

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
      //if (j > 10) continue;
      var item = json[j];
      var slat = item.lat;
      var slon = item.lon;
      if (item.Rank >= 3) {
        continue;
      }
      var distance_list = item.distance_list;
      var distance_count_list = Array();
      for (var i=0; i<distance_list.length; i++) {
          if (distance_count_list.length <= 3) {
            distance_count_list.push(distance_list[i]);
          } else if (distance_count_list[2].distance > distance_list[i].distance) {
            distance_count_list.push(distance_list[i]);
          }
          distance_count_list.sort(function(value1, value2) {
              if (value1.distance == value2.distance) {
                return 0;
              } else if (value1.distance < value2.distance) {
                return -1;
              }
              return 1;
          });
          if (distance_count_list.length > 3) {
            distance_count_list.pop();
          }
      }

      for (var i=0; i<distance_count_list.length; i++) {
        //if (i > 5) continue;
        var hitCountryData = forSearchData[distance_count_list[i].country];
        if (!hitCountryData) continue;
        var elat = hitCountryData.lat;
        var elon = hitCountryData.lon;
        var transferModel = new Transfer({
          start_latlng: [slat, slon],
          end_latlng: [elat, elon],
          distance: distance_count_list[i].distance,
          country: item.country
        });
        this.transferCollection.push(transferModel);

        /*
        var transferModel2 = new Transfer({
          start_latlng: [slat, slon],
          end_latlng: [elat, elon],
          distance: distance_count_list[i].distance,
          country: distance_count_list[i].country
        });
        this.transferCollection.push(transferModel2);
        */
      }
    }
    console.log(this.transferCollection);// 4000件くらいの国同士のつながりを保持
  },
  makeTransferRoutes: function() {

  },
  paintOneCountry: function(map, countryName) {
    this.vectorSource.clear();
    var showlist = this.transferCollection.where({ country: countryName })
    console.log(showlist);
    var featureList = [];
    for (var i=0; i<showlist.length; i++) {
      featureList.push(this.getFeatureFromModel(showlist[i]));
      featureList.push(this.getCircleFromModel(showlist[i]));
    }
    this.vectorSource = new ol.source.Vector({
      features: featureList
    });
    var layerLines = new ol.layer.Vector({
      source: this.vectorSource
    });
    map.addLayer(layerLines);
  },
  paint: function(map) {
    this.vectorSource.clear();
    var featureList = [];
    //線が多すぎるとアイコンが見えない
    for (var i=0; i<this.transferCollection.models.length; i++) {
      var item = this.transferCollection.models[i];
      var feature = this.getFeatureFromModel(item);
      featureList.push(feature);
    }
    this.vectorSource = new ol.source.Vector({
      features: featureList
    });
    var layerLines = new ol.layer.Vector({
      source: this.vectorSource
    });
    map.addLayer(layerLines);
  },
  getFeatureFromModel: function(model) {
    var sp = ol.proj.transform(
      [model.get("start_latlng")[1], model.get("start_latlng")[0]],
      'EPSG:4326', 'EPSG:3857');
    var ep = ol.proj.transform(
      [model.get("end_latlng")[1], model.get("end_latlng")[0]],
      'EPSG:4326', 'EPSG:3857');
    return new ol.Feature({
      geometry: new ol.geom.LineString([sp, ep]),
      name: 'Line'
    });
  },
  getCircleFromModel: function(model) {
    var ep = ol.proj.transform(
      [model.get("end_latlng")[1], model.get("end_latlng")[0]],
      'EPSG:4326', 'EPSG:3857');
    console.log(ep);
    return new ol.Feature({
      geometry: new ol.geom.Circle(ep, 300000),
      name: 'Circle'
    });
  }
};


module.exports = TransferManager;
