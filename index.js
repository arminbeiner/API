'use strict'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

let app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

let router = express.Router()

router.use(function(req, res, next){
    next()
})

router.route('/user/:name/:pass')
    .get(function (req, res, err){
        data.getUserfromDB(req.params, res)
        if(err) {
            log.error(err.message)
        }
        else {
            log.info('User has been requested')
        }
    })