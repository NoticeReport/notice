// app.js
var routerApp = angular.module('routerApp', [ 'ui.router',
		'phonecatControllers' ]);

routerApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider

	// HOME STATES AND NESTED VIEWS ========================================
	.state('home', {
		url : '/home',
		templateUrl : 'Content.html',
		controller : 'PhoneListCtrl'
	})

	// ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	.state('home1', {
		url : '/home',
		templateUrl : 'Content.html',
		controller : 'PhoneListCtrl'
	});

});
routerApp.controller('MainAppCtrl', [ '$scope', '$http', '$state',
		function($scope, $http, $state) {
			$scope.showMail = false;
			$scope.mailcall = function() {
				$scope.showMail = true;
			}
			$scope.inputsub = "mail";
			$scope.postmail = function() {
				var name = $state.current.name;
				var serviceUrl = "/notice/api/service/" + name;
				console.log("textarea", $scope.inputTextarea);
				console.log("subject", $scope.inputsub);
				$http.get(serviceUrl).success(function(data) {
					console.log(data);
					$scope.showMail=false;
				});
			}

		} ]);
