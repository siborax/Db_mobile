// //References used in making plot:
// // For Brush selected styling: https://bl.ocks.org/mbostock/6498000
// // For Brush Graph: https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
// // For re-drawing line plot: https://stackoverflow.com/questions/33009563/d3-js-how-to-select-data-from-graphs-brushed-area
//
// (function() {
//     'use strict';
//
//     angular
//         .module('app')
//         .controller('scatterBrushFilter', scatterBrushFilter);//names the controller
//
//     //  var connections = [];
//     //var coordinates =[];
//     //var graphData=[];
//     var graphData = [];
//
//     scatterBrushFilter.$inject = ['$http'];
//
//     function scatterBrushFilter($http) {
//         var sb=this;
//
//         console.log("inside sbf");
//         // function init(){
//         //     getData();
//         // }
//       //  console.log("http ", $http.all());
//         var url = '/connections/getData';
//         var connectionsPromise = $http.get(url);
//         console.log("resp: ",connectionsPromise);
//         connectionsPromise.then(function (response) {
//             graphData = response.data;
//         var margin = {
//                 top: 20,
//                 right: 20,
//                 bottom: 110,
//                 left: 50
//             },
//             margin2 = {
//                 top: 430,
//                 right: 20,
//                 bottom: 30,
//                 left: 50
//             },
//             width = 960 - margin.left - margin.right,
//             height = 500 - margin.top - margin.bottom,
//             height2 = 500 - margin2.top - margin2.bottom;
//
// // var parseDate = d3.timeParse("%b %Y");
//
//
//     var xScale = d3.scaleTime().range([0, width]),
//         xScale2 = d3.scaleTime().range([0, width]),
//         yScale = d3.scaleLinear().range([height, 0]),
//         yScale2 = d3.scaleLinear().range([height2, 0]);
//     console.log("grphdt");
//     var xAxis = d3.axisBottom(xScale),
//         xAxis2 = d3.axisBottom(xScale2),
//         yAxis = d3.axisLeft(yScale);
//
//     var svg = d3.select("#plot").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom);
//
//     var plot = svg.append("g")
//         .attr("class", "plot")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//     var slider = svg.append("g")
//         .attr("class", "slider")
//         .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
//
//     var plotline = d3.line()
//         .x(function (d) {
//             return xScale(d.date);
//         })
//         .y(function (d) {
//             return yScale(d.accuracy);
//         });
//
// //     if (error) throw error;
//
//     var brush = d3.brushX()
//         .extent([
//             [0, 0],
//             [width, height2]
//         ])
//         .on("brush end", brushed);
//
//     xScale.domain(d3.extent(graphData, function (d) {
//         return d.date;
//     }));
//
//     yScale.domain([0, d3.max(graphData, function (d) {
//         return d.accuracy;
//     }) + 200]);
//
//     xScale2.domain(xScale.domain());
//     yScale2.domain(yScale.domain());
//
//     plot.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);
//
//     plot.append("g")
//         .attr("class", "axis axis--y")
//         .call(yAxis);
//
//     plot.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - margin.left)
//         .attr("x", 0 - (height / 2))
//         .attr("dy", "1em")
//         .style("text-anchor", "middle")
//         .text("Accuracy");
//
//     svg.append("text")
//         .attr("transform",
//             "translate(" + ((width + margin.right + margin.left) / 2) + " ," +
//             (height + margin.top + margin.bottom) + ")")
//         .style("text-anchor", "middle")
//         .text("Date");
//
//     //append line plot
//     plot.append("path")
//         .attr("class", "lineplot")
//         .datum(graphData)
//         .attr("fill", "none")
//         .attr("stroke", "orange")
//         .attr("stroke-width", 1)
//         .attr("d", plotline);
//
//     // append scatter plot to main chart area
//     var dots = plot.append("g");
//     dots.selectAll("dot")
//         .data(graphData)
//         .enter().append("circle")
//         .attr('class', 'dot')
//         .attr("r", 3)
//         .attr("cx", function (d) {
//             return xScale(d.date);
//         })
//         .attr("cy", function (d) {
//             return yScale(d.accuracy);
//         })
//
//     // append scatter plot to brush chart area
//     var sliderdots = slider.append("g");
//     sliderdots.selectAll("dot")
//         .data(graphData)
//         .enter().append("circle")
//         .attr('class', 'dotslider')
//         .attr("r", 3)
//         .style("opacity", .5)
//         .attr("cx", function (d) {
//             return xScale2(d.date);
//         })
//         .attr("cy", function (d) {
//             return yScale2(d.accuracy);
//         })
//
//     slider.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height2 + ")")
//         .call(xAxis2);
//
//     slider.append("g")
//         .attr("class", "brush")
//         .call(brush)
//         .call(brush.move, xScale.range());
//
//
//     //create brush function redraw scatterplot with selection
//     function brushed() {
//         var selection = d3.event.selection;
//
//         if (selection !== null) {
//             var e = d3.event.selection.map(xScale2.invert, xScale2);
//
//
//             var test = slider.selectAll(".dotslider");
//             test.classed("selected", function (d) {
//                 return e[0] <= d.date && d.date <= e[1];
//             });
//
//             var test2 = plot.selectAll(".dot");
//             test2.classed("selected", function (d) {
//                 return e[0] <= d.date && d.date <= e[1];
//             });
//
//             plot.selectAll(".lineplot")
//                 .attr("d", plotline(
//                     data.filter(function (d) {
//                         return e[0] <= d.date && e[1] >= d.date;
//                     })
//                 ));
//         }
//     }
//             function type(d) {
//                 d.date = +d.date;
//                 d.accuracy = +d.accuracy;
//                 return d;
//             }
//         }); //end load data
//
//         }
// })();
