'use strict';

// Products controller
angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', '$upload', 'Authentication', 'Products', 
	function($scope, $stateParams, $location, $upload, Authentication, Products) {
		$scope.authentication = Authentication;
		$scope.pictures = [];

		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = new Products ({
				sku: this.sku,
				name: this.name,
				description: this.description,
				longDescription: this.longDescription,
				thumbnail: this.thumbnail,
				pictures: this.pictures,
				price: this.price,
				originPrice: this.originPrice,

				categories: this.categories,
				style: this.style,
				material: this.material,
				jadeKind: this.jadeKind,
				size: this.size

				// TODO: other properties
			});

			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);

				// Clear form fields
				$scope.name = '';
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
	}
]);