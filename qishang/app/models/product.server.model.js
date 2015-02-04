'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	},
	comment: { 
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	state: {
		type: String,
		default: 'reviewing'
	}
});

/**
 * Certificate Schema
 */
var CertificateSchema = new Schema({
	identity: {
		type: String,
		require: true,
		unique: true
	},
	image: {
		type: String
	}
});

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	sku: {
		type: String,
		unique: true,
		required: 'Please fill Product SKU'
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Product name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Product description',
		trim: true
	},
	longDescription: {
		type: String,
		default: '',
		trim: true
	},
	thumbnail: {
		type: String,
		required: 'Please upload Product main picture'
	},
	picture: {
		type: [String],
		default: []
	},
	price: {
		type: Number,
		default: '9999999',
		required: 'Please fill Product price'
	},
	originPrice: {
		type: Number,
		default: '0',
		required: 'Please fill Product original price'
	},
	// 有机/宝石/翡翠/玉石/水晶/玉髓/玛瑙/彩色宝石
	category: {
		type: [String],
		default: [],
		required: 'Please fill Product category'
	},
	// 款式： 项链/吊坠/耳饰/发饰/手链/手镯/戒指/胸针/摆件/把件/其他
	style: {
		type: String,
		default: ''
	},
	// 材质： 石榴石/密蜡
	material: {
		typ: String,
		default: '',
		// required: 'Please fill Product material'
	},
	// 翡翠种地： 不限/冰种/冰糯种/糯种/玻璃种
	jadeKind: {
		type: String,
		default: ''
	},
	size: {
		type: String,
		default: ''
	},
	// Tag: 热门/最新上架/精品推荐
	tag: {
		type: [String],
		default: []
	},
	// 用途： 招财/辟邪
	usage: {
		type: String,
		default: ''
	},
	detail: {
		type: {},
	},
	content: {
		type: String
	},
	comments: {
		type: [CommentSchema],
		default: []
	},
	// 收藏用户链表
	favorite: {
		type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		default: []
	},
	// 点赞数
    favNumber: {
    	type: Number,
    },
    certificate: {
    	type: {type: Schema.Types.ObjectId, ref: 'Certificate'}
    },
    suitTypes: {
    	type: [String]
    },
    state: {
    	type: String,
    	default: 'onSale'
    },
    promise: {
    	type: [String]
    },
    packageInfo: {
    	type: {}
    },
	created: {
		type: Date,
		default: Date.now
	},
});

mongoose.model('Comment', CommentSchema);
mongoose.model('Certificate', CertificateSchema);
mongoose.model('Product', ProductSchema);