(function(){
    'use strict';
       angular
        .module('app')
        .controller('connectionController',connectionController);//names the controller
   var connections = [];
  var coordinates =[];
  var locations = [];
  var timestamps = [];
    var init_year = 2015;
    var color_na = d3.rgb("#d4d4d4");
    // only works if array.length-1 is between 3 and 9 (d3 color scheme)
    var quantiles = [0, 0.2, 0.4, 0.6, 0.8, 1];
    var headline = "Accuracy: ";

    connectionController.$inject=['$http'];
    var inputValue = null;
    var accuracy = ["100","1000","10000","100000"];
    function connectionController($http){
        var vm= this;
        // var url = '/connections/coordinates';
        // var connectionss = $http.get(url);
        //         connectionss.then(function (response) {
        //     coordinates = response.data;
        // });

       vm.getAll = getAll;
        vm.getCoordinates= getCoordinates;
        vm.gettimestamps = gettimestamps;
        init();
        function init(){
           vm.getAll();
           vm.getCoordinates();
           vm.gettimestamps();
        }
        function getAll(){
            //console.log("inside all");
            var url = '/connections/all';
           var connectionsPromise = $http.get(url);
            connectionsPromise.then(function (response) {
               connections = response.data;
                locations=connections;

                var id = 0;
                console.log(locations);
                locations.forEach(function(d){
                    d.id = id;
                    id = id + 1;
                    //console.log('id',id)
                });
                var min_year = d3.min(locations, function(d) { return d["testtimestamp"]; }),
                    max_year = d3.max(locations, function(d) { return d["testtimestamp"]; });
           console.log('min year: ',min_year);
                console.log('max year: ',max_year);
            });
        }

        function getCoordinates(){
    var url = '/connections/coordinates';
    var connectionss = $http.get(url);

     console.log(connectionss);
    connectionss.then(function (response) {
        coordinates = response.data;
        // console.log('coordinates',coordinates);

    });
        }
        function gettimestamps(){
            var url = '/connections/timestamps';
            var timestampUrl = $http.get(url);
            console.log(timestampUrl);
            timestampUrl.then(function (response) {
                timestamps = response.data;
                 console.log('timestamps: ',timestamps);

            });
        }

        var width = 960,
            height = 1160;
        var projection = d3.geo.albers()
            .center([9, 50])
            .rotate([0, 0])
            .scale(1200 * 2)
            .translate([width / 4, height / 4]);
        var path = d3.geo.path()
            .projection(projection);
        var svg = d3.select("#column1-2").append("svg")
            .attr("width", width)
            .attr("height", height);
        var url = '/connections/all';
        var connectionsPromise = $http.get(url);
        // console.log(connectionsPromise);
        connectionsPromise.then(function (response) {
            connections = response.data;
        });
      // console.log('con type',vm.coordinates);
         d3.json("de.json", function(error, de) {
            // console.log('de',de);
            svg.append("path")
                .datum(topojson.object(de, de.objects.subunits))
                .attr("class", function(d) { return "subunit"})
                .attr("d", path);
            svg.append("path")
                .datum(topojson.object(de, de.objects.places))
                .attr("d", path)
                .attr("class", "place");
                     // console.log('resullt',coordinates);
            svg.selectAll(".place-label")
                .data(topojson.object(de, de.objects.places).geometries)
                .enter().append("text")
                .attr("class", "place-label")
                .attr("transform", function(d) { return "translate(" + projection(d.coordinates) + ")"; })
                .attr("dx", "0.75em")
                .text(function(d) { return d.properties.name; });

             d3.select("#sliderContainer").insert("p", ":first-child").append("input")
                 .attr("type", "range")
                 .attr("min", "2015")
                 .attr("max", "2016")
                 .attr("value", init_year)
                 .attr("id", "year");
             d3.select("#sliderContainer").insert("h2", ":first-child").text(headline + init_year);
             // update headline
             d3.select("h2").text(headline + d3.select("#year").node().value);
             var url = '/connections/coordinates';
             var connectionss = $http.get(url);

            // console.log(connectionss);
             connectionss.then(function (response) {
                 coordinates = response.data;

                 let data_all = coordinates;


                 var circles= svg.selectAll('circle')
        .data(coordinates)
        .enter().append('circle');

    circles.attr("transform", function(d) {
        return "translate(" + projection([d.latitude,d.longtitude]) + ")"; })
        .attr("r", 4)
        .style('fill','red');
});
         });


        d3.select("#year").on("input", function() {
            let upd_color = calcColorScale(data_all[this.value]);
            updateMap(upd_color, data_all[this.value]);
            renderLegend(upd_color, data_all[this.value]);
            renderBars(upd_color, data_all[this.value]);
        });
    }
})();