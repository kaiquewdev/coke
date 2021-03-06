/**
 * Module dependencies.
 * @private
 */
var yaml = require( 'js-yaml' );
var fs   = require( 'fs' );

var source = fs.readFileSync( CONF_DIR + NODE_ENV + '/config.yml', 'utf8' );
var libs   = yaml.load( source ).libs;

module.exports = function ( app, callback ){
  if( libs.length > 0 ){
    libs.forEach( function ( file ){
      LOG.sys( 'Loading lib: ' + file.replace( '.js', '' ));
      require( LIB_DIR + file ).init( app );
    });

    LOG.sys( 'All libs loaded' );
  }

  callback( app );
};
