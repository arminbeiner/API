'use strict'

// Overview Queries

export let selectAllCustomerwithServerInformation = "SELECT c.name,  s.FQDN, s.version, s.devices, st.server_type FROM Customers c JOIN Server s ON (c.id = s.id_customer) JOIN Server_Type st ON (st.id = s.id_server_type)";

// Detailview Queries
export let getallContactsforCustomer = "SELECT co.lastname, co.firstname, co.email, co.mobile, co.phone FROM Contacts co JOIN Customers c ON (co.id = c.id_contacts) WHERE c.name = '$1::text'";
export let getallBugsforCustomer = "SELECT bu.title, bu.description FROM Bugs bu JOIN Customers c ON (bu.id = c.id_bugs) WHERE c.name = '$1::text'";
export let getallSpecificsforCustomer = "SELECT sp.title, sp.description FROM Specifics sp JOIN Customers c ON (sp.id = c.id_specifics) WHERE c.name = '$1::text'";


// Core HTTP Queries
export let getallServerFQDN = "SELECT FQDN FROM Server";
export let getAuthforServerFQDN = "SELECT a.auth FROM authentication a JOIN Server s ON (a.id = s.id_auth) WHERE s.FQDN = '$1::text'";