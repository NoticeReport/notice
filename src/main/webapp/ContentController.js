/**
 * 
 */
var contentControllers = angular.module('contentControllers', [ 'ngSanitize' ]);
contentControllers.controller('ContentCtrl', [ '$scope', '$http', '$state',
		function($scope, $http, $state) {
			var name = $state.current.name;

			$scope.contentOptionSelected = function(event, item) {
				console.log("Item selected", item);
				//event.preventDefault();
				//event.stopImmediatePropagation();
				var contentDiv = $(event.currentTarget).closest('#contentDiv');
				//var contentDiv = $(event.currentTarget).parent().parent().parent().parent().parent().attr('id');
				console.log("this id", contentDiv);

				//Get the HTML of whole page
				var oldPage = document.body.innerHTML;

				//Get the HTML of div
				var divElements = $(contentDiv)[0].innerHTML;

				//Reset the page's HTML with div's HTML only
				document.body.innerHTML = divElements;
				
				switch (item) {
				case "print":
					
					console.log("print case");

					//Removing options dropDown
					var element = document.getElementById('optionButtonDiv');
					console.log("element", element);
					element.parentNode.removeChild(element);

					//Print Page
					window.print();
					break;
					
				case "highlight":
					
					console.log("highlight case");
					console.log('$(contentDiv).attr(id)',$(contentDiv));
					angular.element('contentDiv')[0].css('background-color','#222');
					console.log('hasclass', $('contentDiv').hasClass('contenthighlight'));
					$('contentDiv').attr('id').addClass('contenthighlight');
					console.log('hasclass', $('contentDiv').attr('id').hasClass('contenthighlight'));
					//$(contentDiv).css( 'background-color','#222');
					break;
				}

				//Restore orignal HTML
				document.body.innerHTML = oldPage;
				console.log("restore");

			}

			var serviceUrl = "/api/service/" + name;
			console.log("serviceUrl", serviceUrl);
			$http.get(serviceUrl).success(function(data) {
				$scope.notices = data.notices;
				console.log('data.notices', data.notices);
			});

		} ]);
