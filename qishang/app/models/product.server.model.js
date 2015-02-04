'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Getters / Setters for categories
 */
var getCategories= function (categories) {
  return categories.join(',');
};
var setCategories = function (categories) {
  return categories.split(',');
};	

/**
 * Getters / Setters for tags
 */
var getTags = function (tags) {
  return tags.join(',');
};
var setTags = function (tags) {
  return tags.split(',');
};

/**
 * Getters / Setters for usages
 */
var getUsages = function (usages) {
  return usages.join(',');
};
var setUsages = function (usages) {
  return usages.split(',');
};

/**
 * Getters / Setters for promises
 */
var getPromises = function (promises) {
  return promises.join(',');
};
var setPromises = function (promises) {
  return promises.split(',');
};

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	sku: { type: String, default: '', unique: true, trim: true },
	name: { type: String, default: '', trim: true },
	description: { type: String, default: '', trim: true },
	longDescription: { type: String, default: '', trim: true },
	thumbnail: { uri: String, files: [] },
	pictures: [{ uri: String, files: [] }],
	price: { type: Number, default: '9999999' },
	originPrice: { type: Number, default: '0' },

	categories: { type: [],  get: getCategories, set: setCategories }, // 有机/宝石/翡翠/玉石/水晶/玉髓/玛瑙/彩色宝石
	style: { type: String, default: '', trim: true }, // 款式： 项链/吊坠/耳饰/发饰/手链/手镯/戒指/胸针/摆件/把件/其他
	material: { type: String, default: '', trim: true }, // 材质： 石榴石/密蜡
	jadeKind: { type: String, default: '', trim: true }, // 翡翠种地： 不限/冰种/冰糯种/糯种/玻璃种
	size: { type: String, default: '', trim: true },

	tags: { type: [], get: getTags, set: setTags }, // Tag: 热门/最新上架/精品推荐
	usages: { type: [], get: getUsages, set: setUsages }, // 用途： 招财/辟邪
	detail: { type: {} },
	content: { type: String },
	comments: [{
    	star: { type: Number, default: 5},
    	body: { type : String, default : '' },
    	user: { type : Schema.ObjectId, ref : 'User' },
    	createdAt: { type : Date, default : Date.now },
    	state: {type: String, default: 'reviewing', trim: true}
  	}],
  	// 收藏用户链表
	favorite: [ { user: { type : Schema.ObjectId, ref : 'User' } }],
	// 点赞数
    favNumber: { type: Number },

    certificateID: { type: { type: String, default: '', trim: true } },
    certificateImage: { uri: String, files: [] },
    suitTypes: { type: {} },
    state: { type: String, efault: 'onSale' },
    promises: { type: [],  get: getPromises, set: setPromises },
    packageInfo: { type: {} },
	created: { type: Date, default: Date.now }
});

// Todo:
ProductSchema.path('sku').required(true, 'Product sku cannot be blank');
ProductSchema.path('name').required(true, 'Product name cannot be blank');
ProductSchema.path('description').required(true, 'Product description cannot be blank');
ProductSchema.path('price').required(true, 'Product price cannot be blank');


/**
 * Methods
 */
ProductSchema.methods = {
  addComment: function (user, comment, cb) {
    // Todo: notify producter
    //var notify = require('../mailer');

    this.comments.push({
      star: comment.star,
      body: comment.body,
      user: user._id
    });

    this.save(cb);
  },
};

mongoose.model('Product', ProductSchema);