'use strict';

// Products controller
angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$http', '$location', '$upload', 'Authentication', 'Products', 'ShoppingCart',
	function($scope, $stateParams, $http, $location, $upload, Authentication, Products, ShoppingCart) {
		$scope.authentication = Authentication;
		$scope.pictures = [];

		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = new Products ({
				sku: this.sku,
				title: this.title,
				description: this.description,
				longDescription: this.longDescription,
				thumbnail: this.thumbnail,
				price: this.price,
				priceInMarket: this.priceInMarket,

				categories: this.categories,
				material: this.material,
				style: this.style,
				keywords: this.keywords,
				usages: this.usages,
				scenarios: this.scenarios



				// TODO: other properties
			});

			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);

				// Clear form fields
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(product) {
			if ( product ) { 
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var product = $scope.product;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.product = Products.get({ 
				productId: $stateParams.productId
			});
		};

		$scope.$watch('thumbnailFile', function () {
        	$scope.uploadImage($scope.thumbnailFile);
    	});

    	 $scope.$watch('picFiles', function () {
        	$scope.uploadImages($scope.picFiles);
    	});


    	$scope.uploadInProgress = false;
        $scope.uploadProgress = '0%';
       
    	$scope.uploadImage = function (files) {
	        if (files && files.length) {
	            var file = files[0];
	            $upload.upload({
	                url: '/products/upload/image',
	                fields: { 'username': $scope.username},
	                file: file
	            }).progress(function (evt) {
	            	$scope.uploadInProgress = true;
	            	var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	                $scope.uploadProgress = progressPercentage + '% ';
	            }).success(function (data, status, headers, config) {
	            	$scope.uploadInProgress = false;
	                console.log('File ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
	                console.log(data.url);
	                $scope.thumbnail = data.url;
	            }).error(function(err) {
	            	$scope.uploadInProgress = false;
	            	console.warn('Error uploading file: ' + err.message || err);
	        	});
			}
		};

		$scope.uploadImages = function (files) {
	        if (files && files.length) {
	        	for (var i = 0; i < files.length; i++) {
		            var file = files[i];
		            $upload.upload({
		                url: '/products/upload/image',
		                fields: { 'username': $scope.username},
		                file: file
		            }).progress(function (evt) {
		            	$scope.uploadPicsInProgress = true;
		            	var progressPercentage =  i / files +  parseInt(100.0 * evt.loaded / evt.total / files.length);
		                $scope.uploadPicsProgress = progressPercentage + '% ';
		            }).success(function (data, status, headers, config) {
		            	if (i === (files.length - 1)) {
		            		$scope.uploadPicsInProgress = false;
		            	}

		                console.log('File ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
		                console.log(data.url);	

		                $scope.pictures.push(data.url);
		            }).error(function(err) {
		            	$scope.uploadPicsInProgress = false;
		            	console.warn('Error uploading file: ' + err.message || err);
		        	});
		        }
	        }
		};

		$scope.uploadThumbnail = function() {
			document.getElementById('thumbnail').click();
		};

		$scope.uploadPictures = function() {
			document.getElementById('pictures').click();
		};

		$scope.newComment = {};
		$scope.createComment = function() {
			$http({
    			url: '/products/' + $scope.product._id + '/comments',
    			method: 'POST',
    			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    			transformRequest: function(obj) {
        			var str = [];
        			for(var p in obj)
        			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        			return str.join('&');
    			},
    			data: {
    				_csrf: $scope.csrf_token,
    				star: $scope.newComment.star,
    				body: $scope.newComment.body
    			}
    		}).success(function (data, status, headers, config) {
    			$scope.newComment = {};
    			$location.path('products/' + $scope.product._id);
        	}).error(function (data, status, headers, config) {
        		$scope.error = data;
			});
		};

		$scope.deleteComment = function(id){
			$http({
    			url: '/products/' + $scope.product._id + '/comments/' + id,
    			method: 'POST',
    			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    			transformRequest: function(obj) {
        			var str = [];
        			for(var p in obj)
        			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        			return str.join('&');
    			},
    			data: {
    				_csrf: $scope.csrf_token,
    				_method: 'DELETE'
    			}
    		}).success(function (data, status, headers, config) {
    			$location.path('products/' + $scope.product._id);
        	}).error(function (data, status, headers, config) {
        		$scope.error = data;
			});
		};

		$scope.addToCart = function(product) {
			var product = product || $scope.product;
			ShoppingCart.addItem(product._id, product.title, product.price, 1);

		};
	}
]);