'use strict'

import fetch from 'node-fetch'
import Database from '../Database/db-requests'

const data = new Database();
//const log = require('simple-node-logger').createSimpleFileLogger('./app/log/Core.log')

const server = "https://vsp03.cbu.mdm-mobile.ch/api/v2/ping"

export function getVersionfromCore() {
    fetch(server, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Basic bWlBZG1pbjptb2JpbGVpcm9uMTIz'
                        }
    })
        .then(response => response.json())
        .then(json => { return json })

}



