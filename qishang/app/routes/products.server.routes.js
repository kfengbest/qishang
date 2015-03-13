'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var products = require('../../app/controllers/products.server.controller');
	var comments = require('../../app/controllers/product.comments.server.controller');
	var favorites = require('../../app/controllers/product.favorites.server.controller');
	var votes = require('../../app/controllers/product.votes.server.controller');

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

	// Comments routes
  	app.route('/products/:productId/comments')
  		.get(comments.list)
		.post(comments.create);

	app.route('/products/:productId/comments/:commentId')
		.delete(comments.delete);

	// Favorites routes
  	app.route('/products/:productId/favorites')
  		.get(favorites.list)
		.post(favorites.create);

	app.route('/products/:productId/favorites/:favoriteId')
		.delete(favorites.delete);

	// Votes routes
  	app.route('/products/:productId/votes')
  		.get(votes.list)
		.post(votes.create);

	app.route('/products/:productId/votes/:voteId')
		.delete(votes.delete);

	// Finish by binding middleware
	app.param('productId', products.productByID);
	app.param('commentId', comments.commentByID);
	app.param('favoriteId', favorites.favoriteByID);
	app.param('voteId', votes.voteByID);
};
