var ol = require('openlayers');
var IconObj = require('./iconObj');
var _ = require('underscore');

var HumanIcon = IconObj.extend({
  defaults: function () {
    console.log("call HumanIcon");
    return _.defaults({
      imgSrc: "images/hato.png",
      iconStyle: null,
      layer: null,
      lon: 0,
      lat: 0,
      feature: null
    }, _.result(IconObj.prototype, 'defaults'));
  },
  getIconStyle: function() {
    console.log("new hato");
    return new ol.style.Style({
      image: new ol.style.Icon(({
        anchor:[0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        scale: 0.2,
        src: 'images/hato.png'
      }))
    });
  
  },
  initialize: function(attrs, options) {
    console.log("initialize HumanIcon");
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
    console.log(this.get("lon"));
    var p = ol.proj.transform([this.get("lon"), this.get("lat")], 'EPSG:4326', 'EPSG:3857');
    this.set({feature:
      new ol.Feature({
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
    //var p = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
    var p = ol.proj.transform([lon + 10, lat + 10], 'EPSG:4326', 'EPSG:3857');
    this.set({ lon: lon+0.001, lat: lat+0.001 });
    console.log(p);//緯度経度変換後
    console.log(lon + "," + lat);
    console.log("update!," + p);
    var vc = e.vectorContext;
    console.log(this.getIconStyle());
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

    vc.drawFeature(new ol.Feature(new ol.geom.Point(p)), iconStyle);
  }
});

module.exports = HumanIcon; //Backbone Model
