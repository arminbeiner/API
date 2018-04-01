'use strict'

import {
    selectAllCustomerwithServerInformation,
    getallServerFQDN,
    getAuthforServerFQDN
} from './db-queries'

import {errorHandlingResponse} from "../errorHandler";

let db_connection = require('./pool-config')

const log = require('simple-node-logger').createSimpleFileLogger('./app/log/Database.log')

export default class Database {

    getAllCustomerswithServerInformation(response){
        db_connection.query(selectAllCustomerwithServerInformation, function(err, result) {
            errorHandlingResponse(response, result, err, log)
        })
    }

    getAllFQDNfromServer(response){
        db_connection.query(getallServerFQDN, function(err, result) {
            if(err){
                console.log(err.message)
            }
            else{
                response.json(result.rows);
                //console.log(result.rows)
                //errorHandlingResponse(response, result, err, log)
            }
        })
    }

    getAuthforServer(params, response){
        db_connection.query(getAuthforServerFQDN, [params.name], (err, result) => {
            errorHandlingResponse(response, result, err, log)
        } )
    }

}