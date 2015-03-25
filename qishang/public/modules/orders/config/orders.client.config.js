'use strict';

// Configuring the Articles module
angular.module('orders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Orders', 'orders', 'dropdown', '/orders(/create)?', true);
		Menus.addSubMenuItem('topbar', 'orders', 'List Orders', 'orders', true);
		Menus.addSubMenuItem('topbar', 'orders', 'New Order', 'orders/create', true);
	}
]);