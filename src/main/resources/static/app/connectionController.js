(function(){
    'use strict';

    angular
        .module('app')
        .controller('connectionController',connectionController);//names the controller
    var connections = [];
    var coordinates =[];
    var graphData=[];
    var coor=[];
    var aggregatedByDate=[];

    connectionController.$inject=['$http'];

    function connectionController($http){
        var vm= this;
        vm.getAll = getAll;
        vm.getCoordinates= getCoordinates;
        vm.getData = getData;
        vm.getAggregatedByDate = getAggregatedByDate;
        // vm.getCoord=getCoord();

        init();
        function init(){
            getAll();
            getCoordinates();
            getData();
            getAggregatedByMonth();
            // getCoord();
        }
        function getAll(){
            var url = '/connections/all';
            var connectionsPromise = $http.get(url);
            // console.log(connectionsPromise);
            connectionsPromise.then(function (response) {
                connections = response.data;

            });
        }
        function getAggregatedByDate(){
            var url = '/connections/aggregatedByDate';
            var connectionsPromise = $http.get(url);
            connectionsPromise.then(function (response) {
                aggregatedByDate = response.data;
            })
        }

       // console.log("data",graphData)
        function getCoordinates(){
            //console.log('inside getCoordinatesssss');
            var url = '/connections/coordinates';
            var connectionss = $http.get(url);

            console.log(connectionss);
            connectionss.then(function (response) {
                coordinates = response.data;
                console.log('coordinates',coordinates);

            });

        console.log('cooo',coordinates)//doesn't print anything - empty
        var width = 960,
            height = 1160;

        var projection = d3.geo.albers()
            .center([9, 50])
            .rotate([0, 0])
            .scale(1200 * 5)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("#column1-2").append("svg")
            .attr("width", width)
            .attr("height", height);

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
                console.log("response",coordinates);
// console.log("projection",projection)
                var circles= svg.selectAll('circle')
                    .data(coordinates)
                    .enter().append('circle');
// console.log("lat",coordinates.latitude);
                circles.attr("transform", function(d) {
                    return "translate(" + projection([d.latitude,d.longtitude]) + ")"; })
                    .attr("dx", "0.75em")
                    .attr("r", 4)
                    .style('fill','red');


            });

        });
        }
        // function getCoord(){
        //     var url= '/connections/getCoord';
        //     var connectionsPromise=  $http.get(url);
        // }

        function getData() {
            console.log("inisde getData");
            var url = '/connections/getData';
            var connectionsPromise = $http.get(url);}
            console.log("resp: ", connectionsPromise);
            // connectionsPromise.then(function (response) {
            //
            //     var svgLine = d3.select("#column1"),
            //         margin = {top: 20, right: 20, bottom: 110, left: 40},
            //         margin2 = {top: 430, right: 20, bottom: 30, left: 40},
            //         width = +svgLine.attr("width") - margin.left - margin.right,
            //         height = +svgLine.attr("height") - margin.top - margin.bottom,
            //         height2 = +svgLine.attr("height") - margin2.top - margin2.bottom;
            //     console.log("width",svgLine.attr("width"));
            //     console.log("heighttt",svgLine.attr("height"));
            //     console.log("heightt222",height2);
            //     var parseDate = d3.timeParse("%m/%d/%Y %H:%M");
            //
            //     var x = d3.scaleTime().range([0, width]),
            //         x2 = d3.scaleTime().range([0, width]),
            //         y = d3.scaleLinear().range([height, 0]),
            //         y2 = d3.scaleLinear().range([height2, 0]);
            //
            //     var xAxis = d3.axisBottom(x),
            //         xAxis2 = d3.axisBottom(x2),
            //         yAxis = d3.axisLeft(y);
            //
            //     var brush = d3.brushX()
            //         .extent([[0, 0], [width, height2]])
            //         .on("brush end", brushed);
            //
            //     var zoom = d3.zoom()
            //         .scaleExtent([1, Infinity])
            //         .translateExtent([[0, 0], [width, height]])
            //         .extent([[0, 0], [width, height]])
            //         .on("zoom", zoomed);
            //
            //     var line = d3.line()
            //         .x(function (d) { return x(d.Date); })
            //         .y(function (d) { return y(d.Air_Temp); });
            //
            //     var line2 = d3.line()
            //         .x(function (d) { return x2(d.Date); })
            //         .y(function (d) { return y2(d.Air_Temp); });
            //
            //     var clip = svgLine.append("defs").append("svg:clipPath")
            //         .attr("id", "clip")
            //         .append("svg:rect")
            //         .attr("width", width)
            //         .attr("height", height)
            //         .attr("x", 0)
            //         .attr("y", 0);
            //
            //
            //     var Line_chart = svgLine.append("g")
            //         .attr("class", "focus")
            //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            //         .attr("clip-path", "url(#clip)");
            //
            //
            //     var focus = svgLine.append("g")
            //         .attr("class", "focus")
            //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            //
            //     var context = svgLine.append("g")
            //         .attr("class", "context")
            //         .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
            //
            //     d3.csv("example.csv", type, function (error, data) {
            //         if (error) throw error;
            //
            //         x.domain(d3.extent(data, function(d) { return d.Date; }));
            //         y.domain([0, d3.max(data, function (d) { return d.Air_Temp; })]);
            //         x2.domain(x.domain());
            //         y2.domain(y.domain());
            //
            //
            //         focus.append("g")
            //             .attr("class", "axis axis--x")
            //             .attr("transform", "translate(0," + height + ")")
            //             .call(xAxis);
            //
            //         focus.append("g")
            //             .attr("class", "axis axis--y")
            //             .call(yAxis);
            //
            //         Line_chart.append("path")
            //             .datum(data)
            //             .attr("class", "line")
            //             .attr("d", line);
            //
            //         context.append("path")
            //             .datum(data)
            //             .attr("class", "line")
            //             .attr("d", line2);
            //
            //
            //         context.append("g")
            //             .attr("class", "axis axis--x")
            //             .attr("transform", "translate(0," + height2 + ")")
            //             .call(xAxis2);
            //
            //         context.append("g")
            //             .attr("class", "brush")
            //             .call(brush)
            //             .call(brush.move, x.range());
            //
            //         svgLine.append("rect")
            //             .attr("class", "zoom")
            //             .attr("width", width)
            //             .attr("height", height)
            //             .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            //             .call(zoom);
            //
            //
            //         console.log(data);
            //     });
            //
            //     function brushed() {
            //         if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
            //         var s = d3.event.selection || x2.range();
            //         x.domain(s.map(x2.invert, x2));
            //         Line_chart.select(".line").attr("d", line);
            //         focus.select(".axis--x").call(xAxis);
            //         svgLine.select(".zoom").call(zoom.transform, d3.zoomIdentity
            //             .scale(width / (s[1] - s[0]))
            //             .translate(-s[0], 0));
            //     }
            //
            //     function zoomed() {
            //         if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
            //         var t = d3.event.transform;
            //         x.domain(t.rescaleX(x2).domain());
            //         Line_chart.select(".line").attr("d", line);
            //         focus.select(".axis--x").call(xAxis);
            //         context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
            //     }
            //
            //     function type(d) {
            //         d.Date = parseDate(d.Date);
            //         d.Air_Temp = +d.Air_Temp;
            //         return d;
            //     }
            //
            // });
    }
})();