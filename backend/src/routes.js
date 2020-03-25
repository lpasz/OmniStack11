const express = require( 'express' )
const ongController = require( './controllers/OngController' )
const incidentController = require( './controllers/IncidentController' )
const profileController = require( './controllers/ProfileController' )
const sessionsController = require( './controllers/SessionsController' )
const routes = express.Router()

routes.post( '/sessions' , sessionsController.login)

routes.get( '/ongs', ongController.getAll )
routes.post( '/ongs', ongController.create )

routes.post( '/incidents', incidentController.create )
routes.get( '/incidents', incidentController.getAll )
routes.delete( '/incidents/:id', incidentController.delete )

routes.get( '/profile', profileController.getAllOngCases )


module.exports = routes