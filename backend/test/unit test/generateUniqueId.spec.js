const UniqueIdGen = require( '../../src/utils/generateUniqueId' )

describe( 'Generate Unique ID', () =>
{
    it( 'should generate an unique ID', () =>
    {
        const id = UniqueIdGen()
        expect( id )
    } )
} )