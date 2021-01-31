#!/usr/bin/env node

const { resolve: resolvePath } = require( 'path' );
const addHook = require( './src/hook' );
const instrument = require( './src/instrumenter' );
const report = require( './src/reporter' );

global.__coverage__ = {};

addHook( instrument );

const entryPath = resolvePath( process.cwd(), process.argv[ 2 ] );

require( entryPath );

report( global.__coverage__ );
