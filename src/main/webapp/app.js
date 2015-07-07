// app.js
var routerApp = angular.module('routerApp', [ 'ui.router',
		'phonecatControllers' ]);

routerApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider

	// HOME STATES AND NESTED VIEWS ========================================
	/*.state('hyderabad', {
		url : '/hederabad',
		templateUrl : 'Content.html',
		controller : 'PhoneListCtrl'
	})*/
	
	// ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	.state('home', {
		url : '/home',
		templateUrl : 'Content.html',
		controller : 'PhoneListCtrl'
	})

	.state('classifieds', {
		url : '/classifieds',
		templateUrl : 'Content.html',
		controller : 'PhoneListCtrl'
	})
	.state('creative writing', {
		url : '/creativeWriting',
		templateUrl : 'Content.html',
		controller : 'PhoneListCtrl'
	})
	.state('cooking', {
		url : '/cooking',
		templateUrl : 'Content.html',
		controller : 'PhoneListCtrl'
	});

});
routerApp.controller('MainAppCtrl', [ '$scope', '$http', '$state',
		function($scope, $http, $state) {
	$scope.selectedItem = 'category';

	  $scope.dropboxitemselected = function (item) {
		  $scope.selectedItem = item;
	      

	    }
	
	
			$scope.postmail = function() {
				
				
				if($scope.selectedItem == 'category')
					{
					//Need to apply style,and prevent to close the model.
					
					}else{
						
				console.log('selectedItem',$scope.selectedItem);
				var typeRef = $scope.selectedItem;
				var subject = $scope.subject;
				var comment= $scope.comment;
				console.log("comment : ",comment);
				comment = comment.replace(/\n|\r\n|\r/g, '<br/>');
				console.log("comment : ",comment);
				var signature = $scope.signature;
				var name = $state.current.name;
				
				var tokenUrl="/notice/api/service/token/value";
				var postUrl ="/notice/api/service/newPost";
				
				
				var tokenresponse = $http.get(tokenUrl);
				tokenresponse.success(function(data,status, headers, config) {
					    
					    
					     var token = headers('X-TOKEN');
					         
					     var headerConfig = {headers: {
					            'X-TOKEN': token}
					     			};
					     
					     var dataObj = {
								location : typeRef,
								subject : subject,
								comment : comment,
								signature : signature
							};
							console.log("dataObj", dataObj);
							var postResponse = $http.post(postUrl, dataObj,headerConfig);
							postResponse.success(function(data, status, headers, config) {
								console.log("data", data)
								$scope.message = data;
							});
							postResponse.error(function(data, status, headers, config) {
								console.log("failure message: ", JSON.stringify({
									data : data
								}));
							});
					     });
				
				tokenresponse.error(function( status, headers, config) {
					console.log("failure message: " + status);
				});
				
				
				// Making the fields empty
				//

				$scope.subject = '';
				$scope.comment = '';
				$scope.selectedItem = 'category';
			};
			}

		} ]);

//directive
routerApp.directive('contenteditable', function() {
	return {
		restrict : 'A', // only activate on element attribute
		require : '?ngModel', // get a hold of NgModelController
		link : function(scope, element, attrs, ngModel) {
			if (!ngModel)
				return; // do nothing if no ng-model

			// Specify how UI should be updated
			ngModel.$render = function() {
				element.html(ngModel.$viewValue || '');
			};

			// Listen for change events to enable binding
			element.on('blur keyup change', function() {
				scope.$apply(read);
			});
			read(); // initialize

			// Write data to the model
			function read() {
				var html = element.html();
				// When we clear the content editable the browser leaves a <br> behind
				// If strip-br attribute is provided then we strip this out
				//if (attrs.stripBr && html == '<br>') {
			//		html = '';
			//	}
				ngModel.$setViewValue(html);
			}
		}
	};
});
