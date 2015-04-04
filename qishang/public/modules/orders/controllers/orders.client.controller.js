'use strict';

// Orders controller
angular.module('orders').controller('OrdersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Orders', 'ShoppingCart',
	function($scope, $stateParams, $location, Authentication, Orders, ShoppingCart) {
		var originalDeliveryInfo, originalExpressInfo;
		$scope.authentication = Authentication;

		$scope.cart = ShoppingCart;
		$scope.payment = {type: 'zhifubao'};
		$scope.invoiceInfo = {type: 0};

		// Create new Order
		$scope.checkout = function() {
			// Create new Order object
			var order = new Orders ({
				name: this.name,
				orderItems: [],
				totalPrice: $scope.cart.getTotalPrice(),
				deliveryInfo: this.deliveryInfo,
				invoiceInfo: this.invoiceInfo,
				payment: this.payment,
				comment: this.comment,
				status:0,
			});

		   for(var i = 0; i < $scope.cart.items.length; i++) {
		   	order.orderItems.push({product: $scope.cart.items[i].sku, unitPrice: $scope.cart.items[i].price, quantity: $scope.cart.items[i].quantity});
		   }

			// Redirect after save
			order.$save(function(response) {
				$scope.cart.clearItems();

				$location.path('products');

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
			}, function(data){
				originalDeliveryInfo = angular.copy(data.deliveryInfo);
				originalExpressInfo = angular.copy(data.expressInfo);
			});
		};

		// Operate Delivery & Express Info
		$scope.editDeliveryInfo = function () {
			$scope.editingDelivery = false;
			$scope.update();
			originalDeliveryInfo = angular.copy($scope.order.deliveryInfo);
		};

		$scope.resetDeliveryForm = function () {
			$scope.order.deliveryInfo = angular.copy(originalDeliveryInfo);
			$scope.editingDelivery = false;
		};

		$scope.deliverOrder = function () {
			// TODO: maybe do some validation here
			$scope.order.status = 5;
			$scope.update();
			$scope.editingExpress = false;
		};

		$scope.resetExpressForm = function () {
			$scope.order.expressInfo = angular.copy(originalExpressInfo);
			$scope.editingExpress = false;
		};

		$scope.confirmedPay = function () {
			// TODO: just update status

			$scope.order.status = 2;
			$scope.update();
		};
	}
]);