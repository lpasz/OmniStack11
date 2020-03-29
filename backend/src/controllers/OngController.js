const connection = require( '../database/connection' )

const UniqueIdGen = require ('../utils/generateUniqueId')

module.exports = {
    async create( req, res )
    {
        const { name, email, whatsapp, city, uf } = req.body
        const id = UniqueIdGen()

        const data = {
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        }
        console.log( data )
        await connection( 'ongs' ).insert( data )

        return res.json( { id } )
    },
    async getAll( req, res ) 
    {
        const ongs = await connection( 'ongs' ).select( '*' );
        res.json( ongs )
    }
}