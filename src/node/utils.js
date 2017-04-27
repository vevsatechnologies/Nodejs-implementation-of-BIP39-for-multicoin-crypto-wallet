var isBuffer = require('is-buffer');
var Virgil = require('../../virgil_js.node');

var utils = {
	bufferToByteArray: function bufferToByteArray (buffer) {
		var array = new Virgil.VirgilByteArray(buffer.length);

		for (var i = 0; i < buffer.length; ++i) {
			array.set(i, buffer[i]);
		}

		return array;
	},

	stringToByteArray: function stringToByteArray (string) {
		var buffer = new Buffer(string, 'utf8');
		return utils.bufferToByteArray(buffer);
	},

	byteArrayToString: function byteArrayToString (byteArray) {
		var buffer = utils.byteArrayToBuffer(byteArray);
		return buffer.toString('utf8');
	},

	byteArrayToBuffer: function byteArrayToBuffer (byteArray) {
		var size = byteArray.size();
		var buffer = new Buffer(size);

		for (var i = 0; i < size; ++i) {
			buffer[i] = byteArray.get(i);
		}

		return buffer;
	},

	toByteArray: function toByteArray (data) {
		switch (true) {
			case Buffer.isBuffer(data):
				return utils.bufferToByteArray(data);
			case typeof data === 'string':
				return utils.stringToByteArray(data);
			default:
				throw new Error('Can\'t convert ' + typeof data + ' to ByteArray.');
		}
	},

	checkIsBuffer: function checkIsBuffer (arg, name) {
		if (!Buffer.isBuffer(arg)) {
			throw new TypeError('Unexpected type of "' + name + '" argument, expected Buffer');
		}
	},

	isVirgilByteArray: function isVirgilByteArray(obj) {
		return obj && obj.constructor && obj.constructor.name === '_exports_VirgilByteArray';
	},

	isBuffer: isBuffer,

	toArray: function toArray(obj) {
		return Array.isArray(obj) ? obj : (obj ? [obj] : obj);
	},

	byteArraysEqual: function byteArraysEqual(a, b) {
		var aLen = a.size();
		var bLen = b.size();

		if (aLen !== bLen) {
			return false;
		}

		for (var i = 0; i < aLen; i++) {
			if (a.get(i) !== b.get(i)) {
				return false;
			}
		}

		return true;
	}
};

module.exports = utils;
