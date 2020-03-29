const crypto = require( 'crypto' )

module.exports = function UniqueIdGen()
{
    return crypto.randomBytes( 4 ).toString( 'HEX' )
}
