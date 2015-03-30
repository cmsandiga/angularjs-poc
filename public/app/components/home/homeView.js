'use strict';

angular.module('meltdsp').controller('HomeViewController', HomeViewController);

function HomeViewController($scope, $location, CampaignService, LoginService) {
	console.log('Init HomeViewController');
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