'use strict';

var container = require('./util/container'),
    traverse = require('./util/traverse'),
    formats = require('./util/formats');

var deref = require('deref');

function generate(schema, refs) {
  var $ = deref();

  try {
    if (Array.isArray(refs)) {
      return traverse($(schema, refs, true));
    } else {
      $.refs = refs || {};
    }

    return traverse($(schema, true));
  } catch (e) {
  	console.log(e.stack);
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

generate.formats = formats;
generate.extend = container.set;

module.exports = generate;
