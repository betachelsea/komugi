var ol = require('openlayers');
//var underscore = require('underscore');
var $ = require('jquery')(window);
var Backbone = require('backbone');
Backbone.$ = $;

var IconObj = Backbone.Model.extend({
  initialize: function(attrs, options) {
    console.log(attrs);
  },
  getLatLon: function() {
    return "HELLO!!!!";
  }
});

module.exports = IconObj;
