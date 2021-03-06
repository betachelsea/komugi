var $ = jQuery = require('jquery');
var Bootstrap = require('bootstrap');
var ol = require('openlayers');
var Human = require('./js/human');
var TransferManager = require('./js/transfer');
var _ = require('underscore');

var CountryJSON = "";//jsonデータ保持
var KomugiJSON = "";//jsonデータ保持
var AllJSON = ""; //結合

var _category = "mugi";

var DATA = {
  "mugi": {
    "country_distance_path": "./Wheat_country_distance.json",
    "data_all_path": "./Wheat_data_all.json"
  },
  "kome": {
    "country_distance_path": "./Rice_country_location_distance.json",
    "data_all_path": "./Rice_data_all.json"
  },
  "tomo": {
    "country_distance_path": "./Maize_country_location_distance.json",
    "data_all_path": "./Maize_data_all.json"
  }
}

var draw = function() {

  var transferManager = new TransferManager();
  transferManager.initialize(AllJSON);
  var human = new Human();
  human.init(AllJSON, { subIconCategory: _category}); // "mugi" or "kome" or "tomo"
  var layerList = [
    new ol.layer.Tile({
      // source: new ol.source.BingMaps({
      //   imagerySet: 'Aerial',
      //   key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3'
      // })
      // source: new ol.source.TileJSON({url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.json'})
      // source: new ol.source.OSM()
      source: new ol.source.MapQuest({layer: 'osm'})
      // source: new ol.source.MapQuest({layer: 'sat'})
    })
  ];
  layerList = layerList.concat(human.getLayers());//配列結合
  $("#map").empty();// TODO: やっつけ実装なのでol.Mapをclearするような方法があったらそちらにする
  var map = new ol.Map({
    target: 'map',
    layers: layerList,
    view: new ol.View({
      center: ol.proj.transform([0.00, 0.00],  'EPSG:4326', 'EPSG:3857'),
      maxZoom: 5,
      minZoom: 2,
      zoom: 3
    }),
    logo: false,

  });
  transferManager.paint(map);

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
      // clickで表示
      console.log(feature);
      transferManager.paintOneCountry(map, feature.get("countryName"));
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

  $(function(){
  	$('a[href^=#]').click(function(){
  		var speed = 500;
  		var href= $(this).attr("href");
  		var target = $(href == "#" || href == "" ? 'html' : href);
  		var position = target.offset().top;
  		$("html, body").animate({scrollTop:position}, speed, "swing");
  		return false;
  	});
  });

  jQuery( function() {
    jQuery( '#jquery-ui-slider' ) . slider();
  });

};

var getKomugiDatas = function() {
  console.log(DATA[_category]["data_all_path"]);
  $.ajax({
    type: "GET",
    url: DATA[_category]["data_all_path"],
    dataType: "json",
    success: function(data) {
      KomugiJSON = data;
      getCountry();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
    }
  });
};
// data優先読み込み
var getCountry = function() {
  $.ajax({
    type: "GET",
    url: DATA[_category]["country_distance_path"],
    dataType: "json",
    success: function(data) {
      CountryJSON = data;
      var yearDataObj = KomugiJSON["2011"];
      var list = [];
      for (var i=0; i<CountryJSON.length; i++) {
        var item = CountryJSON[i];
        if (!item) continue;
        var detail = yearDataObj[item["country"]]
        if (!detail) continue;
        list.push(_.extend(item, detail));
      }
      AllJSON = list;
      draw();
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
    }
  });
};

$(function() {
  _category = "mugi"

  var startMapShow = function() {
    $("#categoryNav").children().removeClass("selected");
    $("#categoryNav > img[data-category='"+ _category +"']").addClass("selected");
    getKomugiDatas();
  };

  // Events
  $(".categoryNav_category").click(function(e) {
    var target = $(e.target);
    _category = target.attr("data-category");
    startMapShow();
  });

  startMapShow();

});
