const connection = require( '../database/connection' )

module.exports = {

    async login( req, res )
    {
        const { id } = req.body

        const ongName = await connection( 'ongs' ).where( 'id', id ).select( 'name' ).first()

        if ( !ongName )
        {
            return res.status( 400 ).json( { error: 'No ONG found with this ID' } )
        }

        return res.json(ongName)
    }
}