'use strict'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import {getVersionfromCore} from './app/Core/getCoreData'

import Database from './app/Database/db-requests'


let app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

const data = new Database()
const log = require('simple-node-logger').createSimpleFileLogger('./app/log/API.log')

let router = express.Router()

router.use(function(req, res, next){
    next()
})

/*router.route('/user/:name/:pass')
    .get(function (req, res, err){
        data.getUserfromDB(req.params, res)
        if(err) {
            log.error(err.message)
        }
        else {
            log.info('User has been requested')
        }
    })*/

router.route('/overview')
    .get(function (req, res, err){
        data.getAllCustomerswithServerInformation(res)
        if(err){
            log.error(err.message)
        }
        else{
            log.info('Data for overview successfully loaded')
        }
    })

router.route('/fqdn')
    .get(function (req, res, err) {
      data.getAllFQDNfromServer(res)
        if(err){
          log.error(err.message)
        }
        else{
          log.info('All FQDN successfully returned')
        }
    })

router.route('/test')
    .get(function (req, res, err) {
        getVersionfromCore()
        if(err){
            log.error(err.message)
        }
        else{
            log.info('Test whut')
        }
    })


app.use('/', router)

app.use(function(err){
    log.error('Error while Request', err.stack, err.message)
    delete err.stack
})

app.listen(3000, function () {
    console.log('ExpressDB listening on port 3000!')
})

module.exports = app