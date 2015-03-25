'use strict';

angular.module('core').service('Cart', [ function () {
	return new shoppingCart('BaoyuStore');
}]);