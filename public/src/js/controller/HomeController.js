angular.module('meltdsp').controller('HomeController', home);

function home($scope, $location, CampaignService, LoginService) {
	console.log('Init home');
	$scope.message = 'Home';
	$scope.campaigns = CampaignService.list();
	
	$scope.logout = function() {
 		LoginService.logout(function() {
 			$location.path('/#/login');
 		}, function() {
 			alert("Falha ao sair!");
 		});
	};
}