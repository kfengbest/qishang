'use strict';

var ALY = require('aliyun-sdk');
var fs = require('fs');

exports.uploadImage = function(srcFile, fileName, callback) {
	var bucket = 'cc-al';
    var endpoint = 'http://oss-cn-hangzhou.aliyuncs.com';
    var urlStart = 'http://cc-al.oss-cn-hangzhou.aliyuncs.com/';

    var oss = new ALY.OSS({
        'accessKeyId': 'k8hyn4FLSJScaUCP',
        'secretAccessKey': 'MGHOaCTvvGEeOyY3AY9kVWPtKZ8Tao',
        endpoint: endpoint,
        apiVersion: '2013-10-15'
    });

    // upload by file path
    fs.readFile(srcFile, function(err, data) {
        if (err) {
            return callback(err);
        }

        oss.putObject({
            Bucket: bucket,
            Key: fileName,
            Body: data,
            //AccessControlAllowOrigin: '',
            ContentType: 'image/jpeg',
            CacheControl: 'no-cache', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
            //ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
            //ContentEncoding: 'gzip',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
            //ServerSideEncryption: 'AES256',
            //Expires: ''                       // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
        }, function(err, data) {
            if (err) {
                return callback(err);
            }

            return callback(null, {url: urlStart + fileName});
        });
    });
};
