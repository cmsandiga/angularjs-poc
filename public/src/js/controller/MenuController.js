angular.module('meltdsp').controller('MenuController', MenuController);

function MenuController($rootScope, $scope, $location, $cookieStore, LoginService) {
	
	console.log('menu_controller');

	$scope.message = 'menu';

	$scope.first_menu = function() {

		alert('Hi');
	};
}