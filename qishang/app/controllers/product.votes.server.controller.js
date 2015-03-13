'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Product = mongoose.model('Product'),
    _ = require('lodash'),
    utils = require('../utils');

exports.voteByID = function(req, res, next, id) {
    var product = req.product;
    utils.findByParam(product.votes, { id: id }, function (err, vote) {
        if (err) return next(err);
        req.vote = vote;
        next();
    });
};

exports.create = function(req, res) {
    var product = req.product;
    var user = req.user;
    console.log(req.body);

    product.addVote(user, function (err) {
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

    product.removeVote(req.param('voteId'), function (err) {
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
    res.jsonp(product.votes);
};