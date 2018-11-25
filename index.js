const instrument = require( './src/instrumenter.js' );
const { readFileSync } = require( 'fs' );

const result = instrument( readFileSync( 'sampleProject/src/index.js', 'utf8' ), 'sampleProject/src/index.js' );

console.log( result ); // eslint-disable-line no-console
