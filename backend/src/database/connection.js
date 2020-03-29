const knex = require( 'knex' );
const configurationKnex = require( '../../knexfile' )
const environment = process.env.NODE_ENV



const connection = knex( ( environment === 'test' )
    ? configurationKnex.test 
    : configurationKnex.development)


module.exports = connection;
