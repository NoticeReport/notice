// app.js
var routerApp = angular.module('routerApp', [ 'ui.router',
		'contentControllers','contactControllers' ]);

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
		controller : 'ContentCtrl'
	})

	.state('classifieds', {
		url : '/classifieds',
		templateUrl : 'Content.html',
		controller : 'ContentCtrl'
	}).state('creative writing', {
		url : '/creativeWriting',
		templateUrl : 'Content.html',
		controller : 'ContentCtrl'
	}).state('cooking', {
		url : '/cooking',
		templateUrl : 'Content.html',
		controller : 'ContentCtrl'
	}).state('contact', {
		url : '/contact',
		templateUrl : 'contact.html',
		controller : 'ContactCtrl'
	});

});
routerApp.controller('MainAppCtrl', [
		'$scope',
		'$http',
		'$state',
		function($scope, $http, $state) {
			$scope.selectedItem = 'category';
			
			$scope.dropboxitemselected = function(item) {
				$scope.selectedItem = item;
				$('.btn-category').css("border", "none");
			}

			$scope.postmail = function() {

				if ($scope.selectedItem === 'category'
						|| $scope.subject == undefined) {
					if ($scope.selectedItem === 'category') {
						$('#dLabel').addClass("errorField");
						
					} 
					if ($scope.subject == undefined) {
						//Need to add styling of mandatory field
						//$('#postSubject').addClass("errorField");
					}

				} else {

					$('#MailPost').modal('hide');

					console.log('selectedItem', $scope.selectedItem);
					var typeRef = $scope.selectedItem;
					var subject = $scope.subject;
					var comment = $scope.comment;
					console.log("comment : ", comment);
					comment = comment.replace(/\n|\r\n|\r/g, '<br/>');
					console.log("comment : ", comment);
					var signature = $scope.signature;
					var name = $state.current.name;

					//var tokenUrl = "/notice/api/service/token/value";
					//var postUrl = "/notice/api/service/newPost";
					var tokenUrl="/api/service/token/value";
					var postUrl ="/api/service/newPost";

					var tokenresponse = $http.get(tokenUrl);
					tokenresponse.success(function(data, status, headers,
							config) {

						var token = headers('X-TOKEN');

						var headerConfig = {
							headers : {
								'X-TOKEN' : token
							}
						};

						var dataObj = {
							"location" : typeRef,
							"subject" : subject,
							"comment" : comment,
							"signature" : signature
						};
						console.log("gatam", dataObj);
						console.log("dataObj", dataObj);
						var postResponse = $http.post(postUrl, dataObj,
								headerConfig);
						postResponse.success(function(data, status, headers,
								config) {
							console.log("data", data.status)
							//$scope.message = data;
						});
						postResponse.error(function(status, headers, config) {
							console.log("failure postResponse message: ",
									status);
						});
					});

					tokenresponse
							.error(function(status, headers, config) {
								console.log("failure tokenresponse message: "
										+ status);
							});

					// Making the fields empty
					//

					$scope.subject = '';
					$scope.comment = '';
					$scope.selectedItem = 'category';
				};
			}
			
			
			
			$('#postTitle').click(function($event){
				
				console.log("Model header click" + $event.currentTarget.id)
				
				$('#modalBody').slideToggle();
				$('#modalFooter').slideToggle();
			});
			

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
