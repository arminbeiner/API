'use strict'

// Overview Queries

export let selectAllCustomerwithServerInformation = 'SELECT c.name,  s.FQDN, s.version, s.devices, st.server_type FROM Customers c JOIN Server s ON (c.id = s.id_customer) JOIN Server_Type st ON (st.id = s.id_server_type)';


// Detailview Queries
