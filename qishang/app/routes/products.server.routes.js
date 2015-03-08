'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var products = require('../../app/controllers/products.server.controller');
	var comments = require('../../app/controllers/product.comments.server.controller');

	// Products Routes
	app.route('/products')
		.get(products.list)
		.post(products.create);
		// TODO: .post(users.requiresLogin, products.create);

	 app.route('/products/upload/image')
    	.post(products.uploadImage);

	app.route('/products/:productId')
		.get(products.read)
		.put(products.update)
		.delete(products.delete);
		// TODO: 
		// .put(users.requiresLogin, products.hasAuthorization, products.update)
		// .delete(users.requiresLogin, products.hasAuthorization, products.delete);

	// Finish by binding the Product middleware
	app.param('productId', products.productByID);

	// Comments routes
  	app.param('commentId', comments.commentByID);
  	app.route('/products/:productId/comments')
		.post(comments.create);

	app.route('/products/:productId/comments/:commentId')
		.delete(comments.delete);

	app.param('commentId', comments.commentByID);
};
