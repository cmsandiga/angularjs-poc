angular.module('meltdsp', ['ngRoute', 'ngCookies']).config(config);

function config($routeProvider, $httpProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'views/pages/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
		.when('/home', {
			templateUrl: 'views/pages/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})
		.when('/campaign/:id', {
			templateUrl: 'views/pages/campaign.html',
			controller: 'CampaignController',
			controllerAs: 'vm'
		})
		.otherwise('/home');

	$httpProvider.interceptors.push(['$q', '$location', '$cookies', function($q, $location, $cookies) {
		return {
			'request': function (config) {
				config.headers = config.headers || {};
				console.log('Token: ' + $cookies._meltdsp_auth_token);
				if ($cookies._meltdsp_auth_token) {
					config.headers.Authorization = 'Portador ' + $cookies._meltdsp_auth_token;
				}
				return config;
			},
			'responseError': function(response) {
				console.log('Response' + response.status);
				if(response.status === 401 || response.status === 403) {
					$location.path('/login');
				}
				return $q.reject(response);
			}
		};
	}]);
}