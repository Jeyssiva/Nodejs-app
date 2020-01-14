
const express = require('express')
const routes = express.Router()
const BaseController = require('../controllers/baseController')


routes.get('/' , BaseController.login)

routes.get('/signup' , BaseController.signup)

routes.post('/saveSignup' , BaseController.saveSignup)

routes.post('/checkLogin' , BaseController.checkLogin)

routes.get('/profile' , BaseController.profile)

routes.post('/iconUpload' , BaseController.iconUpload)

module.exports = routes