'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
	orderID: {
		type: Number
	},
 	totalPrice: {
 		type: Number
 	},
	created: {
		type: Date,
		default: Date.now
	},
	shipped: {
		type: Date
	},
	customer: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	orderItems: [{
		product: {
			type: Schema.ObjectId,
            ref: 'Product'
		},
		unitPrice: {
			type: Number,
		},
		quantity: {
			type: Number,
			default: 1
		}
	}],

	deliveryInfo: {
		receiverName : {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true
		},
		zipCode: {
			type: String
		},
 		// 固定电话
 		tel:  {
 			type: String
 		},
 		// 手机
 		phone: {
 			type: String
 		}
	},

	invoiceInfo: {
		// 0: person   1: corporation
		type: {
			type: Number,
			default: 0
		},
		content: {
			type: String
		}
	},

	// TODO:
	shipOption: {
		type: String
	},
    
	payment: {
		type: {
			type: String,
		},
		merchant: {
			type: String
		},
		transactionId: {
			type: String
		},
		amount: {
			type: Number
		},
		paidDate: {
			type: Date
		},
		confirmed: {
			type:Boolean,
			default: false
		}
	},

	expressInfo: {
		company: {
			type: String
		},
		id: {
			type: String
		},
		detail: {
			type: String
		}
	},

	comment: {
		type: String
	},
     
	// -1：已取消;  -2: 订单过期; -10：配送失败
	//  0: 待付款； 1： 待确认； 2: 支付已确认； 5： 配送中； 6： 配送完成； 10： 订单关闭
	status: {
		type: Number,
		default: 0
	}
});



mongoose.model('Order', OrderSchema);