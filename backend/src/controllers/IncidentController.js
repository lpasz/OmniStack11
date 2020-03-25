const connection = require( '../database/connection' )

module.exports = {
    async create( req, res )
    {
        const { title, description, value } = req.body
        const { ong_id } = req.headers

        const [ id ] = await connection( 'incidents' ).insert( {
            title, description, value, ong_id
        } )

        res.json( { id, title, description, value, ong_id } )
    },
    async getAll( req, res )
    {
        if ( true )
        {
            const { page = 1 } = req.query
            const [ count ] = await connection( 'incidents' ).count()
            const incidents = await connection( 'incidents' )
                .join( 'ongs', 'ongs.id', '=', 'incidents.ong_id' )
                .limit( 5 )
                .offset( ( page - 1 ) * 5 )
                .select(
                    'incidents.*',
                    'ongs.name',
                    "ongs.email",
                    "ongs.whatsapp",
                    "ongs.city",
                    "ongs.uf",
                )

            res.header( 'TotalNumberOfCases', count[ 'count(*)' ] )
            return res.json( incidents )
        }
        else
        {
            const incidents = await connection( 'incidents' )
            .join( 'ongs', 'ongs.id', '=', 'incidents.ong_id' )
            .select(
                'incidents.*',
                'ongs.name',
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf",
            )
            res.header( 'TotalNumberOfCases', incidents.length )
            return res.json( incidents )
        }

    },
    async delete( req, res )
    {
        const { id } = req.params
        const { ong_id } = req.headers
        const incident = await connection( 'incidents' )
            .where( 'id', id )
            .select( 'ong_id' ).first();

        if ( incident.ong_id !== ong_id )
        {
            return res.status( 401 ).json( { error: "Operation not allowed" } )
        }

        await connection( 'incidents' )
            .where( 'id', id )
            .delete();

        return res.status( 204 ).send()
    }
}

