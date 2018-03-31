'use strict'

import {
    selectAllCustomerwithServerInformation
} from './db-queries'

import {errorHandlingResponse} from "./errorHandler";

let db_connection = require('./pool-config')

const log = require('simple-node-logger').createSimpleFileLogger('./app/log/Database.log')

export default class Database {

    getAllCustomerswithServerInformation(response){
        db_connection.query(selectAllCustomerwithServerInformation, function(err, result) {
            errorHandlingResponse(response, result, err, log)
        })
    }
}