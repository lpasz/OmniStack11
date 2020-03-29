const express = require( 'express' )
const ongController = require( './controllers/OngController' )
const incidentController = require( './controllers/IncidentController' )
const profileController = require( './controllers/ProfileController' )
const sessionsController = require( './controllers/SessionsController' )
const routes = express.Router()

const { celebrate, Joi, Segments } = require( 'celebrate' )

routes.post( '/sessions', sessionsController.login )

routes.get( '/ongs', ongController.getAll )

routes.post( '/ongs', celebrate( {
    [ Segments.BODY ]: Joi.object().keys( {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().min(10).max(11).required(),
        city: Joi.string().required(),
        uf: Joi.string().length( 2 )
    } )
} ), ongController.create )

routes.post( '/incidents', celebrate( {
    [ Segments.HEADERS ]: Joi.object( {
        ong_id: Joi.string().required()
    } ).unknown()
} ),celebrate( {
    [ Segments.BODY ]: Joi.object().keys( {
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    } )
} ), incidentController.create )

routes.get( '/incidents', incidentController.getAll )
routes.delete( '/incidents/:id', celebrate( {
    [ Segments.PARAMS ]: Joi.object().keys( {
        id: Joi.number().required()
    } )
} ), incidentController.delete )

routes.get( '/profile', celebrate( {
    [ Segments.QUERY ]: Joi.object().keys( {
        page: Joi.number()
    } )
} ), profileController.getAllOngCases )


module.exports = routes