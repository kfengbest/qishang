'use strict';

// Configuring the Articles module
angular.module('products').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Products', 'products', 'dropdown', '/products(/create)?', true);
		Menus.addSubMenuItem('topbar', 'products', 'List Products', 'products', true);
		Menus.addSubMenuItem('topbar', 'products', 'New Product', 'products/create', true);
	}
]);