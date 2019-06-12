// Require the lib, get a working terminal
var term = require( 'terminal-kit' ).terminal ;
 
// The term() function simply output a string to stdout, using current style
// output "Hello world!" in default terminal's colors
term( 'Hello world!\n' ) ;
term.bold('bold\n') ;
term.moveTo( 1 , 1 ) ;