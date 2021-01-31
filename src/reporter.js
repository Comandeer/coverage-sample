module.exports = ( coverageData ) => {
	const { all, covered } = Object.entries( coverageData ).reduce( ( data, [ , { functions } ] ) => {
		data.all += functions.length;
		data.covered += functions.reduce( ( covered, func ) => {
			return covered + func;
		}, 0 );

		return data;
	}, { all: 0, covered: 0 } );

	console.log( `All functions: ${ all }
Covered functions: ${ covered }
Coverage: ${ Math.round( covered / all * 100 ) }%` );
};
