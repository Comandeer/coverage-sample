const {
	expressionStatement,
	identifier,
	stringLiteral,
	numericLiteral,
	memberExpression,
	updateExpression } = require( '@babel/types' );

const { transformSync } = require( '@babel/core' );

function instrument( code, filePath ) {
	const functions = [];

	const instrumentedCode = transformSync( code, {
		plugins: [
			function codeCoverage() {
				return {
					visitor: {
						FunctionDeclaration( path ) {
							const counter = createCounter( filePath, functions.length );

							path.get( 'body' ).unshiftContainer( 'body', counter );
							functions.push( 0 );
						}
					}
				};
			}
		]
	} );

	global.__coverage__[ filePath ] = {
		functions
	};

	return instrumentedCode.code;
}

function createCounter( fileName, index ) {
	return expressionStatement(
		updateExpression( '++',
			memberExpression(
				memberExpression(
					memberExpression(
						memberExpression(
							identifier( 'global' ),
							identifier( '__coverage__' ),
							false
						),
						stringLiteral( fileName ),
						true
					),
					identifier( 'functions' ),
					false
				),
				numericLiteral( index ),
				true
			)
		)
	);
}

module.exports = instrument;
