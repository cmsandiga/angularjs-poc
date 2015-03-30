'use strict';

angular.module('meltdsp').controller('LoginViewController', LoginViewController);

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