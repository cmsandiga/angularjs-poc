'use strict';

angular.module('meltdsp').controller('CampaignViewController', CampaignViewController);

function CampaignViewController($scope, $location, $routeParams, CampaignService, LoginService) {
	console.log('Init CampaignViewController');
	$scope.message = 'Campaign';
	
	$scope.campaigns = CampaignService.view($routeParams.id);

	$scope.logout = function() {
 		LoginService.logout(function() {
 			$location.path('/#/login');
 		}, function() {
 			alert("Falha ao sair!");
 		});
	};
}