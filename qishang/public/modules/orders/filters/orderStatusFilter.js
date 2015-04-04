'use strict';

angular.module('orders').filter('orderStatus', function () {
	return function(status) {
		var message;
		// -1：已取消;  -2: 订单过期; -10：配送失败
		//  0: 待付款； 1： 待确认； 2: 支付已确认； 5： 配送中； 6： 配送完成； 10： 订单关闭
		switch(status) {
			case -1:
				message = '已取消';
				break;
			case -2:
				message = '订单过期';
				break;
			case -10:
				message = '配送失败';
				break;
			case 0:
				message = '待付款';
				break;
			case 1:
				message = '待确认';
				break;
			case 2:
				message = '支付已确认';
				break;
			case 5:
				message = '配送中';
				break;
			case 6:
				message = '配送完成';
				break;
			case 10:
				message = '订单关闭';
				break;
			default:
				message = '未知';
				break;
		}

		return message;
	};
});