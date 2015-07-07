/**
 * 
 */
var phonecatControllers = angular.module('phonecatControllers', ['ngSanitize']);
phonecatControllers.controller('PhoneListCtrl', [ '$scope', '$http','$state',
		function($scope, $http,$state) {
	var name= $state.current.name;
//	console.log("state name",name);
	var serviceUrl="/notice/api/service/"+name;
	console.log("serviceUrl",serviceUrl);
	$http.get(serviceUrl).success(function(data) {
		      $scope.notices=data.notices;
		      console.log('data.notices',data.notices);
		    });
		} ]);

