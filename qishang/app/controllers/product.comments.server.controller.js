'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Product = mongoose.model('Product'),
    _ = require('lodash'),
    utils = require('../utils');

exports.commentByID = function(req, res, next, id) {
    var product = req.product;
    utils.findByParam(product.comments, { id: id }, function (err, comment) {
        if (err) return next(err);
        req.comment = comment;
        next();
    });
};

exports.create = function(req, res) {
    var product = req.product;
    var user = req.user;
    console.log(req.body);
    if (!req.body.body) return res.redirect('/products/'+ product.id);

    product.addComment(user, req.body, function (err) {
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

    product.removeComment(req.param('commentId'), function (err) {
      if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(product);
        }
    });
};