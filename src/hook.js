const { addHook } = require( 'pirates' );

module.exports = ( instrument ) => {
	addHook( ( code, path ) => {
		if ( path.includes( '/tests/' ) ) {
			return code;
		}

		const instrumentedCode = instrument( code, path );

		return instrumentedCode;
	}, { exts: [ '.js' ] } );
};
