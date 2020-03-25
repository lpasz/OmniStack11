const connection = require( '../database/connection' )

module.exports = {
    async getAllOngCases( req, res )
    {
        const {ong_id} = req.headers
        const incidents = await connection( 'incidents' ).where('ong_id',ong_id).select('*')
        return res.json( incidents )
    }
}