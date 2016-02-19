'use strict';

// MODULES //

var tape = require( 'tape' );
var ninf = require( 'const-ninf-float64' );
var pinf = require( 'const-pinf-float64' );
var flipsign = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof flipsign, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a double-precision floating-point number with the magnitude of `x` and the sign of `x*y`', function test( t ) {
	var expected;
	var actual;
	var x;
	var y;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;
	for ( i = 0; i < x.length; i++ ) {
		actual = flipsign( x[i], y[i] );
		t.equal( actual, expected[i], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if `x` is `NaN`, the function returns `NaN`', function test( t ) {
	var z;

	z = flipsign( NaN, -1 );
	t.ok( z !== z, 'returns NaN' );

	z = flipsign( NaN, 1 );
	t.ok( z !== z, 'returns NaN' );

	t.end();
});

tape( 'if `y` is `NaN`, the function could (theoretically) return either a positive or negative number', function test( t ) {
	var z;

	z = flipsign( -1, NaN );
	t.ok( z === z, 'does not return NaN' );

	z = flipsign( 1, NaN );
	t.ok( z === z, 'does not return NaN' );

	t.end();
});

tape( 'if `x` is `+infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = flipsign( pinf, -1 );
	t.equal( z, ninf, 'returns -infinity' );

	z = flipsign( pinf, 1 );
	t.equal( z, pinf, 'returns +infinity' );

	t.end();
});

tape( 'if `y` is `+infinity`, the function returns `x`', function test( t ) {
	var z;

	z = flipsign( -1, pinf );
	t.equal( z, -1, 'returns -1' );

	z = flipsign( 1, pinf );
	t.equal( z, 1, 'returns +1' );

	t.end();
});

tape( 'if `x` is `-infinity`, the function returns an infinite number', function test( t ) {
	var z;

	z = flipsign( ninf, -1 );
	t.equal( z, pinf, 'returns +infinity' );

	z = flipsign( ninf, 1 );
	t.equal( z, ninf, 'returns -infinity' );

	t.end();
});

tape( 'if `y` is `-infinity`, the function returns `-x`', function test( t ) {
	var z;

	z = flipsign( -1, ninf );
	t.equal( z, +1, 'returns +1' );

	z = flipsign( 1, ninf );
	t.equal( z, -1, 'returns -1' );

	t.end();
});

tape( 'the function supports using `+-0` to flip a sign', function test( t ) {
	var x;
	var z;

	x = 3.14;

	z = flipsign( x, 0 );
	t.equal( z, 3.14, 'returns +3.14' );

	z = flipsign( x, -0 );
	t.equal( z, -3.14, 'returns -3.14' );

	t.end();
});

tape( 'the function supports `x` being `+-0`', function test( t ) {
	var z;

	z = flipsign( -0, 1 );
	t.equal( 1/z, ninf, 'returns -0' );

	z = flipsign( -0, -1 );
	t.equal( 1/z, pinf, 'returns +0' );

	z = flipsign( 0, 1 );
	t.equal( 1/z, pinf, 'returns +0' );

	z = flipsign( 0, -1 );
	t.equal( 1/z, ninf, 'returns -0' );

	t.end();
});
