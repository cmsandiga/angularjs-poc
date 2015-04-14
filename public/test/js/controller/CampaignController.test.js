describe('meltdsp.LoginService', function() {

	var login_service;

	beforeEach(module('meltdsp'));
	beforeEach(inject(function($injector){
		login_service = $injector.get('LoginService');
		console.log(login_service);
	}));

	it('Should Test', function(){		
		
		expect(1).toBe(1);
	});
});