'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Product = mongoose.model('Product'),
    _ = require('lodash'),
    imageUploader = require('./imageUploader');

/**
 * Create a Product
 */
exports.create = function(req, res) {
    var product = new Product(req.body);
    product.user = req.user;

    product.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(product);
        }
    });
};

exports.uploadImage = function(req, res) {
    var image = req.files.file;
    imageUploader.uploadImage(image.path, image.name, function(err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.jsonp(data);
    });
};

/**
 * Show the current Product
 */
exports.read = function(req, res) {
    res.jsonp(req.product);
};

/**
 * Update a Product
 */
exports.update = function(req, res) {
    var product = req.product;

    product = _.extend(product, req.body);

    product.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Delete an Product
 */
exports.delete = function(req, res) {
    var product = req.product;

    product.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * List of Products
 */
exports.list = function(req, res) {
    var criteria = {};

    // Set category criteria if any
    if (req.param('category')){
        var categories = req.param('category').split(',');
        criteria.categories = {$in: categories};
    }

    // Set scenario criteria if any
    if (req.param('scenario')){
        var scenarios = req.param('scenario').split(',');
        criteria.scenarios = {$in: scenarios};
    }

    // Set keyword criteria if any
    if (req.param('keyword')){
        var keywords = req.param('keyword').split(',');
        criteria.keywords = {$in: keywords};
    }

    // Set usage criteria if any
    if (req.param('usage')){
        var usages = req.param('usage').split(',');
        criteria.usages = {$in: usages};
    }

    Product.find(criteria).sort('-created').exec(function(err, products) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(products);
        }
    });
};

/**
 * Product middleware
 */
exports.productByID = function(req, res, next, id) {
    Product.findById(id).populate('comments.user').exec(function(err, product) {
        if (err) return next(err);
        if (!product) return next(new Error('Failed to load Product ' + id));
        req.product = product;
        next();
    });
};

/**
 * Product authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.product.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
