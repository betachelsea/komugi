var ol = require('openlayers');
var IconObj = require('./iconObj');
var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
var TransferManager = require('./transfer');

var HumanIcon = IconObj.extend({
  defaults: function () {
    return _.defaults({
      subIconCategory: "mugi",
      imgSrc: "images/hato.png",
      iconStyle: null,
      layer: null,
      lon: 30,
      lat: 30,
      Export: 0, //輸出
      Import: 0, //輸入
      Population: 0, // 人口
      Production: 0, // 収穫量
      Rank: 1, // 太ってる度合い 1~5
      ProdPerPerson: 0, // 一人当たりの収穫量
      features: []
    }, _.result(IconObj.prototype, 'defaults'));
  },
  //メインアイコン画像
  getMainIconStyle: function() {
    var imgList = [
      'images/komumax1.png',
      'images/komumax2.png',
      'images/komumax3.png',
      'images/komumax4.png',
      'images/komumax5.png'
    ];
    var showImg = imgList[this.get("Rank") - 1];
    return new ol.style.Style({
      image: new ol.style.Icon(({
        anchor:[0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        scale: 0.2,
        src: showImg,
        country: "国名"
      }))
    });
  },
  //サブアイコン画像
  getSubIconStyle: function() {
    var iconSrc = "images/" + this.get("subIconCategory");
    if (100000000 < this.get("Production")) {
      iconSrc += "_03.png";
    } else if (10000000 < this.get("Production")) {
      iconSrc += "_02.png";
    } else {
      iconSrc += "_01.png";
    }
    return new ol.style.Style({
      image: new ol.style.Icon(({
        rotation: 360 * (-0.05) * Math.PI / 180,
        anchor:[1, 140],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        scale: 0.2,
        src: iconSrc,
        country: "国名"
      }))
    });
  },
  initialize: function(attrs, options) {
    var mainPoint = ol.proj.transform([this.get("lon"), this.get("lat")], 'EPSG:4326', 'EPSG:3857');
    var mainFeature = new ol.Feature({
        countryName: this.get("country"),
        geometry: new ol.geom.Point(mainPoint)
      });
    mainFeature.setStyle(this.getMainIconStyle());
    // サブアイコン画像（あれば）セット
    if (options.subIconCategory) {
      this.set({subIconCategory: options.subIconCategory});
    }
    //var subPoint = ol.proj.transform([this.get("lon") +3, this.get("lat") -2], 'EPSG:4326', 'EPSG:3857');
    var subPoint = ol.proj.transform([this.get("lon"), this.get("lat")], 'EPSG:4326', 'EPSG:3857');
    var subFeature = new ol.Feature({
      countryName: this.get("country"),
      geometry: new ol.geom.Point(subPoint)
    });
    subFeature.setStyle(this.getSubIconStyle());
    this.set({ features: [subFeature, mainFeature] });
    //this.set({feature:
    //});
    //this.get("feature").setStyle(this.getMainIconStyle());
    var vectorSource = new ol.source.Vector({
      features: this.get("features")
    });
    this.set({layer:
      new ol.layer.Vector({
        source: vectorSource
      })
    });
  },
  update: function(e) {
    var lon = this.get("lon");
    var lat = this.get("lat");
    var p = ol.proj.transform([lon + 1, lat + 1], 'EPSG:4326', 'EPSG:3857');
    this.set({ lon: lon+1, lat: lat+1 });
    var vc = e.vectorContext;
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor:[0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        scale: 0.2,
        src: 'images/mugi_01.png'
      }))
    });

    // Animation?
    //vc.drawFeature(new ol.Feature(new ol.geom.Point(p)), iconStyle);
  }
});

var HumanCollection = Backbone.Collection.extend({
  model: HumanIcon
});


var HumanManager = function() {
  this.humanCollection;
};
HumanManager.prototype = {
  init: function(country_json, options) {
    // options = { subIconCategory: "mugi" }
    this.humanCollection = new HumanCollection(country_json, options);
  },
  getLayers: function() {
    var layers = [];
    this.humanCollection.each(function(item) {
      layers.push(item.get("layer"));
    });
    return layers;
  },
  update: function(e) {
    //console.log("TODO:update");
  }
};

//module.exports = HumanIcon; //Backbone Model
module.exports = HumanManager;
