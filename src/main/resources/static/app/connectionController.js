(function(){
    'use strict';

       angular
        .module('app')
        .controller('connectionController',connectionController);//names the controller
   var connections = [];
  var coordinates =[];
    connectionController.$inject=['$http'];

    function connectionController($http){
        var vm= this;




        console.log('inside getCoordinatesssss');
        var url = '/connections/coordinates';
        var connectionss = $http.get(url);

        console.log(connectionss);
        connectionss.then(function (response) {
            coordinates = response.data;
        });

       vm.getAll = getAll;
        vm.getCoordinates= getCoordinates;
        init();
        function init(){
           getAll();
        getCoordinates();
        }
        function getAll(){
            var url = '/connections/all';
           var connectionsPromise = $http.get(url);
           // console.log(connectionsPromise);
            connectionsPromise.then(function (response) {
               connections = response.data;

           });
        }

function getCoordinates(){
    //console.log('inside getCoordinatesssss');
    var url = '/connections/coordinates';
    var connectionss = $http.get(url);

    console.log(connectionss);
    connectionss.then(function (response) {
        coordinates = response.data;
        console.log('coordinates',coordinates);

    });
        }
        console.log('cooo',coordinates)
        var width = 960,
            height = 1160;

        var projection = d3.geo.albers()
            .center([9, 50])
            .rotate([0, 0])
            .scale(1200 * 5)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        var url = '/connections/all';
        var connectionsPromise = $http.get(url);
        // console.log(connectionsPromise);
        connectionsPromise.then(function (response) {

            connections = response.data;
        });
        console.log('con type',vm.coordinates);
         d3.json("de.json", function(error, de) {

            console.log('de',de);
            svg.append("path")
                .datum(topojson.object(de, de.objects.subunits))
                .attr("class", function(d) { return "subunit"})
                .attr("d", path);
            svg.append("path")
                .datum(topojson.object(de, de.objects.places))
                .attr("d", path)
                .attr("class", "place");
                     console.log('resullt',coordinates);


            svg.selectAll(".place-label")
                .data(topojson.object(de, de.objects.places).geometries)
                .enter().append("text")
                .attr("class", "place-label")
                .attr("transform", function(d) { return "translate(" + projection(d.coordinates) + ")"; })
                .attr("dx", "0.75em")
                .text(function(d) { return d.properties.name; });
             var url = '/connections/coordinates';
             var connectionss = $http.get(url);

             console.log(connectionss);
             connectionss.then(function (response) {
                 coordinates = response.data;

    var circles= svg.selectAll('circle')
        .data(coordinates)
        .enter().append('circle');

    circles.attr("transform", function(d) {
        return "translate(" + projection([d.latitude,d.longtitude]) + ")"; })
        .attr("r", 4)
        .style('fill','red');


});

         });

   }
})();