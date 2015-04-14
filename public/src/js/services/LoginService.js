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