
var codes = require('http').STATUS_CODES;
var error = require('http-error');
var pascal = require('to-pascal-case');
var wisdom = require('./wisdom');


/**
 * Expose `wrapper`.
 */

module.exports = wrapper;


/**
 * A wrapper that adds wisdom to a normal error.
 *
 * @param {Number} status
 * @param {String} code
 * @param {String} message
 * @param {Object} context (optional)
 */

function wrapper (status, code, message, context) {
  var err = error.apply(this, arguments);
  if (wisdom[err.code]) err.wisdom = wisdom[err.code];
  return err;
}


/**
 * Expose all errors, to keep the API consistent.
 */

for (var key in codes) {
  var name = pascal(codes[key]);
  wrapper[name] = error[name];
}