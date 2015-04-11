if(typeof Application==="undefined"||!Application){var Application = {};}

// map
var map = null;

//
var cityMasterArray = null;
var cityMarketArray = null;
var cityObservationArray = null;

// アプリケーションのビジネスロジック
Application.faamo = function(){this.init();};

// faamoメイン
Application.faamo.prototype = {
	// 初期化処理
	init : function(){
		this._loadStart();
		var isSuccess = this._loadData();
		if(!isSuccess){
			this._loadError();
		} else {
			this._loadEnd();
		}
	},
	// ロード時のローディング画面
	_loadStart : function(){
		console.log('now loading');
		$('#main_contents').hide();
	},
	_loadEnd : function(){
		$("#loading").delay(600).fadeOut(700);
		$('#main_contents').show();
		console.log('load success');
	},
	_loadError : function(){
		alert('load error');
	},
	
	// データロード
	_loadData : function(){
		var application = new Application.faamo.LinkData();
		// 
//		if(this.isEmpty(cityMaster)){
		cityMasterArray = application.getDataResult('city_master');
//		}
		//
//		if(this.isEmpty(cityMarket)){
		cityMarketArray = application.getDataResult('city_market');
//		}
		//
//		if(this.isEmpty(cityObservation)){
		cityObservationArray = application.getDataResult('city_observation');
//		}
		return true;
	},

};

// LinkData関連
Application.faamo.LinkData = function(){};
Application.faamo.LinkData.prototype = {
	/** 
	 * 指定ファイル内のデータを取得
	 * @param dataname 取得するデータソースのファイル名
	 * @result データソースファイル内の全データの配列
	 */
	getDataResult : function(dataname){
		var resultArray = null;
		$.each(LinkData.getWorks(), function(wKey, workId){
			$.each(LinkData.getFiles(workId), function(fKey, filename){
				if(filename == dataname){
					$.each(LinkData.getSubjects(workId, filename), function(sKey, subject){
						if(resultArray == null) resultArray = new Array();
						var objArray = [];
						$.each(LinkData.getProperties(workId, filename), function(pKey, property){
							var obj = LinkData.getObjects(workId, filename, subject, property);
							var prop = property.split('#')[1];
							var data = obj[0];
							if(data == '' || data == 'undefined') data = '-';
							objArray[prop] = data;
						});
						resultArray.push(objArray);
					});
				}
			});
		});
		return resultArray;
	}
};

Application.faamo.Draw = function(){this._init();};

