const request = require( 'supertest' )
const app = require( '../../src/app' )
const connection = require( '../../src/database/connection' )

describe( 'ONG', () =>
{
    beforeEach( async () =>
    {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    } )
    it( 'should be able to create a new ONG', async () =>
    {
        const response = await request( app )
            .post( '/ongs' )
            .send(
                {
                    name: "Devolve",
                    email: "devolve@gmail.com",
                    whatsapp: "51982179189",
                    city: "Gravataí",
                    uf: "RS"
                }
            )

        console.log(response.body)
        expect( response.body ).toHaveProperty( 'id' )
        expect( response.body.id ).toHaveLength( 8 )
    } )

    afterAll( () =>
    {
        connection.destroy()
    } )
} ) 