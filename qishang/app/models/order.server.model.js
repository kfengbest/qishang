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
 	totalPrice: {
 		type: Number
 	},
	created: {
		type: Date,
		default: Date.now
	},
	shipped: {
		type: Date,
		default: Date.now
	},
	customer: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	orderItem: [{
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

	// TODO:
	shipOption: {
		type: String
	},
    
	payment: {
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

	// -1: Aborted
	// 0: Open, 1: Submitted 
	// 10: deliving
	// 100: completed
	status: {
		type: Number,
		default: 0
	}
});



mongoose.model('Order', OrderSchema);