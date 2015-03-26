'use strict';

// Orders controller
angular.module('orders').controller('OrdersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Orders', 'ShoppingCart',
	function($scope, $stateParams, $location, Authentication, Orders, ShoppingCart) {
		$scope.authentication = Authentication;

		$scope.cart = ShoppingCart;

		// Create new Order
		$scope.checkout = function() {
			// Create new Order object
			var order = new Orders ({
				name: this.name,
				orderItem: [],
				totalPrice: $scope.cart.getTotalCount(),
				status:0,
			});

		   for(var i = 0; i < $scope.cart.items.length; i++) {
		   	order.orderItem.push({product: $scope.cart.items[i].sku, unitPrice: $scope.cart.items[i].price, quantity: $scope.cart.items[i].quantity});
		   }

		   // Todo: add delivery info 
		   order.deliveryInfo = {receiverName: 'temp-receiverName', address: 'temp-address'};

			// Redirect after save
			order.$save(function(response) {
				$scope.cart.clearItems();

				$location.path('products/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.warn($scope.error);
			});
		};

		// Remove existing Order
		$scope.remove = function(order) {
			if ( order ) { 
				order.$remove();

				for (var i in $scope.orders) {
					if ($scope.orders [i] === order) {
						$scope.orders.splice(i, 1);
					}
				}
			} else {
				$scope.order.$remove(function() {
					$location.path('orders');
				});
			}
		};

		// Update existing Order
		$scope.update = function() {
			var order = $scope.order;

			order.$update(function() {
				$location.path('orders/' + order._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Orders
		$scope.find = function() {
			$scope.orders = Orders.query();
		};

		// Find existing Order
		$scope.findOne = function() {
			$scope.order = Orders.get({ 
				orderId: $stateParams.orderId
			});
		};
	}
]);