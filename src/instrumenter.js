const { parse } = require( '@babel/parser' );
const { default: traverse } = require( '@babel/traverse' );
const {
	expressionStatement,
	identifier,
	stringLiteral,
	memberExpression,
	updateExpression } = require( '@babel/types' );
const { default: generate } = require( '@babel/generator' );

function createCounter( fileName ) {
	return expressionStatement(
		updateExpression( '++',
			memberExpression(
				memberExpression(
					identifier( '__coverage__' ),
					stringLiteral( fileName ),
					true
				),
				identifier( 'covered' ),
				false
			)
		)
	);
}

function instrument( code, fileName ) {
	const ast = parse( code );
	const lines = [];

	traverse( ast, {
		enter( path ) {
			const { node: { loc } } = path;

			if ( !loc || !path.parentPath || lines.includes( loc.start.line ) ) {
				return;
			}

			path.insertBefore( createCounter( fileName ) );
			lines.push( loc.start.line );
		}
	} );

	const instrumentedCode = generate( ast, {
		compact: true
	} );

	return {
		totalLines: lines.length,
		covered: 0,
		code: instrumentedCode
	};
}

module.exports = instrument;
