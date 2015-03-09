'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Product = mongoose.model('Product'),
    _ = require('lodash'),
    utils = require('../utils');

exports.favoriteByID = function(req, res, next, id) {
    var product = req.product;
    utils.findByParam(product.favorites, { id: id }, function (err, favorite) {
        if (err) return next(err);
        req.favorite = favorite;
        next();
    });
};

exports.create = function(req, res) {
    var product = req.product;
    var user = req.user;
    console.log(req.body);
    if (!req.body.body) return res.redirect('/products/'+ product.id);

    product.addFavorite(user, req.body, function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(product);
        }
    });
};

exports.delete = function (req, res) {
    var product = req.product;

    product.removeFavorite(req.param('favoriteId'), function (err) {
      if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(product);
        }
    });
};

exports.list = function(req, res) {
    var product = req.product;
    res.jsonp(product.favorites);
};