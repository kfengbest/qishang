'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    utils = require('../utils');

/**
 * Getters / Setters for categories
 */
var getCategories = function(categories) {
    return categories.join(',');
};
var setCategories = function(categories) {
    return categories.split(',');
};

/**
 * Getters / Setters for keywords
 */
var getKeywords = function(keywords) {
    return keywords.join(',');
};
var setKeywords = function(keywords) {
    return keywords.split(',');
};

/**
 * Getters / Setters for usages
 */
var getUsages = function(usages) {
    return usages.join(',');
};
var setUsages = function(usages) {
    return usages.split(',');
};

/**
 * Getters / Setters for scenarios
 */
var getScenarios = function(scenarios) {
    return scenarios.join(',');
};
var setScenarios = function(scenarios) {
    return scenarios.split(',');
};

/**
 * Getters / Setters for promises
 */
var getPromises = function(promises) {
    return promises.join(',');
};
var setPromises = function(promises) {
    return promises.split(',');
};

/**
 * Product Schema
 */
var ProductSchema = new Schema({
    sku: {
        type: String,
        default: '',
        unique: true,
        trim: true
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    longDescription: {
        type: String,
        default: '',
        trim: true
    },
    price: {
        type: Number,
        default: 9999999
    },
    priceInMarket: {
        type: Number,
        default: 9999999
    },
    discount: {
        type: Number,
        default: 10
    },
    discountStartDate: {
        type: Date,
        default: Date.now
    },
    discountEndDate: {
        type: Date
    },
    thumbnail: {
        type: String,
        default: '',
        trim: true
    },
    // 产地
    origin: {
        type: String,
        default: ''
    },
    // 已售标识
    state: {
        type: String,
        default: 'onSale'
    },

    // 种类： 彩色宝石/文玩...
    categories: {
        type: [],
        get: getCategories,
        set: setCategories
    },
    // 材质： 青金/绿松/蓝松/蜜蜡/紫檀/南红石榴石...
    material: {
        type: String,
        default: '',
        trim: true
    },
    // 宝石样式: 圆珠/桶珠/鼓珠/无...
    gemType: {
        type: String,
        default: '',
        trim: true
    },
    // 宝石单颗尺寸: 直径: 1cm，高度: 2cm，厚度: 3cm
    gemSize: {
        type: String,
        default: '',
        trim: true
    },
    // 宝石颜色
    gemColor: {
        type: String,
        default: '',
        trim: true
    },
    // 款式： 项链/吊坠/耳饰/发饰/手链/手镯/戒指/胸针/摆件/把件/裸石/其他
    style: {
        type: String,
        default: '',
        trim: true
    },
    // 成品规格
    size: {
        type: String,
        default: '',
        trim: true
    },
    // 成品总重量
    weight: {
        type: String,
        default: '',
        trim: true
    },
    // 镶嵌材料
    insetMaterial: {
        type: String,
        default: '',
        trim: true
    },
    
    // 商品关键字
    keywords: {
        type: [],
        get: getKeywords,
        set: setKeywords
    }, 
    // 特色关键字： 招财/辟邪/白羊座
    usages: {
        type: [],
        get: getUsages,
        set: setUsages
    },
    // 场景关键字: 职场，逛街
    scenarios: {
        type: [],
        get: getScenarios,
        set: setScenarios
    },

    detail: {
        type: {}
    },
    content: {
        type: String
    },

    // 评论
    comments: [{
        star: {
            type: Number,
            default: 5
        },
        body: {
            type: String,
            default: ''
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        state: {
            type: String,
            default: 'reviewing',
            trim: true
        }
    }],
    // 点赞
    votes: [{
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    // 收藏用户链表
    favorites: [{
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    certificateID: {
        type: String,
        default: '',
        trim: true
    },
    certificateImage: {
        uri: String,
        files: []
    },
    suitTypes: {
        type: {}
    },
    promises: {
        type: [],
        get: getPromises,
        set: setPromises
    },
    packageInfo: {
        type: {}
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Todo:
ProductSchema.path('sku').required(true, 'Product sku cannot be blank');
ProductSchema.path('title').required(true, 'Product title cannot be blank');
ProductSchema.path('description').required(true, 'Product description cannot be blank');
ProductSchema.path('price').required(true, 'Product price cannot be blank');


/**
 * Methods
 */
ProductSchema.methods = {
    addComment: function(user, comment, cb) {
        // Todo: notify producter
        //var notify = require('../mailer');
        this.comments.push({
            star: comment.star,
            body: comment.body,
            user: user._id
        });

        this.save(cb);
    },
    removeComment: function(commentId, cb) {
        var index = utils.indexof(this.comments, { id: commentId });
        if (~index) this.comments.splice(index, 1);
        else return cb('id not found');

        this.save(cb);
    },

    addFavorite: function(user, cb) {
        this.favorites.push({
            user: user._id
        });

        this.save(cb);
    },
    removeFavorite: function(favoriteId, cb) {
        var index = utils.indexof(this.favorites, { id: favoriteId});
        if (~index) this.favorites.splice(index, 1);
        else return cb('id not found');

        this.save(cb);
    },

    addVote: function(user, cb) {
        this.votes.push({
            user: user._id
        });

        this.save(cb);
    },
    removeVote: function(voteId, cb) {
        var index = utils.indexof(this.votes, { id: voteId});
        if (~index) this.votes.splice(index, 1);
        else return cb('id not found');

        this.save(cb);
    }
};

mongoose.model('Product', ProductSchema);
