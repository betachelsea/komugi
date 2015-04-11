var ol = require('openlayers');
var IconObj = require('./iconObj');
var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');

var HumanIcon = IconObj.extend({
  defaults: function () {
    return _.defaults({
      imgSrc: "images/hato.png",
      iconStyle: null,
      layer: null,
      lon: 30,
      lat: 30,
      feature: null
    }, _.result(IconObj.prototype, 'defaults'));
  },
  getIconStyle: function() {
    return new ol.style.Style({
      image: new ol.style.Icon(({
        anchor:[0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        scale: 0.2,
        src: 'images/hato.png',
        country: "国名"
      }))
    });
  
  },
  initialize: function(attrs, options) {
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
    //this.set({iconStyle: iconStyle});
    var p = ol.proj.transform([this.get("lon"), this.get("lat")], 'EPSG:4326', 'EPSG:3857');
    this.set({feature:
      new ol.Feature({
        countryName: this.get("country"),
        geometry: new ol.geom.Point(p)
      })
    });
    this.get("feature").setStyle(this.getIconStyle());
    var vectorSource = new ol.source.Vector({
      features:[this.get("feature")]
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
        src: 'images/hato.png'
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
  init: function(country_json) {
    this.humanCollection = new HumanCollection(country_json);
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
