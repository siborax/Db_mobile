(function(){
    'use strict';
       angular
        .module('app')
        .controller('connectionController',connectionController);

    connectionController.$inject=['$http'];

    function connectionController($http){
        var vm= this;

        vm.connections = [];
        vm.coordinates =[];
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
               vm.connections = response.data;

           });
        }
        console.log('inside getCoordinatesssss');
        function getCoordinates(){
            var url = '/connections/coordinates';
            var connectionsCoordinates = $http.get(url);

            //console.log(connectionsPromise);
            connectionsCoordinates.then(function (response) {
                vm.coordinates = response.data;
                //console.log('coordinates',response.data);

            });
        }
    }
});