'use strict';

// MODULES //

var toWords = require( 'math-float64-to-words' );
var getHighWord = require( 'math-float64-get-high-word' );
var fromWords = require( 'math-float64-from-words' ); 


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000;


// FLIPSIGN //

/**
* FUNCTION: flipsign( x, y )
*	Returns a double-precision floating-point number with the magnitude of `x` and the sign of `x*y`.
*
* @param {Number} x - number from which to derive a magnitude
* @param {Number} y - number from which to derive a sign
* @returns {Number} a double-precision floating-point number
*/
function flipsign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	x = toWords( x );
	hx = x[ 0 ];

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on (if on):
	hy &= SIGN_MASK;

	// Flip the sign bit of `x` only when the sign bit of `y` is on:
	hx ^= hy; // 1^1=0 (flipped), 0^1=1 (flipped), 1^0=1 (unchanged), 0^0=0 (unchanged)

	// Return a new value having the same magnitude as `x`, but with the sign of `x*y`:
	return fromWords( hx, x[ 1 ] );
} // end FUNCTION flipsign()


// EXPORTS //

module.exports = flipsign;
