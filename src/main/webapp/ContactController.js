/**
 * 
 */
var contactControllers = angular.module('contactControllers', ['ngSanitize']);


contactControllers.controller('ContactCtrl', [ '$scope', '$http','$state',
		function($scope, $http,$state) {
	
	$scope.contactMessageDivShow = true;
	$scope.contactHeaderText = "We are happy to hear from you.";
	
	$scope.postContact = function() {
		
		
		if( $scope.message==undefined )
			{
			console.log("inside if", $scope.message);
			$('#contactMessage').addClass("errorField");
			
			}else{
				
				var tokenUrl="/api/service/token/value";
				var serviceUrl="/api/service/contactUs";
				
				var tokenresponse = $http.get(tokenUrl);
				
				tokenresponse.success(function(data, status, headers,config) {
					
					
					var token = headers('X-TOKEN');

					var headerConfig = {
						headers : {
							'X-TOKEN' : token
						}
					};

					var dataObj = {
							"emailId" : $scope.emailId,
							"message" : $scope.message
					};
					
					console.log("dataObj", dataObj);
					$http.post(serviceUrl, dataObj,headerConfig);
					
					$scope.contactMessageDivShow = false;
					$scope.contactHeaderText = "Thank you for writing to us.We will address your request as soon as possible.";
					
					
					
				});
				
			}
		 
	}
	
	$scope.contactFocus = function()
	{
		console.log("inside focus");
		$('#contactMessage').removeClass("errorField");
	};
				
	}]);
	
	





