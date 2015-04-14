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