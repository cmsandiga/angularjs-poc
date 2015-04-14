
angular.module('meltdsp', ['ngRoute', 'ngCookies']);
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
angular.module('meltdsp').controller('CampaignController', CampaignViewController);

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
angular.module('meltdsp').controller('LoginController', LoginViewController);

function LoginViewController($rootScope, $scope, $location, $cookieStore, LoginService) {
	console.log('Init LoginViewController');
	$scope.message = 'Login';

	$scope.signin = function() {
		
		var formData = {
			email: $scope.email,
			password: $scope.password
		};
		
		LoginService.signin(formData, function(res) {
			if (res.type == false) {
				alert(res.data);
			} else {
				$cookieStore.put('_meltdsp_auth_token', res.token);
				$location.path('/home');
			}
		}, function() {
			$rootScope.error = 'Falha ao tentar acessar';
		});
	};
}
angular.module('meltdsp').controller('MenuController', MenuController);

function MenuController($rootScope, $scope, $location, $cookieStore, LoginService) {
	
	console.log('menu_controller');

	$scope.message = 'menu';

	$scope.first_menu = function() {

		alert('Hi');
	};
}
angular.module('meltdsp').factory('CampaignService', ['$http', function($http) {
	
	return {
		list : function(data, success, error) {
			$http.get('/api/list')
			.success(function() {
				
			}).error(function() {
				
			});
		},
		view: function(id, success, error) {
			$http.get('/api/view/' + id)
			.success(function() {
				
			}).error(function() {
				
			});
		}
	};
}]);
angular.module('meltdsp').factory('LoginService', ['$http', '$cookies', '$cookieStore', function($http, $cookies, $cookieStore) {
	
	function changeUser(user) {
		angular.extend(currentUser, user);
	}
	
	function getUserFromToken() {
		var token = $cookies._meltdsp_auth_token;
		var user = {};
		if (typeof token !== 'undefined') {
			// var encoded = token.split('.')[1];
			// user = JSON.parse(urlBase64Decode(encoded));
		}
		return user;
	}

	var currentUser = getUserFromToken();

	return  {
		signin: function(data, success, error) {
			$http.post('/api/authenticate', data).success(success).error(error);
		},
		logout: function(success) {
			changeUser({});
			console.log('Hey: ' + $cookies._meltdsp_auth_token);
			$cookieStore.remove('_meltdsp_auth_token');
            success();
		}
	};

}]);