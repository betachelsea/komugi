(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = require('jquery');
var ol = require('openlayers');
var Komugi = require('./js/komugi');

$(function() {
  var komugi = new Komugi();
  alert( "komugi level" + komugi.level );
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      })
    ],
    view: new ol.View({
      center: ol.proj.transform([37.41, 8.82],  'EPSG:4326', 'EPSG:3857'),
      zoom: 4
    })
  });
});

},{"./js/komugi":4,"jquery":2,"openlayers":3}],2:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],3:[function(require,module,exports){
// OpenLayers 3. See http://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
// Version: v3.4.0

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.ol = factory();
  }
}(this, function () {
  var OPENLAYERS = {};
  var l,aa=aa||{},ba=this;function m(b){return void 0!==b}function t(b,c,d){b=b.split(".");d=d||ba;b[0]in d||!d.execScript||d.execScript("var "+b[0]);for(var e;b.length&&(e=b.shift());)!b.length&&m(c)?d[e]=c:d[e]?d=d[e]:d=d[e]={}}function ca(){}function da(b){b.Pa=function(){return b.xf?b.xf:b.xf=new b}}
function ea(b){var c=typeof b;if("object"==c)if(b){if(b instanceof Array)return"array";if(b instanceof Object)return c;var d=Object.prototype.toString.call(b);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof b.length&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof b.call)return"object";return c}function fa(b){return null===b}function ga(b){return"array"==ea(b)}function ha(b){var c=ea(b);return"array"==c||"object"==c&&"number"==typeof b.length}function ia(b){return"string"==typeof b}function ja(b){return"number"==typeof b}function ka(b){return"function"==ea(b)}function la(b){var c=typeof b;return"object"==c&&null!=b||"function"==c}function ma(b){return b[na]||(b[na]=++oa)}
var na="closure_uid_"+(1E9*Math.random()>>>0),oa=0;function pa(b,c,d){return b.call.apply(b.bind,arguments)}function qa(b,c,d){if(!b)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,e);return b.apply(c,d)}}return function(){return b.apply(c,arguments)}}
function ra(b,c,d){ra=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?pa:qa;return ra.apply(null,arguments)}function sa(b,c){var d=Array.prototype.slice.call(arguments,1);return function(){var c=d.slice();c.push.apply(c,arguments);return b.apply(this,c)}}var ta=Date.now||function(){return+new Date};
function v(b,c){function d(){}d.prototype=c.prototype;b.T=c.prototype;b.prototype=new d;b.prototype.constructor=b;b.Qm=function(b,d,g){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return c.prototype[d].apply(b,h)}};var ua,va;function wa(b){if(Error.captureStackTrace)Error.captureStackTrace(this,wa);else{var c=Error().stack;c&&(this.stack=c)}b&&(this.message=String(b))}v(wa,Error);wa.prototype.name="CustomError";var xa;function ya(b,c){var d=b.length-c.length;return 0<=d&&b.indexOf(c,d)==d}function za(b,c){for(var d=b.split("%s"),e="",f=Array.prototype.slice.call(arguments,1);f.length&&1<d.length;)e+=d.shift()+f.shift();return e+d.join("%s")}var Aa=String.prototype.trim?function(b){return b.trim()}:function(b){return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function Ba(b){if(!Da.test(b))return b;-1!=b.indexOf("&")&&(b=b.replace(Ea,"&amp;"));-1!=b.indexOf("<")&&(b=b.replace(Fa,"&lt;"));-1!=b.indexOf(">")&&(b=b.replace(Ga,"&gt;"));-1!=b.indexOf('"')&&(b=b.replace(Ha,"&quot;"));-1!=b.indexOf("'")&&(b=b.replace(Ia,"&#39;"));-1!=b.indexOf("\x00")&&(b=b.replace(Ja,"&#0;"));return b}var Ea=/&/g,Fa=/</g,Ga=/>/g,Ha=/"/g,Ia=/'/g,Ja=/\x00/g,Da=/[\x00&<>"']/;
function Ka(b){b=m(void 0)?b.toFixed(void 0):String(b);var c=b.indexOf(".");-1==c&&(c=b.length);c=Math.max(0,2-c);return Array(c+1).join("0")+b}
function La(b,c){for(var d=0,e=Aa(String(b)).split("."),f=Aa(String(c)).split("."),g=Math.max(e.length,f.length),h=0;0==d&&h<g;h++){var k=e[h]||"",n=f[h]||"",p=RegExp("(\\d*)(\\D*)","g"),q=RegExp("(\\d*)(\\D*)","g");do{var r=p.exec(k)||["","",""],s=q.exec(n)||["","",""];if(0==r[0].length&&0==s[0].length)break;d=Na(0==r[1].length?0:parseInt(r[1],10),0==s[1].length?0:parseInt(s[1],10))||Na(0==r[2].length,0==s[2].length)||Na(r[2],s[2])}while(0==d)}return d}function Na(b,c){return b<c?-1:b>c?1:0};var Oa=Array.prototype;function Pa(b,c){return Oa.indexOf.call(b,c,void 0)}function Qa(b,c,d){Oa.forEach.call(b,c,d)}function Ra(b,c){return Oa.filter.call(b,c,void 0)}function Sa(b,c,d){return Oa.map.call(b,c,d)}function Ta(b,c){return Oa.some.call(b,c,void 0)}function Ua(b,c){var d=Va(b,c,void 0);return 0>d?null:ia(b)?b.charAt(d):b[d]}function Va(b,c,d){for(var e=b.length,f=ia(b)?b.split(""):b,g=0;g<e;g++)if(g in f&&c.call(d,f[g],g,b))return g;return-1}function Wa(b,c){return 0<=Pa(b,c)}
function Xa(b,c){var d=Pa(b,c),e;(e=0<=d)&&Oa.splice.call(b,d,1);return e}function Ya(b){return Oa.concat.apply(Oa,arguments)}function Za(b){var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];return d}return[]}function ab(b,c){for(var d=1;d<arguments.length;d++){var e=arguments[d];if(ha(e)){var f=b.length||0,g=e.length||0;b.length=f+g;for(var h=0;h<g;h++)b[f+h]=e[h]}else b.push(e)}}function bb(b,c,d,e){Oa.splice.apply(b,cb(arguments,1))}
function cb(b,c,d){return 2>=arguments.length?Oa.slice.call(b,c):Oa.slice.call(b,c,d)}function db(b,c){b.sort(c||fb)}function gb(b,c){if(!ha(b)||!ha(c)||b.length!=c.length)return!1;for(var d=b.length,e=hb,f=0;f<d;f++)if(!e(b[f],c[f]))return!1;return!0}function fb(b,c){return b>c?1:b<c?-1:0}function hb(b,c){return b===c};var ib;a:{var jb=ba.navigator;if(jb){var kb=jb.userAgent;if(kb){ib=kb;break a}}ib=""}function lb(b){return-1!=ib.indexOf(b)};function mb(b,c,d){for(var e in b)c.call(d,b[e],e,b)}function ob(b,c){for(var d in b)if(c.call(void 0,b[d],d,b))return!0;return!1}function pb(b){var c=0,d;for(d in b)c++;return c}function qb(b){var c=[],d=0,e;for(e in b)c[d++]=b[e];return c}function rb(b){var c=[],d=0,e;for(e in b)c[d++]=e;return c}function tb(b,c){return c in b}function ub(b,c){for(var d in b)if(b[d]==c)return!0;return!1}function vb(b,c){for(var d in b)if(c.call(void 0,b[d],d,b))return d}
function wb(b){for(var c in b)return!1;return!0}function xb(b){for(var c in b)delete b[c]}function yb(b,c){c in b&&delete b[c]}function zb(b,c,d){return c in b?b[c]:d}function Ab(b,c){var d=[];return c in b?b[c]:b[c]=d}function Bb(b){var c={},d;for(d in b)c[d]=b[d];return c}var Cb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Db(b,c){for(var d,e,f=1;f<arguments.length;f++){e=arguments[f];for(d in e)b[d]=e[d];for(var g=0;g<Cb.length;g++)d=Cb[g],Object.prototype.hasOwnProperty.call(e,d)&&(b[d]=e[d])}}function Eb(b){var c=arguments.length;if(1==c&&ga(arguments[0]))return Eb.apply(null,arguments[0]);for(var d={},e=0;e<c;e++)d[arguments[e]]=!0;return d};var Fb=lb("Opera")||lb("OPR"),Gb=lb("Trident")||lb("MSIE"),Hb=lb("Gecko")&&-1==ib.toLowerCase().indexOf("webkit")&&!(lb("Trident")||lb("MSIE")),Ib=-1!=ib.toLowerCase().indexOf("webkit"),Jb=lb("Macintosh"),Kb=lb("Windows"),Lb=lb("Linux")||lb("CrOS");function Mb(){var b=ba.document;return b?b.documentMode:void 0}
var Nb=function(){var b="",c;if(Fb&&ba.opera)return b=ba.opera.version,ka(b)?b():b;Hb?c=/rv\:([^\);]+)(\)|;)/:Gb?c=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Ib&&(c=/WebKit\/(\S+)/);c&&(b=(b=c.exec(ib))?b[1]:"");return Gb&&(c=Mb(),c>parseFloat(b))?String(c):b}(),Ob={};function Pb(b){return Ob[b]||(Ob[b]=0<=La(Nb,b))}var Qb=ba.document,Rb=Qb&&Gb?Mb()||("CSS1Compat"==Qb.compatMode?parseInt(Nb,10):5):void 0;var Sb="https:"===ba.location.protocol,Tb=Gb&&!Pb("9.0")&&""!==Nb;function Vb(b,c,d){return Math.min(Math.max(b,c),d)}function Wb(b,c){var d=b%c;return 0>d*c?d+c:d}function Xb(b,c,d){return b+d*(c-b)}function Yb(b){return b*Math.PI/180};function Zb(b){return function(c){if(m(c))return[Vb(c[0],b[0],b[2]),Vb(c[1],b[1],b[3])]}}function $b(b){return b};function ac(b,c,d){var e=b.length;if(b[0]<=c)return 0;if(!(c<=b[e-1]))if(0<d)for(d=1;d<e;++d){if(b[d]<c)return d-1}else if(0>d)for(d=1;d<e;++d){if(b[d]<=c)return d}else for(d=1;d<e;++d){if(b[d]==c)return d;if(b[d]<c)return b[d-1]-c<c-b[d]?d-1:d}return e-1};function bc(b){return function(c,d,e){if(m(c))return c=ac(b,c,e),c=Vb(c+d,0,b.length-1),b[c]}}function cc(b,c,d){return function(e,f,g){if(m(e))return g=0<g?0:0>g?1:.5,e=Math.floor(Math.log(c/e)/Math.log(b)+g),f=Math.max(e+f,0),m(d)&&(f=Math.min(f,d)),c/Math.pow(b,f)}};function dc(b){if(m(b))return 0}function ec(b,c){if(m(b))return b+c}function fc(b){var c=2*Math.PI/b;return function(b,e){if(m(b))return b=Math.floor((b+e)/c+.5)*c}}function gc(){var b=Yb(5);return function(c,d){if(m(c))return Math.abs(c+d)<=b?0:c+d}};function hc(b,c,d){this.center=b;this.resolution=c;this.rotation=d};var ic=!Gb||Gb&&9<=Rb,jc=!Gb||Gb&&9<=Rb,kc=Gb&&!Pb("9");!Ib||Pb("528");Hb&&Pb("1.9b")||Gb&&Pb("8")||Fb&&Pb("9.5")||Ib&&Pb("528");Hb&&!Pb("8")||Gb&&Pb("9");function lc(){0!=mc&&(nc[ma(this)]=this);this.oa=this.oa;this.qa=this.qa}var mc=0,nc={};lc.prototype.oa=!1;lc.prototype.Jc=function(){if(!this.oa&&(this.oa=!0,this.P(),0!=mc)){var b=ma(this);delete nc[b]}};function oc(b,c){var d=sa(pc,c);b.oa?d.call(void 0):(b.qa||(b.qa=[]),b.qa.push(m(void 0)?ra(d,void 0):d))}lc.prototype.P=function(){if(this.qa)for(;this.qa.length;)this.qa.shift()()};function pc(b){b&&"function"==typeof b.Jc&&b.Jc()};function qc(b,c){this.type=b;this.b=this.target=c;this.e=!1;this.og=!0}qc.prototype.pb=function(){this.e=!0};qc.prototype.preventDefault=function(){this.og=!1};function rc(b){b.pb()}function tc(b){b.preventDefault()};var uc=Gb?"focusout":"DOMFocusOut";function vc(b){vc[" "](b);return b}vc[" "]=ca;function wc(b,c){qc.call(this,b?b.type:"");this.relatedTarget=this.b=this.target=null;this.i=this.f=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.k=this.d=this.c=this.n=!1;this.state=null;this.g=!1;this.a=null;b&&xc(this,b,c)}v(wc,qc);var yc=[1,4,2];
function xc(b,c,d){b.a=c;var e=b.type=c.type;b.target=c.target||c.srcElement;b.b=d;if(d=c.relatedTarget){if(Hb){var f;a:{try{vc(d.nodeName);f=!0;break a}catch(g){}f=!1}f||(d=null)}}else"mouseover"==e?d=c.fromElement:"mouseout"==e&&(d=c.toElement);b.relatedTarget=d;Object.defineProperties?Object.defineProperties(b,{offsetX:{configurable:!0,enumerable:!0,get:b.of,set:b.cm},offsetY:{configurable:!0,enumerable:!0,get:b.pf,set:b.dm}}):(b.offsetX=b.of(),b.offsetY=b.pf());b.clientX=void 0!==c.clientX?c.clientX:
c.pageX;b.clientY=void 0!==c.clientY?c.clientY:c.pageY;b.screenX=c.screenX||0;b.screenY=c.screenY||0;b.button=c.button;b.f=c.keyCode||0;b.i=c.charCode||("keypress"==e?c.keyCode:0);b.n=c.ctrlKey;b.c=c.altKey;b.d=c.shiftKey;b.k=c.metaKey;b.g=Jb?c.metaKey:c.ctrlKey;b.state=c.state;c.defaultPrevented&&b.preventDefault()}function zc(b){return(ic?0==b.a.button:"click"==b.type?!0:!!(b.a.button&yc[0]))&&!(Ib&&Jb&&b.n)}l=wc.prototype;
l.pb=function(){wc.T.pb.call(this);this.a.stopPropagation?this.a.stopPropagation():this.a.cancelBubble=!0};l.preventDefault=function(){wc.T.preventDefault.call(this);var b=this.a;if(b.preventDefault)b.preventDefault();else if(b.returnValue=!1,kc)try{if(b.ctrlKey||112<=b.keyCode&&123>=b.keyCode)b.keyCode=-1}catch(c){}};l.zh=function(){return this.a};l.of=function(){return Ib||void 0!==this.a.offsetX?this.a.offsetX:this.a.layerX};
l.cm=function(b){Object.defineProperties(this,{offsetX:{writable:!0,enumerable:!0,configurable:!0,value:b}})};l.pf=function(){return Ib||void 0!==this.a.offsetY?this.a.offsetY:this.a.layerY};l.dm=function(b){Object.defineProperties(this,{offsetY:{writable:!0,enumerable:!0,configurable:!0,value:b}})};var Ac="closure_listenable_"+(1E6*Math.random()|0);function Bc(b){return!(!b||!b[Ac])}var Cc=0;function Dc(b,c,d,e,f){this.$b=b;this.a=null;this.src=c;this.type=d;this.Bc=!!e;this.yd=f;this.key=++Cc;this.uc=this.cd=!1}function Ec(b){b.uc=!0;b.$b=null;b.a=null;b.src=null;b.yd=null};function Fc(b){this.src=b;this.a={};this.c=0}Fc.prototype.add=function(b,c,d,e,f){var g=b.toString();b=this.a[g];b||(b=this.a[g]=[],this.c++);var h=Gc(b,c,e,f);-1<h?(c=b[h],d||(c.cd=!1)):(c=new Dc(c,this.src,g,!!e,f),c.cd=d,b.push(c));return c};Fc.prototype.remove=function(b,c,d,e){b=b.toString();if(!(b in this.a))return!1;var f=this.a[b];c=Gc(f,c,d,e);return-1<c?(Ec(f[c]),Oa.splice.call(f,c,1),0==f.length&&(delete this.a[b],this.c--),!0):!1};
function Hc(b,c){var d=c.type;if(!(d in b.a))return!1;var e=Xa(b.a[d],c);e&&(Ec(c),0==b.a[d].length&&(delete b.a[d],b.c--));return e}function Ic(b,c,d,e,f){b=b.a[c.toString()];c=-1;b&&(c=Gc(b,d,e,f));return-1<c?b[c]:null}function Jc(b,c,d){var e=m(c),f=e?c.toString():"",g=m(d);return ob(b.a,function(b){for(var c=0;c<b.length;++c)if(!(e&&b[c].type!=f||g&&b[c].Bc!=d))return!0;return!1})}
function Gc(b,c,d,e){for(var f=0;f<b.length;++f){var g=b[f];if(!g.uc&&g.$b==c&&g.Bc==!!d&&g.yd==e)return f}return-1};var Kc="closure_lm_"+(1E6*Math.random()|0),Lc={},Nc=0;function w(b,c,d,e,f){if(ga(c)){for(var g=0;g<c.length;g++)w(b,c[g],d,e,f);return null}d=Oc(d);return Bc(b)?b.Ra(c,d,e,f):Pc(b,c,d,!1,e,f)}function Pc(b,c,d,e,f,g){if(!c)throw Error("Invalid event type");var h=!!f,k=Qc(b);k||(b[Kc]=k=new Fc(b));d=k.add(c,d,e,f,g);if(d.a)return d;e=Rc();d.a=e;e.src=b;e.$b=d;b.addEventListener?b.addEventListener(c.toString(),e,h):b.attachEvent(Sc(c.toString()),e);Nc++;return d}
function Rc(){var b=Tc,c=jc?function(d){return b.call(c.src,c.$b,d)}:function(d){d=b.call(c.src,c.$b,d);if(!d)return d};return c}function Uc(b,c,d,e,f){if(ga(c)){for(var g=0;g<c.length;g++)Uc(b,c[g],d,e,f);return null}d=Oc(d);return Bc(b)?b.mb.add(String(c),d,!0,e,f):Pc(b,c,d,!0,e,f)}function Vc(b,c,d,e,f){if(ga(c))for(var g=0;g<c.length;g++)Vc(b,c[g],d,e,f);else d=Oc(d),Bc(b)?b.Me(c,d,e,f):b&&(b=Qc(b))&&(c=Ic(b,c,d,!!e,f))&&Wc(c)}
function Wc(b){if(ja(b)||!b||b.uc)return!1;var c=b.src;if(Bc(c))return Hc(c.mb,b);var d=b.type,e=b.a;c.removeEventListener?c.removeEventListener(d,e,b.Bc):c.detachEvent&&c.detachEvent(Sc(d),e);Nc--;(d=Qc(c))?(Hc(d,b),0==d.c&&(d.src=null,c[Kc]=null)):Ec(b);return!0}function Sc(b){return b in Lc?Lc[b]:Lc[b]="on"+b}function Xc(b,c,d,e){var f=!0;if(b=Qc(b))if(c=b.a[c.toString()])for(c=c.concat(),b=0;b<c.length;b++){var g=c[b];g&&g.Bc==d&&!g.uc&&(g=Yc(g,e),f=f&&!1!==g)}return f}
function Yc(b,c){var d=b.$b,e=b.yd||b.src;b.cd&&Wc(b);return d.call(e,c)}
function Tc(b,c){if(b.uc)return!0;if(!jc){var d;if(!(d=c))a:{d=["window","event"];for(var e=ba,f;f=d.shift();)if(null!=e[f])e=e[f];else{d=null;break a}d=e}f=d;d=new wc(f,this);e=!0;if(!(0>f.keyCode||void 0!=f.returnValue)){a:{var g=!1;if(0==f.keyCode)try{f.keyCode=-1;break a}catch(h){g=!0}if(g||void 0==f.returnValue)f.returnValue=!0}f=[];for(g=d.b;g;g=g.parentNode)f.push(g);for(var g=b.type,k=f.length-1;!d.e&&0<=k;k--){d.b=f[k];var n=Xc(f[k],g,!0,d),e=e&&n}for(k=0;!d.e&&k<f.length;k++)d.b=f[k],n=
Xc(f[k],g,!1,d),e=e&&n}return e}return Yc(b,new wc(c,this))}function Qc(b){b=b[Kc];return b instanceof Fc?b:null}var Zc="__closure_events_fn_"+(1E9*Math.random()>>>0);function Oc(b){if(ka(b))return b;b[Zc]||(b[Zc]=function(c){return b.handleEvent(c)});return b[Zc]};function $c(b){return function(){return b}}var ad=$c(!1),bd=$c(!0),cd=$c(null);function dd(b){return b}function ed(b){var c;c=c||0;return function(){return b.apply(this,Array.prototype.slice.call(arguments,0,c))}}function fd(b){var c=arguments,d=c.length;return function(){for(var b,f=0;f<d;f++)b=c[f].apply(this,arguments);return b}}function gd(b){var c=arguments,d=c.length;return function(){for(var b=0;b<d;b++)if(!c[b].apply(this,arguments))return!1;return!0}};function hd(){lc.call(this);this.mb=new Fc(this);this.ph=this;this.he=null}v(hd,lc);hd.prototype[Ac]=!0;l=hd.prototype;l.addEventListener=function(b,c,d,e){w(this,b,c,d,e)};l.removeEventListener=function(b,c,d,e){Vc(this,b,c,d,e)};
l.dispatchEvent=function(b){var c,d=this.he;if(d)for(c=[];d;d=d.he)c.push(d);var d=this.ph,e=b.type||b;if(ia(b))b=new qc(b,d);else if(b instanceof qc)b.target=b.target||d;else{var f=b;b=new qc(e,d);Db(b,f)}var f=!0,g;if(c)for(var h=c.length-1;!b.e&&0<=h;h--)g=b.b=c[h],f=id(g,e,!0,b)&&f;b.e||(g=b.b=d,f=id(g,e,!0,b)&&f,b.e||(f=id(g,e,!1,b)&&f));if(c)for(h=0;!b.e&&h<c.length;h++)g=b.b=c[h],f=id(g,e,!1,b)&&f;return f};
l.P=function(){hd.T.P.call(this);if(this.mb){var b=this.mb,c=0,d;for(d in b.a){for(var e=b.a[d],f=0;f<e.length;f++)++c,Ec(e[f]);delete b.a[d];b.c--}}this.he=null};l.Ra=function(b,c,d,e){return this.mb.add(String(b),c,!1,d,e)};l.Me=function(b,c,d,e){return this.mb.remove(String(b),c,d,e)};
function id(b,c,d,e){c=b.mb.a[String(c)];if(!c)return!0;c=c.concat();for(var f=!0,g=0;g<c.length;++g){var h=c[g];if(h&&!h.uc&&h.Bc==d){var k=h.$b,n=h.yd||h.src;h.cd&&Hc(b.mb,h);f=!1!==k.call(n,e)&&f}}return f&&0!=e.og}function jd(b,c,d){return Jc(b.mb,m(c)?String(c):void 0,d)};function kd(){hd.call(this);this.c=0}v(kd,hd);function ld(b){Wc(b)}l=kd.prototype;l.l=function(){++this.c;this.dispatchEvent("change")};l.u=function(){return this.c};l.s=function(b,c,d){return w(this,b,c,!1,d)};l.v=function(b,c,d){return Uc(this,b,c,!1,d)};l.t=function(b,c,d){Vc(this,b,c,!1,d)};l.A=ld;function md(b,c,d){qc.call(this,b);this.key=c;this.oldValue=d}v(md,qc);function nd(b,c,d,e){this.source=b;this.target=c;this.b=d;this.c=e;this.d=this.a=dd}nd.prototype.transform=function(b,c){var d=od(this.source,this.b);this.a=b;this.d=c;pd(this.source,this.b,d)};function qd(b){kd.call(this);ma(this);this.n={};this.Da={};this.ge={};m(b)&&this.C(b)}v(qd,kd);var rd={},sd={},td={};function ud(b){return rd.hasOwnProperty(b)?rd[b]:rd[b]="change:"+b}
function od(b,c){var d=sd.hasOwnProperty(c)?sd[c]:sd[c]="get"+(String(c.charAt(0)).toUpperCase()+String(c.substr(1)).toLowerCase()),d=b[d];return m(d)?d.call(b):b.get(c)}l=qd.prototype;l.K=function(b,c,d){d=d||b;this.L(b);var e=ud(d);this.ge[b]=w(c,e,function(c){pd(this,b,c.oldValue)},void 0,this);c=new nd(this,c,b,d);this.Da[b]=c;pd(this,b,this.n[b]);return c};l.get=function(b){var c,d=this.Da;d.hasOwnProperty(b)?(b=d[b],c=od(b.target,b.c),c=b.d(c)):this.n.hasOwnProperty(b)&&(c=this.n[b]);return c};
l.G=function(){var b=this.Da,c;if(wb(this.n)){if(wb(b))return[];c=b}else if(wb(b))c=this.n;else{c={};for(var d in this.n)c[d]=!0;for(d in b)c[d]=!0}return rb(c)};l.I=function(){var b={},c;for(c in this.n)b[c]=this.n[c];for(c in this.Da)b[c]=this.get(c);return b};function pd(b,c,d){var e;e=ud(c);b.dispatchEvent(new md(e,c,d));b.dispatchEvent(new md("propertychange",c,d))}
l.set=function(b,c){var d=this.Da;if(d.hasOwnProperty(b)){var e=d[b];c=e.a(c);var d=e.target,e=e.c,f=c,g=td.hasOwnProperty(e)?td[e]:td[e]="set"+(String(e.charAt(0)).toUpperCase()+String(e.substr(1)).toLowerCase()),g=d[g];m(g)?g.call(d,f):d.set(e,f)}else d=this.n[b],this.n[b]=c,pd(this,b,d)};l.C=function(b){for(var c in b)this.set(c,b[c])};l.L=function(b){var c=this.ge,d=c[b];d&&(delete c[b],Wc(d),c=this.get(b),delete this.Da[b],this.n[b]=c)};l.M=function(){for(var b in this.ge)this.L(b)};function vd(b,c){b[0]+=c[0];b[1]+=c[1];return b}function wd(b,c){var d=b[0],e=b[1],f=c[0],g=c[1],h=f[0],f=f[1],k=g[0],g=g[1],n=k-h,p=g-f,d=0===n&&0===p?0:(n*(d-h)+p*(e-f))/(n*n+p*p||0);0>=d||(1<=d?(h=k,f=g):(h+=d*n,f+=d*p));return[h,f]}function xd(b,c){var d=Wb(b+180,360)-180,e=Math.abs(Math.round(3600*d));return Math.floor(e/3600)+"\u00b0 "+Math.floor(e/60%60)+"\u2032 "+Math.floor(e%60)+"\u2033 "+c.charAt(0>d?1:0)}
function yd(b,c,d){return m(b)?c.replace("{x}",b[0].toFixed(d)).replace("{y}",b[1].toFixed(d)):""}function zd(b,c){for(var d=!0,e=b.length-1;0<=e;--e)if(b[e]!=c[e]){d=!1;break}return d}function Ad(b,c){var d=Math.cos(c),e=Math.sin(c),f=b[1]*d+b[0]*e;b[0]=b[0]*d-b[1]*e;b[1]=f;return b}function Bd(b,c){var d=b[0]-c[0],e=b[1]-c[1];return d*d+e*e}function Cd(b,c){return yd(b,"{x}, {y}",c)};function Dd(b){this.length=b.length||b;for(var c=0;c<this.length;c++)this[c]=b[c]||0}Dd.prototype.a=4;Dd.prototype.set=function(b,c){c=c||0;for(var d=0;d<b.length&&c+d<this.length;d++)this[c+d]=b[d]};Dd.prototype.toString=Array.prototype.join;"undefined"==typeof Float32Array&&(Dd.BYTES_PER_ELEMENT=4,Dd.prototype.BYTES_PER_ELEMENT=Dd.prototype.a,Dd.prototype.set=Dd.prototype.set,Dd.prototype.toString=Dd.prototype.toString,t("Float32Array",Dd,void 0));function Ed(b){this.length=b.length||b;for(var c=0;c<this.length;c++)this[c]=b[c]||0}Ed.prototype.a=8;Ed.prototype.set=function(b,c){c=c||0;for(var d=0;d<b.length&&c+d<this.length;d++)this[c+d]=b[d]};Ed.prototype.toString=Array.prototype.join;if("undefined"==typeof Float64Array){try{Ed.BYTES_PER_ELEMENT=8}catch(Fd){}Ed.prototype.BYTES_PER_ELEMENT=Ed.prototype.a;Ed.prototype.set=Ed.prototype.set;Ed.prototype.toString=Ed.prototype.toString;t("Float64Array",Ed,void 0)};function Gd(b,c,d,e,f){b[0]=c;b[1]=d;b[2]=e;b[3]=f};function Hd(){var b=Array(16);Id(b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);return b}function Jd(){var b=Array(16);Id(b,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return b}function Id(b,c,d,e,f,g,h,k,n,p,q,r,s,u,y,z,A){b[0]=c;b[1]=d;b[2]=e;b[3]=f;b[4]=g;b[5]=h;b[6]=k;b[7]=n;b[8]=p;b[9]=q;b[10]=r;b[11]=s;b[12]=u;b[13]=y;b[14]=z;b[15]=A}
function Kd(b,c){b[0]=c[0];b[1]=c[1];b[2]=c[2];b[3]=c[3];b[4]=c[4];b[5]=c[5];b[6]=c[6];b[7]=c[7];b[8]=c[8];b[9]=c[9];b[10]=c[10];b[11]=c[11];b[12]=c[12];b[13]=c[13];b[14]=c[14];b[15]=c[15]}function Ld(b){b[0]=1;b[1]=0;b[2]=0;b[3]=0;b[4]=0;b[5]=1;b[6]=0;b[7]=0;b[8]=0;b[9]=0;b[10]=1;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1}
function Md(b,c,d){var e=b[0],f=b[1],g=b[2],h=b[3],k=b[4],n=b[5],p=b[6],q=b[7],r=b[8],s=b[9],u=b[10],y=b[11],z=b[12],A=b[13],E=b[14];b=b[15];var x=c[0],Q=c[1],N=c[2],L=c[3],U=c[4],Ca=c[5],eb=c[6],R=c[7],Ma=c[8],sb=c[9],$a=c[10],Ub=c[11],nb=c[12],Mc=c[13],sc=c[14];c=c[15];d[0]=e*x+k*Q+r*N+z*L;d[1]=f*x+n*Q+s*N+A*L;d[2]=g*x+p*Q+u*N+E*L;d[3]=h*x+q*Q+y*N+b*L;d[4]=e*U+k*Ca+r*eb+z*R;d[5]=f*U+n*Ca+s*eb+A*R;d[6]=g*U+p*Ca+u*eb+E*R;d[7]=h*U+q*Ca+y*eb+b*R;d[8]=e*Ma+k*sb+r*$a+z*Ub;d[9]=f*Ma+n*sb+s*$a+A*Ub;d[10]=
g*Ma+p*sb+u*$a+E*Ub;d[11]=h*Ma+q*sb+y*$a+b*Ub;d[12]=e*nb+k*Mc+r*sc+z*c;d[13]=f*nb+n*Mc+s*sc+A*c;d[14]=g*nb+p*Mc+u*sc+E*c;d[15]=h*nb+q*Mc+y*sc+b*c}
function Nd(b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],k=b[5],n=b[6],p=b[7],q=b[8],r=b[9],s=b[10],u=b[11],y=b[12],z=b[13],A=b[14],E=b[15],x=d*k-e*h,Q=d*n-f*h,N=d*p-g*h,L=e*n-f*k,U=e*p-g*k,Ca=f*p-g*n,eb=q*z-r*y,R=q*A-s*y,Ma=q*E-u*y,sb=r*A-s*z,$a=r*E-u*z,Ub=s*E-u*A,nb=x*Ub-Q*$a+N*sb+L*Ma-U*R+Ca*eb;0!=nb&&(nb=1/nb,c[0]=(k*Ub-n*$a+p*sb)*nb,c[1]=(-e*Ub+f*$a-g*sb)*nb,c[2]=(z*Ca-A*U+E*L)*nb,c[3]=(-r*Ca+s*U-u*L)*nb,c[4]=(-h*Ub+n*Ma-p*R)*nb,c[5]=(d*Ub-f*Ma+g*R)*nb,c[6]=(-y*Ca+A*N-E*Q)*nb,c[7]=(q*Ca-s*N+u*
Q)*nb,c[8]=(h*$a-k*Ma+p*eb)*nb,c[9]=(-d*$a+e*Ma-g*eb)*nb,c[10]=(y*U-z*N+E*x)*nb,c[11]=(-q*U+r*N-u*x)*nb,c[12]=(-h*sb+k*R-n*eb)*nb,c[13]=(d*sb-e*R+f*eb)*nb,c[14]=(-y*L+z*Q-A*x)*nb,c[15]=(q*L-r*Q+s*x)*nb)}function Od(b,c,d){var e=b[1]*c+b[5]*d+0*b[9]+b[13],f=b[2]*c+b[6]*d+0*b[10]+b[14],g=b[3]*c+b[7]*d+0*b[11]+b[15];b[12]=b[0]*c+b[4]*d+0*b[8]+b[12];b[13]=e;b[14]=f;b[15]=g}
function Pd(b,c,d){Id(b,b[0]*c,b[1]*c,b[2]*c,b[3]*c,b[4]*d,b[5]*d,b[6]*d,b[7]*d,1*b[8],1*b[9],1*b[10],1*b[11],b[12],b[13],b[14],b[15])}function Qd(b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],k=b[5],n=b[6],p=b[7],q=Math.cos(c),r=Math.sin(c);b[0]=d*q+h*r;b[1]=e*q+k*r;b[2]=f*q+n*r;b[3]=g*q+p*r;b[4]=d*-r+h*q;b[5]=e*-r+k*q;b[6]=f*-r+n*q;b[7]=g*-r+p*q}new Float64Array(3);new Float64Array(3);new Float64Array(4);new Float64Array(4);new Float64Array(4);new Float64Array(16);function Rd(b){for(var c=Sd(),d=0,e=b.length;d<e;++d)Td(c,b[d]);return c}function Ud(b,c,d){var e=Math.min.apply(null,b),f=Math.min.apply(null,c);b=Math.max.apply(null,b);c=Math.max.apply(null,c);return Vd(e,f,b,c,d)}function Wd(b,c,d){return m(d)?(d[0]=b[0]-c,d[1]=b[1]-c,d[2]=b[2]+c,d[3]=b[3]+c,d):[b[0]-c,b[1]-c,b[2]+c,b[3]+c]}function Xd(b,c){return m(c)?(c[0]=b[0],c[1]=b[1],c[2]=b[2],c[3]=b[3],c):b.slice()}
function Yd(b,c,d){c=c<b[0]?b[0]-c:b[2]<c?c-b[2]:0;b=d<b[1]?b[1]-d:b[3]<d?d-b[3]:0;return c*c+b*b}function Zd(b,c){return b[0]<=c[0]&&c[2]<=b[2]&&b[1]<=c[1]&&c[3]<=b[3]}function $d(b,c,d){return b[0]<=c&&c<=b[2]&&b[1]<=d&&d<=b[3]}function ae(b,c){var d=b[1],e=b[2],f=b[3],g=c[0],h=c[1],k=0;g<b[0]?k=k|16:g>e&&(k=k|4);h<d?k|=8:h>f&&(k|=2);0===k&&(k=1);return k}function Sd(){return[Infinity,Infinity,-Infinity,-Infinity]}function Vd(b,c,d,e,f){return m(f)?(f[0]=b,f[1]=c,f[2]=d,f[3]=e,f):[b,c,d,e]}
function be(b,c){var d=b[0],e=b[1];return Vd(d,e,d,e,c)}function ce(b,c){return b[0]==c[0]&&b[2]==c[2]&&b[1]==c[1]&&b[3]==c[3]}function de(b,c){c[0]<b[0]&&(b[0]=c[0]);c[2]>b[2]&&(b[2]=c[2]);c[1]<b[1]&&(b[1]=c[1]);c[3]>b[3]&&(b[3]=c[3]);return b}function Td(b,c){c[0]<b[0]&&(b[0]=c[0]);c[0]>b[2]&&(b[2]=c[0]);c[1]<b[1]&&(b[1]=c[1]);c[1]>b[3]&&(b[3]=c[1])}
function ee(b,c,d,e,f){for(;d<e;d+=f){var g=b,h=c[d],k=c[d+1];g[0]=Math.min(g[0],h);g[1]=Math.min(g[1],k);g[2]=Math.max(g[2],h);g[3]=Math.max(g[3],k)}return b}function fe(b,c){var d;return(d=c.call(void 0,ge(b)))||(d=c.call(void 0,he(b)))||(d=c.call(void 0,ie(b)))?d:(d=c.call(void 0,je(b)))?d:!1}function ge(b){return[b[0],b[1]]}function he(b){return[b[2],b[1]]}function ke(b){return[(b[0]+b[2])/2,(b[1]+b[3])/2]}
function le(b,c){var d;"bottom-left"===c?d=ge(b):"bottom-right"===c?d=he(b):"top-left"===c?d=je(b):"top-right"===c&&(d=ie(b));return d}function me(b,c,d,e){var f=c*e[0]/2;e=c*e[1]/2;c=Math.cos(d);d=Math.sin(d);f=[-f,-f,f,f];e=[-e,e,-e,e];var g,h,k;for(g=0;4>g;++g)h=f[g],k=e[g],f[g]=b[0]+h*c-k*d,e[g]=b[1]+h*d+k*c;return Ud(f,e,void 0)}function ne(b){return b[3]-b[1]}
function oe(b,c,d){d=m(d)?d:Sd();pe(b,c)&&(d[0]=b[0]>c[0]?b[0]:c[0],d[1]=b[1]>c[1]?b[1]:c[1],d[2]=b[2]<c[2]?b[2]:c[2],d[3]=b[3]<c[3]?b[3]:c[3]);return d}function je(b){return[b[0],b[3]]}function ie(b){return[b[2],b[3]]}function qe(b){return b[2]-b[0]}function pe(b,c){return b[0]<=c[2]&&b[2]>=c[0]&&b[1]<=c[3]&&b[3]>=c[1]}function re(b){return b[2]<b[0]||b[3]<b[1]}function se(b,c){var d=(b[2]-b[0])/2*(c-1),e=(b[3]-b[1])/2*(c-1);b[0]-=d;b[2]+=d;b[1]-=e;b[3]+=e}
function te(b,c,d){b=[b[0],b[1],b[0],b[3],b[2],b[1],b[2],b[3]];c(b,b,2);return Ud([b[0],b[2],b[4],b[6]],[b[1],b[3],b[5],b[7]],d)};/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function ue(b){this.radius=b}ue.prototype.c=function(b){for(var c=0,d=b.length,e=b[d-1][0],f=b[d-1][1],g=0;g<d;g++)var h=b[g][0],k=b[g][1],c=c+Yb(h-e)*(2+Math.sin(Yb(f))+Math.sin(Yb(k))),e=h,f=k;return c*this.radius*this.radius/2};ue.prototype.a=function(b,c){var d=Yb(b[1]),e=Yb(c[1]),f=(e-d)/2,g=Yb(c[0]-b[0])/2,d=Math.sin(f)*Math.sin(f)+Math.sin(g)*Math.sin(g)*Math.cos(d)*Math.cos(e);return 2*this.radius*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))};
ue.prototype.offset=function(b,c,d){var e=Yb(b[1]);c/=this.radius;var f=Math.asin(Math.sin(e)*Math.cos(c)+Math.cos(e)*Math.sin(c)*Math.cos(d));return[180*(Yb(b[0])+Math.atan2(Math.sin(d)*Math.sin(c)*Math.cos(e),Math.cos(c)-Math.sin(e)*Math.sin(f)))/Math.PI,180*f/Math.PI]};var ve=new ue(6370997);var we={};we.degrees=2*Math.PI*ve.radius/360;we.ft=.3048;we.m=1;we["us-ft"]=1200/3937;
function xe(b){this.a=b.code;this.c=b.units;this.n=m(b.extent)?b.extent:null;this.f=m(b.worldExtent)?b.worldExtent:null;this.b=m(b.axisOrientation)?b.axisOrientation:"enu";this.d=m(b.global)?b.global:!1;this.g=m(b.getPointResolution)?b.getPointResolution:this.$h;this.e=null;if("function"==typeof proj4){var c=b.code,d=proj4.defs(c);if(m(d)){m(d.axis)&&!m(b.axisOrientation)&&(this.b=d.axis);m(b.units)||(b=d.units,!m(b)&&m(d.to_meter)&&(b=d.to_meter.toString(),we[b]=d.to_meter),this.c=b);b=ye;var e,
f;for(e in b)f=proj4.defs(e),m(f)&&(b=ze(e),f===d?Ae([b,this]):(f=proj4(e,c),Be(b,this,f.forward,f.inverse)))}}}l=xe.prototype;l.Ah=function(){return this.a};l.J=function(){return this.n};l.Rj=function(){return this.c};l.od=function(){return we[this.c]};l.ii=function(){return this.f};function Ce(b){return b.b}l.Sj=function(){return this.d};l.Zl=function(b){this.d=b};l.Tj=function(b){this.n=b};l.jm=function(b){this.f=b};l.Yl=function(b){this.g=b};
l.$h=function(b,c){if("degrees"==this.c)return b;var d=De(this,ze("EPSG:4326")),e=[c[0]-b/2,c[1],c[0]+b/2,c[1],c[0],c[1]-b/2,c[0],c[1]+b/2],e=d(e,e,2),d=(ve.a(e.slice(0,2),e.slice(2,4))+ve.a(e.slice(4,6),e.slice(6,8)))/2,e=this.od();m(e)&&(d/=e);return d};l.getPointResolution=function(b,c){return this.g(b,c)};var ye={},Ee={};function Ae(b){Fe(b);Qa(b,function(c){Qa(b,function(b){c!==b&&Ge(c,b,He)})})}function Ie(){var b=Je,c=Ke,d=Le;Qa(Me,function(e){Qa(b,function(b){Ge(e,b,c);Ge(b,e,d)})})}
function Ne(b){ye[b.a]=b;Ge(b,b,He)}function Fe(b){var c=[];Qa(b,function(b){c.push(Ne(b))})}function Oe(b){return null!=b?ia(b)?ze(b):b:ze("EPSG:3857")}function Ge(b,c,d){b=b.a;c=c.a;b in Ee||(Ee[b]={});Ee[b][c]=d}function Be(b,c,d,e){b=ze(b);c=ze(c);Ge(b,c,Qe(d));Ge(c,b,Qe(e))}function Qe(b){return function(c,d,e){var f=c.length;e=m(e)?e:2;d=m(d)?d:Array(f);var g,h;for(h=0;h<f;h+=e)for(g=b([c[h],c[h+1]]),d[h]=g[0],d[h+1]=g[1],g=e-1;2<=g;--g)d[h+g]=c[h+g];return d}}
function ze(b){var c;b instanceof xe?c=b:ia(b)?(c=ye[b],!m(c)&&"function"==typeof proj4&&m(proj4.defs(b))&&(c=new xe({code:b}),Ne(c))):c=null;return c}function Re(b,c){return b===c?!0:b.c!=c.c?!1:De(b,c)===He}function Se(b,c){var d=ze(b),e=ze(c);return De(d,e)}function De(b,c){var d=b.a,e=c.a,f;d in Ee&&e in Ee[d]&&(f=Ee[d][e]);m(f)||(f=Te);return f}function Te(b,c){if(m(c)&&b!==c){for(var d=0,e=b.length;d<e;++d)c[d]=b[d];b=c}return b}
function He(b,c){var d;if(m(c)){d=0;for(var e=b.length;d<e;++d)c[d]=b[d];d=c}else d=b.slice();return d}function Ue(b,c,d){c=Se(c,d);return te(b,c)};function B(b){qd.call(this);b=m(b)?b:{};this.q=[0,0];var c={};c.center=m(b.center)?b.center:null;this.p=Oe(b.projection);var d,e,f,g=m(b.minZoom)?b.minZoom:0;d=m(b.maxZoom)?b.maxZoom:28;var h=m(b.zoomFactor)?b.zoomFactor:2;if(m(b.resolutions))d=b.resolutions,e=d[0],f=d[d.length-1],d=bc(d);else{e=Oe(b.projection);f=e.J();var k=(null===f?360*we.degrees/we[e.c]:Math.max(qe(f),ne(f)))/256/Math.pow(2,0),n=k/Math.pow(2,28);e=b.maxResolution;m(e)?g=0:e=k/Math.pow(h,g);f=b.minResolution;m(f)||(f=m(b.maxZoom)?
m(b.maxResolution)?e/Math.pow(h,d):k/Math.pow(h,d):n);d=g+Math.floor(Math.log(e/f)/Math.log(h));f=e/Math.pow(h,d-g);d=cc(h,e,d-g)}this.e=e;this.H=f;this.o=g;g=m(b.extent)?Zb(b.extent):$b;(m(b.enableRotation)?b.enableRotation:1)?(e=b.constrainRotation,e=m(e)&&!0!==e?!1===e?ec:ja(e)?fc(e):ec:gc()):e=dc;this.D=new hc(g,d,e);m(b.resolution)?c.resolution=b.resolution:m(b.zoom)&&(c.resolution=this.constrainResolution(this.e,b.zoom-this.o));c.rotation=m(b.rotation)?b.rotation:0;this.C(c)}v(B,qd);
B.prototype.i=function(b){return this.D.center(b)};B.prototype.constrainResolution=function(b,c,d){return this.D.resolution(b,c||0,d||0)};B.prototype.constrainRotation=function(b,c){return this.D.rotation(b,c||0)};B.prototype.b=function(){return this.get("center")};B.prototype.getCenter=B.prototype.b;B.prototype.g=function(b){var c=this.b(),d=this.a();return[c[0]-d*b[0]/2,c[1]-d*b[1]/2,c[0]+d*b[0]/2,c[1]+d*b[1]/2]};B.prototype.N=function(){return this.p};B.prototype.a=function(){return this.get("resolution")};
B.prototype.getResolution=B.prototype.a;B.prototype.k=function(b,c){return Math.max(qe(b)/c[0],ne(b)/c[1])};function Ve(b){var c=b.e,d=Math.log(c/b.H)/Math.log(2);return function(b){return c/Math.pow(2,b*d)}}B.prototype.d=function(){return this.get("rotation")};B.prototype.getRotation=B.prototype.d;function We(b){var c=b.e,d=Math.log(c/b.H)/Math.log(2);return function(b){return Math.log(c/b)/Math.log(2)/d}}
function Xe(b){var c=b.b(),d=b.p,e=b.a();b=b.d();return{center:c.slice(),projection:m(d)?d:null,resolution:e,rotation:b}}l=B.prototype;l.ki=function(){var b,c=this.a();if(m(c)){var d,e=0;do{d=this.constrainResolution(this.e,e);if(d==c){b=e;break}++e}while(d>this.H)}return m(b)?this.o+b:b};l.pe=function(b,c){if(!re(b)){this.Ha(ke(b));var d=this.k(b,c),e=this.constrainResolution(d,0,0);e<d&&(e=this.constrainResolution(e,-1,0));this.f(e)}};
l.vh=function(b,c,d){var e=m(d)?d:{};d=m(e.padding)?e.padding:[0,0,0,0];var f=m(e.constrainResolution)?e.constrainResolution:!0,g=m(e.nearest)?e.nearest:!1,h;m(e.minResolution)?h=e.minResolution:m(e.maxZoom)?h=this.constrainResolution(this.e,e.maxZoom-this.o,0):h=0;var k=b.j,n=this.d(),e=Math.cos(-n),n=Math.sin(-n),p=Infinity,q=Infinity,r=-Infinity,s=-Infinity;b=b.B;for(var u=0,y=k.length;u<y;u+=b)var z=k[u]*e-k[u+1]*n,A=k[u]*n+k[u+1]*e,p=Math.min(p,z),q=Math.min(q,A),r=Math.max(r,z),s=Math.max(s,
A);c=this.k([p,q,r,s],[c[0]-d[1]-d[3],c[1]-d[0]-d[2]]);c=isNaN(c)?h:Math.max(c,h);f&&(h=this.constrainResolution(c,0,0),!g&&h<c&&(h=this.constrainResolution(h,-1,0)),c=h);this.f(c);n=-n;g=(p+r)/2+(d[1]-d[3])/2*c;d=(q+s)/2+(d[0]-d[2])/2*c;this.Ha([g*e-d*n,d*e+g*n])};l.nh=function(b,c,d){var e=this.d(),f=Math.cos(-e),e=Math.sin(-e),g=b[0]*f-b[1]*e;b=b[1]*f+b[0]*e;var h=this.a(),g=g+(c[0]/2-d[0])*h;b+=(d[1]-c[1]/2)*h;e=-e;this.Ha([g*f-b*e,b*f+g*e])};
l.rotate=function(b,c){if(m(c)){var d,e=this.b();m(e)&&(d=[e[0]-c[0],e[1]-c[1]],Ad(d,b-this.d()),vd(d,c));this.Ha(d)}this.r(b)};l.Ha=function(b){this.set("center",b)};B.prototype.setCenter=B.prototype.Ha;function Ye(b,c){b.q[1]+=c}B.prototype.f=function(b){this.set("resolution",b)};B.prototype.setResolution=B.prototype.f;B.prototype.r=function(b){this.set("rotation",b)};B.prototype.setRotation=B.prototype.r;B.prototype.S=function(b){b=this.constrainResolution(this.e,b-this.o,0);this.f(b)};function Ze(b){return 1-Math.pow(1-b,3)};function $e(b){return 3*b*b-2*b*b*b}function af(b){return b}function bf(b){return.5>b?$e(2*b):1-$e(2*(b-.5))};function cf(b){var c=b.source,d=m(b.start)?b.start:ta(),e=c[0],f=c[1],g=m(b.duration)?b.duration:1E3,h=m(b.easing)?b.easing:$e;return function(b,c){if(c.time<d)return c.animate=!0,c.viewHints[0]+=1,!0;if(c.time<d+g){var p=1-h((c.time-d)/g),q=e-c.viewState.center[0],r=f-c.viewState.center[1];c.animate=!0;c.viewState.center[0]+=p*q;c.viewState.center[1]+=p*r;c.viewHints[0]+=1;return!0}return!1}}
function df(b){var c=m(b.rotation)?b.rotation:0,d=m(b.start)?b.start:ta(),e=m(b.duration)?b.duration:1E3,f=m(b.easing)?b.easing:$e,g=m(b.anchor)?b.anchor:null;return function(b,k){if(k.time<d)return k.animate=!0,k.viewHints[0]+=1,!0;if(k.time<d+e){var n=1-f((k.time-d)/e),n=(c-k.viewState.rotation)*n;k.animate=!0;k.viewState.rotation+=n;if(null!==g){var p=k.viewState.center;p[0]-=g[0];p[1]-=g[1];Ad(p,n);vd(p,g)}k.viewHints[0]+=1;return!0}return!1}}
function ef(b){var c=b.resolution,d=m(b.start)?b.start:ta(),e=m(b.duration)?b.duration:1E3,f=m(b.easing)?b.easing:$e;return function(b,h){if(h.time<d)return h.animate=!0,h.viewHints[0]+=1,!0;if(h.time<d+e){var k=1-f((h.time-d)/e),n=c-h.viewState.resolution;h.animate=!0;h.viewState.resolution+=k*n;h.viewHints[0]+=1;return!0}return!1}};function ff(b,c,d,e){return m(e)?(e[0]=b,e[1]=c,e[2]=d,e):[b,c,d]}function gf(b,c,d){return b+"/"+c+"/"+d}function hf(b){var c=b[0],d=Array(c),e=1<<c-1,f,g;for(f=0;f<c;++f)g=48,b[1]&e&&(g+=1),b[2]&e&&(g+=2),d[f]=String.fromCharCode(g),e>>=1;return d.join("")}function jf(b){return gf(b[0],b[1],b[2])};function kf(b,c,d,e){this.a=b;this.d=c;this.b=d;this.c=e}function lf(b,c,d,e,f){return m(f)?(f.a=b,f.d=c,f.b=d,f.c=e,f):new kf(b,c,d,e)}kf.prototype.contains=function(b){return mf(this,b[1],b[2])};function mf(b,c,d){return b.a<=c&&c<=b.d&&b.b<=d&&d<=b.c}function nf(b,c){return b.a==c.a&&b.b==c.b&&b.d==c.d&&b.c==c.c}function of(b){return b.d-b.a+1}function pf(b,c){return b.a<=c.d&&b.d>=c.a&&b.b<=c.c&&b.c>=c.b};function qf(b){this.c=b.html;this.a=m(b.tileRanges)?b.tileRanges:null}qf.prototype.b=function(){return this.c};var rf=!Gb||Gb&&9<=Rb;!Hb&&!Gb||Gb&&Gb&&9<=Rb||Hb&&Pb("1.9.1");Gb&&Pb("9");Eb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));Eb("action","cite","data","formaction","href","manifest","poster","src");Eb("embed","iframe","link","object","script","style","template");function sf(b,c){this.x=m(b)?b:0;this.y=m(c)?c:0}l=sf.prototype;l.clone=function(){return new sf(this.x,this.y)};l.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};l.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};l.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};l.scale=function(b,c){var d=ja(c)?c:b;this.x*=b;this.y*=d;return this};function tf(b,c){this.width=b;this.height=c}l=tf.prototype;l.clone=function(){return new tf(this.width,this.height)};l.la=function(){return!(this.width*this.height)};l.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};l.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};l.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
l.scale=function(b,c){var d=ja(c)?c:b;this.width*=b;this.height*=d;return this};function uf(b){return b?new vf(wf(b)):xa||(xa=new vf)}function xf(b){var c=document;return ia(b)?c.getElementById(b):b}function yf(b,c){mb(c,function(c,e){"style"==e?b.style.cssText=c:"class"==e?b.className=c:"for"==e?b.htmlFor=c:e in zf?b.setAttribute(zf[e],c):0==e.lastIndexOf("aria-",0)||0==e.lastIndexOf("data-",0)?b.setAttribute(e,c):b[e]=c})}
var zf={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};function Af(b){b=b.document.documentElement;return new tf(b.clientWidth,b.clientHeight)}
function Bf(b,c,d){var e=arguments,f=document,g=e[0],h=e[1];if(!rf&&h&&(h.name||h.type)){g=["<",g];h.name&&g.push(' name="',Ba(h.name),'"');if(h.type){g.push(' type="',Ba(h.type),'"');var k={};Db(k,h);delete k.type;h=k}g.push(">");g=g.join("")}g=f.createElement(g);h&&(ia(h)?g.className=h:ga(h)?g.className=h.join(" "):yf(g,h));2<e.length&&Cf(f,g,e,2);return g}
function Cf(b,c,d,e){function f(d){d&&c.appendChild(ia(d)?b.createTextNode(d):d)}for(;e<d.length;e++){var g=d[e];!ha(g)||la(g)&&0<g.nodeType?f(g):Qa(Df(g)?Za(g):g,f)}}function Ef(b){return document.createElement(b)}function Ff(b,c){Cf(wf(b),b,arguments,1)}function Gf(b){for(var c;c=b.firstChild;)b.removeChild(c)}function Hf(b,c,d){b.insertBefore(c,b.childNodes[d]||null)}function If(b){b&&b.parentNode&&b.parentNode.removeChild(b)}function Jf(b,c){var d=c.parentNode;d&&d.replaceChild(b,c)}
function Kf(b){if(void 0!=b.firstElementChild)b=b.firstElementChild;else for(b=b.firstChild;b&&1!=b.nodeType;)b=b.nextSibling;return b}function wf(b){return 9==b.nodeType?b:b.ownerDocument||b.document}function Df(b){if(b&&"number"==typeof b.length){if(la(b))return"function"==typeof b.item||"string"==typeof b.item;if(ka(b))return"function"==typeof b.item}return!1}function vf(b){this.a=b||ba.document||document}function Lf(){return!0}
function Mf(b){var c=b.a;b=Ib?c.body||c.documentElement:c.documentElement;c=c.parentWindow||c.defaultView;return Gb&&Pb("10")&&c.pageYOffset!=b.scrollTop?new sf(b.scrollLeft,b.scrollTop):new sf(c.pageXOffset||b.scrollLeft,c.pageYOffset||b.scrollTop)}vf.prototype.appendChild=function(b,c){b.appendChild(c)};
vf.prototype.contains=function(b,c){if(b.contains&&1==c.nodeType)return b==c||b.contains(c);if("undefined"!=typeof b.compareDocumentPosition)return b==c||Boolean(b.compareDocumentPosition(c)&16);for(;c&&b!=c;)c=c.parentNode;return c==b};function Nf(b,c){var d=Ef("CANVAS");m(b)&&(d.width=b);m(c)&&(d.height=c);return d.getContext("2d")}
var Of=function(){var b;return function(){if(!m(b))if(ba.getComputedStyle){var c=Ef("P"),d,e={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(c);for(var f in e)f in c.style&&(c.style[f]="translate(1px,1px)",d=ba.getComputedStyle(c).getPropertyValue(e[f]));If(c);b=d&&"none"!==d}else b=!1;return b}}(),Pf=function(){var b;return function(){if(!m(b))if(ba.getComputedStyle){var c=Ef("P"),
d,e={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(c);for(var f in e)f in c.style&&(c.style[f]="translate3d(1px,1px,1px)",d=ba.getComputedStyle(c).getPropertyValue(e[f]));If(c);b=d&&"none"!==d}else b=!1;return b}}();function Qf(b,c){var d=b.style;d.WebkitTransform=c;d.MozTransform=c;d.a=c;d.msTransform=c;d.transform=c;Gb&&!Tb&&(b.style.transformOrigin="0 0")}
function Rf(b,c){var d;if(Pf()){if(m(6)){var e=Array(16);for(d=0;16>d;++d)e[d]=c[d].toFixed(6);d=e.join(",")}else d=c.join(",");Qf(b,"matrix3d("+d+")")}else if(Of()){e=[c[0],c[1],c[4],c[5],c[12],c[13]];if(m(6)){var f=Array(6);for(d=0;6>d;++d)f[d]=e[d].toFixed(6);d=f.join(",")}else d=e.join(",");Qf(b,"matrix("+d+")")}else b.style.left=Math.round(c[12])+"px",b.style.top=Math.round(c[13])+"px"};var Sf=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function Tf(b,c){var d,e,f=Sf.length;for(e=0;e<f;++e)try{if(d=b.getContext(Sf[e],c),null!==d)return d}catch(g){}return null};var Uf,Vf=ba.devicePixelRatio||1,Xf="ArrayBuffer"in ba,Yf=!1,Zf=function(){if(!("HTMLCanvasElement"in ba))return!1;try{var b=Nf();if(null===b)return!1;m(b.setLineDash)&&(Yf=!0);return!0}catch(c){return!1}}(),$f="DeviceOrientationEvent"in ba,ag="geolocation"in ba.navigator,bg="ontouchstart"in ba,cg="PointerEvent"in ba,dg=!!ba.navigator.msPointerEnabled,eg=!1,fg,gg=[];
if("WebGLRenderingContext"in ba)try{var hg=Ef("CANVAS"),ig=Tf(hg,{uh:!0});null!==ig&&(eg=!0,fg=ig.getParameter(ig.MAX_TEXTURE_SIZE),gg=ig.getSupportedExtensions())}catch(jg){}Uf=eg;va=gg;ua=fg;function kg(b,c,d){qc.call(this,b,d);this.element=c}v(kg,qc);function lg(b){qd.call(this);this.a=m(b)?b:[];mg(this)}v(lg,qd);l=lg.prototype;l.clear=function(){for(;0<this.Ib();)this.pop()};l.xe=function(b){var c,d;c=0;for(d=b.length;c<d;++c)this.push(b[c]);return this};l.forEach=function(b,c){Qa(this.a,b,c)};l.jj=function(){return this.a};l.item=function(b){return this.a[b]};l.Ib=function(){return this.get("length")};l.zd=function(b,c){bb(this.a,b,0,c);mg(this);this.dispatchEvent(new kg("add",c,this))};
l.pop=function(){return this.Ke(this.Ib()-1)};l.push=function(b){var c=this.a.length;this.zd(c,b);return c};l.remove=function(b){var c=this.a,d,e;d=0;for(e=c.length;d<e;++d)if(c[d]===b)return this.Ke(d)};l.Ke=function(b){var c=this.a[b];Oa.splice.call(this.a,b,1);mg(this);this.dispatchEvent(new kg("remove",c,this));return c};
l.Vl=function(b,c){var d=this.Ib();if(b<d)d=this.a[b],this.a[b]=c,this.dispatchEvent(new kg("remove",d,this)),this.dispatchEvent(new kg("add",c,this));else{for(;d<b;++d)this.zd(d,void 0);this.zd(b,c)}};function mg(b){b.set("length",b.a.length)};var ng=/^#(?:[0-9a-f]{3}){1,2}$/i,og=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i,pg=/^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;function qg(b){return ga(b)?b:rg(b)}function sg(b){if(!ia(b)){var c=b[0];c!=(c|0)&&(c=c+.5|0);var d=b[1];d!=(d|0)&&(d=d+.5|0);var e=b[2];e!=(e|0)&&(e=e+.5|0);b="rgba("+c+","+d+","+e+","+b[3]+")"}return b}
var rg=function(){var b={},c=0;return function(d){var e;if(b.hasOwnProperty(d))e=b[d];else{if(1024<=c){e=0;for(var f in b)0===(e++&3)&&(delete b[f],--c)}var g,h;ng.exec(d)?(h=3==d.length-1?1:2,e=parseInt(d.substr(1+0*h,h),16),f=parseInt(d.substr(1+1*h,h),16),g=parseInt(d.substr(1+2*h,h),16),1==h&&(e=(e<<4)+e,f=(f<<4)+f,g=(g<<4)+g),e=[e,f,g,1]):(h=pg.exec(d))?(e=Number(h[1]),f=Number(h[2]),g=Number(h[3]),h=Number(h[4]),e=[e,f,g,h],e=tg(e,e)):(h=og.exec(d))?(e=Number(h[1]),f=Number(h[2]),g=Number(h[3]),
e=[e,f,g,1],e=tg(e,e)):e=void 0;b[d]=e;++c}return e}}();function tg(b,c){var d=m(c)?c:[];d[0]=Vb(b[0]+.5|0,0,255);d[1]=Vb(b[1]+.5|0,0,255);d[2]=Vb(b[2]+.5|0,0,255);d[3]=Vb(b[3],0,1);return d};function ug(){this.g=Hd();this.c=void 0;this.a=Hd();this.d=void 0;this.b=Hd();this.e=void 0;this.f=Hd();this.i=void 0;this.n=Hd()}
function vg(b,c,d,e,f){var g=!1;m(c)&&c!==b.c&&(g=b.a,Ld(g),g[12]=c,g[13]=c,g[14]=c,g[15]=1,b.c=c,g=!0);if(m(d)&&d!==b.d){g=b.b;Ld(g);g[0]=d;g[5]=d;g[10]=d;g[15]=1;var h=-.5*d+.5;g[12]=h;g[13]=h;g[14]=h;g[15]=1;b.d=d;g=!0}m(e)&&e!==b.e&&(g=Math.cos(e),h=Math.sin(e),Id(b.f,.213+.787*g-.213*h,.213-.213*g+.143*h,.213-.213*g-.787*h,0,.715-.715*g-.715*h,.715+.285*g+.14*h,.715-.715*g+.715*h,0,.072-.072*g+.928*h,.072-.072*g-.283*h,.072+.928*g+.072*h,0,0,0,0,1),b.e=e,g=!0);m(f)&&f!==b.i&&(Id(b.n,.213+.787*
f,.213-.213*f,.213-.213*f,0,.715-.715*f,.715+.285*f,.715-.715*f,0,.072-.072*f,.072-.072*f,.072+.928*f,0,0,0,0,1),b.i=f,g=!0);g&&(g=b.g,Ld(g),m(d)&&Md(g,b.b,g),m(c)&&Md(g,b.a,g),m(f)&&Md(g,b.n,g),m(e)&&Md(g,b.f,g));return b.g};function wg(b){if(b.classList)return b.classList;b=b.className;return ia(b)&&b.match(/\S+/g)||[]}function xg(b,c){return b.classList?b.classList.contains(c):Wa(wg(b),c)}function yg(b,c){b.classList?b.classList.add(c):xg(b,c)||(b.className+=0<b.className.length?" "+c:c)}function zg(b,c){b.classList?b.classList.remove(c):xg(b,c)&&(b.className=Ra(wg(b),function(b){return b!=c}).join(" "))}function Ag(b,c){xg(b,c)?zg(b,c):yg(b,c)};function Bg(b,c,d,e){this.top=b;this.right=c;this.bottom=d;this.left=e}l=Bg.prototype;l.clone=function(){return new Bg(this.top,this.right,this.bottom,this.left)};l.contains=function(b){return this&&b?b instanceof Bg?b.left>=this.left&&b.right<=this.right&&b.top>=this.top&&b.bottom<=this.bottom:b.x>=this.left&&b.x<=this.right&&b.y>=this.top&&b.y<=this.bottom:!1};
l.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};l.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};l.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};
l.scale=function(b,c){var d=ja(c)?c:b;this.left*=b;this.right*=b;this.top*=d;this.bottom*=d;return this};function Cg(b,c,d,e){this.left=b;this.top=c;this.width=d;this.height=e}l=Cg.prototype;l.clone=function(){return new Cg(this.left,this.top,this.width,this.height)};l.contains=function(b){return b instanceof Cg?this.left<=b.left&&this.left+this.width>=b.left+b.width&&this.top<=b.top&&this.top+this.height>=b.top+b.height:b.x>=this.left&&b.x<=this.left+this.width&&b.y>=this.top&&b.y<=this.top+this.height};
function Dg(b,c){var d=c.x<b.left?b.left-c.x:Math.max(c.x-(b.left+b.width),0),e=c.y<b.top?b.top-c.y:Math.max(c.y-(b.top+b.height),0);return d*d+e*e}l.distance=function(b){return Math.sqrt(Dg(this,b))};l.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
l.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};l.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};l.scale=function(b,c){var d=ja(c)?c:b;this.left*=b;this.width*=b;this.top*=d;this.height*=d;return this};function Eg(b,c){var d=wf(b);return d.defaultView&&d.defaultView.getComputedStyle&&(d=d.defaultView.getComputedStyle(b,null))?d[c]||d.getPropertyValue(c)||"":""}function Fg(b,c){return Eg(b,c)||(b.currentStyle?b.currentStyle[c]:null)||b.style&&b.style[c]}function Gg(b,c,d){var e;c instanceof sf?(e=c.x,c=c.y):(e=c,c=d);b.style.left=Hg(e);b.style.top=Hg(c)}
function Ig(b){var c;try{c=b.getBoundingClientRect()}catch(d){return{left:0,top:0,right:0,bottom:0}}Gb&&b.ownerDocument.body&&(b=b.ownerDocument,c.left-=b.documentElement.clientLeft+b.body.clientLeft,c.top-=b.documentElement.clientTop+b.body.clientTop);return c}
function Jg(b){if(1==b.nodeType)return b=Ig(b),new sf(b.left,b.top);var c=ka(b.zh),d=b;b.targetTouches&&b.targetTouches.length?d=b.targetTouches[0]:c&&b.a.targetTouches&&b.a.targetTouches.length&&(d=b.a.targetTouches[0]);return new sf(d.clientX,d.clientY)}function Hg(b){"number"==typeof b&&(b=b+"px");return b}
function Kg(b){var c=Lg;if("none"!=Fg(b,"display"))return c(b);var d=b.style,e=d.display,f=d.visibility,g=d.position;d.visibility="hidden";d.position="absolute";d.display="inline";b=c(b);d.display=e;d.position=g;d.visibility=f;return b}function Lg(b){var c=b.offsetWidth,d=b.offsetHeight,e=Ib&&!c&&!d;return m(c)&&!e||!b.getBoundingClientRect?new tf(c,d):(b=Ig(b),new tf(b.right-b.left,b.bottom-b.top))}function Mg(b,c){b.style.display=c?"":"none"}
function Ng(b,c,d,e){if(/^\d+px?$/.test(c))return parseInt(c,10);var f=b.style[d],g=b.runtimeStyle[d];b.runtimeStyle[d]=b.currentStyle[d];b.style[d]=c;c=b.style[e];b.style[d]=f;b.runtimeStyle[d]=g;return c}function Og(b,c){var d=b.currentStyle?b.currentStyle[c]:null;return d?Ng(b,d,"left","pixelLeft"):0}
function Pg(b,c){if(Gb){var d=Og(b,c+"Left"),e=Og(b,c+"Right"),f=Og(b,c+"Top"),g=Og(b,c+"Bottom");return new Bg(f,e,g,d)}d=Eg(b,c+"Left");e=Eg(b,c+"Right");f=Eg(b,c+"Top");g=Eg(b,c+"Bottom");return new Bg(parseFloat(f),parseFloat(e),parseFloat(g),parseFloat(d))}var Qg={thin:2,medium:4,thick:6};function Rg(b,c){if("none"==(b.currentStyle?b.currentStyle[c+"Style"]:null))return 0;var d=b.currentStyle?b.currentStyle[c+"Width"]:null;return d in Qg?Qg[d]:Ng(b,d,"left","pixelLeft")}
function Sg(b){if(Gb&&!(Gb&&9<=Rb)){var c=Rg(b,"borderLeft"),d=Rg(b,"borderRight"),e=Rg(b,"borderTop");b=Rg(b,"borderBottom");return new Bg(e,d,b,c)}c=Eg(b,"borderLeftWidth");d=Eg(b,"borderRightWidth");e=Eg(b,"borderTopWidth");b=Eg(b,"borderBottomWidth");return new Bg(parseFloat(e),parseFloat(d),parseFloat(b),parseFloat(c))};function Tg(b,c,d){qc.call(this,b);this.map=c;this.frameState=m(d)?d:null}v(Tg,qc);function Ug(b){qd.call(this);this.element=m(b.element)?b.element:null;this.a=this.i=null;this.q=[];this.render=m(b.render)?b.render:ca;m(b.target)&&this.b(b.target)}v(Ug,qd);Ug.prototype.P=function(){If(this.element);Ug.T.P.call(this)};Ug.prototype.f=function(){return this.a};
Ug.prototype.setMap=function(b){null===this.a||If(this.element);0!=this.q.length&&(Qa(this.q,Wc),this.q.length=0);this.a=b;null!==this.a&&((null===this.i?b.H:this.i).appendChild(this.element),this.render!==ca&&this.q.push(w(b,"postrender",this.render,!1,this)),b.render())};Ug.prototype.b=function(b){this.i=xf(b)};function Vg(){this.b=0;this.d={};this.c=this.a=null}l=Vg.prototype;l.clear=function(){this.b=0;this.d={};this.c=this.a=null};function Wg(b,c){return b.d.hasOwnProperty(c)}l.forEach=function(b,c){for(var d=this.a;null!==d;)b.call(c,d.hc,d.Cd,this),d=d.eb};l.get=function(b){b=this.d[b];if(b===this.c)return b.hc;b===this.a?(this.a=this.a.eb,this.a.Mb=null):(b.eb.Mb=b.Mb,b.Mb.eb=b.eb);b.eb=null;b.Mb=this.c;this.c=this.c.eb=b;return b.hc};l.Tb=function(){return this.b};
l.G=function(){var b=Array(this.b),c=0,d;for(d=this.c;null!==d;d=d.Mb)b[c++]=d.Cd;return b};l.ob=function(){var b=Array(this.b),c=0,d;for(d=this.c;null!==d;d=d.Mb)b[c++]=d.hc;return b};l.pop=function(){var b=this.a;delete this.d[b.Cd];null!==b.eb&&(b.eb.Mb=null);this.a=b.eb;null===this.a&&(this.c=null);--this.b;return b.hc};l.set=function(b,c){var d={Cd:b,eb:null,Mb:this.c,hc:c};null===this.c?this.a=d:this.c.eb=d;this.c=d;this.d[b]=d;++this.b};function Xg(b){Vg.call(this);this.f=m(b)?b:2048}v(Xg,Vg);function Yg(b){return b.Tb()>b.f};function Zg(b,c){hd.call(this);this.a=b;this.state=c}v(Zg,hd);function $g(b){b.dispatchEvent("change")}Zg.prototype.qb=function(){return ma(this).toString()};Zg.prototype.e=function(){return this.a};function ah(b){qd.call(this);this.e=ze(b.projection);this.f=m(b.attributions)?b.attributions:null;this.D=b.logo;this.q=m(b.state)?b.state:"ready"}v(ah,qd);l=ah.prototype;l.Jd=ca;l.Y=function(){return this.f};l.X=function(){return this.D};l.Z=function(){return this.e};l.$=function(){return this.q};function bh(b,c){b.q=c;b.l()};function ch(b){this.minZoom=m(b.minZoom)?b.minZoom:0;this.a=b.resolutions;this.maxZoom=this.a.length-1;this.f=m(b.origin)?b.origin:null;this.g=null;m(b.origins)&&(this.g=b.origins);this.c=null;m(b.tileSizes)&&(this.c=b.tileSizes);this.e=m(b.tileSize)?b.tileSize:null===this.c?256:void 0;this.b=null;m(b.widths)&&(this.b=b.widths)}var dh=[0,0,0];l=ch.prototype;l.Db=function(){return dd};l.gd=function(b,c,d,e,f){f=eh(this,b,f);for(b=b[0]-1;b>=this.minZoom;){if(c.call(d,b,fh(this,f,b,e)))return!0;--b}return!1};
l.md=function(){return this.maxZoom};l.pd=function(){return this.minZoom};l.Lb=function(b){return null===this.f?this.g[b]:this.f};l.na=function(b){return this.a[b]};l.Qd=function(){return this.a};l.td=function(b,c,d){return b[0]<this.maxZoom?(d=eh(this,b,d),fh(this,d,b[0]+1,c)):null};function gh(b,c,d,e){hh(b,c[0],c[1],d,!1,dh);var f=dh[1],g=dh[2];hh(b,c[2],c[3],d,!0,dh);return lf(f,dh[1],g,dh[2],e)}function fh(b,c,d,e){return gh(b,c,b.na(d),e)}
function ih(b,c){var d=b.Lb(c[0]),e=b.na(c[0]),f=b.pa(c[0]);return[d[0]+(c[1]+.5)*f*e,d[1]+(c[2]+.5)*f*e]}function eh(b,c,d){var e=b.Lb(c[0]),f=b.na(c[0]);b=b.pa(c[0]);var g=e[0]+c[1]*b*f;c=e[1]+c[2]*b*f;return Vd(g,c,g+b*f,c+b*f,d)}l.Wb=function(b,c,d){return hh(this,b[0],b[1],c,!1,d)};function hh(b,c,d,e,f,g){var h=jh(b,e),k=e/b.na(h),n=b.Lb(h);b=b.pa(h);c=k*(c-n[0])/(e*b);d=k*(d-n[1])/(e*b);f?(c=Math.ceil(c)-1,d=Math.ceil(d)-1):(c=Math.floor(c),d=Math.floor(d));return ff(h,c,d,g)}
l.Nc=function(b,c,d){return hh(this,b[0],b[1],this.na(c),!1,d)};function kh(b,c,d){d=fh(b,lh(d),c);b=mh(b,c);m(b)||(b=of(d));return lf(0,b-1,0,d.c-d.b+1,void 0)}l.pa=function(b){return m(this.e)?this.e:this.c[b]};function mh(b,c){if(null!==b.b)return b.b[c]}function jh(b,c){var d=ac(b.a,c,0);return Vb(d,b.minZoom,b.maxZoom)}
function nh(b){var c=b.e;if(null===c){for(var c=lh(b),d=m(void 0)?void 0:256,e=m(void 0)?void 0:"bottom-left",f=oh(c,void 0,d),g=Array(f.length),h=qe(c),k=f.length-1;0<=k;--k)g[k]=h/d/f[k];c=new ch({origin:le(c,e),resolutions:f,tileSize:d,widths:g});b.e=c}return c}function oh(b,c,d){c=m(c)?c:42;d=m(d)?d:256;b=Math.max(qe(b)/d,ne(b)/d);c+=1;d=Array(c);for(var e=0;e<c;++e)d[e]=b/Math.pow(2,e);return d}function lh(b){b=ze(b);var c=b.J();null===c&&(b=180*we.degrees/b.od(),c=Vd(-b,-b,b,b));return c};function ph(b){ah.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,projection:b.projection,state:b.state});this.N=m(b.opaque)?b.opaque:!1;this.S=m(b.tilePixelRatio)?b.tilePixelRatio:1;this.tileGrid=m(b.tileGrid)?b.tileGrid:null;this.a=new Xg;this.H=b.wrapX}v(ph,ah);function qh(b,c,d,e){for(var f=!0,g,h,k=d.a;k<=d.d;++k)for(var n=d.b;n<=d.c;++n)g=b.nb(c,k,n),h=!1,Wg(b.a,g)&&(g=b.a.get(g),(h=2===g.state)&&(h=!1!==e(g))),h||(f=!1);return f}l=ph.prototype;l.jd=function(){return 0};
l.nb=gf;l.xa=function(){return this.tileGrid};function rh(b,c){return null===b.tileGrid?nh(c):b.tileGrid}l.Xb=function(b,c,d){return rh(this,d).pa(b)*this.S};l.Oe=ca;function sh(b,c){qc.call(this,b);this.tile=c}v(sh,qc);function th(b){b=m(b)?b:{};this.r=Ef("UL");this.o=Ef("LI");this.r.appendChild(this.o);Mg(this.o,!1);this.d=m(b.collapsed)?b.collapsed:!0;this.g=m(b.collapsible)?b.collapsible:!0;this.g||(this.d=!1);var c=m(b.className)?b.className:"ol-attribution",d=m(b.tipLabel)?b.tipLabel:"Attributions",e=m(b.collapseLabel)?b.collapseLabel:"\u00bb";this.D=ia(e)?Bf("SPAN",{},e):e;e=m(b.label)?b.label:"i";this.H=ia(e)?Bf("SPAN",{},e):e;d=Bf("BUTTON",{type:"button",title:d},this.g&&!this.d?this.D:this.H);w(d,"click",
this.Dj,!1,this);w(d,["mouseout",uc],function(){this.blur()},!1);c=Bf("DIV",c+" ol-unselectable ol-control"+(this.d&&this.g?" ol-collapsed":"")+(this.g?"":" ol-uncollapsible"),this.r,d);Ug.call(this,{element:c,render:m(b.render)?b.render:uh,target:b.target});this.p=!0;this.k={};this.e={};this.N={}}v(th,Ug);
function uh(b){b=b.frameState;if(null===b)this.p&&(Mg(this.element,!1),this.p=!1);else{var c,d,e,f,g,h,k,n,p,q,r,s=b.layerStatesArray,u=Bb(b.attributions),y={},z=b.viewState.projection;d=0;for(c=s.length;d<c;d++)if(h=s[d].layer.a(),null!==h&&(q=ma(h).toString(),p=h.f,null!==p))for(e=0,f=p.length;e<f;e++)if(k=p[e],n=ma(k).toString(),!(n in u)){g=b.usedTiles[q];if(m(g)){var A=rh(h,z);a:{r=k;var E=z;if(null===r.a)r=!0;else{var x=void 0,Q=void 0,N=void 0,L=void 0;for(L in g)if(L in r.a)for(var N=g[L],
U,x=0,Q=r.a[L].length;x<Q;++x){U=r.a[L][x];if(pf(U,N)){r=!0;break a}var Ca=kh(A,parseInt(L,10),E),eb=of(Ca);if(N.a<Ca.a||N.d>Ca.d)if(pf(U,new kf(Wb(N.a,eb),Wb(N.d,eb),N.b,N.c))||of(N)>eb&&pf(U,Ca)){r=!0;break a}}r=!1}}}else r=!1;r?(n in y&&delete y[n],u[n]=k):y[n]=k}c=[u,y];d=c[0];c=c[1];for(var R in this.k)R in d?(this.e[R]||(Mg(this.k[R],!0),this.e[R]=!0),delete d[R]):R in c?(this.e[R]&&(Mg(this.k[R],!1),delete this.e[R]),delete c[R]):(If(this.k[R]),delete this.k[R],delete this.e[R]);for(R in d)e=
Ef("LI"),e.innerHTML=d[R].c,this.r.appendChild(e),this.k[R]=e,this.e[R]=!0;for(R in c)e=Ef("LI"),e.innerHTML=c[R].c,Mg(e,!1),this.r.appendChild(e),this.k[R]=e;R=!wb(this.e)||!wb(b.logos);this.p!=R&&(Mg(this.element,R),this.p=R);R&&wb(this.e)?yg(this.element,"ol-logo-only"):zg(this.element,"ol-logo-only");var Ma;b=b.logos;R=this.N;for(Ma in R)Ma in b||(If(R[Ma]),delete R[Ma]);for(var sb in b)sb in R||(Ma=new Image,Ma.src=sb,d=b[sb],""===d?d=Ma:(d=Bf("A",{href:d}),d.appendChild(Ma)),this.o.appendChild(d),
R[sb]=d);Mg(this.o,!wb(b))}}l=th.prototype;l.Dj=function(b){b.preventDefault();vh(this)};function vh(b){Ag(b.element,"ol-collapsed");b.d?Jf(b.D,b.H):Jf(b.H,b.D);b.d=!b.d}l.Cj=function(){return this.g};l.Fj=function(b){this.g!==b&&(this.g=b,Ag(this.element,"ol-uncollapsible"),!b&&this.d&&vh(this))};l.Ej=function(b){this.g&&this.d!==b&&vh(this)};l.Bj=function(){return this.d};function wh(b){b=m(b)?b:{};var c=m(b.className)?b.className:"ol-rotate",d=m(b.label)?b.label:"\u21e7";this.d=null;ia(d)?this.d=Bf("SPAN","ol-compass",d):(this.d=d,yg(this.d,"ol-compass"));d=Bf("BUTTON",{"class":c+"-reset",type:"button",title:m(b.tipLabel)?b.tipLabel:"Reset rotation"},this.d);w(d,"click",wh.prototype.o,!1,this);w(d,["mouseout",uc],function(){this.blur()},!1);c=Bf("DIV",c+" ol-unselectable ol-control",d);Ug.call(this,{element:c,render:m(b.render)?b.render:xh,target:b.target});this.g=
m(b.duration)?b.duration:250;this.e=m(b.autoHide)?b.autoHide:!0;this.k=void 0;this.e&&yg(this.element,"ol-hidden")}v(wh,Ug);wh.prototype.o=function(b){b.preventDefault();b=this.a;var c=b.a();if(null!==c){for(var d=c.d();d<-Math.PI;)d+=2*Math.PI;for(;d>Math.PI;)d-=2*Math.PI;m(d)&&(0<this.g&&b.La(df({rotation:d,duration:this.g,easing:Ze})),c.r(0))}};
function xh(b){b=b.frameState;if(null!==b){b=b.viewState.rotation;if(b!=this.k){var c="rotate("+180*b/Math.PI+"deg)";if(this.e){var d=this.element;0===b?yg(d,"ol-hidden"):zg(d,"ol-hidden")}this.d.style.msTransform=c;this.d.style.webkitTransform=c;this.d.style.transform=c}this.k=b}};function yh(b){b=m(b)?b:{};var c=m(b.className)?b.className:"ol-zoom",d=m(b.delta)?b.delta:1,e=m(b.zoomOutLabel)?b.zoomOutLabel:"\u2212",f=m(b.zoomOutTipLabel)?b.zoomOutTipLabel:"Zoom out",g=Bf("BUTTON",{"class":c+"-in",type:"button",title:m(b.zoomInTipLabel)?b.zoomInTipLabel:"Zoom in"},m(b.zoomInLabel)?b.zoomInLabel:"+");w(g,"click",sa(yh.prototype.e,d),!1,this);w(g,["mouseout",uc],function(){this.blur()},!1);e=Bf("BUTTON",{"class":c+"-out",type:"button",title:f},e);w(e,"click",sa(yh.prototype.e,
-d),!1,this);w(e,["mouseout",uc],function(){this.blur()},!1);c=Bf("DIV",c+" ol-unselectable ol-control",g,e);Ug.call(this,{element:c,target:b.target});this.d=m(b.duration)?b.duration:250}v(yh,Ug);yh.prototype.e=function(b,c){c.preventDefault();var d=this.a,e=d.a();if(null!==e){var f=e.a();m(f)&&(0<this.d&&d.La(ef({resolution:f,duration:this.d,easing:Ze})),d=e.constrainResolution(f,b),e.f(d))}};function zh(b){b=m(b)?b:{};var c=new lg;(m(b.zoom)?b.zoom:1)&&c.push(new yh(b.zoomOptions));(m(b.rotate)?b.rotate:1)&&c.push(new wh(b.rotateOptions));(m(b.attribution)?b.attribution:1)&&c.push(new th(b.attributionOptions));return c};var Ah=Ib?"webkitfullscreenchange":Hb?"mozfullscreenchange":Gb?"MSFullscreenChange":"fullscreenchange";function Bh(){var b=uf().a,c=b.body;return!!(c.webkitRequestFullscreen||c.mozRequestFullScreen&&b.mozFullScreenEnabled||c.msRequestFullscreen&&b.msFullscreenEnabled||c.requestFullscreen&&b.fullscreenEnabled)}
function Ch(b){b.webkitRequestFullscreen?b.webkitRequestFullscreen():b.mozRequestFullScreen?b.mozRequestFullScreen():b.msRequestFullscreen?b.msRequestFullscreen():b.requestFullscreen&&b.requestFullscreen()}function Dh(){var b=uf().a;return!!(b.webkitIsFullScreen||b.mozFullScreen||b.msFullscreenElement||b.fullscreenElement)};function Eh(b){b=m(b)?b:{};this.d=m(b.className)?b.className:"ol-full-screen";var c=m(b.label)?b.label:"\u2194";this.e=ia(c)?document.createTextNode(String(c)):c;c=m(b.labelActive)?b.labelActive:"\u00d7";this.g=ia(c)?document.createTextNode(String(c)):c;c=m(b.tipLabel)?b.tipLabel:"Toggle full-screen";c=Bf("BUTTON",{"class":this.d+"-"+Dh(),type:"button",title:c},this.e);w(c,"click",this.p,!1,this);w(c,["mouseout",uc],function(){this.blur()},!1);w(ba.document,Ah,this.k,!1,this);var d=this.d+" ol-unselectable ol-control "+
(Bh()?"":"ol-unsupported"),c=Bf("DIV",d,c);Ug.call(this,{element:c,target:b.target});this.o=m(b.keys)?b.keys:!1}v(Eh,Ug);
Eh.prototype.p=function(b){b.preventDefault();Bh()&&(b=this.a,null!==b&&(Dh()?(b=uf().a,b.webkitCancelFullScreen?b.webkitCancelFullScreen():b.mozCancelFullScreen?b.mozCancelFullScreen():b.msExitFullscreen?b.msExitFullscreen():b.exitFullscreen&&b.exitFullscreen()):(b=b.Fd(),b=xf(b),this.o?b.mozRequestFullScreenWithKeys?b.mozRequestFullScreenWithKeys():b.webkitRequestFullscreen?b.webkitRequestFullscreen():Ch(b):Ch(b))))};
Eh.prototype.k=function(){var b=this.d+"-true",c=this.d+"-false",d=Kf(this.element),e=this.a;Dh()?(xg(d,c)&&(zg(d,c),yg(d,b)),Jf(this.g,this.e)):(xg(d,b)&&(zg(d,b),yg(d,c)),Jf(this.e,this.g));null===e||e.q()};function Fh(b){b=m(b)?b:{};var c=Bf("DIV",m(b.className)?b.className:"ol-mouse-position");Ug.call(this,{element:c,render:m(b.render)?b.render:Gh,target:b.target});w(this,ud("projection"),this.S,!1,this);m(b.coordinateFormat)&&this.D(b.coordinateFormat);m(b.projection)&&this.r(ze(b.projection));this.U=m(b.undefinedHTML)?b.undefinedHTML:"";this.o=c.innerHTML;this.g=this.e=this.d=null}v(Fh,Ug);
function Gh(b){b=b.frameState;null===b?this.d=null:this.d!=b.viewState.projection&&(this.d=b.viewState.projection,this.e=null);Hh(this,this.g)}Fh.prototype.S=function(){this.e=null};Fh.prototype.k=function(){return this.get("coordinateFormat")};Fh.prototype.getCoordinateFormat=Fh.prototype.k;Fh.prototype.p=function(){return this.get("projection")};Fh.prototype.getProjection=Fh.prototype.p;Fh.prototype.H=function(b){this.g=this.a.hd(b.a);Hh(this,this.g)};
Fh.prototype.N=function(){Hh(this,null);this.g=null};Fh.prototype.setMap=function(b){Fh.T.setMap.call(this,b);null!==b&&(b=b.b,this.q.push(w(b,"mousemove",this.H,!1,this),w(b,"mouseout",this.N,!1,this)))};Fh.prototype.D=function(b){this.set("coordinateFormat",b)};Fh.prototype.setCoordinateFormat=Fh.prototype.D;Fh.prototype.r=function(b){this.set("projection",b)};Fh.prototype.setProjection=Fh.prototype.r;
function Hh(b,c){var d=b.U;if(null!==c&&null!==b.d){if(null===b.e){var e=b.p();b.e=m(e)?De(b.d,e):Te}e=b.a.sa(c);null!==e&&(b.e(e,e),d=b.k(),d=m(d)?d(e):e.toString())}m(b.o)&&d==b.o||(b.element.innerHTML=d,b.o=d)};function Ih(b,c,d){lc.call(this);this.d=b;this.b=d;this.a=c||window;this.c=ra(this.jf,this)}v(Ih,lc);l=Ih.prototype;l.aa=null;l.Pe=!1;l.start=function(){Jh(this);this.Pe=!1;var b=Kh(this),c=Lh(this);b&&!c&&this.a.mozRequestAnimationFrame?(this.aa=w(this.a,"MozBeforePaint",this.c),this.a.mozRequestAnimationFrame(null),this.Pe=!0):this.aa=b&&c?b.call(this.a,this.c):this.a.setTimeout(ed(this.c),20)};
function Jh(b){if(null!=b.aa){var c=Kh(b),d=Lh(b);c&&!d&&b.a.mozRequestAnimationFrame?Wc(b.aa):c&&d?d.call(b.a,b.aa):b.a.clearTimeout(b.aa)}b.aa=null}l.jf=function(){this.Pe&&this.aa&&Wc(this.aa);this.aa=null;this.d.call(this.b,ta())};l.P=function(){Jh(this);Ih.T.P.call(this)};function Kh(b){b=b.a;return b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||b.oRequestAnimationFrame||b.msRequestAnimationFrame||null}
function Lh(b){b=b.a;return b.cancelAnimationFrame||b.cancelRequestAnimationFrame||b.webkitCancelRequestAnimationFrame||b.mozCancelRequestAnimationFrame||b.oCancelRequestAnimationFrame||b.msCancelRequestAnimationFrame||null};function Mh(b){ba.setTimeout(function(){throw b;},0)}function Nh(b,c){var d=b;c&&(d=ra(b,c));d=Oh(d);!ka(ba.setImmediate)||ba.Window&&ba.Window.prototype.setImmediate==ba.setImmediate?(Ph||(Ph=Qh()),Ph(d)):ba.setImmediate(d)}var Ph;
function Qh(){var b=ba.MessageChannel;"undefined"===typeof b&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&(b=function(){var b=document.createElement("iframe");b.style.display="none";b.src="";document.documentElement.appendChild(b);var c=b.contentWindow,b=c.document;b.open();b.write("");b.close();var d="callImmediate"+Math.random(),e="file:"==c.location.protocol?"*":c.location.protocol+"//"+c.location.host,b=ra(function(b){if(("*"==e||b.origin==e)&&b.data==d)this.port1.onmessage()},
this);c.addEventListener("message",b,!1);this.port1={};this.port2={postMessage:function(){c.postMessage(d,e)}}});if("undefined"!==typeof b&&!lb("Trident")&&!lb("MSIE")){var c=new b,d={},e=d;c.port1.onmessage=function(){if(m(d.next)){d=d.next;var b=d.ef;d.ef=null;b()}};return function(b){e.next={ef:b};e=e.next;c.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(b){var c=document.createElement("script");c.onreadystatechange=function(){c.onreadystatechange=
null;c.parentNode.removeChild(c);c=null;b();b=null};document.documentElement.appendChild(c)}:function(b){ba.setTimeout(b,0)}}var Oh=dd;function Rh(b){if("function"==typeof b.ob)return b.ob();if(ia(b))return b.split("");if(ha(b)){for(var c=[],d=b.length,e=0;e<d;e++)c.push(b[e]);return c}return qb(b)}
function Sh(b,c){if("function"==typeof b.forEach)b.forEach(c,void 0);else if(ha(b)||ia(b))Qa(b,c,void 0);else{var d;if("function"==typeof b.G)d=b.G();else if("function"!=typeof b.ob)if(ha(b)||ia(b)){d=[];for(var e=b.length,f=0;f<e;f++)d.push(f)}else d=rb(b);else d=void 0;for(var e=Rh(b),f=e.length,g=0;g<f;g++)c.call(void 0,e[g],d&&d[g],b)}};function Th(b,c){this.c={};this.a=[];this.b=0;var d=arguments.length;if(1<d){if(d%2)throw Error("Uneven number of arguments");for(var e=0;e<d;e+=2)this.set(arguments[e],arguments[e+1])}else if(b){b instanceof Th?(d=b.G(),e=b.ob()):(d=rb(b),e=qb(b));for(var f=0;f<d.length;f++)this.set(d[f],e[f])}}l=Th.prototype;l.Tb=function(){return this.b};l.ob=function(){Uh(this);for(var b=[],c=0;c<this.a.length;c++)b.push(this.c[this.a[c]]);return b};l.G=function(){Uh(this);return this.a.concat()};
l.la=function(){return 0==this.b};l.clear=function(){this.c={};this.b=this.a.length=0};l.remove=function(b){return Vh(this.c,b)?(delete this.c[b],this.b--,this.a.length>2*this.b&&Uh(this),!0):!1};function Uh(b){if(b.b!=b.a.length){for(var c=0,d=0;c<b.a.length;){var e=b.a[c];Vh(b.c,e)&&(b.a[d++]=e);c++}b.a.length=d}if(b.b!=b.a.length){for(var f={},d=c=0;c<b.a.length;)e=b.a[c],Vh(f,e)||(b.a[d++]=e,f[e]=1),c++;b.a.length=d}}l.get=function(b,c){return Vh(this.c,b)?this.c[b]:c};
l.set=function(b,c){Vh(this.c,b)||(this.b++,this.a.push(b));this.c[b]=c};l.forEach=function(b,c){for(var d=this.G(),e=0;e<d.length;e++){var f=d[e],g=this.get(f);b.call(c,g,f,this)}};l.clone=function(){return new Th(this)};function Vh(b,c){return Object.prototype.hasOwnProperty.call(b,c)};function Wh(){this.a=ta()}new Wh;Wh.prototype.set=function(b){this.a=b};Wh.prototype.get=function(){return this.a};function Xh(b){hd.call(this);this.Wc=b||window;this.ud=w(this.Wc,"resize",this.Ni,!1,this);this.vd=Af(this.Wc||window)}v(Xh,hd);l=Xh.prototype;l.ud=null;l.Wc=null;l.vd=null;l.P=function(){Xh.T.P.call(this);this.ud&&(Wc(this.ud),this.ud=null);this.vd=this.Wc=null};l.Ni=function(){var b=Af(this.Wc||window),c=this.vd;b==c||b&&c&&b.width==c.width&&b.height==c.height||(this.vd=b,this.dispatchEvent("resize"))};function Yh(b,c,d,e,f){if(!(Gb||Ib&&Pb("525")))return!0;if(Jb&&f)return $h(b);if(f&&!e)return!1;ja(c)&&(c=ai(c));if(!d&&(17==c||18==c||Jb&&91==c))return!1;if(Ib&&e&&d)switch(b){case 220:case 219:case 221:case 192:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:return!1}if(Gb&&e&&c==b)return!1;switch(b){case 13:return!0;case 27:return!Ib}return $h(b)}
function $h(b){if(48<=b&&57>=b||96<=b&&106>=b||65<=b&&90>=b||Ib&&0==b)return!0;switch(b){case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 59:case 189:case 187:case 61:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return!0;default:return!1}}function ai(b){if(Hb)b=bi(b);else if(Jb&&Ib)a:switch(b){case 93:b=91;break a}return b}
function bi(b){switch(b){case 61:return 187;case 59:return 186;case 173:return 189;case 224:return 91;case 0:return 224;default:return b}};function ci(b,c){hd.call(this);b&&di(this,b,c)}v(ci,hd);l=ci.prototype;l.ba=null;l.Ad=null;l.ue=null;l.Bd=null;l.Qa=-1;l.Gb=-1;l.je=!1;
var ei={3:13,12:144,63232:38,63233:40,63234:37,63235:39,63236:112,63237:113,63238:114,63239:115,63240:116,63241:117,63242:118,63243:119,63244:120,63245:121,63246:122,63247:123,63248:44,63272:46,63273:36,63275:35,63276:33,63277:34,63289:144,63302:45},fi={Up:38,Down:40,Left:37,Right:39,Enter:13,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,"U+007F":46,Home:36,End:35,PageUp:33,PageDown:34,Insert:45},gi=Gb||Ib&&Pb("525"),hi=Jb&&Hb;
ci.prototype.a=function(b){Ib&&(17==this.Qa&&!b.n||18==this.Qa&&!b.c||Jb&&91==this.Qa&&!b.k)&&(this.Gb=this.Qa=-1);-1==this.Qa&&(b.n&&17!=b.f?this.Qa=17:b.c&&18!=b.f?this.Qa=18:b.k&&91!=b.f&&(this.Qa=91));gi&&!Yh(b.f,this.Qa,b.d,b.n,b.c)?this.handleEvent(b):(this.Gb=ai(b.f),hi&&(this.je=b.c))};ci.prototype.c=function(b){this.Gb=this.Qa=-1;this.je=b.c};
ci.prototype.handleEvent=function(b){var c=b.a,d,e,f=c.altKey;Gb&&"keypress"==b.type?(d=this.Gb,e=13!=d&&27!=d?c.keyCode:0):Ib&&"keypress"==b.type?(d=this.Gb,e=0<=c.charCode&&63232>c.charCode&&$h(d)?c.charCode:0):Fb?(d=this.Gb,e=$h(d)?c.keyCode:0):(d=c.keyCode||this.Gb,e=c.charCode||0,hi&&(f=this.je),Jb&&63==e&&224==d&&(d=191));var g=d=ai(d),h=c.keyIdentifier;d?63232<=d&&d in ei?g=ei[d]:25==d&&b.d&&(g=9):h&&h in fi&&(g=fi[h]);this.Qa=g;b=new ii(g,e,0,c);b.c=f;this.dispatchEvent(b)};
function di(b,c,d){b.Bd&&ji(b);b.ba=c;b.Ad=w(b.ba,"keypress",b,d);b.ue=w(b.ba,"keydown",b.a,d,b);b.Bd=w(b.ba,"keyup",b.c,d,b)}function ji(b){b.Ad&&(Wc(b.Ad),Wc(b.ue),Wc(b.Bd),b.Ad=null,b.ue=null,b.Bd=null);b.ba=null;b.Qa=-1;b.Gb=-1}ci.prototype.P=function(){ci.T.P.call(this);ji(this)};function ii(b,c,d,e){wc.call(this,e);this.type="key";this.f=b;this.i=c}v(ii,wc);function ki(b,c){hd.call(this);var d=this.ba=b;(d=la(d)&&1==d.nodeType?this.ba:this.ba?this.ba.body:null)&&Fg(d,"direction");this.a=w(this.ba,Hb?"DOMMouseScroll":"mousewheel",this,c)}v(ki,hd);
ki.prototype.handleEvent=function(b){var c=0,d=0,e=0;b=b.a;if("mousewheel"==b.type){d=1;if(Gb||Ib&&(Kb||Pb("532.0")))d=40;e=li(-b.wheelDelta,d);m(b.wheelDeltaX)?(c=li(-b.wheelDeltaX,d),d=li(-b.wheelDeltaY,d)):d=e}else e=b.detail,100<e?e=3:-100>e&&(e=-3),m(b.axis)&&b.axis===b.HORIZONTAL_AXIS?c=e:d=e;ja(this.c)&&Vb(c,-this.c,this.c);ja(this.b)&&(d=Vb(d,-this.b,this.b));c=new mi(e,b,0,d);this.dispatchEvent(c)};function li(b,c){return Ib&&(Jb||Lb)&&0!=b%c?b:b/c}
ki.prototype.P=function(){ki.T.P.call(this);Wc(this.a);this.a=null};function mi(b,c,d,e){wc.call(this,c);this.type="mousewheel";this.detail=b;this.q=e}v(mi,wc);function ni(b,c,d){qc.call(this,b);this.a=c;b=m(d)?d:{};this.buttons=oi(b);this.pressure=pi(b,this.buttons);this.bubbles=zb(b,"bubbles",!1);this.cancelable=zb(b,"cancelable",!1);this.view=zb(b,"view",null);this.detail=zb(b,"detail",null);this.screenX=zb(b,"screenX",0);this.screenY=zb(b,"screenY",0);this.clientX=zb(b,"clientX",0);this.clientY=zb(b,"clientY",0);this.button=zb(b,"button",0);this.relatedTarget=zb(b,"relatedTarget",null);this.pointerId=zb(b,"pointerId",0);this.width=zb(b,"width",0);this.height=
zb(b,"height",0);this.pointerType=zb(b,"pointerType","");this.isPrimary=zb(b,"isPrimary",!1);c.preventDefault&&(this.preventDefault=function(){c.preventDefault()})}v(ni,qc);function oi(b){if(b.buttons||qi)b=b.buttons;else switch(b.which){case 1:b=1;break;case 2:b=4;break;case 3:b=2;break;default:b=0}return b}function pi(b,c){var d=0;b.pressure?d=b.pressure:d=c?.5:0;return d}var qi=!1;try{qi=1===(new MouseEvent("click",{buttons:1})).buttons}catch(ri){};function si(b,c){this.a=b;this.f=c};function ti(b){si.call(this,b,{mousedown:this.Wi,mousemove:this.Xi,mouseup:this.$i,mouseover:this.Zi,mouseout:this.Yi});this.c=b.c;this.b=[]}v(ti,si);function ui(b,c){for(var d=b.b,e=c.clientX,f=c.clientY,g=0,h=d.length,k;g<h&&(k=d[g]);g++){var n=Math.abs(f-k[1]);if(25>=Math.abs(e-k[0])&&25>=n)return!0}return!1}function vi(b){var c=wi(b,b.a),d=c.preventDefault;c.preventDefault=function(){b.preventDefault();d()};c.pointerId=1;c.isPrimary=!0;c.pointerType="mouse";return c}l=ti.prototype;
l.Wi=function(b){if(!ui(this,b)){(1).toString()in this.c&&this.cancel(b);var c=vi(b);this.c[(1).toString()]=b;xi(this.a,yi,c,b)}};l.Xi=function(b){if(!ui(this,b)){var c=vi(b);xi(this.a,zi,c,b)}};l.$i=function(b){if(!ui(this,b)){var c=this.c[(1).toString()];c&&c.button===b.button&&(c=vi(b),xi(this.a,Ai,c,b),yb(this.c,(1).toString()))}};l.Zi=function(b){if(!ui(this,b)){var c=vi(b);Bi(this.a,c,b)}};l.Yi=function(b){if(!ui(this,b)){var c=vi(b);Ci(this.a,c,b)}};
l.cancel=function(b){var c=vi(b);this.a.cancel(c,b);yb(this.c,(1).toString())};function Di(b){si.call(this,b,{MSPointerDown:this.ej,MSPointerMove:this.fj,MSPointerUp:this.ij,MSPointerOut:this.gj,MSPointerOver:this.hj,MSPointerCancel:this.dj,MSGotPointerCapture:this.bj,MSLostPointerCapture:this.cj});this.c=b.c;this.b=["","unavailable","touch","pen","mouse"]}v(Di,si);function Ei(b,c){var d=c;ja(c.a.pointerType)&&(d=wi(c,c.a),d.pointerType=b.b[c.a.pointerType]);return d}l=Di.prototype;l.ej=function(b){this.c[b.a.pointerId]=b;var c=Ei(this,b);xi(this.a,yi,c,b)};
l.fj=function(b){var c=Ei(this,b);xi(this.a,zi,c,b)};l.ij=function(b){var c=Ei(this,b);xi(this.a,Ai,c,b);yb(this.c,b.a.pointerId)};l.gj=function(b){var c=Ei(this,b);Ci(this.a,c,b)};l.hj=function(b){var c=Ei(this,b);Bi(this.a,c,b)};l.dj=function(b){var c=Ei(this,b);this.a.cancel(c,b);yb(this.c,b.a.pointerId)};l.cj=function(b){this.a.dispatchEvent(new ni("lostpointercapture",b,b.a))};l.bj=function(b){this.a.dispatchEvent(new ni("gotpointercapture",b,b.a))};function Fi(b){si.call(this,b,{pointerdown:this.ql,pointermove:this.rl,pointerup:this.ul,pointerout:this.sl,pointerover:this.tl,pointercancel:this.pl,gotpointercapture:this.li,lostpointercapture:this.Vi})}v(Fi,si);l=Fi.prototype;l.ql=function(b){Gi(this.a,b)};l.rl=function(b){Gi(this.a,b)};l.ul=function(b){Gi(this.a,b)};l.sl=function(b){Gi(this.a,b)};l.tl=function(b){Gi(this.a,b)};l.pl=function(b){Gi(this.a,b)};l.Vi=function(b){Gi(this.a,b)};l.li=function(b){Gi(this.a,b)};function Hi(b,c){si.call(this,b,{touchstart:this.pm,touchmove:this.om,touchend:this.nm,touchcancel:this.mm});this.c=b.c;this.g=c;this.b=void 0;this.e=0;this.d=void 0}v(Hi,si);l=Hi.prototype;l.ng=function(){this.e=0;this.d=void 0};
function Ii(b,c,d){c=wi(c,d);c.pointerId=d.identifier+2;c.bubbles=!0;c.cancelable=!0;c.detail=b.e;c.button=0;c.buttons=1;c.width=d.webkitRadiusX||d.radiusX||0;c.height=d.webkitRadiusY||d.radiusY||0;c.pressure=d.webkitForce||d.force||.5;c.isPrimary=b.b===d.identifier;c.pointerType="touch";c.clientX=d.clientX;c.clientY=d.clientY;c.screenX=d.screenX;c.screenY=d.screenY;return c}
function Ji(b,c,d){function e(){c.preventDefault()}var f=Array.prototype.slice.call(c.a.changedTouches),g=f.length,h,k;for(h=0;h<g;++h)k=Ii(b,c,f[h]),k.preventDefault=e,d.call(b,c,k)}
l.pm=function(b){var c=b.a.touches,d=rb(this.c),e=d.length;if(e>=c.length){var f=[],g,h,k;for(g=0;g<e;++g){h=d[g];k=this.c[h];var n;if(!(n=1==h))a:{n=c.length;for(var p=void 0,q=0;q<n;q++)if(p=c[q],p.identifier===h-2){n=!0;break a}n=!1}n||f.push(k.dc)}for(g=0;g<f.length;++g)this.ke(b,f[g])}c=pb(this.c);if(0===c||1===c&&(1).toString()in this.c)this.b=b.a.changedTouches[0].identifier,m(this.d)&&ba.clearTimeout(this.d);Ki(this,b);this.e++;Ji(this,b,this.ll)};
l.ll=function(b,c){this.c[c.pointerId]={target:c.target,dc:c,Zf:c.target};var d=this.a;c.bubbles=!0;xi(d,Li,c,b);d=this.a;c.bubbles=!1;xi(d,Mi,c,b);xi(this.a,yi,c,b)};l.om=function(b){b.preventDefault();Ji(this,b,this.aj)};l.aj=function(b,c){var d=this.c[c.pointerId];if(d){var e=d.dc,f=d.Zf;xi(this.a,zi,c,b);e&&f!==c.target&&(e.relatedTarget=c.target,c.relatedTarget=f,e.target=f,c.target?(Ci(this.a,e,b),Bi(this.a,c,b)):(c.target=f,c.relatedTarget=null,this.ke(b,c)));d.dc=c;d.Zf=c.target}};
l.nm=function(b){Ki(this,b);Ji(this,b,this.qm)};l.qm=function(b,c){xi(this.a,Ai,c,b);this.a.dc(c,b);var d=this.a;c.bubbles=!1;xi(d,Ni,c,b);yb(this.c,c.pointerId);c.isPrimary&&(this.b=void 0,this.d=ba.setTimeout(ra(this.ng,this),200))};l.mm=function(b){Ji(this,b,this.ke)};l.ke=function(b,c){this.a.cancel(c,b);this.a.dc(c,b);var d=this.a;c.bubbles=!1;xi(d,Ni,c,b);yb(this.c,c.pointerId);c.isPrimary&&(this.b=void 0,this.d=ba.setTimeout(ra(this.ng,this),200))};
function Ki(b,c){var d=b.g.b,e=c.a.changedTouches[0];if(b.b===e.identifier){var f=[e.clientX,e.clientY];d.push(f);ba.setTimeout(function(){Xa(d,f)},2500)}};function Oi(b){hd.call(this);this.ba=b;this.c={};this.b={};this.a=[];cg?Pi(this,new Fi(this)):dg?Pi(this,new Di(this)):(b=new ti(this),Pi(this,b),bg&&Pi(this,new Hi(this,b)));b=this.a.length;for(var c,d=0;d<b;d++)c=this.a[d],Qi(this,rb(c.f))}v(Oi,hd);function Pi(b,c){var d=rb(c.f);d&&(Qa(d,function(b){var d=c.f[b];d&&(this.b[b]=ra(d,c))},b),b.a.push(c))}Oi.prototype.d=function(b){var c=this.b[b.type];c&&c(b)};function Qi(b,c){Qa(c,function(b){w(this.ba,b,this.d,!1,this)},b)}
function Ri(b,c){Qa(c,function(b){Vc(this.ba,b,this.d,!1,this)},b)}function wi(b,c){for(var d={},e,f=0,g=Si.length;f<g;f++)e=Si[f][0],d[e]=b[e]||c[e]||Si[f][1];return d}Oi.prototype.dc=function(b,c){b.bubbles=!0;xi(this,Ti,b,c)};Oi.prototype.cancel=function(b,c){xi(this,Ui,b,c)};function Ci(b,c,d){b.dc(c,d);c.target.contains(c.relatedTarget)||(c.bubbles=!1,xi(b,Ni,c,d))}function Bi(b,c,d){c.bubbles=!0;xi(b,Li,c,d);c.target.contains(c.relatedTarget)||(c.bubbles=!1,xi(b,Mi,c,d))}
function xi(b,c,d,e){b.dispatchEvent(new ni(c,e,d))}function Gi(b,c){b.dispatchEvent(new ni(c.type,c,c.a))}Oi.prototype.P=function(){for(var b=this.a.length,c,d=0;d<b;d++)c=this.a[d],Ri(this,rb(c.f));Oi.T.P.call(this)};
var zi="pointermove",yi="pointerdown",Ai="pointerup",Li="pointerover",Ti="pointerout",Mi="pointerenter",Ni="pointerleave",Ui="pointercancel",Si=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",
!1],["type",""],["target",null],["currentTarget",null],["which",0]];function Vi(b,c,d,e,f){Tg.call(this,b,c,f);this.a=d;this.originalEvent=d.a;this.pixel=c.hd(this.originalEvent);this.coordinate=c.sa(this.pixel);this.dragging=m(e)?e:!1}v(Vi,Tg);Vi.prototype.preventDefault=function(){Vi.T.preventDefault.call(this);this.a.preventDefault()};Vi.prototype.pb=function(){Vi.T.pb.call(this);this.a.pb()};function Wi(b,c,d,e,f){Vi.call(this,b,c,d.a,e,f);this.c=d}v(Wi,Vi);
function Xi(b){hd.call(this);this.b=b;this.e=0;this.g=!1;this.c=this.n=this.d=null;b=this.b.b;this.q=0;this.k={};this.f=new Oi(b);this.a=null;this.n=w(this.f,yi,this.Ji,!1,this);this.i=w(this.f,zi,this.Ll,!1,this)}v(Xi,hd);function Yi(b,c){var d;d=new Wi(Zi,b.b,c);b.dispatchEvent(d);0!==b.e?(ba.clearTimeout(b.e),b.e=0,d=new Wi($i,b.b,c),b.dispatchEvent(d)):b.e=ba.setTimeout(ra(function(){this.e=0;var b=new Wi(aj,this.b,c);this.dispatchEvent(b)},b),250)}
function bj(b,c){c.type==cj||c.type==dj?delete b.k[c.pointerId]:c.type==ej&&(b.k[c.pointerId]=!0);b.q=pb(b.k)}l=Xi.prototype;l.uf=function(b){bj(this,b);var c=new Wi(cj,this.b,b);this.dispatchEvent(c);!this.g&&0===b.button&&Yi(this,this.c);0===this.q&&(Qa(this.d,Wc),this.d=null,this.g=!1,this.c=null,pc(this.a),this.a=null)};
l.Ji=function(b){bj(this,b);var c=new Wi(ej,this.b,b);this.dispatchEvent(c);this.c=b;null===this.d&&(this.a=new Oi(document),this.d=[w(this.a,fj,this.xj,!1,this),w(this.a,cj,this.uf,!1,this),w(this.f,dj,this.uf,!1,this)])};l.xj=function(b){if(b.clientX!=this.c.clientX||b.clientY!=this.c.clientY){this.g=!0;var c=new Wi(gj,this.b,b,this.g);this.dispatchEvent(c)}b.preventDefault()};l.Ll=function(b){this.dispatchEvent(new Wi(b.type,this.b,b,null!==this.c&&(b.clientX!=this.c.clientX||b.clientY!=this.c.clientY)))};
l.P=function(){null!==this.i&&(Wc(this.i),this.i=null);null!==this.n&&(Wc(this.n),this.n=null);null!==this.d&&(Qa(this.d,Wc),this.d=null);null!==this.a&&(pc(this.a),this.a=null);null!==this.f&&(pc(this.f),this.f=null);Xi.T.P.call(this)};var aj="singleclick",Zi="click",$i="dblclick",gj="pointerdrag",fj="pointermove",ej="pointerdown",cj="pointerup",dj="pointercancel",hj={Om:aj,Dm:Zi,Em:$i,Hm:gj,Km:fj,Gm:ej,Nm:cj,Mm:"pointerover",Lm:"pointerout",Im:"pointerenter",Jm:"pointerleave",Fm:dj};function C(b){qd.call(this);var c=Bb(b);c.brightness=m(b.brightness)?b.brightness:0;c.contrast=m(b.contrast)?b.contrast:1;c.hue=m(b.hue)?b.hue:0;c.opacity=m(b.opacity)?b.opacity:1;c.saturation=m(b.saturation)?b.saturation:1;c.visible=m(b.visible)?b.visible:!0;c.maxResolution=m(b.maxResolution)?b.maxResolution:Infinity;c.minResolution=m(b.minResolution)?b.minResolution:0;this.C(c)}v(C,qd);C.prototype.d=function(){return this.get("brightness")};C.prototype.getBrightness=C.prototype.d;
C.prototype.f=function(){return this.get("contrast")};C.prototype.getContrast=C.prototype.f;C.prototype.e=function(){return this.get("hue")};C.prototype.getHue=C.prototype.e;function ij(b){var c=b.d(),d=b.f(),e=b.e(),f=b.q(),g=b.k(),h=b.kb(),k=b.b(),n=b.J(),p=b.g(),q=b.i();return{layer:b,brightness:Vb(c,-1,1),contrast:Math.max(d,0),hue:e,opacity:Vb(f,0,1),saturation:Math.max(g,0),yc:h,visible:k,extent:n,maxResolution:p,minResolution:Math.max(q,0)}}C.prototype.J=function(){return this.get("extent")};
C.prototype.getExtent=C.prototype.J;C.prototype.g=function(){return this.get("maxResolution")};C.prototype.getMaxResolution=C.prototype.g;C.prototype.i=function(){return this.get("minResolution")};C.prototype.getMinResolution=C.prototype.i;C.prototype.q=function(){return this.get("opacity")};C.prototype.getOpacity=C.prototype.q;C.prototype.k=function(){return this.get("saturation")};C.prototype.getSaturation=C.prototype.k;C.prototype.b=function(){return this.get("visible")};
C.prototype.getVisible=C.prototype.b;C.prototype.D=function(b){this.set("brightness",b)};C.prototype.setBrightness=C.prototype.D;C.prototype.H=function(b){this.set("contrast",b)};C.prototype.setContrast=C.prototype.H;C.prototype.N=function(b){this.set("hue",b)};C.prototype.setHue=C.prototype.N;C.prototype.o=function(b){this.set("extent",b)};C.prototype.setExtent=C.prototype.o;C.prototype.S=function(b){this.set("maxResolution",b)};C.prototype.setMaxResolution=C.prototype.S;
C.prototype.U=function(b){this.set("minResolution",b)};C.prototype.setMinResolution=C.prototype.U;C.prototype.p=function(b){this.set("opacity",b)};C.prototype.setOpacity=C.prototype.p;C.prototype.ca=function(b){this.set("saturation",b)};C.prototype.setSaturation=C.prototype.ca;C.prototype.da=function(b){this.set("visible",b)};C.prototype.setVisible=C.prototype.da;function D(b){var c=Bb(b);delete c.source;C.call(this,c);this.va=null;w(this,ud("source"),this.yh,!1,this);this.fa(m(b.source)?b.source:null)}v(D,C);function jj(b,c){return b.visible&&c>=b.minResolution&&c<b.maxResolution}D.prototype.Xa=function(b){b=m(b)?b:[];b.push(ij(this));return b};D.prototype.a=function(){var b=this.get("source");return m(b)?b:null};D.prototype.getSource=D.prototype.a;D.prototype.kb=function(){var b=this.a();return null===b?"undefined":b.q};D.prototype.mi=function(){this.l()};
D.prototype.yh=function(){null!==this.va&&(Wc(this.va),this.va=null);var b=this.a();null!==b&&(this.va=w(b,"change",this.mi,!1,this));this.l()};D.prototype.fa=function(b){this.set("source",b)};D.prototype.setSource=D.prototype.fa;function kj(b,c,d,e,f){hd.call(this);this.e=f;this.extent=b;this.f=d;this.resolution=c;this.state=e}v(kj,hd);kj.prototype.J=function(){return this.extent};function lj(b,c,d,e,f,g,h,k){Ld(b);0===c&&0===d||Od(b,c,d);1==e&&1==f||Pd(b,e,f);0!==g&&Qd(b,g);0===h&&0===k||Od(b,h,k);return b}function mj(b,c){return b[0]==c[0]&&b[1]==c[1]&&b[4]==c[4]&&b[5]==c[5]&&b[12]==c[12]&&b[13]==c[13]}function nj(b,c,d){var e=b[1],f=b[5],g=b[13],h=c[0];c=c[1];d[0]=b[0]*h+b[4]*c+b[12];d[1]=e*h+f*c+g;return d};function oj(b){kd.call(this);this.a=b}v(oj,kd);l=oj.prototype;l.Ua=ca;l.cc=function(b,c,d,e){b=b.slice();nj(c.pixelToCoordinateMatrix,b,b);if(this.Ua(b,c,bd,this))return d.call(e,this.a)};l.Hd=ad;l.ed=function(b,c){return function(d,e){return qh(b,d,e,function(b){c[d]||(c[d]={});c[d][b.a.toString()]=b})}};l.Uj=function(b){2===b.target.state&&pj(this)};function rj(b,c){var d=c.state;2!=d&&3!=d&&w(c,"change",b.Uj,!1,b);0==d&&(c.load(),d=c.state);return 2==d}
function pj(b){var c=b.a;c.b()&&"ready"==c.kb()&&b.l()}function sj(b,c){Yg(c.a)&&b.postRenderFunctions.push(sa(function(b,c,f){c=ma(b).toString();b=b.a;f=f.usedTiles[c];for(var g;Yg(b)&&!(c=b.a.hc,g=c.a[0].toString(),g in f&&f[g].contains(c.a));)b.pop().Jc()},c))}function tj(b,c){if(null!=c){var d,e,f;e=0;for(f=c.length;e<f;++e)d=c[e],b[ma(d).toString()]=d}}function uj(b,c){var d=c.D;m(d)&&(ia(d)?b.logos[d]="":la(d)&&(b.logos[d.src]=d.href))}
function vj(b,c,d,e){c=ma(c).toString();d=d.toString();c in b?d in b[c]?(b=b[c][d],e.a<b.a&&(b.a=e.a),e.d>b.d&&(b.d=e.d),e.b<b.b&&(b.b=e.b),e.c>b.c&&(b.c=e.c)):b[c][d]=e:(b[c]={},b[c][d]=e)}function wj(b,c,d){return[c*(Math.round(b[0]/c)+d[0]%2/2),c*(Math.round(b[1]/c)+d[1]%2/2)]}
function xj(b,c,d,e,f,g,h,k,n,p){var q=ma(c).toString();q in b.wantedTiles||(b.wantedTiles[q]={});var r=b.wantedTiles[q];b=b.tileQueue;var s=d.minZoom,u,y,z,A,E,x;for(x=h;x>=s;--x)for(y=fh(d,g,x,y),z=d.na(x),A=y.a;A<=y.d;++A)for(E=y.b;E<=y.c;++E)h-x<=k?(u=c.Vb(x,A,E,e,f),0==u.state&&(r[jf(u.a)]=!0,u.qb()in b.b||yj(b,[u,q,ih(d,u.a),z])),m(n)&&n.call(p,u)):c.Oe(x,A,E)};function zj(b){this.o=b.opacity;this.p=b.rotateWithView;this.i=b.rotation;this.k=b.scale;this.r=b.snapToPixel}l=zj.prototype;l.Ld=function(){return this.o};l.rd=function(){return this.p};l.Md=function(){return this.i};l.Nd=function(){return this.k};l.sd=function(){return this.r};l.Od=function(b){this.i=b};l.Pd=function(b){this.k=b};function Aj(b){b=m(b)?b:{};this.f=m(b.anchor)?b.anchor:[.5,.5];this.d=null;this.c=m(b.anchorOrigin)?b.anchorOrigin:"top-left";this.g=m(b.anchorXUnits)?b.anchorXUnits:"fraction";this.n=m(b.anchorYUnits)?b.anchorYUnits:"fraction";var c=m(b.crossOrigin)?b.crossOrigin:null,d=m(b.img)?b.img:null,e=b.src;m(e)&&0!==e.length||null===d||(e=d.src);var f=m(b.src)?0:2,g=Bj.Pa(),h=g.get(e,c);null===h&&(h=new Cj(d,e,c,f),g.set(e,c,h));this.a=h;this.D=m(b.offset)?b.offset:[0,0];this.b=m(b.offsetOrigin)?b.offsetOrigin:
"top-left";this.e=null;this.q=m(b.size)?b.size:null;zj.call(this,{opacity:m(b.opacity)?b.opacity:1,rotation:m(b.rotation)?b.rotation:0,scale:m(b.scale)?b.scale:1,snapToPixel:m(b.snapToPixel)?b.snapToPixel:!0,rotateWithView:m(b.rotateWithView)?b.rotateWithView:!1})}v(Aj,zj);l=Aj.prototype;
l.wb=function(){if(null!==this.d)return this.d;var b=this.f,c=this.gb();if("fraction"==this.g||"fraction"==this.n){if(null===c)return null;b=this.f.slice();"fraction"==this.g&&(b[0]*=c[0]);"fraction"==this.n&&(b[1]*=c[1])}if("top-left"!=this.c){if(null===c)return null;b===this.f&&(b=this.f.slice());if("top-right"==this.c||"bottom-right"==this.c)b[0]=-b[0]+c[0];if("bottom-left"==this.c||"bottom-right"==this.c)b[1]=-b[1]+c[1]}return this.d=b};l.Bb=function(){return this.a.a};l.kd=function(){return this.a.c};
l.Pc=function(){return this.a.b};l.Kd=function(){var b=this.a;if(null===b.f)if(b.n){var c=b.c[0],d=b.c[1],e=Nf(c,d);e.fillRect(0,0,c,d);b.f=e.canvas}else b.f=b.a;return b.f};l.Cb=function(){if(null!==this.e)return this.e;var b=this.D;if("top-left"!=this.b){var c=this.gb(),d=this.a.c;if(null===c||null===d)return null;b=b.slice();if("top-right"==this.b||"bottom-right"==this.b)b[0]=d[0]-c[0]-b[0];if("bottom-left"==this.b||"bottom-right"==this.b)b[1]=d[1]-c[1]-b[1]}return this.e=b};l.Gk=function(){return this.a.e};
l.gb=function(){return null===this.q?this.a.c:this.q};l.we=function(b,c){return w(this.a,"change",b,!1,c)};l.load=function(){this.a.load()};l.Ne=function(b,c){Vc(this.a,"change",b,!1,c)};function Cj(b,c,d,e){hd.call(this);this.f=null;this.a=null===b?new Image:b;null!==d&&(this.a.crossOrigin=d);this.d=null;this.b=e;this.c=null;this.e=c;this.n=!1}v(Cj,hd);Cj.prototype.g=function(){this.b=3;Qa(this.d,Wc);this.d=null;this.dispatchEvent("change")};
Cj.prototype.i=function(){this.b=2;this.c=[this.a.width,this.a.height];Qa(this.d,Wc);this.d=null;var b=Nf(1,1);b.drawImage(this.a,0,0);try{b.getImageData(0,0,1,1)}catch(c){this.n=!0}this.dispatchEvent("change")};Cj.prototype.load=function(){if(0==this.b){this.b=1;this.d=[Uc(this.a,"error",this.g,!1,this),Uc(this.a,"load",this.i,!1,this)];try{this.a.src=this.e}catch(b){this.g()}}};function Bj(){this.a={};this.c=0}da(Bj);Bj.prototype.clear=function(){this.a={};this.c=0};
Bj.prototype.get=function(b,c){var d=c+":"+b;return d in this.a?this.a[d]:null};Bj.prototype.set=function(b,c,d){this.a[c+":"+b]=d;++this.c};function Dj(b,c){lc.call(this);this.g=c;this.b=null;this.e={};this.q={}}v(Dj,lc);function Ej(b){var c=b.viewState,d=b.coordinateToPixelMatrix;lj(d,b.size[0]/2,b.size[1]/2,1/c.resolution,-1/c.resolution,-c.rotation,-c.center[0],-c.center[1]);Nd(d,b.pixelToCoordinateMatrix)}l=Dj.prototype;l.P=function(){mb(this.e,pc);Dj.T.P.call(this)};
function Fj(){var b=Bj.Pa();if(32<b.c){var c=0,d,e;for(d in b.a){e=b.a[d];var f;if(f=0===(c++&3))Bc(e)?e=jd(e,void 0,void 0):(e=Qc(e),e=!!e&&Jc(e,void 0,void 0)),f=!e;f&&(delete b.a[d],--b.c)}}}
l.ye=function(b,c,d,e,f,g){var h,k=c.viewState,n=k.resolution,k=k.rotation;if(null!==this.b){var p={};if(h=this.b.b(b,n,k,{},function(b){var c=ma(b).toString();if(!(c in p))return p[c]=!0,d.call(e,b,null)}))return h}var k=c.layerStatesArray,q;for(q=k.length-1;0<=q;--q){h=k[q];var r=h.layer;if(jj(h,n)&&f.call(g,r)&&(h=Gj(this,r).Ua(b,c,d,e)))return h}};
l.Kf=function(b,c,d,e,f,g){var h,k=c.viewState,n=k.resolution,k=k.rotation;if(null!==this.b){var p=this.g.sa(b);if(this.b.b(p,n,k,{},bd)&&(h=d.call(e,null)))return h}k=c.layerStatesArray;for(p=k.length-1;0<=p;--p){h=k[p];var q=h.layer;if(jj(h,n)&&f.call(g,q)&&(h=Gj(this,q).cc(b,c,d,e)))return h}};l.Lf=function(b,c,d,e){b=this.ye(b,c,bd,this,d,e);return m(b)};function Gj(b,c){var d=ma(c).toString();if(d in b.e)return b.e[d];var e=b.ne(c);b.e[d]=e;b.q[d]=w(e,"change",b.Bi,!1,b);return e}l.Bi=function(){this.g.render()};
l.Yd=ca;l.Ql=function(b,c){for(var d in this.e)if(!(null!==c&&d in c.layerStates)){var e=d,f=this.e[e];delete this.e[e];Wc(this.q[e]);delete this.q[e];pc(f)}};function Hj(b,c){for(var d in b.e)if(!(d in c.layerStates)){c.postRenderFunctions.push(ra(b.Ql,b));break}};function Ij(b,c){this.e=b;this.f=c;this.a=[];this.c=[];this.b={}}Ij.prototype.clear=function(){this.a.length=0;this.c.length=0;xb(this.b)};function Jj(b){var c=b.a,d=b.c,e=c[0];1==c.length?(c.length=0,d.length=0):(c[0]=c.pop(),d[0]=d.pop(),Kj(b,0));c=b.f(e);delete b.b[c];return e}function yj(b,c){var d=b.e(c);Infinity!=d&&(b.a.push(c),b.c.push(d),b.b[b.f(c)]=!0,Lj(b,0,b.a.length-1))}Ij.prototype.Tb=function(){return this.a.length};Ij.prototype.la=function(){return 0===this.a.length};
function Kj(b,c){for(var d=b.a,e=b.c,f=d.length,g=d[c],h=e[c],k=c;c<f>>1;){var n=2*c+1,p=2*c+2,n=p<f&&e[p]<e[n]?p:n;d[c]=d[n];e[c]=e[n];c=n}d[c]=g;e[c]=h;Lj(b,k,c)}function Lj(b,c,d){var e=b.a;b=b.c;for(var f=e[d],g=b[d];d>c;){var h=d-1>>1;if(b[h]>g)e[d]=e[h],b[d]=b[h],d=h;else break}e[d]=f;b[d]=g}function Mj(b){var c=b.e,d=b.a,e=b.c,f=0,g=d.length,h,k,n;for(k=0;k<g;++k)h=d[k],n=c(h),Infinity==n?delete b.b[b.f(h)]:(e[f]=n,d[f++]=h);d.length=f;e.length=f;for(c=(b.a.length>>1)-1;0<=c;c--)Kj(b,c)};function Nj(b,c){Ij.call(this,function(c){return b.apply(null,c)},function(b){return b[0].qb()});this.n=c;this.d=0}v(Nj,Ij);Nj.prototype.g=function(b){b=b.target.state;if(2===b||3===b||4===b)--this.d,this.n()};function Oj(b,c,d){this.d=b;this.b=c;this.e=d;this.a=[];this.c=this.f=0}Oj.prototype.update=function(b,c){this.a.push(b,c,ta())};function Pj(b,c){var d=b.d,e=b.c,f=b.b-e,g=Qj(b);return cf({source:c,duration:g,easing:function(b){return e*(Math.exp(d*b*g)-1)/f}})}function Qj(b){return Math.log(b.b/b.c)/b.d};function Rj(b){qd.call(this);this.k=null;this.d(!0);this.handleEvent=b.handleEvent}v(Rj,qd);Rj.prototype.b=function(){return this.get("active")};Rj.prototype.getActive=Rj.prototype.b;Rj.prototype.d=function(b){this.set("active",b)};Rj.prototype.setActive=Rj.prototype.d;Rj.prototype.setMap=function(b){this.k=b};function Sj(b,c,d,e,f){if(null!=d){var g=c.d(),h=c.b();m(g)&&m(h)&&m(f)&&0<f&&(b.La(df({rotation:g,duration:f,easing:Ze})),m(e)&&b.La(cf({source:h,duration:f,easing:Ze})));c.rotate(d,e)}}
function Tj(b,c,d,e,f){var g=c.a();d=c.constrainResolution(g,d,0);Uj(b,c,d,e,f)}function Uj(b,c,d,e,f){if(null!=d){var g=c.a(),h=c.b();m(g)&&m(h)&&m(f)&&0<f&&(b.La(ef({resolution:g,duration:f,easing:Ze})),m(e)&&b.La(cf({source:h,duration:f,easing:Ze})));if(null!=e){var k;b=c.b();f=c.a();m(b)&&m(f)&&(k=[e[0]-d*(e[0]-b[0])/f,e[1]-d*(e[1]-b[1])/f]);c.Ha(k)}c.f(d)}};function Vj(b){b=m(b)?b:{};this.a=m(b.delta)?b.delta:1;Rj.call(this,{handleEvent:Wj});this.f=m(b.duration)?b.duration:250}v(Vj,Rj);function Wj(b){var c=!1,d=b.a;if(b.type==$i){var c=b.map,e=b.coordinate,d=d.d?-this.a:this.a,f=c.a();Tj(c,f,d,e,this.f);b.preventDefault();c=!0}return!c};function Xj(b){b=b.a;return b.c&&!b.g&&b.d}function Yj(b){return"pointermove"==b.type}function Zj(b){return b.type==aj}function ak(b){b=b.a;return!b.c&&!b.g&&!b.d}function bk(b){b=b.a;return!b.c&&!b.g&&b.d}function ck(b){b=b.a.target.tagName;return"INPUT"!==b&&"SELECT"!==b&&"TEXTAREA"!==b}function dk(b){return 1==b.c.pointerId};function ek(b){b=m(b)?b:{};Rj.call(this,{handleEvent:m(b.handleEvent)?b.handleEvent:fk});this.ia=m(b.handleDownEvent)?b.handleDownEvent:ad;this.ka=m(b.handleDragEvent)?b.handleDragEvent:ca;this.va=m(b.handleMoveEvent)?b.handleMoveEvent:ca;this.Ea=m(b.handleUpEvent)?b.handleUpEvent:ad;this.q=!1;this.D={};this.f=[]}v(ek,Rj);function gk(b){for(var c=b.length,d=0,e=0,f=0;f<c;f++)d+=b[f].clientX,e+=b[f].clientY;return[d/c,e/c]}
function fk(b){if(!(b instanceof Wi))return!0;var c=!1,d=b.type;if(d===ej||d===gj||d===cj)d=b.c,b.type==cj?delete this.D[d.pointerId]:b.type==ej?this.D[d.pointerId]=d:d.pointerId in this.D&&(this.D[d.pointerId]=d),this.f=qb(this.D);this.q&&(b.type==gj?this.ka(b):b.type==cj&&(this.q=this.Ea(b)));b.type==ej?(this.q=b=this.ia(b),c=this.r(b)):b.type==fj&&this.va(b);return!c}ek.prototype.r=dd;function hk(b){ek.call(this,{handleDownEvent:ik,handleDragEvent:jk,handleUpEvent:kk});b=m(b)?b:{};this.a=b.kinetic;this.e=this.g=null;this.o=m(b.condition)?b.condition:ak;this.i=!1}v(hk,ek);function jk(b){var c=gk(this.f);this.a&&this.a.update(c[0],c[1]);if(null!==this.e){var d=this.e[0]-c[0],e=c[1]-this.e[1];b=b.map;var f=b.a(),g=Xe(f),e=d=[d,e],h=g.resolution;e[0]*=h;e[1]*=h;Ad(d,g.rotation);vd(d,g.center);d=f.i(d);b.render();f.Ha(d)}this.e=c}
function kk(b){b=b.map;var c=b.a();if(0===this.f.length){var d;if(d=!this.i&&this.a)if(d=this.a,6>d.a.length)d=!1;else{var e=ta()-d.e,f=d.a.length-3;if(d.a[f+2]<e)d=!1;else{for(var g=f-3;0<g&&d.a[g+2]>e;)g-=3;var e=d.a[f+2]-d.a[g+2],h=d.a[f]-d.a[g],f=d.a[f+1]-d.a[g+1];d.f=Math.atan2(f,h);d.c=Math.sqrt(h*h+f*f)/e;d=d.c>d.b}}d&&(d=this.a,d=(d.b-d.c)/d.d,f=this.a.f,g=c.b(),this.g=Pj(this.a,g),b.La(this.g),g=b.e(g),d=b.sa([g[0]-d*Math.cos(f),g[1]-d*Math.sin(f)]),d=c.i(d),c.Ha(d));Ye(c,-1);b.render();
return!1}this.e=null;return!0}function ik(b){if(0<this.f.length&&this.o(b)){var c=b.map,d=c.a();this.e=null;this.q||Ye(d,1);c.render();null!==this.g&&Xa(c.N,this.g)&&(d.Ha(b.frameState.viewState.center),this.g=null);this.a&&(b=this.a,b.a.length=0,b.f=0,b.c=0);this.i=1<this.f.length;return!0}return!1}hk.prototype.r=ad;function lk(b){b=m(b)?b:{};ek.call(this,{handleDownEvent:mk,handleDragEvent:nk,handleUpEvent:ok});this.e=m(b.condition)?b.condition:Xj;this.a=void 0}v(lk,ek);function nk(b){if(dk(b)){var c=b.map,d=c.f();b=b.pixel;d=Math.atan2(d[1]/2-b[1],b[0]-d[0]/2);if(m(this.a)){b=d-this.a;var e=c.a(),f=e.d();c.render();Sj(c,e,f-b)}this.a=d}}function ok(b){if(!dk(b))return!0;b=b.map;var c=b.a();Ye(c,-1);var d=c.d(),d=c.constrainRotation(d,0);Sj(b,c,d,void 0,250);return!1}
function mk(b){return dk(b)&&zc(b.a)&&this.e(b)?(b=b.map,Ye(b.a(),1),b.render(),this.a=void 0,!0):!1}lk.prototype.r=ad;function pk(){kd.call(this);this.k=Sd();this.q=-1;this.e={};this.i=this.g=0}v(pk,kd);pk.prototype.f=function(b,c){var d=m(c)?c:[NaN,NaN];this.Ya(b[0],b[1],d,Infinity);return d};pk.prototype.Jb=ad;pk.prototype.J=function(b){this.q!=this.c&&(this.k=this.dd(this.k),this.q=this.c);var c=this.k;m(b)?(b[0]=c[0],b[1]=c[1],b[2]=c[2],b[3]=c[3]):b=c;return b};pk.prototype.transform=function(b,c){this.ra(Se(b,c));return this};function qk(b,c,d,e,f,g){var h=f[0],k=f[1],n=f[4],p=f[5],q=f[12];f=f[13];for(var r=m(g)?g:[],s=0;c<d;c+=e){var u=b[c],y=b[c+1];r[s++]=h*u+n*y+q;r[s++]=k*u+p*y+f}m(g)&&r.length!=s&&(r.length=s);return r};function rk(){pk.call(this);this.a="XY";this.B=2;this.j=null}v(rk,pk);function sk(b){if("XY"==b)return 2;if("XYZ"==b||"XYM"==b)return 3;if("XYZM"==b)return 4}l=rk.prototype;l.Jb=ad;l.dd=function(b){var c=this.j,d=this.j.length,e=this.B;b=Vd(Infinity,Infinity,-Infinity,-Infinity,b);return ee(b,c,0,d,e)};l.yb=function(){return this.j.slice(0,this.B)};l.zb=function(){return this.j.slice(this.j.length-this.B)};l.Ab=function(){return this.a};
l.te=function(b){this.i!=this.c&&(xb(this.e),this.g=0,this.i=this.c);if(0>b||0!==this.g&&b<=this.g)return this;var c=b.toString();if(this.e.hasOwnProperty(c))return this.e[c];var d=this.oc(b);if(d.j.length<this.j.length)return this.e[c]=d;this.g=b;return this};l.oc=function(){return this};function tk(b,c,d){b.B=sk(c);b.a=c;b.j=d}
function uk(b,c,d,e){if(m(c))d=sk(c);else{for(c=0;c<e;++c){if(0===d.length){b.a="XY";b.B=2;return}d=d[0]}d=d.length;c=2==d?"XY":3==d?"XYZ":4==d?"XYZM":void 0}b.a=c;b.B=d}l.ra=function(b){null!==this.j&&(b(this.j,this.j,this.B),this.l())};l.Ia=function(b,c){var d=this.j;if(null!==d){var e=d.length,f=this.B,g=m(d)?d:[],h=0,k,n;for(k=0;k<e;k+=f)for(g[h++]=d[k]+b,g[h++]=d[k+1]+c,n=k+2;n<k+f;++n)g[h++]=d[n];m(d)&&g.length!=h&&(g.length=h);this.l()}};function vk(b,c,d,e){for(var f=0,g=b[d-e],h=b[d-e+1];c<d;c+=e)var k=b[c],n=b[c+1],f=f+(h*k-g*n),g=k,h=n;return f/2}function wk(b,c,d,e){var f=0,g,h;g=0;for(h=d.length;g<h;++g){var k=d[g],f=f+vk(b,c,k,e);c=k}return f};function xk(b,c,d,e,f,g){var h=f-d,k=g-e;if(0!==h||0!==k){var n=((b-d)*h+(c-e)*k)/(h*h+k*k);1<n?(d=f,e=g):0<n&&(d+=h*n,e+=k*n)}return yk(b,c,d,e)}function yk(b,c,d,e){b=d-b;c=e-c;return b*b+c*c};function zk(b,c,d,e,f,g,h){var k=b[c],n=b[c+1],p=b[d]-k,q=b[d+1]-n;if(0!==p||0!==q)if(g=((f-k)*p+(g-n)*q)/(p*p+q*q),1<g)c=d;else if(0<g){for(f=0;f<e;++f)h[f]=Xb(b[c+f],b[d+f],g);h.length=e;return}for(f=0;f<e;++f)h[f]=b[c+f];h.length=e}function Ak(b,c,d,e,f){var g=b[c],h=b[c+1];for(c+=e;c<d;c+=e){var k=b[c],n=b[c+1],g=yk(g,h,k,n);g>f&&(f=g);g=k;h=n}return f}function Bk(b,c,d,e,f){var g,h;g=0;for(h=d.length;g<h;++g){var k=d[g];f=Ak(b,c,k,e,f);c=k}return f}
function Ck(b,c,d,e,f,g,h,k,n,p,q){if(c==d)return p;var r;if(0===f){r=yk(h,k,b[c],b[c+1]);if(r<p){for(q=0;q<e;++q)n[q]=b[c+q];n.length=e;return r}return p}for(var s=m(q)?q:[NaN,NaN],u=c+e;u<d;)if(zk(b,u-e,u,e,h,k,s),r=yk(h,k,s[0],s[1]),r<p){p=r;for(q=0;q<e;++q)n[q]=s[q];n.length=e;u+=e}else u+=e*Math.max((Math.sqrt(r)-Math.sqrt(p))/f|0,1);if(g&&(zk(b,d-e,c,e,h,k,s),r=yk(h,k,s[0],s[1]),r<p)){p=r;for(q=0;q<e;++q)n[q]=s[q];n.length=e}return p}
function Dk(b,c,d,e,f,g,h,k,n,p,q){q=m(q)?q:[NaN,NaN];var r,s;r=0;for(s=d.length;r<s;++r){var u=d[r];p=Ck(b,c,u,e,f,g,h,k,n,p,q);c=u}return p};function Ek(b,c){var d=0,e,f;e=0;for(f=c.length;e<f;++e)b[d++]=c[e];return d}function Fk(b,c,d,e){var f,g;f=0;for(g=d.length;f<g;++f){var h=d[f],k;for(k=0;k<e;++k)b[c++]=h[k]}return c}function Gk(b,c,d,e,f){f=m(f)?f:[];var g=0,h,k;h=0;for(k=d.length;h<k;++h)c=Fk(b,c,d[h],e),f[g++]=c;f.length=g;return f};function Hk(b,c,d,e,f){f=m(f)?f:[];for(var g=0;c<d;c+=e)f[g++]=b.slice(c,c+e);f.length=g;return f}function Ik(b,c,d,e,f){f=m(f)?f:[];var g=0,h,k;h=0;for(k=d.length;h<k;++h){var n=d[h];f[g++]=Hk(b,c,n,e,f[g]);c=n}f.length=g;return f};function Jk(b,c,d,e,f,g,h){var k=(d-c)/e;if(3>k){for(;c<d;c+=e)g[h++]=b[c],g[h++]=b[c+1];return h}var n=Array(k);n[0]=1;n[k-1]=1;d=[c,d-e];for(var p=0,q;0<d.length;){var r=d.pop(),s=d.pop(),u=0,y=b[s],z=b[s+1],A=b[r],E=b[r+1];for(q=s+e;q<r;q+=e){var x=xk(b[q],b[q+1],y,z,A,E);x>u&&(p=q,u=x)}u>f&&(n[(p-c)/e]=1,s+e<p&&d.push(s,p),p+e<r&&d.push(p,r))}for(q=0;q<k;++q)n[q]&&(g[h++]=b[c+q*e],g[h++]=b[c+q*e+1]);return h}
function Kk(b,c,d,e,f,g,h,k){var n,p;n=0;for(p=d.length;n<p;++n){var q=d[n];a:{var r=b,s=q,u=e,y=f,z=g;if(c!=s){var A=y*Math.round(r[c]/y),E=y*Math.round(r[c+1]/y);c+=u;z[h++]=A;z[h++]=E;var x=void 0,Q=void 0;do if(x=y*Math.round(r[c]/y),Q=y*Math.round(r[c+1]/y),c+=u,c==s){z[h++]=x;z[h++]=Q;break a}while(x==A&&Q==E);for(;c<s;){var N,L;N=y*Math.round(r[c]/y);L=y*Math.round(r[c+1]/y);c+=u;if(N!=x||L!=Q){var U=x-A,Ca=Q-E,eb=N-A,R=L-E;U*R==Ca*eb&&(0>U&&eb<U||U==eb||0<U&&eb>U)&&(0>Ca&&R<Ca||Ca==R||0<Ca&&
R>Ca)||(z[h++]=x,z[h++]=Q,A=x,E=Q);x=N;Q=L}}z[h++]=x;z[h++]=Q}}k.push(h);c=q}return h};function Lk(b,c){rk.call(this);this.b=this.n=-1;this.W(b,c)}v(Lk,rk);l=Lk.prototype;l.clone=function(){var b=new Lk(null);Mk(b,this.a,this.j.slice());return b};l.Ya=function(b,c,d,e){if(e<Yd(this.J(),b,c))return e;this.b!=this.c&&(this.n=Math.sqrt(Ak(this.j,0,this.j.length,this.B,0)),this.b=this.c);return Ck(this.j,0,this.j.length,this.B,this.n,!0,b,c,d,e)};l.Nj=function(){return vk(this.j,0,this.j.length,this.B)};l.Q=function(){return Hk(this.j,0,this.j.length,this.B)};
l.oc=function(b){var c=[];c.length=Jk(this.j,0,this.j.length,this.B,b,c,0);b=new Lk(null);Mk(b,"XY",c);return b};l.O=function(){return"LinearRing"};l.W=function(b,c){null===b?Mk(this,"XY",null):(uk(this,c,b,1),null===this.j&&(this.j=[]),this.j.length=Fk(this.j,0,b,this.B),this.l())};function Mk(b,c,d){tk(b,c,d);b.l()};function Nk(b,c){rk.call(this);this.W(b,c)}v(Nk,rk);l=Nk.prototype;l.clone=function(){var b=new Nk(null);Ok(b,this.a,this.j.slice());return b};l.Ya=function(b,c,d,e){var f=this.j;b=yk(b,c,f[0],f[1]);if(b<e){e=this.B;for(c=0;c<e;++c)d[c]=f[c];d.length=e;return b}return e};l.Q=function(){return null===this.j?[]:this.j.slice()};l.dd=function(b){return be(this.j,b)};l.O=function(){return"Point"};l.ja=function(b){return $d(b,this.j[0],this.j[1])};
l.W=function(b,c){null===b?Ok(this,"XY",null):(uk(this,c,b,0),null===this.j&&(this.j=[]),this.j.length=Ek(this.j,b),this.l())};function Ok(b,c,d){tk(b,c,d);b.l()};function Pk(b,c,d,e,f){return!fe(f,function(f){return!Qk(b,c,d,e,f[0],f[1])})}function Qk(b,c,d,e,f,g){for(var h=!1,k=b[d-e],n=b[d-e+1];c<d;c+=e){var p=b[c],q=b[c+1];n>g!=q>g&&f<(p-k)*(g-n)/(q-n)+k&&(h=!h);k=p;n=q}return h}function Rk(b,c,d,e,f,g){if(0===d.length||!Qk(b,c,d[0],e,f,g))return!1;var h;c=1;for(h=d.length;c<h;++c)if(Qk(b,d[c-1],d[c],e,f,g))return!1;return!0};function Sk(b,c,d,e,f,g,h){var k,n,p,q,r,s=f[g+1],u=[],y=d[0];p=b[y-e];r=b[y-e+1];for(k=c;k<y;k+=e){q=b[k];n=b[k+1];if(s<=r&&n<=s||r<=s&&s<=n)p=(s-r)/(n-r)*(q-p)+p,u.push(p);p=q;r=n}y=NaN;r=-Infinity;u.sort();p=u[0];k=1;for(n=u.length;k<n;++k){q=u[k];var z=Math.abs(q-p);z>r&&(p=(p+q)/2,Rk(b,c,d,e,p,s)&&(y=p,r=z));p=q}isNaN(y)&&(y=f[g]);return m(h)?(h.push(y,s),h):[y,s]};function Tk(b,c,d,e,f,g){for(var h=[b[c],b[c+1]],k=[],n;c+e<d;c+=e){k[0]=b[c+e];k[1]=b[c+e+1];if(n=f.call(g,h,k))return n;h[0]=k[0];h[1]=k[1]}return!1};function Uk(b,c,d,e,f){var g=ee(Sd(),b,c,d,e);return pe(f,g)?Zd(f,g)||g[0]>=f[0]&&g[2]<=f[2]||g[1]>=f[1]&&g[3]<=f[3]?!0:Tk(b,c,d,e,function(b,c){var d=!1,e=ae(f,b),g=ae(f,c);if(1===e||1===g)d=!0;else{var r=f[0],s=f[1],u=f[2],y=f[3],z=c[0],A=c[1],E=(A-b[1])/(z-b[0]);g&2&&!(e&2)?(s=z-(A-y)/E,d=s>=r&&s<=u):g&4&&!(e&4)?(r=A-(z-u)*E,d=r>=s&&r<=y):g&8&&!(e&8)?(s=z-(A-s)/E,d=s>=r&&s<=u):g&16&&!(e&16)&&(r=A-(z-r)*E,d=r>=s&&r<=y)}return d}):!1}
function Vk(b,c,d,e,f){var g=d[0];if(!(Uk(b,c,g,e,f)||Qk(b,c,g,e,f[0],f[1])||Qk(b,c,g,e,f[0],f[3])||Qk(b,c,g,e,f[2],f[1])||Qk(b,c,g,e,f[2],f[3])))return!1;if(1===d.length)return!0;c=1;for(g=d.length;c<g;++c)if(Pk(b,d[c-1],d[c],e,f))return!1;return!0};function Wk(b,c,d,e){for(var f=0,g=b[d-e],h=b[d-e+1];c<d;c+=e)var k=b[c],n=b[c+1],f=f+(k-g)*(n+h),g=k,h=n;return 0<f}function Xk(b,c,d,e){var f=0;e=m(e)?e:!1;var g,h;g=0;for(h=c.length;g<h;++g){var k=c[g],f=Wk(b,f,k,d);if(0===g){if(e&&f||!e&&!f)return!1}else if(e&&!f||!e&&f)return!1;f=k}return!0}
function Yk(b,c,d,e,f){f=m(f)?f:!1;var g,h;g=0;for(h=d.length;g<h;++g){var k=d[g],n=Wk(b,c,k,e);if(0===g?f&&n||!f&&!n:f&&!n||!f&&n)for(var n=b,p=k,q=e;c<p-q;){var r;for(r=0;r<q;++r){var s=n[c+r];n[c+r]=n[p-q+r];n[p-q+r]=s}c+=q;p-=q}c=k}return c}function Zk(b,c,d,e){var f=0,g,h;g=0;for(h=c.length;g<h;++g)f=Yk(b,f,c[g],d,e);return f};function F(b,c){rk.call(this);this.b=[];this.o=-1;this.p=null;this.H=this.r=this.D=-1;this.n=null;this.W(b,c)}v(F,rk);l=F.prototype;l.jh=function(b){null===this.j?this.j=b.j.slice():ab(this.j,b.j);this.b.push(this.j.length);this.l()};l.clone=function(){var b=new F(null);$k(b,this.a,this.j.slice(),this.b.slice());return b};
l.Ya=function(b,c,d,e){if(e<Yd(this.J(),b,c))return e;this.r!=this.c&&(this.D=Math.sqrt(Bk(this.j,0,this.b,this.B,0)),this.r=this.c);return Dk(this.j,0,this.b,this.B,this.D,!0,b,c,d,e)};l.Jb=function(b,c){return Rk(al(this),0,this.b,this.B,b,c)};l.Qj=function(){return wk(al(this),0,this.b,this.B)};l.Q=function(b){var c;m(b)?(c=al(this).slice(),Yk(c,0,this.b,this.B,b)):c=this.j;return Ik(c,0,this.b,this.B)};
function bl(b){if(b.o!=b.c){var c=ke(b.J());b.p=Sk(al(b),0,b.b,b.B,c,0);b.o=b.c}return b.p}l.Lh=function(){return new Nk(bl(this))};l.Rh=function(){return this.b.length};l.Qh=function(b){if(0>b||this.b.length<=b)return null;var c=new Lk(null);Mk(c,this.a,this.j.slice(0===b?0:this.b[b-1],this.b[b]));return c};l.ld=function(){var b=this.a,c=this.j,d=this.b,e=[],f=0,g,h;g=0;for(h=d.length;g<h;++g){var k=d[g],n=new Lk(null);Mk(n,b,c.slice(f,k));e.push(n);f=k}return e};
function al(b){if(b.H!=b.c){var c=b.j;Xk(c,b.b,b.B)?b.n=c:(b.n=c.slice(),b.n.length=Yk(b.n,0,b.b,b.B));b.H=b.c}return b.n}l.oc=function(b){var c=[],d=[];c.length=Kk(this.j,0,this.b,this.B,Math.sqrt(b),c,0,d);b=new F(null);$k(b,"XY",c,d);return b};l.O=function(){return"Polygon"};l.ja=function(b){return Vk(al(this),0,this.b,this.B,b)};
l.W=function(b,c){if(null===b)$k(this,"XY",null,this.b);else{uk(this,c,b,2);null===this.j&&(this.j=[]);var d=Gk(this.j,0,b,this.B,this.b);this.j.length=0===d.length?0:d[d.length-1];this.l()}};function $k(b,c,d,e){tk(b,c,d);b.b=e;b.l()}function cl(b,c,d,e){var f=m(e)?e:32;e=[];var g;for(g=0;g<f;++g)ab(e,b.offset(c,d,2*Math.PI*g/f));e.push(e[0],e[1]);b=new F(null);$k(b,"XY",e,[e.length]);return b};function dl(b,c,d,e,f,g,h){qc.call(this,b,c);this.vectorContext=d;this.a=e;this.frameState=f;this.context=g;this.glContext=h}v(dl,qc);function el(b){this.b=this.c=this.f=this.d=this.a=null;this.e=b}v(el,lc);function fl(b){var c=b.f,d=b.c;b=Sa([c,[c[0],d[1]],d,[d[0],c[1]]],b.a.sa,b.a);b[4]=b[0].slice();return new F([b])}el.prototype.P=function(){this.setMap(null)};el.prototype.g=function(b){var c=this.b,d=this.e;b.vectorContext.kc(Infinity,function(b){b.Ba(d.f,d.b);b.Ca(d.c);b.Rb(c,null)})};el.prototype.R=function(){return this.b};function gl(b){null===b.a||null===b.f||null===b.c||b.a.render()}
el.prototype.setMap=function(b){null!==this.d&&(Wc(this.d),this.d=null,this.a.render(),this.a=null);this.a=b;null!==this.a&&(this.d=w(b,"postcompose",this.g,!1,this),gl(this))};function hl(b,c){qc.call(this,b);this.coordinate=c}v(hl,qc);function il(b){ek.call(this,{handleDownEvent:jl,handleDragEvent:kl,handleUpEvent:ll});b=m(b)?b:{};this.e=new el(m(b.style)?b.style:null);this.a=null;this.i=m(b.condition)?b.condition:bd}v(il,ek);function kl(b){if(dk(b)){var c=this.e;b=b.pixel;c.f=this.a;c.c=b;c.b=fl(c);gl(c)}}il.prototype.R=function(){return this.e.R()};il.prototype.g=ca;
function ll(b){if(!dk(b))return!0;this.e.setMap(null);var c=b.pixel[0]-this.a[0],d=b.pixel[1]-this.a[1];64<=c*c+d*d&&(this.g(b),this.dispatchEvent(new hl("boxend",b.coordinate)));return!1}function jl(b){if(dk(b)&&zc(b.a)&&this.i(b)){this.a=b.pixel;this.e.setMap(b.map);var c=this.e,d=this.a;c.f=this.a;c.c=d;c.b=fl(c);gl(c);this.dispatchEvent(new hl("boxstart",b.coordinate));return!0}return!1};function ml(){this.c=-1};function nl(){this.c=-1;this.c=64;this.a=Array(4);this.f=Array(this.c);this.d=this.b=0;this.a[0]=1732584193;this.a[1]=4023233417;this.a[2]=2562383102;this.a[3]=271733878;this.d=this.b=0}v(nl,ml);
function pl(b,c,d){d||(d=0);var e=Array(16);if(ia(c))for(var f=0;16>f;++f)e[f]=c.charCodeAt(d++)|c.charCodeAt(d++)<<8|c.charCodeAt(d++)<<16|c.charCodeAt(d++)<<24;else for(f=0;16>f;++f)e[f]=c[d++]|c[d++]<<8|c[d++]<<16|c[d++]<<24;c=b.a[0];d=b.a[1];var f=b.a[2],g=b.a[3],h=0,h=c+(g^d&(f^g))+e[0]+3614090360&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[1]+3905402710&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[2]+606105819&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^
c))+e[3]+3250441966&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[4]+4118548399&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[5]+1200080426&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[6]+2821735955&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[7]+4249261313&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[8]+1770035416&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[9]+2336552879&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+
(d^g&(c^d))+e[10]+4294925233&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[11]+2304563134&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[12]+1804603682&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[13]+4254626195&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[14]+2792965006&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[15]+1236535329&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(f^g&(d^f))+e[1]+4129170786&4294967295;c=d+(h<<5&4294967295|
h>>>27);h=g+(d^f&(c^d))+e[6]+3225465664&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[11]+643717713&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[0]+3921069994&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(f^g&(d^f))+e[5]+3593408605&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[10]+38016083&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[15]+3634488961&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[4]+3889429448&4294967295;d=f+(h<<20&4294967295|
h>>>12);h=c+(f^g&(d^f))+e[9]+568446438&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[14]+3275163606&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[3]+4107603335&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[8]+1163531501&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(f^g&(d^f))+e[13]+2850285829&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[2]+4243563512&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[7]+1735328473&4294967295;f=g+(h<<14&4294967295|
h>>>18);h=d+(g^c&(f^g))+e[12]+2368359562&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(d^f^g)+e[5]+4294588738&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[8]+2272392833&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[11]+1839030562&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[14]+4259657740&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[1]+2763975236&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[4]+1272893353&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^
c^d)+e[7]+4139469664&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[10]+3200236656&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[13]+681279174&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[0]+3936430074&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[3]+3572445317&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[6]+76029189&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[9]+3654602809&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[12]+3873151461&4294967295;
g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[15]+530742520&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[2]+3299628645&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(f^(d|~g))+e[0]+4096336452&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[7]+1126891415&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[14]+2878612391&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[5]+4237533241&4294967295;d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[12]+1700485571&4294967295;c=d+
(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[3]+2399980690&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[10]+4293915773&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[1]+2240044497&4294967295;d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[8]+1873313359&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[15]+4264355552&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[6]+2734768916&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[13]+1309151649&4294967295;
d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[4]+4149444226&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[11]+3174756917&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[2]+718787259&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[9]+3951481745&4294967295;b.a[0]=b.a[0]+c&4294967295;b.a[1]=b.a[1]+(f+(h<<21&4294967295|h>>>11))&4294967295;b.a[2]=b.a[2]+f&4294967295;b.a[3]=b.a[3]+g&4294967295}
nl.prototype.update=function(b,c){m(c)||(c=b.length);for(var d=c-this.c,e=this.f,f=this.b,g=0;g<c;){if(0==f)for(;g<=d;)pl(this,b,g),g+=this.c;if(ia(b))for(;g<c;){if(e[f++]=b.charCodeAt(g++),f==this.c){pl(this,e);f=0;break}}else for(;g<c;)if(e[f++]=b[g++],f==this.c){pl(this,e);f=0;break}}this.b=f;this.d+=c};function ql(b){b=m(b)?b:{};this.a=m(b.color)?b.color:null;this.d=b.lineCap;this.b=m(b.lineDash)?b.lineDash:null;this.f=b.lineJoin;this.e=b.miterLimit;this.c=b.width;this.g=void 0}l=ql.prototype;l.Mk=function(){return this.a};l.Nh=function(){return this.d};l.Nk=function(){return this.b};l.Oh=function(){return this.f};l.Uh=function(){return this.e};l.Ok=function(){return this.c};l.Pk=function(b){this.a=b;this.g=void 0};l.$l=function(b){this.d=b;this.g=void 0};l.Qk=function(b){this.b=b;this.g=void 0};
l.am=function(b){this.f=b;this.g=void 0};l.bm=function(b){this.e=b;this.g=void 0};l.im=function(b){this.c=b;this.g=void 0};
l.xb=function(){if(!m(this.g)){var b="s"+(null===this.a?"-":sg(this.a))+","+(m(this.d)?this.d.toString():"-")+","+(null===this.b?"-":this.b.toString())+","+(m(this.f)?this.f:"-")+","+(m(this.e)?this.e.toString():"-")+","+(m(this.c)?this.c.toString():"-"),c=new nl;c.update(b);var d=Array((56>c.b?c.c:2*c.c)-c.b);d[0]=128;for(b=1;b<d.length-8;++b)d[b]=0;for(var e=8*c.d,b=d.length-8;b<d.length;++b)d[b]=e&255,e/=256;c.update(d);d=Array(16);for(b=e=0;4>b;++b)for(var f=0;32>f;f+=8)d[e++]=c.a[b]>>>f&255;
if(8192>d.length)c=String.fromCharCode.apply(null,d);else for(c="",b=0;b<d.length;b+=8192)c+=String.fromCharCode.apply(null,cb(d,b,b+8192));this.g=c}return this.g};var rl=[0,0,0,1],sl=[],tl=[0,0,0,1];function ul(b){b=m(b)?b:{};this.a=m(b.color)?b.color:null;this.c=void 0}ul.prototype.b=function(){return this.a};ul.prototype.d=function(b){this.a=b;this.c=void 0};ul.prototype.xb=function(){m(this.c)||(this.c="f"+(null===this.a?"-":sg(this.a)));return this.c};function vl(b){b=m(b)?b:{};this.e=this.a=this.f=null;this.d=m(b.fill)?b.fill:null;this.c=m(b.stroke)?b.stroke:null;this.b=b.radius;this.q=[0,0];this.n=this.D=this.g=null;var c=b.atlasManager,d,e=null,f,g=0;null!==this.c&&(f=sg(this.c.a),g=this.c.c,m(g)||(g=1),e=this.c.b,Yf||(e=null));var h=2*(this.b+g)+1;f={strokeStyle:f,Uc:g,size:h,lineDash:e};m(c)?(h=Math.round(h),(e=null===this.d)&&(d=ra(this.Rf,this,f)),g=this.xb(),f=c.add(g,h,h,ra(this.Sf,this,f),d),this.a=f.image,this.q=[f.offsetX,f.offsetY],
d=f.image.width,this.e=e?f.wf:this.a):(this.a=Ef("CANVAS"),this.a.height=h,this.a.width=h,d=h=this.a.width,c=this.a.getContext("2d"),this.Sf(f,c,0,0),null===this.d?(c=this.e=Ef("CANVAS"),c.height=f.size,c.width=f.size,c=c.getContext("2d"),this.Rf(f,c,0,0)):this.e=this.a);this.g=[h/2,h/2];this.D=[h,h];this.n=[d,d];zj.call(this,{opacity:1,rotateWithView:!1,rotation:0,scale:1,snapToPixel:m(b.snapToPixel)?b.snapToPixel:!0})}v(vl,zj);l=vl.prototype;l.wb=function(){return this.g};l.Dk=function(){return this.d};
l.Kd=function(){return this.e};l.Bb=function(){return this.a};l.Pc=function(){return 2};l.kd=function(){return this.n};l.Cb=function(){return this.q};l.Ek=function(){return this.b};l.gb=function(){return this.D};l.Fk=function(){return this.c};l.we=ca;l.load=ca;l.Ne=ca;
l.Sf=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();c.arc(b.size/2,b.size/2,this.b,0,2*Math.PI,!0);null!==this.d&&(c.fillStyle=sg(this.d.a),c.fill());null!==this.c&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Uc,null===b.lineDash||c.setLineDash(b.lineDash),c.stroke());c.closePath()};
l.Rf=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();c.arc(b.size/2,b.size/2,this.b,0,2*Math.PI,!0);c.fillStyle=rl;c.fill();null!==this.c&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Uc,null===b.lineDash||c.setLineDash(b.lineDash),c.stroke());c.closePath()};l.xb=function(){var b=null===this.c?"-":this.c.xb(),c=null===this.d?"-":this.d.xb();if(null===this.f||b!=this.f[1]||c!=this.f[2]||this.b!=this.f[3])this.f=["c"+b+c+(m(this.b)?this.b.toString():"-"),b,c,this.b];return this.f[0]};function wl(b){b=m(b)?b:{};this.g=null;this.d=xl;m(b.geometry)&&this.Vf(b.geometry);this.f=m(b.fill)?b.fill:null;this.e=m(b.image)?b.image:null;this.b=m(b.stroke)?b.stroke:null;this.c=m(b.text)?b.text:null;this.a=b.zIndex}l=wl.prototype;l.R=function(){return this.g};l.Hh=function(){return this.d};l.Rk=function(){return this.f};l.Sk=function(){return this.e};l.Tk=function(){return this.b};l.Uk=function(){return this.c};l.ji=function(){return this.a};
l.Vf=function(b){ka(b)?this.d=b:ia(b)?this.d=function(c){return c.get(b)}:null===b?this.d=xl:m(b)&&(this.d=function(){return b});this.g=b};l.km=function(b){this.a=b};function yl(b){ka(b)||(b=ga(b)?b:[b],b=$c(b));return b}function zl(){var b=new ul({color:"rgba(255,255,255,0.4)"}),c=new ql({color:"#3399CC",width:1.25}),d=[new wl({image:new vl({fill:b,stroke:c,radius:5}),fill:b,stroke:c})];zl=function(){return d};return d}
function Al(){var b={},c=[255,255,255,1],d=[0,153,255,1];b.Polygon=[new wl({fill:new ul({color:[255,255,255,.5]})})];b.MultiPolygon=b.Polygon;b.LineString=[new wl({stroke:new ql({color:c,width:5})}),new wl({stroke:new ql({color:d,width:3})})];b.MultiLineString=b.LineString;b.Circle=b.Polygon.concat(b.LineString);b.Point=[new wl({image:new vl({radius:6,fill:new ul({color:d}),stroke:new ql({color:c,width:1.5})}),zIndex:Infinity})];b.MultiPoint=b.Point;b.GeometryCollection=b.Polygon.concat(b.Point);
return b}function xl(b){return b.R()};function Bl(b){var c=m(b)?b:{};b=m(c.condition)?c.condition:bk;c=m(c.style)?c.style:new wl({stroke:new ql({color:[0,0,255,1]})});il.call(this,{condition:b,style:c})}v(Bl,il);Bl.prototype.g=function(){var b=this.k,c=b.a(),d=this.R().J(),e=ke(d),f=b.f(),d=c.k(d,f),d=c.constrainResolution(d,0,void 0);Uj(b,c,d,e,200)};function Cl(b){Rj.call(this,{handleEvent:Dl});b=m(b)?b:{};this.a=m(b.condition)?b.condition:gd(ak,ck);this.f=m(b.pixelDelta)?b.pixelDelta:128}v(Cl,Rj);
function Dl(b){var c=!1;if("key"==b.type){var d=b.a.f;if(this.a(b)&&(40==d||37==d||39==d||38==d)){var e=b.map,c=e.a(),f=Xe(c),g=f.resolution*this.f,h=0,k=0;40==d?k=-g:37==d?h=-g:39==d?h=g:k=g;d=[h,k];Ad(d,f.rotation);f=c.b();m(f)&&(m(100)&&e.La(cf({source:f,duration:100,easing:af})),e=c.i([f[0]+d[0],f[1]+d[1]]),c.Ha(e));b.preventDefault();c=!0}}return!c};function El(b){Rj.call(this,{handleEvent:Fl});b=m(b)?b:{};this.f=m(b.condition)?b.condition:ck;this.a=m(b.delta)?b.delta:1;this.e=m(b.duration)?b.duration:100}v(El,Rj);function Fl(b){var c=!1;if("key"==b.type){var d=b.a.i;if(this.f(b)&&(43==d||45==d)){c=b.map;d=43==d?this.a:-this.a;c.render();var e=c.a();Tj(c,e,d,void 0,this.e);b.preventDefault();c=!0}}return!c};function Gl(b){Rj.call(this,{handleEvent:Hl});b=m(b)?b:{};this.a=0;this.q=m(b.duration)?b.duration:250;this.e=null;this.g=this.f=void 0}v(Gl,Rj);function Hl(b){var c=!1;if("mousewheel"==b.type){var c=b.map,d=b.a;this.e=b.coordinate;this.a+=d.q;m(this.f)||(this.f=ta());d=Math.max(80-(ta()-this.f),0);ba.clearTimeout(this.g);this.g=ba.setTimeout(ra(this.i,this,c),d);b.preventDefault();c=!0}return!c}
Gl.prototype.i=function(b){var c=Vb(this.a,-1,1),d=b.a();b.render();Tj(b,d,-c,this.e,this.q);this.a=0;this.e=null;this.g=this.f=void 0};function Il(b){ek.call(this,{handleDownEvent:Jl,handleDragEvent:Kl,handleUpEvent:Ll});b=m(b)?b:{};this.e=null;this.g=void 0;this.a=!1;this.i=0;this.o=m(b.threshold)?b.threshold:.3}v(Il,ek);
function Kl(b){var c=0,d=this.f[0],e=this.f[1],d=Math.atan2(e.clientY-d.clientY,e.clientX-d.clientX);m(this.g)&&(c=d-this.g,this.i+=c,!this.a&&Math.abs(this.i)>this.o&&(this.a=!0));this.g=d;b=b.map;d=Jg(b.b);e=gk(this.f);e[0]-=d.x;e[1]-=d.y;this.e=b.sa(e);this.a&&(d=b.a(),e=d.d(),b.render(),Sj(b,d,e+c,this.e))}function Ll(b){if(2>this.f.length){b=b.map;var c=b.a();Ye(c,-1);if(this.a){var d=c.d(),e=this.e,d=c.constrainRotation(d,0);Sj(b,c,d,e,250)}return!1}return!0}
function Jl(b){return 2<=this.f.length?(b=b.map,this.e=null,this.g=void 0,this.a=!1,this.i=0,this.q||Ye(b.a(),1),b.render(),!0):!1}Il.prototype.r=ad;function Ml(b){ek.call(this,{handleDownEvent:Nl,handleDragEvent:Ol,handleUpEvent:Pl});b=m(b)?b:{};this.e=null;this.i=m(b.duration)?b.duration:400;this.a=void 0;this.g=1}v(Ml,ek);function Ol(b){var c=1,d=this.f[0],e=this.f[1],f=d.clientX-e.clientX,d=d.clientY-e.clientY,f=Math.sqrt(f*f+d*d);m(this.a)&&(c=this.a/f);this.a=f;1!=c&&(this.g=c);b=b.map;var f=b.a(),d=f.a(),e=Jg(b.b),g=gk(this.f);g[0]-=e.x;g[1]-=e.y;this.e=b.sa(g);b.render();Uj(b,f,d*c,this.e)}
function Pl(b){if(2>this.f.length){b=b.map;var c=b.a();Ye(c,-1);var d=c.a(),e=this.e,f=this.i,d=c.constrainResolution(d,0,this.g-1);Uj(b,c,d,e,f);return!1}return!0}function Nl(b){return 2<=this.f.length?(b=b.map,this.e=null,this.a=void 0,this.g=1,this.q||Ye(b.a(),1),b.render(),!0):!1}Ml.prototype.r=ad;function Ql(b){b=m(b)?b:{};var c=new lg,d=new Oj(-.005,.05,100);(m(b.altShiftDragRotate)?b.altShiftDragRotate:1)&&c.push(new lk);(m(b.doubleClickZoom)?b.doubleClickZoom:1)&&c.push(new Vj({delta:b.zoomDelta,duration:b.zoomDuration}));(m(b.dragPan)?b.dragPan:1)&&c.push(new hk({kinetic:d}));(m(b.pinchRotate)?b.pinchRotate:1)&&c.push(new Il);(m(b.pinchZoom)?b.pinchZoom:1)&&c.push(new Ml({duration:b.zoomDuration}));if(m(b.keyboard)?b.keyboard:1)c.push(new Cl),c.push(new El({delta:b.zoomDelta,duration:b.zoomDuration}));
(m(b.mouseWheelZoom)?b.mouseWheelZoom:1)&&c.push(new Gl({duration:b.zoomDuration}));(m(b.shiftDragZoom)?b.shiftDragZoom:1)&&c.push(new Bl);return c};function G(b){var c=m(b)?b:{};b=Bb(c);delete b.layers;c=c.layers;C.call(this,b);this.a=null;w(this,ud("layers"),this.Di,!1,this);null!=c?ga(c)&&(c=new lg(c.slice())):c=new lg;this.r(c)}v(G,C);l=G.prototype;l.sf=function(){this.b()&&this.l()};
l.Di=function(){null!==this.a&&(Qa(qb(this.a),Wc),this.a=null);var b=this.ac();if(null!=b){this.a={add:w(b,"add",this.Ci,!1,this),remove:w(b,"remove",this.Ei,!1,this)};var b=b.a,c,d,e;c=0;for(d=b.length;c<d;c++)e=b[c],this.a[ma(e).toString()]=w(e,["propertychange","change"],this.sf,!1,this)}this.l()};l.Ci=function(b){b=b.element;this.a[ma(b).toString()]=w(b,["propertychange","change"],this.sf,!1,this);this.l()};l.Ei=function(b){b=ma(b.element).toString();Wc(this.a[b]);delete this.a[b];this.l()};
l.ac=function(){return this.get("layers")};G.prototype.getLayers=G.prototype.ac;G.prototype.r=function(b){this.set("layers",b)};G.prototype.setLayers=G.prototype.r;
G.prototype.Xa=function(b){var c=m(b)?b:[],d=c.length;this.ac().forEach(function(b){b.Xa(c)});b=ij(this);var e,f;for(e=c.length;d<e;d++)f=c[d],f.brightness=Vb(f.brightness+b.brightness,-1,1),f.contrast*=b.contrast,f.hue+=b.hue,f.opacity*=b.opacity,f.saturation*=b.saturation,f.visible=f.visible&&b.visible,f.maxResolution=Math.min(f.maxResolution,b.maxResolution),f.minResolution=Math.max(f.minResolution,b.minResolution),m(b.extent)&&(f.extent=m(f.extent)?oe(f.extent,b.extent):b.extent);return c};
G.prototype.kb=function(){return"ready"};function Rl(b){xe.call(this,{code:b,units:"m",extent:Sl,global:!0,worldExtent:Tl})}v(Rl,xe);Rl.prototype.getPointResolution=function(b,c){var d=c[1]/6378137;return b/((Math.exp(d)+Math.exp(-d))/2)};var Ul=6378137*Math.PI,Sl=[-Ul,-Ul,Ul,Ul],Tl=[-180,-85,180,85],Je=Sa("EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" "),function(b){return new Rl(b)});
function Ke(b,c,d){var e=b.length;d=1<d?d:2;m(c)||(2<d?c=b.slice():c=Array(e));for(var f=0;f<e;f+=d)c[f]=6378137*Math.PI*b[f]/180,c[f+1]=6378137*Math.log(Math.tan(Math.PI*(b[f+1]+90)/360));return c}function Le(b,c,d){var e=b.length;d=1<d?d:2;m(c)||(2<d?c=b.slice():c=Array(e));for(var f=0;f<e;f+=d)c[f]=180*b[f]/(6378137*Math.PI),c[f+1]=360*Math.atan(Math.exp(b[f+1]/6378137))/Math.PI-90;return c};function Vl(b,c){xe.call(this,{code:b,units:"degrees",extent:Wl,axisOrientation:c,global:!0,worldExtent:Wl})}v(Vl,xe);Vl.prototype.getPointResolution=function(b){return b};
var Wl=[-180,-90,180,90],Me=[new Vl("CRS:84"),new Vl("EPSG:4326","neu"),new Vl("urn:ogc:def:crs:EPSG::4326","neu"),new Vl("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new Vl("urn:ogc:def:crs:OGC:1.3:CRS84"),new Vl("urn:ogc:def:crs:OGC:2:84"),new Vl("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new Vl("urn:x-ogc:def:crs:EPSG:4326","neu")];function Xl(){Ae(Je);Ae(Me);Ie()};function H(b){D.call(this,m(b)?b:{})}v(H,D);function I(b){b=m(b)?b:{};var c=Bb(b);delete c.preload;delete c.useInterimTilesOnError;D.call(this,c);this.ia(m(b.preload)?b.preload:0);this.ka(m(b.useInterimTilesOnError)?b.useInterimTilesOnError:!0)}v(I,D);I.prototype.r=function(){return this.get("preload")};I.prototype.getPreload=I.prototype.r;I.prototype.ia=function(b){this.set("preload",b)};I.prototype.setPreload=I.prototype.ia;I.prototype.ea=function(){return this.get("useInterimTilesOnError")};I.prototype.getUseInterimTilesOnError=I.prototype.ea;
I.prototype.ka=function(b){this.set("useInterimTilesOnError",b)};I.prototype.setUseInterimTilesOnError=I.prototype.ka;function J(b){b=m(b)?b:{};var c=Bb(b);delete c.style;delete c.renderBuffer;delete c.updateWhileAnimating;D.call(this,c);this.ea=m(b.renderBuffer)?b.renderBuffer:100;this.vc=null;this.r=void 0;this.ka(b.style);this.Ac=m(b.updateWhileAnimating)?b.updateWhileAnimating:!1}v(J,D);J.prototype.$e=function(){return this.vc};J.prototype.cf=function(){return this.r};J.prototype.ka=function(b){this.vc=m(b)?b:zl;this.r=null===b?void 0:yl(this.vc);this.l()};function Yl(b,c,d,e,f){this.o={};this.b=b;this.r=c;this.f=d;this.H=e;this.kb=f;this.e=this.a=this.c=this.fa=this.qa=this.oa=null;this.ea=this.Da=this.q=this.U=this.S=this.N=0;this.ia=!1;this.g=this.ka=0;this.va=!1;this.ca=0;this.d="";this.i=this.D=this.Fa=this.Ea=0;this.da=this.k=this.n=null;this.p=[];this.Xa=Hd()}
function Zl(b,c,d){if(null!==b.e){c=qk(c,0,d,2,b.H,b.p);d=b.b;var e=b.Xa,f=d.globalAlpha;1!=b.q&&(d.globalAlpha=f*b.q);var g=b.ka;b.ia&&(g+=b.kb);var h,k;h=0;for(k=c.length;h<k;h+=2){var n=c[h]-b.N,p=c[h+1]-b.S;b.va&&(n=n+.5|0,p=p+.5|0);if(0!==g||1!=b.g){var q=n+b.N,r=p+b.S;lj(e,q,r,b.g,b.g,g,-q,-r);d.setTransform(e[0],e[1],e[4],e[5],e[12],e[13])}d.drawImage(b.e,b.Da,b.ea,b.ca,b.U,n,p,b.ca,b.U)}0===g&&1==b.g||d.setTransform(1,0,0,1,0,0);1!=b.q&&(d.globalAlpha=f)}}
function $l(b,c,d,e){var f=0;if(null!==b.da&&""!==b.d){null===b.n||am(b,b.n);null===b.k||bm(b,b.k);var g=b.da,h=b.b,k=b.fa;null===k?(h.font=g.font,h.textAlign=g.textAlign,h.textBaseline=g.textBaseline,b.fa={font:g.font,textAlign:g.textAlign,textBaseline:g.textBaseline}):(k.font!=g.font&&(k.font=h.font=g.font),k.textAlign!=g.textAlign&&(k.textAlign=h.textAlign=g.textAlign),k.textBaseline!=g.textBaseline&&(k.textBaseline=h.textBaseline=g.textBaseline));c=qk(c,f,d,e,b.H,b.p);for(g=b.b;f<d;f+=e){h=c[f]+
b.Ea;k=c[f+1]+b.Fa;if(0!==b.D||1!=b.i){var n=lj(b.Xa,h,k,b.i,b.i,b.D,-h,-k);g.setTransform(n[0],n[1],n[4],n[5],n[12],n[13])}null===b.k||g.strokeText(b.d,h,k);null===b.n||g.fillText(b.d,h,k)}0===b.D&&1==b.i||g.setTransform(1,0,0,1,0,0)}}function cm(b,c,d,e,f,g){var h=b.b;b=qk(c,d,e,f,b.H,b.p);h.moveTo(b[0],b[1]);for(c=2;c<b.length;c+=2)h.lineTo(b[c],b[c+1]);g&&h.lineTo(b[0],b[1]);return e}function dm(b,c,d,e,f){var g=b.b,h,k;h=0;for(k=e.length;h<k;++h)d=cm(b,c,d,e[h],f,!0),g.closePath();return d}
l=Yl.prototype;l.kc=function(b,c){var d=b.toString(),e=this.o[d];m(e)?e.push(c):this.o[d]=[c]};l.lc=function(b){if(pe(this.f,b.J())){if(null!==this.c||null!==this.a){null===this.c||am(this,this.c);null===this.a||bm(this,this.a);var c;c=b.j;c=null===c?null:qk(c,0,c.length,b.B,this.H,this.p);var d=c[2]-c[0],e=c[3]-c[1],d=Math.sqrt(d*d+e*e),e=this.b;e.beginPath();e.arc(c[0],c[1],d,0,2*Math.PI);null===this.c||e.fill();null===this.a||e.stroke()}""!==this.d&&$l(this,b.Oc(),2,2)}};
l.oe=function(b,c){var d=(0,c.d)(b);if(null!=d&&pe(this.f,d.J())){var e=c.a;m(e)||(e=0);this.kc(e,function(b){b.Ba(c.f,c.b);b.ib(c.e);b.Ca(c.c);em[d.O()].call(b,d,null)})}};l.fd=function(b,c){var d=b.d,e,f;e=0;for(f=d.length;e<f;++e){var g=d[e];em[g.O()].call(this,g,c)}};l.ub=function(b){var c=b.j;b=b.B;null===this.e||Zl(this,c,c.length);""!==this.d&&$l(this,c,c.length,b)};l.tb=function(b){var c=b.j;b=b.B;null===this.e||Zl(this,c,c.length);""!==this.d&&$l(this,c,c.length,b)};
l.Eb=function(b){if(pe(this.f,b.J())){if(null!==this.a){bm(this,this.a);var c=this.b,d=b.j;c.beginPath();cm(this,d,0,d.length,b.B,!1);c.stroke()}""!==this.d&&(b=fm(b),$l(this,b,2,2))}};l.mc=function(b){var c=b.J();if(pe(this.f,c)){if(null!==this.a){bm(this,this.a);var c=this.b,d=b.j,e=0,f=b.b,g=b.B;c.beginPath();var h,k;h=0;for(k=f.length;h<k;++h)e=cm(this,d,e,f[h],g,!1);c.stroke()}""!==this.d&&(b=hm(b),$l(this,b,b.length,2))}};
l.Rb=function(b){if(pe(this.f,b.J())){if(null!==this.a||null!==this.c){null===this.c||am(this,this.c);null===this.a||bm(this,this.a);var c=this.b;c.beginPath();dm(this,al(b),0,b.b,b.B);null===this.c||c.fill();null===this.a||c.stroke()}""!==this.d&&(b=bl(b),$l(this,b,2,2))}};
l.nc=function(b){if(pe(this.f,b.J())){if(null!==this.a||null!==this.c){null===this.c||am(this,this.c);null===this.a||bm(this,this.a);var c=this.b,d=im(b),e=0,f=b.b,g=b.B,h,k;h=0;for(k=f.length;h<k;++h){var n=f[h];c.beginPath();e=dm(this,d,e,n,g);null===this.c||c.fill();null===this.a||c.stroke()}}""!==this.d&&(b=jm(b),$l(this,b,b.length,2))}};function km(b){var c=Sa(rb(b.o),Number);db(c);var d,e,f,g,h;d=0;for(e=c.length;d<e;++d)for(f=b.o[c[d].toString()],g=0,h=f.length;g<h;++g)f[g](b)}
function am(b,c){var d=b.b,e=b.oa;null===e?(d.fillStyle=c.fillStyle,b.oa={fillStyle:c.fillStyle}):e.fillStyle!=c.fillStyle&&(e.fillStyle=d.fillStyle=c.fillStyle)}
function bm(b,c){var d=b.b,e=b.qa;null===e?(d.lineCap=c.lineCap,Yf&&d.setLineDash(c.lineDash),d.lineJoin=c.lineJoin,d.lineWidth=c.lineWidth,d.miterLimit=c.miterLimit,d.strokeStyle=c.strokeStyle,b.qa={lineCap:c.lineCap,lineDash:c.lineDash,lineJoin:c.lineJoin,lineWidth:c.lineWidth,miterLimit:c.miterLimit,strokeStyle:c.strokeStyle}):(e.lineCap!=c.lineCap&&(e.lineCap=d.lineCap=c.lineCap),Yf&&!gb(e.lineDash,c.lineDash)&&d.setLineDash(e.lineDash=c.lineDash),e.lineJoin!=c.lineJoin&&(e.lineJoin=d.lineJoin=
c.lineJoin),e.lineWidth!=c.lineWidth&&(e.lineWidth=d.lineWidth=c.lineWidth),e.miterLimit!=c.miterLimit&&(e.miterLimit=d.miterLimit=c.miterLimit),e.strokeStyle!=c.strokeStyle&&(e.strokeStyle=d.strokeStyle=c.strokeStyle))}
l.Ba=function(b,c){if(null===b)this.c=null;else{var d=b.a;this.c={fillStyle:sg(null===d?rl:d)}}if(null===c)this.a=null;else{var d=c.a,e=c.d,f=c.b,g=c.f,h=c.c,k=c.e;this.a={lineCap:m(e)?e:"round",lineDash:null!=f?f:sl,lineJoin:m(g)?g:"round",lineWidth:this.r*(m(h)?h:1),miterLimit:m(k)?k:10,strokeStyle:sg(null===d?tl:d)}}};
l.ib=function(b){if(null===b)this.e=null;else{var c=b.wb(),d=b.Bb(1),e=b.Cb(),f=b.gb();this.N=c[0];this.S=c[1];this.U=f[1];this.e=d;this.q=b.o;this.Da=e[0];this.ea=e[1];this.ia=b.p;this.ka=b.i;this.g=b.k;this.va=b.r;this.ca=f[0]}};
l.Ca=function(b){if(null===b)this.d="";else{var c=b.a;null===c?this.n=null:(c=c.a,this.n={fillStyle:sg(null===c?rl:c)});var d=b.e;if(null===d)this.k=null;else{var c=d.a,e=d.d,f=d.b,g=d.f,h=d.c,d=d.e;this.k={lineCap:m(e)?e:"round",lineDash:null!=f?f:sl,lineJoin:m(g)?g:"round",lineWidth:m(h)?h:1,miterLimit:m(d)?d:10,strokeStyle:sg(null===c?tl:c)}}var c=b.d,e=b.i,f=b.k,g=b.f,h=b.c,d=b.b,k=b.g;b=b.n;this.da={font:m(c)?c:"10px sans-serif",textAlign:m(k)?k:"center",textBaseline:m(b)?b:"middle"};this.d=
m(d)?d:"";this.Ea=m(e)?this.r*e:0;this.Fa=m(f)?this.r*f:0;this.D=m(g)?g:0;this.i=this.r*(m(h)?h:1)}};var em={Point:Yl.prototype.ub,LineString:Yl.prototype.Eb,Polygon:Yl.prototype.Rb,MultiPoint:Yl.prototype.tb,MultiLineString:Yl.prototype.mc,MultiPolygon:Yl.prototype.nc,GeometryCollection:Yl.prototype.fd,Circle:Yl.prototype.lc};var lm=["Polygon","LineString","Image","Text"];function mm(b,c,d){this.fa=b;this.ca=c;this.d=null;this.f=0;this.resolution=d;this.S=this.N=null;this.c=[];this.coordinates=[];this.oa=Hd();this.a=[];this.da=[];this.qa=Hd()}
function nm(b,c,d,e,f,g){var h=b.coordinates.length,k=b.re(),n=[c[d],c[d+1]],p=[NaN,NaN],q=!0,r,s,u;for(r=d+f;r<e;r+=f)p[0]=c[r],p[1]=c[r+1],u=ae(k,p),u!==s?(q&&(b.coordinates[h++]=n[0],b.coordinates[h++]=n[1]),b.coordinates[h++]=p[0],b.coordinates[h++]=p[1],q=!1):1===u?(b.coordinates[h++]=p[0],b.coordinates[h++]=p[1],q=!1):q=!0,n[0]=p[0],n[1]=p[1],s=u;r===d+f&&(b.coordinates[h++]=n[0],b.coordinates[h++]=n[1]);g&&(b.coordinates[h++]=c[d],b.coordinates[h++]=c[d+1]);return h}
function om(b,c){b.N=[0,c,0];b.c.push(b.N);b.S=[0,c,0];b.a.push(b.S)}
function pm(b,c,d,e,f,g,h,k,n){var p;mj(e,b.oa)?p=b.da:(p=qk(b.coordinates,0,b.coordinates.length,2,e,b.da),Kd(b.oa,e));e=0;var q=h.length,r=0,s;for(b=b.qa;e<q;){var u=h[e],y,z,A,E;switch(u[0]){case 0:r=u[1];s=ma(r).toString();m(g[s])?e=u[2]:m(n)&&!pe(n,r.R().J())?e=u[2]:++e;break;case 1:c.beginPath();++e;break;case 2:r=u[1];s=p[r];var x=p[r+1],Q=p[r+2]-s,r=p[r+3]-x;c.arc(s,x,Math.sqrt(Q*Q+r*r),0,2*Math.PI,!0);++e;break;case 3:c.closePath();++e;break;case 4:r=u[1];s=u[2];y=u[3];A=u[4]*d;var N=u[5]*
d,L=u[6];z=u[7];var U=u[8],Ca=u[9],x=u[11],Q=u[12],eb=u[13],R=u[14];for(u[10]&&(x+=f);r<s;r+=2){u=p[r]-A;E=p[r+1]-N;eb&&(u=u+.5|0,E=E+.5|0);if(1!=Q||0!==x){var Ma=u+A,sb=E+N;lj(b,Ma,sb,Q,Q,x,-Ma,-sb);c.setTransform(b[0],b[1],b[4],b[5],b[12],b[13])}Ma=c.globalAlpha;1!=z&&(c.globalAlpha=Ma*z);c.drawImage(y,U,Ca,R,L,u,E,R*d,L*d);1!=z&&(c.globalAlpha=Ma);1==Q&&0===x||c.setTransform(1,0,0,1,0,0)}++e;break;case 5:r=u[1];s=u[2];A=u[3];N=u[4]*d;L=u[5]*d;x=u[6];Q=u[7]*d;y=u[8];for(z=u[9];r<s;r+=2){u=p[r]+
N;E=p[r+1]+L;if(1!=Q||0!==x)lj(b,u,E,Q,Q,x,-u,-E),c.setTransform(b[0],b[1],b[4],b[5],b[12],b[13]);z&&c.strokeText(A,u,E);y&&c.fillText(A,u,E);1==Q&&0===x||c.setTransform(1,0,0,1,0,0)}++e;break;case 6:if(m(k)&&(r=u[1],r=k(r)))return r;++e;break;case 7:c.fill();++e;break;case 8:r=u[1];s=u[2];c.moveTo(p[r],p[r+1]);for(r+=2;r<s;r+=2)c.lineTo(p[r],p[r+1]);++e;break;case 9:c.fillStyle=u[1];++e;break;case 10:r=m(u[7])?u[7]:!0;s=u[2];c.strokeStyle=u[1];c.lineWidth=r?s*d:s;c.lineCap=u[3];c.lineJoin=u[4];c.miterLimit=
u[5];Yf&&c.setLineDash(u[6]);++e;break;case 11:c.font=u[1];c.textAlign=u[2];c.textBaseline=u[3];++e;break;case 12:c.stroke();++e;break;default:++e}}}mm.prototype.bc=function(b,c,d,e,f){pm(this,b,c,d,e,f,this.c,void 0)};function qm(b){var c=b.a;c.reverse();var d,e=c.length,f,g,h=-1;for(d=0;d<e;++d)if(f=c[d],g=f[0],6==g)h=d;else if(0==g){f[2]=d;f=b.a;for(g=d;h<g;){var k=f[h];f[h]=f[g];f[g]=k;++h;--g}h=-1}}
function rm(b,c){b.N[2]=b.c.length;b.N=null;b.S[2]=b.a.length;b.S=null;var d=[6,c];b.c.push(d);b.a.push(d)}mm.prototype.Kb=ca;mm.prototype.re=function(){return this.ca};function sm(b,c,d){mm.call(this,b,c,d);this.n=this.U=null;this.H=this.D=this.r=this.p=this.o=this.q=this.k=this.i=this.g=this.e=this.b=void 0}v(sm,mm);
sm.prototype.ub=function(b,c){if(null!==this.n){om(this,c);var d=b.j,e=this.coordinates.length,d=nm(this,d,0,d.length,b.B,!1);this.c.push([4,e,d,this.n,this.b,this.e,this.g,this.i,this.k,this.q,this.o,this.p,this.r,this.D,this.H]);this.a.push([4,e,d,this.U,this.b,this.e,this.g,this.i,this.k,this.q,this.o,this.p,this.r,this.D,this.H]);rm(this,c)}};
sm.prototype.tb=function(b,c){if(null!==this.n){om(this,c);var d=b.j,e=this.coordinates.length,d=nm(this,d,0,d.length,b.B,!1);this.c.push([4,e,d,this.n,this.b,this.e,this.g,this.i,this.k,this.q,this.o,this.p,this.r,this.D,this.H]);this.a.push([4,e,d,this.U,this.b,this.e,this.g,this.i,this.k,this.q,this.o,this.p,this.r,this.D,this.H]);rm(this,c)}};sm.prototype.Kb=function(){qm(this);this.e=this.b=void 0;this.n=this.U=null;this.H=this.D=this.p=this.o=this.q=this.k=this.i=this.r=this.g=void 0};
sm.prototype.ib=function(b){var c=b.wb(),d=b.gb(),e=b.Kd(1),f=b.Bb(1),g=b.Cb();this.b=c[0];this.e=c[1];this.U=e;this.n=f;this.g=d[1];this.i=b.o;this.k=g[0];this.q=g[1];this.o=b.p;this.p=b.i;this.r=b.k;this.D=b.r;this.H=d[0]};function tm(b,c,d){mm.call(this,b,c,d);this.b={Ic:void 0,Dc:void 0,Ec:null,Fc:void 0,Gc:void 0,Hc:void 0,ve:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}v(tm,mm);
function um(b,c,d,e,f){var g=b.coordinates.length;c=nm(b,c,d,e,f,!1);g=[8,g,c];b.c.push(g);b.a.push(g);return e}l=tm.prototype;l.re=function(){null===this.d&&(this.d=Xd(this.ca),0<this.f&&Wd(this.d,this.resolution*(this.f+1)/2,this.d));return this.d};
function vm(b){var c=b.b,d=c.strokeStyle,e=c.lineCap,f=c.lineDash,g=c.lineJoin,h=c.lineWidth,k=c.miterLimit;c.Ic==d&&c.Dc==e&&gb(c.Ec,f)&&c.Fc==g&&c.Gc==h&&c.Hc==k||(c.ve!=b.coordinates.length&&(b.c.push([12]),c.ve=b.coordinates.length),b.c.push([10,d,h,e,g,k,f],[1]),c.Ic=d,c.Dc=e,c.Ec=f,c.Fc=g,c.Gc=h,c.Hc=k)}
l.Eb=function(b,c){var d=this.b,e=d.lineWidth;m(d.strokeStyle)&&m(e)&&(vm(this),om(this,c),this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash],[1]),d=b.j,um(this,d,0,d.length,b.B),this.a.push([12]),rm(this,c))};
l.mc=function(b,c){var d=this.b,e=d.lineWidth;if(m(d.strokeStyle)&&m(e)){vm(this);om(this,c);this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash],[1]);var d=b.b,e=b.j,f=b.B,g=0,h,k;h=0;for(k=d.length;h<k;++h)g=um(this,e,g,d[h],f);this.a.push([12]);rm(this,c)}};l.Kb=function(){this.b.ve!=this.coordinates.length&&this.c.push([12]);qm(this);this.b=null};
l.Ba=function(b,c){var d=c.a;this.b.strokeStyle=sg(null===d?tl:d);d=c.d;this.b.lineCap=m(d)?d:"round";d=c.b;this.b.lineDash=null===d?sl:d;d=c.f;this.b.lineJoin=m(d)?d:"round";d=c.c;this.b.lineWidth=m(d)?d:1;d=c.e;this.b.miterLimit=m(d)?d:10;this.b.lineWidth>this.f&&(this.f=this.b.lineWidth,this.d=null)};
function wm(b,c,d){mm.call(this,b,c,d);this.b={ff:void 0,Ic:void 0,Dc:void 0,Ec:null,Fc:void 0,Gc:void 0,Hc:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}v(wm,mm);
function xm(b,c,d,e,f){var g=b.b,h=[1];b.c.push(h);b.a.push(h);var k,h=0;for(k=e.length;h<k;++h){var n=e[h],p=b.coordinates.length;d=nm(b,c,d,n,f,!0);d=[8,p,d];p=[3];b.c.push(d,p);b.a.push(d,p);d=n}c=[7];b.a.push(c);m(g.fillStyle)&&b.c.push(c);m(g.strokeStyle)&&(g=[12],b.c.push(g),b.a.push(g));return d}l=wm.prototype;
l.lc=function(b,c){var d=this.b,e=d.strokeStyle;if(m(d.fillStyle)||m(e)){ym(this);om(this,c);this.a.push([9,sg(rl)]);m(d.strokeStyle)&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var f=b.j,e=this.coordinates.length;nm(this,f,0,f.length,b.B,!1);f=[1];e=[2,e];this.c.push(f,e);this.a.push(f,e);e=[7];this.a.push(e);m(d.fillStyle)&&this.c.push(e);m(d.strokeStyle)&&(d=[12],this.c.push(d),this.a.push(d));rm(this,c)}};
l.Rb=function(b,c){var d=this.b,e=d.strokeStyle;if(m(d.fillStyle)||m(e))ym(this),om(this,c),this.a.push([9,sg(rl)]),m(d.strokeStyle)&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]),d=b.b,e=al(b),xm(this,e,0,d,b.B),rm(this,c)};
l.nc=function(b,c){var d=this.b,e=d.strokeStyle;if(m(d.fillStyle)||m(e)){ym(this);om(this,c);this.a.push([9,sg(rl)]);m(d.strokeStyle)&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var d=b.b,e=im(b),f=b.B,g=0,h,k;h=0;for(k=d.length;h<k;++h)g=xm(this,e,g,d[h],f);rm(this,c)}};l.Kb=function(){qm(this);this.b=null;var b=this.fa;if(0!==b){var c=this.coordinates,d,e;d=0;for(e=c.length;d<e;++d)c[d]=b*Math.round(c[d]/b)}};
l.re=function(){null===this.d&&(this.d=Xd(this.ca),0<this.f&&Wd(this.d,this.resolution*(this.f+1)/2,this.d));return this.d};
l.Ba=function(b,c){var d=this.b;if(null===b)d.fillStyle=void 0;else{var e=b.a;d.fillStyle=sg(null===e?rl:e)}null===c?(d.strokeStyle=void 0,d.lineCap=void 0,d.lineDash=null,d.lineJoin=void 0,d.lineWidth=void 0,d.miterLimit=void 0):(e=c.a,d.strokeStyle=sg(null===e?tl:e),e=c.d,d.lineCap=m(e)?e:"round",e=c.b,d.lineDash=null===e?sl:e.slice(),e=c.f,d.lineJoin=m(e)?e:"round",e=c.c,d.lineWidth=m(e)?e:1,e=c.e,d.miterLimit=m(e)?e:10,d.lineWidth>this.f&&(this.f=d.lineWidth,this.d=null))};
function ym(b){var c=b.b,d=c.fillStyle,e=c.strokeStyle,f=c.lineCap,g=c.lineDash,h=c.lineJoin,k=c.lineWidth,n=c.miterLimit;m(d)&&c.ff!=d&&(b.c.push([9,d]),c.ff=c.fillStyle);!m(e)||c.Ic==e&&c.Dc==f&&c.Ec==g&&c.Fc==h&&c.Gc==k&&c.Hc==n||(b.c.push([10,e,k,f,h,n,g]),c.Ic=e,c.Dc=f,c.Ec=g,c.Fc=h,c.Gc=k,c.Hc=n)}function zm(b,c,d){mm.call(this,b,c,d);this.D=this.r=this.p=null;this.n="";this.o=this.q=this.k=this.i=0;this.g=this.e=this.b=null}v(zm,mm);
zm.prototype.vb=function(b,c,d,e,f,g){if(""!==this.n&&null!==this.g&&(null!==this.b||null!==this.e)){if(null!==this.b){f=this.b;var h=this.p;if(null===h||h.fillStyle!=f.fillStyle){var k=[9,f.fillStyle];this.c.push(k);this.a.push(k);null===h?this.p={fillStyle:f.fillStyle}:h.fillStyle=f.fillStyle}}null!==this.e&&(f=this.e,h=this.r,null===h||h.lineCap!=f.lineCap||h.lineDash!=f.lineDash||h.lineJoin!=f.lineJoin||h.lineWidth!=f.lineWidth||h.miterLimit!=f.miterLimit||h.strokeStyle!=f.strokeStyle)&&(k=[10,
f.strokeStyle,f.lineWidth,f.lineCap,f.lineJoin,f.miterLimit,f.lineDash,!1],this.c.push(k),this.a.push(k),null===h?this.r={lineCap:f.lineCap,lineDash:f.lineDash,lineJoin:f.lineJoin,lineWidth:f.lineWidth,miterLimit:f.miterLimit,strokeStyle:f.strokeStyle}:(h.lineCap=f.lineCap,h.lineDash=f.lineDash,h.lineJoin=f.lineJoin,h.lineWidth=f.lineWidth,h.miterLimit=f.miterLimit,h.strokeStyle=f.strokeStyle));f=this.g;h=this.D;if(null===h||h.font!=f.font||h.textAlign!=f.textAlign||h.textBaseline!=f.textBaseline)k=
[11,f.font,f.textAlign,f.textBaseline],this.c.push(k),this.a.push(k),null===h?this.D={font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline}:(h.font=f.font,h.textAlign=f.textAlign,h.textBaseline=f.textBaseline);om(this,g);f=this.coordinates.length;b=nm(this,b,c,d,e,!1);b=[5,f,b,this.n,this.i,this.k,this.q,this.o,null!==this.b,null!==this.e];this.c.push(b);this.a.push(b);rm(this,g)}};
zm.prototype.Ca=function(b){if(null===b)this.n="";else{var c=b.a;null===c?this.b=null:(c=c.a,c=sg(null===c?rl:c),null===this.b?this.b={fillStyle:c}:this.b.fillStyle=c);var d=b.e;if(null===d)this.e=null;else{var c=d.a,e=d.d,f=d.b,g=d.f,h=d.c,d=d.e,e=m(e)?e:"round",f=null!=f?f.slice():sl,g=m(g)?g:"round",h=m(h)?h:1,d=m(d)?d:10,c=sg(null===c?tl:c);if(null===this.e)this.e={lineCap:e,lineDash:f,lineJoin:g,lineWidth:h,miterLimit:d,strokeStyle:c};else{var k=this.e;k.lineCap=e;k.lineDash=f;k.lineJoin=g;k.lineWidth=
h;k.miterLimit=d;k.strokeStyle=c}}var n=b.d,c=b.i,e=b.k,f=b.f,h=b.c,d=b.b,g=b.g,k=b.n;b=m(n)?n:"10px sans-serif";g=m(g)?g:"center";k=m(k)?k:"middle";null===this.g?this.g={font:b,textAlign:g,textBaseline:k}:(n=this.g,n.font=b,n.textAlign=g,n.textBaseline=k);this.n=m(d)?d:"";this.i=m(c)?c:0;this.k=m(e)?e:0;this.q=m(f)?f:0;this.o=m(h)?h:1}};function Am(b,c,d,e){this.i=b;this.d=c;this.n=d;this.f=e;this.c={};this.e=Nf(1,1);this.g=Hd()}
function Bm(b){for(var c in b.c){var d=b.c[c],e;for(e in d)d[e].Kb()}}Am.prototype.b=function(b,c,d,e,f){var g=this.g;lj(g,.5,.5,1/c,-1/c,-d,-b[0],-b[1]);var h=this.e;h.clearRect(0,0,1,1);var k;m(this.f)&&(k=Sd(),Td(k,b),Wd(k,c*this.f,k));return Cm(this,h,g,d,e,function(b){if(0<h.getImageData(0,0,1,1).data[3]){if(b=f(b))return b;h.clearRect(0,0,1,1)}},k)};
Am.prototype.a=function(b,c){var d=m(b)?b.toString():"0",e=this.c[d];m(e)||(e={},this.c[d]=e);d=e[c];m(d)||(d=new Dm[c](this.i,this.d,this.n),e[c]=d);return d};Am.prototype.la=function(){return wb(this.c)};
function Em(b,c,d,e,f,g){var h=Sa(rb(b.c),Number);db(h);var k=b.d,n=k[0],p=k[1],q=k[2],k=k[3],n=[n,p,n,k,q,k,q,p];qk(n,0,8,2,e,n);c.save();c.beginPath();c.moveTo(n[0],n[1]);c.lineTo(n[2],n[3]);c.lineTo(n[4],n[5]);c.lineTo(n[6],n[7]);c.closePath();c.clip();for(var r,s,n=0,p=h.length;n<p;++n)for(r=b.c[h[n].toString()],q=0,k=lm.length;q<k;++q)s=r[lm[q]],m(s)&&s.bc(c,d,e,f,g);c.restore()}
function Cm(b,c,d,e,f,g,h){var k=Sa(rb(b.c),Number);db(k,function(b,c){return c-b});var n,p,q,r,s;n=0;for(p=k.length;n<p;++n)for(r=b.c[k[n].toString()],q=lm.length-1;0<=q;--q)if(s=r[lm[q]],m(s)&&(s=pm(s,c,1,d,e,f,s.a,g,h)))return s}var Dm={Image:sm,LineString:tm,Polygon:wm,Text:zm};function Fm(b){oj.call(this,b);this.r=Hd()}v(Fm,oj);
Fm.prototype.q=function(b,c,d){Gm(this,"precompose",d,b,void 0);var e=this.Id();if(null!==e){var f=c.extent,g=m(f);if(g){var h=b.pixelRatio,k=je(f),n=ie(f),p=he(f),f=ge(f);nj(b.coordinateToPixelMatrix,k,k);nj(b.coordinateToPixelMatrix,n,n);nj(b.coordinateToPixelMatrix,p,p);nj(b.coordinateToPixelMatrix,f,f);d.save();d.beginPath();d.moveTo(k[0]*h,k[1]*h);d.lineTo(n[0]*h,n[1]*h);d.lineTo(p[0]*h,p[1]*h);d.lineTo(f[0]*h,f[1]*h);d.clip()}h=this.nf();k=d.globalAlpha;d.globalAlpha=c.opacity;0===b.viewState.rotation?
(c=h[13],n=e.width*h[0],p=e.height*h[5],d.drawImage(e,0,0,+e.width,+e.height,Math.round(h[12]),Math.round(c),Math.round(n),Math.round(p))):(d.setTransform(h[0],h[1],h[4],h[5],h[12],h[13]),d.drawImage(e,0,0),d.setTransform(1,0,0,1,0,0));d.globalAlpha=k;g&&d.restore()}Gm(this,"postcompose",d,b,void 0)};function Gm(b,c,d,e,f){var g=b.a;jd(g,c)&&(b=m(f)?f:Hm(b,e),b=new Yl(d,e.pixelRatio,e.extent,b,e.viewState.rotation),g.dispatchEvent(new dl(c,g,b,null,e,d,null)),km(b))}
function Hm(b,c){var d=c.viewState,e=c.pixelRatio;return lj(b.r,e*c.size[0]/2,e*c.size[1]/2,e/d.resolution,-e/d.resolution,-d.rotation,-d.center[0],-d.center[1])}function Im(b,c){var d=[0,0];nj(c,b,d);return d}
var Jm=function(){var b=null,c=null;return function(d){if(null===b){b=Nf(1,1);c=b.createImageData(1,1);var e=c.data;e[0]=42;e[1]=84;e[2]=126;e[3]=255}var e=b.canvas,f=d[0]<=e.width&&d[1]<=e.height;f||(e.width=d[0],e.height=d[1],e=d[0]-1,d=d[1]-1,b.putImageData(c,e,d),d=b.getImageData(e,d,1,1),f=gb(c.data,d.data));return f}}();function Km(b,c,d){rk.call(this);this.qg(b,m(c)?c:0,d)}v(Km,rk);l=Km.prototype;l.clone=function(){var b=new Km(null);tk(b,this.a,this.j.slice());b.l();return b};l.Ya=function(b,c,d,e){var f=this.j;b-=f[0];var g=c-f[1];c=b*b+g*g;if(c<e){if(0===c)for(e=0;e<this.B;++e)d[e]=f[e];else for(e=this.Gf()/Math.sqrt(c),d[0]=f[0]+e*b,d[1]=f[1]+e*g,e=2;e<this.B;++e)d[e]=f[e];d.length=this.B;return c}return e};l.Jb=function(b,c){var d=this.j,e=b-d[0],d=c-d[1];return e*e+d*d<=Lm(this)};
l.Oc=function(){return this.j.slice(0,this.B)};l.dd=function(b){var c=this.j,d=c[this.B]-c[0];return Vd(c[0]-d,c[1]-d,c[0]+d,c[1]+d,b)};l.Gf=function(){return Math.sqrt(Lm(this))};function Lm(b){var c=b.j[b.B]-b.j[0];b=b.j[b.B+1]-b.j[1];return c*c+b*b}l.O=function(){return"Circle"};l.Lj=function(b){var c=this.B,d=b.slice();d[c]=d[0]+(this.j[c]-this.j[0]);var e;for(e=1;e<c;++e)d[c+e]=b[e];tk(this,this.a,d);this.l()};
l.qg=function(b,c,d){if(null===b)tk(this,"XY",null);else{uk(this,d,b,0);null===this.j&&(this.j=[]);d=this.j;b=Ek(d,b);d[b++]=d[0]+c;var e;c=1;for(e=this.B;c<e;++c)d[b++]=d[c];d.length=b}this.l()};l.Hf=function(b){this.j[this.B]=this.j[0]+b;this.l()};function Mm(b){pk.call(this);this.d=m(b)?b:null;Nm(this)}v(Mm,pk);function Om(b){var c=[],d,e;d=0;for(e=b.length;d<e;++d)c.push(b[d].clone());return c}function Pm(b){var c,d;if(null!==b.d)for(c=0,d=b.d.length;c<d;++c)Vc(b.d[c],"change",b.l,!1,b)}function Nm(b){var c,d;if(null!==b.d)for(c=0,d=b.d.length;c<d;++c)w(b.d[c],"change",b.l,!1,b)}l=Mm.prototype;l.clone=function(){var b=new Mm(null);b.rg(this.d);return b};
l.Ya=function(b,c,d,e){if(e<Yd(this.J(),b,c))return e;var f=this.d,g,h;g=0;for(h=f.length;g<h;++g)e=f[g].Ya(b,c,d,e);return e};l.Jb=function(b,c){var d=this.d,e,f;e=0;for(f=d.length;e<f;++e)if(d[e].Jb(b,c))return!0;return!1};l.dd=function(b){Vd(Infinity,Infinity,-Infinity,-Infinity,b);for(var c=this.d,d=0,e=c.length;d<e;++d)de(b,c[d].J());return b};l.mf=function(){return Om(this.d)};
l.te=function(b){this.i!=this.c&&(xb(this.e),this.g=0,this.i=this.c);if(0>b||0!==this.g&&b<this.g)return this;var c=b.toString();if(this.e.hasOwnProperty(c))return this.e[c];var d=[],e=this.d,f=!1,g,h;g=0;for(h=e.length;g<h;++g){var k=e[g],n=k.te(b);d.push(n);n!==k&&(f=!0)}if(f)return b=new Mm(null),Pm(b),b.d=d,Nm(b),b.l(),this.e[c]=b;this.g=b;return this};l.O=function(){return"GeometryCollection"};l.ja=function(b){var c=this.d,d,e;d=0;for(e=c.length;d<e;++d)if(c[d].ja(b))return!0;return!1};
l.la=function(){return 0==this.d.length};l.rg=function(b){b=Om(b);Pm(this);this.d=b;Nm(this);this.l()};l.ra=function(b){var c=this.d,d,e;d=0;for(e=c.length;d<e;++d)c[d].ra(b);this.l()};l.Ia=function(b,c){var d=this.d,e,f;e=0;for(f=d.length;e<f;++e)d[e].Ia(b,c);this.l()};l.P=function(){Pm(this);Mm.T.P.call(this)};function Qm(b,c,d,e,f){var g=NaN,h=NaN,k=(d-c)/e;if(0!==k)if(1==k)g=b[c],h=b[c+1];else if(2==k)g=.5*b[c]+.5*b[c+e],h=.5*b[c+1]+.5*b[c+e+1];else{var h=b[c],k=b[c+1],n=0,g=[0],p;for(p=c+e;p<d;p+=e){var q=b[p],r=b[p+1],n=n+Math.sqrt((q-h)*(q-h)+(r-k)*(r-k));g.push(n);h=q;k=r}d=.5*n;for(var s,h=fb,k=0,n=g.length;k<n;)p=k+n>>1,q=h(d,g[p]),0<q?k=p+1:(n=p,s=!q);s=s?k:~k;0>s?(d=(d-g[-s-2])/(g[-s-1]-g[-s-2]),c+=(-s-2)*e,g=Xb(b[c],b[c+e],d),h=Xb(b[c+1],b[c+e+1],d)):(g=b[c+s*e],h=b[c+s*e+1])}return null!=f?
(f[0]=g,f[1]=h,f):[g,h]}function Rm(b,c,d,e,f,g){if(d==c)return null;if(f<b[c+e-1])return g?(d=b.slice(c,c+e),d[e-1]=f,d):null;if(b[d-1]<f)return g?(d=b.slice(d-e,d),d[e-1]=f,d):null;if(f==b[c+e-1])return b.slice(c,c+e);c/=e;for(d/=e;c<d;)g=c+d>>1,f<b[(g+1)*e-1]?d=g:c=g+1;d=b[c*e-1];if(f==d)return b.slice((c-1)*e,(c-1)*e+e);g=(f-d)/(b[(c+1)*e-1]-d);d=[];var h;for(h=0;h<e-1;++h)d.push(Xb(b[(c-1)*e+h],b[c*e+h],g));d.push(f);return d}
function Sm(b,c,d,e,f,g){var h=0;if(g)return Rm(b,h,c[c.length-1],d,e,f);if(e<b[d-1])return f?(b=b.slice(0,d),b[d-1]=e,b):null;if(b[b.length-1]<e)return f?(b=b.slice(b.length-d),b[d-1]=e,b):null;f=0;for(g=c.length;f<g;++f){var k=c[f];if(h!=k){if(e<b[h+d-1])break;if(e<=b[k-1])return Rm(b,h,k,d,e,!1);h=k}}return null};function Tm(b,c){rk.call(this);this.b=null;this.o=this.p=this.n=-1;this.W(b,c)}v(Tm,rk);l=Tm.prototype;l.hh=function(b){null===this.j?this.j=b.slice():ab(this.j,b);this.l()};l.clone=function(){var b=new Tm(null);Um(b,this.a,this.j.slice());return b};l.Ya=function(b,c,d,e){if(e<Yd(this.J(),b,c))return e;this.o!=this.c&&(this.p=Math.sqrt(Ak(this.j,0,this.j.length,this.B,0)),this.o=this.c);return Ck(this.j,0,this.j.length,this.B,this.p,!1,b,c,d,e)};
l.xh=function(b,c){return Tk(this.j,0,this.j.length,this.B,b,c)};l.Mj=function(b,c){return"XYM"!=this.a&&"XYZM"!=this.a?null:Rm(this.j,0,this.j.length,this.B,b,m(c)?c:!1)};l.Q=function(){return Hk(this.j,0,this.j.length,this.B)};l.If=function(){var b=this.j,c=this.B,d=b[0],e=b[1],f=0,g;for(g=0+c;g<this.j.length;g+=c)var h=b[g],k=b[g+1],f=f+Math.sqrt((h-d)*(h-d)+(k-e)*(k-e)),d=h,e=k;return f};function fm(b){b.n!=b.c&&(b.b=Qm(b.j,0,b.j.length,b.B,b.b),b.n=b.c);return b.b}
l.oc=function(b){var c=[];c.length=Jk(this.j,0,this.j.length,this.B,b,c,0);b=new Tm(null);Um(b,"XY",c);return b};l.O=function(){return"LineString"};l.ja=function(b){return Uk(this.j,0,this.j.length,this.B,b)};l.W=function(b,c){null===b?Um(this,"XY",null):(uk(this,c,b,1),null===this.j&&(this.j=[]),this.j.length=Fk(this.j,0,b,this.B),this.l())};function Um(b,c,d){tk(b,c,d);b.l()};function Vm(b,c){rk.call(this);this.b=[];this.n=this.o=-1;this.W(b,c)}v(Vm,rk);l=Vm.prototype;l.ih=function(b){null===this.j?this.j=b.j.slice():ab(this.j,b.j.slice());this.b.push(this.j.length);this.l()};l.clone=function(){var b=new Vm(null);Wm(b,this.a,this.j.slice(),this.b.slice());return b};l.Ya=function(b,c,d,e){if(e<Yd(this.J(),b,c))return e;this.n!=this.c&&(this.o=Math.sqrt(Bk(this.j,0,this.b,this.B,0)),this.n=this.c);return Dk(this.j,0,this.b,this.B,this.o,!1,b,c,d,e)};
l.Oj=function(b,c,d){return"XYM"!=this.a&&"XYZM"!=this.a||0===this.j.length?null:Sm(this.j,this.b,this.B,b,m(c)?c:!1,m(d)?d:!1)};l.Q=function(){return Ik(this.j,0,this.b,this.B)};l.Ph=function(b){if(0>b||this.b.length<=b)return null;var c=new Tm(null);Um(c,this.a,this.j.slice(0===b?0:this.b[b-1],this.b[b]));return c};l.Lc=function(){var b=this.j,c=this.b,d=this.a,e=[],f=0,g,h;g=0;for(h=c.length;g<h;++g){var k=c[g],n=new Tm(null);Um(n,d,b.slice(f,k));e.push(n);f=k}return e};
function hm(b){var c=[],d=b.j,e=0,f=b.b;b=b.B;var g,h;g=0;for(h=f.length;g<h;++g){var k=f[g],e=Qm(d,e,k,b);ab(c,e);e=k}return c}l.oc=function(b){var c=[],d=[],e=this.j,f=this.b,g=this.B,h=0,k=0,n,p;n=0;for(p=f.length;n<p;++n){var q=f[n],k=Jk(e,h,q,g,b,c,k);d.push(k);h=q}c.length=k;b=new Vm(null);Wm(b,"XY",c,d);return b};l.O=function(){return"MultiLineString"};l.ja=function(b){a:{var c=this.j,d=this.b,e=this.B,f=0,g,h;g=0;for(h=d.length;g<h;++g){if(Uk(c,f,d[g],e,b)){b=!0;break a}f=d[g]}b=!1}return b};
l.W=function(b,c){if(null===b)Wm(this,"XY",null,this.b);else{uk(this,c,b,2);null===this.j&&(this.j=[]);var d=Gk(this.j,0,b,this.B,this.b);this.j.length=0===d.length?0:d[d.length-1];this.l()}};function Wm(b,c,d,e){tk(b,c,d);b.b=e;b.l()}function Xm(b,c){var d="XY",e=[],f=[],g,h;g=0;for(h=c.length;g<h;++g){var k=c[g];0===g&&(d=k.a);ab(e,k.j);f.push(e.length)}Wm(b,d,e,f)};function Ym(b,c){rk.call(this);this.W(b,c)}v(Ym,rk);l=Ym.prototype;l.kh=function(b){null===this.j?this.j=b.j.slice():ab(this.j,b.j);this.l()};l.clone=function(){var b=new Ym(null);tk(b,this.a,this.j.slice());b.l();return b};l.Ya=function(b,c,d,e){if(e<Yd(this.J(),b,c))return e;var f=this.j,g=this.B,h,k,n;h=0;for(k=f.length;h<k;h+=g)if(n=yk(b,c,f[h],f[h+1]),n<e){e=n;for(n=0;n<g;++n)d[n]=f[h+n];d.length=g}return e};l.Q=function(){return Hk(this.j,0,this.j.length,this.B)};
l.Zh=function(b){var c=null===this.j?0:this.j.length/this.B;if(0>b||c<=b)return null;c=new Nk(null);Ok(c,this.a,this.j.slice(b*this.B,(b+1)*this.B));return c};l.Gd=function(){var b=this.j,c=this.a,d=this.B,e=[],f,g;f=0;for(g=b.length;f<g;f+=d){var h=new Nk(null);Ok(h,c,b.slice(f,f+d));e.push(h)}return e};l.O=function(){return"MultiPoint"};l.ja=function(b){var c=this.j,d=this.B,e,f,g,h;e=0;for(f=c.length;e<f;e+=d)if(g=c[e],h=c[e+1],$d(b,g,h))return!0;return!1};
l.W=function(b,c){null===b?tk(this,"XY",null):(uk(this,c,b,1),null===this.j&&(this.j=[]),this.j.length=Fk(this.j,0,b,this.B));this.l()};function Zm(b,c){rk.call(this);this.b=[];this.o=-1;this.p=null;this.H=this.r=this.D=-1;this.n=null;this.W(b,c)}v(Zm,rk);l=Zm.prototype;l.lh=function(b){if(null===this.j)this.j=b.j.slice(),b=b.b.slice(),this.b.push();else{var c=this.j.length;ab(this.j,b.j);b=b.b.slice();var d,e;d=0;for(e=b.length;d<e;++d)b[d]+=c}this.b.push(b);this.l()};l.clone=function(){var b=new Zm(null);$m(b,this.a,this.j.slice(),this.b.slice());return b};
l.Ya=function(b,c,d,e){if(e<Yd(this.J(),b,c))return e;if(this.r!=this.c){var f=this.b,g=0,h=0,k,n;k=0;for(n=f.length;k<n;++k)var p=f[k],h=Bk(this.j,g,p,this.B,h),g=p[p.length-1];this.D=Math.sqrt(h);this.r=this.c}f=im(this);g=this.b;h=this.B;k=this.D;n=0;var p=m(void 0)?void 0:[NaN,NaN],q,r;q=0;for(r=g.length;q<r;++q){var s=g[q];e=Dk(f,n,s,h,k,!0,b,c,d,e,p);n=s[s.length-1]}return e};
l.Jb=function(b,c){var d;a:{d=im(this);var e=this.b,f=0;if(0!==e.length){var g,h;g=0;for(h=e.length;g<h;++g){var k=e[g];if(Rk(d,f,k,this.B,b,c)){d=!0;break a}f=k[k.length-1]}}d=!1}return d};l.Pj=function(){var b=im(this),c=this.b,d=0,e=0,f,g;f=0;for(g=c.length;f<g;++f)var h=c[f],e=e+wk(b,d,h,this.B),d=h[h.length-1];return e};
l.Q=function(b){var c;m(b)?(c=im(this).slice(),Zk(c,this.b,this.B,b)):c=this.j;b=c;c=this.b;var d=this.B,e=0,f=m(void 0)?void 0:[],g=0,h,k;h=0;for(k=c.length;h<k;++h){var n=c[h];f[g++]=Ik(b,e,n,d,f[g]);e=n[n.length-1]}f.length=g;return f};
function jm(b){if(b.o!=b.c){var c=b.j,d=b.b,e=b.B,f=0,g=[],h,k,n=Sd();h=0;for(k=d.length;h<k;++h){var p=d[h],n=ee(Vd(Infinity,Infinity,-Infinity,-Infinity,void 0),c,f,p[0],e);g.push((n[0]+n[2])/2,(n[1]+n[3])/2);f=p[p.length-1]}c=im(b);d=b.b;e=b.B;f=0;h=[];k=0;for(n=d.length;k<n;++k)p=d[k],h=Sk(c,f,p,e,g,2*k,h),f=p[p.length-1];b.p=h;b.o=b.c}return b.p}l.Mh=function(){var b=new Ym(null),c=jm(this).slice();tk(b,"XY",c);b.l();return b};
function im(b){if(b.H!=b.c){var c=b.j,d;a:{d=b.b;var e,f;e=0;for(f=d.length;e<f;++e)if(!Xk(c,d[e],b.B,void 0)){d=!1;break a}d=!0}d?b.n=c:(b.n=c.slice(),b.n.length=Zk(b.n,b.b,b.B));b.H=b.c}return b.n}l.oc=function(b){var c=[],d=[],e=this.j,f=this.b,g=this.B;b=Math.sqrt(b);var h=0,k=0,n,p;n=0;for(p=f.length;n<p;++n){var q=f[n],r=[],k=Kk(e,h,q,g,b,c,k,r);d.push(r);h=q[q.length-1]}c.length=k;e=new Zm(null);$m(e,"XY",c,d);return e};
l.ai=function(b){if(0>b||this.b.length<=b)return null;var c;0===b?c=0:(c=this.b[b-1],c=c[c.length-1]);b=this.b[b].slice();var d=b[b.length-1];if(0!==c){var e,f;e=0;for(f=b.length;e<f;++e)b[e]-=c}e=new F(null);$k(e,this.a,this.j.slice(c,d),b);return e};l.qd=function(){var b=this.a,c=this.j,d=this.b,e=[],f=0,g,h,k,n;g=0;for(h=d.length;g<h;++g){var p=d[g].slice(),q=p[p.length-1];if(0!==f)for(k=0,n=p.length;k<n;++k)p[k]-=f;k=new F(null);$k(k,b,c.slice(f,q),p);e.push(k);f=q}return e};l.O=function(){return"MultiPolygon"};
l.ja=function(b){a:{var c=im(this),d=this.b,e=this.B,f=0,g,h;g=0;for(h=d.length;g<h;++g){var k=d[g];if(Vk(c,f,k,e,b)){b=!0;break a}f=k[k.length-1]}b=!1}return b};l.W=function(b,c){if(null===b)$m(this,"XY",null,this.b);else{uk(this,c,b,3);null===this.j&&(this.j=[]);var d=this.j,e=this.B,f=this.b,g=0,f=m(f)?f:[],h=0,k,n;k=0;for(n=b.length;k<n;++k)g=Gk(d,g,b[k],e,f[h]),f[h++]=g,g=g[g.length-1];f.length=h;0===f.length?this.j.length=0:(d=f[f.length-1],this.j.length=0===d.length?0:d[d.length-1]);this.l()}};
function $m(b,c,d,e){tk(b,c,d);b.b=e;b.l()}function an(b,c){var d="XY",e=[],f=[],g,h,k;g=0;for(h=c.length;g<h;++g){var n=c[g];0===g&&(d=n.a);var p=e.length;k=n.b;var q,r;q=0;for(r=k.length;q<r;++q)k[q]+=p;ab(e,n.j);f.push(k)}$m(b,d,e,f)};function bn(b,c){return ma(b)-ma(c)}function cn(b,c){var d=.5*b/c;return d*d}function dn(b,c,d,e,f,g){var h=!1,k,n;k=d.e;null!==k&&(n=k.Pc(),2==n||3==n?k.Ne(f,g):(0==n&&k.load(),k.we(f,g),h=!0));f=(0,d.d)(c);null!=f&&(e=f.te(e),(0,en[e.O()])(b,e,d,c));return h}
var en={Point:function(b,c,d,e){var f=d.e;if(null!==f){if(2!=f.Pc())return;var g=b.a(d.a,"Image");g.ib(f);g.ub(c,e)}f=d.c;null!==f&&(b=b.a(d.a,"Text"),b.Ca(f),b.vb(c.Q(),0,2,2,c,e))},LineString:function(b,c,d,e){var f=d.b;if(null!==f){var g=b.a(d.a,"LineString");g.Ba(null,f);g.Eb(c,e)}f=d.c;null!==f&&(b=b.a(d.a,"Text"),b.Ca(f),b.vb(fm(c),0,2,2,c,e))},Polygon:function(b,c,d,e){var f=d.f,g=d.b;if(null!==f||null!==g){var h=b.a(d.a,"Polygon");h.Ba(f,g);h.Rb(c,e)}f=d.c;null!==f&&(b=b.a(d.a,"Text"),b.Ca(f),
b.vb(bl(c),0,2,2,c,e))},MultiPoint:function(b,c,d,e){var f=d.e;if(null!==f){if(2!=f.Pc())return;var g=b.a(d.a,"Image");g.ib(f);g.tb(c,e)}f=d.c;null!==f&&(b=b.a(d.a,"Text"),b.Ca(f),d=c.j,b.vb(d,0,d.length,c.B,c,e))},MultiLineString:function(b,c,d,e){var f=d.b;if(null!==f){var g=b.a(d.a,"LineString");g.Ba(null,f);g.mc(c,e)}f=d.c;null!==f&&(b=b.a(d.a,"Text"),b.Ca(f),d=hm(c),b.vb(d,0,d.length,2,c,e))},MultiPolygon:function(b,c,d,e){var f=d.f,g=d.b;if(null!==g||null!==f){var h=b.a(d.a,"Polygon");h.Ba(f,
g);h.nc(c,e)}f=d.c;null!==f&&(b=b.a(d.a,"Text"),b.Ca(f),d=jm(c),b.vb(d,0,d.length,2,c,e))},GeometryCollection:function(b,c,d,e){c=c.d;var f,g;f=0;for(g=c.length;f<g;++f)(0,en[c[f].O()])(b,c[f],d,e)},Circle:function(b,c,d,e){var f=d.f,g=d.b;if(null!==f||null!==g){var h=b.a(d.a,"Polygon");h.Ba(f,g);h.lc(c,e)}f=d.c;null!==f&&(b=b.a(d.a,"Text"),b.Ca(f),b.vb(c.Oc(),0,2,2,c,e))}};function fn(b,c,d,e,f){kj.call(this,b,c,d,2,e);this.c=f}v(fn,kj);fn.prototype.a=function(){return this.c};function gn(b){ah.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,projection:b.projection,state:b.state});this.i=m(b.resolutions)?b.resolutions:null}v(gn,ah);function hn(b,c){if(null!==b.i){var d=ac(b.i,c,0);c=b.i[d]}return c}gn.prototype.r=function(b){b=b.target;switch(b.state){case 1:this.dispatchEvent(new jn(kn,b));break;case 2:this.dispatchEvent(new jn(ln,b));break;case 3:this.dispatchEvent(new jn(mn,b))}};function nn(b,c){b.a().src=c}
function jn(b,c){qc.call(this,b);this.image=c}v(jn,qc);var kn="imageloadstart",ln="imageloadend",mn="imageloaderror";function on(b){gn.call(this,{attributions:b.attributions,logo:b.logo,projection:b.projection,resolutions:b.resolutions,state:m(b.state)?b.state:void 0});this.N=b.canvasFunction;this.p=null;this.H=0;this.S=m(b.ratio)?b.ratio:1.5}v(on,gn);on.prototype.sc=function(b,c,d,e){c=hn(this,c);var f=this.p;if(null!==f&&this.H==this.c&&f.resolution==c&&f.f==d&&Zd(f.J(),b))return f;b=b.slice();se(b,this.S);e=this.N(b,c,d,[qe(b)/c*d,ne(b)/c*d],e);null===e||(f=new fn(b,c,d,this.f,e));this.p=f;this.H=this.c;return f};var pn;
(function(){var b={kf:{}};(function(){function c(b,d){if(!(this instanceof c))return new c(b,d);this.ie=Math.max(4,b||9);this.Ye=Math.max(2,Math.ceil(.4*this.ie));d&&this.dh(d);this.clear()}function d(b,c){b.bbox=e(b,0,b.children.length,c)}function e(b,c,d,e){for(var g=[Infinity,Infinity,-Infinity,-Infinity],h;c<d;c++)h=b.children[c],f(g,b.za?e(h):h.bbox);return g}function f(b,c){b[0]=Math.min(b[0],c[0]);b[1]=Math.min(b[1],c[1]);b[2]=Math.max(b[2],c[2]);b[3]=Math.max(b[3],c[3])}function g(b,c){return b.bbox[0]-
c.bbox[0]}function h(b,c){return b.bbox[1]-c.bbox[1]}function k(b){return(b[2]-b[0])*(b[3]-b[1])}function n(b){return b[2]-b[0]+(b[3]-b[1])}function p(b,c){return b[0]<=c[0]&&b[1]<=c[1]&&c[2]<=b[2]&&c[3]<=b[3]}function q(b,c){return c[0]<=b[2]&&c[1]<=b[3]&&c[2]>=b[0]&&c[3]>=b[1]}function r(b,c,d,e,f){for(var g=[c,d],h;g.length;)d=g.pop(),c=g.pop(),d-c<=e||(h=c+Math.ceil((d-c)/e/2)*e,s(b,c,d,h,f),g.push(c,h,h,d))}function s(b,c,d,e,f){for(var g,h,k,n,p;d>c;){600<d-c&&(g=d-c+1,h=e-c+1,k=Math.log(g),
n=.5*Math.exp(2*k/3),p=.5*Math.sqrt(k*n*(g-n)/g)*(0>h-g/2?-1:1),k=Math.max(c,Math.floor(e-h*n/g+p)),h=Math.min(d,Math.floor(e+(g-h)*n/g+p)),s(b,k,h,e,f));g=b[e];h=c;n=d;u(b,c,e);for(0<f(b[d],g)&&u(b,c,d);h<n;){u(b,h,n);h++;for(n--;0>f(b[h],g);)h++;for(;0<f(b[n],g);)n--}0===f(b[c],g)?u(b,c,n):(n++,u(b,n,d));n<=e&&(c=n+1);e<=n&&(d=n-1)}}function u(b,c,d){var e=b[c];b[c]=b[d];b[d]=e}c.prototype={all:function(){return this.Ue(this.data,[])},search:function(b){var c=this.data,d=[],e=this.Ka;if(!q(b,c.bbox))return d;
for(var f=[],g,h,k,n;c;){g=0;for(h=c.children.length;g<h;g++)k=c.children[g],n=c.za?e(k):k.bbox,q(b,n)&&(c.za?d.push(k):p(b,n)?this.Ue(k,d):f.push(k));c=f.pop()}return d},load:function(b){if(!b||!b.length)return this;if(b.length<this.Ye){for(var c=0,d=b.length;c<d;c++)this.ta(b[c]);return this}b=this.We(b.slice(),0,b.length-1,0);this.data.children.length?this.data.height===b.height?this.Ze(this.data,b):(this.data.height<b.height&&(c=this.data,this.data=b,b=c),this.Xe(b,this.data.height-b.height-1,
!0)):this.data=b;return this},ta:function(b){b&&this.Xe(b,this.data.height-1);return this},clear:function(){this.data={children:[],height:1,bbox:[Infinity,Infinity,-Infinity,-Infinity],za:!0};return this},remove:function(b){if(!b)return this;for(var c=this.data,d=this.Ka(b),e=[],f=[],g,h,k,n;c||e.length;){c||(c=e.pop(),h=e[e.length-1],g=f.pop(),n=!0);if(c.za&&(k=c.children.indexOf(b),-1!==k)){c.children.splice(k,1);e.push(c);this.bh(e);break}n||c.za||!p(c.bbox,d)?h?(g++,c=h.children[g],n=!1):c=null:
(e.push(c),f.push(g),g=0,h=c,c=c.children[0])}return this},Ka:function(b){return b},le:function(b,c){return b[0]-c[0]},me:function(b,c){return b[1]-c[1]},toJSON:function(){return this.data},Ue:function(b,c){for(var d=[];b;)b.za?c.push.apply(c,b.children):d.push.apply(d,b.children),b=d.pop();return c},We:function(b,c,e,f){var g=e-c+1,h=this.ie,k;if(g<=h)return k={children:b.slice(c,e+1),height:1,bbox:null,za:!0},d(k,this.Ka),k;f||(f=Math.ceil(Math.log(g)/Math.log(h)),h=Math.ceil(g/Math.pow(h,f-1)));
k={children:[],height:f,bbox:null};var g=Math.ceil(g/h),h=g*Math.ceil(Math.sqrt(h)),n,p,q;for(r(b,c,e,h,this.le);c<=e;c+=h)for(p=Math.min(c+h-1,e),r(b,c,p,g,this.me),n=c;n<=p;n+=g)q=Math.min(n+g-1,p),k.children.push(this.We(b,n,q,f-1));d(k,this.Ka);return k},ah:function(b,c,d,e){for(var f,g,h,n,p,q,r,s;;){e.push(c);if(c.za||e.length-1===d)break;r=s=Infinity;f=0;for(g=c.children.length;f<g;f++){h=c.children[f];p=k(h.bbox);q=b;var u=h.bbox;q=(Math.max(u[2],q[2])-Math.min(u[0],q[0]))*(Math.max(u[3],
q[3])-Math.min(u[1],q[1]))-p;q<s?(s=q,r=p<r?p:r,n=h):q===s&&p<r&&(r=p,n=h)}c=n}return c},Xe:function(b,c,d){var e=this.Ka;d=d?b.bbox:e(b);var e=[],g=this.ah(d,this.data,c,e);g.children.push(b);for(f(g.bbox,d);0<=c;)if(e[c].children.length>this.ie)this.eh(e,c),c--;else break;this.Yg(d,e,c)},eh:function(b,c){var e=b[c],f=e.children.length,g=this.Ye;this.Zg(e,g,f);f={children:e.children.splice(this.$g(e,g,f)),height:e.height};e.za&&(f.za=!0);d(e,this.Ka);d(f,this.Ka);c?b[c-1].children.push(f):this.Ze(e,
f)},Ze:function(b,c){this.data={children:[b,c],height:b.height+1};d(this.data,this.Ka)},$g:function(b,c,d){var f,g,h,n,p,q,r;p=q=Infinity;for(f=c;f<=d-c;f++){g=e(b,0,f,this.Ka);h=e(b,f,d,this.Ka);var s=g,u=h;n=Math.max(s[0],u[0]);var Ma=Math.max(s[1],u[1]),sb=Math.min(s[2],u[2]),s=Math.min(s[3],u[3]);n=Math.max(0,sb-n)*Math.max(0,s-Ma);g=k(g)+k(h);n<p?(p=n,r=f,q=g<q?g:q):n===p&&g<q&&(q=g,r=f)}return r},Zg:function(b,c,d){var e=b.za?this.le:g,f=b.za?this.me:h,k=this.Ve(b,c,d,e);c=this.Ve(b,c,d,f);
k<c&&b.children.sort(e)},Ve:function(b,c,d,g){b.children.sort(g);g=this.Ka;var h=e(b,0,c,g),k=e(b,d-c,d,g),p=n(h)+n(k),q,r;for(q=c;q<d-c;q++)r=b.children[q],f(h,b.za?g(r):r.bbox),p+=n(h);for(q=d-c-1;q>=c;q--)r=b.children[q],f(k,b.za?g(r):r.bbox),p+=n(k);return p},Yg:function(b,c,d){for(;0<=d;d--)f(c[d].bbox,b)},bh:function(b){for(var c=b.length-1,e;0<=c;c--)0===b[c].children.length?0<c?(e=b[c-1].children,e.splice(e.indexOf(b[c]),1)):this.clear():d(b[c],this.Ka)},dh:function(b){var c=["return a"," - b",
";"];this.le=new Function("a","b",c.join(b[0]));this.me=new Function("a","b",c.join(b[1]));this.Ka=new Function("a","return [a"+b.join(", a")+"];")}};"function"===typeof define&&define.Pm?define("rbush",function(){return c}):"undefined"!==typeof b?b.kf=c:"undefined"!==typeof self?self.a=c:window.a=c})();pn=b.kf})();function qn(b){this.c=pn(b);this.a={}}l=qn.prototype;l.ta=function(b,c){var d=[b[0],b[1],b[2],b[3],c];this.c.ta(d);this.a[ma(c)]=d};l.load=function(b,c){for(var d=Array(c.length),e=0,f=c.length;e<f;e++){var g=b[e],h=c[e],g=[g[0],g[1],g[2],g[3],h];d[e]=g;this.a[ma(h)]=g}this.c.load(d)};l.remove=function(b){b=ma(b);var c=this.a[b];yb(this.a,b);return null!==this.c.remove(c)};l.update=function(b,c){var d=ma(c);ce(this.a[d].slice(0,4),b)||(this.remove(c),this.ta(b,c))};
function rn(b){b=b.c.all();return Sa(b,function(b){return b[4]})}function sn(b,c){var d=b.c.search(c);return Sa(d,function(b){return b[4]})}l.forEach=function(b,c){return tn(rn(this),b,c)};function un(b,c,d,e){return tn(sn(b,c),d,e)}function tn(b,c,d){for(var e,f=0,g=b.length;f<g&&!(e=c.call(d,b[f]));f++);return e}l.la=function(){return wb(this.a)};l.clear=function(){this.c.clear();this.a={}};l.J=function(){return this.c.data.bbox};function vn(b){b=m(b)?b:{};ah.call(this,{attributions:b.attributions,logo:b.logo,projection:b.projection,state:m(b.state)?b.state:void 0});this.b=new qn;this.d={};this.g={};this.i={};this.k={};m(b.features)&&this.lb(b.features)}v(vn,ah);l=vn.prototype;l.Va=function(b){var c=ma(b).toString();wn(this,c,b);var d=b.R();null!=d?(d=d.J(),this.b.ta(d,b)):this.d[c]=b;xn(this,c,b);this.dispatchEvent(new yn("addfeature",b));this.l()};
function wn(b,c,d){b.k[c]=[w(d,"change",b.Qf,!1,b),w(d,"propertychange",b.Qf,!1,b)]}function xn(b,c,d){var e=d.aa;m(e)?b.g[e.toString()]=d:b.i[c]=d}l.Ga=function(b){this.lb(b);this.l()};l.lb=function(b){var c,d,e,f,g=[],h=[];d=0;for(e=b.length;d<e;d++){f=b[d];c=ma(f).toString();wn(this,c,f);var k=f.R();null!=k?(c=k.J(),g.push(c),h.push(f)):this.d[c]=f}this.b.load(g,h);d=0;for(e=b.length;d<e;d++)f=b[d],c=ma(f).toString(),xn(this,c,f),this.dispatchEvent(new yn("addfeature",f))};
l.clear=function(b){if(b){for(var c in this.k)Qa(this.k[c],Wc);this.k={};this.g={};this.i={}}else b=this.mg,this.b.forEach(b,this),mb(this.d,b,this);this.b.clear();this.d={};this.dispatchEvent(new yn("clear"));this.l()};l.$a=function(b,c){return this.b.forEach(b,c)};function zn(b,c,d){b.wa([c[0],c[1],c[0],c[1]],function(b){if(b.R().Jb(c[0],c[1]))return d.call(void 0,b)})}l.wa=function(b,c,d){return un(this.b,b,c,d)};l.Fb=function(b,c,d,e){return this.wa(b,d,e)};
l.Ma=function(b,c,d){return this.wa(b,function(e){if(e.R().ja(b)&&(e=c.call(d,e)))return e})};l.Aa=function(){var b=rn(this.b);wb(this.d)||ab(b,qb(this.d));return b};l.Oa=function(b){var c=[];zn(this,b,function(b){c.push(b)});return c};l.ab=function(b){var c=b[0],d=b[1],e=null,f=[NaN,NaN],g=Infinity,h=[-Infinity,-Infinity,Infinity,Infinity];un(this.b,h,function(b){var n=b.R(),p=g;g=n.Ya(c,d,f,g);g<p&&(e=b,b=Math.sqrt(g),h[0]=c-b,h[1]=d-b,h[2]=c+b,h[3]=d+b)});return e};l.J=function(){return this.b.J()};
l.Na=function(b){b=this.g[b.toString()];return m(b)?b:null};l.Qf=function(b){b=b.target;var c=ma(b).toString(),d=b.R();null!=d?(d=d.J(),c in this.d?(delete this.d[c],this.b.ta(d,b)):this.b.update(d,b)):c in this.d||(this.b.remove(b),this.d[c]=b);d=b.aa;m(d)?(d=d.toString(),c in this.i?(delete this.i[c],this.g[d]=b):this.g[d]!==b&&(An(this,b),this.g[d]=b)):c in this.i||(An(this,b),this.i[c]=b);this.l();this.dispatchEvent(new yn("changefeature",b))};l.la=function(){return this.b.la()&&wb(this.d)};
l.Hb=ca;l.fb=function(b){var c=ma(b).toString();c in this.d?delete this.d[c]:this.b.remove(b);this.mg(b);this.l()};l.mg=function(b){var c=ma(b).toString();Qa(this.k[c],Wc);delete this.k[c];var d=b.aa;m(d)?delete this.g[d.toString()]:delete this.i[c];this.dispatchEvent(new yn("removefeature",b))};function An(b,c){for(var d in b.g)if(b.g[d]===c){delete b.g[d];break}}function yn(b,c){qc.call(this,b);this.feature=c}v(yn,qc);function Bn(b){this.a=b.source;this.U=Hd();this.b=Nf();this.d=[0,0];this.k=null;on.call(this,{attributions:b.attributions,canvasFunction:ra(this.mh,this),logo:b.logo,projection:b.projection,ratio:b.ratio,resolutions:b.resolutions,state:this.a.q});this.o=null;this.g=void 0;this.Nf(b.style);w(this.a,"change",this.gk,void 0,this)}v(Bn,on);l=Bn.prototype;
l.mh=function(b,c,d,e,f){var g=new Am(.5*c/d,b,c);this.a.Hb(b,c,f);var h=!1;this.a.Fb(b,c,function(b){var e;if(!(e=h)){var f;m(b.a)?f=b.a.call(b,c):m(this.g)&&(f=this.g(b,c));if(null!=f){var q,r=!1;e=0;for(q=f.length;e<q;++e)r=dn(g,b,f[e],cn(c,d),this.fk,this)||r;e=r}else e=!1}h=e},this);Bm(g);if(h)return null;this.d[0]!=e[0]||this.d[1]!=e[1]?(this.b.canvas.width=e[0],this.b.canvas.height=e[1],this.d[0]=e[0],this.d[1]=e[1]):this.b.clearRect(0,0,e[0],e[1]);b=Cn(this,ke(b),c,d,e);Em(g,this.b,d,b,0,
{});this.k=g;return this.b.canvas};l.Jd=function(b,c,d,e,f){if(null!==this.k){var g={};return this.k.b(b,c,0,e,function(b){var c=ma(b).toString();if(!(c in g))return g[c]=!0,f(b)})}};l.ck=function(){return this.a};l.dk=function(){return this.o};l.ek=function(){return this.g};function Cn(b,c,d,e,f){return lj(b.U,f[0]/2,f[1]/2,e/d,-e/d,0,-c[0],-c[1])}l.fk=function(){this.l()};l.gk=function(){bh(this,this.a.q)};l.Nf=function(b){this.o=m(b)?b:zl;this.g=null===b?void 0:yl(this.o);this.l()};function Dn(b){Fm.call(this,b);this.f=null;this.e=Hd();this.b=this.d=null}v(Dn,Fm);l=Dn.prototype;l.Ua=function(b,c,d,e){var f=this.a;return f.a().Jd(b,c.viewState.resolution,c.viewState.rotation,c.skippedFeatureUids,function(b){return d.call(e,b,f)})};
l.cc=function(b,c,d,e){if(!fa(this.Id()))if(this.a.a()instanceof Bn){if(b=b.slice(),nj(c.pixelToCoordinateMatrix,b,b),this.Ua(b,c,bd,this))return d.call(e,this.a)}else if(null===this.d&&(this.d=Hd(),Nd(this.e,this.d)),c=Im(b,this.d),null===this.b&&(this.b=Nf(1,1)),this.b.clearRect(0,0,1,1),this.b.drawImage(this.Id(),c[0],c[1],1,1,0,0,1,1),0<this.b.getImageData(0,0,1,1).data[3])return d.call(e,this.a)};l.Id=function(){return null===this.f?null:this.f.a()};l.nf=function(){return this.e};
l.ze=function(b,c){var d=b.pixelRatio,e=b.viewState,f=e.center,g=e.resolution,h=e.rotation,k,n=this.a.a(),p=b.viewHints;k=b.extent;m(c.extent)&&(k=oe(k,c.extent));p[0]||p[1]||re(k)||(e=e.projection,p=n.e,null===p||(e=p),k=n.sc(k,g,d,e),null!==k&&rj(this,k)&&(this.f=k));if(null!==this.f){k=this.f;var e=k.J(),p=k.resolution,q=k.f,g=d*p/(g*q);lj(this.e,d*b.size[0]/2,d*b.size[1]/2,g,g,h,q*(e[0]-f[0])/p,q*(f[1]-e[3])/p);this.d=null;tj(b.attributions,k.e);uj(b,n)}return!0};function En(b){Fm.call(this,b);this.b=this.e=null;this.i=!1;this.g=null;this.k=Hd();this.f=null;this.p=this.o=NaN;this.n=this.d=null}v(En,Fm);En.prototype.Id=function(){return this.e};En.prototype.nf=function(){return this.k};
En.prototype.ze=function(b,c){var d=b.pixelRatio,e=b.viewState,f=e.projection,g=this.a,h=g.a(),k=rh(h,f),n=h.jd(),p=jh(k,e.resolution),q=h.Xb(p,b.pixelRatio,f),r=k.na(p),s=r/(q/k.pa(p)),u=e.center,y;r==e.resolution?(u=wj(u,r,b.size),y=me(u,r,e.rotation,b.size)):y=b.extent;m(c.extent)&&(y=oe(y,c.extent));if(re(y))return!1;var z=gh(k,y,r),A=q*of(z),E=q*(z.c-z.b+1),x,Q;null===this.e?(Q=Nf(A,E),this.e=Q.canvas,this.b=[A,E],this.g=Q,this.i=!Jm(this.b)):(x=this.e,Q=this.g,this.b[0]<A||this.b[1]<E||this.p!==
q||this.i&&(this.b[0]>A||this.b[1]>E)?(x.width=A,x.height=E,this.b=[A,E],this.i=!Jm(this.b),this.d=null):(A=this.b[0],E=this.b[1],(x=p!=this.o)||(x=this.d,x=!(x.a<=z.a&&z.d<=x.d&&x.b<=z.b&&z.c<=x.c)),x&&(this.d=null)));var N,L;null===this.d?(A/=q,E/=q,N=z.a-Math.floor((A-of(z))/2),L=z.b-Math.floor((E-(z.c-z.b+1))/2),this.o=p,this.p=q,this.d=new kf(N,N+A-1,L,L+E-1),this.n=Array(A*E),E=this.d):(E=this.d,A=of(E));x={};x[p]={};var U=[],Ca=this.ed(h,x),eb=g.ea(),R=Sd(),Ma=new kf(0,0,0,0),sb,$a,Ub;for(L=
z.a;L<=z.d;++L)for(Ub=z.b;Ub<=z.c;++Ub)$a=h.Vb(p,L,Ub,d,f),N=$a.state,2==N||4==N||3==N&&!eb?x[p][jf($a.a)]=$a:(sb=k.gd($a.a,Ca,null,Ma,R),sb||(U.push($a),sb=k.td($a.a,Ma,R),null===sb||Ca(p+1,sb)));Ca=0;for(sb=U.length;Ca<sb;++Ca)$a=U[Ca],L=q*($a.a[1]-E.a),Ub=q*(E.c-$a.a[2]),Q.clearRect(L,Ub,q,q);U=Sa(rb(x),Number);db(U);var nb=h.N,Mc=je(eh(k,[p,E.a,E.c],R)),sc,Pe,qj,Zh,Wf,gm,Ca=0;for(sb=U.length;Ca<sb;++Ca)if(sc=U[Ca],q=h.Xb(sc,d,f),Zh=x[sc],sc==p)for(qj in Zh)$a=Zh[qj],Pe=($a.a[2]-E.b)*A+($a.a[1]-
E.a),this.n[Pe]!=$a&&(L=q*($a.a[1]-E.a),Ub=q*(E.c-$a.a[2]),N=$a.state,4!=N&&(3!=N||eb)&&nb||Q.clearRect(L,Ub,q,q),2==N&&Q.drawImage($a.Ta(),n,n,q,q,L,Ub,q,q),this.n[Pe]=$a);else for(qj in sc=k.na(sc)/r,Zh)for($a=Zh[qj],Pe=eh(k,$a.a,R),L=(Pe[0]-Mc[0])/s,Ub=(Mc[1]-Pe[3])/s,gm=sc*q,Wf=sc*q,N=$a.state,4!=N&&nb||Q.clearRect(L,Ub,gm,Wf),2==N&&Q.drawImage($a.Ta(),n,n,q,q,L,Ub,gm,Wf),$a=fh(k,Pe,p,Ma),N=Math.max($a.a,E.a),Ub=Math.min($a.d,E.d),L=Math.max($a.b,E.b),$a=Math.min($a.c,E.c);N<=Ub;++N)for(Wf=L;Wf<=
$a;++Wf)Pe=(Wf-E.b)*A+(N-E.a),this.n[Pe]=void 0;vj(b.usedTiles,h,p,z);xj(b,h,k,d,f,y,p,g.r());sj(b,h);uj(b,h);lj(this.k,d*b.size[0]/2,d*b.size[1]/2,d*s/e.resolution,d*s/e.resolution,e.rotation,(Mc[0]-u[0])/s,(u[1]-Mc[1])/s);this.f=null;return!0};En.prototype.cc=function(b,c,d,e){if(null!==this.g&&(null===this.f&&(this.f=Hd(),Nd(this.k,this.f)),b=Im(b,this.f),0<this.g.getImageData(b[0],b[1],1,1).data[3]))return d.call(e,this.a)};function Fn(b){Fm.call(this,b);this.d=!1;this.i=-1;this.n=NaN;this.e=Sd();this.b=this.g=null;this.f=Nf()}v(Fn,Fm);
Fn.prototype.q=function(b,c,d){var e=Hm(this,b);Gm(this,"precompose",d,b,e);var f=this.b;if(null!==f&&!f.la()){var g;jd(this.a,"render")?(this.f.canvas.width=d.canvas.width,this.f.canvas.height=d.canvas.height,g=this.f):g=d;var h=g.globalAlpha;g.globalAlpha=c.opacity;Em(f,g,b.pixelRatio,e,b.viewState.rotation,b.skippedFeatureUids);g!=d&&(Gm(this,"render",g,b,e),d.drawImage(g.canvas,0,0));g.globalAlpha=h}Gm(this,"postcompose",d,b,e)};
Fn.prototype.Ua=function(b,c,d,e){if(null!==this.b){var f=this.a,g={};return this.b.b(b,c.viewState.resolution,c.viewState.rotation,c.skippedFeatureUids,function(b){var c=ma(b).toString();if(!(c in g))return g[c]=!0,d.call(e,b,f)})}};Fn.prototype.k=function(){pj(this)};
Fn.prototype.ze=function(b){function c(b){var c;m(b.a)?c=b.a.call(b,k):m(d.r)&&(c=(0,d.r)(b,k));if(null!=c){if(null!=c){var e,f,g=!1;e=0;for(f=c.length;e<f;++e)g=dn(q,b,c[e],cn(k,n),this.k,this)||g;b=g}else b=!1;this.d=this.d||b}}var d=this.a,e=d.a();tj(b.attributions,e.f);uj(b,e);if(!this.d&&(!d.Ac&&b.viewHints[0]||b.viewHints[1]))return!0;var f=b.extent,g=b.viewState,h=g.projection,k=g.resolution,n=b.pixelRatio;b=d.c;var p=d.ea,g=d.get("renderOrder");m(g)||(g=bn);f=Wd(f,p*k);if(!this.d&&this.n==
k&&this.i==b&&this.g==g&&Zd(this.e,f))return!0;pc(this.b);this.b=null;this.d=!1;var q=new Am(.5*k/n,f,k,d.ea);e.Hb(f,k,h);if(null===g)e.Fb(f,k,c,this);else{var r=[];e.Fb(f,k,function(b){r.push(b)},this);db(r,g);Qa(r,c,this)}Bm(q);this.n=k;this.i=b;this.g=g;this.e=f;this.b=q;return!0};function Gn(b,c){Dj.call(this,0,c);this.d=Nf();this.a=this.d.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";Hf(b,this.a,0);this.c=!0;this.f=Hd()}v(Gn,Dj);Gn.prototype.ne=function(b){return b instanceof H?new Dn(b):b instanceof I?new En(b):b instanceof J?new Fn(b):null};
function Hn(b,c,d){var e=b.g,f=b.d;if(jd(e,c)){var g=d.extent,h=d.pixelRatio,k=d.viewState,n=k.resolution,p=k.rotation;lj(b.f,b.a.width/2,b.a.height/2,h/n,-h/n,-p,-k.center[0],-k.center[1]);k=new Am(.5*n/h,g,n);g=new Yl(f,h,g,b.f,p);e.dispatchEvent(new dl(c,e,g,k,d,f,null));Bm(k);k.la()||Em(k,f,h,b.f,p,{});km(g);b.b=k}}Gn.prototype.O=function(){return"canvas"};
Gn.prototype.Yd=function(b){if(null===b)this.c&&(Mg(this.a,!1),this.c=!1);else{var c=this.d,d=b.size[0]*b.pixelRatio,e=b.size[1]*b.pixelRatio;this.a.width!=d||this.a.height!=e?(this.a.width=d,this.a.height=e):c.clearRect(0,0,this.a.width,this.a.height);Ej(b);Hn(this,"precompose",b);var d=b.layerStatesArray,e=b.viewState.resolution,f,g,h,k;f=0;for(g=d.length;f<g;++f)k=d[f],h=k.layer,h=Gj(this,h),jj(k,e)&&"ready"==k.yc&&h.ze(b,k)&&h.q(b,k,c);Hn(this,"postcompose",b);this.c||(Mg(this.a,!0),this.c=!0);
Hj(this,b);b.postRenderFunctions.push(Fj)}};function In(b,c){oj.call(this,b);this.target=c}v(In,oj);In.prototype.f=ca;In.prototype.n=ca;function Jn(b){var c=Ef("DIV");c.style.position="absolute";In.call(this,b,c);this.b=null;this.d=Jd()}v(Jn,In);Jn.prototype.Ua=function(b,c,d,e){var f=this.a;return f.a().Jd(b,c.viewState.resolution,c.viewState.rotation,c.skippedFeatureUids,function(b){return d.call(e,b,f)})};Jn.prototype.f=function(){Gf(this.target);this.b=null};
Jn.prototype.e=function(b,c){var d=b.viewState,e=d.center,f=d.resolution,g=d.rotation,h=this.b,k=this.a.a(),n=b.viewHints,p=b.extent;m(c.extent)&&(p=oe(p,c.extent));n[0]||n[1]||re(p)||(d=d.projection,n=k.e,null===n||(d=n),p=k.sc(p,f,b.pixelRatio,d),null===p||rj(this,p)&&(h=p));null!==h&&(d=h.J(),n=h.resolution,p=Hd(),lj(p,b.size[0]/2,b.size[1]/2,n/f,n/f,g,(d[0]-e[0])/n,(e[1]-d[3])/n),h!=this.b&&(e=h.a(this),e.style.maxWidth="none",e.style.position="absolute",Gf(this.target),this.target.appendChild(e),
this.b=h),mj(p,this.d)||(Rf(this.target,p),Kd(this.d,p)),tj(b.attributions,h.e),uj(b,k));return!0};function Kn(b){var c=Ef("DIV");c.style.position="absolute";In.call(this,b,c);this.d=!0;this.i=1;this.g=0;this.b={}}v(Kn,In);Kn.prototype.f=function(){Gf(this.target);this.g=0};
Kn.prototype.e=function(b,c){if(!c.visible)return this.d&&(Mg(this.target,!1),this.d=!1),!0;var d=b.pixelRatio,e=b.viewState,f=e.projection,g=this.a,h=g.a(),k=rh(h,f),n=h.jd(),p=jh(k,e.resolution),q=k.na(p),r=e.center,s;q==e.resolution?(r=wj(r,q,b.size),s=me(r,q,e.rotation,b.size)):s=b.extent;m(c.extent)&&(s=oe(s,c.extent));var q=gh(k,s,q),u={};u[p]={};var y=this.ed(h,u),z=g.ea(),A=Sd(),E=new kf(0,0,0,0),x,Q,N,L;for(N=q.a;N<=q.d;++N)for(L=q.b;L<=q.c;++L)x=h.Vb(p,N,L,d,f),Q=x.state,2==Q?u[p][jf(x.a)]=
x:4==Q||3==Q&&!z||(Q=k.gd(x.a,y,null,E,A),Q||(x=k.td(x.a,E,A),null===x||y(p+1,x)));var U;if(this.g!=h.c){for(U in this.b)z=this.b[+U],If(z.target);this.b={};this.g=h.c}A=Sa(rb(u),Number);db(A);var y={},Ca;N=0;for(L=A.length;N<L;++N){U=A[N];U in this.b?z=this.b[U]:(z=k.Nc(r,U),z=new Ln(k,z),y[U]=!0,this.b[U]=z);U=u[U];for(Ca in U){x=z;Q=U[Ca];var eb=n,R=Q.a,Ma=R[0],sb=R[1],$a=R[2],R=jf(R);if(!(R in x.c)){var Ma=x.d.pa(Ma),Ub=Q.Ta(x),nb=Ub.style;nb.maxWidth="none";var Mc=void 0,sc=void 0;0<eb?(Mc=Ef("DIV"),
sc=Mc.style,sc.overflow="hidden",sc.width=Ma+"px",sc.height=Ma+"px",nb.position="absolute",nb.left=-eb+"px",nb.top=-eb+"px",nb.width=Ma+2*eb+"px",nb.height=Ma+2*eb+"px",Mc.appendChild(Ub)):(nb.width=Ma+"px",nb.height=Ma+"px",Mc=Ub,sc=nb);sc.position="absolute";sc.left=(sb-x.b[1])*Ma+"px";sc.top=(x.b[2]-$a)*Ma+"px";null===x.a&&(x.a=document.createDocumentFragment());x.a.appendChild(Mc);x.c[R]=Q}}null!==z.a&&(z.target.appendChild(z.a),z.a=null)}n=Sa(rb(this.b),Number);db(n);N=Hd();Ca=0;for(A=n.length;Ca<
A;++Ca)if(U=n[Ca],z=this.b[U],U in u)if(x=z.g,L=z.e,lj(N,b.size[0]/2,b.size[1]/2,x/e.resolution,x/e.resolution,e.rotation,(L[0]-r[0])/x,(r[1]-L[1])/x),L=z,x=N,mj(x,L.f)||(Rf(L.target,x),Kd(L.f,x)),U in y){for(--U;0<=U;--U)if(U in this.b){L=this.b[U].target;L.parentNode&&L.parentNode.insertBefore(z.target,L.nextSibling);break}0>U&&Hf(this.target,z.target,0)}else{if(!b.viewHints[0]&&!b.viewHints[1]){Q=fh(z.d,s,z.b[0],E);U=[];x=L=void 0;for(x in z.c)L=z.c[x],Q.contains(L.a)||U.push(L);eb=Q=void 0;Q=
0;for(eb=U.length;Q<eb;++Q)L=U[Q],x=jf(L.a),If(L.Ta(z)),delete z.c[x]}}else If(z.target),delete this.b[U];c.opacity!=this.i&&(this.i=this.target.style.opacity=c.opacity);c.visible&&!this.d&&(Mg(this.target,!0),this.d=!0);vj(b.usedTiles,h,p,q);xj(b,h,k,d,f,s,p,g.r());sj(b,h);uj(b,h);return!0};
function Ln(b,c){this.target=Ef("DIV");this.target.style.position="absolute";this.target.style.width="100%";this.target.style.height="100%";this.d=b;this.b=c;this.e=je(eh(b,c));this.g=b.na(c[0]);this.c={};this.a=null;this.f=Jd()};function Mn(b){this.g=Nf();var c=this.g.canvas;c.style.maxWidth="none";c.style.position="absolute";In.call(this,b,c);this.d=!1;this.o=-1;this.q=NaN;this.i=Sd();this.b=this.k=null;this.r=Hd();this.p=Hd()}v(Mn,In);
Mn.prototype.n=function(b,c){var d=b.viewState,e=d.center,f=d.rotation,g=d.resolution,d=b.pixelRatio,h=b.size[0],k=b.size[1],n=h*d,p=k*d,e=lj(this.r,d*h/2,d*k/2,d/g,-d/g,-f,-e[0],-e[1]),g=this.g;g.canvas.width=n;g.canvas.height=p;h=lj(this.p,0,0,1/d,1/d,0,-(n-h)/2*d,-(p-k)/2*d);Rf(g.canvas,h);Nn(this,"precompose",b,e);h=this.b;null===h||h.la()||(g.globalAlpha=c.opacity,Em(h,g,d,e,f,b.skippedFeatureUids),Nn(this,"render",b,e));Nn(this,"postcompose",b,e)};
function Nn(b,c,d,e){var f=b.g;b=b.a;jd(b,c)&&(e=new Yl(f,d.pixelRatio,d.extent,e,d.viewState.rotation),b.dispatchEvent(new dl(c,b,e,null,d,f,null)),km(e))}Mn.prototype.Ua=function(b,c,d,e){if(null!==this.b){var f=this.a,g={};return this.b.b(b,c.viewState.resolution,c.viewState.rotation,c.skippedFeatureUids,function(b){var c=ma(b).toString();if(!(c in g))return g[c]=!0,d.call(e,b,f)})}};Mn.prototype.D=function(){pj(this)};
Mn.prototype.e=function(b){function c(b){var c;m(b.a)?c=b.a.call(b,k):m(d.r)&&(c=(0,d.r)(b,k));if(null!=c){if(null!=c){var e,f,g=!1;e=0;for(f=c.length;e<f;++e)g=dn(q,b,c[e],cn(k,n),this.D,this)||g;b=g}else b=!1;this.d=this.d||b}}var d=this.a,e=d.a();tj(b.attributions,e.f);uj(b,e);if(!this.d&&(!d.Ac&&b.viewHints[0]||b.viewHints[1]))return!0;var f=b.extent,g=b.viewState,h=g.projection,k=g.resolution,n=b.pixelRatio;b=d.c;var p=d.ea,g=d.get("renderOrder");m(g)||(g=bn);f=Wd(f,p*k);if(!this.d&&this.q==
k&&this.o==b&&this.k==g&&Zd(this.i,f))return!0;pc(this.b);this.b=null;this.d=!1;var q=new Am(.5*k/n,f,k,d.ea);e.Hb(f,k,h);if(null===g)e.Fb(f,k,c,this);else{var r=[];e.Fb(f,k,function(b){r.push(b)},this);db(r,g);Qa(r,c,this)}Bm(q);this.q=k;this.o=b;this.k=g;this.i=f;this.b=q;return!0};function On(b,c){Dj.call(this,0,c);this.c=null;this.c=Nf();var d=this.c.canvas;d.style.position="absolute";d.style.width="100%";d.style.height="100%";d.className="ol-unselectable";Hf(b,d,0);this.f=Hd();this.a=Ef("DIV");this.a.className="ol-unselectable";d=this.a.style;d.position="absolute";d.width="100%";d.height="100%";w(this.a,"touchstart",tc);Hf(b,this.a,0);this.d=!0}v(On,Dj);On.prototype.P=function(){If(this.a);On.T.P.call(this)};
On.prototype.ne=function(b){if(b instanceof H)b=new Jn(b);else if(b instanceof I)b=new Kn(b);else if(b instanceof J)b=new Mn(b);else return null;return b};
function Pn(b,c,d){var e=b.g;if(jd(e,c)){var f=d.extent,g=d.pixelRatio,h=d.viewState,k=h.resolution,n=h.rotation,p=b.c,q=p.canvas;lj(b.f,q.width/2,q.height/2,g/h.resolution,-g/h.resolution,-h.rotation,-h.center[0],-h.center[1]);h=new Yl(p,g,f,b.f,n);f=new Am(.5*k/g,f,k);e.dispatchEvent(new dl(c,e,h,f,d,p,null));Bm(f);f.la()||Em(f,p,g,b.f,n,{});km(h);b.b=f}}On.prototype.O=function(){return"dom"};
On.prototype.Yd=function(b){if(null===b)this.d&&(Mg(this.a,!1),this.d=!1);else{var c;c=function(b,c){Hf(this.a,b,c)};var d=this.g;if(jd(d,"precompose")||jd(d,"postcompose")){var d=this.c.canvas,e=b.pixelRatio;d.width=b.size[0]*e;d.height=b.size[1]*e}Pn(this,"precompose",b);var d=b.layerStatesArray,f,g,h,e=0;for(f=d.length;e<f;++e)h=d[e],g=h.layer,g=Gj(this,g),c.call(this,g.target,e),"ready"==h.yc?g.e(b,h)&&g.n(b,h):g.f();c=b.layerStates;for(var k in this.e)k in c||(g=this.e[k],If(g.target));this.d||
(Mg(this.a,!0),this.d=!0);Ej(b);Hj(this,b);b.postRenderFunctions.push(Fj);Pn(this,"postcompose",b)}};function Qn(b){this.a=b}function Rn(b){this.a=b}v(Rn,Qn);Rn.prototype.O=function(){return 35632};function Sn(b){this.a=b}v(Sn,Qn);Sn.prototype.O=function(){return 35633};function Tn(){this.a="precision mediump float;varying vec2 a;varying float b;uniform mat4 k;uniform float l;uniform sampler2D m;void main(void){vec4 texColor=texture2D(m,a);float alpha=texColor.a*b*l;if(alpha==0.0){discard;}gl_FragColor.a=alpha;gl_FragColor.rgb=(k*vec4(texColor.rgb,1.)).rgb;}"}v(Tn,Rn);da(Tn);
function Un(){this.a="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"}v(Un,Sn);da(Un);
function Vn(b,c){this.k=b.getUniformLocation(c,"k");this.n=b.getUniformLocation(c,"j");this.i=b.getUniformLocation(c,"i");this.e=b.getUniformLocation(c,"l");this.g=b.getUniformLocation(c,"h");this.a=b.getAttribLocation(c,"e");this.c=b.getAttribLocation(c,"f");this.d=b.getAttribLocation(c,"c");this.b=b.getAttribLocation(c,"g");this.f=b.getAttribLocation(c,"d")};function Wn(){this.a="precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}v(Wn,Rn);da(Wn);
function Xn(){this.a="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"}v(Xn,Sn);da(Xn);
function Yn(b,c){this.n=b.getUniformLocation(c,"j");this.i=b.getUniformLocation(c,"i");this.e=b.getUniformLocation(c,"k");this.g=b.getUniformLocation(c,"h");this.a=b.getAttribLocation(c,"e");this.c=b.getAttribLocation(c,"f");this.d=b.getAttribLocation(c,"c");this.b=b.getAttribLocation(c,"g");this.f=b.getAttribLocation(c,"d")};function Zn(b){this.a=m(b)?b:[];this.c=m(void 0)?void 0:35044};function $n(b,c){this.k=b;this.a=c;this.c={};this.e={};this.f={};this.n=this.i=this.d=this.g=null;(this.b=Wa(va,"OES_element_index_uint"))&&c.getExtension("OES_element_index_uint");w(this.k,"webglcontextlost",this.cl,!1,this);w(this.k,"webglcontextrestored",this.dl,!1,this)}
function ao(b,c,d){var e=b.a,f=d.a,g=ma(d);if(g in b.c)e.bindBuffer(c,b.c[g].buffer);else{var h=e.createBuffer();e.bindBuffer(c,h);var k;34962==c?k=new Float32Array(f):34963==c&&(k=b.b?new Uint32Array(f):new Uint16Array(f));e.bufferData(c,k,d.c);b.c[g]={b:d,buffer:h}}}function bo(b,c){var d=b.a,e=ma(c),f=b.c[e];d.isContextLost()||d.deleteBuffer(f.buffer);delete b.c[e]}l=$n.prototype;
l.P=function(){var b=this.a;b.isContextLost()||(mb(this.c,function(c){b.deleteBuffer(c.buffer)}),mb(this.f,function(c){b.deleteProgram(c)}),mb(this.e,function(c){b.deleteShader(c)}),b.deleteFramebuffer(this.d),b.deleteRenderbuffer(this.n),b.deleteTexture(this.i))};l.bl=function(){return this.a};
l.se=function(){if(null===this.d){var b=this.a,c=b.createFramebuffer();b.bindFramebuffer(b.FRAMEBUFFER,c);var d=co(b,1,1),e=b.createRenderbuffer();b.bindRenderbuffer(b.RENDERBUFFER,e);b.renderbufferStorage(b.RENDERBUFFER,b.DEPTH_COMPONENT16,1,1);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,d,0);b.framebufferRenderbuffer(b.FRAMEBUFFER,b.DEPTH_ATTACHMENT,b.RENDERBUFFER,e);b.bindTexture(b.TEXTURE_2D,null);b.bindRenderbuffer(b.RENDERBUFFER,null);b.bindFramebuffer(b.FRAMEBUFFER,
null);this.d=c;this.i=d;this.n=e}return this.d};function eo(b,c){var d=ma(c);if(d in b.e)return b.e[d];var e=b.a,f=e.createShader(c.O());e.shaderSource(f,c.a);e.compileShader(f);return b.e[d]=f}function fo(b,c,d){var e=ma(c)+"/"+ma(d);if(e in b.f)return b.f[e];var f=b.a,g=f.createProgram();f.attachShader(g,eo(b,c));f.attachShader(g,eo(b,d));f.linkProgram(g);return b.f[e]=g}l.cl=function(){xb(this.c);xb(this.e);xb(this.f);this.n=this.i=this.d=this.g=null};l.dl=function(){};
l.Rd=function(b){if(b==this.g)return!1;this.a.useProgram(b);this.g=b;return!0};function go(b,c,d){var e=b.createTexture();b.bindTexture(b.TEXTURE_2D,e);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR);m(c)&&b.texParameteri(3553,10242,c);m(d)&&b.texParameteri(3553,10243,d);return e}function co(b,c,d){var e=go(b,void 0,void 0);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,c,d,0,b.RGBA,b.UNSIGNED_BYTE,null);return e}
function ho(b,c){var d=go(b,33071,33071);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,c);return d};function io(b,c){this.r=this.p=void 0;this.Ea=new ug;this.i=ke(c);this.o=[];this.e=[];this.N=void 0;this.f=[];this.d=[];this.U=this.S=void 0;this.c=[];this.H=this.D=this.n=null;this.ca=void 0;this.ka=Jd();this.va=Jd();this.oa=this.da=void 0;this.Fa=Jd();this.Da=this.fa=this.qa=void 0;this.ia=[];this.g=[];this.a=[];this.q=null;this.b=[];this.k=[];this.ea=void 0}
function jo(b,c){var d=b.q,e=b.n,f=b.ia,g=b.g,h=c.a;return function(){if(!h.isContextLost()){var b,n;b=0;for(n=f.length;b<n;++b)h.deleteTexture(f[b]);b=0;for(n=g.length;b<n;++b)h.deleteTexture(g[b])}bo(c,d);bo(c,e)}}
function ko(b,c,d,e){var f=b.p,g=b.r,h=b.N,k=b.S,n=b.U,p=b.ca,q=b.da,r=b.oa,s=b.qa?1:0,u=b.fa,y=b.Da,z=b.ea,A=Math.cos(u),u=Math.sin(u),E=b.c.length,x=b.a.length,Q,N,L,U,Ca,eb;for(Q=0;Q<d;Q+=e)Ca=c[Q]-b.i[0],eb=c[Q+1]-b.i[1],N=x/8,L=-y*f,U=-y*(h-g),b.a[x++]=Ca,b.a[x++]=eb,b.a[x++]=L*A-U*u,b.a[x++]=L*u+U*A,b.a[x++]=q/n,b.a[x++]=(r+h)/k,b.a[x++]=p,b.a[x++]=s,L=y*(z-f),U=-y*(h-g),b.a[x++]=Ca,b.a[x++]=eb,b.a[x++]=L*A-U*u,b.a[x++]=L*u+U*A,b.a[x++]=(q+z)/n,b.a[x++]=(r+h)/k,b.a[x++]=p,b.a[x++]=s,L=y*(z-
f),U=y*g,b.a[x++]=Ca,b.a[x++]=eb,b.a[x++]=L*A-U*u,b.a[x++]=L*u+U*A,b.a[x++]=(q+z)/n,b.a[x++]=r/k,b.a[x++]=p,b.a[x++]=s,L=-y*f,U=y*g,b.a[x++]=Ca,b.a[x++]=eb,b.a[x++]=L*A-U*u,b.a[x++]=L*u+U*A,b.a[x++]=q/n,b.a[x++]=r/k,b.a[x++]=p,b.a[x++]=s,b.c[E++]=N,b.c[E++]=N+1,b.c[E++]=N+2,b.c[E++]=N,b.c[E++]=N+2,b.c[E++]=N+3}l=io.prototype;l.tb=function(b,c){this.b.push(this.c.length);this.k.push(c);var d=b.j;ko(this,d,d.length,b.B)};
l.ub=function(b,c){this.b.push(this.c.length);this.k.push(c);var d=b.j;ko(this,d,d.length,b.B)};l.Kb=function(b){var c=b.a;this.o.push(this.c.length);this.e.push(this.c.length);this.q=new Zn(this.a);ao(b,34962,this.q);this.n=new Zn(this.c);ao(b,34963,this.n);b={};lo(this.ia,this.f,b,c);lo(this.g,this.d,b,c);this.N=this.r=this.p=void 0;this.d=this.f=null;this.U=this.S=void 0;this.c=null;this.Da=this.fa=this.qa=this.oa=this.da=this.ca=void 0;this.a=null;this.ea=void 0};
function lo(b,c,d,e){var f,g,h,k=c.length;for(h=0;h<k;++h)f=c[h],g=ma(f).toString(),g in d?f=d[g]:(f=ho(e,f),d[g]=f),b[h]=f}
l.bc=function(b,c,d,e,f,g,h,k,n,p,q,r,s,u,y){g=b.a;ao(b,34962,this.q);ao(b,34963,this.n);var z=k||1!=n||p||1!=q,A,E;z?(A=Tn.Pa(),E=Un.Pa()):(A=Wn.Pa(),E=Xn.Pa());E=fo(b,A,E);z?null===this.D?this.D=A=new Vn(g,E):A=this.D:null===this.H?this.H=A=new Yn(g,E):A=this.H;b.Rd(E);g.enableVertexAttribArray(A.d);g.vertexAttribPointer(A.d,2,5126,!1,32,0);g.enableVertexAttribArray(A.a);g.vertexAttribPointer(A.a,2,5126,!1,32,8);g.enableVertexAttribArray(A.f);g.vertexAttribPointer(A.f,2,5126,!1,32,16);g.enableVertexAttribArray(A.c);
g.vertexAttribPointer(A.c,1,5126,!1,32,24);g.enableVertexAttribArray(A.b);g.vertexAttribPointer(A.b,1,5126,!1,32,28);E=this.Fa;lj(E,0,0,2/(d*f[0]),2/(d*f[1]),-e,-(c[0]-this.i[0]),-(c[1]-this.i[1]));c=this.va;d=2/f[0];f=2/f[1];Ld(c);c[0]=d;c[5]=f;c[10]=1;c[15]=1;f=this.ka;Ld(f);0!==e&&Qd(f,-e);g.uniformMatrix4fv(A.g,!1,E);g.uniformMatrix4fv(A.i,!1,c);g.uniformMatrix4fv(A.n,!1,f);g.uniform1f(A.e,h);z&&g.uniformMatrix4fv(A.k,!1,vg(this.Ea,k,n,p,q));var x;if(m(s)){if(u)a:{e=b.b?5125:5123;b=b.b?4:2;p=
this.b.length-1;for(h=this.g.length-1;0<=h;--h)for(g.bindTexture(3553,this.g[h]),k=0<h?this.e[h-1]:0,q=this.e[h];0<=p&&this.b[p]>=k;){n=this.b[p];u=this.k[p];x=ma(u).toString();if(!m(r[x])&&(!m(y)||pe(y,u.R().J()))&&(g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT),g.drawElements(4,q-n,e,n*b),q=s(u))){r=q;break a}q=n;p--}r=void 0}else g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT),mo(this,g,b,r,this.g,this.e),r=(r=s(null))?r:void 0;x=r}else mo(this,g,b,r,this.ia,this.o);g.disableVertexAttribArray(A.d);
g.disableVertexAttribArray(A.a);g.disableVertexAttribArray(A.f);g.disableVertexAttribArray(A.c);g.disableVertexAttribArray(A.b);return x};
function mo(b,c,d,e,f,g){var h=d.b?5125:5123;d=d.b?4:2;if(wb(e)){var k;b=0;e=f.length;for(k=0;b<e;++b){c.bindTexture(3553,f[b]);var n=g[b];c.drawElements(4,n-k,h,k*d);k=n}}else{k=0;var p,n=0;for(p=f.length;n<p;++n){c.bindTexture(3553,f[n]);for(var q=0<n?g[n-1]:0,r=g[n],s=q;k<b.b.length&&b.b[k]<=r;){var u=ma(b.k[k]).toString();m(e[u])?(s!==q&&c.drawElements(4,q-s,h,s*d),q=s=k===b.b.length-1?r:b.b[k+1]):q=k===b.b.length-1?r:b.b[k+1];k++}s!==q&&c.drawElements(4,q-s,h,s*d)}}}
l.ib=function(b){var c=b.wb(),d=b.Bb(1),e=b.kd(),f=b.Kd(1),g=b.o,h=b.Cb(),k=b.p,n=b.i,p=b.gb();b=b.k;var q;0===this.f.length?this.f.push(d):(q=this.f[this.f.length-1],ma(q)!=ma(d)&&(this.o.push(this.c.length),this.f.push(d)));0===this.d.length?this.d.push(f):(q=this.d[this.d.length-1],ma(q)!=ma(f)&&(this.e.push(this.c.length),this.d.push(f)));this.p=c[0];this.r=c[1];this.N=p[1];this.S=e[1];this.U=e[0];this.ca=g;this.da=h[0];this.oa=h[1];this.fa=n;this.qa=k;this.Da=b;this.ea=p[0]};
function no(b,c,d){this.f=c;this.e=b;this.d=d;this.c={}}function oo(b,c){var d=[],e;for(e in b.c)d.push(jo(b.c[e],c));return fd.apply(null,d)}function po(b,c){for(var d in b.c)b.c[d].Kb(c)}no.prototype.a=function(b,c){var d=this.c[c];m(d)||(d=new qo[c](this.e,this.f),this.c[c]=d);return d};no.prototype.la=function(){return wb(this.c)};function ro(b,c,d,e,f,g,h,k,n,p,q,r,s,u,y){var z=so,A,E;for(A=lm.length-1;0<=A;--A)if(E=b.c[lm[A]],m(E)&&(E=E.bc(c,d,e,f,z,g,h,k,n,p,q,r,s,u,y)))return E}
no.prototype.b=function(b,c,d,e,f,g,h,k,n,p,q,r,s,u){var y=c.a;y.bindFramebuffer(y.FRAMEBUFFER,c.se());var z;m(this.d)&&(z=Wd(be(b),e*this.d));return ro(this,c,b,e,f,h,k,n,p,q,r,s,function(b){var c=new Uint8Array(4);y.readPixels(0,0,1,1,y.RGBA,y.UNSIGNED_BYTE,c);if(0<c[3]&&(b=u(b)))return b},!0,z)};
function to(b,c,d,e,f,g,h,k,n,p,q,r){var s=d.a;s.bindFramebuffer(s.FRAMEBUFFER,d.se());b=ro(b,d,c,e,f,g,h,k,n,p,q,r,function(){var b=new Uint8Array(4);s.readPixels(0,0,1,1,s.RGBA,s.UNSIGNED_BYTE,b);return 0<b[3]},!1);return m(b)}var qo={Image:io},so=[1,1];function uo(b,c,d,e,f,g,h){this.b=b;this.f=c;this.a=g;this.e=h;this.i=f;this.n=e;this.g=d;this.d=null;this.c={}}l=uo.prototype;l.kc=function(b,c){var d=b.toString(),e=this.c[d];m(e)?e.push(c):this.c[d]=[c]};l.lc=function(){};l.oe=function(b,c){var d=(0,c.d)(b);if(null!=d&&pe(this.a,d.J())){var e=c.a;m(e)||(e=0);this.kc(e,function(b){b.Ba(c.f,c.b);b.ib(c.e);b.Ca(c.c);var e=vo[d.O()];e&&e.call(b,d,null)})}};
l.fd=function(b,c){var d=b.d,e,f;e=0;for(f=d.length;e<f;++e){var g=d[e],h=vo[g.O()];h&&h.call(this,g,c)}};l.ub=function(b,c){var d=this.b,e=(new no(1,this.a)).a(0,"Image");e.ib(this.d);e.ub(b,c);e.Kb(d);e.bc(this.b,this.f,this.g,this.n,this.i,this.a,this.e,1,0,1,0,1,{});jo(e,d)()};l.Eb=function(){};l.mc=function(){};l.tb=function(b,c){var d=this.b,e=(new no(1,this.a)).a(0,"Image");e.ib(this.d);e.tb(b,c);e.Kb(d);e.bc(this.b,this.f,this.g,this.n,this.i,this.a,this.e,1,0,1,0,1,{});jo(e,d)()};l.nc=function(){};
l.Rb=function(){};l.vb=function(){};l.Ba=function(){};l.ib=function(b){this.d=b};l.Ca=function(){};var vo={Point:uo.prototype.ub,MultiPoint:uo.prototype.tb,GeometryCollection:uo.prototype.fd};function wo(){this.a="precision mediump float;varying vec2 a;uniform mat4 f;uniform float g;uniform sampler2D h;void main(void){vec4 texColor=texture2D(h,a);gl_FragColor.rgb=(f*vec4(texColor.rgb,1.)).rgb;gl_FragColor.a=texColor.a*g;}"}v(wo,Rn);da(wo);function xo(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}v(xo,Sn);da(xo);
function yo(b,c){this.g=b.getUniformLocation(c,"f");this.b=b.getUniformLocation(c,"g");this.d=b.getUniformLocation(c,"e");this.e=b.getUniformLocation(c,"d");this.f=b.getUniformLocation(c,"h");this.a=b.getAttribLocation(c,"b");this.c=b.getAttribLocation(c,"c")};function zo(){this.a="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"}v(zo,Rn);da(zo);function Ao(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}v(Ao,Sn);da(Ao);
function Bo(b,c){this.b=b.getUniformLocation(c,"f");this.d=b.getUniformLocation(c,"e");this.e=b.getUniformLocation(c,"d");this.f=b.getUniformLocation(c,"g");this.a=b.getAttribLocation(c,"b");this.c=b.getAttribLocation(c,"c")};function Co(b,c){oj.call(this,c);this.b=b;this.N=new Zn([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.f=this.Wa=null;this.e=void 0;this.i=Hd();this.o=Jd();this.S=new ug;this.q=this.k=null}v(Co,oj);
function Do(b,c,d){var e=b.b.f;if(m(b.e)&&b.e==d)e.bindFramebuffer(36160,b.f);else{c.postRenderFunctions.push(sa(function(b,c,d){b.isContextLost()||(b.deleteFramebuffer(c),b.deleteTexture(d))},e,b.f,b.Wa));c=co(e,d,d);var f=e.createFramebuffer();e.bindFramebuffer(36160,f);e.framebufferTexture2D(36160,36064,3553,c,0);b.Wa=c;b.f=f;b.e=d}}
Co.prototype.Mf=function(b,c,d){Eo(this,"precompose",d,b);ao(d,34962,this.N);var e=d.a,f=c.brightness||1!=c.contrast||c.hue||1!=c.saturation,g,h;f?(g=wo.Pa(),h=xo.Pa()):(g=zo.Pa(),h=Ao.Pa());g=fo(d,g,h);f?null===this.k?this.k=h=new yo(e,g):h=this.k:null===this.q?this.q=h=new Bo(e,g):h=this.q;d.Rd(g)&&(e.enableVertexAttribArray(h.a),e.vertexAttribPointer(h.a,2,5126,!1,16,0),e.enableVertexAttribArray(h.c),e.vertexAttribPointer(h.c,2,5126,!1,16,8),e.uniform1i(h.f,0));e.uniformMatrix4fv(h.e,!1,this.i);
e.uniformMatrix4fv(h.d,!1,this.o);f&&e.uniformMatrix4fv(h.g,!1,vg(this.S,c.brightness,c.contrast,c.hue,c.saturation));e.uniform1f(h.b,c.opacity);e.bindTexture(3553,this.Wa);e.drawArrays(5,0,4);Eo(this,"postcompose",d,b)};function Eo(b,c,d,e){b=b.a;if(jd(b,c)){var f=e.viewState;b.dispatchEvent(new dl(c,b,new uo(d,f.center,f.resolution,f.rotation,e.size,e.extent,e.pixelRatio),null,e,null,d))}}Co.prototype.Ae=function(){this.f=this.Wa=null;this.e=void 0};function Fo(b,c){Co.call(this,b,c);this.n=this.g=this.d=null}v(Fo,Co);function Go(b,c){var d=c.a();return ho(b.b.f,d)}Fo.prototype.Ua=function(b,c,d,e){var f=this.a;return f.a().Jd(b,c.viewState.resolution,c.viewState.rotation,c.skippedFeatureUids,function(b){return d.call(e,b,f)})};
Fo.prototype.Be=function(b,c){var d=this.b.f,e=b.viewState,f=e.center,g=e.resolution,h=e.rotation,k=this.d,n=this.Wa,p=this.a.a(),q=b.viewHints,r=b.extent;m(c.extent)&&(r=oe(r,c.extent));q[0]||q[1]||re(r)||(e=e.projection,q=p.e,null===q||(e=q),r=p.sc(r,g,b.pixelRatio,e),null!==r&&rj(this,r)&&(k=r,n=Go(this,r),null===this.Wa||b.postRenderFunctions.push(sa(function(b,c){b.isContextLost()||b.deleteTexture(c)},d,this.Wa))));null!==k&&(d=this.b.d.k,Ho(this,d.width,d.height,f,g,h,k.J()),this.n=null,f=this.i,
Ld(f),Pd(f,1,-1),Od(f,0,-1),this.d=k,this.Wa=n,tj(b.attributions,k.e),uj(b,p));return!0};function Ho(b,c,d,e,f,g,h){c*=f;d*=f;b=b.o;Ld(b);Pd(b,2/c,2/d);Qd(b,-g);Od(b,h[0]-e[0],h[1]-e[1]);Pd(b,(h[2]-h[0])/2,(h[3]-h[1])/2);Od(b,1,1)}Fo.prototype.Hd=function(b,c){var d=this.Ua(b,c,bd,this);return m(d)};
Fo.prototype.cc=function(b,c,d,e){if(null!==this.d&&!fa(this.d.a()))if(this.a.a()instanceof Bn){if(b=b.slice(),nj(c.pixelToCoordinateMatrix,b,b),this.Ua(b,c,bd,this))return d.call(e,this.a)}else{var f=[this.d.a().width,this.d.a().height];if(null===this.n){var g=c.size;c=Hd();Ld(c);Od(c,-1,-1);Pd(c,2/g[0],2/g[1]);Od(c,0,g[1]);Pd(c,1,-1);g=Hd();Nd(this.o,g);var h=Hd();Ld(h);Od(h,0,f[1]);Pd(h,1,-1);Pd(h,f[0]/2,f[1]/2);Od(h,1,1);var k=Hd();Md(h,g,k);Md(k,c,k);this.n=k}c=[0,0];nj(this.n,b,c);if(!(0>c[0]||
c[0]>f[0]||0>c[1]||c[1]>f[1])&&(null===this.g&&(this.g=Nf(1,1)),this.g.clearRect(0,0,1,1),this.g.drawImage(this.d.a(),c[0],c[1],1,1,0,0,1,1),0<this.g.getImageData(0,0,1,1).data[3]))return d.call(e,this.a)}};function Io(){this.a="precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"}v(Io,Rn);da(Io);function Jo(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"}v(Jo,Sn);da(Jo);function Ko(b,c){this.b=b.getUniformLocation(c,"e");this.d=b.getUniformLocation(c,"d");this.a=b.getAttribLocation(c,"b");this.c=b.getAttribLocation(c,"c")};function Lo(b,c){Co.call(this,b,c);this.D=Io.Pa();this.H=Jo.Pa();this.d=null;this.r=new Zn([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.p=this.g=null;this.n=-1}v(Lo,Co);l=Lo.prototype;l.P=function(){bo(this.b.d,this.r);Lo.T.P.call(this)};l.ed=function(b,c){var d=this.b;return function(e,f){return qh(b,e,f,function(b){var f=Wg(d.c,b.qb());f&&(c[e]||(c[e]={}),c[e][b.a.toString()]=b);return f})}};l.Ae=function(){Lo.T.Ae.call(this);this.d=null};
l.Be=function(b,c,d){var e=this.b,f=d.a,g=b.viewState,h=g.projection,k=this.a,n=k.a(),p=rh(n,h),q=jh(p,g.resolution),r=p.na(q),s=n.Xb(q,b.pixelRatio,h),u=s/p.pa(q),y=r/u,z=n.jd(),A=g.center,E;r==g.resolution?(A=wj(A,r,b.size),E=me(A,r,g.rotation,b.size)):E=b.extent;r=gh(p,E,r);if(null!==this.g&&nf(this.g,r)&&this.n==n.c)y=this.p;else{var x=[of(r),r.c-r.b+1],x=Math.max(x[0]*s,x[1]*s),Q=Math.pow(2,Math.ceil(Math.log(x)/Math.LN2)),x=y*Q,N=p.Lb(q),L=N[0]+r.a*s*y,y=N[1]+r.b*s*y,y=[L,y,L+x,y+x];Do(this,
b,Q);f.viewport(0,0,Q,Q);f.clearColor(0,0,0,0);f.clear(16384);f.disable(3042);Q=fo(d,this.D,this.H);d.Rd(Q);null===this.d&&(this.d=new Ko(f,Q));ao(d,34962,this.r);f.enableVertexAttribArray(this.d.a);f.vertexAttribPointer(this.d.a,2,5126,!1,16,0);f.enableVertexAttribArray(this.d.c);f.vertexAttribPointer(this.d.c,2,5126,!1,16,8);f.uniform1i(this.d.b,0);d={};d[q]={};var U=this.ed(n,d),Ca=k.ea(),Q=!0,L=Sd(),eb=new kf(0,0,0,0),R,Ma,sb;for(Ma=r.a;Ma<=r.d;++Ma)for(sb=r.b;sb<=r.c;++sb){N=n.Vb(q,Ma,sb,u,h);
if(m(c.extent)&&(R=eh(p,N.a,L),!pe(R,c.extent)))continue;R=N.state;if(2==R){if(Wg(e.c,N.qb())){d[q][jf(N.a)]=N;continue}}else if(4==R||3==R&&!Ca)continue;Q=!1;R=p.gd(N.a,U,null,eb,L);R||(N=p.td(N.a,eb,L),null===N||U(q+1,N))}c=Sa(rb(d),Number);db(c);for(var U=new Float32Array(4),$a,Ub,nb,Ca=0,eb=c.length;Ca<eb;++Ca)for($a in Ub=d[c[Ca]],Ub)N=Ub[$a],R=eh(p,N.a,L),Ma=2*(R[2]-R[0])/x,sb=2*(R[3]-R[1])/x,nb=2*(R[0]-y[0])/x-1,R=2*(R[1]-y[1])/x-1,Gd(U,Ma,sb,nb,R),f.uniform4fv(this.d.d,U),Mo(e,N,s,z*u),f.drawArrays(5,
0,4);Q?(this.g=r,this.p=y,this.n=n.c):(this.p=this.g=null,this.n=-1,b.animate=!0)}vj(b.usedTiles,n,q,r);var Mc=e.i;xj(b,n,p,u,h,E,q,k.r(),function(b){var c;(c=2!=b.state||Wg(e.c,b.qb()))||(c=b.qb()in Mc.b);c||yj(Mc,[b,ih(p,b.a),p.na(b.a[0]),s,z*u])},this);sj(b,n);uj(b,n);f=this.i;Ld(f);Od(f,(A[0]-y[0])/(y[2]-y[0]),(A[1]-y[1])/(y[3]-y[1]));0!==g.rotation&&Qd(f,g.rotation);Pd(f,b.size[0]*g.resolution/(y[2]-y[0]),b.size[1]*g.resolution/(y[3]-y[1]));Od(f,-.5,-.5);return!0};
l.cc=function(b,c,d,e){if(null!==this.f){var f=[0,0];nj(this.i,[b[0]/c.size[0],(c.size[1]-b[1])/c.size[1]],f);b=[f[0]*this.e,f[1]*this.e];c=this.b.d.a;c.bindFramebuffer(c.FRAMEBUFFER,this.f);f=new Uint8Array(4);c.readPixels(b[0],b[1],1,1,c.RGBA,c.UNSIGNED_BYTE,f);if(0<f[3])return d.call(e,this.a)}};function No(b,c){Co.call(this,b,c);this.n=!1;this.H=-1;this.D=NaN;this.p=Sd();this.g=this.d=this.r=null}v(No,Co);l=No.prototype;l.Mf=function(b,c,d){this.g=c;var e=b.viewState,f=this.d;if(null!==f&&!f.la()){var g=e.center,h=e.resolution,e=e.rotation,k=b.size,n=b.pixelRatio,p=c.opacity,q=c.brightness,r=c.contrast,s=c.hue;c=c.saturation;b=b.skippedFeatureUids;var u,y,z;u=0;for(y=lm.length;u<y;++u)z=f.c[lm[u]],m(z)&&z.bc(d,g,h,e,k,n,p,q,r,s,c,b,void 0,!1)}};
l.P=function(){var b=this.d;null!==b&&(oo(b,this.b.d)(),this.d=null);No.T.P.call(this)};l.Ua=function(b,c,d,e){if(null!==this.d&&null!==this.g){var f=c.viewState,g=this.a,h=this.g,k={};return this.d.b(b,this.b.d,f.center,f.resolution,f.rotation,c.size,c.pixelRatio,h.opacity,h.brightness,h.contrast,h.hue,h.saturation,c.skippedFeatureUids,function(b){var c=ma(b).toString();if(!(c in k))return k[c]=!0,d.call(e,b,g)})}};
l.Hd=function(b,c){if(null===this.d||null===this.g)return!1;var d=c.viewState,e=this.g;return to(this.d,b,this.b.d,d.resolution,d.rotation,c.pixelRatio,e.opacity,e.brightness,e.contrast,e.hue,e.saturation,c.skippedFeatureUids)};l.cc=function(b,c,d,e){b=b.slice();nj(c.pixelToCoordinateMatrix,b,b);if(this.Hd(b,c))return d.call(e,this.a)};l.Xj=function(){pj(this)};
l.Be=function(b,c,d){function e(b){var c;m(b.a)?c=b.a.call(b,n):m(f.r)&&(c=(0,f.r)(b,n));if(null!=c){if(null!=c){var d,e,g=!1;d=0;for(e=c.length;d<e;++d)g=dn(s,b,c[d],cn(n,p),this.Xj,this)||g;b=g}else b=!1;this.n=this.n||b}}var f=this.a;c=f.a();tj(b.attributions,c.f);uj(b,c);if(!this.n&&(!f.Ac&&b.viewHints[0]||b.viewHints[1]))return!0;var g=b.extent,h=b.viewState,k=h.projection,n=h.resolution,p=b.pixelRatio,h=f.c,q=f.ea,r=f.get("renderOrder");m(r)||(r=bn);g=Wd(g,q*n);if(!this.n&&this.D==n&&this.H==
h&&this.r==r&&Zd(this.p,g))return!0;null===this.d||b.postRenderFunctions.push(oo(this.d,d));this.n=!1;var s=new no(.5*n/p,g,f.ea);c.Hb(g,n,k);if(null===r)c.Fb(g,n,e,this);else{var u=[];c.Fb(g,n,function(b){u.push(b)},this);db(u,r);Qa(u,e,this)}po(s,d);this.D=n;this.H=h;this.r=r;this.p=g;this.d=s;return!0};function Oo(b,c){Dj.call(this,0,c);this.a=Ef("CANVAS");this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";Hf(b,this.a,0);this.p=0;this.r=Nf();this.k=!0;this.f=Tf(this.a,{antialias:!0,depth:!1,uh:!0,preserveDrawingBuffer:!1,stencil:!0});this.d=new $n(this.a,this.f);w(this.a,"webglcontextlost",this.Vj,!1,this);w(this.a,"webglcontextrestored",this.Wj,!1,this);this.c=new Vg;this.o=null;this.i=new Ij(ra(function(b){var c=b[1];b=b[2];var f=c[0]-this.o[0],c=c[1]-this.o[1];
return 65536*Math.log(b)+Math.sqrt(f*f+c*c)/b},this),function(b){return b[0].qb()});this.D=ra(function(){if(!this.i.la()){Mj(this.i);var b=Jj(this.i);Mo(this,b[0],b[3],b[4])}},this);this.n=0;Po(this)}v(Oo,Dj);
function Mo(b,c,d,e){var f=b.f,g=c.qb();if(Wg(b.c,g))b=b.c.get(g),f.bindTexture(3553,b.Wa),9729!=b.zf&&(f.texParameteri(3553,10240,9729),b.zf=9729),9729!=b.Af&&(f.texParameteri(3553,10240,9729),b.Af=9729);else{var h=f.createTexture();f.bindTexture(3553,h);if(0<e){var k=b.r.canvas,n=b.r;b.p!=d?(k.width=d,k.height=d,b.p=d):n.clearRect(0,0,d,d);n.drawImage(c.Ta(),e,e,d,d,0,0,d,d);f.texImage2D(3553,0,6408,6408,5121,k)}else f.texImage2D(3553,0,6408,6408,5121,c.Ta());f.texParameteri(3553,10240,9729);f.texParameteri(3553,
10241,9729);f.texParameteri(3553,10242,33071);f.texParameteri(3553,10243,33071);b.c.set(g,{Wa:h,zf:9729,Af:9729})}}l=Oo.prototype;l.ne=function(b){return b instanceof H?new Fo(this,b):b instanceof I?new Lo(this,b):b instanceof J?new No(this,b):null};
function Qo(b,c,d){var e=b.g;if(jd(e,c)){var f=b.d,g=d.extent,h=d.size,k=d.viewState,n=d.pixelRatio,p=k.resolution,q=k.center,r=k.rotation,k=new uo(f,q,p,r,h,g,n),g=new no(.5*p/n,g);e.dispatchEvent(new dl(c,e,k,g,d,null,f));po(g,f);if(!g.la()){var s=Ro;c=s.opacity;d=s.brightness;var e=s.contrast,u=s.hue,s=s.saturation,y={},z,A,E;z=0;for(A=lm.length;z<A;++z)E=g.c[lm[z]],m(E)&&E.bc(f,q,p,r,h,n,c,d,e,u,s,y,void 0,!1)}oo(g,f)();f=Sa(rb(k.c),Number);db(f);h=0;for(n=f.length;h<n;++h)for(p=k.c[f[h].toString()],
q=0,r=p.length;q<r;++q)p[q](k);b.b=g}}l.P=function(){var b=this.f;b.isContextLost()||this.c.forEach(function(c){null===c||b.deleteTexture(c.Wa)});pc(this.d);Oo.T.P.call(this)};l.rh=function(b,c){for(var d=this.f,e;1024<this.c.Tb()-this.n;){e=this.c.a.hc;if(null===e)if(+this.c.a.Cd==c.index)break;else--this.n;else d.deleteTexture(e.Wa);this.c.pop()}};l.O=function(){return"webgl"};l.Vj=function(b){b.preventDefault();this.c.clear();this.n=0;mb(this.e,function(b){b.Ae()})};l.Wj=function(){Po(this);this.g.render()};
function Po(b){b=b.f;b.activeTexture(33984);b.blendFuncSeparate(770,771,1,771);b.disable(2884);b.disable(2929);b.disable(3089);b.disable(2960)}
l.Yd=function(b){var c=this.d,d=this.f;if(d.isContextLost())return!1;if(null===b)return this.k&&(Mg(this.a,!1),this.k=!1),!1;this.o=b.focus;this.c.set((-b.index).toString(),null);++this.n;var e=[],f=b.layerStatesArray,g=b.viewState.resolution,h,k,n,p;h=0;for(k=f.length;h<k;++h)p=f[h],jj(p,g)&&"ready"==p.yc&&(n=Gj(this,p.layer),n.Be(b,p,c)&&e.push(p));f=b.size[0]*b.pixelRatio;g=b.size[1]*b.pixelRatio;if(this.a.width!=f||this.a.height!=g)this.a.width=f,this.a.height=g;d.bindFramebuffer(36160,null);
d.clearColor(0,0,0,0);d.clear(16384);d.enable(3042);d.viewport(0,0,this.a.width,this.a.height);Qo(this,"precompose",b);h=0;for(k=e.length;h<k;++h)p=e[h],n=Gj(this,p.layer),n.Mf(b,p,c);this.k||(Mg(this.a,!0),this.k=!0);Ej(b);1024<this.c.Tb()-this.n&&b.postRenderFunctions.push(ra(this.rh,this));this.i.la()||(b.postRenderFunctions.push(this.D),b.animate=!0);Qo(this,"postcompose",b);Hj(this,b);b.postRenderFunctions.push(Fj)};
l.ye=function(b,c,d,e,f,g){var h;if(this.f.isContextLost())return!1;var k=this.d,n=c.viewState;if(null!==this.b){var p={},q=Ro;if(h=this.b.b(b,k,n.center,n.resolution,n.rotation,c.size,c.pixelRatio,q.opacity,q.brightness,q.contrast,q.hue,q.saturation,{},function(b){var c=ma(b).toString();if(!(c in p))return p[c]=!0,d.call(e,b,null)}))return h}k=c.layerStatesArray;for(q=k.length-1;0<=q;--q){h=k[q];var r=h.layer;if(jj(h,n.resolution)&&f.call(g,r)&&(h=Gj(this,r).Ua(b,c,d,e)))return h}};
l.Lf=function(b,c,d,e){var f=!1;if(this.f.isContextLost())return!1;var g=this.d,h=c.viewState;if(null!==this.b&&(f=Ro,f=to(this.b,b,g,h.resolution,h.rotation,c.pixelRatio,f.opacity,f.brightness,f.contrast,f.hue,f.saturation,{})))return!0;var g=c.layerStatesArray,k;for(k=g.length-1;0<=k;--k){var n=g[k],p=n.layer;if(jj(n,h.resolution)&&d.call(e,p)&&(f=Gj(this,p).Hd(b,c)))return!0}return f};
l.Kf=function(b,c,d,e,f){if(this.f.isContextLost())return!1;var g=this.d,h=c.viewState,k;if(null!==this.b){var n=Ro;k=this.g.sa(b);if(to(this.b,k,g,h.resolution,h.rotation,c.pixelRatio,n.opacity,n.brightness,n.contrast,n.hue,n.saturation,{})&&(k=d.call(e,null)))return k}g=c.layerStatesArray;for(n=g.length-1;0<=n;--n){k=g[n];var p=k.layer;if(jj(k,h.resolution)&&f.call(e,p)&&(k=Gj(this,p).cc(b,c,d,e)))return k}};var Ro={opacity:1,brightness:0,contrast:1,hue:0,saturation:1};var So=["canvas","webgl","dom"];
function K(b){qd.call(this);var c=To(b);this.xc=m(b.loadTilesWhileAnimating)?b.loadTilesWhileAnimating:!1;this.yc=m(b.loadTilesWhileInteracting)?b.loadTilesWhileInteracting:!1;this.Ac=m(b.pixelRatio)?b.pixelRatio:Vf;this.zc=c.logos;this.r=new Ih(this.Rl,void 0,this);oc(this,this.r);this.vc=Hd();this.ad=Hd();this.wc=0;this.d=null;this.Ea=Sd();this.o=this.U=null;this.b=Bf("DIV","ol-viewport");this.b.style.position="relative";this.b.style.overflow="hidden";this.b.style.width="100%";this.b.style.height=
"100%";this.b.style.msTouchAction="none";bg&&(this.b.className="ol-touch");this.ka=Bf("DIV","ol-overlaycontainer");this.b.appendChild(this.ka);this.H=Bf("DIV","ol-overlaycontainer-stopevent");w(this.H,["click","dblclick","mousedown","touchstart","MSPointerDown",ej,Hb?"DOMMouseScroll":"mousewheel"],rc);this.b.appendChild(this.H);b=new Xi(this);w(b,qb(hj),this.tf,!1,this);oc(this,b);this.fa=c.keyboardEventTarget;this.D=new ci;w(this.D,"key",this.rf,!1,this);oc(this,this.D);b=new ki(this.b);w(b,"mousewheel",
this.rf,!1,this);oc(this,b);this.i=c.controls;this.g=c.interactions;this.k=c.overlays;this.p=new c.Tl(this.b,this);oc(this,this.p);this.jc=new Xh;oc(this,this.jc);w(this.jc,"resize",this.q,!1,this);this.ca=null;this.N=[];this.va=[];this.kb=new Nj(ra(this.fi,this),ra(this.zj,this));this.da={};w(this,ud("layergroup"),this.yi,!1,this);w(this,ud("view"),this.Aj,!1,this);w(this,ud("size"),this.Oi,!1,this);w(this,ud("target"),this.Pi,!1,this);this.C(c.sm);this.i.forEach(function(b){b.setMap(this)},this);
w(this.i,"add",function(b){b.element.setMap(this)},!1,this);w(this.i,"remove",function(b){b.element.setMap(null)},!1,this);this.g.forEach(function(b){b.setMap(this)},this);w(this.g,"add",function(b){b.element.setMap(this)},!1,this);w(this.g,"remove",function(b){b.element.setMap(null)},!1,this);this.k.forEach(function(b){b.setMap(this)},this);w(this.k,"add",function(b){b.element.setMap(this)},!1,this);w(this.k,"remove",function(b){b.element.setMap(null)},!1,this)}v(K,qd);l=K.prototype;l.fh=function(b){this.i.push(b)};
l.gh=function(b){this.g.push(b)};l.af=function(b){this.Ub().ac().push(b)};l.bf=function(b){this.k.push(b)};l.La=function(b){this.render();Array.prototype.push.apply(this.N,arguments)};l.P=function(){If(this.b);K.T.P.call(this)};l.qe=function(b,c,d,e,f){if(null!==this.d)return b=this.sa(b),this.p.ye(b,this.d,c,m(d)?d:null,m(e)?e:bd,m(f)?f:null)};l.yj=function(b,c,d,e,f){if(null!==this.d)return this.p.Kf(b,this.d,c,m(d)?d:null,m(e)?e:bd,m(f)?f:null)};
l.Ri=function(b,c,d){if(null===this.d)return!1;b=this.sa(b);return this.p.Lf(b,this.d,m(c)?c:bd,m(d)?d:null)};l.Dh=function(b){return this.sa(this.hd(b))};l.hd=function(b){if(m(b.changedTouches)){var c=b.changedTouches[0];b=Jg(this.b);return[c.clientX-b.x,c.clientY-b.y]}c=this.b;b=Jg(b);c=Jg(c);c=new sf(b.x-c.x,b.y-c.y);return[c.x,c.y]};l.Fd=function(){return this.get("target")};K.prototype.getTarget=K.prototype.Fd;l=K.prototype;l.Mc=function(){var b=this.Fd();return m(b)?xf(b):null};
l.sa=function(b){var c=this.d;if(null===c)return null;b=b.slice();return nj(c.pixelToCoordinateMatrix,b,b)};l.Bh=function(){return this.i};l.Xh=function(){return this.k};l.Kh=function(){return this.g};l.Ub=function(){return this.get("layergroup")};K.prototype.getLayerGroup=K.prototype.Ub;K.prototype.ea=function(){return this.Ub().ac()};K.prototype.e=function(b){var c=this.d;if(null===c)return null;b=b.slice(0,2);return nj(c.coordinateToPixelMatrix,b,b)};K.prototype.f=function(){return this.get("size")};
K.prototype.getSize=K.prototype.f;K.prototype.a=function(){return this.get("view")};K.prototype.getView=K.prototype.a;l=K.prototype;l.hi=function(){return this.b};l.fi=function(b,c,d,e){var f=this.d;if(!(null!==f&&c in f.wantedTiles&&f.wantedTiles[c][jf(b.a)]))return Infinity;b=d[0]-f.focus[0];d=d[1]-f.focus[1];return 65536*Math.log(e)+Math.sqrt(b*b+d*d)/e};l.rf=function(b,c){var d=new Vi(c||b.type,this,b);this.tf(d)};
l.tf=function(b){if(null!==this.d){this.ca=b.coordinate;b.frameState=this.d;var c=this.g.a,d;if(!1!==this.dispatchEvent(b))for(d=c.length-1;0<=d;d--){var e=c[d];if(e.b()&&!e.handleEvent(b))break}}};
l.Mi=function(){var b=this.d,c=this.kb;if(!c.la()){var d=16,e=d,f=0;null!==b&&(f=b.viewHints,f[0]&&(d=this.xc?8:0,e=2),f[1]&&(d=this.yc?8:0,e=2),f=pb(b.wantedTiles));d*=f;e*=f;if(c.d<d){Mj(c);d=Math.min(d-c.d,e,c.Tb());for(e=0;e<d;++e)f=Jj(c)[0],w(f,"change",c.g,!1,c),f.load();c.d+=d}}c=this.va;d=0;for(e=c.length;d<e;++d)c[d](this,b);c.length=0};l.Oi=function(){this.render()};
l.Pi=function(){var b=this.Mc();ji(this.D);null===b?If(this.b):(b.appendChild(this.b),di(this.D,null===this.fa?b:this.fa));this.q()};l.zj=function(){this.render()};l.Qi=function(){this.render()};l.Aj=function(){null!==this.U&&(Wc(this.U),this.U=null);var b=this.a();null!==b&&(this.U=w(b,"propertychange",this.Qi,!1,this));this.render()};l.zi=function(){this.render()};l.Ai=function(){this.render()};
l.yi=function(){if(null!==this.o){for(var b=this.o.length,c=0;c<b;++c)Wc(this.o[c]);this.o=null}b=this.Ub();null!=b&&(this.o=[w(b,"propertychange",this.Ai,!1,this),w(b,"change",this.zi,!1,this)]);this.render()};l.Sl=function(){var b=this.r;Jh(b);b.jf()};l.render=function(){null!=this.r.aa||this.r.start()};l.Ml=function(b){if(m(this.i.remove(b)))return b};l.Nl=function(b){var c;m(this.g.remove(b))&&(c=b);return c};l.Ol=function(b){return this.Ub().ac().remove(b)};l.Pl=function(b){if(m(this.k.remove(b)))return b};
l.Rl=function(b){var c,d,e,f=this.f(),g=this.a(),h=null;if(c=m(f)&&0<f[0]&&0<f[1]&&null!==g)c=null!=g.b()&&m(g.a());if(c){var h=g.q.slice(),k=this.Ub().Xa(),n={};c=0;for(d=k.length;c<d;++c)n[ma(k[c].layer)]=k[c];e=Xe(g);h={animate:!1,attributions:{},coordinateToPixelMatrix:this.vc,extent:null,focus:null===this.ca?e.center:this.ca,index:this.wc++,layerStates:n,layerStatesArray:k,logos:Bb(this.zc),pixelRatio:this.Ac,pixelToCoordinateMatrix:this.ad,postRenderFunctions:[],size:f,skippedFeatureUids:this.da,
tileQueue:this.kb,time:b,usedTiles:{},viewState:e,viewHints:h,wantedTiles:{}}}if(null!==h){b=this.N;c=f=0;for(d=b.length;c<d;++c)g=b[c],g(this,h)&&(b[f++]=g);b.length=f;h.extent=me(e.center,e.resolution,e.rotation,h.size)}this.d=h;this.p.Yd(h);null!==h&&(h.animate&&this.render(),Array.prototype.push.apply(this.va,h.postRenderFunctions),0!==this.N.length||h.viewHints[0]||h.viewHints[1]||ce(h.extent,this.Ea)||(this.dispatchEvent(new Tg("moveend",this,h)),Xd(h.extent,this.Ea)));this.dispatchEvent(new Tg("postrender",
this,h));Nh(this.Mi,this)};l.sg=function(b){this.set("layergroup",b)};K.prototype.setLayerGroup=K.prototype.sg;K.prototype.S=function(b){this.set("size",b)};K.prototype.setSize=K.prototype.S;K.prototype.ia=function(b){this.set("target",b)};K.prototype.setTarget=K.prototype.ia;K.prototype.Fa=function(b){this.set("view",b)};K.prototype.setView=K.prototype.Fa;K.prototype.Xa=function(b){b=ma(b).toString();this.da[b]=!0;this.render()};
K.prototype.q=function(){var b=this.Mc();if(null===b)this.S(void 0);else{var c=wf(b),d=Gb&&b.currentStyle;d&&Lf(uf(c))&&"auto"!=d.width&&"auto"!=d.height&&!d.boxSizing?(c=Ng(b,d.width,"width","pixelWidth"),b=Ng(b,d.height,"height","pixelHeight"),b=new tf(c,b)):(d=new tf(b.offsetWidth,b.offsetHeight),c=Pg(b,"padding"),b=Sg(b),b=new tf(d.width-b.left-c.left-c.right-b.right,d.height-b.top-c.top-c.bottom-b.bottom));this.S([b.width,b.height])}};
K.prototype.ic=function(b){b=ma(b).toString();delete this.da[b];this.render()};
function To(b){var c=null;m(b.keyboardEventTarget)&&(c=ia(b.keyboardEventTarget)?document.getElementById(b.keyboardEventTarget):b.keyboardEventTarget);var d={},e={};if(!m(b.logo)||"boolean"==typeof b.logo&&b.logo)e["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]="http://openlayers.org/";
else{var f=b.logo;ia(f)?e[f]="":la(f)&&(e[f.src]=f.href)}f=b.layers instanceof G?b.layers:new G({layers:b.layers});d.layergroup=f;d.target=b.target;d.view=m(b.view)?b.view:new B;var f=Dj,g;m(b.renderer)?ga(b.renderer)?g=b.renderer:ia(b.renderer)&&(g=[b.renderer]):g=So;var h,k;h=0;for(k=g.length;h<k;++h){var n=g[h];if("canvas"==n){if(Zf){f=Gn;break}}else if("dom"==n){f=On;break}else if("webgl"==n&&Uf){f=Oo;break}}var p;m(b.controls)?p=ga(b.controls)?new lg(b.controls.slice()):b.controls:p=zh();var q;
m(b.interactions)?q=ga(b.interactions)?new lg(b.interactions.slice()):b.interactions:q=Ql();b=m(b.overlays)?ga(b.overlays)?new lg(b.overlays.slice()):b.overlays:new lg;return{controls:p,interactions:q,keyboardEventTarget:c,logos:e,overlays:b,Tl:f,sm:d}}Xl();function M(b){qd.call(this);this.H=m(b.insertFirst)?b.insertFirst:!0;this.N=m(b.stopEvent)?b.stopEvent:!0;this.ba=Bf("DIV",{"class":"ol-overlay-container"});this.ba.style.position="absolute";this.D=m(b.autoPan)?b.autoPan:!1;this.g=m(b.autoPanAnimation)?b.autoPanAnimation:{};this.r=m(b.autoPanMargin)?b.autoPanMargin:20;this.a={bd:"",Dd:"",Zd:"",$d:"",visible:!0};this.f=null;w(this,ud("element"),this.ri,!1,this);w(this,ud("map"),this.Gi,!1,this);w(this,ud("offset"),this.Ii,!1,this);w(this,ud("position"),
this.Ki,!1,this);w(this,ud("positioning"),this.Li,!1,this);m(b.element)&&this.Le(b.element);this.o(m(b.offset)?b.offset:[0,0]);this.p(m(b.positioning)?b.positioning:"top-left");m(b.position)&&this.e(b.position)}v(M,qd);M.prototype.b=function(){return this.get("element")};M.prototype.getElement=M.prototype.b;M.prototype.d=function(){return this.get("map")};M.prototype.getMap=M.prototype.d;M.prototype.i=function(){return this.get("offset")};M.prototype.getOffset=M.prototype.i;M.prototype.q=function(){return this.get("position")};
M.prototype.getPosition=M.prototype.q;M.prototype.k=function(){return this.get("positioning")};M.prototype.getPositioning=M.prototype.k;l=M.prototype;l.ri=function(){Gf(this.ba);var b=this.b();null!=b&&Ff(this.ba,b)};l.Gi=function(){null!==this.f&&(If(this.ba),Wc(this.f),this.f=null);var b=this.d();null!=b&&(this.f=w(b,"postrender",this.render,!1,this),Uo(this),b=this.N?b.H:b.ka,this.H?Hf(b,this.ba,0):Ff(b,this.ba))};l.render=function(){Uo(this)};l.Ii=function(){Uo(this)};
l.Ki=function(){Uo(this);if(m(this.get("position"))&&this.D){var b=this.d();if(m(b)&&!fa(b.Mc())){var c=Vo(b.Mc(),b.f()),d=this.b(),e=d.offsetWidth,f=d.currentStyle||window.getComputedStyle(d),e=e+(parseInt(f.marginLeft,10)+parseInt(f.marginRight,10)),f=d.offsetHeight,g=d.currentStyle||window.getComputedStyle(d),f=f+(parseInt(g.marginTop,10)+parseInt(g.marginBottom,10)),h=Vo(d,[e,f]),d=this.r;Zd(c,h)||(e=h[0]-c[0],f=c[2]-h[2],g=h[1]-c[1],h=c[3]-h[3],c=[0,0],0>e?c[0]=e-d:0>f&&(c[0]=Math.abs(f)+d),
0>g?c[1]=g-d:0>h&&(c[1]=Math.abs(h)+d),0===c[0]&&0===c[1])||(d=b.a().b(),e=b.e(d),c=[e[0]+c[0],e[1]+c[1]],null!==this.g&&(this.g.source=d,b.La(cf(this.g))),b.a().Ha(b.sa(c)))}}};l.Li=function(){Uo(this)};l.Le=function(b){this.set("element",b)};M.prototype.setElement=M.prototype.Le;M.prototype.setMap=function(b){this.set("map",b)};M.prototype.setMap=M.prototype.setMap;M.prototype.o=function(b){this.set("offset",b)};M.prototype.setOffset=M.prototype.o;M.prototype.e=function(b){this.set("position",b)};
M.prototype.setPosition=M.prototype.e;function Vo(b,c){var d=wf(b);Fg(b,"position");var e=new sf(0,0),f;f=d?wf(d):document;f=!Gb||Gb&&9<=Rb||Lf(uf(f))?f.documentElement:f.body;b!=f&&(f=Ig(b),d=Mf(uf(d)),e.x=f.left+d.x,e.y=f.top+d.y);return[e.x,e.y,e.x+c[0],e.y+c[1]]}M.prototype.p=function(b){this.set("positioning",b)};M.prototype.setPositioning=M.prototype.p;
function Uo(b){var c=b.d(),d=b.q();if(m(c)&&null!==c.d&&m(d)){var d=c.e(d),e=c.f(),c=b.ba.style,f=b.i(),g=b.k(),h=f[0],f=f[1];if("bottom-right"==g||"center-right"==g||"top-right"==g)""!==b.a.Dd&&(b.a.Dd=c.left=""),h=Math.round(e[0]-d[0]-h)+"px",b.a.Zd!=h&&(b.a.Zd=c.right=h);else{""!==b.a.Zd&&(b.a.Zd=c.right="");if("bottom-center"==g||"center-center"==g||"top-center"==g)h-=Kg(b.ba).width/2;h=Math.round(d[0]+h)+"px";b.a.Dd!=h&&(b.a.Dd=c.left=h)}if("bottom-left"==g||"bottom-center"==g||"bottom-right"==
g)""!==b.a.$d&&(b.a.$d=c.top=""),d=Math.round(e[1]-d[1]-f)+"px",b.a.bd!=d&&(b.a.bd=c.bottom=d);else{""!==b.a.bd&&(b.a.bd=c.bottom="");if("center-left"==g||"center-center"==g||"center-right"==g)f-=Kg(b.ba).height/2;d=Math.round(d[1]+f)+"px";b.a.$d!=d&&(b.a.$d=c.top=d)}b.a.visible||(Mg(b.ba,!0),b.a.visible=!0)}else b.a.visible&&(Mg(b.ba,!1),b.a.visible=!1)};function Wo(b){b=m(b)?b:{};this.e=m(b.collapsed)?b.collapsed:!0;this.g=m(b.collapsible)?b.collapsible:!0;this.g||(this.e=!1);var c=m(b.className)?b.className:"ol-overviewmap",d=m(b.tipLabel)?b.tipLabel:"Overview map",e=m(b.collapseLabel)?b.collapseLabel:"\u00ab";this.o=ia(e)?Bf("SPAN",{},e):e;e=m(b.label)?b.label:"\u00bb";this.p=ia(e)?Bf("SPAN",{},e):e;d=Bf("BUTTON",{type:"button",title:d},this.g&&!this.e?this.o:this.p);w(d,"click",this.Ij,!1,this);w(d,["mouseout",uc],function(){this.blur()},!1);
var e=Bf("DIV","ol-overviewmap-map"),f=this.d=new K({controls:new lg,interactions:new lg,target:e});m(b.layers)&&b.layers.forEach(function(b){f.af(b)},this);var g=Bf("DIV","ol-overviewmap-box");this.k=new M({position:[0,0],positioning:"bottom-left",element:g});this.d.bf(this.k);c=Bf("DIV",c+" ol-unselectable ol-control"+(this.e&&this.g?" ol-collapsed":"")+(this.g?"":" ol-uncollapsible"),e,d);Ug.call(this,{element:c,render:m(b.render)?b.render:Xo,target:b.target})}v(Wo,Ug);l=Wo.prototype;
l.setMap=function(b){var c=this.a;null===b&&null!==c&&Vc(c,ud("view"),this.Ff,!1,this);Wo.T.setMap.call(this,b);null!==b&&(0===this.d.ea().Ib()&&this.d.K("layergroup",b),Yo(this),w(b,ud("view"),this.Ff,!1,this),this.d.q(),Zo(this))};function Yo(b){var c=b.a.a();null===c||b.d.a().K("rotation",c)}
function Xo(){var b=this.a,c=this.d;if(null!==b.d&&null!==c.d){var d=b.f(),b=b.a().g(d),e=c.f(),d=c.a().g(e),f=c.e(je(b)),c=c.e(he(b)),c=new tf(Math.abs(f[0]-c[0]),Math.abs(f[1]-c[1])),f=e[0],e=e[1];c.width<.1*f||c.height<.1*e||c.width>.75*f||c.height>.75*e?Zo(this):Zd(d,b)||(b=this.d,d=this.a.a(),b.a().Ha(d.b()))}$o(this)}l.Ff=function(){Yo(this)};function Zo(b){var c=b.a;b=b.d;var d=c.f(),c=c.a().g(d),d=b.f();b=b.a();var e=Math.log(7.5)/Math.LN2;se(c,1/(.1*Math.pow(2,e/2)));b.pe(c,d)}
function $o(b){var c=b.a,d=b.d;if(null!==c.d&&null!==d.d){var e=c.f(),f=c.a(),g=d.a();d.f();var c=f.d(),h=b.k,d=b.k.b(),f=f.g(e),e=g.a(),g=ge(f),f=ie(f),k;b=b.a.a().b();m(b)&&(k=[g[0]-b[0],g[1]-b[1]],Ad(k,c),vd(k,b));h.e(k);null!=d&&(k=new tf(Math.abs((g[0]-f[0])/e),Math.abs((f[1]-g[1])/e)),c=Lf(uf(wf(d))),!Gb||Pb("10")||c&&Pb("8")?(d=d.style,Hb?d.MozBoxSizing="border-box":Ib?d.WebkitBoxSizing="border-box":d.boxSizing="border-box",d.width=Math.max(k.width,0)+"px",d.height=Math.max(k.height,0)+"px"):
(b=d.style,c?(c=Pg(d,"padding"),d=Sg(d),b.pixelWidth=k.width-d.left-c.left-c.right-d.right,b.pixelHeight=k.height-d.top-c.top-c.bottom-d.bottom):(b.pixelWidth=k.width,b.pixelHeight=k.height)))}}l.Ij=function(b){b.preventDefault();ap(this)};function ap(b){Ag(b.element,"ol-collapsed");b.e?Jf(b.o,b.p):Jf(b.p,b.o);b.e=!b.e;var c=b.d;b.e||null!==c.d||(c.q(),Zo(b),Uc(c,"postrender",function(){$o(this)},!1,b))}l.Hj=function(){return this.g};
l.Kj=function(b){this.g!==b&&(this.g=b,Ag(this.element,"ol-uncollapsible"),!b&&this.e&&ap(this))};l.Jj=function(b){this.g&&this.e!==b&&ap(this)};l.Gj=function(){return this.e};function bp(b){b=m(b)?b:{};var c=m(b.className)?b.className:"ol-scale-line";this.g=Bf("DIV",c+"-inner");this.ba=Bf("DIV",c+" ol-unselectable",this.g);this.r=null;this.k=m(b.minWidth)?b.minWidth:64;this.d=!1;this.H=void 0;this.D="";this.e=null;Ug.call(this,{element:this.ba,render:m(b.render)?b.render:cp,target:b.target});w(this,ud("units"),this.N,!1,this);this.p(b.units||"metric")}v(bp,Ug);var dp=[1,2,5];bp.prototype.o=function(){return this.get("units")};bp.prototype.getUnits=bp.prototype.o;
function cp(b){b=b.frameState;null===b?this.r=null:this.r=b.viewState;ep(this)}bp.prototype.N=function(){ep(this)};bp.prototype.p=function(b){this.set("units",b)};bp.prototype.setUnits=bp.prototype.p;
function ep(b){var c=b.r;if(null===c)b.d&&(Mg(b.ba,!1),b.d=!1);else{var d=c.center,e=c.projection,c=e.getPointResolution(c.resolution,d),f=e.c,g=b.o();"degrees"!=f||"metric"!=g&&"imperial"!=g&&"us"!=g&&"nautical"!=g?"degrees"!=f&&"degrees"==g?(null===b.e&&(b.e=De(e,ze("EPSG:4326"))),d=Math.cos(Yb(b.e(d)[1])),e=ve.radius,e/=we[f],c*=180/(Math.PI*d*e)):b.e=null:(b.e=null,d=Math.cos(Yb(d[1])),c*=Math.PI*d*ve.radius/180);d=b.k*c;f="";"degrees"==g?d<1/60?(f="\u2033",c*=3600):1>d?(f="\u2032",c*=60):f="\u00b0":
"imperial"==g?.9144>d?(f="in",c/=.0254):1609.344>d?(f="ft",c/=.3048):(f="mi",c/=1609.344):"nautical"==g?(c/=1852,f="nm"):"metric"==g?1>d?(f="mm",c*=1E3):1E3>d?f="m":(f="km",c/=1E3):"us"==g&&(.9144>d?(f="in",c*=39.37):1609.344>d?(f="ft",c/=.30480061):(f="mi",c/=1609.3472));for(d=3*Math.floor(Math.log(b.k*c)/Math.log(10));;){e=dp[d%3]*Math.pow(10,Math.floor(d/3));g=Math.round(e/c);if(isNaN(g)){Mg(b.ba,!1);b.d=!1;return}if(g>=b.k)break;++d}c=e+" "+f;b.D!=c&&(b.g.innerHTML=c,b.D=c);b.H!=g&&(b.g.style.width=
g+"px",b.H=g);b.d||(Mg(b.ba,!0),b.d=!0)}};function fp(b){lc.call(this);this.c=b;this.a={}}v(fp,lc);var gp=[];fp.prototype.Ra=function(b,c,d,e){ga(c)||(c&&(gp[0]=c.toString()),c=gp);for(var f=0;f<c.length;f++){var g=w(b,c[f],d||this.handleEvent,e||!1,this.c||this);if(!g)break;this.a[g.key]=g}return this};
fp.prototype.Me=function(b,c,d,e,f){if(ga(c))for(var g=0;g<c.length;g++)this.Me(b,c[g],d,e,f);else d=d||this.handleEvent,f=f||this.c||this,d=Oc(d),e=!!e,c=Bc(b)?Ic(b.mb,String(c),d,e,f):b?(b=Qc(b))?Ic(b,c,d,e,f):null:null,c&&(Wc(c),delete this.a[c.key]);return this};function hp(b){mb(b.a,Wc);b.a={}}fp.prototype.P=function(){fp.T.P.call(this);hp(this)};fp.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};function ip(b,c,d){hd.call(this);this.target=b;this.handle=c||b;this.a=d||new Cg(NaN,NaN,NaN,NaN);this.b=wf(b);this.c=new fp(this);oc(this,this.c);w(this.handle,["touchstart","mousedown"],this.qf,!1,this)}v(ip,hd);var jp=Gb||Hb&&Pb("1.9.3");l=ip.prototype;l.clientX=0;l.clientY=0;l.screenX=0;l.screenY=0;l.tg=0;l.ug=0;l.pc=0;l.qc=0;l.Zb=!1;l.P=function(){ip.T.P.call(this);Vc(this.handle,["touchstart","mousedown"],this.qf,!1,this);hp(this.c);jp&&this.b.releaseCapture();this.handle=this.target=null};
l.qf=function(b){var c="mousedown"==b.type;if(this.Zb||c&&!zc(b))this.dispatchEvent("earlycancel");else if(kp(b),this.dispatchEvent(new lp("start",this,b.clientX,b.clientY))){this.Zb=!0;b.preventDefault();var c=this.b,d=c.documentElement,e=!jp;this.c.Ra(c,["touchmove","mousemove"],this.Hi,e);this.c.Ra(c,["touchend","mouseup"],this.wd,e);jp?(d.setCapture(!1),this.c.Ra(d,"losecapture",this.wd)):this.c.Ra(c?c.parentWindow||c.defaultView:window,"blur",this.wd);this.f&&this.c.Ra(this.f,"scroll",this.jl,
e);this.clientX=this.tg=b.clientX;this.clientY=this.ug=b.clientY;this.screenX=b.screenX;this.screenY=b.screenY;this.pc=this.target.offsetLeft;this.qc=this.target.offsetTop;this.d=Mf(uf(this.b));ta()}};l.wd=function(b){hp(this.c);jp&&this.b.releaseCapture();if(this.Zb){kp(b);this.Zb=!1;var c=mp(this,this.pc),d=np(this,this.qc);this.dispatchEvent(new lp("end",this,b.clientX,b.clientY,0,c,d))}else this.dispatchEvent("earlycancel")};
function kp(b){var c=b.type;"touchstart"==c||"touchmove"==c?xc(b,b.a.targetTouches[0],b.b):"touchend"!=c&&"touchcancel"!=c||xc(b,b.a.changedTouches[0],b.b)}
l.Hi=function(b){kp(b);var c=1*(b.clientX-this.clientX),d=b.clientY-this.clientY;this.clientX=b.clientX;this.clientY=b.clientY;this.screenX=b.screenX;this.screenY=b.screenY;if(!this.Zb){var e=this.tg-this.clientX,f=this.ug-this.clientY;if(0<e*e+f*f)if(this.dispatchEvent(new lp("start",this,b.clientX,b.clientY)))this.Zb=!0;else{this.oa||this.wd(b);return}}d=op(this,c,d);c=d.x;d=d.y;this.Zb&&this.dispatchEvent(new lp("beforedrag",this,b.clientX,b.clientY,0,c,d))&&(pp(this,b,c,d),b.preventDefault())};
function op(b,c,d){var e=Mf(uf(b.b));c+=e.x-b.d.x;d+=e.y-b.d.y;b.d=e;b.pc+=c;b.qc+=d;c=mp(b,b.pc);b=np(b,b.qc);return new sf(c,b)}l.jl=function(b){var c=op(this,0,0);b.clientX=this.clientX;b.clientY=this.clientY;pp(this,b,c.x,c.y)};function pp(b,c,d,e){b.target.style.left=d+"px";b.target.style.top=e+"px";b.dispatchEvent(new lp("drag",b,c.clientX,c.clientY,0,d,e))}
function mp(b,c){var d=b.a,e=isNaN(d.left)?null:d.left,d=isNaN(d.width)?0:d.width;return Math.min(null!=e?e+d:Infinity,Math.max(null!=e?e:-Infinity,c))}function np(b,c){var d=b.a,e=isNaN(d.top)?null:d.top,d=isNaN(d.height)?0:d.height;return Math.min(null!=e?e+d:Infinity,Math.max(null!=e?e:-Infinity,c))}function lp(b,c,d,e,f,g,h){qc.call(this,b);this.clientX=d;this.clientY=e;this.left=m(g)?g:c.pc;this.top=m(h)?h:c.qc}v(lp,qc);function qp(b){b=m(b)?b:{};this.e=void 0;this.g=rp;this.k=null;this.o=!1;var c=m(b.className)?b.className:"ol-zoomslider",d=Bf("DIV",[c+"-thumb","ol-unselectable"]),c=Bf("DIV",[c,"ol-unselectable","ol-control"],d);this.d=new ip(d);oc(this,this.d);w(this.d,"start",this.qi,!1,this);w(this.d,"drag",this.oi,!1,this);w(this.d,"end",this.pi,!1,this);w(c,"click",this.ni,!1,this);w(d,"click",rc);Ug.call(this,{element:c,render:m(b.render)?b.render:sp})}v(qp,Ug);var rp=0;l=qp.prototype;
l.setMap=function(b){qp.T.setMap.call(this,b);null===b||b.render()};
function sp(b){if(null!==b.frameState){if(!this.o){var c=this.element,d=Kg(c),e=Kf(c),c=Pg(e,"margin"),f=new tf(e.offsetWidth,e.offsetHeight),e=f.width+c.right+c.left,c=f.height+c.top+c.bottom;this.k=[e,c];e=d.width-e;c=d.height-c;d.width>d.height?(this.g=1,d=new Cg(0,0,e,0)):(this.g=rp,d=new Cg(0,0,0,c));this.d.a=d||new Cg(NaN,NaN,NaN,NaN);this.o=!0}b=b.frameState.viewState.resolution;b!==this.e&&(this.e=b,b=1-We(this.a.a())(b),d=this.d,c=Kf(this.element),1==this.g?Gg(c,d.a.left+d.a.width*b):Gg(c,
d.a.left,d.a.top+d.a.height*b))}}l.ni=function(b){var c=this.a,d=c.a(),e=d.a();c.La(ef({resolution:e,duration:200,easing:Ze}));b=tp(this,b.offsetX-this.k[0]/2,b.offsetY-this.k[1]/2);b=up(this,b);d.f(d.constrainResolution(b))};l.qi=function(){Ye(this.a.a(),1)};l.oi=function(b){b=tp(this,b.left,b.top);this.e=up(this,b);this.a.a().f(this.e)};l.pi=function(){var b=this.a,c=b.a();Ye(c,-1);b.La(ef({resolution:this.e,duration:200,easing:Ze}));b=c.constrainResolution(this.e);c.f(b)};
function tp(b,c,d){var e=b.d.a;return Vb(1===b.g?(c-e.left)/e.width:(d-e.top)/e.height,0,1)}function up(b,c){return Ve(b.a.a())(1-c)};function vp(b){b=m(b)?b:{};this.d=m(b.extent)?b.extent:null;var c=m(b.className)?b.className:"ol-zoom-extent",d=Bf("BUTTON",{type:"button",title:m(b.tipLabel)?b.tipLabel:"Fit to extent"},m(b.label)?b.label:"E");w(d,"click",this.e,!1,this);w(d,["mouseout",uc],function(){this.blur()},!1);c=Bf("DIV",c+" ol-unselectable ol-control",d);Ug.call(this,{element:c,target:b.target})}v(vp,Ug);
vp.prototype.e=function(b){b.preventDefault();var c=this.a;b=c.a();var d=null===this.d?b.p.J():this.d,c=c.f();b.pe(d,c)};function wp(b){qd.call(this);b=m(b)?b:{};this.a=null;w(this,ud("tracking"),this.k,!1,this);this.b(m(b.tracking)?b.tracking:!1)}v(wp,qd);wp.prototype.P=function(){this.b(!1);wp.T.P.call(this)};
wp.prototype.q=function(b){b=b.a;if(null!=b.alpha){var c=Yb(b.alpha);this.set("alpha",c);"boolean"==typeof b.absolute&&b.absolute?this.set("heading",c):null!=b.webkitCompassHeading&&null!=b.webkitCompassAccuracy&&-1!=b.webkitCompassAccuracy&&this.set("heading",Yb(b.webkitCompassHeading))}null!=b.beta&&this.set("beta",Yb(b.beta));null!=b.gamma&&this.set("gamma",Yb(b.gamma));this.l()};wp.prototype.f=function(){return this.get("alpha")};wp.prototype.getAlpha=wp.prototype.f;wp.prototype.e=function(){return this.get("beta")};
wp.prototype.getBeta=wp.prototype.e;wp.prototype.g=function(){return this.get("gamma")};wp.prototype.getGamma=wp.prototype.g;wp.prototype.i=function(){return this.get("heading")};wp.prototype.getHeading=wp.prototype.i;wp.prototype.d=function(){return this.get("tracking")};wp.prototype.getTracking=wp.prototype.d;wp.prototype.k=function(){if($f){var b=this.d();b&&null===this.a?this.a=w(ba,"deviceorientation",this.q,!1,this):b||null===this.a||(Wc(this.a),this.a=null)}};
wp.prototype.b=function(b){this.set("tracking",b)};wp.prototype.setTracking=wp.prototype.b;function xp(b){qd.call(this);this.i=b;w(this.i,["change","input"],this.g,!1,this);w(this,ud("value"),this.k,!1,this);w(this,ud("checked"),this.e,!1,this)}v(xp,qd);xp.prototype.a=function(){return this.get("checked")};xp.prototype.getChecked=xp.prototype.a;xp.prototype.b=function(){return this.get("value")};xp.prototype.getValue=xp.prototype.b;xp.prototype.f=function(b){this.set("value",b)};xp.prototype.setValue=xp.prototype.f;xp.prototype.d=function(b){this.set("checked",b)};
xp.prototype.setChecked=xp.prototype.d;xp.prototype.g=function(){var b=this.i;"checkbox"===b.type||"radio"===b.type?this.d(b.checked):this.f(b.value)};xp.prototype.e=function(){this.i.checked=this.a()};xp.prototype.k=function(){this.i.value=this.b()};function O(b){qd.call(this);this.aa=void 0;this.b="geometry";this.g=null;this.a=void 0;this.e=null;w(this,ud(this.b),this.xd,!1,this);m(b)&&(b instanceof pk||null===b?this.Sa(b):this.C(b))}v(O,qd);O.prototype.clone=function(){var b=new O(this.I());b.f(this.b);var c=this.R();null!=c&&b.Sa(c.clone());c=this.g;null===c||b.i(c);return b};O.prototype.R=function(){return this.get(this.b)};O.prototype.getGeometry=O.prototype.R;l=O.prototype;l.Jh=function(){return this.aa};l.Ih=function(){return this.b};
l.qj=function(){return this.g};l.rj=function(){return this.a};l.xi=function(){this.l()};l.xd=function(){null!==this.e&&(Wc(this.e),this.e=null);var b=this.R();null!=b&&(this.e=w(b,"change",this.xi,!1,this),this.l())};l.Sa=function(b){this.set(this.b,b)};O.prototype.setGeometry=O.prototype.Sa;O.prototype.i=function(b){this.g=b;null===b?b=void 0:ka(b)||(b=ga(b)?b:[b],b=$c(b));this.a=b;this.l()};O.prototype.d=function(b){this.aa=b;this.l()};
O.prototype.f=function(b){Vc(this,ud(this.b),this.xd,!1,this);this.b=b;w(this,ud(this.b),this.xd,!1,this);this.xd()};function yp(b){b=m(b)?b:{};this.g=this.f=this.d=this.c=this.b=this.a=null;this.e=void 0;this.Ef(m(b.style)?b.style:zl);m(b.features)?ga(b.features)?this.Tc(new lg(b.features.slice())):this.Tc(b.features):this.Tc(new lg);m(b.map)&&this.setMap(b.map)}l=yp.prototype;l.Cf=function(b){this.a.push(b)};l.kj=function(){return this.a};l.lj=function(){return this.d};l.Df=function(){zp(this)};l.vi=function(b){b=b.element;this.c[ma(b).toString()]=w(b,"change",this.Df,!1,this);zp(this)};
l.wi=function(b){b=ma(b.element).toString();Wc(this.c[b]);delete this.c[b];zp(this)};l.oj=function(){zp(this)};l.pj=function(b){if(null!==this.a){var c=this.e;m(c)||(c=zl);var d=b.a;b=b.frameState;var e=b.viewState.resolution,f=cn(e,b.pixelRatio),g,h,k,n;this.a.forEach(function(b){n=b.a;k=m(n)?n.call(b,e):c(b,e);if(null!=k)for(h=k.length,g=0;g<h;++g)dn(d,b,k[g],f,this.oj,this)},this)}};l.Ed=function(b){this.a.remove(b)};function zp(b){null===b.d||b.d.render()}
l.Tc=function(b){null!==this.b&&(Qa(this.b,Wc),this.b=null);null!==this.c&&(Qa(qb(this.c),Wc),this.c=null);this.a=b;null!==b&&(this.b=[w(b,"add",this.vi,!1,this),w(b,"remove",this.wi,!1,this)],this.c={},b.forEach(function(b){this.c[ma(b).toString()]=w(b,"change",this.Df,!1,this)},this));zp(this)};l.setMap=function(b){null!==this.f&&(Wc(this.f),this.f=null);zp(this);this.d=b;null!==b&&(this.f=w(b,"postcompose",this.pj,!1,this),b.render())};l.Ef=function(b){this.g=b;this.e=yl(b);zp(this)};l.mj=function(){return this.g};
l.nj=function(){return this.e};function Ap(){this.defaultDataProjection=null}function Bp(b,c,d){var e;m(d)&&(e={dataProjection:m(d.dataProjection)?d.dataProjection:b.Ja(c),featureProjection:d.featureProjection});return Cp(b,e)}function Cp(b,c){var d;m(c)&&(d={featureProjection:c.featureProjection,dataProjection:null!=c.dataProjection?c.dataProjection:b.defaultDataProjection,rightHanded:c.rightHanded});return d}
function Dp(b,c,d){var e=m(d)?ze(d.featureProjection):null;d=m(d)?ze(d.dataProjection):null;return null===e||null===d||Re(e,d)?b:b instanceof pk?(c?b.clone():b).transform(c?e:d,c?d:e):Ue(c?b.slice():b,c?e:d,c?d:e)};var Ep=ba.JSON.parse,Fp=ba.JSON.stringify;function Gp(){this.defaultDataProjection=null}v(Gp,Ap);function Hp(b){return la(b)?b:ia(b)?(b=Ep(b),m(b)?b:null):null}l=Gp.prototype;l.O=function(){return"json"};l.Nb=function(b,c){return Ip(this,Hp(b),Bp(this,b,c))};l.ma=function(b,c){return this.b(Hp(b),Bp(this,b,c))};l.Rc=function(b,c){var d=Hp(b),e=Bp(this,b,c);return Jp(d,e)};l.Ja=function(b){b=Hp(b).crs;return null!=b?"name"==b.type?ze(b.properties.name):"EPSG"==b.type?ze("EPSG:"+b.properties.code):null:this.defaultDataProjection};
l.be=function(b,c){return Fp(this.a(b,c))};l.Qb=function(b,c){return Fp(this.d(b,c))};l.Xc=function(b,c){return Fp(this.f(b,c))};function Kp(b){b=m(b)?b:{};this.defaultDataProjection=null;this.defaultDataProjection=ze(null!=b.defaultDataProjection?b.defaultDataProjection:"EPSG:4326");this.c=b.geometryName}v(Kp,Gp);function Jp(b,c){return null===b?null:Dp((0,Lp[b.type])(b),!1,c)}function Mp(b,c){return(0,Np[b.O()])(Dp(b,!0,c),c)}
var Lp={Point:function(b){return new Nk(b.coordinates)},LineString:function(b){return new Tm(b.coordinates)},Polygon:function(b){return new F(b.coordinates)},MultiPoint:function(b){return new Ym(b.coordinates)},MultiLineString:function(b){return new Vm(b.coordinates)},MultiPolygon:function(b){return new Zm(b.coordinates)},GeometryCollection:function(b,c){var d=Sa(b.geometries,function(b){return Jp(b,c)});return new Mm(d)}},Np={Point:function(b){return{type:"Point",coordinates:b.Q()}},LineString:function(b){return{type:"LineString",
coordinates:b.Q()}},Polygon:function(b,c){var d;m(c)&&(d=c.rightHanded);return{type:"Polygon",coordinates:b.Q(d)}},MultiPoint:function(b){return{type:"MultiPoint",coordinates:b.Q()}},MultiLineString:function(b){return{type:"MultiLineString",coordinates:b.Q()}},MultiPolygon:function(b,c){var d;m(c)&&(d=c.rightHanded);return{type:"MultiPolygon",coordinates:b.Q(d)}},GeometryCollection:function(b,c){return{type:"GeometryCollection",geometries:Sa(b.d,function(b){return Mp(b,c)})}},Circle:function(){return{type:"GeometryCollection",
geometries:[]}}};function Ip(b,c,d){d=Jp(c.geometry,d);var e=new O;m(b.c)&&e.f(b.c);e.Sa(d);m(c.id)&&e.d(c.id);m(c.properties)&&e.C(c.properties);return e}Kp.prototype.b=function(b,c){if("Feature"==b.type)return[Ip(this,b,c)];if("FeatureCollection"==b.type){var d=[],e=b.features,f,g;f=0;for(g=e.length;f<g;++f)d.push(Ip(this,e[f],c));return d}return[]};
Kp.prototype.a=function(b,c){c=Cp(this,c);var d={type:"Feature"},e=b.aa;null!=e&&(d.id=e);e=b.R();null!=e&&(d.geometry=Mp(e,c));e=b.I();yb(e,b.b);d.properties=wb(e)?null:e;return d};Kp.prototype.d=function(b,c){c=Cp(this,c);var d=[],e,f;e=0;for(f=b.length;e<f;++e)d.push(this.a(b[e],c));return{type:"FeatureCollection",features:d}};Kp.prototype.f=function(b,c){return Mp(b,Cp(this,c))};function Op(b){if("undefined"!=typeof XMLSerializer)return(new XMLSerializer).serializeToString(b);if(b=b.xml)return b;throw Error("Your browser does not support serializing XML documents");};var Pp;a:if(document.implementation&&document.implementation.createDocument)Pp=document.implementation.createDocument("","",null);else{if("undefined"!=typeof ActiveXObject){var Qp=new ActiveXObject("MSXML2.DOMDocument");if(Qp){Qp.resolveExternals=!1;Qp.validateOnParse=!1;try{Qp.setProperty("ProhibitDTD",!0),Qp.setProperty("MaxXMLSize",2048),Qp.setProperty("MaxElementDepth",256)}catch(Rp){}}if(Qp){Pp=Qp;break a}}throw Error("Your browser does not support creating new documents");}var Sp=Pp;
function Tp(b,c){return Sp.createElementNS(b,c)}function Up(b,c){null===b&&(b="");return Sp.createNode(1,c,b)}var Vp=document.implementation&&document.implementation.createDocument?Tp:Up;function Wp(b,c){return Xp(b,c,[]).join("")}function Xp(b,c,d){if(4==b.nodeType||3==b.nodeType)c?d.push(String(b.nodeValue).replace(/(\r\n|\r|\n)/g,"")):d.push(b.nodeValue);else for(b=b.firstChild;null!==b;b=b.nextSibling)Xp(b,c,d);return d}function Yp(b){return b.localName}
function Zp(b){var c=b.localName;return m(c)?c:b.baseName}var $p=Gb?Zp:Yp;function aq(b){return b instanceof Document}function bq(b){return la(b)&&9==b.nodeType}var cq=Gb?bq:aq;function dq(b){return b instanceof Node}function eq(b){return la(b)&&m(b.nodeType)}var fq=Gb?eq:dq;function gq(b,c,d){return b.getAttributeNS(c,d)||""}function hq(b,c,d){var e="";b=iq(b,c,d);m(b)&&(e=b.nodeValue);return e}var jq=document.implementation&&document.implementation.createDocument?gq:hq;
function kq(b,c,d){return b.getAttributeNodeNS(c,d)}function lq(b,c,d){var e=null;b=b.attributes;for(var f,g,h=0,k=b.length;h<k;++h)if(f=b[h],f.namespaceURI==c&&(g=f.prefix?f.prefix+":"+d:d,g==f.nodeName)){e=f;break}return e}var iq=document.implementation&&document.implementation.createDocument?kq:lq;function mq(b,c,d,e){b.setAttributeNS(c,d,e)}function nq(b,c,d,e){null===c?b.setAttribute(d,e):(c=b.ownerDocument.createNode(2,d,c),c.nodeValue=e,b.setAttributeNode(c))}
var oq=document.implementation&&document.implementation.createDocument?mq:nq;function pq(b){return(new DOMParser).parseFromString(b,"application/xml")}function qq(b,c){return function(d,e){var f=b.call(c,d,e);m(f)&&ab(e[e.length-1],f)}}function rq(b,c){return function(d,e){var f=b.call(m(c)?c:this,d,e);m(f)&&e[e.length-1].push(f)}}function sq(b,c){return function(d,e){var f=b.call(m(c)?c:this,d,e);m(f)&&(e[e.length-1]=f)}}
function tq(b){return function(c,d){var e=b.call(m(void 0)?void 0:this,c,d);m(e)&&Ab(d[d.length-1],m(void 0)?void 0:c.localName).push(e)}}function P(b,c){return function(d,e){var f=b.call(m(void 0)?void 0:this,d,e);m(f)&&(e[e.length-1][m(c)?c:d.localName]=f)}}function S(b,c,d){return uq(b,c,d)}function T(b,c){return function(d,e,f){b.call(m(c)?c:this,d,e,f);f[f.length-1].node.appendChild(d)}}
function vq(b){var c,d;return function(e,f,g){if(!m(c)){c={};var h={};h[e.localName]=b;c[e.namespaceURI]=h;d=wq(e.localName)}xq(c,d,f,g)}}function wq(b,c){return function(d,e,f){d=e[e.length-1].node;e=b;m(e)||(e=f);f=c;m(c)||(f=d.namespaceURI);return Vp(f,e)}}var yq=wq();function zq(b,c){for(var d=c.length,e=Array(d),f=0;f<d;++f)e[f]=b[c[f]];return e}function uq(b,c,d){d=m(d)?d:{};var e,f;e=0;for(f=b.length;e<f;++e)d[b[e]]=c;return d}
function Aq(b,c,d,e){for(c=c.firstElementChild;null!==c;c=c.nextElementSibling){var f=b[c.namespaceURI];m(f)&&(f=f[c.localName],m(f)&&f.call(e,c,d))}}function V(b,c,d,e,f){e.push(b);Aq(c,d,e,f);return e.pop()}function xq(b,c,d,e,f,g){for(var h=(m(f)?f:d).length,k,n,p=0;p<h;++p)k=d[p],m(k)&&(n=c.call(g,k,e,m(f)?f[p]:void 0),m(n)&&b[n.namespaceURI][n.localName].call(g,n,k,e))}function Bq(b,c,d,e,f,g,h){f.push(b);xq(c,d,e,f,g,h);f.pop()};function Cq(){this.defaultDataProjection=null}v(Cq,Ap);l=Cq.prototype;l.O=function(){return"xml"};l.Nb=function(b,c){if(cq(b))return Dq(this,b,c);if(fq(b))return this.eg(b,c);if(ia(b)){var d=pq(b);return Dq(this,d,c)}return null};function Dq(b,c,d){b=Eq(b,c,d);return 0<b.length?b[0]:null}l.ma=function(b,c){if(cq(b))return Eq(this,b,c);if(fq(b))return this.Ob(b,c);if(ia(b)){var d=pq(b);return Eq(this,d,c)}return[]};
function Eq(b,c,d){var e=[];for(c=c.firstChild;null!==c;c=c.nextSibling)1==c.nodeType&&ab(e,b.Ob(c,d));return e}l.Rc=function(b,c){if(cq(b))return this.k(b,c);if(fq(b)){var d=this.Ud(b,[Bp(this,b,m(c)?c:{})]);return m(d)?d:null}return ia(b)?(d=pq(b),this.k(d,c)):null};l.Ja=function(b){return cq(b)?this.Je(b):fq(b)?this.Xd(b):ia(b)?(b=pq(b),this.Je(b)):null};l.Je=function(){return this.defaultDataProjection};l.Xd=function(){return this.defaultDataProjection};l.be=function(b,c){var d=this.o(b,c);return Op(d)};
l.Qb=function(b,c){var d=this.a(b,c);return Op(d)};l.Xc=function(b,c){var d=this.i(b,c);return Op(d)};function Fq(b){b=m(b)?b:{};this.featureType=b.featureType;this.featureNS=b.featureNS;this.srsName=b.srsName;this.schemaLocation="";this.c={};this.c["http://www.opengis.net/gml"]={featureMember:sq(Fq.prototype.Sd),featureMembers:sq(Fq.prototype.Sd)};this.defaultDataProjection=null}v(Fq,Cq);l=Fq.prototype;
l.Sd=function(b,c){var d=$p(b),e;if("FeatureCollection"==d)e=V(null,this.c,b,c,this);else if("featureMembers"==d||"featureMember"==d){var f=c[0],g=f.featureType;e=f.featureNS;var h,k;if(!m(g)&&null!=b.childNodes){g=[];e={};h=0;for(k=b.childNodes.length;h<k;++h){var n=b.childNodes[h];if(1===n.nodeType){var p=n.nodeName.split(":").pop();if(-1===Pa(g,p)){var q;ub(e,n.namespaceURI)?q=vb(e,function(b){return b===n.namespaceURI}):(q="p"+pb(e),e[q]=n.namespaceURI);g.push(q+":"+p)}}}f.featureType=g;f.featureNS=
e}ia(e)&&(h=e,e={},e.p0=h);var f={},g=ga(g)?g:[g],r;for(r in e){p={};h=0;for(k=g.length;h<k;++h)(-1===g[h].indexOf(":")?"p0":g[h].split(":")[0])===r&&(p[g[h].split(":").pop()]="featureMembers"==d?rq(this.Fe,this):sq(this.Fe,this));f[e[r]]=p}e=V([],f,b,c)}m(e)||(e=[]);return e};l.Ud=function(b,c){var d=c[0];d.srsName=b.firstElementChild.getAttribute("srsName");var e=V(null,this.Te,b,c,this);if(null!=e)return Dp(e,!1,d)};
l.Fe=function(b,c){var d,e=b.getAttribute("fid")||jq(b,"http://www.opengis.net/gml","id"),f={},g;for(d=b.firstElementChild;null!==d;d=d.nextElementSibling){var h=$p(d);if(0===d.childNodes.length||1===d.childNodes.length&&3===d.firstChild.nodeType){var k=Wp(d,!1);/^[\s\xa0]*$/.test(k)&&(k=void 0);f[h]=k}else"boundedBy"!==h&&(g=h),f[h]=this.Ud(d,c)}d=new O(f);m(g)&&d.f(g);e&&d.d(e);return d};l.kg=function(b,c){var d=this.Td(b,c);if(null!=d){var e=new Nk(null);Ok(e,"XYZ",d);return e}};
l.ig=function(b,c){var d=V([],this.Og,b,c,this);if(m(d))return new Ym(d)};l.hg=function(b,c){var d=V([],this.Ng,b,c,this);if(m(d)){var e=new Vm(null);Xm(e,d);return e}};l.jg=function(b,c){var d=V([],this.Pg,b,c,this);if(m(d)){var e=new Zm(null);an(e,d);return e}};l.$f=function(b,c){Aq(this.Sg,b,c,this)};l.yf=function(b,c){Aq(this.Lg,b,c,this)};l.ag=function(b,c){Aq(this.Tg,b,c,this)};l.Vd=function(b,c){var d=this.Td(b,c);if(null!=d){var e=new Tm(null);Um(e,"XYZ",d);return e}};
l.zl=function(b,c){var d=V(null,this.Zc,b,c,this);if(null!=d)return d};l.gg=function(b,c){var d=this.Td(b,c);if(m(d)){var e=new Lk(null);Mk(e,"XYZ",d);return e}};l.Wd=function(b,c){var d=V([null],this.fe,b,c,this);if(m(d)&&null!==d[0]){var e=new F(null),f=d[0],g=[f.length],h,k;h=1;for(k=d.length;h<k;++h)ab(f,d[h]),g.push(f.length);$k(e,"XYZ",f,g);return e}};l.Td=function(b,c){return V(null,this.Zc,b,c,this)};l.Og=Object({"http://www.opengis.net/gml":{pointMember:rq(Fq.prototype.$f),pointMembers:rq(Fq.prototype.$f)}});
l.Ng=Object({"http://www.opengis.net/gml":{lineStringMember:rq(Fq.prototype.yf),lineStringMembers:rq(Fq.prototype.yf)}});l.Pg=Object({"http://www.opengis.net/gml":{polygonMember:rq(Fq.prototype.ag),polygonMembers:rq(Fq.prototype.ag)}});l.Sg=Object({"http://www.opengis.net/gml":{Point:rq(Fq.prototype.Td)}});l.Lg=Object({"http://www.opengis.net/gml":{LineString:rq(Fq.prototype.Vd)}});l.Tg=Object({"http://www.opengis.net/gml":{Polygon:rq(Fq.prototype.Wd)}});l.$c=Object({"http://www.opengis.net/gml":{LinearRing:sq(Fq.prototype.zl)}});
l.Ob=function(b,c){var d={featureType:this.featureType,featureNS:this.featureNS};m(c)&&Db(d,Bp(this,b,c));return this.Sd(b,[d])};l.Xd=function(b){return ze(m(this.q)?this.q:b.firstElementChild.getAttribute("srsName"))};function Gq(b){b=Wp(b,!1);return Hq(b)}function Hq(b){if(b=/^\s*(true|1)|(false|0)\s*$/.exec(b))return m(b[1])||!1}function Iq(b){b=Wp(b,!1);if(b=/^\s*(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?))\s*$/.exec(b)){var c=Date.UTC(parseInt(b[1],10),parseInt(b[2],10)-1,parseInt(b[3],10),parseInt(b[4],10),parseInt(b[5],10),parseInt(b[6],10))/1E3;if("Z"!=b[7]){var d="-"==b[8]?-1:1,c=c+60*d*parseInt(b[9],10);m(b[10])&&(c+=3600*d*parseInt(b[10],10))}return c}}
function Jq(b){b=Wp(b,!1);return Kq(b)}function Kq(b){if(b=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(b))return parseFloat(b[1])}function Lq(b){b=Wp(b,!1);return Mq(b)}function Mq(b){if(b=/^\s*(\d+)\s*$/.exec(b))return parseInt(b[1],10)}function W(b){b=Wp(b,!1);return Aa(b)}function Nq(b,c){Oq(b,c?"1":"0")}function Pq(b,c){b.appendChild(Sp.createTextNode(c.toPrecision()))}function Qq(b,c){b.appendChild(Sp.createTextNode(c.toString()))}function Oq(b,c){b.appendChild(Sp.createTextNode(c))};function Rq(b){b=m(b)?b:{};Fq.call(this,b);this.n=m(b.surface)?b.surface:!1;this.f=m(b.curve)?b.curve:!1;this.e=m(b.multiCurve)?b.multiCurve:!0;this.g=m(b.multiSurface)?b.multiSurface:!0;this.schemaLocation=m(b.schemaLocation)?b.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd"}v(Rq,Fq);l=Rq.prototype;l.Cl=function(b,c){var d=V([],this.Mg,b,c,this);if(m(d)){var e=new Vm(null);Xm(e,d);return e}};
l.Dl=function(b,c){var d=V([],this.Qg,b,c,this);if(m(d)){var e=new Zm(null);an(e,d);return e}};l.gf=function(b,c){Aq(this.Ig,b,c,this)};l.vg=function(b,c){Aq(this.Wg,b,c,this)};l.Gl=function(b,c){return V([null],this.Rg,b,c,this)};l.Il=function(b,c){return V([null],this.Vg,b,c,this)};l.Hl=function(b,c){return V([null],this.fe,b,c,this)};l.Bl=function(b,c){return V([null],this.Zc,b,c,this)};l.Ui=function(b,c){var d=V(void 0,this.$c,b,c,this);m(d)&&c[c.length-1].push(d)};
l.sh=function(b,c){var d=V(void 0,this.$c,b,c,this);m(d)&&(c[c.length-1][0]=d)};l.lg=function(b,c){var d=V([null],this.Xg,b,c,this);if(m(d)&&null!==d[0]){var e=new F(null),f=d[0],g=[f.length],h,k;h=1;for(k=d.length;h<k;++h)ab(f,d[h]),g.push(f.length);$k(e,"XYZ",f,g);return e}};l.cg=function(b,c){var d=V([null],this.Jg,b,c,this);if(m(d)){var e=new Tm(null);Um(e,"XYZ",d);return e}};l.yl=function(b,c){var d=V([null],this.Kg,b,c,this);return Vd(d[1][0],d[1][1],d[2][0],d[2][1])};
l.Al=function(b,c){for(var d=Wp(b,!1),e=/^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/,f=[],g;g=e.exec(d);)f.push(parseFloat(g[1])),d=d.substr(g[0].length);if(""===d){d=c[0].srsName;e="enu";null===d||(e=Ce(ze(d)));if("neu"===e)for(d=0,e=f.length;d<e;d+=3)g=f[d],f[d]=f[d+1],f[d+1]=g;d=f.length;2==d&&f.push(0);return 0===d?void 0:f}};
l.He=function(b,c){var d=Wp(b,!1).replace(/^\s*|\s*$/g,""),e=c[0].srsName,f=b.parentNode.getAttribute("srsDimension"),g="enu";null===e||(g=Ce(ze(e)));d=d.split(/\s+/);e=2;fa(b.getAttribute("srsDimension"))?fa(b.getAttribute("dimension"))?null===f||(e=Mq(f)):e=Mq(b.getAttribute("dimension")):e=Mq(b.getAttribute("srsDimension"));for(var h,k,n=[],p=0,q=d.length;p<q;p+=e)f=parseFloat(d[p]),h=parseFloat(d[p+1]),k=3===e?parseFloat(d[p+2]):0,"en"===g.substr(0,2)?n.push(f,h,k):n.push(h,f,k);return n};
l.Zc=Object({"http://www.opengis.net/gml":{pos:sq(Rq.prototype.Al),posList:sq(Rq.prototype.He)}});l.fe=Object({"http://www.opengis.net/gml":{interior:Rq.prototype.Ui,exterior:Rq.prototype.sh}});
l.Te=Object({"http://www.opengis.net/gml":{Point:sq(Fq.prototype.kg),MultiPoint:sq(Fq.prototype.ig),LineString:sq(Fq.prototype.Vd),MultiLineString:sq(Fq.prototype.hg),LinearRing:sq(Fq.prototype.gg),Polygon:sq(Fq.prototype.Wd),MultiPolygon:sq(Fq.prototype.jg),Surface:sq(Rq.prototype.lg),MultiSurface:sq(Rq.prototype.Dl),Curve:sq(Rq.prototype.cg),MultiCurve:sq(Rq.prototype.Cl),Envelope:sq(Rq.prototype.yl)}});l.Mg=Object({"http://www.opengis.net/gml":{curveMember:rq(Rq.prototype.gf),curveMembers:rq(Rq.prototype.gf)}});
l.Qg=Object({"http://www.opengis.net/gml":{surfaceMember:rq(Rq.prototype.vg),surfaceMembers:rq(Rq.prototype.vg)}});l.Ig=Object({"http://www.opengis.net/gml":{LineString:rq(Fq.prototype.Vd),Curve:rq(Rq.prototype.cg)}});l.Wg=Object({"http://www.opengis.net/gml":{Polygon:rq(Fq.prototype.Wd),Surface:rq(Rq.prototype.lg)}});l.Xg=Object({"http://www.opengis.net/gml":{patches:sq(Rq.prototype.Gl)}});l.Jg=Object({"http://www.opengis.net/gml":{segments:sq(Rq.prototype.Il)}});
l.Kg=Object({"http://www.opengis.net/gml":{lowerCorner:rq(Rq.prototype.He),upperCorner:rq(Rq.prototype.He)}});l.Rg=Object({"http://www.opengis.net/gml":{PolygonPatch:sq(Rq.prototype.Hl)}});l.Vg=Object({"http://www.opengis.net/gml":{LineStringSegment:sq(Rq.prototype.Bl)}});function Sq(b,c,d){d=d[d.length-1].srsName;c=c.Q();for(var e=c.length,f=Array(e),g,h=0;h<e;++h){g=c[h];var k=h,n="enu";null!=d&&(n=Ce(ze(d)));f[k]="en"===n.substr(0,2)?g[0]+" "+g[1]:g[1]+" "+g[0]}Oq(b,f.join(" "))}
l.Eg=function(b,c,d){var e=d[d.length-1].srsName;null!=e&&b.setAttribute("srsName",e);e=Vp(b.namespaceURI,"pos");b.appendChild(e);d=d[d.length-1].srsName;b="enu";null!=d&&(b=Ce(ze(d)));c=c.Q();Oq(e,"en"===b.substr(0,2)?c[0]+" "+c[1]:c[1]+" "+c[0])};var Tq={"http://www.opengis.net/gml":{lowerCorner:T(Oq),upperCorner:T(Oq)}};l=Rq.prototype;
l.um=function(b,c,d){var e=d[d.length-1].srsName;m(e)&&b.setAttribute("srsName",e);Bq({node:b},Tq,yq,[c[0]+" "+c[1],c[2]+" "+c[3]],d,["lowerCorner","upperCorner"],this)};l.Bg=function(b,c,d){var e=d[d.length-1].srsName;null!=e&&b.setAttribute("srsName",e);e=Vp(b.namespaceURI,"posList");b.appendChild(e);Sq(e,c,d)};l.Ug=function(b,c){var d=c[c.length-1],e=d.node,f=d.exteriorWritten;m(f)||(d.exteriorWritten=!0);return Vp(e.namespaceURI,m(f)?"interior":"exterior")};
l.ee=function(b,c,d){var e=d[d.length-1].srsName;"PolygonPatch"!==b.nodeName&&null!=e&&b.setAttribute("srsName",e);"Polygon"===b.nodeName||"PolygonPatch"===b.nodeName?(c=c.ld(),Bq({node:b,srsName:e},Uq,this.Ug,c,d,void 0,this)):"Surface"===b.nodeName&&(e=Vp(b.namespaceURI,"patches"),b.appendChild(e),b=Vp(e.namespaceURI,"PolygonPatch"),e.appendChild(b),this.ee(b,c,d))};
l.ae=function(b,c,d){var e=d[d.length-1].srsName;"LineStringSegment"!==b.nodeName&&null!=e&&b.setAttribute("srsName",e);"LineString"===b.nodeName||"LineStringSegment"===b.nodeName?(e=Vp(b.namespaceURI,"posList"),b.appendChild(e),Sq(e,c,d)):"Curve"===b.nodeName&&(e=Vp(b.namespaceURI,"segments"),b.appendChild(e),b=Vp(e.namespaceURI,"LineStringSegment"),e.appendChild(b),this.ae(b,c,d))};
l.Dg=function(b,c,d){var e=d[d.length-1],f=e.srsName,e=e.surface;null!=f&&b.setAttribute("srsName",f);c=c.qd();Bq({node:b,srsName:f,surface:e},Vq,this.d,c,d,void 0,this)};l.ym=function(b,c,d){var e=d[d.length-1].srsName;null!=e&&b.setAttribute("srsName",e);c=c.Gd();Bq({node:b,srsName:e},Wq,wq("pointMember"),c,d,void 0,this)};l.Cg=function(b,c,d){var e=d[d.length-1],f=e.srsName,e=e.curve;null!=f&&b.setAttribute("srsName",f);c=c.Lc();Bq({node:b,srsName:f,curve:e},Xq,this.d,c,d,void 0,this)};
l.Fg=function(b,c,d){var e=Vp(b.namespaceURI,"LinearRing");b.appendChild(e);this.Bg(e,c,d)};l.Gg=function(b,c,d){var e=this.b(c,d);m(e)&&(b.appendChild(e),this.ee(e,c,d))};l.Bm=function(b,c,d){var e=Vp(b.namespaceURI,"Point");b.appendChild(e);this.Eg(e,c,d)};l.Ag=function(b,c,d){var e=this.b(c,d);m(e)&&(b.appendChild(e),this.ae(e,c,d))};
l.de=function(b,c,d){var e=d[d.length-1],f=Bb(e);f.node=b;var g;ga(c)?m(e.dataProjection)?g=Ue(c,e.featureProjection,e.dataProjection):g=c:g=Dp(c,!0,e);Bq(f,Yq,this.b,[g],d,void 0,this)};
l.xg=function(b,c,d){var e=c.aa;m(e)&&b.setAttribute("fid",e);var e=d[d.length-1],f=e.featureNS,g=c.b;m(e.ec)||(e.ec={},e.ec[f]={});var h=c.I();c=[];var k=[],n;for(n in h){var p=h[n];null!==p&&(c.push(n),k.push(p),n==g?n in e.ec[f]||(e.ec[f][n]=T(this.de,this)):n in e.ec[f]||(e.ec[f][n]=T(Oq)))}n=Bb(e);n.node=b;Bq(n,e.ec,wq(void 0,f),k,d,c)};
var Vq={"http://www.opengis.net/gml":{surfaceMember:T(Rq.prototype.Gg),polygonMember:T(Rq.prototype.Gg)}},Wq={"http://www.opengis.net/gml":{pointMember:T(Rq.prototype.Bm)}},Xq={"http://www.opengis.net/gml":{lineStringMember:T(Rq.prototype.Ag),curveMember:T(Rq.prototype.Ag)}},Uq={"http://www.opengis.net/gml":{exterior:T(Rq.prototype.Fg),interior:T(Rq.prototype.Fg)}},Yq={"http://www.opengis.net/gml":{Curve:T(Rq.prototype.ae),MultiCurve:T(Rq.prototype.Cg),Point:T(Rq.prototype.Eg),MultiPoint:T(Rq.prototype.ym),
LineString:T(Rq.prototype.ae),MultiLineString:T(Rq.prototype.Cg),LinearRing:T(Rq.prototype.Bg),Polygon:T(Rq.prototype.ee),MultiPolygon:T(Rq.prototype.Dg),Surface:T(Rq.prototype.ee),MultiSurface:T(Rq.prototype.Dg),Envelope:T(Rq.prototype.um)}},Zq={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"};Rq.prototype.d=function(b,c){return Vp("http://www.opengis.net/gml",Zq[c[c.length-1].node.nodeName])};
Rq.prototype.b=function(b,c){var d=c[c.length-1],e=d.multiSurface,f=d.surface,g=d.curve,d=d.multiCurve,h;ga(b)?h="Envelope":(h=b.O(),"MultiPolygon"===h&&!0===e?h="MultiSurface":"Polygon"===h&&!0===f?h="Surface":"LineString"===h&&!0===g?h="Curve":"MultiLineString"===h&&!0===d&&(h="MultiCurve"));return Vp("http://www.opengis.net/gml",h)};
Rq.prototype.i=function(b,c){c=Cp(this,c);var d=Vp("http://www.opengis.net/gml","geom"),e={node:d,srsName:this.srsName,curve:this.f,surface:this.n,multiSurface:this.g,multiCurve:this.e};m(c)&&Db(e,c);this.de(d,b,[e]);return d};
Rq.prototype.a=function(b,c){c=Cp(this,c);var d=Vp("http://www.opengis.net/gml","featureMembers");oq(d,"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.schemaLocation);var e={srsName:this.srsName,curve:this.f,surface:this.n,multiSurface:this.g,multiCurve:this.e,featureNS:this.featureNS,featureType:this.featureType};m(c)&&Db(e,c);var e=[e],f=e[e.length-1],g=f.featureType,h=f.featureNS,k={};k[h]={};k[h][g]=T(this.xg,this);f=Bb(f);f.node=d;Bq(f,k,wq(g,h),b,e);return d};function $q(b){b=m(b)?b:{};Fq.call(this,b);this.schemaLocation=m(b.schemaLocation)?b.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"}v($q,Fq);l=$q.prototype;
l.fg=function(b,c){var d=Wp(b,!1).replace(/^\s*|\s*$/g,""),e=c[0].srsName,f=b.parentNode.getAttribute("srsDimension"),g="enu";null===e||(g=Ce(ze(e)));d=d.split(/[\s,]+/);e=2;fa(b.getAttribute("srsDimension"))?fa(b.getAttribute("dimension"))?null===f||(e=Mq(f)):e=Mq(b.getAttribute("dimension")):e=Mq(b.getAttribute("srsDimension"));for(var h,k,n=[],p=0,q=d.length;p<q;p+=e)f=parseFloat(d[p]),h=parseFloat(d[p+1]),k=3===e?parseFloat(d[p+2]):0,"en"===g.substr(0,2)?n.push(f,h,k):n.push(h,f,k);return n};
l.xl=function(b,c){var d=V([null],this.Hg,b,c,this);return Vd(d[1][0],d[1][1],d[1][3],d[1][4])};l.Si=function(b,c){var d=V(void 0,this.$c,b,c,this);m(d)&&c[c.length-1].push(d)};l.kl=function(b,c){var d=V(void 0,this.$c,b,c,this);m(d)&&(c[c.length-1][0]=d)};l.Zc=Object({"http://www.opengis.net/gml":{coordinates:sq($q.prototype.fg)}});l.fe=Object({"http://www.opengis.net/gml":{innerBoundaryIs:$q.prototype.Si,outerBoundaryIs:$q.prototype.kl}});l.Hg=Object({"http://www.opengis.net/gml":{coordinates:rq($q.prototype.fg)}});
l.Te=Object({"http://www.opengis.net/gml":{Point:sq(Fq.prototype.kg),MultiPoint:sq(Fq.prototype.ig),LineString:sq(Fq.prototype.Vd),MultiLineString:sq(Fq.prototype.hg),LinearRing:sq(Fq.prototype.gg),Polygon:sq(Fq.prototype.Wd),MultiPolygon:sq(Fq.prototype.jg),Box:sq($q.prototype.xl)}});function ar(b){b=m(b)?b:{};this.defaultDataProjection=null;this.defaultDataProjection=ze("EPSG:4326");this.c=b.readExtensions}v(ar,Cq);var br=[null,"http://www.topografix.com/GPX/1/0","http://www.topografix.com/GPX/1/1"];function cr(b,c,d){b.push(parseFloat(c.getAttribute("lon")),parseFloat(c.getAttribute("lat")));"ele"in d?(b.push(d.ele),yb(d,"ele")):b.push(0);"time"in d?(b.push(d.time),yb(d,"time")):b.push(0);return b}
function dr(b,c){var d=c[c.length-1],e=b.getAttribute("href");null===e||(d.link=e);Aq(er,b,c)}function fr(b,c){c[c.length-1].extensionsNode_=b}function gr(b,c){var d=c[0],e=V({flatCoordinates:[]},hr,b,c);if(m(e)){var f=e.flatCoordinates;yb(e,"flatCoordinates");var g=new Tm(null);Um(g,"XYZM",f);Dp(g,!1,d);d=new O(g);d.C(e);return d}}
function ir(b,c){var d=c[0],e=V({flatCoordinates:[],ends:[]},jr,b,c);if(m(e)){var f=e.flatCoordinates;yb(e,"flatCoordinates");var g=e.ends;yb(e,"ends");var h=new Vm(null);Wm(h,"XYZM",f,g);Dp(h,!1,d);d=new O(h);d.C(e);return d}}function kr(b,c){var d=c[0],e=V({},lr,b,c);if(m(e)){var f=cr([],b,e),f=new Nk(f,"XYZM");Dp(f,!1,d);d=new O(f);d.C(e);return d}}
var mr={rte:gr,trk:ir,wpt:kr},nr=S(br,{rte:rq(gr),trk:rq(ir),wpt:rq(kr)}),er=S(br,{text:P(W,"linkText"),type:P(W,"linkType")}),hr=S(br,{name:P(W),cmt:P(W),desc:P(W),src:P(W),link:dr,number:P(Lq),extensions:fr,type:P(W),rtept:function(b,c){var d=V({},or,b,c);m(d)&&cr(c[c.length-1].flatCoordinates,b,d)}}),or=S(br,{ele:P(Jq),time:P(Iq)}),jr=S(br,{name:P(W),cmt:P(W),desc:P(W),src:P(W),link:dr,number:P(Lq),type:P(W),extensions:fr,trkseg:function(b,c){var d=c[c.length-1];Aq(pr,b,c);d.ends.push(d.flatCoordinates.length)}}),
pr=S(br,{trkpt:function(b,c){var d=V({},qr,b,c);m(d)&&cr(c[c.length-1].flatCoordinates,b,d)}}),qr=S(br,{ele:P(Jq),time:P(Iq)}),lr=S(br,{ele:P(Jq),time:P(Iq),magvar:P(Jq),geoidheight:P(Jq),name:P(W),cmt:P(W),desc:P(W),src:P(W),link:dr,sym:P(W),type:P(W),fix:P(W),sat:P(Lq),hdop:P(Jq),vdop:P(Jq),pdop:P(Jq),ageofdgpsdata:P(Jq),dgpsid:P(Lq),extensions:fr});
function rr(b,c){null===c&&(c=[]);for(var d=0,e=c.length;d<e;++d){var f=c[d];if(m(b.c)){var g=f.get("extensionsNode_")||null;b.c(f,g)}f.set("extensionsNode_",void 0)}}ar.prototype.eg=function(b,c){if(!Wa(br,b.namespaceURI))return null;var d=mr[b.localName];if(!m(d))return null;d=d(b,[Bp(this,b,c)]);if(!m(d))return null;rr(this,[d]);return d};ar.prototype.Ob=function(b,c){if(!Wa(br,b.namespaceURI))return[];if("gpx"==b.localName){var d=V([],nr,b,[Bp(this,b,c)]);if(m(d))return rr(this,d),d}return[]};
function sr(b,c,d){b.setAttribute("href",c);c=d[d.length-1].properties;Bq({node:b},tr,yq,[c.linkText,c.linkType],d,ur)}function vr(b,c,d){var e=d[d.length-1],f=e.node.namespaceURI,g=e.properties;oq(b,null,"lat",c[1]);oq(b,null,"lon",c[0]);switch(e.geometryLayout){case "XYZM":0!==c[3]&&(g.time=c[3]);case "XYZ":0!==c[2]&&(g.ele=c[2]);break;case "XYM":0!==c[2]&&(g.time=c[2])}c=wr[f];e=zq(g,c);Bq({node:b,properties:g},xr,yq,e,d,c)}
var ur=["text","type"],tr=uq(br,{text:T(Oq),type:T(Oq)}),yr=uq(br,"name cmt desc src link number type rtept".split(" ")),zr=uq(br,{name:T(Oq),cmt:T(Oq),desc:T(Oq),src:T(Oq),link:T(sr),number:T(Qq),type:T(Oq),rtept:vq(T(vr))}),Ar=uq(br,"name cmt desc src link number type trkseg".split(" ")),Dr=uq(br,{name:T(Oq),cmt:T(Oq),desc:T(Oq),src:T(Oq),link:T(sr),number:T(Qq),type:T(Oq),trkseg:vq(T(function(b,c,d){Bq({node:b,geometryLayout:c.a,properties:{}},Br,Cr,c.Q(),d)}))}),Cr=wq("trkpt"),Br=uq(br,{trkpt:T(vr)}),
wr=uq(br,"ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),xr=uq(br,{ele:T(Pq),time:T(function(b,c){var d=new Date(1E3*c),d=d.getUTCFullYear()+"-"+Ka(d.getUTCMonth()+1)+"-"+Ka(d.getUTCDate())+"T"+Ka(d.getUTCHours())+":"+Ka(d.getUTCMinutes())+":"+Ka(d.getUTCSeconds())+"Z";b.appendChild(Sp.createTextNode(d))}),magvar:T(Pq),geoidheight:T(Pq),name:T(Oq),cmt:T(Oq),desc:T(Oq),src:T(Oq),link:T(sr),sym:T(Oq),type:T(Oq),fix:T(Oq),sat:T(Qq),
hdop:T(Pq),vdop:T(Pq),pdop:T(Pq),ageofdgpsdata:T(Pq),dgpsid:T(Qq)}),Er={Point:"wpt",LineString:"rte",MultiLineString:"trk"};function Fr(b,c){var d=b.R();if(m(d))return Vp(c[c.length-1].node.namespaceURI,Er[d.O()])}
var Gr=uq(br,{rte:T(function(b,c,d){var e=d[0],f=c.I();b={node:b,properties:f};c=c.R();m(c)&&(c=Dp(c,!0,e),b.geometryLayout=c.a,f.rtept=c.Q());e=yr[d[d.length-1].node.namespaceURI];f=zq(f,e);Bq(b,zr,yq,f,d,e)}),trk:T(function(b,c,d){var e=d[0],f=c.I();b={node:b,properties:f};c=c.R();m(c)&&(c=Dp(c,!0,e),f.trkseg=c.Lc());e=Ar[d[d.length-1].node.namespaceURI];f=zq(f,e);Bq(b,Dr,yq,f,d,e)}),wpt:T(function(b,c,d){var e=d[0],f=d[d.length-1];f.properties=c.I();c=c.R();m(c)&&(c=Dp(c,!0,e),f.geometryLayout=
c.a,vr(b,c.Q(),d))})});ar.prototype.a=function(b,c){c=Cp(this,c);var d=Vp("http://www.topografix.com/GPX/1/1","gpx");Bq({node:d},Gr,Fr,b,[c]);return d};function Hr(b){b=Ir(b);return Sa(b,function(b){return b.b.substring(b.c,b.a)})}function Jr(b,c,d){this.b=b;this.c=c;this.a=d}function Ir(b){for(var c=RegExp("\r\n|\r|\n","g"),d=0,e,f=[];e=c.exec(b);)d=new Jr(b,d,e.index),f.push(d),d=c.lastIndex;d<b.length&&(d=new Jr(b,d,b.length),f.push(d));return f};function Kr(){this.defaultDataProjection=null}v(Kr,Ap);l=Kr.prototype;l.O=function(){return"text"};l.Nb=function(b,c){return this.Qc(ia(b)?b:"",Cp(this,c))};l.ma=function(b,c){return this.Ge(ia(b)?b:"",Cp(this,c))};l.Rc=function(b,c){return this.Sc(ia(b)?b:"",Cp(this,c))};l.Ja=function(){return this.defaultDataProjection};l.be=function(b,c){return this.ce(b,Cp(this,c))};l.Qb=function(b,c){return this.yg(b,Cp(this,c))};l.Xc=function(b,c){return this.Yc(b,Cp(this,c))};function Lr(b){b=m(b)?b:{};this.defaultDataProjection=null;this.defaultDataProjection=ze("EPSG:4326");this.a=m(b.altitudeMode)?b.altitudeMode:"none"}v(Lr,Kr);var Mr=/^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,Nr=/^H.([A-Z]{3}).*?:(.*)/,Or=/^HFDTE(\d{2})(\d{2})(\d{2})/;
Lr.prototype.Qc=function(b,c){var d=this.a,e=Hr(b),f={},g=[],h=2E3,k=0,n=1,p,q;p=0;for(q=e.length;p<q;++p){var r=e[p],s;if("B"==r.charAt(0)){if(s=Mr.exec(r)){var r=parseInt(s[1],10),u=parseInt(s[2],10),y=parseInt(s[3],10),z=parseInt(s[4],10)+parseInt(s[5],10)/6E4;"S"==s[6]&&(z=-z);var A=parseInt(s[7],10)+parseInt(s[8],10)/6E4;"W"==s[9]&&(A=-A);g.push(A,z);"none"!=d&&g.push("gps"==d?parseInt(s[11],10):"barometric"==d?parseInt(s[12],10):0);g.push(Date.UTC(h,k,n,r,u,y)/1E3)}}else if("H"==r.charAt(0))if(s=
Or.exec(r))n=parseInt(s[1],10),k=parseInt(s[2],10)-1,h=2E3+parseInt(s[3],10);else if(s=Nr.exec(r))f[s[1]]=Aa(s[2]),Or.exec(r)}if(0===g.length)return null;e=new Tm(null);Um(e,"none"==d?"XYM":"XYZM",g);d=new O(Dp(e,!1,c));d.C(f);return d};Lr.prototype.Ge=function(b,c){var d=this.Qc(b,c);return null===d?[]:[d]};var Pr=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function Qr(b){if(Rr){Rr=!1;var c=ba.location;if(c){var d=c.href;if(d&&(d=(d=Qr(d)[3]||null)?decodeURI(d):d)&&d!=c.hostname)throw Rr=!0,Error();}}return b.match(Pr)}var Rr=Ib;
function Sr(b,c){for(var d=b.split("&"),e=0;e<d.length;e++){var f=d[e].indexOf("="),g=null,h=null;0<=f?(g=d[e].substring(0,f),h=d[e].substring(f+1)):g=d[e];c(g,h?decodeURIComponent(h.replace(/\+/g," ")):"")}}function Tr(b){if(b[1]){var c=b[0],d=c.indexOf("#");0<=d&&(b.push(c.substr(d)),b[0]=c=c.substr(0,d));d=c.indexOf("?");0>d?b[1]="?":d==c.length-1&&(b[1]=void 0)}return b.join("")}
function Ur(b,c,d){if(ga(c))for(var e=0;e<c.length;e++)Ur(b,String(c[e]),d);else null!=c&&d.push("&",b,""===c?"":"=",encodeURIComponent(String(c)))}function Vr(b,c){for(var d in c)Ur(d,c[d],b);return b};function Wr(b,c){var d;b instanceof Wr?(this.Yb=m(c)?c:b.Yb,Xr(this,b.Pb),this.gc=b.gc,this.sb=b.sb,Yr(this,b.tc),this.rb=b.rb,Zr(this,b.a.clone()),this.Sb=b.Sb):b&&(d=Qr(String(b)))?(this.Yb=!!c,Xr(this,d[1]||"",!0),this.gc=$r(d[2]||""),this.sb=$r(d[3]||"",!0),Yr(this,d[4]),this.rb=$r(d[5]||"",!0),Zr(this,d[6]||"",!0),this.Sb=$r(d[7]||"")):(this.Yb=!!c,this.a=new as(null,0,this.Yb))}l=Wr.prototype;l.Pb="";l.gc="";l.sb="";l.tc=null;l.rb="";l.Sb="";l.Yb=!1;
l.toString=function(){var b=[],c=this.Pb;c&&b.push(bs(c,cs,!0),":");if(c=this.sb){b.push("//");var d=this.gc;d&&b.push(bs(d,cs,!0),"@");b.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1"));c=this.tc;null!=c&&b.push(":",String(c))}if(c=this.rb)this.sb&&"/"!=c.charAt(0)&&b.push("/"),b.push(bs(c,"/"==c.charAt(0)?ds:es,!0));(c=this.a.toString())&&b.push("?",c);(c=this.Sb)&&b.push("#",bs(c,fs));return b.join("")};l.clone=function(){return new Wr(this)};
function Xr(b,c,d){b.Pb=d?$r(c,!0):c;b.Pb&&(b.Pb=b.Pb.replace(/:$/,""))}function Yr(b,c){if(c){c=Number(c);if(isNaN(c)||0>c)throw Error("Bad port number "+c);b.tc=c}else b.tc=null}function Zr(b,c,d){c instanceof as?(b.a=c,gs(b.a,b.Yb)):(d||(c=bs(c,hs)),b.a=new as(c,0,b.Yb))}function is(b){return b instanceof Wr?b.clone():new Wr(b,void 0)}
function js(b,c){b instanceof Wr||(b=is(b));c instanceof Wr||(c=is(c));var d=b,e=c,f=d.clone(),g=!!e.Pb;g?Xr(f,e.Pb):g=!!e.gc;g?f.gc=e.gc:g=!!e.sb;g?f.sb=e.sb:g=null!=e.tc;var h=e.rb;if(g)Yr(f,e.tc);else if(g=!!e.rb)if("/"!=h.charAt(0)&&(d.sb&&!d.rb?h="/"+h:(d=f.rb.lastIndexOf("/"),-1!=d&&(h=f.rb.substr(0,d+1)+h))),d=h,".."==d||"."==d)h="";else if(-1!=d.indexOf("./")||-1!=d.indexOf("/.")){for(var h=0==d.lastIndexOf("/",0),d=d.split("/"),k=[],n=0;n<d.length;){var p=d[n++];"."==p?h&&n==d.length&&k.push(""):
".."==p?((1<k.length||1==k.length&&""!=k[0])&&k.pop(),h&&n==d.length&&k.push("")):(k.push(p),h=!0)}h=k.join("/")}else h=d;g?f.rb=h:g=""!==e.a.toString();g?Zr(f,$r(e.a.toString())):g=!!e.Sb;g&&(f.Sb=e.Sb);return f}function $r(b,c){return b?c?decodeURI(b):decodeURIComponent(b):""}function bs(b,c,d){return ia(b)?(b=encodeURI(b).replace(c,ks),d&&(b=b.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),b):null}function ks(b){b=b.charCodeAt(0);return"%"+(b>>4&15).toString(16)+(b&15).toString(16)}
var cs=/[#\/\?@]/g,es=/[\#\?:]/g,ds=/[\#\?]/g,hs=/[\#\?@]/g,fs=/#/g;function as(b,c,d){this.a=b||null;this.c=!!d}function ls(b){b.ga||(b.ga=new Th,b.ya=0,b.a&&Sr(b.a,function(c,d){b.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}l=as.prototype;l.ga=null;l.ya=null;l.Tb=function(){ls(this);return this.ya};l.add=function(b,c){ls(this);this.a=null;b=ms(this,b);var d=this.ga.get(b);d||this.ga.set(b,d=[]);d.push(c);this.ya++;return this};
l.remove=function(b){ls(this);b=ms(this,b);return Vh(this.ga.c,b)?(this.a=null,this.ya-=this.ga.get(b).length,this.ga.remove(b)):!1};l.clear=function(){this.ga=this.a=null;this.ya=0};l.la=function(){ls(this);return 0==this.ya};function ns(b,c){ls(b);c=ms(b,c);return Vh(b.ga.c,c)}l.G=function(){ls(this);for(var b=this.ga.ob(),c=this.ga.G(),d=[],e=0;e<c.length;e++)for(var f=b[e],g=0;g<f.length;g++)d.push(c[e]);return d};
l.ob=function(b){ls(this);var c=[];if(ia(b))ns(this,b)&&(c=Ya(c,this.ga.get(ms(this,b))));else{b=this.ga.ob();for(var d=0;d<b.length;d++)c=Ya(c,b[d])}return c};l.set=function(b,c){ls(this);this.a=null;b=ms(this,b);ns(this,b)&&(this.ya-=this.ga.get(b).length);this.ga.set(b,[c]);this.ya++;return this};l.get=function(b,c){var d=b?this.ob(b):[];return 0<d.length?String(d[0]):c};function os(b,c,d){b.remove(c);0<d.length&&(b.a=null,b.ga.set(ms(b,c),Za(d)),b.ya+=d.length)}
l.toString=function(){if(this.a)return this.a;if(!this.ga)return"";for(var b=[],c=this.ga.G(),d=0;d<c.length;d++)for(var e=c[d],f=encodeURIComponent(String(e)),e=this.ob(e),g=0;g<e.length;g++){var h=f;""!==e[g]&&(h+="="+encodeURIComponent(String(e[g])));b.push(h)}return this.a=b.join("&")};l.clone=function(){var b=new as;b.a=this.a;this.ga&&(b.ga=this.ga.clone(),b.ya=this.ya);return b};function ms(b,c){var d=String(c);b.c&&(d=d.toLowerCase());return d}
function gs(b,c){c&&!b.c&&(ls(b),b.a=null,b.ga.forEach(function(b,c){var f=c.toLowerCase();c!=f&&(this.remove(c),os(this,f,b))},b));b.c=c};function ps(b){b=m(b)?b:{};this.d=b.font;this.f=b.rotation;this.c=b.scale;this.b=b.text;this.g=b.textAlign;this.n=b.textBaseline;this.a=m(b.fill)?b.fill:null;this.e=m(b.stroke)?b.stroke:null;this.i=m(b.offsetX)?b.offsetX:0;this.k=m(b.offsetY)?b.offsetY:0}l=ps.prototype;l.Fh=function(){return this.d};l.Vh=function(){return this.i};l.Wh=function(){return this.k};l.Vk=function(){return this.a};l.Wk=function(){return this.f};l.Xk=function(){return this.c};l.Yk=function(){return this.e};l.Zk=function(){return this.b};
l.di=function(){return this.g};l.ei=function(){return this.n};l.Xl=function(b){this.d=b};l.Wl=function(b){this.a=b};l.$k=function(b){this.f=b};l.al=function(b){this.c=b};l.em=function(b){this.e=b};l.fm=function(b){this.b=b};l.gm=function(b){this.g=b};l.hm=function(b){this.n=b};function qs(b){function c(b){return ga(b)?b:ia(b)?(!(b in e)&&"#"+b in e&&(b="#"+b),c(e[b])):d}b=m(b)?b:{};this.defaultDataProjection=null;this.defaultDataProjection=ze("EPSG:4326");var d=m(b.defaultStyle)?b.defaultStyle:rs,e={};this.b=m(b.extractStyles)?b.extractStyles:!0;this.c=e;this.d=function(){var b=this.get("Style");if(m(b))return b;b=this.get("styleUrl");return m(b)?c(b):d}}v(qs,Cq);
var ss=["http://www.google.com/kml/ext/2.2"],ts=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],us=[255,255,255,1],vs=new ul({color:us}),ws=[20,2],xs=[64,64],ys=new Aj({anchor:ws,anchorOrigin:"bottom-left",anchorXUnits:"pixels",anchorYUnits:"pixels",crossOrigin:"anonymous",rotation:0,scale:.5,size:xs,src:"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"}),zs=new ql({color:us,width:1}),As=new ps({font:"normal 16px Helvetica",
fill:vs,stroke:zs,scale:1}),rs=[new wl({fill:vs,image:ys,text:As,stroke:zs,zIndex:0})],Bs={fraction:"fraction",pixels:"pixels"};function Cs(b){b=Wp(b,!1);if(b=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(b))return b=b[1],[parseInt(b.substr(6,2),16),parseInt(b.substr(4,2),16),parseInt(b.substr(2,2),16),parseInt(b.substr(0,2),16)/255]}
function Ds(b){b=Wp(b,!1);for(var c=[],d=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,e;e=d.exec(b);)c.push(parseFloat(e[1]),parseFloat(e[2]),e[3]?parseFloat(e[3]):0),b=b.substr(e[0].length);return""!==b?void 0:c}function Es(b){var c=Wp(b,!1);return null!=b.baseURI?js(b.baseURI,Aa(c)).toString():Aa(c)}function Fs(b){b=Jq(b);if(m(b))return Math.sqrt(b)}function Gs(b,c){return V(null,Hs,b,c)}
function Is(b,c){var d=V({j:[],wg:[]},Js,b,c);if(m(d)){var e=d.j,d=d.wg,f,g;f=0;for(g=Math.min(e.length,d.length);f<g;++f)e[4*f+3]=d[f];d=new Tm(null);Um(d,"XYZM",e);return d}}function Ks(b,c){var d=V(null,Ls,b,c);if(m(d)){var e=new Tm(null);Um(e,"XYZ",d);return e}}function Ms(b,c){var d=V(null,Ls,b,c);if(m(d)){var e=new F(null);$k(e,"XYZ",d,[d.length]);return e}}
function Ns(b,c){var d=V([],Os,b,c);if(!m(d))return null;if(0===d.length)return new Mm(d);var e=!0,f=d[0].O(),g,h,k;h=1;for(k=d.length;h<k;++h)if(g=d[h],g.O()!=f){e=!1;break}if(e){if("Point"==f){g=d[0];e=g.a;f=g.j;h=1;for(k=d.length;h<k;++h)g=d[h],ab(f,g.j);d=new Ym(null);tk(d,e,f);d.l();return d}return"LineString"==f?(g=new Vm(null),Xm(g,d),g):"Polygon"==f?(g=new Zm(null),an(g,d),g):"GeometryCollection"==f?new Mm(d):null}return new Mm(d)}
function Ps(b,c){var d=V(null,Ls,b,c);if(null!=d){var e=new Nk(null);Ok(e,"XYZ",d);return e}}function Qs(b,c){var d=V([null],Rs,b,c);if(null!=d&&null!==d[0]){var e=new F(null),f=d[0],g=[f.length],h,k;h=1;for(k=d.length;h<k;++h)ab(f,d[h]),g.push(f.length);$k(e,"XYZ",f,g);return e}}
function Ss(b,c){var d=V({},Ts,b,c);if(!m(d))return null;var e=zb(d,"fillStyle",vs),f=d.fill;m(f)&&!f&&(e=null);var f=zb(d,"imageStyle",ys),g=zb(d,"textStyle",As),h=zb(d,"strokeStyle",zs),d=d.outline;m(d)&&!d&&(h=null);return[new wl({fill:e,image:f,stroke:h,text:g,zIndex:void 0})]}function Us(b,c){Aq(Vs,b,c)}
var Ws=S(ts,{value:sq(W)}),Vs=S(ts,{Data:function(b,c){var d=b.getAttribute("name");if(null!==d){var e=V(void 0,Ws,b,c);m(e)&&(c[c.length-1][d]=e)}},SchemaData:function(b,c){Aq(Xs,b,c)}}),Hs=S(ts,{coordinates:sq(Ds)}),Rs=S(ts,{innerBoundaryIs:function(b,c){var d=V(void 0,Ys,b,c);m(d)&&c[c.length-1].push(d)},outerBoundaryIs:function(b,c){var d=V(void 0,Zs,b,c);m(d)&&(c[c.length-1][0]=d)}}),Js=S(ts,{when:function(b,c){var d=c[c.length-1].wg,e=Wp(b,!1);if(e=/^\s*(\d{4})($|-(\d{2})($|-(\d{2})($|T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?)))))\s*$/.exec(e)){var f=
Date.UTC(parseInt(e[1],10),m(e[3])?parseInt(e[3],10)-1:0,m(e[5])?parseInt(e[5],10):1,m(e[7])?parseInt(e[7],10):0,m(e[8])?parseInt(e[8],10):0,m(e[9])?parseInt(e[9],10):0);if(m(e[10])&&"Z"!=e[10]){var g="-"==e[11]?-1:1,f=f+60*g*parseInt(e[12],10);m(e[13])&&(f+=3600*g*parseInt(e[13],10))}d.push(f)}else d.push(0)}},S(ss,{coord:function(b,c){var d=c[c.length-1].j,e=Wp(b,!1);(e=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(e))?
d.push(parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3]),0):d.push(0,0,0,0)}})),Ls=S(ts,{coordinates:sq(Ds)}),$s=S(ts,{href:P(Es)},S(ss,{x:P(Jq),y:P(Jq),w:P(Jq),h:P(Jq)})),at=S(ts,{Icon:P(function(b,c){var d=V({},$s,b,c);return m(d)?d:null}),heading:P(Jq),hotSpot:P(function(b){var c=b.getAttribute("xunits"),d=b.getAttribute("yunits");return{x:parseFloat(b.getAttribute("x")),Qe:Bs[c],y:parseFloat(b.getAttribute("y")),Re:Bs[d]}}),scale:P(Fs)}),Ys=S(ts,{LinearRing:sq(Gs)}),bt=S(ts,{color:P(Cs),scale:P(Fs)}),
ct=S(ts,{color:P(Cs),width:P(Jq)}),Os=S(ts,{LineString:rq(Ks),LinearRing:rq(Ms),MultiGeometry:rq(Ns),Point:rq(Ps),Polygon:rq(Qs)}),dt=S(ss,{Track:rq(Is)}),ft=S(ts,{ExtendedData:Us,Link:function(b,c){Aq(et,b,c)},address:P(W),description:P(W),name:P(W),open:P(Gq),phoneNumber:P(W),visibility:P(Gq)}),et=S(ts,{href:P(Es)}),Zs=S(ts,{LinearRing:sq(Gs)}),gt=S(ts,{Style:P(Ss),key:P(W),styleUrl:P(function(b){var c=Aa(Wp(b,!1));return null!=b.baseURI?js(b.baseURI,c).toString():c})}),it=S(ts,{ExtendedData:Us,
MultiGeometry:P(Ns,"geometry"),LineString:P(Ks,"geometry"),LinearRing:P(Ms,"geometry"),Point:P(Ps,"geometry"),Polygon:P(Qs,"geometry"),Style:P(Ss),StyleMap:function(b,c){var d=V(void 0,ht,b,c);if(m(d)){var e=c[c.length-1];ga(d)?e.Style=d:ia(d)&&(e.styleUrl=d)}},address:P(W),description:P(W),name:P(W),open:P(Gq),phoneNumber:P(W),styleUrl:P(Es),visibility:P(Gq)},S(ss,{MultiTrack:P(function(b,c){var d=V([],dt,b,c);if(m(d)){var e=new Vm(null);Xm(e,d);return e}},"geometry"),Track:P(Is,"geometry")})),jt=
S(ts,{color:P(Cs),fill:P(Gq),outline:P(Gq)}),Xs=S(ts,{SimpleData:function(b,c){var d=b.getAttribute("name");if(null!==d){var e=W(b);c[c.length-1][d]=e}}}),Ts=S(ts,{IconStyle:function(b,c){var d=V({},at,b,c);if(m(d)){var e=c[c.length-1],f=zb(d,"Icon",{}),g;g=f.href;g=m(g)?g:"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png";var h,k,n,p=d.hotSpot;m(p)?(h=[p.x,p.y],k=p.Qe,n=p.Re):"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"===g?(h=ws,n=k="pixels"):/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(g)&&
(h=[.5,0],n=k="fraction");var q,p=f.x,r=f.y;m(p)&&m(r)&&(q=[p,r]);var s,p=f.w,f=f.h;m(p)&&m(f)&&(s=[p,f]);var u,f=d.heading;m(f)&&(u=Yb(f));d=d.scale;"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"==g&&(s=xs);h=new Aj({anchor:h,anchorOrigin:"bottom-left",anchorXUnits:k,anchorYUnits:n,crossOrigin:"anonymous",offset:q,offsetOrigin:"bottom-left",rotation:u,scale:d,size:s,src:g});e.imageStyle=h}},LabelStyle:function(b,c){var d=V({},bt,b,c);m(d)&&(c[c.length-1].textStyle=new ps({fill:new ul({color:zb(d,
"color",us)}),scale:d.scale}))},LineStyle:function(b,c){var d=V({},ct,b,c);m(d)&&(c[c.length-1].strokeStyle=new ql({color:zb(d,"color",us),width:zb(d,"width",1)}))},PolyStyle:function(b,c){var d=V({},jt,b,c);if(m(d)){var e=c[c.length-1];e.fillStyle=new ul({color:zb(d,"color",us)});var f=d.fill;m(f)&&(e.fill=f);d=d.outline;m(d)&&(e.outline=d)}}}),ht=S(ts,{Pair:function(b,c){var d=V({},gt,b,c);if(m(d)){var e=d.key;m(e)&&"normal"==e&&(e=d.styleUrl,m(e)&&(c[c.length-1]=e),d=d.Style,m(d)&&(c[c.length-
1]=d))}}});l=qs.prototype;l.dg=function(b,c){$p(b);var d=S(ts,{Folder:qq(this.dg,this),Placemark:rq(this.Ie,this),Style:ra(this.Kl,this),StyleMap:ra(this.Jl,this)}),d=V([],d,b,c,this);if(m(d))return d};l.Ie=function(b,c){var d=V({geometry:null},it,b,c);if(m(d)){var e=new O,f=b.getAttribute("id");null===f||e.d(f);f=c[0];null!=d.geometry&&Dp(d.geometry,!1,f);e.C(d);this.b&&e.i(this.d);return e}};
l.Kl=function(b,c){var d=b.getAttribute("id");if(null!==d){var e=Ss(b,c);m(e)&&(d=null!=b.baseURI?js(b.baseURI,"#"+d).toString():"#"+d,this.c[d]=e)}};l.Jl=function(b,c){var d=b.getAttribute("id");if(null!==d){var e=V(void 0,ht,b,c);m(e)&&(d=null!=b.baseURI?js(b.baseURI,"#"+d).toString():"#"+d,this.c[d]=e)}};l.eg=function(b,c){if(!Wa(ts,b.namespaceURI))return null;var d=this.Ie(b,[Bp(this,b,c)]);return m(d)?d:null};
l.Ob=function(b,c){if(!Wa(ts,b.namespaceURI))return[];var d;d=$p(b);if("Document"==d||"Folder"==d)return d=this.dg(b,[Bp(this,b,c)]),m(d)?d:[];if("Placemark"==d)return d=this.Ie(b,[Bp(this,b,c)]),m(d)?[d]:[];if("kml"==d){d=[];var e;for(e=b.firstElementChild;null!==e;e=e.nextElementSibling){var f=this.Ob(e,c);m(f)&&ab(d,f)}return d}return[]};l.El=function(b){if(cq(b))return kt(this,b);if(fq(b))return lt(this,b);if(ia(b))return b=pq(b),kt(this,b)};
function kt(b,c){var d;for(d=c.firstChild;null!==d;d=d.nextSibling)if(1==d.nodeType){var e=lt(b,d);if(m(e))return e}}function lt(b,c){var d;for(d=c.firstElementChild;null!==d;d=d.nextElementSibling)if(Wa(ts,d.namespaceURI)&&"name"==d.localName)return W(d);for(d=c.firstElementChild;null!==d;d=d.nextElementSibling){var e=$p(d);if(Wa(ts,d.namespaceURI)&&("Document"==e||"Folder"==e||"Placemark"==e||"kml"==e)&&(e=lt(b,d),m(e)))return e}}
l.Fl=function(b){var c=[];cq(b)?ab(c,mt(this,b)):fq(b)?ab(c,nt(this,b)):ia(b)&&(b=pq(b),ab(c,mt(this,b)));return c};function mt(b,c){var d,e=[];for(d=c.firstChild;null!==d;d=d.nextSibling)1==d.nodeType&&ab(e,nt(b,d));return e}
function nt(b,c){var d,e=[];for(d=c.firstElementChild;null!==d;d=d.nextElementSibling)if(Wa(ts,d.namespaceURI)&&"NetworkLink"==d.localName){var f=V({},ft,d,[]);e.push(f)}for(d=c.firstElementChild;null!==d;d=d.nextElementSibling)f=$p(d),!Wa(ts,d.namespaceURI)||"Document"!=f&&"Folder"!=f&&"kml"!=f||ab(e,nt(b,d));return e}function ot(b,c){var d=qg(c),d=[255*(4==d.length?d[3]:1),d[2],d[1],d[0]],e;for(e=0;4>e;++e){var f=parseInt(d[e],10).toString(16);d[e]=1==f.length?"0"+f:f}Oq(b,d.join(""))}
function pt(b,c,d){Bq({node:b},qt,rt,[c],d)}function st(b,c,d){var e={node:b};null!=c.aa&&b.setAttribute("id",c.aa);b=c.I();var f=c.a;m(f)&&(f=f.call(c,0),null!==f&&0<f.length&&(b.Style=f[0],f=f[0].c,null===f||(b.name=f.b)));f=tt[d[d.length-1].node.namespaceURI];b=zq(b,f);Bq(e,ut,yq,b,d,f);b=d[0];c=c.R();null!=c&&(c=Dp(c,!0,b));Bq(e,ut,vt,[c],d)}function wt(b,c,d){var e=c.j;b={node:b};b.layout=c.a;b.stride=c.B;Bq(b,xt,yt,[e],d)}
function zt(b,c,d){c=c.ld();var e=c.shift();b={node:b};Bq(b,At,Bt,c,d);Bq(b,At,Ct,[e],d)}function Dt(b,c){Pq(b,c*c)}
var Et=uq(ts,["Document","Placemark"]),Ht=uq(ts,{Document:T(function(b,c,d){Bq({node:b},Ft,Gt,c,d)}),Placemark:T(st)}),Ft=uq(ts,{Placemark:T(st)}),It={Point:"Point",LineString:"LineString",LinearRing:"LinearRing",Polygon:"Polygon",MultiPoint:"MultiGeometry",MultiLineString:"MultiGeometry",MultiPolygon:"MultiGeometry"},Jt=uq(ts,["href"],uq(ss,["x","y","w","h"])),Kt=uq(ts,{href:T(Oq)},uq(ss,{x:T(Pq),y:T(Pq),w:T(Pq),h:T(Pq)})),Lt=uq(ts,["scale","heading","Icon","hotSpot"]),Nt=uq(ts,{Icon:T(function(b,
c,d){b={node:b};var e=Jt[d[d.length-1].node.namespaceURI],f=zq(c,e);Bq(b,Kt,yq,f,d,e);e=Jt[ss[0]];f=zq(c,e);Bq(b,Kt,Mt,f,d,e)}),heading:T(Pq),hotSpot:T(function(b,c){b.setAttribute("x",c.x);b.setAttribute("y",c.y);b.setAttribute("xunits",c.Qe);b.setAttribute("yunits",c.Re)}),scale:T(Dt)}),Ot=uq(ts,["color","scale"]),Pt=uq(ts,{color:T(ot),scale:T(Dt)}),Qt=uq(ts,["color","width"]),Rt=uq(ts,{color:T(ot),width:T(Pq)}),qt=uq(ts,{LinearRing:T(wt)}),St=uq(ts,{LineString:T(wt),Point:T(wt),Polygon:T(zt)}),
tt=uq(ts,"name open visibility address phoneNumber description styleUrl Style".split(" ")),ut=uq(ts,{MultiGeometry:T(function(b,c,d){b={node:b};var e=c.O(),f,g;"MultiPoint"==e?(f=c.Gd(),g=Tt):"MultiLineString"==e?(f=c.Lc(),g=Ut):"MultiPolygon"==e&&(f=c.qd(),g=Vt);Bq(b,St,g,f,d)}),LineString:T(wt),LinearRing:T(wt),Point:T(wt),Polygon:T(zt),Style:T(function(b,c,d){b={node:b};var e={},f=c.f,g=c.b,h=c.e;c=c.c;null===h||(e.IconStyle=h);null===c||(e.LabelStyle=c);null===g||(e.LineStyle=g);null===f||(e.PolyStyle=
f);c=Wt[d[d.length-1].node.namespaceURI];e=zq(e,c);Bq(b,Xt,yq,e,d,c)}),address:T(Oq),description:T(Oq),name:T(Oq),open:T(Nq),phoneNumber:T(Oq),styleUrl:T(Oq),visibility:T(Nq)}),xt=uq(ts,{coordinates:T(function(b,c,d){d=d[d.length-1];var e=d.layout;d=d.stride;var f;"XY"==e||"XYM"==e?f=2:("XYZ"==e||"XYZM"==e)&&(f=3);var g,h=c.length,k="";if(0<h){k+=c[0];for(e=1;e<f;++e)k+=","+c[e];for(g=d;g<h;g+=d)for(k+=" "+c[g],e=1;e<f;++e)k+=","+c[g+e]}Oq(b,k)})}),At=uq(ts,{outerBoundaryIs:T(pt),innerBoundaryIs:T(pt)}),
Yt=uq(ts,{color:T(ot)}),Wt=uq(ts,["IconStyle","LabelStyle","LineStyle","PolyStyle"]),Xt=uq(ts,{IconStyle:T(function(b,c,d){b={node:b};var e={},f=c.gb(),g=c.kd(),h={href:c.a.e};if(null!==f){h.w=f[0];h.h=f[1];var k=c.wb(),n=c.Cb();null!==n&&null!==g&&0!==n[0]&&n[1]!==f[1]&&(h.x=n[0],h.y=g[1]-(n[1]+f[1]));null===k||0===k[0]||k[1]===f[1]||(e.hotSpot={x:k[0],Qe:"pixels",y:f[1]-k[1],Re:"pixels"})}e.Icon=h;f=c.k;1!==f&&(e.scale=f);c=c.i;0!==c&&(e.heading=c);c=Lt[d[d.length-1].node.namespaceURI];e=zq(e,c);
Bq(b,Nt,yq,e,d,c)}),LabelStyle:T(function(b,c,d){b={node:b};var e={},f=c.a;null===f||(e.color=f.a);c=c.c;m(c)&&1!==c&&(e.scale=c);c=Ot[d[d.length-1].node.namespaceURI];e=zq(e,c);Bq(b,Pt,yq,e,d,c)}),LineStyle:T(function(b,c,d){b={node:b};var e=Qt[d[d.length-1].node.namespaceURI];c=zq({color:c.a,width:c.c},e);Bq(b,Rt,yq,c,d,e)}),PolyStyle:T(function(b,c,d){Bq({node:b},Yt,Zt,[c.a],d)})});function Mt(b,c,d){return Vp(ss[0],"gx:"+d)}
function Gt(b,c){return Vp(c[c.length-1].node.namespaceURI,"Placemark")}function vt(b,c){if(null!=b)return Vp(c[c.length-1].node.namespaceURI,It[b.O()])}var Zt=wq("color"),yt=wq("coordinates"),Bt=wq("innerBoundaryIs"),Tt=wq("Point"),Ut=wq("LineString"),rt=wq("LinearRing"),Vt=wq("Polygon"),Ct=wq("outerBoundaryIs");
qs.prototype.a=function(b,c){c=Cp(this,c);var d=Vp(ts[4],"kml");oq(d,"http://www.w3.org/2000/xmlns/","xmlns:gx",ss[0]);oq(d,"http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");oq(d,"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");var e={node:d},f={};1<b.length?f.Document=b:1==b.length&&(f.Placemark=b[0]);var g=Et[d.namespaceURI],f=zq(f,g);Bq(e,Ht,yq,f,[c],g);
return d};function $t(){this.defaultDataProjection=null;this.defaultDataProjection=ze("EPSG:4326")}v($t,Cq);function au(b,c){c[c.length-1].Vc[b.getAttribute("k")]=b.getAttribute("v")}
var bu=[null],cu=S(bu,{nd:function(b,c){c[c.length-1].rc.push(b.getAttribute("ref"))},tag:au}),eu=S(bu,{node:function(b,c){var d=c[0],e=c[c.length-1],f=b.getAttribute("id"),g=[parseFloat(b.getAttribute("lon")),parseFloat(b.getAttribute("lat"))];e.Bf[f]=g;var h=V({Vc:{}},du,b,c);wb(h.Vc)||(g=new Nk(g),Dp(g,!1,d),d=new O(g),d.d(f),d.C(h.Vc),e.features.push(d))},way:function(b,c){for(var d=c[0],e=b.getAttribute("id"),f=V({rc:[],Vc:{}},cu,b,c),g=c[c.length-1],h=[],k=0,n=f.rc.length;k<n;k++)ab(h,g.Bf[f.rc[k]]);
f.rc[0]==f.rc[f.rc.length-1]?(k=new F(null),$k(k,"XY",h,[h.length])):(k=new Tm(null),Um(k,"XY",h));Dp(k,!1,d);d=new O(k);d.d(e);d.C(f.Vc);g.features.push(d)}}),du=S(bu,{tag:au});$t.prototype.Ob=function(b,c){var d=Bp(this,b,c);return"osm"==b.localName&&(d=V({Bf:{},features:[]},eu,b,[d]),m(d.features))?d.features:[]};function fu(b){return b.getAttributeNS("http://www.w3.org/1999/xlink","href")};function gu(){}gu.prototype.b=function(b){return cq(b)?this.c(b):fq(b)?this.a(b):ia(b)?(b=pq(b),this.c(b)):null};function hu(){}v(hu,gu);hu.prototype.c=function(b){for(b=b.firstChild;null!==b;b=b.nextSibling)if(1==b.nodeType)return this.a(b);return null};hu.prototype.a=function(b){b=V({},iu,b,[]);return m(b)?b:null};
var ju=[null,"http://www.opengis.net/ows/1.1"],iu=S(ju,{ServiceIdentification:P(function(b,c){return V({},ku,b,c)}),ServiceProvider:P(function(b,c){return V({},lu,b,c)}),OperationsMetadata:P(function(b,c){return V({},mu,b,c)})}),nu=S(ju,{DeliveryPoint:P(W),City:P(W),AdministrativeArea:P(W),PostalCode:P(W),Country:P(W),ElectronicMailAddress:P(W)}),ou=S(ju,{Value:tq(function(b){return W(b)})}),pu=S(ju,{AllowedValues:P(function(b,c){return V({},ou,b,c)})}),ru=S(ju,{Phone:P(function(b,c){return V({},
qu,b,c)}),Address:P(function(b,c){return V({},nu,b,c)})}),tu=S(ju,{HTTP:P(function(b,c){return V({},su,b,c)})}),su=S(ju,{Get:tq(function(b,c){var d=fu(b);return m(d)?V({href:d},uu,b,c):void 0}),Post:void 0}),vu=S(ju,{DCP:P(function(b,c){return V({},tu,b,c)})}),mu=S(ju,{Operation:function(b,c){var d=b.getAttribute("name"),e=V({},vu,b,c);m(e)&&(c[c.length-1][d]=e)}}),qu=S(ju,{Voice:P(W),Facsimile:P(W)}),uu=S(ju,{Constraint:tq(function(b,c){var d=b.getAttribute("name");return m(d)?V({name:d},pu,b,c):
void 0})}),wu=S(ju,{IndividualName:P(W),PositionName:P(W),ContactInfo:P(function(b,c){return V({},ru,b,c)})}),ku=S(ju,{Title:P(W),ServiceTypeVersion:P(W),ServiceType:P(W)}),lu=S(ju,{ProviderName:P(W),ProviderSite:P(fu),ServiceContact:P(function(b,c){return V({},wu,b,c)})});function xu(b,c,d,e){var f;m(e)?f=m(void 0)?void 0:0:(e=[],f=0);var g,h;for(g=0;g<c;)for(h=b[g++],e[f++]=b[g++],e[f++]=h,h=2;h<d;++h)e[f++]=b[g++];e.length=f};function yu(b){b=m(b)?b:{};this.defaultDataProjection=null;this.defaultDataProjection=ze("EPSG:4326");this.a=m(b.factor)?b.factor:1E5;this.c=m(b.geometryLayout)?b.geometryLayout:"XY"}v(yu,Kr);function zu(b,c,d){d=m(d)?d:1E5;var e,f=Array(c);for(e=0;e<c;++e)f[e]=0;var g,h;g=0;for(h=b.length;g<h;)for(e=0;e<c;++e,++g){var k=b[g],n=k-f[e];f[e]=k;b[g]=n}return Au(b,d)}
function Bu(b,c,d){var e=m(d)?d:1E5,f=Array(c);for(d=0;d<c;++d)f[d]=0;b=Cu(b,e);var g,e=0;for(g=b.length;e<g;)for(d=0;d<c;++d,++e)f[d]+=b[e],b[e]=f[d];return b}function Au(b,c){var d=m(c)?c:1E5,e,f;e=0;for(f=b.length;e<f;++e)b[e]=Math.round(b[e]*d);d=0;for(e=b.length;d<e;++d)f=b[d],b[d]=0>f?~(f<<1):f<<1;d="";e=0;for(f=b.length;e<f;++e){for(var g=b[e],h=void 0,k="";32<=g;)h=(32|g&31)+63,k+=String.fromCharCode(h),g>>=5;h=g+63;k+=String.fromCharCode(h);d+=k}return d}
function Cu(b,c){var d=m(c)?c:1E5,e=[],f=0,g=0,h,k;h=0;for(k=b.length;h<k;++h){var n=b.charCodeAt(h)-63,f=f|(n&31)<<g;32>n?(e.push(f),g=f=0):g+=5}f=0;for(g=e.length;f<g;++f)h=e[f],e[f]=h&1?~(h>>1):h>>1;f=0;for(g=e.length;f<g;++f)e[f]/=d;return e}l=yu.prototype;l.Qc=function(b,c){var d=this.Sc(b,c);return new O(d)};l.Ge=function(b,c){return[this.Qc(b,c)]};l.Sc=function(b,c){var d=sk(this.c),e=Bu(b,d,this.a);xu(e,e.length,d,e);d=Hk(e,0,e.length,d);return Dp(new Tm(d,this.c),!1,Cp(this,c))};
l.ce=function(b,c){var d=b.R();return null!=d?this.Yc(d,c):""};l.yg=function(b,c){return this.ce(b[0],c)};l.Yc=function(b,c){b=Dp(b,!0,Cp(this,c));var d=b.j,e=b.B;xu(d,d.length,e,d);return zu(d,e,this.a)};function Du(b){b=m(b)?b:{};this.defaultDataProjection=null;this.defaultDataProjection=ze(null!=b.defaultDataProjection?b.defaultDataProjection:"EPSG:4326")}v(Du,Gp);function Eu(b,c){var d=[],e,f,g,h;g=0;for(h=b.length;g<h;++g)e=b[g],0<g&&d.pop(),0<=e?f=c[e]:f=c[~e].slice().reverse(),d.push.apply(d,f);e=0;for(f=d.length;e<f;++e)d[e]=d[e].slice();return d}function Fu(b,c,d,e,f){b=b.geometries;var g=[],h,k;h=0;for(k=b.length;h<k;++h)g[h]=Gu(b[h],c,d,e,f);return g}
function Gu(b,c,d,e,f){var g=b.type,h=Hu[g];c="Point"===g||"MultiPoint"===g?h(b,d,e):h(b,c);d=new O;d.Sa(Dp(c,!1,f));m(b.id)&&d.d(b.id);m(b.properties)&&d.C(b.properties);return d}
Du.prototype.b=function(b,c){if("Topology"==b.type){var d,e=null,f=null;m(b.transform)&&(d=b.transform,e=d.scale,f=d.translate);var g=b.arcs;if(m(d)){d=e;var h=f,k,n;k=0;for(n=g.length;k<n;++k)for(var p=g[k],q=d,r=h,s=0,u=0,y=void 0,z=void 0,A=void 0,z=0,A=p.length;z<A;++z)y=p[z],s+=y[0],u+=y[1],y[0]=s,y[1]=u,Iu(y,q,r)}d=[];h=qb(b.objects);k=0;for(n=h.length;k<n;++k)"GeometryCollection"===h[k].type?(p=h[k],d.push.apply(d,Fu(p,g,e,f,c))):(p=h[k],d.push(Gu(p,g,e,f,c)));return d}return[]};
function Iu(b,c,d){b[0]=b[0]*c[0]+d[0];b[1]=b[1]*c[1]+d[1]}Du.prototype.Ja=function(){return this.defaultDataProjection};
var Hu={Point:function(b,c,d){b=b.coordinates;null===c||null===d||Iu(b,c,d);return new Nk(b)},LineString:function(b,c){var d=Eu(b.arcs,c);return new Tm(d)},Polygon:function(b,c){var d=[],e,f;e=0;for(f=b.arcs.length;e<f;++e)d[e]=Eu(b.arcs[e],c);return new F(d)},MultiPoint:function(b,c,d){b=b.coordinates;var e,f;if(null!==c&&null!==d)for(e=0,f=b.length;e<f;++e)Iu(b[e],c,d);return new Ym(b)},MultiLineString:function(b,c){var d=[],e,f;e=0;for(f=b.arcs.length;e<f;++e)d[e]=Eu(b.arcs[e],c);return new Vm(d)},
MultiPolygon:function(b,c){var d=[],e,f,g,h,k,n;k=0;for(n=b.arcs.length;k<n;++k){e=b.arcs[k];f=[];g=0;for(h=e.length;g<h;++g)f[g]=Eu(e[g],c);d[k]=f}return new Zm(d)}};function Ju(b){b=m(b)?b:{};this.f=b.featureType;this.b=b.featureNS;this.c=m(b.gmlFormat)?b.gmlFormat:new Rq;this.d=m(b.schemaLocation)?b.schemaLocation:"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd";this.defaultDataProjection=null}v(Ju,Cq);Ju.prototype.Ob=function(b,c){var d={featureType:this.f,featureNS:this.b};Db(d,Bp(this,b,m(c)?c:{}));d=[d];this.c.c["http://www.opengis.net/gml"].featureMember=rq(Fq.prototype.Sd);d=V([],this.c.c,b,d,this.c);m(d)||(d=[]);return d};
Ju.prototype.g=function(b){if(cq(b))return Ku(b);if(fq(b))return V({},Lu,b,[]);if(ia(b))return b=pq(b),Ku(b)};Ju.prototype.e=function(b){if(cq(b))return Mu(this,b);if(fq(b))return Nu(this,b);if(ia(b))return b=pq(b),Mu(this,b)};function Mu(b,c){for(var d=c.firstChild;null!==d;d=d.nextSibling)if(1==d.nodeType)return Nu(b,d)}var Ou={"http://www.opengis.net/gml":{boundedBy:P(Fq.prototype.Ud,"bounds")}};
function Nu(b,c){var d={},e=Mq(c.getAttribute("numberOfFeatures"));d.numberOfFeatures=e;return V(d,Ou,c,[],b.c)}
var Pu={"http://www.opengis.net/wfs":{totalInserted:P(Lq),totalUpdated:P(Lq),totalDeleted:P(Lq)}},Qu={"http://www.opengis.net/ogc":{FeatureId:rq(function(b){return b.getAttribute("fid")})}},Ru={"http://www.opengis.net/wfs":{Feature:function(b,c){Aq(Qu,b,c)}}},Lu={"http://www.opengis.net/wfs":{TransactionSummary:P(function(b,c){return V({},Pu,b,c)},"transactionSummary"),InsertResults:P(function(b,c){return V([],Ru,b,c)},"insertIds")}};
function Ku(b){for(b=b.firstChild;null!==b;b=b.nextSibling)if(1==b.nodeType)return V({},Lu,b,[])}var Su={"http://www.opengis.net/wfs":{PropertyName:T(Oq)}};function Tu(b,c){var d=Vp("http://www.opengis.net/ogc","Filter"),e=Vp("http://www.opengis.net/ogc","FeatureId");d.appendChild(e);e.setAttribute("fid",c);b.appendChild(d)}
var Uu={"http://www.opengis.net/wfs":{Insert:T(function(b,c,d){var e=d[d.length-1],e=Vp(e.featureNS,e.featureType);b.appendChild(e);Rq.prototype.xg(e,c,d)}),Update:T(function(b,c,d){var e=d[d.length-1],f=e.featureType,g=e.featurePrefix,g=m(g)?g:"feature",h=e.featureNS;b.setAttribute("typeName",g+":"+f);oq(b,"http://www.w3.org/2000/xmlns/","xmlns:"+g,h);f=c.aa;if(m(f)){for(var g=c.G(),h=[],k=0,n=g.length;k<n;k++){var p=c.get(g[k]);m(p)&&h.push({name:g[k],value:p})}Bq({node:b,srsName:e.srsName},Uu,
wq("Property"),h,d);Tu(b,f)}}),Delete:T(function(b,c,d){var e=d[d.length-1];d=e.featureType;var f=e.featurePrefix,f=m(f)?f:"feature",e=e.featureNS;b.setAttribute("typeName",f+":"+d);oq(b,"http://www.w3.org/2000/xmlns/","xmlns:"+f,e);c=c.aa;m(c)&&Tu(b,c)}),Property:T(function(b,c,d){var e=Vp("http://www.opengis.net/wfs","Name");b.appendChild(e);Oq(e,c.name);null!=c.value&&(e=Vp("http://www.opengis.net/wfs","Value"),b.appendChild(e),c.value instanceof pk?Rq.prototype.de(e,c.value,d):Oq(e,c.value))}),
Native:T(function(b,c){m(c.tm)&&b.setAttribute("vendorId",c.tm);m(c.Ul)&&b.setAttribute("safeToIgnore",c.Ul);m(c.value)&&Oq(b,c.value)})}},Vu={"http://www.opengis.net/wfs":{Query:T(function(b,c,d){var e=d[d.length-1],f=e.featurePrefix,g=e.featureNS,h=e.propertyNames,k=e.srsName;b.setAttribute("typeName",(m(f)?f+":":"")+c);m(k)&&b.setAttribute("srsName",k);m(g)&&oq(b,"http://www.w3.org/2000/xmlns/","xmlns:"+f,g);c=Bb(e);c.node=b;Bq(c,Su,wq("PropertyName"),h,d);e=e.bbox;m(e)&&(h=Vp("http://www.opengis.net/ogc",
"Filter"),c=d[d.length-1].geometryName,f=Vp("http://www.opengis.net/ogc","BBOX"),h.appendChild(f),g=Vp("http://www.opengis.net/ogc","PropertyName"),Oq(g,c),f.appendChild(g),Rq.prototype.de(f,e,d),b.appendChild(h))})}};
Ju.prototype.n=function(b){var c=Vp("http://www.opengis.net/wfs","GetFeature");c.setAttribute("service","WFS");c.setAttribute("version","1.1.0");m(b)&&(m(b.handle)&&c.setAttribute("handle",b.handle),m(b.outputFormat)&&c.setAttribute("outputFormat",b.outputFormat),m(b.maxFeatures)&&c.setAttribute("maxFeatures",b.maxFeatures),m(b.resultType)&&c.setAttribute("resultType",b.resultType),m(b.lm)&&c.setAttribute("startIndex",b.lm),m(b.count)&&c.setAttribute("count",b.count));oq(c,"http://www.w3.org/2001/XMLSchema-instance",
"xsi:schemaLocation",this.d);var d=b.featureTypes;b=[{node:c,srsName:b.srsName,featureNS:m(b.featureNS)?b.featureNS:this.b,featurePrefix:b.featurePrefix,geometryName:b.geometryName,bbox:b.bbox,bg:m(b.bg)?b.bg:[]}];var e=Bb(b[b.length-1]);e.node=c;Bq(e,Vu,wq("Query"),d,b);return c};
Ju.prototype.q=function(b,c,d,e){var f=[],g=Vp("http://www.opengis.net/wfs","Transaction");g.setAttribute("service","WFS");g.setAttribute("version","1.1.0");var h,k;m(e)&&(h=m(e.gmlOptions)?e.gmlOptions:{},m(e.handle)&&g.setAttribute("handle",e.handle));oq(g,"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.d);null!=b&&(k={node:g,featureNS:e.featureNS,featureType:e.featureType,featurePrefix:e.featurePrefix},Db(k,h),Bq(k,Uu,wq("Insert"),b,f));null!=c&&(k={node:g,featureNS:e.featureNS,
featureType:e.featureType,featurePrefix:e.featurePrefix},Db(k,h),Bq(k,Uu,wq("Update"),c,f));null!=d&&Bq({node:g,featureNS:e.featureNS,featureType:e.featureType,featurePrefix:e.featurePrefix},Uu,wq("Delete"),d,f);m(e.nativeElements)&&Bq({node:g,featureNS:e.featureNS,featureType:e.featureType,featurePrefix:e.featurePrefix},Uu,wq("Native"),e.nativeElements,f);return g};Ju.prototype.Je=function(b){for(b=b.firstChild;null!==b;b=b.nextSibling)if(1==b.nodeType)return this.Xd(b);return null};
Ju.prototype.Xd=function(b){if(null!=b.firstElementChild&&null!=b.firstElementChild.firstElementChild)for(b=b.firstElementChild.firstElementChild,b=b.firstElementChild;null!==b;b=b.nextElementSibling)if(0!==b.childNodes.length&&(1!==b.childNodes.length||3!==b.firstChild.nodeType)){var c=[{}];this.c.Ud(b,c);return ze(c.pop().srsName)}return null};function Wu(b){b=m(b)?b:{};this.defaultDataProjection=null;this.a=m(b.splitCollection)?b.splitCollection:!1}v(Wu,Kr);function Xu(b){b=b.Q();return 0==b.length?"":b[0]+" "+b[1]}function Yu(b){b=b.Q();for(var c=[],d=0,e=b.length;d<e;++d)c.push(b[d][0]+" "+b[d][1]);return c.join(",")}function Zu(b){var c=[];b=b.ld();for(var d=0,e=b.length;d<e;++d)c.push("("+Yu(b[d])+")");return c.join(",")}function $u(b){var c=b.O();b=(0,av[c])(b);c=c.toUpperCase();return 0===b.length?c+" EMPTY":c+"("+b+")"}
var av={Point:Xu,LineString:Yu,Polygon:Zu,MultiPoint:function(b){var c=[];b=b.Gd();for(var d=0,e=b.length;d<e;++d)c.push("("+Xu(b[d])+")");return c.join(",")},MultiLineString:function(b){var c=[];b=b.Lc();for(var d=0,e=b.length;d<e;++d)c.push("("+Yu(b[d])+")");return c.join(",")},MultiPolygon:function(b){var c=[];b=b.qd();for(var d=0,e=b.length;d<e;++d)c.push("("+Zu(b[d])+")");return c.join(",")},GeometryCollection:function(b){var c=[];b=b.mf();for(var d=0,e=b.length;d<e;++d)c.push($u(b[d]));return c.join(",")}};
l=Wu.prototype;l.Qc=function(b,c){var d=this.Sc(b,c);if(m(d)){var e=new O;e.Sa(d);return e}return null};l.Ge=function(b,c){var d=[],e=this.Sc(b,c);this.a&&"GeometryCollection"==e.O()?d=e.d:d=[e];for(var f=[],g=0,h=d.length;g<h;++g)e=new O,e.Sa(d[g]),f.push(e);return f};l.Sc=function(b,c){var d;d=new bv(new cv(b));d.a=dv(d.c);d=ev(d);return m(d)?Dp(d,!1,c):null};l.ce=function(b,c){var d=b.R();return m(d)?this.Yc(d,c):""};
l.yg=function(b,c){if(1==b.length)return this.ce(b[0],c);for(var d=[],e=0,f=b.length;e<f;++e)d.push(b[e].R());d=new Mm(d);return this.Yc(d,c)};l.Yc=function(b,c){return $u(Dp(b,!0,c))};function cv(b){this.c=b;this.a=-1}function fv(b,c){var d=m(c)?c:!1;return"0"<=b&&"9">=b||"."==b&&!d}
function dv(b){var c=b.c.charAt(++b.a),d={position:b.a,value:c};if("("==c)d.type=2;else if(","==c)d.type=5;else if(")"==c)d.type=3;else if(fv(c)||"-"==c){d.type=4;var e,c=b.a,f=!1;do"."==e&&(f=!0),e=b.c.charAt(++b.a);while(fv(e,f));b=parseFloat(b.c.substring(c,b.a--));d.value=b}else if("a"<=c&&"z">=c||"A"<=c&&"Z">=c){d.type=1;c=b.a;do e=b.c.charAt(++b.a);while("a"<=e&&"z">=e||"A"<=e&&"Z">=e);b=b.c.substring(c,b.a--).toUpperCase();d.value=b}else{if(" "==c||"\t"==c||"\r"==c||"\n"==c)return dv(b);if(""===
c)d.type=6;else throw Error("Unexpected character: "+c);}return d}function bv(b){this.c=b}l=bv.prototype;l.match=function(b){if(b=this.a.type==b)this.a=dv(this.c);return b};
function ev(b){var c=b.a;if(b.match(1)){var d=c.value;if("GEOMETRYCOLLECTION"==d){a:{if(b.match(2)){c=[];do c.push(ev(b));while(b.match(5));if(b.match(3)){b=c;break a}}else if(gv(b)){b=[];break a}throw Error(hv(b));}return new Mm(b)}var e=iv[d],c=jv[d];if(!m(e)||!m(c))throw Error("Invalid geometry type: "+d);b=e.call(b);return new c(b)}throw Error(hv(b));}l.De=function(){if(this.match(2)){var b=kv(this);if(this.match(3))return b}else if(gv(this))return null;throw Error(hv(this));};
l.Ce=function(){if(this.match(2)){var b=lv(this);if(this.match(3))return b}else if(gv(this))return[];throw Error(hv(this));};l.Ee=function(){if(this.match(2)){var b=mv(this);if(this.match(3))return b}else if(gv(this))return[];throw Error(hv(this));};l.nl=function(){if(this.match(2)){var b;if(2==this.a.type)for(b=[this.De()];this.match(5);)b.push(this.De());else b=lv(this);if(this.match(3))return b}else if(gv(this))return[];throw Error(hv(this));};
l.ml=function(){if(this.match(2)){var b=mv(this);if(this.match(3))return b}else if(gv(this))return[];throw Error(hv(this));};l.ol=function(){if(this.match(2)){for(var b=[this.Ee()];this.match(5);)b.push(this.Ee());if(this.match(3))return b}else if(gv(this))return[];throw Error(hv(this));};function kv(b){for(var c=[],d=0;2>d;++d){var e=b.a;if(b.match(4))c.push(e.value);else break}if(2==c.length)return c;throw Error(hv(b));}function lv(b){for(var c=[kv(b)];b.match(5);)c.push(kv(b));return c}
function mv(b){for(var c=[b.Ce()];b.match(5);)c.push(b.Ce());return c}function gv(b){var c=1==b.a.type&&"EMPTY"==b.a.value;c&&(b.a=dv(b.c));return c}function hv(b){return"Unexpected `"+b.a.value+"` at position "+b.a.position+" in `"+b.c.c+"`"}var jv={POINT:Nk,LINESTRING:Tm,POLYGON:F,MULTIPOINT:Ym,MULTILINESTRING:Vm,MULTIPOLYGON:Zm},iv={POINT:bv.prototype.De,LINESTRING:bv.prototype.Ce,POLYGON:bv.prototype.Ee,MULTIPOINT:bv.prototype.nl,MULTILINESTRING:bv.prototype.ml,MULTIPOLYGON:bv.prototype.ol};function nv(){this.version=void 0}v(nv,gu);nv.prototype.c=function(b){for(b=b.firstChild;null!==b;b=b.nextSibling)if(1==b.nodeType)return this.a(b);return null};nv.prototype.a=function(b){this.version=Aa(b.getAttribute("version"));b=V({version:this.version},ov,b,[]);return m(b)?b:null};function pv(b,c){return V({},qv,b,c)}function rv(b,c){return V({},sv,b,c)}function tv(b,c){var d=pv(b,c);if(m(d)){var e=[Mq(b.getAttribute("width")),Mq(b.getAttribute("height"))];d.size=e;return d}}
function uv(b,c){return V([],vv,b,c)}
var wv=[null,"http://www.opengis.net/wms"],ov=S(wv,{Service:P(function(b,c){return V({},xv,b,c)}),Capability:P(function(b,c){return V({},yv,b,c)})}),yv=S(wv,{Request:P(function(b,c){return V({},zv,b,c)}),Exception:P(function(b,c){return V([],Av,b,c)}),Layer:P(function(b,c){return V({},Bv,b,c)})}),xv=S(wv,{Name:P(W),Title:P(W),Abstract:P(W),KeywordList:P(uv),OnlineResource:P(fu),ContactInformation:P(function(b,c){return V({},Cv,b,c)}),Fees:P(W),AccessConstraints:P(W),LayerLimit:P(Lq),MaxWidth:P(Lq),
MaxHeight:P(Lq)}),Cv=S(wv,{ContactPersonPrimary:P(function(b,c){return V({},Dv,b,c)}),ContactPosition:P(W),ContactAddress:P(function(b,c){return V({},Ev,b,c)}),ContactVoiceTelephone:P(W),ContactFacsimileTelephone:P(W),ContactElectronicMailAddress:P(W)}),Dv=S(wv,{ContactPerson:P(W),ContactOrganization:P(W)}),Ev=S(wv,{AddressType:P(W),Address:P(W),City:P(W),StateOrProvince:P(W),PostCode:P(W),Country:P(W)}),Av=S(wv,{Format:rq(W)}),Bv=S(wv,{Name:P(W),Title:P(W),Abstract:P(W),KeywordList:P(uv),CRS:tq(W),
EX_GeographicBoundingBox:P(function(b,c){var d=V({},Fv,b,c);if(m(d)){var e=d.westBoundLongitude,f=d.southBoundLatitude,g=d.eastBoundLongitude,d=d.northBoundLatitude;return m(e)&&m(f)&&m(g)&&m(d)?[e,f,g,d]:void 0}}),BoundingBox:tq(function(b){var c=[Kq(b.getAttribute("minx")),Kq(b.getAttribute("miny")),Kq(b.getAttribute("maxx")),Kq(b.getAttribute("maxy"))],d=[Kq(b.getAttribute("resx")),Kq(b.getAttribute("resy"))];return{crs:b.getAttribute("CRS"),extent:c,res:d}}),Dimension:tq(function(b){return{name:b.getAttribute("name"),
units:b.getAttribute("units"),unitSymbol:b.getAttribute("unitSymbol"),"default":b.getAttribute("default"),multipleValues:Hq(b.getAttribute("multipleValues")),nearestValue:Hq(b.getAttribute("nearestValue")),current:Hq(b.getAttribute("current")),values:W(b)}}),Attribution:P(function(b,c){return V({},Gv,b,c)}),AuthorityURL:tq(function(b,c){var d=pv(b,c);if(m(d))return d.name=b.getAttribute("name"),d}),Identifier:tq(W),MetadataURL:tq(function(b,c){var d=pv(b,c);if(m(d))return d.type=b.getAttribute("type"),
d}),DataURL:tq(pv),FeatureListURL:tq(pv),Style:tq(function(b,c){return V({},Hv,b,c)}),MinScaleDenominator:P(Jq),MaxScaleDenominator:P(Jq),Layer:tq(function(b,c){var d=c[c.length-1],e=V({},Bv,b,c);if(m(e)){var f=Hq(b.getAttribute("queryable"));m(f)||(f=d.queryable);e.queryable=m(f)?f:!1;f=Mq(b.getAttribute("cascaded"));m(f)||(f=d.cascaded);e.cascaded=f;f=Hq(b.getAttribute("opaque"));m(f)||(f=d.opaque);e.opaque=m(f)?f:!1;f=Hq(b.getAttribute("noSubsets"));m(f)||(f=d.noSubsets);e.noSubsets=m(f)?f:!1;
f=Kq(b.getAttribute("fixedWidth"));m(f)||(f=d.fixedWidth);e.fixedWidth=f;f=Kq(b.getAttribute("fixedHeight"));m(f)||(f=d.fixedHeight);e.fixedHeight=f;Qa(["Style","CRS","AuthorityURL"],function(b){var c=d[b];if(m(c)){var f=Ab(e,b),f=f.concat(c);e[b]=f}});Qa("EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" "),function(b){m(e[b])||(e[b]=d[b])});return e}})}),Gv=S(wv,{Title:P(W),OnlineResource:P(fu),LogoURL:P(tv)}),Fv=S(wv,{westBoundLongitude:P(Jq),
eastBoundLongitude:P(Jq),southBoundLatitude:P(Jq),northBoundLatitude:P(Jq)}),zv=S(wv,{GetCapabilities:P(rv),GetMap:P(rv),GetFeatureInfo:P(rv)}),sv=S(wv,{Format:tq(W),DCPType:tq(function(b,c){return V({},Iv,b,c)})}),Iv=S(wv,{HTTP:P(function(b,c){return V({},Jv,b,c)})}),Jv=S(wv,{Get:P(pv),Post:P(pv)}),Hv=S(wv,{Name:P(W),Title:P(W),Abstract:P(W),LegendURL:tq(tv),StyleSheetURL:P(pv),StyleURL:P(pv)}),qv=S(wv,{Format:P(W),OnlineResource:P(fu)}),vv=S(wv,{Keyword:rq(W)});function Kv(){this.b="http://mapserver.gis.umn.edu/mapserver";this.c=new $q;this.defaultDataProjection=null}v(Kv,Cq);
function Lv(b,c,d){c.namespaceURI=b.b;var e=$p(c),f=[];if(0===c.childNodes.length)return f;"msGMLOutput"==e&&Qa(c.childNodes,function(b){if(1===b.nodeType){var c=d[0],e=b.localName,n=RegExp,p;p="_layer".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08");n=new n(p,"");e=e.replace(n,"")+"_feature";c.featureType=e;c.featureNS=this.b;n={};n[e]=rq(this.c.Fe,this.c);c=S([c.featureNS,null],n);b.namespaceURI=this.b;b=V([],c,b,d,this.c);m(b)&&ab(f,b)}},b);"FeatureCollection"==e&&(b=V([],
b.c.c,c,[{}],b.c),m(b)&&(f=b));return f}Kv.prototype.Ob=function(b,c){var d={featureType:this.featureType,featureNS:this.featureNS};m(c)&&Db(d,Bp(this,b,c));return Lv(this,b,[d])};function Mv(){this.d=new hu}v(Mv,gu);Mv.prototype.c=function(b){for(b=b.firstChild;null!==b;b=b.nextSibling)if(1==b.nodeType)return this.a(b);return null};Mv.prototype.a=function(b){this.version=Aa(b.getAttribute("version"));var c=this.d.a(b);if(!m(c))return null;c.version=this.version;c=V(c,Nv,b,[]);return m(c)?c:null};function Ov(b){var c=W(b).split(" ");if(m(c)&&2==c.length)return b=+c[0],c=+c[1],isNaN(b)||isNaN(c)?void 0:[b,c]}
var Pv=[null,"http://www.opengis.net/wmts/1.0"],Qv=[null,"http://www.opengis.net/ows/1.1"],Nv=S(Pv,{Contents:P(function(b,c){return V({},Rv,b,c)})}),Rv=S(Pv,{Layer:tq(function(b,c){return V({},Sv,b,c)}),TileMatrixSet:tq(function(b,c){return V({},Tv,b,c)})}),Sv=S(Pv,{Style:tq(function(b,c){var d=V({},Uv,b,c);if(m(d)){var e="true"===b.getAttribute("isDefault");d.isDefault=e;return d}}),Format:tq(W),TileMatrixSetLink:tq(function(b,c){return V({},Vv,b,c)}),ResourceURL:tq(function(b){var c=b.getAttribute("format"),
d=b.getAttribute("template");b=b.getAttribute("resourceType");var e={};m(c)&&(e.format=c);m(d)&&(e.template=d);m(b)&&(e.resourceType=b);return e})},S(Qv,{Title:P(W),Abstract:P(W),WGS84BoundingBox:P(function(b,c){var d=V([],Wv,b,c);return 2!=d.length?void 0:Rd(d)}),Identifier:P(W)})),Uv=S(Pv,{LegendURL:tq(function(b){var c={};c.format=b.getAttribute("format");c.href=fu(b);return c})},S(Qv,{Title:P(W),Identifier:P(W)})),Vv=S(Pv,{TileMatrixSet:P(W)}),Wv=S(Qv,{LowerCorner:rq(Ov),UpperCorner:rq(Ov)}),
Tv=S(Pv,{WellKnownScaleSet:P(W),TileMatrix:tq(function(b,c){return V({},Xv,b,c)})},S(Qv,{SupportedCRS:P(W),Identifier:P(W)})),Xv=S(Pv,{TopLeftCorner:P(Ov),ScaleDenominator:P(Jq),TileWidth:P(Lq),TileHeight:P(Lq),MatrixWidth:P(Lq),MatrixHeight:P(Lq)},S(Qv,{Identifier:P(W)}));var Yv=new ue(6378137);function X(b){qd.call(this);b=m(b)?b:{};this.a=null;this.f=Te;this.d=void 0;w(this,ud("projection"),this.sj,!1,this);w(this,ud("tracking"),this.tj,!1,this);m(b.projection)&&this.k(ze(b.projection));m(b.trackingOptions)&&this.q(b.trackingOptions);this.b(m(b.tracking)?b.tracking:!1)}v(X,qd);l=X.prototype;l.P=function(){this.b(!1);X.T.P.call(this)};l.sj=function(){var b=this.g();null!=b&&(this.f=De(ze("EPSG:4326"),b),null===this.a||this.set("position",this.f(this.a)))};
l.tj=function(){if(ag){var b=this.i();b&&!m(this.d)?this.d=ba.navigator.geolocation.watchPosition(ra(this.vl,this),ra(this.wl,this),this.e()):!b&&m(this.d)&&(ba.navigator.geolocation.clearWatch(this.d),this.d=void 0)}};
l.vl=function(b){b=b.coords;this.set("accuracy",b.accuracy);this.set("altitude",null===b.altitude?void 0:b.altitude);this.set("altitudeAccuracy",null===b.altitudeAccuracy?void 0:b.altitudeAccuracy);this.set("heading",null===b.heading?void 0:Yb(b.heading));null===this.a?this.a=[b.longitude,b.latitude]:(this.a[0]=b.longitude,this.a[1]=b.latitude);var c=this.f(this.a);this.set("position",c);this.set("speed",null===b.speed?void 0:b.speed);b=cl(Yv,this.a,b.accuracy);b.ra(this.f);this.set("accuracyGeometry",
b);this.l()};l.wl=function(b){b.type="error";this.b(!1);this.dispatchEvent(b)};l.lf=function(){return this.get("accuracy")};X.prototype.getAccuracy=X.prototype.lf;X.prototype.o=function(){return this.get("accuracyGeometry")||null};X.prototype.getAccuracyGeometry=X.prototype.o;X.prototype.p=function(){return this.get("altitude")};X.prototype.getAltitude=X.prototype.p;X.prototype.r=function(){return this.get("altitudeAccuracy")};X.prototype.getAltitudeAccuracy=X.prototype.r;X.prototype.H=function(){return this.get("heading")};
X.prototype.getHeading=X.prototype.H;X.prototype.N=function(){return this.get("position")};X.prototype.getPosition=X.prototype.N;X.prototype.g=function(){return this.get("projection")};X.prototype.getProjection=X.prototype.g;X.prototype.D=function(){return this.get("speed")};X.prototype.getSpeed=X.prototype.D;X.prototype.i=function(){return this.get("tracking")};X.prototype.getTracking=X.prototype.i;X.prototype.e=function(){return this.get("trackingOptions")};X.prototype.getTrackingOptions=X.prototype.e;
X.prototype.k=function(b){this.set("projection",b)};X.prototype.setProjection=X.prototype.k;X.prototype.b=function(b){this.set("tracking",b)};X.prototype.setTracking=X.prototype.b;X.prototype.q=function(b){this.set("trackingOptions",b)};X.prototype.setTrackingOptions=X.prototype.q;function Zv(b,c,d){for(var e=[],f=b(0),g=b(1),h=c(f),k=c(g),n=[g,f],p=[k,h],q=[1,0],r={},s=1E5,u,y,z,A,E;0<--s&&0<q.length;)z=q.pop(),f=n.pop(),h=p.pop(),g=z.toString(),g in r||(e.push(h[0],h[1]),r[g]=!0),A=q.pop(),g=n.pop(),k=p.pop(),E=(z+A)/2,u=b(E),y=c(u),xk(y[0],y[1],h[0],h[1],k[0],k[1])<d?(e.push(k[0],k[1]),g=A.toString(),r[g]=!0):(q.push(A,E,E,z),p.push(k,y,y,h),n.push(g,u,u,f));return e}function $v(b,c,d,e,f){var g=ze("EPSG:4326");return Zv(function(e){return[b,c+(d-c)*e]},Se(g,e),f)}
function aw(b,c,d,e,f){var g=ze("EPSG:4326");return Zv(function(e){return[c+(d-c)*e,b]},Se(g,e),f)};function bw(b){b=m(b)?b:{};this.n=this.g=null;this.d=this.b=Infinity;this.e=this.f=-Infinity;this.r=m(b.targetSize)?b.targetSize:100;this.o=m(b.maxLines)?b.maxLines:100;this.a=[];this.c=[];this.p=m(b.strokeStyle)?b.strokeStyle:cw;this.q=this.i=void 0;this.k=null;this.setMap(m(b.map)?b.map:null)}var cw=new ql({color:"rgba(0,0,0,0.2)"}),dw=[90,45,30,20,10,5,2,1,.5,.2,.1,.05,.01,.005,.002,.001];
function ew(b,c,d,e,f){var g=f;c=$v(c,b.f,b.b,b.n,d);g=m(b.a[g])?b.a[g]:new Tm(null);Um(g,"XY",c);pe(g.J(),e)&&(b.a[f++]=g);return f}function fw(b,c,d,e,f){var g=f;c=aw(c,b.e,b.d,b.n,d);g=m(b.c[g])?b.c[g]:new Tm(null);Um(g,"XY",c);pe(g.J(),e)&&(b.c[f++]=g);return f}l=bw.prototype;l.uj=function(){return this.g};l.Th=function(){return this.a};l.Yh=function(){return this.c};
l.vf=function(b){var c=b.vectorContext,d=b.frameState;b=d.extent;var e=d.viewState,f=e.center,g=e.projection,e=e.resolution,d=d.pixelRatio,d=e*e/(4*d*d);if(null===this.n||!Re(this.n,g)){var h=g.J(),k=g.f,n=k[2],p=k[1],q=k[0];this.b=k[3];this.d=n;this.f=p;this.e=q;k=ze("EPSG:4326");this.i=Se(k,g);this.q=Se(g,k);this.k=this.q(ke(h));this.n=g}for(var g=this.k[0],h=this.k[1],k=-1,r,p=Math.pow(this.r*e,2),q=[],s=[],e=0,n=dw.length;e<n;++e){r=dw[e]/2;q[0]=g-r;q[1]=h-r;s[0]=g+r;s[1]=h+r;this.i(q,q);this.i(s,
s);r=Math.pow(s[0]-q[0],2)+Math.pow(s[1]-q[1],2);if(r<=p)break;k=dw[e]}e=k;if(-1==e)this.a.length=this.c.length=0;else{g=this.q(f);f=g[0];g=g[1];h=this.o;f=Math.floor(f/e)*e;p=Vb(f,this.e,this.d);n=ew(this,p,d,b,0);for(k=0;p!=this.e&&k++<h;)p=Math.max(p-e,this.e),n=ew(this,p,d,b,n);p=Vb(f,this.e,this.d);for(k=0;p!=this.d&&k++<h;)p=Math.min(p+e,this.d),n=ew(this,p,d,b,n);this.a.length=n;g=Math.floor(g/e)*e;f=Vb(g,this.f,this.b);n=fw(this,f,d,b,0);for(k=0;f!=this.f&&k++<h;)f=Math.max(f-e,this.f),n=
fw(this,f,d,b,n);f=Vb(g,this.f,this.b);for(k=0;f!=this.b&&k++<h;)f=Math.min(f+e,this.b),n=fw(this,f,d,b,n);this.c.length=n}c.Ba(null,this.p);b=0;for(d=this.a.length;b<d;++b)f=this.a[b],c.Eb(f,null);b=0;for(d=this.c.length;b<d;++b)f=this.c[b],c.Eb(f,null)};l.setMap=function(b){null!==this.g&&(this.g.t("postcompose",this.vf,this),this.g.render());null!==b&&(b.s("postcompose",this.vf,this),b.render());this.g=b};function gw(b,c,d,e,f,g,h){kj.call(this,b,c,d,0,e);this.n=f;this.c=new Image;null!==g&&(this.c.crossOrigin=g);this.d={};this.b=null;this.state=0;this.g=h}v(gw,kj);gw.prototype.a=function(b){if(m(b)){var c=ma(b);if(c in this.d)return this.d[c];b=wb(this.d)?this.c:this.c.cloneNode(!1);return this.d[c]=b}return this.c};gw.prototype.i=function(){this.state=3;Qa(this.b,Wc);this.b=null;this.dispatchEvent("change")};
gw.prototype.k=function(){m(this.resolution)||(this.resolution=ne(this.extent)/this.c.height);this.state=2;Qa(this.b,Wc);this.b=null;this.dispatchEvent("change")};gw.prototype.load=function(){0==this.state&&(this.state=1,this.dispatchEvent("change"),this.b=[Uc(this.c,"error",this.i,!1,this),Uc(this.c,"load",this.k,!1,this)],this.g(this,this.n))};function hw(b,c,d,e,f){Zg.call(this,b,c);this.g=d;this.c=new Image;null!==e&&(this.c.crossOrigin=e);this.b={};this.f=null;this.n=f}v(hw,Zg);l=hw.prototype;l.P=function(){1==this.state&&iw(this);hw.T.P.call(this)};l.Ta=function(b){if(m(b)){var c=ma(b);if(c in this.b)return this.b[c];b=wb(this.b)?this.c:this.c.cloneNode(!1);return this.b[c]=b}return this.c};l.qb=function(){return this.g};l.vj=function(){this.state=3;iw(this);$g(this)};
l.wj=function(){this.state=this.c.naturalWidth&&this.c.naturalHeight?2:4;iw(this);$g(this)};l.load=function(){0==this.state&&(this.state=1,$g(this),this.f=[Uc(this.c,"error",this.vj,!1,this),Uc(this.c,"load",this.wj,!1,this)],this.n(this,this.g))};function iw(b){Qa(b.f,Wc);b.f=null};function jw(b,c,d){return function(e,f,g){return d(b,c,e,f,g)}}function kw(){};function lw(b,c){hd.call(this);this.a=new fp(this);var d=b;c&&(d=wf(b));this.a.Ra(d,"dragenter",this.el);d!=b&&this.a.Ra(d,"dragover",this.fl);this.a.Ra(b,"dragover",this.gl);this.a.Ra(b,"drop",this.hl)}v(lw,hd);l=lw.prototype;l.Kc=!1;l.P=function(){lw.T.P.call(this);this.a.Jc()};l.el=function(b){var c=b.a.dataTransfer;(this.Kc=!(!c||!(c.types&&(Wa(c.types,"Files")||Wa(c.types,"public.file-url"))||c.files&&0<c.files.length)))&&b.preventDefault()};
l.fl=function(b){this.Kc&&(b.preventDefault(),b.a.dataTransfer.dropEffect="none")};l.gl=function(b){this.Kc&&(b.preventDefault(),b.pb(),b=b.a.dataTransfer,b.effectAllowed="all",b.dropEffect="copy")};l.hl=function(b){this.Kc&&(b.preventDefault(),b.pb(),b=new wc(b.a),b.type="drop",this.dispatchEvent(b))};function mw(b){b.prototype.then=b.prototype.then;b.prototype.$goog_Thenable=!0}function nw(b){if(!b)return!1;try{return!!b.$goog_Thenable}catch(c){return!1}};function ow(b,c){pw||qw();rw||(pw(),rw=!0);sw.push(new tw(b,c))}var pw;function qw(){if(ba.Promise&&ba.Promise.resolve){var b=ba.Promise.resolve();pw=function(){b.then(uw)}}else pw=function(){Nh(uw)}}var rw=!1,sw=[];function uw(){for(;sw.length;){var b=sw;sw=[];for(var c=0;c<b.length;c++){var d=b[c];try{d.a.call(d.c)}catch(e){Mh(e)}}}rw=!1}function tw(b,c){this.a=b;this.c=c};function vw(b,c){this.c=ww;this.e=void 0;this.a=this.b=null;this.d=this.f=!1;try{var d=this;b.call(c,function(b){xw(d,yw,b)},function(b){xw(d,zw,b)})}catch(e){xw(this,zw,e)}}var ww=0,yw=2,zw=3;vw.prototype.then=function(b,c,d){return Aw(this,ka(b)?b:null,ka(c)?c:null,d)};mw(vw);vw.prototype.cancel=function(b){this.c==ww&&ow(function(){var c=new Bw(b);Cw(this,c)},this)};
function Cw(b,c){if(b.c==ww)if(b.b){var d=b.b;if(d.a){for(var e=0,f=-1,g=0,h;h=d.a[g];g++)if(h=h.Cc)if(e++,h==b&&(f=g),0<=f&&1<e)break;0<=f&&(d.c==ww&&1==e?Cw(d,c):(e=d.a.splice(f,1)[0],Dw(d,e,zw,c)))}}else xw(b,zw,c)}function Ew(b,c){b.a&&b.a.length||b.c!=yw&&b.c!=zw||Fw(b);b.a||(b.a=[]);b.a.push(c)}
function Aw(b,c,d,e){var f={Cc:null,Wf:null,Yf:null};f.Cc=new vw(function(b,h){f.Wf=c?function(d){try{var f=c.call(e,d);b(f)}catch(p){h(p)}}:b;f.Yf=d?function(c){try{var f=d.call(e,c);!m(f)&&c instanceof Bw?h(c):b(f)}catch(p){h(p)}}:h});f.Cc.b=b;Ew(b,f);return f.Cc}vw.prototype.g=function(b){this.c=ww;xw(this,yw,b)};vw.prototype.n=function(b){this.c=ww;xw(this,zw,b)};
function xw(b,c,d){if(b.c==ww){if(b==d)c=zw,d=new TypeError("Promise cannot resolve to itself");else{if(nw(d)){b.c=1;d.then(b.g,b.n,b);return}if(la(d))try{var e=d.then;if(ka(e)){Gw(b,d,e);return}}catch(f){c=zw,d=f}}b.e=d;b.c=c;Fw(b);c!=zw||d instanceof Bw||Hw(b,d)}}function Gw(b,c,d){function e(c){g||(g=!0,b.n(c))}function f(c){g||(g=!0,b.g(c))}b.c=1;var g=!1;try{d.call(c,f,e)}catch(h){e(h)}}function Fw(b){b.f||(b.f=!0,ow(b.i,b))}
vw.prototype.i=function(){for(;this.a&&this.a.length;){var b=this.a;this.a=[];for(var c=0;c<b.length;c++)Dw(this,b[c],this.c,this.e)}this.f=!1};function Dw(b,c,d,e){if(d==yw)c.Wf(e);else{if(c.Cc)for(;b&&b.d;b=b.b)b.d=!1;c.Yf(e)}}function Hw(b,c){b.d=!0;ow(function(){b.d&&Iw.call(null,c)})}var Iw=Mh;function Bw(b){wa.call(this,b)}v(Bw,wa);Bw.prototype.name="cancel";/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function Jw(b,c){this.f=[];this.o=b;this.q=c||null;this.d=this.a=!1;this.b=void 0;this.i=this.p=this.g=!1;this.e=0;this.c=null;this.n=0}Jw.prototype.cancel=function(b){if(this.a)this.b instanceof Jw&&this.b.cancel();else{if(this.c){var c=this.c;delete this.c;b?c.cancel(b):(c.n--,0>=c.n&&c.cancel())}this.o?this.o.call(this.q,this):this.i=!0;this.a||(b=new Kw,Lw(this),Mw(this,!1,b))}};Jw.prototype.k=function(b,c){this.g=!1;Mw(this,b,c)};function Mw(b,c,d){b.a=!0;b.b=d;b.d=!c;Nw(b)}
function Lw(b){if(b.a){if(!b.i)throw new Ow;b.i=!1}}function Pw(b,c,d,e){b.f.push([c,d,e]);b.a&&Nw(b)}Jw.prototype.then=function(b,c,d){var e,f,g=new vw(function(b,c){e=b;f=c});Pw(this,e,function(b){b instanceof Kw?g.cancel():f(b)});return g.then(b,c,d)};mw(Jw);function Qw(b){return Ta(b.f,function(b){return ka(b[1])})}
function Nw(b){if(b.e&&b.a&&Qw(b)){var c=b.e,d=Rw[c];d&&(ba.clearTimeout(d.aa),delete Rw[c]);b.e=0}b.c&&(b.c.n--,delete b.c);for(var c=b.b,e=d=!1;b.f.length&&!b.g;){var f=b.f.shift(),g=f[0],h=f[1],f=f[2];if(g=b.d?h:g)try{var k=g.call(f||b.q,c);m(k)&&(b.d=b.d&&(k==c||k instanceof Error),b.b=c=k);nw(c)&&(e=!0,b.g=!0)}catch(n){c=n,b.d=!0,Qw(b)||(d=!0)}}b.b=c;e&&(k=ra(b.k,b,!0),e=ra(b.k,b,!1),c instanceof Jw?(Pw(c,k,e),c.p=!0):c.then(k,e));d&&(c=new Sw(c),Rw[c.aa]=c,b.e=c.aa)}
function Ow(){wa.call(this)}v(Ow,wa);Ow.prototype.message="Deferred has already fired";Ow.prototype.name="AlreadyCalledError";function Kw(){wa.call(this)}v(Kw,wa);Kw.prototype.message="Deferred was canceled";Kw.prototype.name="CanceledError";function Sw(b){this.aa=ba.setTimeout(ra(this.c,this),0);this.a=b}Sw.prototype.c=function(){delete Rw[this.aa];throw this.a;};var Rw={};function Tw(b,c){m(b.name)?(this.name=b.name,this.code=Uw[b.name]):(this.code=b.code,this.name=Vw(b.code));wa.call(this,za("%s %s",this.name,c))}v(Tw,wa);function Vw(b){var c=vb(Uw,function(c){return b==c});if(!m(c))throw Error("Invalid code: "+b);return c}var Uw={AbortError:3,EncodingError:5,InvalidModificationError:9,InvalidStateError:7,NotFoundError:1,NotReadableError:4,NoModificationAllowedError:6,PathExistsError:12,QuotaExceededError:10,SecurityError:2,SyntaxError:8,TypeMismatchError:11};function Ww(b,c){qc.call(this,b.type,c)}v(Ww,qc);function Xw(){hd.call(this);this.hb=new FileReader;this.hb.onloadstart=ra(this.a,this);this.hb.onprogress=ra(this.a,this);this.hb.onload=ra(this.a,this);this.hb.onabort=ra(this.a,this);this.hb.onerror=ra(this.a,this);this.hb.onloadend=ra(this.a,this)}v(Xw,hd);Xw.prototype.getError=function(){return this.hb.error&&new Tw(this.hb.error,"reading file")};Xw.prototype.a=function(b){this.dispatchEvent(new Ww(b,this))};Xw.prototype.P=function(){Xw.T.P.call(this);delete this.hb};
function Yw(b){var c=new Jw;b.Ra("loadend",sa(function(b,c){var f=c.hb.result,g=c.getError();null==f||g?(Lw(b),Mw(b,!1,g)):(Lw(b),Mw(b,!0,f));c.Jc()},c,b));return c};function Zw(b){b=m(b)?b:{};Rj.call(this,{handleEvent:bd});this.e=m(b.formatConstructors)?b.formatConstructors:[];this.q=m(b.projection)?ze(b.projection):null;this.f=null;this.a=void 0}v(Zw,Rj);Zw.prototype.P=function(){m(this.a)&&Wc(this.a);Zw.T.P.call(this)};Zw.prototype.g=function(b){b=b.a.dataTransfer.files;var c,d,e;c=0;for(d=b.length;c<d;++c){var f=e=b[c],g=new Xw,h=Yw(g);g.hb.readAsText(f,"");Pw(h,sa(this.i,e),null,this)}};
Zw.prototype.i=function(b,c){var d=this.k,e=this.q;null===e&&(e=d.a().p);var d=this.e,f=[],g,h;g=0;for(h=d.length;g<h;++g){var k=new d[g],n;try{n=k.ma(c)}catch(p){n=null}if(null!==n){var k=k.Ja(c),k=Se(k,e),q,r;q=0;for(r=n.length;q<r;++q){var s=n[q],u=s.R();null!=u&&u.ra(k);f.push(s)}}}this.dispatchEvent(new $w(ax,this,b,f,e))};
Zw.prototype.setMap=function(b){m(this.a)&&(Wc(this.a),this.a=void 0);null!==this.f&&(pc(this.f),this.f=null);Zw.T.setMap.call(this,b);null!==b&&(this.f=new lw(b.b),this.a=w(this.f,"drop",this.g,!1,this))};var ax="addfeatures";function $w(b,c,d,e,f){qc.call(this,b,c);this.features=e;this.file=d;this.projection=f}v($w,qc);function bx(b,c){this.x=b;this.y=c}v(bx,sf);bx.prototype.clone=function(){return new bx(this.x,this.y)};bx.prototype.scale=sf.prototype.scale;bx.prototype.add=function(b){this.x+=b.x;this.y+=b.y;return this};bx.prototype.rotate=function(b){var c=Math.cos(b);b=Math.sin(b);var d=this.y*c+this.x*b;this.x=this.x*c-this.y*b;this.y=d;return this};function cx(b){b=m(b)?b:{};ek.call(this,{handleDownEvent:dx,handleDragEvent:ex,handleUpEvent:fx});this.i=m(b.condition)?b.condition:bk;this.a=this.e=void 0;this.g=0}v(cx,ek);function ex(b){if(dk(b)){var c=b.map,d=c.f();b=b.pixel;b=new bx(b[0]-d[0]/2,d[1]/2-b[1]);d=Math.atan2(b.y,b.x);b=Math.sqrt(b.x*b.x+b.y*b.y);var e=c.a(),f=Xe(e);c.render();m(this.e)&&Sj(c,e,f.rotation-(d-this.e));this.e=d;m(this.a)&&Uj(c,e,f.resolution/b*this.a);m(this.a)&&(this.g=this.a/b);this.a=b}}
function fx(b){if(!dk(b))return!0;b=b.map;var c=b.a();Ye(c,-1);var d=Xe(c),e=this.g-1,f=d.rotation,f=c.constrainRotation(f,0);Sj(b,c,f,void 0,void 0);d=d.resolution;d=c.constrainResolution(d,0,e);Uj(b,c,d,void 0,400);this.g=0;return!1}function dx(b){return dk(b)&&this.i(b)?(Ye(b.map.a(),1),this.a=this.e=void 0,!0):!1};function gx(b,c){qc.call(this,b);this.feature=c}v(gx,qc);
function hx(b){ek.call(this,{handleDownEvent:ix,handleEvent:jx,handleUpEvent:kx});this.S=null;this.fa=m(b.source)?b.source:null;this.ca=m(b.features)?b.features:null;this.kb=m(b.snapTolerance)?b.snapTolerance:12;this.Fa=m(b.minPointsPerRing)?b.minPointsPerRing:3;var c=this.H=b.type,d;"Point"===c||"MultiPoint"===c?d=lx:"LineString"===c||"MultiLineString"===c?d=mx:"Polygon"===c||"MultiPolygon"===c?d=nx:"Circle"===c&&(d=ox);this.a=d;this.e=this.o=this.p=this.g=this.i=null;this.N=new yp({style:m(b.style)?
b.style:px()});this.da=b.geometryName;this.Xa=m(b.condition)?b.condition:ak;w(this,ud("active"),this.ea,!1,this)}v(hx,ek);function px(){var b=Al();return function(c){return b[c.R().O()]}}hx.prototype.setMap=function(b){hx.T.setMap.call(this,b);this.ea()};function jx(b){var c=!0;b.type===fj?c=qx(this,b):b.type===$i&&(c=!1);return fk.call(this,b)&&c}function ix(b){return this.Xa(b)?(this.S=b.pixel,!0):!1}
function kx(b){var c=this.S,d=b.pixel,e=c[0]-d[0],c=c[1]-d[1],d=!0;4>=e*e+c*c&&(qx(this,b),null===this.i?rx(this,b):this.a===lx||this.a===ox&&null!==this.i||sx(this,b)?this.U():(b=b.coordinate,e=this.g.R(),this.a===mx?(this.i=b.slice(),c=e.Q(),c.push(b.slice()),e.W(c)):this.a===nx&&(this.e[0].push(b.slice()),e.W(this.e)),tx(this)),d=!1);return d}
function qx(b,c){if(b.a===lx&&null===b.i)rx(b,c);else if(null===b.i){var d=c.coordinate.slice();null===b.p?(b.p=new O(new Nk(d)),tx(b)):b.p.R().W(d)}else{var d=c.coordinate,e=b.g.R(),f,g;b.a===lx?(g=e.Q(),g[0]=d[0],g[1]=d[1],e.W(g)):(b.a===mx?f=e.Q():b.a===nx?f=b.e[0]:b.a===ox&&(f=e.Oc()),sx(b,c)&&(d=b.i.slice()),b.p.R().W(d),g=f[f.length-1],g[0]=d[0],g[1]=d[1],b.a===mx?e.W(f):b.a===nx?(g=b.o.R(),g.W(f),e.W(b.e)):b.a===ox&&(g=b.o.R(),g.W([e.Oc(),d]),e.Hf(g.If())));tx(b)}return!0}
function sx(b,c){var d=!1;if(null!==b.g){var e=b.g.R(),f=!1,g=[b.i];b.a===mx?f=2<e.Q().length:b.a===nx&&(f=e.Q()[0].length>b.Fa,g=[b.e[0][0],b.e[0][b.e[0].length-2]]);if(f)for(var e=c.map,f=0,h=g.length;f<h;f++){var k=g[f],n=e.e(k),p=c.pixel,d=p[0]-n[0],n=p[1]-n[1];if(d=Math.sqrt(d*d+n*n)<=b.kb){b.i=k;break}}}return d}
function rx(b,c){var d=c.coordinate;b.i=d;var e;b.a===lx?e=new Nk(d.slice()):b.a===mx?e=new Tm([d.slice(),d.slice()]):b.a===nx?(b.o=new O(new Tm([d.slice(),d.slice()])),b.e=[[d.slice(),d.slice()]],e=new F(b.e)):b.a===ox&&(e=new Km(d.slice(),0),b.o=new O(new Tm([d.slice(),d.slice()])));b.g=new O;m(b.da)&&b.g.f(b.da);b.g.Sa(e);tx(b);b.dispatchEvent(new gx("drawstart",b.g))}
hx.prototype.U=function(){var b=ux(this),c,d=b.R();this.a===lx?c=d.Q():this.a===mx?(c=d.Q(),c.pop(),d.W(c)):this.a===nx&&(this.e[0].pop(),this.e[0].push(this.e[0][0]),d.W(this.e),c=d.Q());"MultiPoint"===this.H?b.Sa(new Ym([c])):"MultiLineString"===this.H?b.Sa(new Vm([c])):"MultiPolygon"===this.H&&b.Sa(new Zm([c]));null===this.ca||this.ca.push(b);null===this.fa||this.fa.Va(b);this.dispatchEvent(new gx("drawend",b))};
function ux(b){b.i=null;var c=b.g;null!==c&&(b.g=null,b.p=null,b.o=null,b.N.a.clear());return c}hx.prototype.r=ad;function tx(b){var c=[];null===b.g||c.push(b.g);null===b.o||c.push(b.o);null===b.p||c.push(b.p);b.N.Tc(new lg(c))}hx.prototype.ea=function(){var b=this.k,c=this.b();null!==b&&c||ux(this);this.N.setMap(c?b:null)};var lx="Point",mx="LineString",nx="Polygon",ox="Circle";function vx(b){ek.call(this,{handleDownEvent:wx,handleDragEvent:xx,handleEvent:yx,handleUpEvent:zx});this.ca=m(b.deleteCondition)?b.deleteCondition:gd(ak,Zj);this.U=this.e=null;this.N=[0,0];this.a=new qn;this.i=m(b.pixelTolerance)?b.pixelTolerance:10;this.S=!1;this.g=null;this.o=new yp({style:m(b.style)?b.style:Ax()});this.H={Point:this.Am,LineString:this.zg,LinearRing:this.zg,Polygon:this.Cm,MultiPoint:this.xm,MultiLineString:this.wm,MultiPolygon:this.zm,GeometryCollection:this.vm};this.p=b.features;
this.p.forEach(this.Jf,this);w(this.p,"add",this.ti,!1,this);w(this.p,"remove",this.ui,!1,this)}v(vx,ek);l=vx.prototype;l.Jf=function(b){var c=b.R();m(this.H[c.O()])&&this.H[c.O()].call(this,b,c);b=this.k;null===b||Bx(this,this.N,b)};l.setMap=function(b){this.o.setMap(b);vx.T.setMap.call(this,b)};l.ti=function(b){this.Jf(b.element)};
l.ui=function(b){var c=b.element;b=this.a;var d,e=[];un(b,c.R().J(),function(b){c===b.feature&&e.push(b)});for(d=e.length-1;0<=d;--d)b.remove(e[d]);null!==this.e&&0===this.p.Ib()&&(this.o.Ed(this.e),this.e=null)};l.Am=function(b,c){var d=c.Q(),d={feature:b,geometry:c,ha:[d,d]};this.a.ta(c.J(),d)};l.xm=function(b,c){var d=c.Q(),e,f,g;f=0;for(g=d.length;f<g;++f)e=d[f],e={feature:b,geometry:c,depth:[f],index:f,ha:[e,e]},this.a.ta(c.J(),e)};
l.zg=function(b,c){var d=c.Q(),e,f,g,h;e=0;for(f=d.length-1;e<f;++e)g=d.slice(e,e+2),h={feature:b,geometry:c,index:e,ha:g},this.a.ta(Rd(g),h)};l.wm=function(b,c){var d=c.Q(),e,f,g,h,k,n,p;h=0;for(k=d.length;h<k;++h)for(e=d[h],f=0,g=e.length-1;f<g;++f)n=e.slice(f,f+2),p={feature:b,geometry:c,depth:[h],index:f,ha:n},this.a.ta(Rd(n),p)};
l.Cm=function(b,c){var d=c.Q(),e,f,g,h,k,n,p;h=0;for(k=d.length;h<k;++h)for(e=d[h],f=0,g=e.length-1;f<g;++f)n=e.slice(f,f+2),p={feature:b,geometry:c,depth:[h],index:f,ha:n},this.a.ta(Rd(n),p)};l.zm=function(b,c){var d=c.Q(),e,f,g,h,k,n,p,q,r,s;n=0;for(p=d.length;n<p;++n)for(q=d[n],h=0,k=q.length;h<k;++h)for(e=q[h],f=0,g=e.length-1;f<g;++f)r=e.slice(f,f+2),s={feature:b,geometry:c,depth:[h,n],index:f,ha:r},this.a.ta(Rd(r),s)};
l.vm=function(b,c){var d,e=c.d;for(d=0;d<e.length;++d)this.H[e[d].O()].call(this,b,e[d])};function Cx(b,c){var d=b.e;null===d?(d=new O(new Nk(c)),b.e=d,b.o.Cf(d)):d.R().W(c)}function Dx(b,c){return b.index-c.index}
function wx(b){Bx(this,b.pixel,b.map);this.g=[];var c=this.e;if(null!==c){b=[];var c=c.R().Q(),d=Rd([c]),d=sn(this.a,d),e={};d.sort(Dx);for(var f=0,g=d.length;f<g;++f){var h=d[f],k=h.ha,n=ma(h.feature),p=h.depth;p&&(n+="-"+p.join("-"));e[n]||(e[n]=Array(2));if(zd(k[0],c)&&!e[n][0])this.g.push([h,0]),e[n][0]=h;else if(zd(k[1],c)&&!e[n][1]){if("LineString"!==h.geometry.O()&&"MultiLineString"!==h.geometry.O()||!e[n][0]||0!==e[n][0].index)this.g.push([h,1]),e[n][1]=h}else ma(k)in this.U&&!e[n][0]&&!e[n][1]&&
b.push([h,c])}for(f=b.length-1;0<=f;--f)this.Ti.apply(this,b[f])}return null!==this.e}
function xx(b){b=b.coordinate;for(var c=0,d=this.g.length;c<d;++c){for(var e=this.g[c],f=e[0],g=f.depth,h=f.geometry,k=h.Q(),n=f.ha,e=e[1];b.length<h.B;)b.push(0);switch(h.O()){case "Point":k=b;n[0]=n[1]=b;break;case "MultiPoint":k[f.index]=b;n[0]=n[1]=b;break;case "LineString":k[f.index+e]=b;n[e]=b;break;case "MultiLineString":k[g[0]][f.index+e]=b;n[e]=b;break;case "Polygon":k[g[0]][f.index+e]=b;n[e]=b;break;case "MultiPolygon":k[g[1]][g[0]][f.index+e]=b,n[e]=b}h.W(k)}Cx(this,b)}
function zx(){for(var b,c=this.g.length-1;0<=c;--c)b=this.g[c][0],this.a.update(Rd(b.ha),b);return!1}
function yx(b){var c;b.map.a().q.slice()[1]||b.type!=fj||this.q||(this.N=b.pixel,Bx(this,b.pixel,b.map));if(null!==this.e&&this.ca(b)){this.e.R();c=this.g;var d={},e,f,g,h,k,n,p,q,r;for(k=c.length-1;0<=k;--k)if(g=c[k],q=g[0],h=q.geometry,f=h.Q(),r=ma(q.feature),q.depth&&(r+="-"+q.depth.join("-")),e=p=n=void 0,0===g[1]?(p=q,n=q.index):1==g[1]&&(e=q,n=q.index+1),r in d||(d[r]=[e,p,n]),g=d[r],m(e)&&(g[0]=e),m(p)&&(g[1]=p),m(g[0])&&m(g[1])){e=f;r=!1;p=n-1;switch(h.O()){case "MultiLineString":f[q.depth[0]].splice(n,
1);r=!0;break;case "LineString":f.splice(n,1);r=!0;break;case "MultiPolygon":e=e[q.depth[1]];case "Polygon":e=e[q.depth[0]],4<e.length&&(n==e.length-1&&(n=0),e.splice(n,1),r=!0,0===n&&(e.pop(),e.push(e[0]),p=e.length-1))}r&&(this.a.remove(g[0]),this.a.remove(g[1]),h.W(f),f={depth:q.depth,feature:q.feature,geometry:q.geometry,index:p,ha:[g[0].ha[0],g[1].ha[1]]},this.a.ta(Rd(f.ha),f),Ex(this,h,n,q.depth,-1),this.o.Ed(this.e),this.e=null)}c=!0}return fk.call(this,b)&&!c}
function Bx(b,c,d){function e(b,c){return Bd(f,wd(f,b.ha))-Bd(f,wd(f,c.ha))}var f=d.sa(c),g=d.sa([c[0]-b.i,c[1]+b.i]),h=d.sa([c[0]+b.i,c[1]-b.i]),g=Rd([g,h]),g=sn(b.a,g);if(0<g.length){g.sort(e);var h=g[0].ha,k=wd(f,h),n=d.e(k);if(Math.sqrt(Bd(c,n))<=b.i){c=d.e(h[0]);d=d.e(h[1]);c=Bd(n,c);d=Bd(n,d);b.S=Math.sqrt(Math.min(c,d))<=b.i;b.S&&(k=c>d?h[1]:h[0]);Cx(b,k);d={};d[ma(h)]=!0;c=1;for(n=g.length;c<n;++c)if(k=g[c].ha,zd(h[0],k[0])&&zd(h[1],k[1])||zd(h[0],k[1])&&zd(h[1],k[0]))d[ma(k)]=!0;else break;
b.U=d;return}}null!==b.e&&(b.o.Ed(b.e),b.e=null)}
l.Ti=function(b,c){for(var d=b.ha,e=b.feature,f=b.geometry,g=b.depth,h=b.index,k;c.length<f.B;)c.push(0);switch(f.O()){case "MultiLineString":k=f.Q();k[g[0]].splice(h+1,0,c);break;case "Polygon":k=f.Q();k[g[0]].splice(h+1,0,c);break;case "MultiPolygon":k=f.Q();k[g[1]][g[0]].splice(h+1,0,c);break;case "LineString":k=f.Q();k.splice(h+1,0,c);break;default:return}f.W(k);k=this.a;k.remove(b);Ex(this,f,h,g,1);var n={ha:[d[0],c],feature:e,geometry:f,depth:g,index:h};k.ta(Rd(n.ha),n);this.g.push([n,1]);d=
{ha:[c,d[1]],feature:e,geometry:f,depth:g,index:h+1};k.ta(Rd(d.ha),d);this.g.push([d,0])};function Ex(b,c,d,e,f){un(b.a,c.J(),function(b){b.geometry===c&&(!m(e)||gb(b.depth,e))&&b.index>d&&(b.index+=f)})}function Ax(){var b=Al();return function(){return b.Point}};function Fx(b,c,d){qc.call(this,b);this.selected=c;this.deselected=d}v(Fx,qc);
function Gx(b){Rj.call(this,{handleEvent:Hx});b=m(b)?b:{};this.i=m(b.condition)?b.condition:Zj;this.e=m(b.addCondition)?b.addCondition:ad;this.p=m(b.removeCondition)?b.removeCondition:ad;this.D=m(b.toggleCondition)?b.toggleCondition:bk;this.g=m(b.multi)?b.multi:!1;var c;if(m(b.layers))if(ka(b.layers))c=b.layers;else{var d=b.layers;c=function(b){return Wa(d,b)}}else c=bd;this.f=c;this.a=new yp({style:m(b.style)?b.style:Ix()});b=this.a.a;w(b,"add",this.q,!1,this);w(b,"remove",this.r,!1,this)}v(Gx,Rj);
Gx.prototype.o=function(){return this.a.a};
function Hx(b){if(!this.i(b))return!0;var c=this.e(b),d=this.p(b),e=this.D(b),f=b.map,g=this.a.a,h=[],k=[],n=!1;if(c||d||e){f.qe(b.pixel,function(b){-1==Pa(g.a,b)?(c||e)&&k.push(b):(d||e)&&h.push(b)},void 0,this.f);for(f=h.length-1;0<=f;--f)g.remove(h[f]);g.xe(k);if(0<k.length||0<h.length)n=!0}else f.qe(b.pixel,function(b){k.push(b);return!this.g},this,this.f),0<k.length&&1==g.Ib()&&g.item(0)==k[0]||(n=!0,0!==g.Ib()&&(h=Array.prototype.concat(g.a),g.clear()),g.xe(k));n&&this.dispatchEvent(new Fx("select",
k,h));return Yj(b)}Gx.prototype.setMap=function(b){var c=this.k,d=this.a.a;null===c||d.forEach(c.ic,c);Gx.T.setMap.call(this,b);this.a.setMap(b);null===b||d.forEach(b.Xa,b)};function Ix(){var b=Al();ab(b.Polygon,b.LineString);ab(b.GeometryCollection,b.LineString);return function(c){return b[c.R().O()]}}Gx.prototype.q=function(b){b=b.element;var c=this.k;null===c||c.Xa(b)};Gx.prototype.r=function(b){b=b.element;var c=this.k;null===c||c.ic(b)};function Y(b){b=m(b)?b:{};var c=Bb(b);delete c.gradient;delete c.radius;delete c.blur;delete c.shadow;delete c.weight;J.call(this,c);this.ia=null;this.df=m(b.shadow)?b.shadow:250;this.ad=void 0;this.zc=null;w(this,ud("gradient"),this.qh,!1,this);this.xc(m(b.gradient)?b.gradient:Jx);this.wc(m(b.blur)?b.blur:15);this.jc(m(b.radius)?b.radius:8);w(this,[ud("blur"),ud("radius")],this.Se,!1,this);this.Se();var d=m(b.weight)?b.weight:"weight",e;ia(d)?e=function(b){return b.get(d)}:e=d;this.ka(ra(function(b){b=
e(b);b=m(b)?Vb(b,0,1):1;var c=255*b|0,d=this.zc[c];m(d)||(d=[new wl({image:new Aj({opacity:b,src:this.ad})})],this.zc[c]=d);return d},this));this.set("renderOrder",null);w(this,"render",this.th,!1,this)}v(Y,J);var Jx=["#00f","#0ff","#0f0","#ff0","#f00"];Y.prototype.Ea=function(){return this.get("blur")};Y.prototype.getBlur=Y.prototype.Ea;Y.prototype.Fa=function(){return this.get("gradient")};Y.prototype.getGradient=Y.prototype.Fa;Y.prototype.ic=function(){return this.get("radius")};
Y.prototype.getRadius=Y.prototype.ic;Y.prototype.qh=function(){for(var b=this.Fa(),c=Nf(1,256),d=c.createLinearGradient(0,0,1,256),e=1/(b.length-1),f=0,g=b.length;f<g;++f)d.addColorStop(f*e,b[f]);c.fillStyle=d;c.fillRect(0,0,1,256);this.ia=c.getImageData(0,0,1,256).data};
Y.prototype.Se=function(){var b=this.ic(),c=this.Ea(),d=b+c+1,e=2*d,e=Nf(e,e);e.shadowOffsetX=e.shadowOffsetY=this.df;e.shadowBlur=c;e.shadowColor="#000";e.beginPath();c=d-this.df;e.arc(c,c,b,0,2*Math.PI,!0);e.fill();this.ad=e.canvas.toDataURL();this.zc=Array(256);this.l()};Y.prototype.th=function(b){b=b.context;var c=b.canvas,c=b.getImageData(0,0,c.width,c.height),d=c.data,e,f,g;e=0;for(f=d.length;e<f;e+=4)if(g=4*d[e+3])d[e]=this.ia[g],d[e+1]=this.ia[g+1],d[e+2]=this.ia[g+2];b.putImageData(c,0,0)};
Y.prototype.wc=function(b){this.set("blur",b)};Y.prototype.setBlur=Y.prototype.wc;Y.prototype.xc=function(b){this.set("gradient",b)};Y.prototype.setGradient=Y.prototype.xc;Y.prototype.jc=function(b){this.set("radius",b)};Y.prototype.setRadius=Y.prototype.jc;function Kx(b){return[b]};function Lx(b,c){var d=c||{},e=d.document||document,f=Ef("SCRIPT"),g={pg:f,fc:void 0},h=new Jw(Mx,g),k=null,n=null!=d.timeout?d.timeout:5E3;0<n&&(k=window.setTimeout(function(){Nx(f,!0);var c=new Ox(Px,"Timeout reached for loading script "+b);Lw(h);Mw(h,!1,c)},n),g.fc=k);f.onload=f.onreadystatechange=function(){f.readyState&&"loaded"!=f.readyState&&"complete"!=f.readyState||(Nx(f,d.oh||!1,k),Lw(h),Mw(h,!0,null))};f.onerror=function(){Nx(f,!0,k);var c=new Ox(Qx,"Error while loading script "+b);Lw(h);
Mw(h,!1,c)};yf(f,{type:"text/javascript",charset:"UTF-8",src:b});Rx(e).appendChild(f);return h}function Rx(b){var c=b.getElementsByTagName("HEAD");return c&&0!=c.length?c[0]:b.documentElement}function Mx(){if(this&&this.pg){var b=this.pg;b&&"SCRIPT"==b.tagName&&Nx(b,!0,this.fc)}}function Nx(b,c,d){null!=d&&ba.clearTimeout(d);b.onload=ca;b.onerror=ca;b.onreadystatechange=ca;c&&window.setTimeout(function(){If(b)},0)}var Qx=0,Px=1;
function Ox(b,c){var d="Jsloader error (code #"+b+")";c&&(d+=": "+c);wa.call(this,d);this.code=b}v(Ox,wa);function Sx(b,c){this.c=new Wr(b);this.a=c?c:"callback";this.fc=5E3}var Tx=0;
Sx.prototype.send=function(b,c,d,e){b=b||null;e=e||"_"+(Tx++).toString(36)+ta().toString(36);ba._callbacks_||(ba._callbacks_={});var f=this.c.clone();if(b)for(var g in b)if(!b.hasOwnProperty||b.hasOwnProperty(g)){var h=f,k=g,n=b[g];ga(n)||(n=[String(n)]);os(h.a,k,n)}c&&(ba._callbacks_[e]=Ux(e,c),c=this.a,g="_callbacks_."+e,ga(g)||(g=[String(g)]),os(f.a,c,g));c=Lx(f.toString(),{timeout:this.fc,oh:!0});Pw(c,null,Vx(e,b,d),void 0);return{aa:e,hf:c}};
Sx.prototype.cancel=function(b){b&&(b.hf&&b.hf.cancel(),b.aa&&Wx(b.aa,!1))};function Vx(b,c,d){return function(){Wx(b,!1);d&&d(c)}}function Ux(b,c){return function(d){Wx(b,!0);c.apply(void 0,arguments)}}function Wx(b,c){ba._callbacks_[b]&&(c?delete ba._callbacks_[b]:ba._callbacks_[b]=ca)};function Xx(b){var c=/\{z\}/g,d=/\{x\}/g,e=/\{y\}/g,f=/\{-y\}/g;return function(g){return null===g?void 0:b.replace(c,g[0].toString()).replace(d,g[1].toString()).replace(e,g[2].toString()).replace(f,function(){return((1<<g[0])-g[2]-1).toString()})}}function Yx(b){return Zx(Sa(b,Xx))}function Zx(b){return 1===b.length?b[0]:function(c,d,e){return null===c?void 0:b[Wb((c[1]<<c[0])+c[2],b.length)](c,d,e)}}function $x(){}
function ay(b,c){var d=[0,0,0];return function(e,f,g){return null===e?void 0:c(b(e,g,d),f,g)}}function by(b){var c=[],d=/\{(\d)-(\d)\}/.exec(b)||/\{([a-z])-([a-z])\}/.exec(b);if(d){var e=d[2].charCodeAt(0),f;for(f=d[1].charCodeAt(0);f<=e;++f)c.push(b.replace(d[0],String.fromCharCode(f)))}else c.push(b);return c};function cy(b){ph.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,opaque:b.opaque,projection:b.projection,state:m(b.state)?b.state:void 0,tileGrid:b.tileGrid,tilePixelRatio:b.tilePixelRatio,wrapX:b.wrapX});this.tileUrlFunction=m(b.tileUrlFunction)?b.tileUrlFunction:$x;this.crossOrigin=m(b.crossOrigin)?b.crossOrigin:null;this.tileLoadFunction=m(b.tileLoadFunction)?b.tileLoadFunction:dy;this.tileClass=m(b.tileClass)?b.tileClass:hw}v(cy,ph);function dy(b,c){b.Ta().src=c}l=cy.prototype;
l.Vb=function(b,c,d,e,f){var g=this.nb(b,c,d);if(Wg(this.a,g))return this.a.get(g);b=[b,c,d];c=m(f)?f:this.e;d=rh(this,c);var h;if(h=m(this.H)){h=b[0];var k=mh(d,h);if(m(k)){var n=nh(c),p=c.J();h=d.pa(h)*k==n.pa(h)*of(fh(n,p,h))}else h=c.d}h?this.H?(h=b[0],k=b[1],c=kh(d,h,c),k<c.a||k>c.d?(k=Wb(k,of(c)),c=[h,k,b[2]]):c=b):(h=b[1],c=kh(d,b[0],c),c=h<c.a||h>c.d?null:b):c=b;e=null===c?void 0:this.tileUrlFunction(c,e,f);e=new this.tileClass(b,m(e)?0:4,m(e)?e:"",this.crossOrigin,this.tileLoadFunction);
w(e,"change",this.tk,!1,this);this.a.set(g,e);return e};l.bb=function(){return this.tileLoadFunction};l.cb=function(){return this.tileUrlFunction};l.tk=function(b){b=b.target;switch(b.state){case 1:this.dispatchEvent(new sh("tileloadstart",b));break;case 2:this.dispatchEvent(new sh("tileloadend",b));break;case 3:this.dispatchEvent(new sh("tileloaderror",b))}};l.jb=function(b){this.a.clear();this.tileLoadFunction=b;this.l()};l.ua=function(b){this.a.clear();this.tileUrlFunction=b;this.l()};
l.Oe=function(b,c,d){b=this.nb(b,c,d);Wg(this.a,b)&&this.a.get(b)};function ey(b){var c=m(b.extent)?b.extent:Sl,d=oh(c,b.maxZoom,b.tileSize);ch.call(this,{minZoom:b.minZoom,origin:le(c,"top-left"),resolutions:d,tileSize:b.tileSize})}v(ey,ch);ey.prototype.Db=function(b){b=m(b)?b:{};var c=this.minZoom,d=this.maxZoom,e=null;if(m(b.extent)){var e=Array(d+1),f;for(f=0;f<=d;++f)e[f]=f<c?null:fh(this,b.extent,f)}return function(b,f,k){f=b[0];if(f<c||d<f)return null;var n=b[1];b=b[2];return b<-Math.pow(2,f)||-1<b||null!==e&&!mf(e[f],n,b)?null:ff(f,n,-b-1,k)}};
ey.prototype.td=function(b,c){if(b[0]<this.maxZoom){var d=2*b[1],e=2*b[2];return lf(d,d+1,e,e+1,c)}return null};ey.prototype.gd=function(b,c,d,e){e=lf(0,b[1],0,b[2],e);for(b=b[0]-1;b>=this.minZoom;--b)if(e.a=e.d>>=1,e.b=e.c>>=1,c.call(d,b,e))return!0;return!1};function fy(b){cy.call(this,{crossOrigin:"anonymous",opaque:!0,projection:ze("EPSG:3857"),state:"loading",tileLoadFunction:b.tileLoadFunction,wrapX:m(b.wrapX)?b.wrapX:!0});this.d=m(b.culture)?b.culture:"en-us";this.b=m(b.maxZoom)?b.maxZoom:-1;var c=new Wr((Sb?"https:":"http:")+"//dev.virtualearth.net/REST/v1/Imagery/Metadata/"+b.imagerySet);(new Sx(c,"jsonp")).send({include:"ImageryProviders",uriScheme:Sb?"https":"http",key:b.key},ra(this.g,this))}v(fy,cy);var gy=new qf({html:'<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'});
fy.prototype.g=function(b){if(200!=b.statusCode||"OK"!=b.statusDescription||"ValidCredentials"!=b.authenticationResultCode||1!=b.resourceSets.length||1!=b.resourceSets[0].resources.length)bh(this,"error");else{var c=b.brandLogoUri;Sb&&-1==c.indexOf("https")&&(c=c.replace("http","https"));var d=b.resourceSets[0].resources[0],e=-1==this.b?d.zoomMax:this.b,f=new ey({extent:lh(this.e),minZoom:d.zoomMin,maxZoom:e,tileSize:d.imageWidth});this.tileGrid=f;var g=this.d;this.tileUrlFunction=ay(f.Db(),Zx(Sa(d.imageUrlSubdomains,
function(b){var c=d.imageUrl.replace("{subdomain}",b).replace("{culture}",g);return function(b){return null===b?void 0:c.replace("{quadkey}",hf(b))}})));if(d.imageryProviders){var h=De(ze("EPSG:4326"),this.e);b=Sa(d.imageryProviders,function(b){var c=b.attribution,d={};Qa(b.coverageAreas,function(b){var c=b.zoomMin,g=Math.min(b.zoomMax,e);b=b.bbox;b=te([b[1],b[0],b[3],b[2]],h);var k,n;for(k=c;k<=g;++k)n=k.toString(),c=fh(f,b,k),n in d?d[n].push(c):d[n]=[c]});return new qf({html:c,tileRanges:d})});
b.push(gy);this.f=b}this.D=c;bh(this,"ready")}};function hy(b){vn.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,projection:b.projection});this.p=void 0;this.r=m(b.distance)?b.distance:20;this.o=[];this.a=b.source;this.a.s("change",hy.prototype.N,this)}v(hy,vn);hy.prototype.H=function(){return this.a};hy.prototype.Hb=function(b,c,d){c!==this.p&&(this.clear(),this.p=c,this.a.Hb(b,c,d),iy(this),this.Ga(this.o))};hy.prototype.N=function(){this.clear();iy(this);this.Ga(this.o);this.l()};
function iy(b){if(m(b.p)){b.o.length=0;for(var c=Sd(),d=b.r*b.p,e=b.a.Aa(),f={},g=0,h=e.length;g<h;g++){var k=e[g];tb(f,ma(k).toString())||(k=k.R().Q(),be(k,c),Wd(c,d,c),k=sn(b.a.b,c),k=Ra(k,function(b){b=ma(b).toString();return b in f?!1:f[b]=!0}),b.o.push(jy(k)))}}}function jy(b){for(var c=b.length,d=[0,0],e=0;e<c;e++){var f=b[e].R().Q();vd(d,f)}c=1/c;d[0]*=c;d[1]*=c;d=new O(new Nk(d));d.set("features",b);return d};function ky(b,c,d){if(ka(b))d&&(b=ra(b,d));else if(b&&"function"==typeof b.handleEvent)b=ra(b.handleEvent,b);else throw Error("Invalid listener argument");return 2147483647<c?-1:ba.setTimeout(b,c||0)};function ly(){}ly.prototype.a=null;function my(b){var c;(c=b.a)||(c={},ny(b)&&(c[0]=!0,c[1]=!0),c=b.a=c);return c};var oy;function py(){}v(py,ly);function qy(b){return(b=ny(b))?new ActiveXObject(b):new XMLHttpRequest}function ny(b){if(!b.c&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var c=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],d=0;d<c.length;d++){var e=c[d];try{return new ActiveXObject(e),b.c=e}catch(f){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return b.c}oy=new py;function ry(b){hd.call(this);this.r=new Th;this.i=b||null;this.a=!1;this.n=this.V=null;this.f=this.o="";this.c=this.q=this.d=this.k=!1;this.g=0;this.b=null;this.e=sy;this.p=this.D=!1}v(ry,hd);var sy="",ty=/^https?$/i,uy=["POST","PUT"];l=ry.prototype;
l.send=function(b,c,d,e){if(this.V)throw Error("[goog.net.XhrIo] Object is active with another request="+this.o+"; newUri="+b);c=c?c.toUpperCase():"GET";this.o=b;this.f="";this.k=!1;this.a=!0;this.V=this.i?qy(this.i):qy(oy);this.n=this.i?my(this.i):my(oy);this.V.onreadystatechange=ra(this.Xf,this);try{this.q=!0,this.V.open(c,String(b),!0),this.q=!1}catch(f){vy(this,f);return}b=d||"";var g=this.r.clone();e&&Sh(e,function(b,c){g.set(c,b)});e=Ua(g.G(),wy);d=ba.FormData&&b instanceof ba.FormData;!Wa(uy,
c)||e||d||g.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");g.forEach(function(b,c){this.V.setRequestHeader(c,b)},this);this.e&&(this.V.responseType=this.e);"withCredentials"in this.V&&(this.V.withCredentials=this.D);try{xy(this),0<this.g&&((this.p=yy(this.V))?(this.V.timeout=this.g,this.V.ontimeout=ra(this.fc,this)):this.b=ky(this.fc,this.g,this)),this.d=!0,this.V.send(b),this.d=!1}catch(h){vy(this,h)}};function yy(b){return Gb&&Pb(9)&&ja(b.timeout)&&m(b.ontimeout)}
function wy(b){return"content-type"==b.toLowerCase()}l.fc=function(){"undefined"!=typeof aa&&this.V&&(this.f="Timed out after "+this.g+"ms, aborting",this.dispatchEvent("timeout"),this.V&&this.a&&(this.a=!1,this.c=!0,this.V.abort(),this.c=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),zy(this)))};function vy(b,c){b.a=!1;b.V&&(b.c=!0,b.V.abort(),b.c=!1);b.f=c;Ay(b);zy(b)}function Ay(b){b.k||(b.k=!0,b.dispatchEvent("complete"),b.dispatchEvent("error"))}
l.P=function(){this.V&&(this.a&&(this.a=!1,this.c=!0,this.V.abort(),this.c=!1),zy(this,!0));ry.T.P.call(this)};l.Xf=function(){this.oa||(this.q||this.d||this.c?By(this):this.il())};l.il=function(){By(this)};
function By(b){if(b.a&&"undefined"!=typeof aa&&(!b.n[1]||4!=Cy(b)||2!=Dy(b)))if(b.d&&4==Cy(b))ky(b.Xf,0,b);else if(b.dispatchEvent("readystatechange"),4==Cy(b)){b.a=!1;try{if(Ey(b))b.dispatchEvent("complete"),b.dispatchEvent("success");else{var c;try{c=2<Cy(b)?b.V.statusText:""}catch(d){c=""}b.f=c+" ["+Dy(b)+"]";Ay(b)}}finally{zy(b)}}}function zy(b,c){if(b.V){xy(b);var d=b.V,e=b.n[0]?ca:null;b.V=null;b.n=null;c||b.dispatchEvent("ready");try{d.onreadystatechange=e}catch(f){}}}
function xy(b){b.V&&b.p&&(b.V.ontimeout=null);ja(b.b)&&(ba.clearTimeout(b.b),b.b=null)}function Ey(b){var c=Dy(b),d;a:switch(c){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:d=!0;break a;default:d=!1}if(!d){if(c=0===c)b=Qr(String(b.o))[1]||null,!b&&self.location&&(b=self.location.protocol,b=b.substr(0,b.length-1)),c=!ty.test(b?b.toLowerCase():"");d=c}return d}function Cy(b){return b.V?b.V.readyState:0}function Dy(b){try{return 2<Cy(b)?b.V.status:-1}catch(c){return-1}}
function Fy(b){try{return b.V?b.V.responseText:""}catch(c){return""}}function Gy(b){try{if(!b.V)return null;if("response"in b.V)return b.V.response;switch(b.e){case sy:case "text":return b.V.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in b.V)return b.V.mozResponseArrayBuffer}return null}catch(c){return null}};function Z(b){vn.call(this,{attributions:b.attributions,logo:b.logo,projection:b.projection});this.format=b.format}v(Z,vn);
function Hy(b,c,d,e,f){var g=new ry;g.e="binary"==b.format.O()&&Xf?"arraybuffer":"text";w(g,"complete",function(b){b=b.target;if(Ey(b)){var c=this.format.O(),g;if("binary"==c&&Xf)g=Gy(b);else if("json"==c)g=Fy(b);else if("text"==c)g=Fy(b);else if("xml"==c){if(!Gb)try{g=b.V?b.V.responseXML:null}catch(p){g=null}null!=g||(g=pq(Fy(b)))}null!=g?d.call(f,this.a(g)):bh(this,"error")}else e.call(f);pc(b)},!1,b);g.send(c)}Z.prototype.a=function(b){return this.format.ma(b,{featureProjection:this.e})};function $(b){Z.call(this,{attributions:b.attributions,format:b.format,logo:b.logo,projection:b.projection});m(b.arrayBuffer)&&this.lb(this.a(b.arrayBuffer));m(b.doc)&&this.lb(this.a(b.doc));m(b.node)&&this.lb(this.a(b.node));m(b.object)&&this.lb(this.a(b.object));m(b.text)&&this.lb(this.a(b.text));if(m(b.url)||m(b.urls))if(bh(this,"loading"),m(b.url)&&Hy(this,b.url,this.p,this.o,this),m(b.urls)){b=b.urls;var c,d;c=0;for(d=b.length;c<d;++c)Hy(this,b[c],this.p,this.o,this)}}v($,Z);
$.prototype.o=function(){bh(this,"error")};$.prototype.p=function(b){this.lb(b);bh(this,"ready")};function Iy(b){b=m(b)?b:{};$.call(this,{attributions:b.attributions,extent:b.extent,format:new Kp({defaultDataProjection:b.defaultProjection}),logo:b.logo,object:b.object,projection:b.projection,text:b.text,url:b.url,urls:b.urls})}v(Iy,$);function Jy(b){b=m(b)?b:{};$.call(this,{attributions:b.attributions,doc:b.doc,extent:b.extent,format:new ar,logo:b.logo,node:b.node,projection:b.projection,text:b.text,url:b.url,urls:b.urls})}v(Jy,$);function Ky(b){b=m(b)?b:{};$.call(this,{format:new Lr({altitudeMode:b.altitudeMode}),projection:b.projection,text:b.text,url:b.url,urls:b.urls})}v(Ky,$);function Ly(b){gn.call(this,{projection:b.projection,resolutions:b.resolutions});this.N=m(b.crossOrigin)?b.crossOrigin:null;this.g=m(b.displayDpi)?b.displayDpi:96;this.d=m(b.params)?b.params:{};var c;m(b.url)?c=jw(b.url,this.d,ra(this.$j,this)):c=kw;this.p=c;this.a=m(b.imageLoadFunction)?b.imageLoadFunction:nn;this.S=m(b.hidpi)?b.hidpi:!0;this.H=m(b.metersPerUnit)?b.metersPerUnit:1;this.k=m(b.ratio)?b.ratio:1;this.U=m(b.useOverlay)?b.useOverlay:!1;this.b=null;this.o=0}v(Ly,gn);l=Ly.prototype;
l.Zj=function(){return this.d};l.sc=function(b,c,d,e){c=hn(this,c);d=this.S?d:1;var f=this.b;if(null!==f&&this.o==this.c&&f.resolution==c&&f.f==d&&Zd(f.J(),b))return f;1!=this.k&&(b=b.slice(),se(b,this.k));e=this.p(b,[qe(b)/c*d,ne(b)/c*d],e);m(e)?(f=new gw(b,c,d,this.f,e,this.N,this.a),w(f,"change",this.r,!1,this)):f=null;this.b=f;this.o=this.c;return f};l.Yj=function(){return this.a};l.bk=function(b){Db(this.d,b);this.l()};
l.$j=function(b,c,d,e){var f;f=this.H;var g=qe(d),h=ne(d),k=e[0],n=e[1],p=.0254/this.g;f=n*g>k*h?g*f/(k*p):h*f/(n*p);d=ke(d);e={OPERATION:this.U?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol.source.ImageMapGuide source",CLIP:"1",SETDISPLAYDPI:this.g,SETDISPLAYWIDTH:Math.round(e[0]),SETDISPLAYHEIGHT:Math.round(e[1]),SETVIEWSCALE:f,SETVIEWCENTERX:d[0],SETVIEWCENTERY:d[1]};Db(e,c);return Tr(Vr([b],e))};l.ak=function(b){this.b=null;this.a=b;this.l()};function My(b){var c=m(b.attributions)?b.attributions:null,d=b.imageExtent,e,f;m(b.imageSize)&&(e=ne(d)/b.imageSize[1],f=[e]);var g=m(b.crossOrigin)?b.crossOrigin:null,h=m(b.imageLoadFunction)?b.imageLoadFunction:nn;gn.call(this,{attributions:c,logo:b.logo,projection:ze(b.projection),resolutions:f});this.a=new gw(d,e,1,c,b.url,g,h)}v(My,gn);My.prototype.sc=function(b){return pe(b,this.a.J())?this.a:null};function Ny(b){b=m(b)?b:{};gn.call(this,{attributions:b.attributions,logo:b.logo,projection:b.projection,resolutions:b.resolutions});this.S=m(b.crossOrigin)?b.crossOrigin:null;this.d=b.url;this.k=m(b.imageLoadFunction)?b.imageLoadFunction:nn;this.b=b.params;this.g=!0;Oy(this);this.N=b.serverType;this.U=m(b.hidpi)?b.hidpi:!0;this.a=null;this.o=[0,0];this.H=0;this.p=m(b.ratio)?b.ratio:1.5}v(Ny,gn);var Py=[101,101];l=Ny.prototype;
l.hk=function(b,c,d,e){if(m(this.d)){var f=me(b,c,0,Py),g={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.b.LAYERS};Db(g,this.b,e);e=Math.floor((f[3]-b[1])/c);g[this.g?"I":"X"]=Math.floor((b[0]-f[0])/c);g[this.g?"J":"Y"]=e;return Qy(this,f,Py,1,ze(d),g)}};l.jk=function(){return this.b};
l.sc=function(b,c,d,e){if(!m(this.d))return null;c=hn(this,c);1==d||this.U&&m(this.N)||(d=1);var f=this.a;if(null!==f&&this.H==this.c&&f.resolution==c&&f.f==d&&Zd(f.J(),b))return f;f={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};Db(f,this.b);b=b.slice();var g=(b[0]+b[2])/2,h=(b[1]+b[3])/2;if(1!=this.p){var k=this.p*qe(b)/2,n=this.p*ne(b)/2;b[0]=g-k;b[1]=h-n;b[2]=g+k;b[3]=h+n}var k=c/d,n=Math.ceil(qe(b)/k),p=Math.ceil(ne(b)/k);b[0]=g-k*n/2;b[2]=g+k*n/2;b[1]=h-k*
p/2;b[3]=h+k*p/2;this.o[0]=n;this.o[1]=p;e=Qy(this,b,this.o,d,e,f);this.a=new gw(b,c,d,this.f,e,this.S,this.k);this.H=this.c;w(this.a,"change",this.r,!1,this);return this.a};l.ik=function(){return this.k};
function Qy(b,c,d,e,f,g){g[b.g?"CRS":"SRS"]=f.a;"STYLES"in b.b||(g.STYLES=new String(""));if(1!=e)switch(b.N){case "geoserver":g.FORMAT_OPTIONS="dpi:"+(90*e+.5|0);break;case "mapserver":g.MAP_RESOLUTION=90*e;break;case "carmentaserver":case "qgis":g.DPI=90*e}g.WIDTH=d[0];g.HEIGHT=d[1];d=f.b;var h;b.g&&"ne"==d.substr(0,2)?h=[c[1],c[0],c[3],c[2]]:h=c;g.BBOX=h.join(",");return Tr(Vr([b.d],g))}l.kk=function(){return this.d};l.lk=function(b){this.a=null;this.k=b;this.l()};
l.mk=function(b){b!=this.d&&(this.d=b,this.a=null,this.l())};l.nk=function(b){Db(this.b,b);Oy(this);this.a=null;this.l()};function Oy(b){b.g=0<=La(zb(b.b,"VERSION","1.3.0"),"1.3")};function Ry(b){b=m(b)?b:{};$.call(this,{attributions:b.attributions,doc:b.doc,format:new qs({extractStyles:b.extractStyles,defaultStyle:b.defaultStyle}),logo:b.logo,node:b.node,projection:b.projection,text:b.text,url:b.url,urls:b.urls})}v(Ry,$);function Sy(b){var c=m(b.projection)?b.projection:"EPSG:3857",d=new ey({extent:lh(c),maxZoom:b.maxZoom,tileSize:b.tileSize});cy.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,logo:b.logo,projection:c,tileGrid:d,tileLoadFunction:b.tileLoadFunction,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:$x,wrapX:m(b.wrapX)?b.wrapX:!0});this.i=d.Db();m(b.tileUrlFunction)?this.ua(b.tileUrlFunction):m(b.urls)?this.ua(Yx(b.urls)):m(b.url)&&this.b(b.url)}v(Sy,cy);
Sy.prototype.ua=function(b){Sy.T.ua.call(this,ay(this.i,b))};Sy.prototype.b=function(b){this.ua(Yx(by(b)))};function Ty(b){b=m(b)?b:{};var c;m(b.attributions)?c=b.attributions:c=[Uy];var d=Sb?"https:":"http:";Sy.call(this,{attributions:c,crossOrigin:m(b.crossOrigin)?b.crossOrigin:"anonymous",opaque:!0,maxZoom:m(b.maxZoom)?b.maxZoom:19,tileLoadFunction:b.tileLoadFunction,url:m(b.url)?b.url:d+"//{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",wrapX:b.wrapX})}v(Ty,Sy);var Uy=new qf({html:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});function Vy(b){b=m(b)?b:{};var c=Wy[b.layer];this.d=b.layer;var d=Sb?"https:":"http:";Sy.call(this,{attributions:c.attributions,crossOrigin:"anonymous",logo:"//developer.mapquest.com/content/osm/mq_logo.png",maxZoom:c.maxZoom,opaque:!0,tileLoadFunction:b.tileLoadFunction,url:m(b.url)?b.url:d+"//otile{1-4}-s.mqcdn.com/tiles/1.0.0/"+this.d+"/{z}/{x}/{y}.jpg"})}v(Vy,Sy);
var Xy=new qf({html:'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a>'}),Wy={osm:{maxZoom:19,attributions:[Xy,Uy]},sat:{maxZoom:18,attributions:[Xy,new qf({html:"Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency"})]},hyb:{maxZoom:18,attributions:[Xy,Uy]}};Vy.prototype.g=function(){return this.d};function Yy(b){b=m(b)?b:{};$.call(this,{attributions:b.attributions,doc:b.doc,format:new $t,logo:b.logo,node:b.node,projection:b.projection,text:b.text,url:b.url,urls:b.urls})}v(Yy,$);function Zy(b){Z.call(this,{attributions:b.attributions,format:b.format,logo:b.logo,projection:b.projection});this.p=new qn;this.r=b.loader;this.H=m(b.strategy)?b.strategy:Kx;this.o={}}v(Zy,Z);Zy.prototype.lb=function(b){var c=[],d,e;d=0;for(e=b.length;d<e;++d){var f=b[d],g=f.aa;m(g)?g in this.o||(c.push(f),this.o[g]=!0):c.push(f)}Zy.T.lb.call(this,c)};Zy.prototype.clear=function(b){xb(this.o);this.p.clear();Zy.T.clear.call(this,b)};
Zy.prototype.Hb=function(b,c,d){var e=this.p;b=this.H(b,c);var f,g;f=0;for(g=b.length;f<g;++f){var h=b[f];un(e,h,function(b){return Zd(b.extent,h)})||(this.r.call(this,h,c,d),e.ta(h,{extent:h.slice()}))}};var $y={terrain:{Za:"jpg",opaque:!0},"terrain-background":{Za:"jpg",opaque:!0},"terrain-labels":{Za:"png",opaque:!1},"terrain-lines":{Za:"png",opaque:!1},"toner-background":{Za:"png",opaque:!0},toner:{Za:"png",opaque:!0},"toner-hybrid":{Za:"png",opaque:!1},"toner-labels":{Za:"png",opaque:!1},"toner-lines":{Za:"png",opaque:!1},"toner-lite":{Za:"png",opaque:!0},watercolor:{Za:"jpg",opaque:!0}},az={terrain:{minZoom:4,maxZoom:18},toner:{minZoom:0,maxZoom:20},watercolor:{minZoom:3,maxZoom:16}};
function bz(b){var c=b.layer.indexOf("-"),d=$y[b.layer],e=Sb?"https://stamen-tiles-{a-d}.a.ssl.fastly.net/":"http://{a-d}.tile.stamen.com/";Sy.call(this,{attributions:cz,crossOrigin:"anonymous",maxZoom:az[-1==c?b.layer:b.layer.slice(0,c)].maxZoom,opaque:d.opaque,tileLoadFunction:b.tileLoadFunction,url:m(b.url)?b.url:e+b.layer+"/{z}/{x}/{y}."+d.Za})}v(bz,Sy);
var cz=[new qf({html:'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'}),Uy];function dz(b){b=m(b)?b:{};var c=m(b.params)?b.params:{};cy.call(this,{attributions:b.attributions,logo:b.logo,projection:b.projection,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction,tileUrlFunction:ra(this.rk,this),wrapX:m(b.wrapX)?b.wrapX:!0});var d=b.urls;!m(d)&&m(b.url)&&(d=by(b.url));this.d=null!=d?d:[];this.b=c;this.g=Sd()}v(dz,cy);l=dz.prototype;l.ok=function(){return this.b};l.Xb=function(b,c,d){b=dz.T.Xb.call(this,b,c,d);return 1==c?b:b*c+.5|0};l.pk=function(){return this.d};
l.qk=function(b){b=m(b)?by(b):null;this.Of(b)};l.Of=function(b){this.d=null!=b?b:[];this.l()};
l.rk=function(b,c,d){var e=this.tileGrid;null===e&&(e=rh(this,d));if(!(e.a.length<=b[0])){var f=eh(e,b,this.g),g=e.pa(b[0]);1!=c&&(g=g*c+.5|0);e={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};Db(e,this.b);var h=this.d;0==h.length?b=void 0:(d=d.a.split(":").pop(),e.SIZE=g+","+g,e.BBOX=f.join(","),e.BBOXSR=d,e.IMAGESR=d,e.DPI=90*c,b=1==h.length?h[0]:h[Wb((b[1]<<b[0])+b[2],h.length)],ya(b,"/")||(b+="/"),ya(b,"MapServer/")?b+="export":ya(b,"ImageServer/")&&(b+="exportImage"),b=Tr(Vr([b],e)));return b}};
l.sk=function(b){Db(this.b,b);this.l()};function ez(b,c){Zg.call(this,b,2);this.b=c.pa(b[0]);this.c={}}v(ez,Zg);ez.prototype.Ta=function(b){b=m(b)?ma(b):-1;if(b in this.c)return this.c[b];var c=this.b,d=Nf(c,c);d.strokeStyle="black";d.strokeRect(.5,.5,c+.5,c+.5);d.fillStyle="black";d.textAlign="center";d.textBaseline="middle";d.font="24px sans-serif";d.fillText(jf(this.a),c/2,c/2);return this.c[b]=d.canvas};function fz(b){ph.call(this,{opaque:!1,projection:b.projection,tileGrid:b.tileGrid})}v(fz,ph);
fz.prototype.Vb=function(b,c,d){var e=this.nb(b,c,d);if(Wg(this.a,e))return this.a.get(e);b=new ez([b,c,d],this.tileGrid);this.a.set(e,b);return b};function gz(b){cy.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,projection:ze("EPSG:3857"),state:"loading",tileLoadFunction:b.tileLoadFunction,wrapX:m(b.wrapX)?b.wrapX:!0});(new Sx(b.url)).send(void 0,ra(this.b,this))}v(gz,cy);
gz.prototype.b=function(b){var c=ze("EPSG:4326"),d=this.e,e;m(b.bounds)&&(e=te(b.bounds,De(c,d)));var f=b.minzoom||0,g=b.maxzoom||22;this.tileGrid=d=new ey({extent:lh(d),maxZoom:g,minZoom:f});this.tileUrlFunction=ay(d.Db({extent:e}),Yx(b.tiles));if(m(b.attribution)&&null===this.f){c=m(e)?e:c.J();e={};for(var h;f<=g;++f)h=f.toString(),e[h]=[fh(d,c,f)];this.f=[new qf({html:b.attribution,tileRanges:e})]}bh(this,"ready")};function hz(b){ph.call(this,{projection:ze("EPSG:3857"),state:"loading"});this.g=m(b.preemptive)?b.preemptive:!0;this.b=$x;this.d=void 0;(new Sx(b.url)).send(void 0,ra(this.uk,this))}v(hz,ph);l=hz.prototype;l.ci=function(){return this.d};l.wh=function(b,c,d,e,f){null===this.tileGrid?!0===f?Nh(function(){d.call(e,null)}):d.call(e,null):(c=this.tileGrid.Wb(b,c),iz(this.Vb(c[0],c[1],c[2],1,this.e),b,d,e,f))};
l.uk=function(b){var c=ze("EPSG:4326"),d=this.e,e;m(b.bounds)&&(e=te(b.bounds,De(c,d)));var f=b.minzoom||0,g=b.maxzoom||22;this.tileGrid=d=new ey({extent:lh(d),maxZoom:g,minZoom:f});this.d=b.template;var h=b.grids;if(null!=h){this.b=ay(d.Db({extent:e}),Yx(h));if(m(b.attribution)){c=m(e)?e:c.J();for(e={};f<=g;++f)h=f.toString(),e[h]=[fh(d,c,f)];this.f=[new qf({html:b.attribution,tileRanges:e})]}bh(this,"ready")}else bh(this,"error")};
l.Vb=function(b,c,d,e,f){var g=this.nb(b,c,d);if(Wg(this.a,g))return this.a.get(g);b=[b,c,d];e=this.b(b,e,f);e=new jz(b,m(e)?0:4,m(e)?e:"",eh(this.tileGrid,b),this.g);this.a.set(g,e);return e};l.Oe=function(b,c,d){b=this.nb(b,c,d);Wg(this.a,b)&&this.a.get(b)};function jz(b,c,d,e,f){Zg.call(this,b,c);this.g=d;this.c=e;this.n=f;this.d=this.f=this.b=null}v(jz,Zg);l=jz.prototype;l.Ta=function(){return null};
function kz(b,c){if(null===b.b||null===b.f||null===b.d)return null;var d=b.b[Math.floor((1-(c[1]-b.c[1])/(b.c[3]-b.c[1]))*b.b.length)];if(!ia(d))return null;d=d.charCodeAt(Math.floor((c[0]-b.c[0])/(b.c[2]-b.c[0])*d.length));93<=d&&d--;35<=d&&d--;d=b.f[d-32];return null!=d?b.d[d]:null}function iz(b,c,d,e,f){0==b.state&&!0===f?(Uc(b,"change",function(){d.call(e,kz(this,c))},!1,b),lz(b)):!0===f?Nh(function(){d.call(e,kz(this,c))},b):d.call(e,kz(b,c))}l.qb=function(){return this.g};
l.si=function(){this.state=3;$g(this)};l.Fi=function(b){this.b=b.grid;this.f=b.keys;this.d=b.data;this.state=4;$g(this)};function lz(b){0==b.state&&(b.state=1,(new Sx(b.g)).send(void 0,ra(b.Fi,b),ra(b.si,b)))}l.load=function(){this.n&&lz(this)};function mz(b){Z.call(this,{attributions:b.attributions,format:b.format,logo:b.logo,projection:b.projection});this.p=b.tileGrid;this.r=$x;this.H=this.p.Db();this.o={};m(b.tileUrlFunction)?(this.r=b.tileUrlFunction,this.l()):m(b.urls)?(this.r=Yx(b.urls),this.l()):m(b.url)&&(this.r=Yx(by(b.url)),this.l())}v(mz,Z);l=mz.prototype;l.clear=function(){xb(this.o)};
function nz(b,c,d,e){var f=b.o;b=b.p.Wb(c,d);f=f[b[0]+"/"+b[1]+"/"+b[2]];if(m(f))for(b=0,d=f.length;b<d;++b){var g=f[b];if(g.R().Jb(c[0],c[1])&&e.call(void 0,g))break}}l.Fb=function(b,c,d,e){var f=this.p,g=this.o;c=jh(f,c);b=fh(f,b,c);for(var h,f=b.a;f<=b.d;++f)for(h=b.b;h<=b.c;++h){var k=g[c+"/"+f+"/"+h];if(m(k)){var n,p;n=0;for(p=k.length;n<p;++n){var q=d.call(e,k[n]);if(q)return q}}}};l.Aa=function(){var b=this.o,c=[],d;for(d in b)ab(c,b[d]);return c};
l.Eh=function(b,c){var d=[];nz(this,b,c,function(b){d.push(b)});return d};l.Hb=function(b,c,d){function e(b,c){k[b]=c;bh(this,"ready")}var f=this.H,g=this.p,h=this.r,k=this.o;c=jh(g,c);b=fh(g,b,c);var g=[c,0,0],n,p;for(n=b.a;n<=b.d;++n)for(p=b.b;p<=b.c;++p){var q=c+"/"+n+"/"+p;if(!(q in k)){g[0]=c;g[1]=n;g[2]=p;f(g,d,g);var r=h(g,1,d);m(r)&&(k[q]=[],Hy(this,r,sa(e,q),ca,this))}}};function oz(b){b=m(b)?b:{};var c=m(b.params)?b.params:{};cy.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,logo:b.logo,opaque:!zb(c,"TRANSPARENT",!0),projection:b.projection,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction,tileUrlFunction:ra(this.zk,this),wrapX:b.wrapX});var d=b.urls;!m(d)&&m(b.url)&&(d=by(b.url));this.d=null!=d?d:[];this.i=m(b.gutter)?b.gutter:0;this.b=c;this.g=!0;this.k=b.serverType;this.p=m(b.hidpi)?b.hidpi:!0;this.o="";pz(this);this.r=Sd();qz(this)}
v(oz,cy);l=oz.prototype;l.vk=function(b,c,d,e){d=ze(d);var f=this.tileGrid;null===f&&(f=rh(this,d));c=f.Wb(b,c);if(!(f.a.length<=c[0])){var g=f.na(c[0]),h=eh(f,c,this.r),f=f.pa(c[0]),k=this.i;0!==k&&(f+=2*k,h=Wd(h,g*k,h));k={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.b.LAYERS};Db(k,this.b,e);e=Math.floor((h[3]-b[1])/g);k[this.g?"I":"X"]=Math.floor((b[0]-h[0])/g);k[this.g?"J":"Y"]=e;return rz(this,c,f,h,1,d,k)}};l.jd=function(){return this.i};
l.nb=function(b,c,d){return this.o+oz.T.nb.call(this,b,c,d)};l.wk=function(){return this.b};
function rz(b,c,d,e,f,g,h){var k=b.d;if(0!=k.length){h.WIDTH=d;h.HEIGHT=d;h[b.g?"CRS":"SRS"]=g.a;"STYLES"in b.b||(h.STYLES=new String(""));if(1!=f)switch(b.k){case "geoserver":h.FORMAT_OPTIONS="dpi:"+(90*f+.5|0);break;case "mapserver":h.MAP_RESOLUTION=90*f;break;case "carmentaserver":case "qgis":h.DPI=90*f}d=g.b;b.g&&"ne"==d.substr(0,2)&&(b=e[0],e[0]=e[1],e[1]=b,b=e[2],e[2]=e[3],e[3]=b);h.BBOX=e.join(",");return Tr(Vr([1==k.length?k[0]:k[Wb((c[1]<<c[0])+c[2],k.length)]],h))}}
l.Xb=function(b,c,d){b=oz.T.Xb.call(this,b,c,d);return 1!=c&&this.p&&m(this.k)?b*c+.5|0:b};l.xk=function(){return this.d};function pz(b){var c=0,d=[],e,f;e=0;for(f=b.d.length;e<f;++e)d[c++]=b.d[e];for(var g in b.b)d[c++]=g+"-"+b.b[g];b.o=d.join("#")}l.yk=function(b){b=m(b)?by(b):null;this.Pf(b)};l.Pf=function(b){this.d=null!=b?b:[];pz(this);this.l()};
l.zk=function(b,c,d){var e=this.tileGrid;null===e&&(e=rh(this,d));if(!(e.a.length<=b[0])){1==c||this.p&&m(this.k)||(c=1);var f=e.na(b[0]),g=eh(e,b,this.r),e=e.pa(b[0]),h=this.i;0!==h&&(e+=2*h,g=Wd(g,f*h,g));1!=c&&(e=e*c+.5|0);f={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};Db(f,this.b);return rz(this,b,e,g,c,d,f)}};l.Ak=function(b){Db(this.b,b);pz(this);qz(this);this.l()};function qz(b){b.g=0<=La(zb(b.b,"VERSION","1.3.0"),"1.3")};function sz(b){b=m(b)?b:{};$.call(this,{attributions:b.attributions,extent:b.extent,format:new Du({defaultDataProjection:b.defaultProjection}),logo:b.logo,object:b.object,projection:b.projection,text:b.text,url:b.url})}v(sz,$);function tz(b){this.d=b.matrixIds;ch.call(this,{origin:b.origin,origins:b.origins,resolutions:b.resolutions,tileSize:b.tileSize,tileSizes:b.tileSizes,widths:b.widths})}v(tz,ch);tz.prototype.n=function(){return this.d};
function uz(b){var c=[],d=[],e=[],f=[],g=[],h;h=ze(b.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var k=h.od(),n="ne"==h.b.substr(0,2);db(b.TileMatrix,function(b,c){return c.ScaleDenominator-b.ScaleDenominator});Qa(b.TileMatrix,function(b){d.push(b.Identifier);n?e.push([b.TopLeftCorner[1],b.TopLeftCorner[0]]):e.push(b.TopLeftCorner);c.push(2.8E-4*b.ScaleDenominator/k);f.push(b.TileWidth);g.push(b.MatrixWidth)});return new tz({origins:e,resolutions:c,matrixIds:d,tileSizes:f,
widths:g})};function vz(b){function c(b){b="KVP"==d?Tr(Vr([b],f)):b.replace(/\{(\w+?)\}/g,function(b,c){return c.toLowerCase()in f?f[c.toLowerCase()]:b});return function(c){if(null!==c){var f={TileMatrix:e.d[c[0]],TileCol:c[1],TileRow:c[2]};Db(f,g);c=b;return c="KVP"==d?Tr(Vr([c],f)):c.replace(/\{(\w+?)\}/g,function(b,c){return f[c]})}}}this.p=m(b.version)?b.version:"1.0.0";this.d=m(b.format)?b.format:"image/jpeg";this.b=m(b.dimensions)?b.dimensions:{};this.i="";wz(this);this.k=b.layer;this.g=b.matrixSet;this.o=
b.style;var d=m(b.requestEncoding)?b.requestEncoding:"KVP",e=b.tileGrid,f={layer:this.k,style:this.o,tilematrixset:this.g};"KVP"==d&&Db(f,{Service:"WMTS",Request:"GetTile",Version:this.p,Format:this.d});var g=this.b,h=$x,k=b.urls;!m(k)&&m(b.url)&&(k=by(b.url));m(k)&&(h=Zx(Sa(k,c)));var n=Sd(),h=ay(function(b,c,d){if(e.a.length<=b[0])return null;var f=b[1],g=-b[2]-1,h=eh(e,b,n);c=c.J();return!pe(h,c)||pe(h,c)&&(h[0]==c[2]||h[2]==c[0]||h[1]==c[3]||h[3]==c[1])?null:ff(b[0],f,g,d)},h);cy.call(this,{attributions:b.attributions,
crossOrigin:b.crossOrigin,logo:b.logo,projection:b.projection,tileClass:b.tileClass,tileGrid:e,tileLoadFunction:b.tileLoadFunction,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:h,wrapX:m(b.wrapX)?b.wrapX:!1})}v(vz,cy);l=vz.prototype;l.Ch=function(){return this.b};l.Gh=function(){return this.d};l.nb=function(b,c,d){return this.i+vz.T.nb.call(this,b,c,d)};l.Bk=function(){return this.k};l.Sh=function(){return this.g};l.Ck=function(){return this.o};l.gi=function(){return this.p};
function wz(b){var c=0,d=[],e;for(e in b.b)d[c++]=e+"-"+b.b[e];b.i=d.join("/")}l.rm=function(b){Db(this.b,b);wz(this);this.l()};function xz(b){var c=m(b)?b:c;ch.call(this,{origin:[0,0],resolutions:c.resolutions})}v(xz,ch);xz.prototype.Db=function(b){b=m(b)?b:{};var c=this.minZoom,d=this.maxZoom,e=null;if(m(b.extent)){var e=Array(d+1),f;for(f=0;f<=d;++f)e[f]=f<c?null:fh(this,b.extent,f)}return function(b,f,k){f=b[0];if(f<c||d<f)return null;var n=Math.pow(2,f),p=b[1];if(0>p||n<=p)return null;b=b[2];return b<-n||-1<b||null!==e&&!mf(e[f],p,-b-1)?null:ff(f,p,-b-1,k)}};function yz(b){b=m(b)?b:{};var c=b.size,d=c[0],e=c[1],f=[],g=256;switch(m(b.tierSizeCalculation)?b.tierSizeCalculation:"default"){case "default":for(;d>g||e>g;)f.push([Math.ceil(d/g),Math.ceil(e/g)]),g+=g;break;case "truncated":for(;d>g||e>g;)f.push([Math.ceil(d/g),Math.ceil(e/g)]),d>>=1,e>>=1}f.push([1,1]);f.reverse();for(var g=[1],h=[0],e=1,d=f.length;e<d;e++)g.push(1<<e),h.push(f[e-1][0]*f[e-1][1]+h[e-1]);g.reverse();var g=new xz({resolutions:g}),k=b.url,c=ay(g.Db({extent:[0,0,c[0],c[1]]}),function(b){if(null!==
b){var c=b[0],d=b[1];b=b[2];return k+"TileGroup"+((d+b*f[c][0]+h[c])/256|0)+"/"+c+"-"+d+"-"+b+".jpg"}});cy.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,logo:b.logo,tileClass:zz,tileGrid:g,tileUrlFunction:c})}v(yz,cy);function zz(b,c,d,e,f){hw.call(this,b,c,d,e,f);this.d={}}v(zz,hw);
zz.prototype.Ta=function(b){var c=m(b)?ma(b).toString():"";if(c in this.d)return this.d[c];b=zz.T.Ta.call(this,b);if(2==this.state){if(256==b.width&&256==b.height)return this.d[c]=b;var d=Nf(256,256);d.drawImage(b,0,0);return this.d[c]=d.canvas}return b};function Az(b){b=m(b)?b:{};this.c=m(b.initialSize)?b.initialSize:256;this.b=m(b.maxSize)?b.maxSize:m(ua)?ua:2048;this.a=m(b.space)?b.space:1;this.f=[new Bz(this.c,this.a)];this.d=this.c;this.e=[new Bz(this.d,this.a)]}Az.prototype.add=function(b,c,d,e,f,g){if(c+this.a>this.b||d+this.a>this.b)return null;e=Cz(this,!1,b,c,d,e,g);if(null===e)return null;b=Cz(this,!0,b,c,d,m(f)?f:cd,g);return{offsetX:e.offsetX,offsetY:e.offsetY,image:e.image,wf:b.image}};
function Cz(b,c,d,e,f,g,h){var k=c?b.e:b.f,n,p,q;p=0;for(q=k.length;p<q;++p){n=k[p];n=n.add(d,e,f,g,h);if(null!==n)return n;null===n&&p===q-1&&(c?(n=Math.min(2*b.d,b.b),b.d=n):(n=Math.min(2*b.c,b.b),b.c=n),n=new Bz(n,b.a),k.push(n),++q)}}function Bz(b,c){this.a=c;this.c=[{x:0,y:0,width:b,height:b}];this.d={};this.b=Ef("CANVAS");this.b.width=b;this.b.height=b;this.f=this.b.getContext("2d")}Bz.prototype.get=function(b){return zb(this.d,b,null)};
Bz.prototype.add=function(b,c,d,e,f){var g,h,k;h=0;for(k=this.c.length;h<k;++h)if(g=this.c[h],g.width>=c+this.a&&g.height>=d+this.a)return k={offsetX:g.x+this.a,offsetY:g.y+this.a,image:this.b},this.d[b]=k,e.call(f,this.f,g.x+this.a,g.y+this.a),b=h,c=c+this.a,d=d+this.a,f=e=void 0,g.width-c>g.height-d?(e={x:g.x+c,y:g.y,width:g.width-c,height:g.height},f={x:g.x,y:g.y+d,width:c,height:g.height-d},Dz(this,b,e,f)):(e={x:g.x+c,y:g.y,width:g.width-c,height:d},f={x:g.x,y:g.y+d,width:g.width,height:g.height-
d},Dz(this,b,e,f)),k;return null};function Dz(b,c,d,e){c=[c,1];0<d.width&&0<d.height&&c.push(d);0<e.width&&0<e.height&&c.push(e);b.c.splice.apply(b.c,c)};function Ez(b){this.q=this.d=this.f=null;this.n=m(b.fill)?b.fill:null;this.N=[0,0];this.a=b.points;this.b=m(b.radius)?b.radius:b.radius1;this.e=m(b.radius2)?b.radius2:this.b;this.g=m(b.angle)?b.angle:0;this.c=m(b.stroke)?b.stroke:null;this.H=this.S=this.D=null;var c=b.atlasManager,d="",e="",f=0,g=null,h,k=0;null!==this.c&&(h=sg(this.c.a),k=this.c.c,m(k)||(k=1),g=this.c.b,Yf||(g=null),e=this.c.f,m(e)||(e="round"),d=this.c.d,m(d)||(d="round"),f=this.c.e,m(f)||(f=10));var n=2*(this.b+k)+1,d={strokeStyle:h,
Uc:k,size:n,lineCap:d,lineDash:g,lineJoin:e,miterLimit:f};if(m(c)){var n=Math.round(n),e=null===this.n,p;e&&(p=ra(this.Tf,this,d));f=this.xb();p=c.add(f,n,n,ra(this.Uf,this,d),p);this.d=p.image;this.N=[p.offsetX,p.offsetY];c=p.image.width;this.q=e?p.wf:this.d}else this.d=Ef("CANVAS"),this.d.height=n,this.d.width=n,c=n=this.d.width,p=this.d.getContext("2d"),this.Uf(d,p,0,0),null===this.n?(p=this.q=Ef("CANVAS"),p.height=d.size,p.width=d.size,p=p.getContext("2d"),this.Tf(d,p,0,0)):this.q=this.d;this.D=
[n/2,n/2];this.S=[n,n];this.H=[c,c];zj.call(this,{opacity:1,rotateWithView:!1,rotation:m(b.rotation)?b.rotation:0,scale:1,snapToPixel:m(b.snapToPixel)?b.snapToPixel:!0})}v(Ez,zj);l=Ez.prototype;l.wb=function(){return this.D};l.Hk=function(){return this.g};l.Ik=function(){return this.n};l.Kd=function(){return this.q};l.Bb=function(){return this.d};l.kd=function(){return this.H};l.Pc=function(){return 2};l.Cb=function(){return this.N};l.Jk=function(){return this.a};l.Kk=function(){return this.b};
l.bi=function(){return this.e};l.gb=function(){return this.S};l.Lk=function(){return this.c};l.we=ca;l.load=ca;l.Ne=ca;
l.Uf=function(b,c,d,e){var f;c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();this.e!==this.b&&(this.a*=2);for(d=0;d<=this.a;d++)e=2*d*Math.PI/this.a-Math.PI/2+this.g,f=0===d%2?this.b:this.e,c.lineTo(b.size/2+f*Math.cos(e),b.size/2+f*Math.sin(e));null!==this.n&&(c.fillStyle=sg(this.n.a),c.fill());null!==this.c&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Uc,null===b.lineDash||c.setLineDash(b.lineDash),c.lineCap=b.lineCap,c.lineJoin=b.lineJoin,c.miterLimit=b.miterLimit,c.stroke());c.closePath()};
l.Tf=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();this.e!==this.b&&(this.a*=2);var f;for(d=0;d<=this.a;d++)f=2*d*Math.PI/this.a-Math.PI/2+this.g,e=0===d%2?this.b:this.e,c.lineTo(b.size/2+e*Math.cos(f),b.size/2+e*Math.sin(f));c.fillStyle=rl;c.fill();null!==this.c&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Uc,null===b.lineDash||c.setLineDash(b.lineDash),c.stroke());c.closePath()};
l.xb=function(){var b=null===this.c?"-":this.c.xb(),c=null===this.n?"-":this.n.xb();if(null===this.f||b!=this.f[1]||c!=this.f[2]||this.b!=this.f[3]||this.e!=this.f[4]||this.g!=this.f[5]||this.a!=this.f[6])this.f=["r"+b+c+(m(this.b)?this.b.toString():"-")+(m(this.e)?this.e.toString():"-")+(m(this.g)?this.g.toString():"-")+(m(this.a)?this.a.toString():"-"),b,c,this.b,this.e,this.g,this.a];return this.f[0]};t("ol.animation.bounce",function(b){var c=b.resolution,d=m(b.start)?b.start:ta(),e=m(b.duration)?b.duration:1E3,f=m(b.easing)?b.easing:bf;return function(b,h){if(h.time<d)return h.animate=!0,h.viewHints[0]+=1,!0;if(h.time<d+e){var k=f((h.time-d)/e),n=c-h.viewState.resolution;h.animate=!0;h.viewState.resolution+=k*n;h.viewHints[0]+=1;return!0}return!1}},OPENLAYERS);t("ol.animation.pan",cf,OPENLAYERS);t("ol.animation.rotate",df,OPENLAYERS);t("ol.animation.zoom",ef,OPENLAYERS);
t("ol.Attribution",qf,OPENLAYERS);qf.prototype.getHTML=qf.prototype.b;kg.prototype.element=kg.prototype.element;t("ol.Collection",lg,OPENLAYERS);lg.prototype.clear=lg.prototype.clear;lg.prototype.extend=lg.prototype.xe;lg.prototype.forEach=lg.prototype.forEach;lg.prototype.getArray=lg.prototype.jj;lg.prototype.item=lg.prototype.item;lg.prototype.getLength=lg.prototype.Ib;lg.prototype.insertAt=lg.prototype.zd;lg.prototype.pop=lg.prototype.pop;lg.prototype.push=lg.prototype.push;
lg.prototype.remove=lg.prototype.remove;lg.prototype.removeAt=lg.prototype.Ke;lg.prototype.setAt=lg.prototype.Vl;t("ol.coordinate.add",vd,OPENLAYERS);t("ol.coordinate.createStringXY",function(b){return function(c){return Cd(c,b)}},OPENLAYERS);t("ol.coordinate.format",yd,OPENLAYERS);t("ol.coordinate.rotate",Ad,OPENLAYERS);t("ol.coordinate.toStringHDMS",function(b){return m(b)?xd(b[1],"NS")+" "+xd(b[0],"EW"):""},OPENLAYERS);t("ol.coordinate.toStringXY",Cd,OPENLAYERS);t("ol.DeviceOrientation",wp,OPENLAYERS);
wp.prototype.getAlpha=wp.prototype.f;wp.prototype.getBeta=wp.prototype.e;wp.prototype.getGamma=wp.prototype.g;wp.prototype.getHeading=wp.prototype.i;wp.prototype.getTracking=wp.prototype.d;wp.prototype.setTracking=wp.prototype.b;t("ol.easing.easeIn",function(b){return Math.pow(b,3)},OPENLAYERS);t("ol.easing.easeOut",Ze,OPENLAYERS);t("ol.easing.inAndOut",$e,OPENLAYERS);t("ol.easing.linear",af,OPENLAYERS);t("ol.easing.upAndDown",bf,OPENLAYERS);t("ol.extent.boundingExtent",Rd,OPENLAYERS);
t("ol.extent.buffer",Wd,OPENLAYERS);t("ol.extent.containsCoordinate",function(b,c){return $d(b,c[0],c[1])},OPENLAYERS);t("ol.extent.containsExtent",Zd,OPENLAYERS);t("ol.extent.containsXY",$d,OPENLAYERS);t("ol.extent.createEmpty",Sd,OPENLAYERS);t("ol.extent.equals",ce,OPENLAYERS);t("ol.extent.extend",de,OPENLAYERS);t("ol.extent.getBottomLeft",ge,OPENLAYERS);t("ol.extent.getBottomRight",he,OPENLAYERS);t("ol.extent.getCenter",ke,OPENLAYERS);t("ol.extent.getHeight",ne,OPENLAYERS);
t("ol.extent.getIntersection",oe,OPENLAYERS);t("ol.extent.getSize",function(b){return[b[2]-b[0],b[3]-b[1]]},OPENLAYERS);t("ol.extent.getTopLeft",je,OPENLAYERS);t("ol.extent.getTopRight",ie,OPENLAYERS);t("ol.extent.getWidth",qe,OPENLAYERS);t("ol.extent.intersects",pe,OPENLAYERS);t("ol.extent.isEmpty",re,OPENLAYERS);t("ol.extent.applyTransform",te,OPENLAYERS);t("ol.Feature",O,OPENLAYERS);O.prototype.clone=O.prototype.clone;O.prototype.getGeometry=O.prototype.R;O.prototype.getId=O.prototype.Jh;
O.prototype.getGeometryName=O.prototype.Ih;O.prototype.getStyle=O.prototype.qj;O.prototype.getStyleFunction=O.prototype.rj;O.prototype.setGeometry=O.prototype.Sa;O.prototype.setStyle=O.prototype.i;O.prototype.setId=O.prototype.d;O.prototype.setGeometryName=O.prototype.f;t("ol.FeatureOverlay",yp,OPENLAYERS);yp.prototype.addFeature=yp.prototype.Cf;yp.prototype.getFeatures=yp.prototype.kj;yp.prototype.getMap=yp.prototype.lj;yp.prototype.removeFeature=yp.prototype.Ed;yp.prototype.setFeatures=yp.prototype.Tc;
yp.prototype.setMap=yp.prototype.setMap;yp.prototype.setStyle=yp.prototype.Ef;yp.prototype.getStyle=yp.prototype.mj;yp.prototype.getStyleFunction=yp.prototype.nj;t("ol.Geolocation",X,OPENLAYERS);X.prototype.getAccuracy=X.prototype.lf;X.prototype.getAccuracyGeometry=X.prototype.o;X.prototype.getAltitude=X.prototype.p;X.prototype.getAltitudeAccuracy=X.prototype.r;X.prototype.getHeading=X.prototype.H;X.prototype.getPosition=X.prototype.N;X.prototype.getProjection=X.prototype.g;X.prototype.getSpeed=X.prototype.D;
X.prototype.getTracking=X.prototype.i;X.prototype.getTrackingOptions=X.prototype.e;X.prototype.setProjection=X.prototype.k;X.prototype.setTracking=X.prototype.b;X.prototype.setTrackingOptions=X.prototype.q;t("ol.Graticule",bw,OPENLAYERS);bw.prototype.getMap=bw.prototype.uj;bw.prototype.getMeridians=bw.prototype.Th;bw.prototype.getParallels=bw.prototype.Yh;bw.prototype.setMap=bw.prototype.setMap;t("ol.has.DEVICE_PIXEL_RATIO",Vf,OPENLAYERS);t("ol.has.CANVAS",Zf,OPENLAYERS);
t("ol.has.DEVICE_ORIENTATION",$f,OPENLAYERS);t("ol.has.GEOLOCATION",ag,OPENLAYERS);t("ol.has.TOUCH",bg,OPENLAYERS);t("ol.has.WEBGL",Uf,OPENLAYERS);gw.prototype.getImage=gw.prototype.a;hw.prototype.getImage=hw.prototype.Ta;t("ol.Kinetic",Oj,OPENLAYERS);t("ol.loadingstrategy.all",function(){return[[-Infinity,-Infinity,Infinity,Infinity]]},OPENLAYERS);t("ol.loadingstrategy.bbox",Kx,OPENLAYERS);
t("ol.loadingstrategy.createTile",function(b){return function(c,d){var e=jh(b,d),f=fh(b,c,e),g=[],e=[e,0,0];for(e[1]=f.a;e[1]<=f.d;++e[1])for(e[2]=f.b;e[2]<=f.c;++e[2])g.push(eh(b,e));return g}},OPENLAYERS);t("ol.Map",K,OPENLAYERS);K.prototype.addControl=K.prototype.fh;K.prototype.addInteraction=K.prototype.gh;K.prototype.addLayer=K.prototype.af;K.prototype.addOverlay=K.prototype.bf;K.prototype.beforeRender=K.prototype.La;K.prototype.forEachFeatureAtPixel=K.prototype.qe;
K.prototype.forEachLayerAtPixel=K.prototype.yj;K.prototype.hasFeatureAtPixel=K.prototype.Ri;K.prototype.getEventCoordinate=K.prototype.Dh;K.prototype.getEventPixel=K.prototype.hd;K.prototype.getTarget=K.prototype.Fd;K.prototype.getTargetElement=K.prototype.Mc;K.prototype.getCoordinateFromPixel=K.prototype.sa;K.prototype.getControls=K.prototype.Bh;K.prototype.getOverlays=K.prototype.Xh;K.prototype.getInteractions=K.prototype.Kh;K.prototype.getLayerGroup=K.prototype.Ub;K.prototype.getLayers=K.prototype.ea;
K.prototype.getPixelFromCoordinate=K.prototype.e;K.prototype.getSize=K.prototype.f;K.prototype.getView=K.prototype.a;K.prototype.getViewport=K.prototype.hi;K.prototype.renderSync=K.prototype.Sl;K.prototype.render=K.prototype.render;K.prototype.removeControl=K.prototype.Ml;K.prototype.removeInteraction=K.prototype.Nl;K.prototype.removeLayer=K.prototype.Ol;K.prototype.removeOverlay=K.prototype.Pl;K.prototype.setLayerGroup=K.prototype.sg;K.prototype.setSize=K.prototype.S;K.prototype.setTarget=K.prototype.ia;
K.prototype.setView=K.prototype.Fa;K.prototype.updateSize=K.prototype.q;Vi.prototype.originalEvent=Vi.prototype.originalEvent;Vi.prototype.pixel=Vi.prototype.pixel;Vi.prototype.coordinate=Vi.prototype.coordinate;Vi.prototype.dragging=Vi.prototype.dragging;Vi.prototype.preventDefault=Vi.prototype.preventDefault;Vi.prototype.stopPropagation=Vi.prototype.pb;Tg.prototype.map=Tg.prototype.map;Tg.prototype.frameState=Tg.prototype.frameState;md.prototype.key=md.prototype.key;md.prototype.oldValue=md.prototype.oldValue;
nd.prototype.transform=nd.prototype.transform;t("ol.Object",qd,OPENLAYERS);qd.prototype.bindTo=qd.prototype.K;qd.prototype.get=qd.prototype.get;qd.prototype.getKeys=qd.prototype.G;qd.prototype.getProperties=qd.prototype.I;qd.prototype.set=qd.prototype.set;qd.prototype.setProperties=qd.prototype.C;qd.prototype.unbind=qd.prototype.L;qd.prototype.unbindAll=qd.prototype.M;t("ol.Observable",kd,OPENLAYERS);t("ol.Observable.unByKey",ld,OPENLAYERS);kd.prototype.changed=kd.prototype.l;
kd.prototype.getRevision=kd.prototype.u;kd.prototype.on=kd.prototype.s;kd.prototype.once=kd.prototype.v;kd.prototype.un=kd.prototype.t;kd.prototype.unByKey=kd.prototype.A;t("ol.WEBGL_MAX_TEXTURE_SIZE",ua,OPENLAYERS);t("ol.inherits",v,OPENLAYERS);t("ol.Overlay",M,OPENLAYERS);M.prototype.getElement=M.prototype.b;M.prototype.getMap=M.prototype.d;M.prototype.getOffset=M.prototype.i;M.prototype.getPosition=M.prototype.q;M.prototype.getPositioning=M.prototype.k;M.prototype.setElement=M.prototype.Le;
M.prototype.setMap=M.prototype.setMap;M.prototype.setOffset=M.prototype.o;M.prototype.setPosition=M.prototype.e;M.prototype.setPositioning=M.prototype.p;Zg.prototype.getTileCoord=Zg.prototype.e;t("ol.View",B,OPENLAYERS);B.prototype.constrainCenter=B.prototype.i;B.prototype.constrainResolution=B.prototype.constrainResolution;B.prototype.constrainRotation=B.prototype.constrainRotation;B.prototype.getCenter=B.prototype.b;B.prototype.calculateExtent=B.prototype.g;B.prototype.getProjection=B.prototype.N;
B.prototype.getResolution=B.prototype.a;B.prototype.getResolutionForExtent=B.prototype.k;B.prototype.getRotation=B.prototype.d;B.prototype.getZoom=B.prototype.ki;B.prototype.fitExtent=B.prototype.pe;B.prototype.fitGeometry=B.prototype.vh;B.prototype.centerOn=B.prototype.nh;B.prototype.rotate=B.prototype.rotate;B.prototype.setCenter=B.prototype.Ha;B.prototype.setResolution=B.prototype.f;B.prototype.setRotation=B.prototype.r;B.prototype.setZoom=B.prototype.S;t("ol.xml.getAllTextContent",Wp,OPENLAYERS);
t("ol.xml.parse",pq,OPENLAYERS);t("ol.webgl.Context",$n,OPENLAYERS);$n.prototype.getGL=$n.prototype.bl;$n.prototype.getHitDetectionFramebuffer=$n.prototype.se;$n.prototype.useProgram=$n.prototype.Rd;t("ol.tilegrid.TileGrid",ch,OPENLAYERS);ch.prototype.getMaxZoom=ch.prototype.md;ch.prototype.getMinZoom=ch.prototype.pd;ch.prototype.getOrigin=ch.prototype.Lb;ch.prototype.getResolution=ch.prototype.na;ch.prototype.getResolutions=ch.prototype.Qd;ch.prototype.getTileCoordForCoordAndResolution=ch.prototype.Wb;
ch.prototype.getTileCoordForCoordAndZ=ch.prototype.Nc;ch.prototype.getTileSize=ch.prototype.pa;t("ol.tilegrid.WMTS",tz,OPENLAYERS);tz.prototype.getMatrixIds=tz.prototype.n;t("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet",uz,OPENLAYERS);t("ol.tilegrid.XYZ",ey,OPENLAYERS);t("ol.tilegrid.Zoomify",xz,OPENLAYERS);t("ol.style.AtlasManager",Az,OPENLAYERS);t("ol.style.Circle",vl,OPENLAYERS);vl.prototype.getAnchor=vl.prototype.wb;vl.prototype.getFill=vl.prototype.Dk;vl.prototype.getImage=vl.prototype.Bb;
vl.prototype.getOrigin=vl.prototype.Cb;vl.prototype.getRadius=vl.prototype.Ek;vl.prototype.getSize=vl.prototype.gb;vl.prototype.getStroke=vl.prototype.Fk;t("ol.style.Fill",ul,OPENLAYERS);ul.prototype.getColor=ul.prototype.b;ul.prototype.setColor=ul.prototype.d;t("ol.style.Icon",Aj,OPENLAYERS);Aj.prototype.getAnchor=Aj.prototype.wb;Aj.prototype.getImage=Aj.prototype.Bb;Aj.prototype.getOrigin=Aj.prototype.Cb;Aj.prototype.getSrc=Aj.prototype.Gk;Aj.prototype.getSize=Aj.prototype.gb;
t("ol.style.Image",zj,OPENLAYERS);zj.prototype.getOpacity=zj.prototype.Ld;zj.prototype.getRotateWithView=zj.prototype.rd;zj.prototype.getRotation=zj.prototype.Md;zj.prototype.getScale=zj.prototype.Nd;zj.prototype.getSnapToPixel=zj.prototype.sd;zj.prototype.getImage=zj.prototype.Bb;zj.prototype.setRotation=zj.prototype.Od;zj.prototype.setScale=zj.prototype.Pd;t("ol.style.RegularShape",Ez,OPENLAYERS);Ez.prototype.getAnchor=Ez.prototype.wb;Ez.prototype.getAngle=Ez.prototype.Hk;Ez.prototype.getFill=Ez.prototype.Ik;
Ez.prototype.getImage=Ez.prototype.Bb;Ez.prototype.getOrigin=Ez.prototype.Cb;Ez.prototype.getPoints=Ez.prototype.Jk;Ez.prototype.getRadius=Ez.prototype.Kk;Ez.prototype.getRadius2=Ez.prototype.bi;Ez.prototype.getSize=Ez.prototype.gb;Ez.prototype.getStroke=Ez.prototype.Lk;t("ol.style.Stroke",ql,OPENLAYERS);ql.prototype.getColor=ql.prototype.Mk;ql.prototype.getLineCap=ql.prototype.Nh;ql.prototype.getLineDash=ql.prototype.Nk;ql.prototype.getLineJoin=ql.prototype.Oh;ql.prototype.getMiterLimit=ql.prototype.Uh;
ql.prototype.getWidth=ql.prototype.Ok;ql.prototype.setColor=ql.prototype.Pk;ql.prototype.setLineCap=ql.prototype.$l;ql.prototype.setLineDash=ql.prototype.Qk;ql.prototype.setLineJoin=ql.prototype.am;ql.prototype.setMiterLimit=ql.prototype.bm;ql.prototype.setWidth=ql.prototype.im;t("ol.style.Style",wl,OPENLAYERS);wl.prototype.getGeometry=wl.prototype.R;wl.prototype.getGeometryFunction=wl.prototype.Hh;wl.prototype.getFill=wl.prototype.Rk;wl.prototype.getImage=wl.prototype.Sk;wl.prototype.getStroke=wl.prototype.Tk;
wl.prototype.getText=wl.prototype.Uk;wl.prototype.getZIndex=wl.prototype.ji;wl.prototype.setGeometry=wl.prototype.Vf;wl.prototype.setZIndex=wl.prototype.km;t("ol.style.Text",ps,OPENLAYERS);ps.prototype.getFont=ps.prototype.Fh;ps.prototype.getOffsetX=ps.prototype.Vh;ps.prototype.getOffsetY=ps.prototype.Wh;ps.prototype.getFill=ps.prototype.Vk;ps.prototype.getRotation=ps.prototype.Wk;ps.prototype.getScale=ps.prototype.Xk;ps.prototype.getStroke=ps.prototype.Yk;ps.prototype.getText=ps.prototype.Zk;
ps.prototype.getTextAlign=ps.prototype.di;ps.prototype.getTextBaseline=ps.prototype.ei;ps.prototype.setFont=ps.prototype.Xl;ps.prototype.setFill=ps.prototype.Wl;ps.prototype.setRotation=ps.prototype.$k;ps.prototype.setScale=ps.prototype.al;ps.prototype.setStroke=ps.prototype.em;ps.prototype.setText=ps.prototype.fm;ps.prototype.setTextAlign=ps.prototype.gm;ps.prototype.setTextBaseline=ps.prototype.hm;t("ol.Sphere",ue,OPENLAYERS);ue.prototype.geodesicArea=ue.prototype.c;
ue.prototype.haversineDistance=ue.prototype.a;t("ol.source.BingMaps",fy,OPENLAYERS);t("ol.source.BingMaps.TOS_ATTRIBUTION",gy,OPENLAYERS);t("ol.source.Cluster",hy,OPENLAYERS);hy.prototype.getSource=hy.prototype.H;Z.prototype.readFeatures=Z.prototype.a;t("ol.source.GeoJSON",Iy,OPENLAYERS);t("ol.source.GPX",Jy,OPENLAYERS);t("ol.source.IGC",Ky,OPENLAYERS);t("ol.source.ImageCanvas",on,OPENLAYERS);t("ol.source.ImageMapGuide",Ly,OPENLAYERS);Ly.prototype.getParams=Ly.prototype.Zj;
Ly.prototype.getImageLoadFunction=Ly.prototype.Yj;Ly.prototype.updateParams=Ly.prototype.bk;Ly.prototype.setImageLoadFunction=Ly.prototype.ak;t("ol.source.Image",gn,OPENLAYERS);jn.prototype.image=jn.prototype.image;t("ol.source.ImageStatic",My,OPENLAYERS);t("ol.source.ImageVector",Bn,OPENLAYERS);Bn.prototype.getSource=Bn.prototype.ck;Bn.prototype.getStyle=Bn.prototype.dk;Bn.prototype.getStyleFunction=Bn.prototype.ek;Bn.prototype.setStyle=Bn.prototype.Nf;t("ol.source.ImageWMS",Ny,OPENLAYERS);
Ny.prototype.getGetFeatureInfoUrl=Ny.prototype.hk;Ny.prototype.getParams=Ny.prototype.jk;Ny.prototype.getImageLoadFunction=Ny.prototype.ik;Ny.prototype.getUrl=Ny.prototype.kk;Ny.prototype.setImageLoadFunction=Ny.prototype.lk;Ny.prototype.setUrl=Ny.prototype.mk;Ny.prototype.updateParams=Ny.prototype.nk;t("ol.source.KML",Ry,OPENLAYERS);t("ol.source.MapQuest",Vy,OPENLAYERS);Vy.prototype.getLayer=Vy.prototype.g;t("ol.source.OSM",Ty,OPENLAYERS);t("ol.source.OSM.ATTRIBUTION",Uy,OPENLAYERS);
t("ol.source.OSMXML",Yy,OPENLAYERS);t("ol.source.ServerVector",Zy,OPENLAYERS);Zy.prototype.clear=Zy.prototype.clear;Zy.prototype.readFeatures=Zy.prototype.a;t("ol.source.Source",ah,OPENLAYERS);ah.prototype.getAttributions=ah.prototype.Y;ah.prototype.getLogo=ah.prototype.X;ah.prototype.getProjection=ah.prototype.Z;ah.prototype.getState=ah.prototype.$;t("ol.source.Stamen",bz,OPENLAYERS);t("ol.source.StaticVector",$,OPENLAYERS);t("ol.source.TileArcGISRest",dz,OPENLAYERS);dz.prototype.getParams=dz.prototype.ok;
dz.prototype.getUrls=dz.prototype.pk;dz.prototype.setUrl=dz.prototype.qk;dz.prototype.setUrls=dz.prototype.Of;dz.prototype.updateParams=dz.prototype.sk;t("ol.source.TileDebug",fz,OPENLAYERS);t("ol.source.TileImage",cy,OPENLAYERS);cy.prototype.getTileLoadFunction=cy.prototype.bb;cy.prototype.getTileUrlFunction=cy.prototype.cb;cy.prototype.setTileLoadFunction=cy.prototype.jb;cy.prototype.setTileUrlFunction=cy.prototype.ua;t("ol.source.TileJSON",gz,OPENLAYERS);t("ol.source.Tile",ph,OPENLAYERS);
ph.prototype.getTileGrid=ph.prototype.xa;sh.prototype.tile=sh.prototype.tile;t("ol.source.TileUTFGrid",hz,OPENLAYERS);hz.prototype.getTemplate=hz.prototype.ci;hz.prototype.forDataAtCoordinateAndResolution=hz.prototype.wh;t("ol.source.TileVector",mz,OPENLAYERS);mz.prototype.getFeatures=mz.prototype.Aa;mz.prototype.getFeaturesAtCoordinateAndResolution=mz.prototype.Eh;t("ol.source.TileWMS",oz,OPENLAYERS);oz.prototype.getGetFeatureInfoUrl=oz.prototype.vk;oz.prototype.getParams=oz.prototype.wk;
oz.prototype.getUrls=oz.prototype.xk;oz.prototype.setUrl=oz.prototype.yk;oz.prototype.setUrls=oz.prototype.Pf;oz.prototype.updateParams=oz.prototype.Ak;t("ol.source.TopoJSON",sz,OPENLAYERS);t("ol.source.Vector",vn,OPENLAYERS);vn.prototype.addFeature=vn.prototype.Va;vn.prototype.addFeatures=vn.prototype.Ga;vn.prototype.clear=vn.prototype.clear;vn.prototype.forEachFeature=vn.prototype.$a;vn.prototype.forEachFeatureInExtent=vn.prototype.wa;vn.prototype.forEachFeatureIntersectingExtent=vn.prototype.Ma;
vn.prototype.getFeatures=vn.prototype.Aa;vn.prototype.getFeaturesAtCoordinate=vn.prototype.Oa;vn.prototype.getClosestFeatureToCoordinate=vn.prototype.ab;vn.prototype.getExtent=vn.prototype.J;vn.prototype.getFeatureById=vn.prototype.Na;vn.prototype.removeFeature=vn.prototype.fb;yn.prototype.feature=yn.prototype.feature;t("ol.source.WMTS",vz,OPENLAYERS);vz.prototype.getDimensions=vz.prototype.Ch;vz.prototype.getFormat=vz.prototype.Gh;vz.prototype.getLayer=vz.prototype.Bk;vz.prototype.getMatrixSet=vz.prototype.Sh;
vz.prototype.getStyle=vz.prototype.Ck;vz.prototype.getVersion=vz.prototype.gi;vz.prototype.updateDimensions=vz.prototype.rm;
t("ol.source.WMTS.optionsFromCapabilities",function(b,c){var d=Ua(b.Contents.Layer,function(b){return b.Identifier==c.layer}),e,f,g;e=1<d.TileMatrixSetLink.length?Va(d.TileMatrixSetLink,function(b){return b.TileMatrixSet==c.matrixSet}):m(c.projection)?Va(d.TileMatrixSetLink,function(b){return b.TileMatrixSet.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3")==c.projection}):0;0>e&&(e=0);f=d.TileMatrixSetLink[e].TileMatrixSet;e=d.WGS84BoundingBox;m(e)&&(g=ze("EPSG:4326").J(),g=e[0]==
g[0]&&e[2]==g[2]);var h=d.Format[0];m(c.format)&&(h=c.format);e=Va(d.Style,function(b){return m(c.style)?b.Title==c.style:b.isDefault});0>e&&(e=0);e=d.Style[e].Identifier;var k={};m(d.Dimension)&&Qa(d.Dimension,function(b){var c=b.Identifier,d=b["default"];m(d)||(d=b.values[0]);k[c]=d});var n=Ua(b.Contents.TileMatrixSet,function(b){return b.Identifier==f}),p=uz(n),n=m(c.projection)?ze(c.projection):ze(n.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3")),q=[],r=c.requestEncoding,r=
m(r)?r:"";if(b.OperationsMetadata.hasOwnProperty("GetTile")&&0!=r.lastIndexOf("REST",0)){var d=b.OperationsMetadata.GetTile.DCP.HTTP.Get,s=Ua(d[0].Constraint,function(b){return"GetEncoding"==b.name}).AllowedValues.Value;0<s.length&&Wa(s,"KVP")&&(r="KVP",q.push(d[0].href))}else r="REST",Qa(d.ResourceURL,function(b){"tile"==b.resourceType&&(h=b.format,q.push(b.template))});return{urls:q,layer:c.layer,matrixSet:f,format:h,projection:n,requestEncoding:r,tileGrid:p,style:e,dimensions:k,wrapX:g}},OPENLAYERS);
t("ol.source.XYZ",Sy,OPENLAYERS);Sy.prototype.setTileUrlFunction=Sy.prototype.ua;Sy.prototype.setUrl=Sy.prototype.b;t("ol.source.Zoomify",yz,OPENLAYERS);dl.prototype.vectorContext=dl.prototype.vectorContext;dl.prototype.frameState=dl.prototype.frameState;dl.prototype.context=dl.prototype.context;dl.prototype.glContext=dl.prototype.glContext;uo.prototype.drawAsync=uo.prototype.kc;uo.prototype.drawCircleGeometry=uo.prototype.lc;uo.prototype.drawFeature=uo.prototype.oe;
uo.prototype.drawGeometryCollectionGeometry=uo.prototype.fd;uo.prototype.drawPointGeometry=uo.prototype.ub;uo.prototype.drawLineStringGeometry=uo.prototype.Eb;uo.prototype.drawMultiLineStringGeometry=uo.prototype.mc;uo.prototype.drawMultiPointGeometry=uo.prototype.tb;uo.prototype.drawMultiPolygonGeometry=uo.prototype.nc;uo.prototype.drawPolygonGeometry=uo.prototype.Rb;uo.prototype.drawText=uo.prototype.vb;uo.prototype.setFillStrokeStyle=uo.prototype.Ba;uo.prototype.setImageStyle=uo.prototype.ib;
uo.prototype.setTextStyle=uo.prototype.Ca;Yl.prototype.drawAsync=Yl.prototype.kc;Yl.prototype.drawCircleGeometry=Yl.prototype.lc;Yl.prototype.drawFeature=Yl.prototype.oe;Yl.prototype.drawPointGeometry=Yl.prototype.ub;Yl.prototype.drawMultiPointGeometry=Yl.prototype.tb;Yl.prototype.drawLineStringGeometry=Yl.prototype.Eb;Yl.prototype.drawMultiLineStringGeometry=Yl.prototype.mc;Yl.prototype.drawPolygonGeometry=Yl.prototype.Rb;Yl.prototype.drawMultiPolygonGeometry=Yl.prototype.nc;
Yl.prototype.setFillStrokeStyle=Yl.prototype.Ba;Yl.prototype.setImageStyle=Yl.prototype.ib;Yl.prototype.setTextStyle=Yl.prototype.Ca;t("ol.proj.common.add",Xl,OPENLAYERS);t("ol.proj.METERS_PER_UNIT",we,OPENLAYERS);t("ol.proj.Projection",xe,OPENLAYERS);xe.prototype.getCode=xe.prototype.Ah;xe.prototype.getExtent=xe.prototype.J;xe.prototype.getUnits=xe.prototype.Rj;xe.prototype.getMetersPerUnit=xe.prototype.od;xe.prototype.getWorldExtent=xe.prototype.ii;xe.prototype.isGlobal=xe.prototype.Sj;
xe.prototype.setGlobal=xe.prototype.Zl;xe.prototype.setExtent=xe.prototype.Tj;xe.prototype.setWorldExtent=xe.prototype.jm;xe.prototype.setGetPointResolution=xe.prototype.Yl;xe.prototype.getPointResolution=xe.prototype.getPointResolution;t("ol.proj.addEquivalentProjections",Ae,OPENLAYERS);t("ol.proj.addProjection",Ne,OPENLAYERS);t("ol.proj.addCoordinateTransforms",Be,OPENLAYERS);t("ol.proj.get",ze,OPENLAYERS);t("ol.proj.getTransform",Se,OPENLAYERS);
t("ol.proj.transform",function(b,c,d){return Se(c,d)(b,void 0,b.length)},OPENLAYERS);t("ol.proj.transformExtent",Ue,OPENLAYERS);t("ol.layer.Heatmap",Y,OPENLAYERS);Y.prototype.getBlur=Y.prototype.Ea;Y.prototype.getGradient=Y.prototype.Fa;Y.prototype.getRadius=Y.prototype.ic;Y.prototype.setBlur=Y.prototype.wc;Y.prototype.setGradient=Y.prototype.xc;Y.prototype.setRadius=Y.prototype.jc;t("ol.layer.Image",H,OPENLAYERS);H.prototype.getSource=H.prototype.a;t("ol.layer.Layer",D,OPENLAYERS);
D.prototype.getSource=D.prototype.a;D.prototype.setSource=D.prototype.fa;t("ol.layer.Base",C,OPENLAYERS);C.prototype.getBrightness=C.prototype.d;C.prototype.getContrast=C.prototype.f;C.prototype.getHue=C.prototype.e;C.prototype.getExtent=C.prototype.J;C.prototype.getMaxResolution=C.prototype.g;C.prototype.getMinResolution=C.prototype.i;C.prototype.getOpacity=C.prototype.q;C.prototype.getSaturation=C.prototype.k;C.prototype.getVisible=C.prototype.b;C.prototype.setBrightness=C.prototype.D;
C.prototype.setContrast=C.prototype.H;C.prototype.setHue=C.prototype.N;C.prototype.setExtent=C.prototype.o;C.prototype.setMaxResolution=C.prototype.S;C.prototype.setMinResolution=C.prototype.U;C.prototype.setOpacity=C.prototype.p;C.prototype.setSaturation=C.prototype.ca;C.prototype.setVisible=C.prototype.da;t("ol.layer.Group",G,OPENLAYERS);G.prototype.getLayers=G.prototype.ac;G.prototype.setLayers=G.prototype.r;t("ol.layer.Tile",I,OPENLAYERS);I.prototype.getPreload=I.prototype.r;
I.prototype.getSource=I.prototype.a;I.prototype.setPreload=I.prototype.ia;I.prototype.getUseInterimTilesOnError=I.prototype.ea;I.prototype.setUseInterimTilesOnError=I.prototype.ka;t("ol.layer.Vector",J,OPENLAYERS);J.prototype.getSource=J.prototype.a;J.prototype.getStyle=J.prototype.$e;J.prototype.getStyleFunction=J.prototype.cf;J.prototype.setStyle=J.prototype.ka;t("ol.interaction.DoubleClickZoom",Vj,OPENLAYERS);t("ol.interaction.DoubleClickZoom.handleEvent",Wj,OPENLAYERS);
t("ol.interaction.DragAndDrop",Zw,OPENLAYERS);t("ol.interaction.DragAndDrop.handleEvent",bd,OPENLAYERS);$w.prototype.features=$w.prototype.features;$w.prototype.file=$w.prototype.file;$w.prototype.projection=$w.prototype.projection;hl.prototype.coordinate=hl.prototype.coordinate;t("ol.interaction.DragBox",il,OPENLAYERS);il.prototype.getGeometry=il.prototype.R;t("ol.interaction.DragPan",hk,OPENLAYERS);t("ol.interaction.DragRotateAndZoom",cx,OPENLAYERS);t("ol.interaction.DragRotate",lk,OPENLAYERS);
t("ol.interaction.DragZoom",Bl,OPENLAYERS);gx.prototype.feature=gx.prototype.feature;t("ol.interaction.Draw",hx,OPENLAYERS);t("ol.interaction.Draw.handleEvent",jx,OPENLAYERS);hx.prototype.finishDrawing=hx.prototype.U;t("ol.interaction.Interaction",Rj,OPENLAYERS);Rj.prototype.getActive=Rj.prototype.b;Rj.prototype.setActive=Rj.prototype.d;t("ol.interaction.defaults",Ql,OPENLAYERS);t("ol.interaction.KeyboardPan",Cl,OPENLAYERS);t("ol.interaction.KeyboardPan.handleEvent",Dl,OPENLAYERS);
t("ol.interaction.KeyboardZoom",El,OPENLAYERS);t("ol.interaction.KeyboardZoom.handleEvent",Fl,OPENLAYERS);t("ol.interaction.Modify",vx,OPENLAYERS);t("ol.interaction.Modify.handleEvent",yx,OPENLAYERS);t("ol.interaction.MouseWheelZoom",Gl,OPENLAYERS);t("ol.interaction.MouseWheelZoom.handleEvent",Hl,OPENLAYERS);t("ol.interaction.PinchRotate",Il,OPENLAYERS);t("ol.interaction.PinchZoom",Ml,OPENLAYERS);t("ol.interaction.Pointer",ek,OPENLAYERS);t("ol.interaction.Pointer.handleEvent",fk,OPENLAYERS);
Fx.prototype.selected=Fx.prototype.selected;Fx.prototype.deselected=Fx.prototype.deselected;t("ol.interaction.Select",Gx,OPENLAYERS);Gx.prototype.getFeatures=Gx.prototype.o;t("ol.interaction.Select.handleEvent",Hx,OPENLAYERS);Gx.prototype.setMap=Gx.prototype.setMap;t("ol.geom.Circle",Km,OPENLAYERS);Km.prototype.clone=Km.prototype.clone;Km.prototype.getCenter=Km.prototype.Oc;Km.prototype.getRadius=Km.prototype.Gf;Km.prototype.getType=Km.prototype.O;Km.prototype.setCenter=Km.prototype.Lj;
Km.prototype.setCenterAndRadius=Km.prototype.qg;Km.prototype.setRadius=Km.prototype.Hf;Km.prototype.transform=Km.prototype.transform;t("ol.geom.Geometry",pk,OPENLAYERS);pk.prototype.clone=pk.prototype.clone;pk.prototype.getClosestPoint=pk.prototype.f;pk.prototype.getExtent=pk.prototype.J;pk.prototype.getType=pk.prototype.O;pk.prototype.applyTransform=pk.prototype.ra;pk.prototype.intersectsExtent=pk.prototype.ja;pk.prototype.translate=pk.prototype.Ia;pk.prototype.transform=pk.prototype.transform;
t("ol.geom.GeometryCollection",Mm,OPENLAYERS);Mm.prototype.clone=Mm.prototype.clone;Mm.prototype.getGeometries=Mm.prototype.mf;Mm.prototype.getType=Mm.prototype.O;Mm.prototype.intersectsExtent=Mm.prototype.ja;Mm.prototype.setGeometries=Mm.prototype.rg;Mm.prototype.applyTransform=Mm.prototype.ra;Mm.prototype.translate=Mm.prototype.Ia;t("ol.geom.LinearRing",Lk,OPENLAYERS);Lk.prototype.clone=Lk.prototype.clone;Lk.prototype.getArea=Lk.prototype.Nj;Lk.prototype.getCoordinates=Lk.prototype.Q;
Lk.prototype.getType=Lk.prototype.O;Lk.prototype.setCoordinates=Lk.prototype.W;t("ol.geom.LineString",Tm,OPENLAYERS);Tm.prototype.appendCoordinate=Tm.prototype.hh;Tm.prototype.clone=Tm.prototype.clone;Tm.prototype.forEachSegment=Tm.prototype.xh;Tm.prototype.getCoordinateAtM=Tm.prototype.Mj;Tm.prototype.getCoordinates=Tm.prototype.Q;Tm.prototype.getLength=Tm.prototype.If;Tm.prototype.getType=Tm.prototype.O;Tm.prototype.intersectsExtent=Tm.prototype.ja;Tm.prototype.setCoordinates=Tm.prototype.W;
t("ol.geom.MultiLineString",Vm,OPENLAYERS);Vm.prototype.appendLineString=Vm.prototype.ih;Vm.prototype.clone=Vm.prototype.clone;Vm.prototype.getCoordinateAtM=Vm.prototype.Oj;Vm.prototype.getCoordinates=Vm.prototype.Q;Vm.prototype.getLineString=Vm.prototype.Ph;Vm.prototype.getLineStrings=Vm.prototype.Lc;Vm.prototype.getType=Vm.prototype.O;Vm.prototype.intersectsExtent=Vm.prototype.ja;Vm.prototype.setCoordinates=Vm.prototype.W;t("ol.geom.MultiPoint",Ym,OPENLAYERS);Ym.prototype.appendPoint=Ym.prototype.kh;
Ym.prototype.clone=Ym.prototype.clone;Ym.prototype.getCoordinates=Ym.prototype.Q;Ym.prototype.getPoint=Ym.prototype.Zh;Ym.prototype.getPoints=Ym.prototype.Gd;Ym.prototype.getType=Ym.prototype.O;Ym.prototype.intersectsExtent=Ym.prototype.ja;Ym.prototype.setCoordinates=Ym.prototype.W;t("ol.geom.MultiPolygon",Zm,OPENLAYERS);Zm.prototype.appendPolygon=Zm.prototype.lh;Zm.prototype.clone=Zm.prototype.clone;Zm.prototype.getArea=Zm.prototype.Pj;Zm.prototype.getCoordinates=Zm.prototype.Q;
Zm.prototype.getInteriorPoints=Zm.prototype.Mh;Zm.prototype.getPolygon=Zm.prototype.ai;Zm.prototype.getPolygons=Zm.prototype.qd;Zm.prototype.getType=Zm.prototype.O;Zm.prototype.intersectsExtent=Zm.prototype.ja;Zm.prototype.setCoordinates=Zm.prototype.W;t("ol.geom.Point",Nk,OPENLAYERS);Nk.prototype.clone=Nk.prototype.clone;Nk.prototype.getCoordinates=Nk.prototype.Q;Nk.prototype.getType=Nk.prototype.O;Nk.prototype.intersectsExtent=Nk.prototype.ja;Nk.prototype.setCoordinates=Nk.prototype.W;
t("ol.geom.Polygon",F,OPENLAYERS);F.prototype.appendLinearRing=F.prototype.jh;F.prototype.clone=F.prototype.clone;F.prototype.getArea=F.prototype.Qj;F.prototype.getCoordinates=F.prototype.Q;F.prototype.getInteriorPoint=F.prototype.Lh;F.prototype.getLinearRingCount=F.prototype.Rh;F.prototype.getLinearRing=F.prototype.Qh;F.prototype.getLinearRings=F.prototype.ld;F.prototype.getType=F.prototype.O;F.prototype.intersectsExtent=F.prototype.ja;F.prototype.setCoordinates=F.prototype.W;
t("ol.geom.Polygon.circular",cl,OPENLAYERS);t("ol.geom.Polygon.fromExtent",function(b){var c=b[0],d=b[1],e=b[2];b=b[3];c=[c,d,c,b,e,b,e,d,c,d];d=new F(null);$k(d,"XY",c,[c.length]);return d},OPENLAYERS);t("ol.geom.SimpleGeometry",rk,OPENLAYERS);rk.prototype.getFirstCoordinate=rk.prototype.yb;rk.prototype.getLastCoordinate=rk.prototype.zb;rk.prototype.getLayout=rk.prototype.Ab;rk.prototype.applyTransform=rk.prototype.ra;rk.prototype.translate=rk.prototype.Ia;t("ol.format.Feature",Ap,OPENLAYERS);
t("ol.format.GeoJSON",Kp,OPENLAYERS);Kp.prototype.readFeature=Kp.prototype.Nb;Kp.prototype.readFeatures=Kp.prototype.ma;Kp.prototype.readGeometry=Kp.prototype.Rc;Kp.prototype.readProjection=Kp.prototype.Ja;Kp.prototype.writeFeature=Kp.prototype.be;Kp.prototype.writeFeatureObject=Kp.prototype.a;Kp.prototype.writeFeatures=Kp.prototype.Qb;Kp.prototype.writeFeaturesObject=Kp.prototype.d;Kp.prototype.writeGeometry=Kp.prototype.Xc;Kp.prototype.writeGeometryObject=Kp.prototype.f;t("ol.format.GPX",ar,OPENLAYERS);
ar.prototype.readFeature=ar.prototype.Nb;ar.prototype.readFeatures=ar.prototype.ma;ar.prototype.readProjection=ar.prototype.Ja;ar.prototype.writeFeatures=ar.prototype.Qb;ar.prototype.writeFeaturesNode=ar.prototype.a;t("ol.format.IGC",Lr,OPENLAYERS);Lr.prototype.readFeature=Lr.prototype.Nb;Lr.prototype.readFeatures=Lr.prototype.ma;Lr.prototype.readProjection=Lr.prototype.Ja;t("ol.format.KML",qs,OPENLAYERS);qs.prototype.readFeature=qs.prototype.Nb;qs.prototype.readFeatures=qs.prototype.ma;
qs.prototype.readName=qs.prototype.El;qs.prototype.readNetworkLinks=qs.prototype.Fl;qs.prototype.readProjection=qs.prototype.Ja;qs.prototype.writeFeatures=qs.prototype.Qb;qs.prototype.writeFeaturesNode=qs.prototype.a;t("ol.format.OSMXML",$t,OPENLAYERS);$t.prototype.readFeatures=$t.prototype.ma;$t.prototype.readProjection=$t.prototype.Ja;t("ol.format.Polyline",yu,OPENLAYERS);t("ol.format.Polyline.encodeDeltas",zu,OPENLAYERS);t("ol.format.Polyline.decodeDeltas",Bu,OPENLAYERS);
t("ol.format.Polyline.encodeFloats",Au,OPENLAYERS);t("ol.format.Polyline.decodeFloats",Cu,OPENLAYERS);yu.prototype.readFeature=yu.prototype.Nb;yu.prototype.readFeatures=yu.prototype.ma;yu.prototype.readGeometry=yu.prototype.Rc;yu.prototype.readProjection=yu.prototype.Ja;yu.prototype.writeGeometry=yu.prototype.Xc;t("ol.format.TopoJSON",Du,OPENLAYERS);Du.prototype.readFeatures=Du.prototype.ma;Du.prototype.readProjection=Du.prototype.Ja;t("ol.format.WFS",Ju,OPENLAYERS);Ju.prototype.readFeatures=Ju.prototype.ma;
Ju.prototype.readTransactionResponse=Ju.prototype.g;Ju.prototype.readFeatureCollectionMetadata=Ju.prototype.e;Ju.prototype.writeGetFeature=Ju.prototype.n;Ju.prototype.writeTransaction=Ju.prototype.q;Ju.prototype.readProjection=Ju.prototype.Ja;t("ol.format.WKT",Wu,OPENLAYERS);Wu.prototype.readFeature=Wu.prototype.Nb;Wu.prototype.readFeatures=Wu.prototype.ma;Wu.prototype.readGeometry=Wu.prototype.Rc;Wu.prototype.writeFeature=Wu.prototype.be;Wu.prototype.writeFeatures=Wu.prototype.Qb;
Wu.prototype.writeGeometry=Wu.prototype.Xc;t("ol.format.WMSCapabilities",nv,OPENLAYERS);nv.prototype.read=nv.prototype.b;t("ol.format.WMSGetFeatureInfo",Kv,OPENLAYERS);Kv.prototype.readFeatures=Kv.prototype.ma;t("ol.format.WMTSCapabilities",Mv,OPENLAYERS);Mv.prototype.read=Mv.prototype.b;t("ol.format.GML2",$q,OPENLAYERS);t("ol.format.GML3",Rq,OPENLAYERS);Rq.prototype.writeGeometryNode=Rq.prototype.i;Rq.prototype.writeFeatures=Rq.prototype.Qb;Rq.prototype.writeFeaturesNode=Rq.prototype.a;
t("ol.format.GML",Rq,OPENLAYERS);Rq.prototype.writeFeatures=Rq.prototype.Qb;Rq.prototype.writeFeaturesNode=Rq.prototype.a;t("ol.format.GMLBase",Fq,OPENLAYERS);Fq.prototype.readFeatures=Fq.prototype.ma;t("ol.events.condition.altKeyOnly",function(b){b=b.a;return b.c&&!b.g&&!b.d},OPENLAYERS);t("ol.events.condition.altShiftKeysOnly",Xj,OPENLAYERS);t("ol.events.condition.always",bd,OPENLAYERS);t("ol.events.condition.click",function(b){return b.type==Zi},OPENLAYERS);t("ol.events.condition.never",ad,OPENLAYERS);
t("ol.events.condition.pointerMove",Yj,OPENLAYERS);t("ol.events.condition.singleClick",Zj,OPENLAYERS);t("ol.events.condition.noModifierKeys",ak,OPENLAYERS);t("ol.events.condition.platformModifierKeyOnly",function(b){b=b.a;return!b.c&&b.g&&!b.d},OPENLAYERS);t("ol.events.condition.shiftKeyOnly",bk,OPENLAYERS);t("ol.events.condition.targetNotEditable",ck,OPENLAYERS);t("ol.events.condition.mouseOnly",dk,OPENLAYERS);t("ol.dom.Input",xp,OPENLAYERS);xp.prototype.getChecked=xp.prototype.a;
xp.prototype.getValue=xp.prototype.b;xp.prototype.setValue=xp.prototype.f;xp.prototype.setChecked=xp.prototype.d;t("ol.control.Attribution",th,OPENLAYERS);t("ol.control.Attribution.render",uh,OPENLAYERS);th.prototype.getCollapsible=th.prototype.Cj;th.prototype.setCollapsible=th.prototype.Fj;th.prototype.setCollapsed=th.prototype.Ej;th.prototype.getCollapsed=th.prototype.Bj;t("ol.control.Control",Ug,OPENLAYERS);Ug.prototype.getMap=Ug.prototype.f;Ug.prototype.setMap=Ug.prototype.setMap;
Ug.prototype.setTarget=Ug.prototype.b;t("ol.control.defaults",zh,OPENLAYERS);t("ol.control.FullScreen",Eh,OPENLAYERS);t("ol.control.MousePosition",Fh,OPENLAYERS);t("ol.control.MousePosition.render",Gh,OPENLAYERS);Fh.prototype.getCoordinateFormat=Fh.prototype.k;Fh.prototype.getProjection=Fh.prototype.p;Fh.prototype.setMap=Fh.prototype.setMap;Fh.prototype.setCoordinateFormat=Fh.prototype.D;Fh.prototype.setProjection=Fh.prototype.r;t("ol.control.OverviewMap",Wo,OPENLAYERS);Wo.prototype.setMap=Wo.prototype.setMap;
t("ol.control.OverviewMap.render",Xo,OPENLAYERS);Wo.prototype.getCollapsible=Wo.prototype.Hj;Wo.prototype.setCollapsible=Wo.prototype.Kj;Wo.prototype.setCollapsed=Wo.prototype.Jj;Wo.prototype.getCollapsed=Wo.prototype.Gj;t("ol.control.Rotate",wh,OPENLAYERS);t("ol.control.Rotate.render",xh,OPENLAYERS);t("ol.control.ScaleLine",bp,OPENLAYERS);bp.prototype.getUnits=bp.prototype.o;t("ol.control.ScaleLine.render",cp,OPENLAYERS);bp.prototype.setUnits=bp.prototype.p;t("ol.control.Zoom",yh,OPENLAYERS);
t("ol.control.ZoomSlider",qp,OPENLAYERS);t("ol.control.ZoomSlider.render",sp,OPENLAYERS);t("ol.control.ZoomToExtent",vp,OPENLAYERS);t("ol.color.asArray",qg,OPENLAYERS);t("ol.color.asString",sg,OPENLAYERS);qd.prototype.changed=qd.prototype.l;qd.prototype.getRevision=qd.prototype.u;qd.prototype.on=qd.prototype.s;qd.prototype.once=qd.prototype.v;qd.prototype.un=qd.prototype.t;qd.prototype.unByKey=qd.prototype.A;lg.prototype.bindTo=lg.prototype.K;lg.prototype.get=lg.prototype.get;
lg.prototype.getKeys=lg.prototype.G;lg.prototype.getProperties=lg.prototype.I;lg.prototype.set=lg.prototype.set;lg.prototype.setProperties=lg.prototype.C;lg.prototype.unbind=lg.prototype.L;lg.prototype.unbindAll=lg.prototype.M;lg.prototype.changed=lg.prototype.l;lg.prototype.getRevision=lg.prototype.u;lg.prototype.on=lg.prototype.s;lg.prototype.once=lg.prototype.v;lg.prototype.un=lg.prototype.t;lg.prototype.unByKey=lg.prototype.A;wp.prototype.bindTo=wp.prototype.K;wp.prototype.get=wp.prototype.get;
wp.prototype.getKeys=wp.prototype.G;wp.prototype.getProperties=wp.prototype.I;wp.prototype.set=wp.prototype.set;wp.prototype.setProperties=wp.prototype.C;wp.prototype.unbind=wp.prototype.L;wp.prototype.unbindAll=wp.prototype.M;wp.prototype.changed=wp.prototype.l;wp.prototype.getRevision=wp.prototype.u;wp.prototype.on=wp.prototype.s;wp.prototype.once=wp.prototype.v;wp.prototype.un=wp.prototype.t;wp.prototype.unByKey=wp.prototype.A;O.prototype.bindTo=O.prototype.K;O.prototype.get=O.prototype.get;
O.prototype.getKeys=O.prototype.G;O.prototype.getProperties=O.prototype.I;O.prototype.set=O.prototype.set;O.prototype.setProperties=O.prototype.C;O.prototype.unbind=O.prototype.L;O.prototype.unbindAll=O.prototype.M;O.prototype.changed=O.prototype.l;O.prototype.getRevision=O.prototype.u;O.prototype.on=O.prototype.s;O.prototype.once=O.prototype.v;O.prototype.un=O.prototype.t;O.prototype.unByKey=O.prototype.A;X.prototype.bindTo=X.prototype.K;X.prototype.get=X.prototype.get;X.prototype.getKeys=X.prototype.G;
X.prototype.getProperties=X.prototype.I;X.prototype.set=X.prototype.set;X.prototype.setProperties=X.prototype.C;X.prototype.unbind=X.prototype.L;X.prototype.unbindAll=X.prototype.M;X.prototype.changed=X.prototype.l;X.prototype.getRevision=X.prototype.u;X.prototype.on=X.prototype.s;X.prototype.once=X.prototype.v;X.prototype.un=X.prototype.t;X.prototype.unByKey=X.prototype.A;hw.prototype.getTileCoord=hw.prototype.e;K.prototype.bindTo=K.prototype.K;K.prototype.get=K.prototype.get;
K.prototype.getKeys=K.prototype.G;K.prototype.getProperties=K.prototype.I;K.prototype.set=K.prototype.set;K.prototype.setProperties=K.prototype.C;K.prototype.unbind=K.prototype.L;K.prototype.unbindAll=K.prototype.M;K.prototype.changed=K.prototype.l;K.prototype.getRevision=K.prototype.u;K.prototype.on=K.prototype.s;K.prototype.once=K.prototype.v;K.prototype.un=K.prototype.t;K.prototype.unByKey=K.prototype.A;Vi.prototype.map=Vi.prototype.map;Vi.prototype.frameState=Vi.prototype.frameState;
Wi.prototype.originalEvent=Wi.prototype.originalEvent;Wi.prototype.pixel=Wi.prototype.pixel;Wi.prototype.coordinate=Wi.prototype.coordinate;Wi.prototype.dragging=Wi.prototype.dragging;Wi.prototype.preventDefault=Wi.prototype.preventDefault;Wi.prototype.stopPropagation=Wi.prototype.pb;Wi.prototype.map=Wi.prototype.map;Wi.prototype.frameState=Wi.prototype.frameState;M.prototype.bindTo=M.prototype.K;M.prototype.get=M.prototype.get;M.prototype.getKeys=M.prototype.G;M.prototype.getProperties=M.prototype.I;
M.prototype.set=M.prototype.set;M.prototype.setProperties=M.prototype.C;M.prototype.unbind=M.prototype.L;M.prototype.unbindAll=M.prototype.M;M.prototype.changed=M.prototype.l;M.prototype.getRevision=M.prototype.u;M.prototype.on=M.prototype.s;M.prototype.once=M.prototype.v;M.prototype.un=M.prototype.t;M.prototype.unByKey=M.prototype.A;B.prototype.bindTo=B.prototype.K;B.prototype.get=B.prototype.get;B.prototype.getKeys=B.prototype.G;B.prototype.getProperties=B.prototype.I;B.prototype.set=B.prototype.set;
B.prototype.setProperties=B.prototype.C;B.prototype.unbind=B.prototype.L;B.prototype.unbindAll=B.prototype.M;B.prototype.changed=B.prototype.l;B.prototype.getRevision=B.prototype.u;B.prototype.on=B.prototype.s;B.prototype.once=B.prototype.v;B.prototype.un=B.prototype.t;B.prototype.unByKey=B.prototype.A;tz.prototype.getMaxZoom=tz.prototype.md;tz.prototype.getMinZoom=tz.prototype.pd;tz.prototype.getOrigin=tz.prototype.Lb;tz.prototype.getResolution=tz.prototype.na;tz.prototype.getResolutions=tz.prototype.Qd;
tz.prototype.getTileCoordForCoordAndResolution=tz.prototype.Wb;tz.prototype.getTileCoordForCoordAndZ=tz.prototype.Nc;tz.prototype.getTileSize=tz.prototype.pa;ey.prototype.getMaxZoom=ey.prototype.md;ey.prototype.getMinZoom=ey.prototype.pd;ey.prototype.getOrigin=ey.prototype.Lb;ey.prototype.getResolution=ey.prototype.na;ey.prototype.getResolutions=ey.prototype.Qd;ey.prototype.getTileCoordForCoordAndResolution=ey.prototype.Wb;ey.prototype.getTileCoordForCoordAndZ=ey.prototype.Nc;
ey.prototype.getTileSize=ey.prototype.pa;xz.prototype.getMaxZoom=xz.prototype.md;xz.prototype.getMinZoom=xz.prototype.pd;xz.prototype.getOrigin=xz.prototype.Lb;xz.prototype.getResolution=xz.prototype.na;xz.prototype.getResolutions=xz.prototype.Qd;xz.prototype.getTileCoordForCoordAndResolution=xz.prototype.Wb;xz.prototype.getTileCoordForCoordAndZ=xz.prototype.Nc;xz.prototype.getTileSize=xz.prototype.pa;vl.prototype.getOpacity=vl.prototype.Ld;vl.prototype.getRotateWithView=vl.prototype.rd;
vl.prototype.getRotation=vl.prototype.Md;vl.prototype.getScale=vl.prototype.Nd;vl.prototype.getSnapToPixel=vl.prototype.sd;vl.prototype.setRotation=vl.prototype.Od;vl.prototype.setScale=vl.prototype.Pd;Aj.prototype.getOpacity=Aj.prototype.Ld;Aj.prototype.getRotateWithView=Aj.prototype.rd;Aj.prototype.getRotation=Aj.prototype.Md;Aj.prototype.getScale=Aj.prototype.Nd;Aj.prototype.getSnapToPixel=Aj.prototype.sd;Aj.prototype.setRotation=Aj.prototype.Od;Aj.prototype.setScale=Aj.prototype.Pd;
Ez.prototype.getOpacity=Ez.prototype.Ld;Ez.prototype.getRotateWithView=Ez.prototype.rd;Ez.prototype.getRotation=Ez.prototype.Md;Ez.prototype.getScale=Ez.prototype.Nd;Ez.prototype.getSnapToPixel=Ez.prototype.sd;Ez.prototype.setRotation=Ez.prototype.Od;Ez.prototype.setScale=Ez.prototype.Pd;ah.prototype.bindTo=ah.prototype.K;ah.prototype.get=ah.prototype.get;ah.prototype.getKeys=ah.prototype.G;ah.prototype.getProperties=ah.prototype.I;ah.prototype.set=ah.prototype.set;ah.prototype.setProperties=ah.prototype.C;
ah.prototype.unbind=ah.prototype.L;ah.prototype.unbindAll=ah.prototype.M;ah.prototype.changed=ah.prototype.l;ah.prototype.getRevision=ah.prototype.u;ah.prototype.on=ah.prototype.s;ah.prototype.once=ah.prototype.v;ah.prototype.un=ah.prototype.t;ah.prototype.unByKey=ah.prototype.A;ph.prototype.getAttributions=ph.prototype.Y;ph.prototype.getLogo=ph.prototype.X;ph.prototype.getProjection=ph.prototype.Z;ph.prototype.getState=ph.prototype.$;ph.prototype.bindTo=ph.prototype.K;ph.prototype.get=ph.prototype.get;
ph.prototype.getKeys=ph.prototype.G;ph.prototype.getProperties=ph.prototype.I;ph.prototype.set=ph.prototype.set;ph.prototype.setProperties=ph.prototype.C;ph.prototype.unbind=ph.prototype.L;ph.prototype.unbindAll=ph.prototype.M;ph.prototype.changed=ph.prototype.l;ph.prototype.getRevision=ph.prototype.u;ph.prototype.on=ph.prototype.s;ph.prototype.once=ph.prototype.v;ph.prototype.un=ph.prototype.t;ph.prototype.unByKey=ph.prototype.A;cy.prototype.getTileGrid=cy.prototype.xa;
cy.prototype.getAttributions=cy.prototype.Y;cy.prototype.getLogo=cy.prototype.X;cy.prototype.getProjection=cy.prototype.Z;cy.prototype.getState=cy.prototype.$;cy.prototype.bindTo=cy.prototype.K;cy.prototype.get=cy.prototype.get;cy.prototype.getKeys=cy.prototype.G;cy.prototype.getProperties=cy.prototype.I;cy.prototype.set=cy.prototype.set;cy.prototype.setProperties=cy.prototype.C;cy.prototype.unbind=cy.prototype.L;cy.prototype.unbindAll=cy.prototype.M;cy.prototype.changed=cy.prototype.l;
cy.prototype.getRevision=cy.prototype.u;cy.prototype.on=cy.prototype.s;cy.prototype.once=cy.prototype.v;cy.prototype.un=cy.prototype.t;cy.prototype.unByKey=cy.prototype.A;fy.prototype.getTileLoadFunction=fy.prototype.bb;fy.prototype.getTileUrlFunction=fy.prototype.cb;fy.prototype.setTileLoadFunction=fy.prototype.jb;fy.prototype.setTileUrlFunction=fy.prototype.ua;fy.prototype.getTileGrid=fy.prototype.xa;fy.prototype.getAttributions=fy.prototype.Y;fy.prototype.getLogo=fy.prototype.X;
fy.prototype.getProjection=fy.prototype.Z;fy.prototype.getState=fy.prototype.$;fy.prototype.bindTo=fy.prototype.K;fy.prototype.get=fy.prototype.get;fy.prototype.getKeys=fy.prototype.G;fy.prototype.getProperties=fy.prototype.I;fy.prototype.set=fy.prototype.set;fy.prototype.setProperties=fy.prototype.C;fy.prototype.unbind=fy.prototype.L;fy.prototype.unbindAll=fy.prototype.M;fy.prototype.changed=fy.prototype.l;fy.prototype.getRevision=fy.prototype.u;fy.prototype.on=fy.prototype.s;fy.prototype.once=fy.prototype.v;
fy.prototype.un=fy.prototype.t;fy.prototype.unByKey=fy.prototype.A;vn.prototype.getAttributions=vn.prototype.Y;vn.prototype.getLogo=vn.prototype.X;vn.prototype.getProjection=vn.prototype.Z;vn.prototype.getState=vn.prototype.$;vn.prototype.bindTo=vn.prototype.K;vn.prototype.get=vn.prototype.get;vn.prototype.getKeys=vn.prototype.G;vn.prototype.getProperties=vn.prototype.I;vn.prototype.set=vn.prototype.set;vn.prototype.setProperties=vn.prototype.C;vn.prototype.unbind=vn.prototype.L;
vn.prototype.unbindAll=vn.prototype.M;vn.prototype.changed=vn.prototype.l;vn.prototype.getRevision=vn.prototype.u;vn.prototype.on=vn.prototype.s;vn.prototype.once=vn.prototype.v;vn.prototype.un=vn.prototype.t;vn.prototype.unByKey=vn.prototype.A;hy.prototype.addFeature=hy.prototype.Va;hy.prototype.addFeatures=hy.prototype.Ga;hy.prototype.clear=hy.prototype.clear;hy.prototype.forEachFeature=hy.prototype.$a;hy.prototype.forEachFeatureInExtent=hy.prototype.wa;
hy.prototype.forEachFeatureIntersectingExtent=hy.prototype.Ma;hy.prototype.getFeatures=hy.prototype.Aa;hy.prototype.getFeaturesAtCoordinate=hy.prototype.Oa;hy.prototype.getClosestFeatureToCoordinate=hy.prototype.ab;hy.prototype.getExtent=hy.prototype.J;hy.prototype.getFeatureById=hy.prototype.Na;hy.prototype.removeFeature=hy.prototype.fb;hy.prototype.getAttributions=hy.prototype.Y;hy.prototype.getLogo=hy.prototype.X;hy.prototype.getProjection=hy.prototype.Z;hy.prototype.getState=hy.prototype.$;
hy.prototype.bindTo=hy.prototype.K;hy.prototype.get=hy.prototype.get;hy.prototype.getKeys=hy.prototype.G;hy.prototype.getProperties=hy.prototype.I;hy.prototype.set=hy.prototype.set;hy.prototype.setProperties=hy.prototype.C;hy.prototype.unbind=hy.prototype.L;hy.prototype.unbindAll=hy.prototype.M;hy.prototype.changed=hy.prototype.l;hy.prototype.getRevision=hy.prototype.u;hy.prototype.on=hy.prototype.s;hy.prototype.once=hy.prototype.v;hy.prototype.un=hy.prototype.t;hy.prototype.unByKey=hy.prototype.A;
Z.prototype.addFeature=Z.prototype.Va;Z.prototype.addFeatures=Z.prototype.Ga;Z.prototype.clear=Z.prototype.clear;Z.prototype.forEachFeature=Z.prototype.$a;Z.prototype.forEachFeatureInExtent=Z.prototype.wa;Z.prototype.forEachFeatureIntersectingExtent=Z.prototype.Ma;Z.prototype.getFeatures=Z.prototype.Aa;Z.prototype.getFeaturesAtCoordinate=Z.prototype.Oa;Z.prototype.getClosestFeatureToCoordinate=Z.prototype.ab;Z.prototype.getExtent=Z.prototype.J;Z.prototype.getFeatureById=Z.prototype.Na;
Z.prototype.removeFeature=Z.prototype.fb;Z.prototype.getAttributions=Z.prototype.Y;Z.prototype.getLogo=Z.prototype.X;Z.prototype.getProjection=Z.prototype.Z;Z.prototype.getState=Z.prototype.$;Z.prototype.bindTo=Z.prototype.K;Z.prototype.get=Z.prototype.get;Z.prototype.getKeys=Z.prototype.G;Z.prototype.getProperties=Z.prototype.I;Z.prototype.set=Z.prototype.set;Z.prototype.setProperties=Z.prototype.C;Z.prototype.unbind=Z.prototype.L;Z.prototype.unbindAll=Z.prototype.M;Z.prototype.changed=Z.prototype.l;
Z.prototype.getRevision=Z.prototype.u;Z.prototype.on=Z.prototype.s;Z.prototype.once=Z.prototype.v;Z.prototype.un=Z.prototype.t;Z.prototype.unByKey=Z.prototype.A;$.prototype.readFeatures=$.prototype.a;$.prototype.addFeature=$.prototype.Va;$.prototype.addFeatures=$.prototype.Ga;$.prototype.clear=$.prototype.clear;$.prototype.forEachFeature=$.prototype.$a;$.prototype.forEachFeatureInExtent=$.prototype.wa;$.prototype.forEachFeatureIntersectingExtent=$.prototype.Ma;$.prototype.getFeatures=$.prototype.Aa;
$.prototype.getFeaturesAtCoordinate=$.prototype.Oa;$.prototype.getClosestFeatureToCoordinate=$.prototype.ab;$.prototype.getExtent=$.prototype.J;$.prototype.getFeatureById=$.prototype.Na;$.prototype.removeFeature=$.prototype.fb;$.prototype.getAttributions=$.prototype.Y;$.prototype.getLogo=$.prototype.X;$.prototype.getProjection=$.prototype.Z;$.prototype.getState=$.prototype.$;$.prototype.bindTo=$.prototype.K;$.prototype.get=$.prototype.get;$.prototype.getKeys=$.prototype.G;
$.prototype.getProperties=$.prototype.I;$.prototype.set=$.prototype.set;$.prototype.setProperties=$.prototype.C;$.prototype.unbind=$.prototype.L;$.prototype.unbindAll=$.prototype.M;$.prototype.changed=$.prototype.l;$.prototype.getRevision=$.prototype.u;$.prototype.on=$.prototype.s;$.prototype.once=$.prototype.v;$.prototype.un=$.prototype.t;$.prototype.unByKey=$.prototype.A;Iy.prototype.readFeatures=Iy.prototype.a;Iy.prototype.addFeature=Iy.prototype.Va;Iy.prototype.addFeatures=Iy.prototype.Ga;
Iy.prototype.clear=Iy.prototype.clear;Iy.prototype.forEachFeature=Iy.prototype.$a;Iy.prototype.forEachFeatureInExtent=Iy.prototype.wa;Iy.prototype.forEachFeatureIntersectingExtent=Iy.prototype.Ma;Iy.prototype.getFeatures=Iy.prototype.Aa;Iy.prototype.getFeaturesAtCoordinate=Iy.prototype.Oa;Iy.prototype.getClosestFeatureToCoordinate=Iy.prototype.ab;Iy.prototype.getExtent=Iy.prototype.J;Iy.prototype.getFeatureById=Iy.prototype.Na;Iy.prototype.removeFeature=Iy.prototype.fb;
Iy.prototype.getAttributions=Iy.prototype.Y;Iy.prototype.getLogo=Iy.prototype.X;Iy.prototype.getProjection=Iy.prototype.Z;Iy.prototype.getState=Iy.prototype.$;Iy.prototype.bindTo=Iy.prototype.K;Iy.prototype.get=Iy.prototype.get;Iy.prototype.getKeys=Iy.prototype.G;Iy.prototype.getProperties=Iy.prototype.I;Iy.prototype.set=Iy.prototype.set;Iy.prototype.setProperties=Iy.prototype.C;Iy.prototype.unbind=Iy.prototype.L;Iy.prototype.unbindAll=Iy.prototype.M;Iy.prototype.changed=Iy.prototype.l;
Iy.prototype.getRevision=Iy.prototype.u;Iy.prototype.on=Iy.prototype.s;Iy.prototype.once=Iy.prototype.v;Iy.prototype.un=Iy.prototype.t;Iy.prototype.unByKey=Iy.prototype.A;Jy.prototype.readFeatures=Jy.prototype.a;Jy.prototype.addFeature=Jy.prototype.Va;Jy.prototype.addFeatures=Jy.prototype.Ga;Jy.prototype.clear=Jy.prototype.clear;Jy.prototype.forEachFeature=Jy.prototype.$a;Jy.prototype.forEachFeatureInExtent=Jy.prototype.wa;Jy.prototype.forEachFeatureIntersectingExtent=Jy.prototype.Ma;
Jy.prototype.getFeatures=Jy.prototype.Aa;Jy.prototype.getFeaturesAtCoordinate=Jy.prototype.Oa;Jy.prototype.getClosestFeatureToCoordinate=Jy.prototype.ab;Jy.prototype.getExtent=Jy.prototype.J;Jy.prototype.getFeatureById=Jy.prototype.Na;Jy.prototype.removeFeature=Jy.prototype.fb;Jy.prototype.getAttributions=Jy.prototype.Y;Jy.prototype.getLogo=Jy.prototype.X;Jy.prototype.getProjection=Jy.prototype.Z;Jy.prototype.getState=Jy.prototype.$;Jy.prototype.bindTo=Jy.prototype.K;Jy.prototype.get=Jy.prototype.get;
Jy.prototype.getKeys=Jy.prototype.G;Jy.prototype.getProperties=Jy.prototype.I;Jy.prototype.set=Jy.prototype.set;Jy.prototype.setProperties=Jy.prototype.C;Jy.prototype.unbind=Jy.prototype.L;Jy.prototype.unbindAll=Jy.prototype.M;Jy.prototype.changed=Jy.prototype.l;Jy.prototype.getRevision=Jy.prototype.u;Jy.prototype.on=Jy.prototype.s;Jy.prototype.once=Jy.prototype.v;Jy.prototype.un=Jy.prototype.t;Jy.prototype.unByKey=Jy.prototype.A;Ky.prototype.readFeatures=Ky.prototype.a;Ky.prototype.addFeature=Ky.prototype.Va;
Ky.prototype.addFeatures=Ky.prototype.Ga;Ky.prototype.clear=Ky.prototype.clear;Ky.prototype.forEachFeature=Ky.prototype.$a;Ky.prototype.forEachFeatureInExtent=Ky.prototype.wa;Ky.prototype.forEachFeatureIntersectingExtent=Ky.prototype.Ma;Ky.prototype.getFeatures=Ky.prototype.Aa;Ky.prototype.getFeaturesAtCoordinate=Ky.prototype.Oa;Ky.prototype.getClosestFeatureToCoordinate=Ky.prototype.ab;Ky.prototype.getExtent=Ky.prototype.J;Ky.prototype.getFeatureById=Ky.prototype.Na;Ky.prototype.removeFeature=Ky.prototype.fb;
Ky.prototype.getAttributions=Ky.prototype.Y;Ky.prototype.getLogo=Ky.prototype.X;Ky.prototype.getProjection=Ky.prototype.Z;Ky.prototype.getState=Ky.prototype.$;Ky.prototype.bindTo=Ky.prototype.K;Ky.prototype.get=Ky.prototype.get;Ky.prototype.getKeys=Ky.prototype.G;Ky.prototype.getProperties=Ky.prototype.I;Ky.prototype.set=Ky.prototype.set;Ky.prototype.setProperties=Ky.prototype.C;Ky.prototype.unbind=Ky.prototype.L;Ky.prototype.unbindAll=Ky.prototype.M;Ky.prototype.changed=Ky.prototype.l;
Ky.prototype.getRevision=Ky.prototype.u;Ky.prototype.on=Ky.prototype.s;Ky.prototype.once=Ky.prototype.v;Ky.prototype.un=Ky.prototype.t;Ky.prototype.unByKey=Ky.prototype.A;gn.prototype.getAttributions=gn.prototype.Y;gn.prototype.getLogo=gn.prototype.X;gn.prototype.getProjection=gn.prototype.Z;gn.prototype.getState=gn.prototype.$;gn.prototype.bindTo=gn.prototype.K;gn.prototype.get=gn.prototype.get;gn.prototype.getKeys=gn.prototype.G;gn.prototype.getProperties=gn.prototype.I;gn.prototype.set=gn.prototype.set;
gn.prototype.setProperties=gn.prototype.C;gn.prototype.unbind=gn.prototype.L;gn.prototype.unbindAll=gn.prototype.M;gn.prototype.changed=gn.prototype.l;gn.prototype.getRevision=gn.prototype.u;gn.prototype.on=gn.prototype.s;gn.prototype.once=gn.prototype.v;gn.prototype.un=gn.prototype.t;gn.prototype.unByKey=gn.prototype.A;on.prototype.getAttributions=on.prototype.Y;on.prototype.getLogo=on.prototype.X;on.prototype.getProjection=on.prototype.Z;on.prototype.getState=on.prototype.$;
on.prototype.bindTo=on.prototype.K;on.prototype.get=on.prototype.get;on.prototype.getKeys=on.prototype.G;on.prototype.getProperties=on.prototype.I;on.prototype.set=on.prototype.set;on.prototype.setProperties=on.prototype.C;on.prototype.unbind=on.prototype.L;on.prototype.unbindAll=on.prototype.M;on.prototype.changed=on.prototype.l;on.prototype.getRevision=on.prototype.u;on.prototype.on=on.prototype.s;on.prototype.once=on.prototype.v;on.prototype.un=on.prototype.t;on.prototype.unByKey=on.prototype.A;
Ly.prototype.getAttributions=Ly.prototype.Y;Ly.prototype.getLogo=Ly.prototype.X;Ly.prototype.getProjection=Ly.prototype.Z;Ly.prototype.getState=Ly.prototype.$;Ly.prototype.bindTo=Ly.prototype.K;Ly.prototype.get=Ly.prototype.get;Ly.prototype.getKeys=Ly.prototype.G;Ly.prototype.getProperties=Ly.prototype.I;Ly.prototype.set=Ly.prototype.set;Ly.prototype.setProperties=Ly.prototype.C;Ly.prototype.unbind=Ly.prototype.L;Ly.prototype.unbindAll=Ly.prototype.M;Ly.prototype.changed=Ly.prototype.l;
Ly.prototype.getRevision=Ly.prototype.u;Ly.prototype.on=Ly.prototype.s;Ly.prototype.once=Ly.prototype.v;Ly.prototype.un=Ly.prototype.t;Ly.prototype.unByKey=Ly.prototype.A;My.prototype.getAttributions=My.prototype.Y;My.prototype.getLogo=My.prototype.X;My.prototype.getProjection=My.prototype.Z;My.prototype.getState=My.prototype.$;My.prototype.bindTo=My.prototype.K;My.prototype.get=My.prototype.get;My.prototype.getKeys=My.prototype.G;My.prototype.getProperties=My.prototype.I;My.prototype.set=My.prototype.set;
My.prototype.setProperties=My.prototype.C;My.prototype.unbind=My.prototype.L;My.prototype.unbindAll=My.prototype.M;My.prototype.changed=My.prototype.l;My.prototype.getRevision=My.prototype.u;My.prototype.on=My.prototype.s;My.prototype.once=My.prototype.v;My.prototype.un=My.prototype.t;My.prototype.unByKey=My.prototype.A;Bn.prototype.getAttributions=Bn.prototype.Y;Bn.prototype.getLogo=Bn.prototype.X;Bn.prototype.getProjection=Bn.prototype.Z;Bn.prototype.getState=Bn.prototype.$;
Bn.prototype.bindTo=Bn.prototype.K;Bn.prototype.get=Bn.prototype.get;Bn.prototype.getKeys=Bn.prototype.G;Bn.prototype.getProperties=Bn.prototype.I;Bn.prototype.set=Bn.prototype.set;Bn.prototype.setProperties=Bn.prototype.C;Bn.prototype.unbind=Bn.prototype.L;Bn.prototype.unbindAll=Bn.prototype.M;Bn.prototype.changed=Bn.prototype.l;Bn.prototype.getRevision=Bn.prototype.u;Bn.prototype.on=Bn.prototype.s;Bn.prototype.once=Bn.prototype.v;Bn.prototype.un=Bn.prototype.t;Bn.prototype.unByKey=Bn.prototype.A;
Ny.prototype.getAttributions=Ny.prototype.Y;Ny.prototype.getLogo=Ny.prototype.X;Ny.prototype.getProjection=Ny.prototype.Z;Ny.prototype.getState=Ny.prototype.$;Ny.prototype.bindTo=Ny.prototype.K;Ny.prototype.get=Ny.prototype.get;Ny.prototype.getKeys=Ny.prototype.G;Ny.prototype.getProperties=Ny.prototype.I;Ny.prototype.set=Ny.prototype.set;Ny.prototype.setProperties=Ny.prototype.C;Ny.prototype.unbind=Ny.prototype.L;Ny.prototype.unbindAll=Ny.prototype.M;Ny.prototype.changed=Ny.prototype.l;
Ny.prototype.getRevision=Ny.prototype.u;Ny.prototype.on=Ny.prototype.s;Ny.prototype.once=Ny.prototype.v;Ny.prototype.un=Ny.prototype.t;Ny.prototype.unByKey=Ny.prototype.A;Ry.prototype.readFeatures=Ry.prototype.a;Ry.prototype.addFeature=Ry.prototype.Va;Ry.prototype.addFeatures=Ry.prototype.Ga;Ry.prototype.clear=Ry.prototype.clear;Ry.prototype.forEachFeature=Ry.prototype.$a;Ry.prototype.forEachFeatureInExtent=Ry.prototype.wa;Ry.prototype.forEachFeatureIntersectingExtent=Ry.prototype.Ma;
Ry.prototype.getFeatures=Ry.prototype.Aa;Ry.prototype.getFeaturesAtCoordinate=Ry.prototype.Oa;Ry.prototype.getClosestFeatureToCoordinate=Ry.prototype.ab;Ry.prototype.getExtent=Ry.prototype.J;Ry.prototype.getFeatureById=Ry.prototype.Na;Ry.prototype.removeFeature=Ry.prototype.fb;Ry.prototype.getAttributions=Ry.prototype.Y;Ry.prototype.getLogo=Ry.prototype.X;Ry.prototype.getProjection=Ry.prototype.Z;Ry.prototype.getState=Ry.prototype.$;Ry.prototype.bindTo=Ry.prototype.K;Ry.prototype.get=Ry.prototype.get;
Ry.prototype.getKeys=Ry.prototype.G;Ry.prototype.getProperties=Ry.prototype.I;Ry.prototype.set=Ry.prototype.set;Ry.prototype.setProperties=Ry.prototype.C;Ry.prototype.unbind=Ry.prototype.L;Ry.prototype.unbindAll=Ry.prototype.M;Ry.prototype.changed=Ry.prototype.l;Ry.prototype.getRevision=Ry.prototype.u;Ry.prototype.on=Ry.prototype.s;Ry.prototype.once=Ry.prototype.v;Ry.prototype.un=Ry.prototype.t;Ry.prototype.unByKey=Ry.prototype.A;Sy.prototype.getTileLoadFunction=Sy.prototype.bb;
Sy.prototype.getTileUrlFunction=Sy.prototype.cb;Sy.prototype.setTileLoadFunction=Sy.prototype.jb;Sy.prototype.getTileGrid=Sy.prototype.xa;Sy.prototype.getAttributions=Sy.prototype.Y;Sy.prototype.getLogo=Sy.prototype.X;Sy.prototype.getProjection=Sy.prototype.Z;Sy.prototype.getState=Sy.prototype.$;Sy.prototype.bindTo=Sy.prototype.K;Sy.prototype.get=Sy.prototype.get;Sy.prototype.getKeys=Sy.prototype.G;Sy.prototype.getProperties=Sy.prototype.I;Sy.prototype.set=Sy.prototype.set;
Sy.prototype.setProperties=Sy.prototype.C;Sy.prototype.unbind=Sy.prototype.L;Sy.prototype.unbindAll=Sy.prototype.M;Sy.prototype.changed=Sy.prototype.l;Sy.prototype.getRevision=Sy.prototype.u;Sy.prototype.on=Sy.prototype.s;Sy.prototype.once=Sy.prototype.v;Sy.prototype.un=Sy.prototype.t;Sy.prototype.unByKey=Sy.prototype.A;Vy.prototype.setTileUrlFunction=Vy.prototype.ua;Vy.prototype.setUrl=Vy.prototype.b;Vy.prototype.getTileLoadFunction=Vy.prototype.bb;Vy.prototype.getTileUrlFunction=Vy.prototype.cb;
Vy.prototype.setTileLoadFunction=Vy.prototype.jb;Vy.prototype.getTileGrid=Vy.prototype.xa;Vy.prototype.getAttributions=Vy.prototype.Y;Vy.prototype.getLogo=Vy.prototype.X;Vy.prototype.getProjection=Vy.prototype.Z;Vy.prototype.getState=Vy.prototype.$;Vy.prototype.bindTo=Vy.prototype.K;Vy.prototype.get=Vy.prototype.get;Vy.prototype.getKeys=Vy.prototype.G;Vy.prototype.getProperties=Vy.prototype.I;Vy.prototype.set=Vy.prototype.set;Vy.prototype.setProperties=Vy.prototype.C;Vy.prototype.unbind=Vy.prototype.L;
Vy.prototype.unbindAll=Vy.prototype.M;Vy.prototype.changed=Vy.prototype.l;Vy.prototype.getRevision=Vy.prototype.u;Vy.prototype.on=Vy.prototype.s;Vy.prototype.once=Vy.prototype.v;Vy.prototype.un=Vy.prototype.t;Vy.prototype.unByKey=Vy.prototype.A;Ty.prototype.setTileUrlFunction=Ty.prototype.ua;Ty.prototype.setUrl=Ty.prototype.b;Ty.prototype.getTileLoadFunction=Ty.prototype.bb;Ty.prototype.getTileUrlFunction=Ty.prototype.cb;Ty.prototype.setTileLoadFunction=Ty.prototype.jb;Ty.prototype.getTileGrid=Ty.prototype.xa;
Ty.prototype.getAttributions=Ty.prototype.Y;Ty.prototype.getLogo=Ty.prototype.X;Ty.prototype.getProjection=Ty.prototype.Z;Ty.prototype.getState=Ty.prototype.$;Ty.prototype.bindTo=Ty.prototype.K;Ty.prototype.get=Ty.prototype.get;Ty.prototype.getKeys=Ty.prototype.G;Ty.prototype.getProperties=Ty.prototype.I;Ty.prototype.set=Ty.prototype.set;Ty.prototype.setProperties=Ty.prototype.C;Ty.prototype.unbind=Ty.prototype.L;Ty.prototype.unbindAll=Ty.prototype.M;Ty.prototype.changed=Ty.prototype.l;
Ty.prototype.getRevision=Ty.prototype.u;Ty.prototype.on=Ty.prototype.s;Ty.prototype.once=Ty.prototype.v;Ty.prototype.un=Ty.prototype.t;Ty.prototype.unByKey=Ty.prototype.A;Yy.prototype.readFeatures=Yy.prototype.a;Yy.prototype.addFeature=Yy.prototype.Va;Yy.prototype.addFeatures=Yy.prototype.Ga;Yy.prototype.clear=Yy.prototype.clear;Yy.prototype.forEachFeature=Yy.prototype.$a;Yy.prototype.forEachFeatureInExtent=Yy.prototype.wa;Yy.prototype.forEachFeatureIntersectingExtent=Yy.prototype.Ma;
Yy.prototype.getFeatures=Yy.prototype.Aa;Yy.prototype.getFeaturesAtCoordinate=Yy.prototype.Oa;Yy.prototype.getClosestFeatureToCoordinate=Yy.prototype.ab;Yy.prototype.getExtent=Yy.prototype.J;Yy.prototype.getFeatureById=Yy.prototype.Na;Yy.prototype.removeFeature=Yy.prototype.fb;Yy.prototype.getAttributions=Yy.prototype.Y;Yy.prototype.getLogo=Yy.prototype.X;Yy.prototype.getProjection=Yy.prototype.Z;Yy.prototype.getState=Yy.prototype.$;Yy.prototype.bindTo=Yy.prototype.K;Yy.prototype.get=Yy.prototype.get;
Yy.prototype.getKeys=Yy.prototype.G;Yy.prototype.getProperties=Yy.prototype.I;Yy.prototype.set=Yy.prototype.set;Yy.prototype.setProperties=Yy.prototype.C;Yy.prototype.unbind=Yy.prototype.L;Yy.prototype.unbindAll=Yy.prototype.M;Yy.prototype.changed=Yy.prototype.l;Yy.prototype.getRevision=Yy.prototype.u;Yy.prototype.on=Yy.prototype.s;Yy.prototype.once=Yy.prototype.v;Yy.prototype.un=Yy.prototype.t;Yy.prototype.unByKey=Yy.prototype.A;Zy.prototype.addFeature=Zy.prototype.Va;Zy.prototype.addFeatures=Zy.prototype.Ga;
Zy.prototype.forEachFeature=Zy.prototype.$a;Zy.prototype.forEachFeatureInExtent=Zy.prototype.wa;Zy.prototype.forEachFeatureIntersectingExtent=Zy.prototype.Ma;Zy.prototype.getFeatures=Zy.prototype.Aa;Zy.prototype.getFeaturesAtCoordinate=Zy.prototype.Oa;Zy.prototype.getClosestFeatureToCoordinate=Zy.prototype.ab;Zy.prototype.getExtent=Zy.prototype.J;Zy.prototype.getFeatureById=Zy.prototype.Na;Zy.prototype.removeFeature=Zy.prototype.fb;Zy.prototype.getAttributions=Zy.prototype.Y;
Zy.prototype.getLogo=Zy.prototype.X;Zy.prototype.getProjection=Zy.prototype.Z;Zy.prototype.getState=Zy.prototype.$;Zy.prototype.bindTo=Zy.prototype.K;Zy.prototype.get=Zy.prototype.get;Zy.prototype.getKeys=Zy.prototype.G;Zy.prototype.getProperties=Zy.prototype.I;Zy.prototype.set=Zy.prototype.set;Zy.prototype.setProperties=Zy.prototype.C;Zy.prototype.unbind=Zy.prototype.L;Zy.prototype.unbindAll=Zy.prototype.M;Zy.prototype.changed=Zy.prototype.l;Zy.prototype.getRevision=Zy.prototype.u;
Zy.prototype.on=Zy.prototype.s;Zy.prototype.once=Zy.prototype.v;Zy.prototype.un=Zy.prototype.t;Zy.prototype.unByKey=Zy.prototype.A;bz.prototype.setTileUrlFunction=bz.prototype.ua;bz.prototype.setUrl=bz.prototype.b;bz.prototype.getTileLoadFunction=bz.prototype.bb;bz.prototype.getTileUrlFunction=bz.prototype.cb;bz.prototype.setTileLoadFunction=bz.prototype.jb;bz.prototype.getTileGrid=bz.prototype.xa;bz.prototype.getAttributions=bz.prototype.Y;bz.prototype.getLogo=bz.prototype.X;
bz.prototype.getProjection=bz.prototype.Z;bz.prototype.getState=bz.prototype.$;bz.prototype.bindTo=bz.prototype.K;bz.prototype.get=bz.prototype.get;bz.prototype.getKeys=bz.prototype.G;bz.prototype.getProperties=bz.prototype.I;bz.prototype.set=bz.prototype.set;bz.prototype.setProperties=bz.prototype.C;bz.prototype.unbind=bz.prototype.L;bz.prototype.unbindAll=bz.prototype.M;bz.prototype.changed=bz.prototype.l;bz.prototype.getRevision=bz.prototype.u;bz.prototype.on=bz.prototype.s;bz.prototype.once=bz.prototype.v;
bz.prototype.un=bz.prototype.t;bz.prototype.unByKey=bz.prototype.A;dz.prototype.getTileLoadFunction=dz.prototype.bb;dz.prototype.getTileUrlFunction=dz.prototype.cb;dz.prototype.setTileLoadFunction=dz.prototype.jb;dz.prototype.setTileUrlFunction=dz.prototype.ua;dz.prototype.getTileGrid=dz.prototype.xa;dz.prototype.getAttributions=dz.prototype.Y;dz.prototype.getLogo=dz.prototype.X;dz.prototype.getProjection=dz.prototype.Z;dz.prototype.getState=dz.prototype.$;dz.prototype.bindTo=dz.prototype.K;
dz.prototype.get=dz.prototype.get;dz.prototype.getKeys=dz.prototype.G;dz.prototype.getProperties=dz.prototype.I;dz.prototype.set=dz.prototype.set;dz.prototype.setProperties=dz.prototype.C;dz.prototype.unbind=dz.prototype.L;dz.prototype.unbindAll=dz.prototype.M;dz.prototype.changed=dz.prototype.l;dz.prototype.getRevision=dz.prototype.u;dz.prototype.on=dz.prototype.s;dz.prototype.once=dz.prototype.v;dz.prototype.un=dz.prototype.t;dz.prototype.unByKey=dz.prototype.A;fz.prototype.getTileGrid=fz.prototype.xa;
fz.prototype.getAttributions=fz.prototype.Y;fz.prototype.getLogo=fz.prototype.X;fz.prototype.getProjection=fz.prototype.Z;fz.prototype.getState=fz.prototype.$;fz.prototype.bindTo=fz.prototype.K;fz.prototype.get=fz.prototype.get;fz.prototype.getKeys=fz.prototype.G;fz.prototype.getProperties=fz.prototype.I;fz.prototype.set=fz.prototype.set;fz.prototype.setProperties=fz.prototype.C;fz.prototype.unbind=fz.prototype.L;fz.prototype.unbindAll=fz.prototype.M;fz.prototype.changed=fz.prototype.l;
fz.prototype.getRevision=fz.prototype.u;fz.prototype.on=fz.prototype.s;fz.prototype.once=fz.prototype.v;fz.prototype.un=fz.prototype.t;fz.prototype.unByKey=fz.prototype.A;gz.prototype.getTileLoadFunction=gz.prototype.bb;gz.prototype.getTileUrlFunction=gz.prototype.cb;gz.prototype.setTileLoadFunction=gz.prototype.jb;gz.prototype.setTileUrlFunction=gz.prototype.ua;gz.prototype.getTileGrid=gz.prototype.xa;gz.prototype.getAttributions=gz.prototype.Y;gz.prototype.getLogo=gz.prototype.X;
gz.prototype.getProjection=gz.prototype.Z;gz.prototype.getState=gz.prototype.$;gz.prototype.bindTo=gz.prototype.K;gz.prototype.get=gz.prototype.get;gz.prototype.getKeys=gz.prototype.G;gz.prototype.getProperties=gz.prototype.I;gz.prototype.set=gz.prototype.set;gz.prototype.setProperties=gz.prototype.C;gz.prototype.unbind=gz.prototype.L;gz.prototype.unbindAll=gz.prototype.M;gz.prototype.changed=gz.prototype.l;gz.prototype.getRevision=gz.prototype.u;gz.prototype.on=gz.prototype.s;gz.prototype.once=gz.prototype.v;
gz.prototype.un=gz.prototype.t;gz.prototype.unByKey=gz.prototype.A;hz.prototype.getTileGrid=hz.prototype.xa;hz.prototype.getAttributions=hz.prototype.Y;hz.prototype.getLogo=hz.prototype.X;hz.prototype.getProjection=hz.prototype.Z;hz.prototype.getState=hz.prototype.$;hz.prototype.bindTo=hz.prototype.K;hz.prototype.get=hz.prototype.get;hz.prototype.getKeys=hz.prototype.G;hz.prototype.getProperties=hz.prototype.I;hz.prototype.set=hz.prototype.set;hz.prototype.setProperties=hz.prototype.C;
hz.prototype.unbind=hz.prototype.L;hz.prototype.unbindAll=hz.prototype.M;hz.prototype.changed=hz.prototype.l;hz.prototype.getRevision=hz.prototype.u;hz.prototype.on=hz.prototype.s;hz.prototype.once=hz.prototype.v;hz.prototype.un=hz.prototype.t;hz.prototype.unByKey=hz.prototype.A;mz.prototype.readFeatures=mz.prototype.a;mz.prototype.forEachFeatureIntersectingExtent=mz.prototype.Ma;mz.prototype.getFeaturesAtCoordinate=mz.prototype.Oa;mz.prototype.getFeatureById=mz.prototype.Na;
mz.prototype.getAttributions=mz.prototype.Y;mz.prototype.getLogo=mz.prototype.X;mz.prototype.getProjection=mz.prototype.Z;mz.prototype.getState=mz.prototype.$;mz.prototype.bindTo=mz.prototype.K;mz.prototype.get=mz.prototype.get;mz.prototype.getKeys=mz.prototype.G;mz.prototype.getProperties=mz.prototype.I;mz.prototype.set=mz.prototype.set;mz.prototype.setProperties=mz.prototype.C;mz.prototype.unbind=mz.prototype.L;mz.prototype.unbindAll=mz.prototype.M;mz.prototype.changed=mz.prototype.l;
mz.prototype.getRevision=mz.prototype.u;mz.prototype.on=mz.prototype.s;mz.prototype.once=mz.prototype.v;mz.prototype.un=mz.prototype.t;mz.prototype.unByKey=mz.prototype.A;oz.prototype.getTileLoadFunction=oz.prototype.bb;oz.prototype.getTileUrlFunction=oz.prototype.cb;oz.prototype.setTileLoadFunction=oz.prototype.jb;oz.prototype.setTileUrlFunction=oz.prototype.ua;oz.prototype.getTileGrid=oz.prototype.xa;oz.prototype.getAttributions=oz.prototype.Y;oz.prototype.getLogo=oz.prototype.X;
oz.prototype.getProjection=oz.prototype.Z;oz.prototype.getState=oz.prototype.$;oz.prototype.bindTo=oz.prototype.K;oz.prototype.get=oz.prototype.get;oz.prototype.getKeys=oz.prototype.G;oz.prototype.getProperties=oz.prototype.I;oz.prototype.set=oz.prototype.set;oz.prototype.setProperties=oz.prototype.C;oz.prototype.unbind=oz.prototype.L;oz.prototype.unbindAll=oz.prototype.M;oz.prototype.changed=oz.prototype.l;oz.prototype.getRevision=oz.prototype.u;oz.prototype.on=oz.prototype.s;oz.prototype.once=oz.prototype.v;
oz.prototype.un=oz.prototype.t;oz.prototype.unByKey=oz.prototype.A;sz.prototype.readFeatures=sz.prototype.a;sz.prototype.addFeature=sz.prototype.Va;sz.prototype.addFeatures=sz.prototype.Ga;sz.prototype.clear=sz.prototype.clear;sz.prototype.forEachFeature=sz.prototype.$a;sz.prototype.forEachFeatureInExtent=sz.prototype.wa;sz.prototype.forEachFeatureIntersectingExtent=sz.prototype.Ma;sz.prototype.getFeatures=sz.prototype.Aa;sz.prototype.getFeaturesAtCoordinate=sz.prototype.Oa;
sz.prototype.getClosestFeatureToCoordinate=sz.prototype.ab;sz.prototype.getExtent=sz.prototype.J;sz.prototype.getFeatureById=sz.prototype.Na;sz.prototype.removeFeature=sz.prototype.fb;sz.prototype.getAttributions=sz.prototype.Y;sz.prototype.getLogo=sz.prototype.X;sz.prototype.getProjection=sz.prototype.Z;sz.prototype.getState=sz.prototype.$;sz.prototype.bindTo=sz.prototype.K;sz.prototype.get=sz.prototype.get;sz.prototype.getKeys=sz.prototype.G;sz.prototype.getProperties=sz.prototype.I;
sz.prototype.set=sz.prototype.set;sz.prototype.setProperties=sz.prototype.C;sz.prototype.unbind=sz.prototype.L;sz.prototype.unbindAll=sz.prototype.M;sz.prototype.changed=sz.prototype.l;sz.prototype.getRevision=sz.prototype.u;sz.prototype.on=sz.prototype.s;sz.prototype.once=sz.prototype.v;sz.prototype.un=sz.prototype.t;sz.prototype.unByKey=sz.prototype.A;vz.prototype.getTileLoadFunction=vz.prototype.bb;vz.prototype.getTileUrlFunction=vz.prototype.cb;vz.prototype.setTileLoadFunction=vz.prototype.jb;
vz.prototype.setTileUrlFunction=vz.prototype.ua;vz.prototype.getTileGrid=vz.prototype.xa;vz.prototype.getAttributions=vz.prototype.Y;vz.prototype.getLogo=vz.prototype.X;vz.prototype.getProjection=vz.prototype.Z;vz.prototype.getState=vz.prototype.$;vz.prototype.bindTo=vz.prototype.K;vz.prototype.get=vz.prototype.get;vz.prototype.getKeys=vz.prototype.G;vz.prototype.getProperties=vz.prototype.I;vz.prototype.set=vz.prototype.set;vz.prototype.setProperties=vz.prototype.C;vz.prototype.unbind=vz.prototype.L;
vz.prototype.unbindAll=vz.prototype.M;vz.prototype.changed=vz.prototype.l;vz.prototype.getRevision=vz.prototype.u;vz.prototype.on=vz.prototype.s;vz.prototype.once=vz.prototype.v;vz.prototype.un=vz.prototype.t;vz.prototype.unByKey=vz.prototype.A;yz.prototype.getTileLoadFunction=yz.prototype.bb;yz.prototype.getTileUrlFunction=yz.prototype.cb;yz.prototype.setTileLoadFunction=yz.prototype.jb;yz.prototype.setTileUrlFunction=yz.prototype.ua;yz.prototype.getTileGrid=yz.prototype.xa;
yz.prototype.getAttributions=yz.prototype.Y;yz.prototype.getLogo=yz.prototype.X;yz.prototype.getProjection=yz.prototype.Z;yz.prototype.getState=yz.prototype.$;yz.prototype.bindTo=yz.prototype.K;yz.prototype.get=yz.prototype.get;yz.prototype.getKeys=yz.prototype.G;yz.prototype.getProperties=yz.prototype.I;yz.prototype.set=yz.prototype.set;yz.prototype.setProperties=yz.prototype.C;yz.prototype.unbind=yz.prototype.L;yz.prototype.unbindAll=yz.prototype.M;yz.prototype.changed=yz.prototype.l;
yz.prototype.getRevision=yz.prototype.u;yz.prototype.on=yz.prototype.s;yz.prototype.once=yz.prototype.v;yz.prototype.un=yz.prototype.t;yz.prototype.unByKey=yz.prototype.A;oj.prototype.changed=oj.prototype.l;oj.prototype.getRevision=oj.prototype.u;oj.prototype.on=oj.prototype.s;oj.prototype.once=oj.prototype.v;oj.prototype.un=oj.prototype.t;oj.prototype.unByKey=oj.prototype.A;Co.prototype.changed=Co.prototype.l;Co.prototype.getRevision=Co.prototype.u;Co.prototype.on=Co.prototype.s;
Co.prototype.once=Co.prototype.v;Co.prototype.un=Co.prototype.t;Co.prototype.unByKey=Co.prototype.A;Fo.prototype.changed=Fo.prototype.l;Fo.prototype.getRevision=Fo.prototype.u;Fo.prototype.on=Fo.prototype.s;Fo.prototype.once=Fo.prototype.v;Fo.prototype.un=Fo.prototype.t;Fo.prototype.unByKey=Fo.prototype.A;Lo.prototype.changed=Lo.prototype.l;Lo.prototype.getRevision=Lo.prototype.u;Lo.prototype.on=Lo.prototype.s;Lo.prototype.once=Lo.prototype.v;Lo.prototype.un=Lo.prototype.t;Lo.prototype.unByKey=Lo.prototype.A;
No.prototype.changed=No.prototype.l;No.prototype.getRevision=No.prototype.u;No.prototype.on=No.prototype.s;No.prototype.once=No.prototype.v;No.prototype.un=No.prototype.t;No.prototype.unByKey=No.prototype.A;In.prototype.changed=In.prototype.l;In.prototype.getRevision=In.prototype.u;In.prototype.on=In.prototype.s;In.prototype.once=In.prototype.v;In.prototype.un=In.prototype.t;In.prototype.unByKey=In.prototype.A;Jn.prototype.changed=Jn.prototype.l;Jn.prototype.getRevision=Jn.prototype.u;
Jn.prototype.on=Jn.prototype.s;Jn.prototype.once=Jn.prototype.v;Jn.prototype.un=Jn.prototype.t;Jn.prototype.unByKey=Jn.prototype.A;Kn.prototype.changed=Kn.prototype.l;Kn.prototype.getRevision=Kn.prototype.u;Kn.prototype.on=Kn.prototype.s;Kn.prototype.once=Kn.prototype.v;Kn.prototype.un=Kn.prototype.t;Kn.prototype.unByKey=Kn.prototype.A;Mn.prototype.changed=Mn.prototype.l;Mn.prototype.getRevision=Mn.prototype.u;Mn.prototype.on=Mn.prototype.s;Mn.prototype.once=Mn.prototype.v;Mn.prototype.un=Mn.prototype.t;
Mn.prototype.unByKey=Mn.prototype.A;Fm.prototype.changed=Fm.prototype.l;Fm.prototype.getRevision=Fm.prototype.u;Fm.prototype.on=Fm.prototype.s;Fm.prototype.once=Fm.prototype.v;Fm.prototype.un=Fm.prototype.t;Fm.prototype.unByKey=Fm.prototype.A;Dn.prototype.changed=Dn.prototype.l;Dn.prototype.getRevision=Dn.prototype.u;Dn.prototype.on=Dn.prototype.s;Dn.prototype.once=Dn.prototype.v;Dn.prototype.un=Dn.prototype.t;Dn.prototype.unByKey=Dn.prototype.A;En.prototype.changed=En.prototype.l;
En.prototype.getRevision=En.prototype.u;En.prototype.on=En.prototype.s;En.prototype.once=En.prototype.v;En.prototype.un=En.prototype.t;En.prototype.unByKey=En.prototype.A;Fn.prototype.changed=Fn.prototype.l;Fn.prototype.getRevision=Fn.prototype.u;Fn.prototype.on=Fn.prototype.s;Fn.prototype.once=Fn.prototype.v;Fn.prototype.un=Fn.prototype.t;Fn.prototype.unByKey=Fn.prototype.A;C.prototype.bindTo=C.prototype.K;C.prototype.get=C.prototype.get;C.prototype.getKeys=C.prototype.G;
C.prototype.getProperties=C.prototype.I;C.prototype.set=C.prototype.set;C.prototype.setProperties=C.prototype.C;C.prototype.unbind=C.prototype.L;C.prototype.unbindAll=C.prototype.M;C.prototype.changed=C.prototype.l;C.prototype.getRevision=C.prototype.u;C.prototype.on=C.prototype.s;C.prototype.once=C.prototype.v;C.prototype.un=C.prototype.t;C.prototype.unByKey=C.prototype.A;D.prototype.getBrightness=D.prototype.d;D.prototype.getContrast=D.prototype.f;D.prototype.getHue=D.prototype.e;
D.prototype.getExtent=D.prototype.J;D.prototype.getMaxResolution=D.prototype.g;D.prototype.getMinResolution=D.prototype.i;D.prototype.getOpacity=D.prototype.q;D.prototype.getSaturation=D.prototype.k;D.prototype.getVisible=D.prototype.b;D.prototype.setBrightness=D.prototype.D;D.prototype.setContrast=D.prototype.H;D.prototype.setHue=D.prototype.N;D.prototype.setExtent=D.prototype.o;D.prototype.setMaxResolution=D.prototype.S;D.prototype.setMinResolution=D.prototype.U;D.prototype.setOpacity=D.prototype.p;
D.prototype.setSaturation=D.prototype.ca;D.prototype.setVisible=D.prototype.da;D.prototype.bindTo=D.prototype.K;D.prototype.get=D.prototype.get;D.prototype.getKeys=D.prototype.G;D.prototype.getProperties=D.prototype.I;D.prototype.set=D.prototype.set;D.prototype.setProperties=D.prototype.C;D.prototype.unbind=D.prototype.L;D.prototype.unbindAll=D.prototype.M;D.prototype.changed=D.prototype.l;D.prototype.getRevision=D.prototype.u;D.prototype.on=D.prototype.s;D.prototype.once=D.prototype.v;
D.prototype.un=D.prototype.t;D.prototype.unByKey=D.prototype.A;J.prototype.setSource=J.prototype.fa;J.prototype.getBrightness=J.prototype.d;J.prototype.getContrast=J.prototype.f;J.prototype.getHue=J.prototype.e;J.prototype.getExtent=J.prototype.J;J.prototype.getMaxResolution=J.prototype.g;J.prototype.getMinResolution=J.prototype.i;J.prototype.getOpacity=J.prototype.q;J.prototype.getSaturation=J.prototype.k;J.prototype.getVisible=J.prototype.b;J.prototype.setBrightness=J.prototype.D;
J.prototype.setContrast=J.prototype.H;J.prototype.setHue=J.prototype.N;J.prototype.setExtent=J.prototype.o;J.prototype.setMaxResolution=J.prototype.S;J.prototype.setMinResolution=J.prototype.U;J.prototype.setOpacity=J.prototype.p;J.prototype.setSaturation=J.prototype.ca;J.prototype.setVisible=J.prototype.da;J.prototype.bindTo=J.prototype.K;J.prototype.get=J.prototype.get;J.prototype.getKeys=J.prototype.G;J.prototype.getProperties=J.prototype.I;J.prototype.set=J.prototype.set;
J.prototype.setProperties=J.prototype.C;J.prototype.unbind=J.prototype.L;J.prototype.unbindAll=J.prototype.M;J.prototype.changed=J.prototype.l;J.prototype.getRevision=J.prototype.u;J.prototype.on=J.prototype.s;J.prototype.once=J.prototype.v;J.prototype.un=J.prototype.t;J.prototype.unByKey=J.prototype.A;Y.prototype.getSource=Y.prototype.a;Y.prototype.getStyle=Y.prototype.$e;Y.prototype.getStyleFunction=Y.prototype.cf;Y.prototype.setStyle=Y.prototype.ka;Y.prototype.setSource=Y.prototype.fa;
Y.prototype.getBrightness=Y.prototype.d;Y.prototype.getContrast=Y.prototype.f;Y.prototype.getHue=Y.prototype.e;Y.prototype.getExtent=Y.prototype.J;Y.prototype.getMaxResolution=Y.prototype.g;Y.prototype.getMinResolution=Y.prototype.i;Y.prototype.getOpacity=Y.prototype.q;Y.prototype.getSaturation=Y.prototype.k;Y.prototype.getVisible=Y.prototype.b;Y.prototype.setBrightness=Y.prototype.D;Y.prototype.setContrast=Y.prototype.H;Y.prototype.setHue=Y.prototype.N;Y.prototype.setExtent=Y.prototype.o;
Y.prototype.setMaxResolution=Y.prototype.S;Y.prototype.setMinResolution=Y.prototype.U;Y.prototype.setOpacity=Y.prototype.p;Y.prototype.setSaturation=Y.prototype.ca;Y.prototype.setVisible=Y.prototype.da;Y.prototype.bindTo=Y.prototype.K;Y.prototype.get=Y.prototype.get;Y.prototype.getKeys=Y.prototype.G;Y.prototype.getProperties=Y.prototype.I;Y.prototype.set=Y.prototype.set;Y.prototype.setProperties=Y.prototype.C;Y.prototype.unbind=Y.prototype.L;Y.prototype.unbindAll=Y.prototype.M;
Y.prototype.changed=Y.prototype.l;Y.prototype.getRevision=Y.prototype.u;Y.prototype.on=Y.prototype.s;Y.prototype.once=Y.prototype.v;Y.prototype.un=Y.prototype.t;Y.prototype.unByKey=Y.prototype.A;H.prototype.setSource=H.prototype.fa;H.prototype.getBrightness=H.prototype.d;H.prototype.getContrast=H.prototype.f;H.prototype.getHue=H.prototype.e;H.prototype.getExtent=H.prototype.J;H.prototype.getMaxResolution=H.prototype.g;H.prototype.getMinResolution=H.prototype.i;H.prototype.getOpacity=H.prototype.q;
H.prototype.getSaturation=H.prototype.k;H.prototype.getVisible=H.prototype.b;H.prototype.setBrightness=H.prototype.D;H.prototype.setContrast=H.prototype.H;H.prototype.setHue=H.prototype.N;H.prototype.setExtent=H.prototype.o;H.prototype.setMaxResolution=H.prototype.S;H.prototype.setMinResolution=H.prototype.U;H.prototype.setOpacity=H.prototype.p;H.prototype.setSaturation=H.prototype.ca;H.prototype.setVisible=H.prototype.da;H.prototype.bindTo=H.prototype.K;H.prototype.get=H.prototype.get;
H.prototype.getKeys=H.prototype.G;H.prototype.getProperties=H.prototype.I;H.prototype.set=H.prototype.set;H.prototype.setProperties=H.prototype.C;H.prototype.unbind=H.prototype.L;H.prototype.unbindAll=H.prototype.M;H.prototype.changed=H.prototype.l;H.prototype.getRevision=H.prototype.u;H.prototype.on=H.prototype.s;H.prototype.once=H.prototype.v;H.prototype.un=H.prototype.t;H.prototype.unByKey=H.prototype.A;G.prototype.getBrightness=G.prototype.d;G.prototype.getContrast=G.prototype.f;
G.prototype.getHue=G.prototype.e;G.prototype.getExtent=G.prototype.J;G.prototype.getMaxResolution=G.prototype.g;G.prototype.getMinResolution=G.prototype.i;G.prototype.getOpacity=G.prototype.q;G.prototype.getSaturation=G.prototype.k;G.prototype.getVisible=G.prototype.b;G.prototype.setBrightness=G.prototype.D;G.prototype.setContrast=G.prototype.H;G.prototype.setHue=G.prototype.N;G.prototype.setExtent=G.prototype.o;G.prototype.setMaxResolution=G.prototype.S;G.prototype.setMinResolution=G.prototype.U;
G.prototype.setOpacity=G.prototype.p;G.prototype.setSaturation=G.prototype.ca;G.prototype.setVisible=G.prototype.da;G.prototype.bindTo=G.prototype.K;G.prototype.get=G.prototype.get;G.prototype.getKeys=G.prototype.G;G.prototype.getProperties=G.prototype.I;G.prototype.set=G.prototype.set;G.prototype.setProperties=G.prototype.C;G.prototype.unbind=G.prototype.L;G.prototype.unbindAll=G.prototype.M;G.prototype.changed=G.prototype.l;G.prototype.getRevision=G.prototype.u;G.prototype.on=G.prototype.s;
G.prototype.once=G.prototype.v;G.prototype.un=G.prototype.t;G.prototype.unByKey=G.prototype.A;I.prototype.setSource=I.prototype.fa;I.prototype.getBrightness=I.prototype.d;I.prototype.getContrast=I.prototype.f;I.prototype.getHue=I.prototype.e;I.prototype.getExtent=I.prototype.J;I.prototype.getMaxResolution=I.prototype.g;I.prototype.getMinResolution=I.prototype.i;I.prototype.getOpacity=I.prototype.q;I.prototype.getSaturation=I.prototype.k;I.prototype.getVisible=I.prototype.b;
I.prototype.setBrightness=I.prototype.D;I.prototype.setContrast=I.prototype.H;I.prototype.setHue=I.prototype.N;I.prototype.setExtent=I.prototype.o;I.prototype.setMaxResolution=I.prototype.S;I.prototype.setMinResolution=I.prototype.U;I.prototype.setOpacity=I.prototype.p;I.prototype.setSaturation=I.prototype.ca;I.prototype.setVisible=I.prototype.da;I.prototype.bindTo=I.prototype.K;I.prototype.get=I.prototype.get;I.prototype.getKeys=I.prototype.G;I.prototype.getProperties=I.prototype.I;
I.prototype.set=I.prototype.set;I.prototype.setProperties=I.prototype.C;I.prototype.unbind=I.prototype.L;I.prototype.unbindAll=I.prototype.M;I.prototype.changed=I.prototype.l;I.prototype.getRevision=I.prototype.u;I.prototype.on=I.prototype.s;I.prototype.once=I.prototype.v;I.prototype.un=I.prototype.t;I.prototype.unByKey=I.prototype.A;Rj.prototype.bindTo=Rj.prototype.K;Rj.prototype.get=Rj.prototype.get;Rj.prototype.getKeys=Rj.prototype.G;Rj.prototype.getProperties=Rj.prototype.I;Rj.prototype.set=Rj.prototype.set;
Rj.prototype.setProperties=Rj.prototype.C;Rj.prototype.unbind=Rj.prototype.L;Rj.prototype.unbindAll=Rj.prototype.M;Rj.prototype.changed=Rj.prototype.l;Rj.prototype.getRevision=Rj.prototype.u;Rj.prototype.on=Rj.prototype.s;Rj.prototype.once=Rj.prototype.v;Rj.prototype.un=Rj.prototype.t;Rj.prototype.unByKey=Rj.prototype.A;Vj.prototype.getActive=Vj.prototype.b;Vj.prototype.setActive=Vj.prototype.d;Vj.prototype.bindTo=Vj.prototype.K;Vj.prototype.get=Vj.prototype.get;Vj.prototype.getKeys=Vj.prototype.G;
Vj.prototype.getProperties=Vj.prototype.I;Vj.prototype.set=Vj.prototype.set;Vj.prototype.setProperties=Vj.prototype.C;Vj.prototype.unbind=Vj.prototype.L;Vj.prototype.unbindAll=Vj.prototype.M;Vj.prototype.changed=Vj.prototype.l;Vj.prototype.getRevision=Vj.prototype.u;Vj.prototype.on=Vj.prototype.s;Vj.prototype.once=Vj.prototype.v;Vj.prototype.un=Vj.prototype.t;Vj.prototype.unByKey=Vj.prototype.A;Zw.prototype.getActive=Zw.prototype.b;Zw.prototype.setActive=Zw.prototype.d;Zw.prototype.bindTo=Zw.prototype.K;
Zw.prototype.get=Zw.prototype.get;Zw.prototype.getKeys=Zw.prototype.G;Zw.prototype.getProperties=Zw.prototype.I;Zw.prototype.set=Zw.prototype.set;Zw.prototype.setProperties=Zw.prototype.C;Zw.prototype.unbind=Zw.prototype.L;Zw.prototype.unbindAll=Zw.prototype.M;Zw.prototype.changed=Zw.prototype.l;Zw.prototype.getRevision=Zw.prototype.u;Zw.prototype.on=Zw.prototype.s;Zw.prototype.once=Zw.prototype.v;Zw.prototype.un=Zw.prototype.t;Zw.prototype.unByKey=Zw.prototype.A;ek.prototype.getActive=ek.prototype.b;
ek.prototype.setActive=ek.prototype.d;ek.prototype.bindTo=ek.prototype.K;ek.prototype.get=ek.prototype.get;ek.prototype.getKeys=ek.prototype.G;ek.prototype.getProperties=ek.prototype.I;ek.prototype.set=ek.prototype.set;ek.prototype.setProperties=ek.prototype.C;ek.prototype.unbind=ek.prototype.L;ek.prototype.unbindAll=ek.prototype.M;ek.prototype.changed=ek.prototype.l;ek.prototype.getRevision=ek.prototype.u;ek.prototype.on=ek.prototype.s;ek.prototype.once=ek.prototype.v;ek.prototype.un=ek.prototype.t;
ek.prototype.unByKey=ek.prototype.A;il.prototype.getActive=il.prototype.b;il.prototype.setActive=il.prototype.d;il.prototype.bindTo=il.prototype.K;il.prototype.get=il.prototype.get;il.prototype.getKeys=il.prototype.G;il.prototype.getProperties=il.prototype.I;il.prototype.set=il.prototype.set;il.prototype.setProperties=il.prototype.C;il.prototype.unbind=il.prototype.L;il.prototype.unbindAll=il.prototype.M;il.prototype.changed=il.prototype.l;il.prototype.getRevision=il.prototype.u;il.prototype.on=il.prototype.s;
il.prototype.once=il.prototype.v;il.prototype.un=il.prototype.t;il.prototype.unByKey=il.prototype.A;hk.prototype.getActive=hk.prototype.b;hk.prototype.setActive=hk.prototype.d;hk.prototype.bindTo=hk.prototype.K;hk.prototype.get=hk.prototype.get;hk.prototype.getKeys=hk.prototype.G;hk.prototype.getProperties=hk.prototype.I;hk.prototype.set=hk.prototype.set;hk.prototype.setProperties=hk.prototype.C;hk.prototype.unbind=hk.prototype.L;hk.prototype.unbindAll=hk.prototype.M;hk.prototype.changed=hk.prototype.l;
hk.prototype.getRevision=hk.prototype.u;hk.prototype.on=hk.prototype.s;hk.prototype.once=hk.prototype.v;hk.prototype.un=hk.prototype.t;hk.prototype.unByKey=hk.prototype.A;cx.prototype.getActive=cx.prototype.b;cx.prototype.setActive=cx.prototype.d;cx.prototype.bindTo=cx.prototype.K;cx.prototype.get=cx.prototype.get;cx.prototype.getKeys=cx.prototype.G;cx.prototype.getProperties=cx.prototype.I;cx.prototype.set=cx.prototype.set;cx.prototype.setProperties=cx.prototype.C;cx.prototype.unbind=cx.prototype.L;
cx.prototype.unbindAll=cx.prototype.M;cx.prototype.changed=cx.prototype.l;cx.prototype.getRevision=cx.prototype.u;cx.prototype.on=cx.prototype.s;cx.prototype.once=cx.prototype.v;cx.prototype.un=cx.prototype.t;cx.prototype.unByKey=cx.prototype.A;lk.prototype.getActive=lk.prototype.b;lk.prototype.setActive=lk.prototype.d;lk.prototype.bindTo=lk.prototype.K;lk.prototype.get=lk.prototype.get;lk.prototype.getKeys=lk.prototype.G;lk.prototype.getProperties=lk.prototype.I;lk.prototype.set=lk.prototype.set;
lk.prototype.setProperties=lk.prototype.C;lk.prototype.unbind=lk.prototype.L;lk.prototype.unbindAll=lk.prototype.M;lk.prototype.changed=lk.prototype.l;lk.prototype.getRevision=lk.prototype.u;lk.prototype.on=lk.prototype.s;lk.prototype.once=lk.prototype.v;lk.prototype.un=lk.prototype.t;lk.prototype.unByKey=lk.prototype.A;Bl.prototype.getGeometry=Bl.prototype.R;Bl.prototype.getActive=Bl.prototype.b;Bl.prototype.setActive=Bl.prototype.d;Bl.prototype.bindTo=Bl.prototype.K;Bl.prototype.get=Bl.prototype.get;
Bl.prototype.getKeys=Bl.prototype.G;Bl.prototype.getProperties=Bl.prototype.I;Bl.prototype.set=Bl.prototype.set;Bl.prototype.setProperties=Bl.prototype.C;Bl.prototype.unbind=Bl.prototype.L;Bl.prototype.unbindAll=Bl.prototype.M;Bl.prototype.changed=Bl.prototype.l;Bl.prototype.getRevision=Bl.prototype.u;Bl.prototype.on=Bl.prototype.s;Bl.prototype.once=Bl.prototype.v;Bl.prototype.un=Bl.prototype.t;Bl.prototype.unByKey=Bl.prototype.A;hx.prototype.getActive=hx.prototype.b;hx.prototype.setActive=hx.prototype.d;
hx.prototype.bindTo=hx.prototype.K;hx.prototype.get=hx.prototype.get;hx.prototype.getKeys=hx.prototype.G;hx.prototype.getProperties=hx.prototype.I;hx.prototype.set=hx.prototype.set;hx.prototype.setProperties=hx.prototype.C;hx.prototype.unbind=hx.prototype.L;hx.prototype.unbindAll=hx.prototype.M;hx.prototype.changed=hx.prototype.l;hx.prototype.getRevision=hx.prototype.u;hx.prototype.on=hx.prototype.s;hx.prototype.once=hx.prototype.v;hx.prototype.un=hx.prototype.t;hx.prototype.unByKey=hx.prototype.A;
Cl.prototype.getActive=Cl.prototype.b;Cl.prototype.setActive=Cl.prototype.d;Cl.prototype.bindTo=Cl.prototype.K;Cl.prototype.get=Cl.prototype.get;Cl.prototype.getKeys=Cl.prototype.G;Cl.prototype.getProperties=Cl.prototype.I;Cl.prototype.set=Cl.prototype.set;Cl.prototype.setProperties=Cl.prototype.C;Cl.prototype.unbind=Cl.prototype.L;Cl.prototype.unbindAll=Cl.prototype.M;Cl.prototype.changed=Cl.prototype.l;Cl.prototype.getRevision=Cl.prototype.u;Cl.prototype.on=Cl.prototype.s;Cl.prototype.once=Cl.prototype.v;
Cl.prototype.un=Cl.prototype.t;Cl.prototype.unByKey=Cl.prototype.A;El.prototype.getActive=El.prototype.b;El.prototype.setActive=El.prototype.d;El.prototype.bindTo=El.prototype.K;El.prototype.get=El.prototype.get;El.prototype.getKeys=El.prototype.G;El.prototype.getProperties=El.prototype.I;El.prototype.set=El.prototype.set;El.prototype.setProperties=El.prototype.C;El.prototype.unbind=El.prototype.L;El.prototype.unbindAll=El.prototype.M;El.prototype.changed=El.prototype.l;El.prototype.getRevision=El.prototype.u;
El.prototype.on=El.prototype.s;El.prototype.once=El.prototype.v;El.prototype.un=El.prototype.t;El.prototype.unByKey=El.prototype.A;vx.prototype.getActive=vx.prototype.b;vx.prototype.setActive=vx.prototype.d;vx.prototype.bindTo=vx.prototype.K;vx.prototype.get=vx.prototype.get;vx.prototype.getKeys=vx.prototype.G;vx.prototype.getProperties=vx.prototype.I;vx.prototype.set=vx.prototype.set;vx.prototype.setProperties=vx.prototype.C;vx.prototype.unbind=vx.prototype.L;vx.prototype.unbindAll=vx.prototype.M;
vx.prototype.changed=vx.prototype.l;vx.prototype.getRevision=vx.prototype.u;vx.prototype.on=vx.prototype.s;vx.prototype.once=vx.prototype.v;vx.prototype.un=vx.prototype.t;vx.prototype.unByKey=vx.prototype.A;Gl.prototype.getActive=Gl.prototype.b;Gl.prototype.setActive=Gl.prototype.d;Gl.prototype.bindTo=Gl.prototype.K;Gl.prototype.get=Gl.prototype.get;Gl.prototype.getKeys=Gl.prototype.G;Gl.prototype.getProperties=Gl.prototype.I;Gl.prototype.set=Gl.prototype.set;Gl.prototype.setProperties=Gl.prototype.C;
Gl.prototype.unbind=Gl.prototype.L;Gl.prototype.unbindAll=Gl.prototype.M;Gl.prototype.changed=Gl.prototype.l;Gl.prototype.getRevision=Gl.prototype.u;Gl.prototype.on=Gl.prototype.s;Gl.prototype.once=Gl.prototype.v;Gl.prototype.un=Gl.prototype.t;Gl.prototype.unByKey=Gl.prototype.A;Il.prototype.getActive=Il.prototype.b;Il.prototype.setActive=Il.prototype.d;Il.prototype.bindTo=Il.prototype.K;Il.prototype.get=Il.prototype.get;Il.prototype.getKeys=Il.prototype.G;Il.prototype.getProperties=Il.prototype.I;
Il.prototype.set=Il.prototype.set;Il.prototype.setProperties=Il.prototype.C;Il.prototype.unbind=Il.prototype.L;Il.prototype.unbindAll=Il.prototype.M;Il.prototype.changed=Il.prototype.l;Il.prototype.getRevision=Il.prototype.u;Il.prototype.on=Il.prototype.s;Il.prototype.once=Il.prototype.v;Il.prototype.un=Il.prototype.t;Il.prototype.unByKey=Il.prototype.A;Ml.prototype.getActive=Ml.prototype.b;Ml.prototype.setActive=Ml.prototype.d;Ml.prototype.bindTo=Ml.prototype.K;Ml.prototype.get=Ml.prototype.get;
Ml.prototype.getKeys=Ml.prototype.G;Ml.prototype.getProperties=Ml.prototype.I;Ml.prototype.set=Ml.prototype.set;Ml.prototype.setProperties=Ml.prototype.C;Ml.prototype.unbind=Ml.prototype.L;Ml.prototype.unbindAll=Ml.prototype.M;Ml.prototype.changed=Ml.prototype.l;Ml.prototype.getRevision=Ml.prototype.u;Ml.prototype.on=Ml.prototype.s;Ml.prototype.once=Ml.prototype.v;Ml.prototype.un=Ml.prototype.t;Ml.prototype.unByKey=Ml.prototype.A;Gx.prototype.getActive=Gx.prototype.b;Gx.prototype.setActive=Gx.prototype.d;
Gx.prototype.bindTo=Gx.prototype.K;Gx.prototype.get=Gx.prototype.get;Gx.prototype.getKeys=Gx.prototype.G;Gx.prototype.getProperties=Gx.prototype.I;Gx.prototype.set=Gx.prototype.set;Gx.prototype.setProperties=Gx.prototype.C;Gx.prototype.unbind=Gx.prototype.L;Gx.prototype.unbindAll=Gx.prototype.M;Gx.prototype.changed=Gx.prototype.l;Gx.prototype.getRevision=Gx.prototype.u;Gx.prototype.on=Gx.prototype.s;Gx.prototype.once=Gx.prototype.v;Gx.prototype.un=Gx.prototype.t;Gx.prototype.unByKey=Gx.prototype.A;
pk.prototype.changed=pk.prototype.l;pk.prototype.getRevision=pk.prototype.u;pk.prototype.on=pk.prototype.s;pk.prototype.once=pk.prototype.v;pk.prototype.un=pk.prototype.t;pk.prototype.unByKey=pk.prototype.A;rk.prototype.clone=rk.prototype.clone;rk.prototype.getClosestPoint=rk.prototype.f;rk.prototype.getExtent=rk.prototype.J;rk.prototype.getType=rk.prototype.O;rk.prototype.intersectsExtent=rk.prototype.ja;rk.prototype.transform=rk.prototype.transform;rk.prototype.changed=rk.prototype.l;
rk.prototype.getRevision=rk.prototype.u;rk.prototype.on=rk.prototype.s;rk.prototype.once=rk.prototype.v;rk.prototype.un=rk.prototype.t;rk.prototype.unByKey=rk.prototype.A;Km.prototype.getFirstCoordinate=Km.prototype.yb;Km.prototype.getLastCoordinate=Km.prototype.zb;Km.prototype.getLayout=Km.prototype.Ab;Km.prototype.applyTransform=Km.prototype.ra;Km.prototype.translate=Km.prototype.Ia;Km.prototype.getClosestPoint=Km.prototype.f;Km.prototype.getExtent=Km.prototype.J;Km.prototype.intersectsExtent=Km.prototype.ja;
Km.prototype.changed=Km.prototype.l;Km.prototype.getRevision=Km.prototype.u;Km.prototype.on=Km.prototype.s;Km.prototype.once=Km.prototype.v;Km.prototype.un=Km.prototype.t;Km.prototype.unByKey=Km.prototype.A;Mm.prototype.getClosestPoint=Mm.prototype.f;Mm.prototype.getExtent=Mm.prototype.J;Mm.prototype.transform=Mm.prototype.transform;Mm.prototype.changed=Mm.prototype.l;Mm.prototype.getRevision=Mm.prototype.u;Mm.prototype.on=Mm.prototype.s;Mm.prototype.once=Mm.prototype.v;Mm.prototype.un=Mm.prototype.t;
Mm.prototype.unByKey=Mm.prototype.A;Lk.prototype.getFirstCoordinate=Lk.prototype.yb;Lk.prototype.getLastCoordinate=Lk.prototype.zb;Lk.prototype.getLayout=Lk.prototype.Ab;Lk.prototype.applyTransform=Lk.prototype.ra;Lk.prototype.translate=Lk.prototype.Ia;Lk.prototype.getClosestPoint=Lk.prototype.f;Lk.prototype.getExtent=Lk.prototype.J;Lk.prototype.intersectsExtent=Lk.prototype.ja;Lk.prototype.transform=Lk.prototype.transform;Lk.prototype.changed=Lk.prototype.l;Lk.prototype.getRevision=Lk.prototype.u;
Lk.prototype.on=Lk.prototype.s;Lk.prototype.once=Lk.prototype.v;Lk.prototype.un=Lk.prototype.t;Lk.prototype.unByKey=Lk.prototype.A;Tm.prototype.getFirstCoordinate=Tm.prototype.yb;Tm.prototype.getLastCoordinate=Tm.prototype.zb;Tm.prototype.getLayout=Tm.prototype.Ab;Tm.prototype.applyTransform=Tm.prototype.ra;Tm.prototype.translate=Tm.prototype.Ia;Tm.prototype.getClosestPoint=Tm.prototype.f;Tm.prototype.getExtent=Tm.prototype.J;Tm.prototype.transform=Tm.prototype.transform;Tm.prototype.changed=Tm.prototype.l;
Tm.prototype.getRevision=Tm.prototype.u;Tm.prototype.on=Tm.prototype.s;Tm.prototype.once=Tm.prototype.v;Tm.prototype.un=Tm.prototype.t;Tm.prototype.unByKey=Tm.prototype.A;Vm.prototype.getFirstCoordinate=Vm.prototype.yb;Vm.prototype.getLastCoordinate=Vm.prototype.zb;Vm.prototype.getLayout=Vm.prototype.Ab;Vm.prototype.applyTransform=Vm.prototype.ra;Vm.prototype.translate=Vm.prototype.Ia;Vm.prototype.getClosestPoint=Vm.prototype.f;Vm.prototype.getExtent=Vm.prototype.J;Vm.prototype.transform=Vm.prototype.transform;
Vm.prototype.changed=Vm.prototype.l;Vm.prototype.getRevision=Vm.prototype.u;Vm.prototype.on=Vm.prototype.s;Vm.prototype.once=Vm.prototype.v;Vm.prototype.un=Vm.prototype.t;Vm.prototype.unByKey=Vm.prototype.A;Ym.prototype.getFirstCoordinate=Ym.prototype.yb;Ym.prototype.getLastCoordinate=Ym.prototype.zb;Ym.prototype.getLayout=Ym.prototype.Ab;Ym.prototype.applyTransform=Ym.prototype.ra;Ym.prototype.translate=Ym.prototype.Ia;Ym.prototype.getClosestPoint=Ym.prototype.f;Ym.prototype.getExtent=Ym.prototype.J;
Ym.prototype.transform=Ym.prototype.transform;Ym.prototype.changed=Ym.prototype.l;Ym.prototype.getRevision=Ym.prototype.u;Ym.prototype.on=Ym.prototype.s;Ym.prototype.once=Ym.prototype.v;Ym.prototype.un=Ym.prototype.t;Ym.prototype.unByKey=Ym.prototype.A;Zm.prototype.getFirstCoordinate=Zm.prototype.yb;Zm.prototype.getLastCoordinate=Zm.prototype.zb;Zm.prototype.getLayout=Zm.prototype.Ab;Zm.prototype.applyTransform=Zm.prototype.ra;Zm.prototype.translate=Zm.prototype.Ia;Zm.prototype.getClosestPoint=Zm.prototype.f;
Zm.prototype.getExtent=Zm.prototype.J;Zm.prototype.transform=Zm.prototype.transform;Zm.prototype.changed=Zm.prototype.l;Zm.prototype.getRevision=Zm.prototype.u;Zm.prototype.on=Zm.prototype.s;Zm.prototype.once=Zm.prototype.v;Zm.prototype.un=Zm.prototype.t;Zm.prototype.unByKey=Zm.prototype.A;Nk.prototype.getFirstCoordinate=Nk.prototype.yb;Nk.prototype.getLastCoordinate=Nk.prototype.zb;Nk.prototype.getLayout=Nk.prototype.Ab;Nk.prototype.applyTransform=Nk.prototype.ra;Nk.prototype.translate=Nk.prototype.Ia;
Nk.prototype.getClosestPoint=Nk.prototype.f;Nk.prototype.getExtent=Nk.prototype.J;Nk.prototype.transform=Nk.prototype.transform;Nk.prototype.changed=Nk.prototype.l;Nk.prototype.getRevision=Nk.prototype.u;Nk.prototype.on=Nk.prototype.s;Nk.prototype.once=Nk.prototype.v;Nk.prototype.un=Nk.prototype.t;Nk.prototype.unByKey=Nk.prototype.A;F.prototype.getFirstCoordinate=F.prototype.yb;F.prototype.getLastCoordinate=F.prototype.zb;F.prototype.getLayout=F.prototype.Ab;F.prototype.applyTransform=F.prototype.ra;
F.prototype.translate=F.prototype.Ia;F.prototype.getClosestPoint=F.prototype.f;F.prototype.getExtent=F.prototype.J;F.prototype.transform=F.prototype.transform;F.prototype.changed=F.prototype.l;F.prototype.getRevision=F.prototype.u;F.prototype.on=F.prototype.s;F.prototype.once=F.prototype.v;F.prototype.un=F.prototype.t;F.prototype.unByKey=F.prototype.A;$q.prototype.readFeatures=$q.prototype.ma;Rq.prototype.readFeatures=Rq.prototype.ma;Rq.prototype.readFeatures=Rq.prototype.ma;xp.prototype.bindTo=xp.prototype.K;
xp.prototype.get=xp.prototype.get;xp.prototype.getKeys=xp.prototype.G;xp.prototype.getProperties=xp.prototype.I;xp.prototype.set=xp.prototype.set;xp.prototype.setProperties=xp.prototype.C;xp.prototype.unbind=xp.prototype.L;xp.prototype.unbindAll=xp.prototype.M;xp.prototype.changed=xp.prototype.l;xp.prototype.getRevision=xp.prototype.u;xp.prototype.on=xp.prototype.s;xp.prototype.once=xp.prototype.v;xp.prototype.un=xp.prototype.t;xp.prototype.unByKey=xp.prototype.A;Ug.prototype.bindTo=Ug.prototype.K;
Ug.prototype.get=Ug.prototype.get;Ug.prototype.getKeys=Ug.prototype.G;Ug.prototype.getProperties=Ug.prototype.I;Ug.prototype.set=Ug.prototype.set;Ug.prototype.setProperties=Ug.prototype.C;Ug.prototype.unbind=Ug.prototype.L;Ug.prototype.unbindAll=Ug.prototype.M;Ug.prototype.changed=Ug.prototype.l;Ug.prototype.getRevision=Ug.prototype.u;Ug.prototype.on=Ug.prototype.s;Ug.prototype.once=Ug.prototype.v;Ug.prototype.un=Ug.prototype.t;Ug.prototype.unByKey=Ug.prototype.A;th.prototype.getMap=th.prototype.f;
th.prototype.setMap=th.prototype.setMap;th.prototype.setTarget=th.prototype.b;th.prototype.bindTo=th.prototype.K;th.prototype.get=th.prototype.get;th.prototype.getKeys=th.prototype.G;th.prototype.getProperties=th.prototype.I;th.prototype.set=th.prototype.set;th.prototype.setProperties=th.prototype.C;th.prototype.unbind=th.prototype.L;th.prototype.unbindAll=th.prototype.M;th.prototype.changed=th.prototype.l;th.prototype.getRevision=th.prototype.u;th.prototype.on=th.prototype.s;th.prototype.once=th.prototype.v;
th.prototype.un=th.prototype.t;th.prototype.unByKey=th.prototype.A;Eh.prototype.getMap=Eh.prototype.f;Eh.prototype.setMap=Eh.prototype.setMap;Eh.prototype.setTarget=Eh.prototype.b;Eh.prototype.bindTo=Eh.prototype.K;Eh.prototype.get=Eh.prototype.get;Eh.prototype.getKeys=Eh.prototype.G;Eh.prototype.getProperties=Eh.prototype.I;Eh.prototype.set=Eh.prototype.set;Eh.prototype.setProperties=Eh.prototype.C;Eh.prototype.unbind=Eh.prototype.L;Eh.prototype.unbindAll=Eh.prototype.M;Eh.prototype.changed=Eh.prototype.l;
Eh.prototype.getRevision=Eh.prototype.u;Eh.prototype.on=Eh.prototype.s;Eh.prototype.once=Eh.prototype.v;Eh.prototype.un=Eh.prototype.t;Eh.prototype.unByKey=Eh.prototype.A;Fh.prototype.getMap=Fh.prototype.f;Fh.prototype.setTarget=Fh.prototype.b;Fh.prototype.bindTo=Fh.prototype.K;Fh.prototype.get=Fh.prototype.get;Fh.prototype.getKeys=Fh.prototype.G;Fh.prototype.getProperties=Fh.prototype.I;Fh.prototype.set=Fh.prototype.set;Fh.prototype.setProperties=Fh.prototype.C;Fh.prototype.unbind=Fh.prototype.L;
Fh.prototype.unbindAll=Fh.prototype.M;Fh.prototype.changed=Fh.prototype.l;Fh.prototype.getRevision=Fh.prototype.u;Fh.prototype.on=Fh.prototype.s;Fh.prototype.once=Fh.prototype.v;Fh.prototype.un=Fh.prototype.t;Fh.prototype.unByKey=Fh.prototype.A;Wo.prototype.getMap=Wo.prototype.f;Wo.prototype.setTarget=Wo.prototype.b;Wo.prototype.bindTo=Wo.prototype.K;Wo.prototype.get=Wo.prototype.get;Wo.prototype.getKeys=Wo.prototype.G;Wo.prototype.getProperties=Wo.prototype.I;Wo.prototype.set=Wo.prototype.set;
Wo.prototype.setProperties=Wo.prototype.C;Wo.prototype.unbind=Wo.prototype.L;Wo.prototype.unbindAll=Wo.prototype.M;Wo.prototype.changed=Wo.prototype.l;Wo.prototype.getRevision=Wo.prototype.u;Wo.prototype.on=Wo.prototype.s;Wo.prototype.once=Wo.prototype.v;Wo.prototype.un=Wo.prototype.t;Wo.prototype.unByKey=Wo.prototype.A;wh.prototype.getMap=wh.prototype.f;wh.prototype.setMap=wh.prototype.setMap;wh.prototype.setTarget=wh.prototype.b;wh.prototype.bindTo=wh.prototype.K;wh.prototype.get=wh.prototype.get;
wh.prototype.getKeys=wh.prototype.G;wh.prototype.getProperties=wh.prototype.I;wh.prototype.set=wh.prototype.set;wh.prototype.setProperties=wh.prototype.C;wh.prototype.unbind=wh.prototype.L;wh.prototype.unbindAll=wh.prototype.M;wh.prototype.changed=wh.prototype.l;wh.prototype.getRevision=wh.prototype.u;wh.prototype.on=wh.prototype.s;wh.prototype.once=wh.prototype.v;wh.prototype.un=wh.prototype.t;wh.prototype.unByKey=wh.prototype.A;bp.prototype.getMap=bp.prototype.f;bp.prototype.setMap=bp.prototype.setMap;
bp.prototype.setTarget=bp.prototype.b;bp.prototype.bindTo=bp.prototype.K;bp.prototype.get=bp.prototype.get;bp.prototype.getKeys=bp.prototype.G;bp.prototype.getProperties=bp.prototype.I;bp.prototype.set=bp.prototype.set;bp.prototype.setProperties=bp.prototype.C;bp.prototype.unbind=bp.prototype.L;bp.prototype.unbindAll=bp.prototype.M;bp.prototype.changed=bp.prototype.l;bp.prototype.getRevision=bp.prototype.u;bp.prototype.on=bp.prototype.s;bp.prototype.once=bp.prototype.v;bp.prototype.un=bp.prototype.t;
bp.prototype.unByKey=bp.prototype.A;yh.prototype.getMap=yh.prototype.f;yh.prototype.setMap=yh.prototype.setMap;yh.prototype.setTarget=yh.prototype.b;yh.prototype.bindTo=yh.prototype.K;yh.prototype.get=yh.prototype.get;yh.prototype.getKeys=yh.prototype.G;yh.prototype.getProperties=yh.prototype.I;yh.prototype.set=yh.prototype.set;yh.prototype.setProperties=yh.prototype.C;yh.prototype.unbind=yh.prototype.L;yh.prototype.unbindAll=yh.prototype.M;yh.prototype.changed=yh.prototype.l;
yh.prototype.getRevision=yh.prototype.u;yh.prototype.on=yh.prototype.s;yh.prototype.once=yh.prototype.v;yh.prototype.un=yh.prototype.t;yh.prototype.unByKey=yh.prototype.A;qp.prototype.getMap=qp.prototype.f;qp.prototype.setTarget=qp.prototype.b;qp.prototype.bindTo=qp.prototype.K;qp.prototype.get=qp.prototype.get;qp.prototype.getKeys=qp.prototype.G;qp.prototype.getProperties=qp.prototype.I;qp.prototype.set=qp.prototype.set;qp.prototype.setProperties=qp.prototype.C;qp.prototype.unbind=qp.prototype.L;
qp.prototype.unbindAll=qp.prototype.M;qp.prototype.changed=qp.prototype.l;qp.prototype.getRevision=qp.prototype.u;qp.prototype.on=qp.prototype.s;qp.prototype.once=qp.prototype.v;qp.prototype.un=qp.prototype.t;qp.prototype.unByKey=qp.prototype.A;vp.prototype.getMap=vp.prototype.f;vp.prototype.setMap=vp.prototype.setMap;vp.prototype.setTarget=vp.prototype.b;vp.prototype.bindTo=vp.prototype.K;vp.prototype.get=vp.prototype.get;vp.prototype.getKeys=vp.prototype.G;vp.prototype.getProperties=vp.prototype.I;
vp.prototype.set=vp.prototype.set;vp.prototype.setProperties=vp.prototype.C;vp.prototype.unbind=vp.prototype.L;vp.prototype.unbindAll=vp.prototype.M;vp.prototype.changed=vp.prototype.l;vp.prototype.getRevision=vp.prototype.u;vp.prototype.on=vp.prototype.s;vp.prototype.once=vp.prototype.v;vp.prototype.un=vp.prototype.t;vp.prototype.unByKey=vp.prototype.A;
  return OPENLAYERS.ol;
}));


},{}],4:[function(require,module,exports){
var Komugi = function() {
  this.level = 1;
};

Komugi.prototype = {
  f1: function() {
    return true;
  }
};

module.exports = Komugi;

},{}]},{},[1]);
