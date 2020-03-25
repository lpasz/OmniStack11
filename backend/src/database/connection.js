const knex = require( 'knex' );
const configurationKnex = require( '../../knexfile' )

const connection = knex( configurationKnex.development );

module.exports = connection;