Application.faamo.Draw.prototype = {

	_init : function(){
	},

	drawMap : function(){
		var latlng = new google.maps.LatLng(39, 138);
		var opts = {
			zoom: 2,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			center: latlng
		};
		map = new google.maps.Map(document.getElementById("map"), opts);
		
		for(var i = 0; i < cityMasterArray.length; i++){
			var cityData = cityMasterArray[i];
			
			var markerOpt = new google.maps.Marker({
					position: new google.maps.LatLng(cityData.lat, cityData.long),
					map: map,
					icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png'
			});
			
			this._plotMarker(markerOpt, cityData);
		}
	},
	
	_plotMarker : function(markerOpt, cityData){
		var marker = new google.maps.Marker(markerOpt);
		var instance = this;
		google.maps.event.addListener(marker, 'click', function(event){
			// popup表示
			instance._showInfoWindow(markerOpt, cityData);
			
			// グラフの表示
			instance._drowChart(cityData);
			
			// クリックしたマーカーのクラスを作る
			var heatmapData = new Array();
			var cityCluster = cityData.cluster;
			cityMasterArray.forEach(function(cityMaster, idx){
//				console.log(cityMaster.cluster + ' == ' + cityCluster);
				if(cityMaster.cluster == cityCluster){
//					console.log('    ->  match!!!!!');
					// heatmap表示
					heatmapData.push(new google.maps.LatLng(cityMaster.lat, cityMaster.long));
				}
			});
			var heatmap = new google.maps.visualization.HeatmapLayer({
				data: heatmapData,
				radius:25
			});
			heatmap.setMap(map);
		});
		
		marker.setMap(map);
	},
	
	_openInfoWindow : null,
	
	_showInfoWindow : function(marker, cityData){
		console.log('openwindow: ' + this._openInfoWindow);
		if (this._openInfoWindow) {
			this._openInfoWindow.close();
		}
		this._openInfoWindow = new google.maps.InfoWindow({
			content: this._buildHtmlMarketData(cityData)
		});
		google.maps.event.addListener(this._openInfoWindow,'closeclick',function(){
			this._openInfoWindow = null;
		});
		this._openInfoWindow.open(marker.getMap(), marker);
	},
	
	_buildHtmlMarketData : function(cityData){
		var html = '';
		var marketData = null;
		cityMarketArray.forEach(function(cityMarket, idx){
			if(cityData.label == cityMarket.label){
				marketData = cityMarket;
				return;
			}
		});
		
		if(marketData == null) return null;
		
		html = cityData.city_name + ' (' + cityData.country_name + ')<br />' + 
			'人口増加予測: ' + marketData.population_2013 + ' (2013年)　→　' + marketData.population_2030 + ' (2030年予測)<br />' +
//	       '物価: ' +
			'米: $ ' + marketData.price_rice + ' (/1Kg)<br />' +
			'オレンジ: $ ' + marketData.price_orange + ' (/1Kg)<br />' +
			'レタス: $ ' + marketData.price_lettuce + ' (/1玉)<br />' +
			'主要品目: ' + marketData.crop_rank1 + ', ' + marketData.crop_rank2 + ', ' + marketData.crop_rank3 + ', ' + marketData.crop_rank4 + ', ' + marketData.crop_rank5 + ',';
		
		return html;
	},
	
	_drowChart : function(cityData){
		var parentNode = document.getElementById('charts');
		
		$('#charts').empty();
		
		var dataType = new Array();
		dataType[0] = {type: 'ndvi', str: 'Normalized Difference Vegetation Index: 植生分布密度指標'};
		dataType[1] = {type: 'olst', str: 'Land Surface Temperature: 地表面温度 (K)'};
		dataType[2] = {type: 'par', str: 'Photosynthetically Available Radiation: 光合成有機放射量 (Einstein/m2/day)'};
		dataType[3] = {type: 'smc', str: 'Soil Water Content: 土壌水分量 (%)'};

		for(var i = 0; i < dataType.length; i++){
			var dataArray = this._createDataArray(cityData.label, dataType[i].type);
			var sourceData = [['月', dataType[i].str]].concat(dataArray);
			console.log('dataArray: ' + sourceData);
			var options = {
				lineWidth: 5,
				colors: ['#71BE6B'],
				legend: {position:'none'},
				title: dataType[i].str
			};
			var childNode = document.createElement('div');
			childNode.setAttribute('id', dataType[i].type);
			parentNode.appendChild(childNode);
			var chart = new google.visualization.LineChart(childNode);
			chart.draw(google.visualization.arrayToDataTable(sourceData), options);
		}
	},
	_createDataArray : function(cityCode, dataType){
		var dataArray = null;
		cityObservationArray.forEach(function(obs, idx){
			if(dataArray == null) dataArray = new Array();
			if(cityCode == obs.City_ID){
				var data = 0;
				if(dataType == 'ndvi') data = obs.ndvi;
				if(dataType == 'olst') data = obs.olst;
				if(dataType == 'par') data = obs.par;
				if(dataType == 'smc') data = obs.smc;
				dataArray.push([parseInt(obs.month), parseFloat(data)]);
			}
		});
		return dataArray;
	}
};


google.load("visualization", "1", {packages:["corechart"]});

var application = new Application.faamo();
var draw = new Application.faamo.Draw();
google.setOnLoadCallback(draw.drawMap());
