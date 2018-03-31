CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS Customers, Server, Server_Type, Contacts, Authentication, Bugs, Specifics, Users;

CREATE TABLE Customers (
id SERIAL PRIMARY KEY,
name VARCHAR(200) NOT NULL UNIQUE,
id_contacts int NOT NULL,
id_bugs int,
id_specifics int
);

CREATE TABLE Server (
id SERIAL PRIMARY KEY,
FQDN VARCHAR(100) NOT NULL UNIQUE,
DMZ_IN_IP VARCHAR(15) NOT NULL UNIQUE,
DMZ_OUT_IP VARCHAR(15) NOT NULL UNIQUE,
MGMT_IP VARCHAR(15) NOT NULL UNIQUE,
version VARCHAR(15),
devices INT,
id_server_type int NOT NULL,
id_customer int NOT NULL,
id_auth int NOT NULL
);

CREATE TABLE Server_Type(
id SERIAL PRIMARY KEY,
server_type VARCHAR(10) NOT NULL
);

CREATE TABLE Contacts (
id SERIAL PRIMARY KEY,
lastname VARCHAR(50) NOT NULL,
firstname VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
mobile VARCHAR(25) UNIQUE,
phone VARCHAR(25) UNIQUE
);

CREATE TABLE Authentication (
id SERIAL PRIMARY KEY,
auth VARCHAR(500) NOT NULL
);

CREATE TABLE Bugs (
id SERIAL PRIMARY KEY,
title VARCHAR(300) NOT NULL,
description VARCHAR(1000) NOT NULL
);

CREATE TABLE Specifics (
id SERIAL PRIMARY KEY,
title VARCHAR(300) NOT NULL,
description VARCHAR(1000) NOT NULL
);

CREATE TABLE Users (
id SERIAL PRIMARY KEY,
username VARCHAR(30) NOT NULL,
password text NOT NULL
);

ALTER TABLE Customers ADD FOREIGN KEY (id_contacts) REFERENCES Contacts(id);
ALTER TABLE Customers ADD FOREIGN KEY (id_bugs) REFERENCES Bugs(id);
ALTER TABLE Customers ADD FOREIGN KEY (id_specifics) REFERENCES Specifics(id);
ALTER TABLE Server ADD FOREIGN KEY (id_server_type) REFERENCES Server_Type(id);
ALTER TABLE Server ADD FOREIGN KEY (id_auth) REFERENCES Authentication(id);
ALTER TABLE Server ADD FOREIGN KEY (id_customer) REFERENCES Customers(id);


INSERT INTO users (username, password) VALUES ('armin.beiner', crypt('Welcome01', gen_salt('bf', 8)));
INSERT INTO users (username, password) VALUES ('test.user', crypt('Test123', gen_salt('bf', 8)));
INSERT INTO Bugs (title, description) VALUES ('Anmeldung Admin Portal nach SSL Cert Umstellung', 'Nach SSL Cert Umstellung ist keine gültige Anmeldemöglichkeit mehr aktiv für das Admin Portal. SSL Certs müssen neu hochgeladen werden oder Snapshot wiederherstellen.');
INSERT INTO Bugs (title, description) VALUES ('Force Device Check-In lässt Tomcat abstürzen', 'Zuviele Tasks im Scheduler des Core Server, Cleanup nötig im System Manager');
INSERT INTO Specifics (title, description) VALUES ('Kunde wünscht monatlichen Report', 'Kunde möchte monatlich einen Report über alle Active Devices');
INSERT INTO Specifics (title, description) VALUES ('Kunde verwendet Office365 mit Traffic über Sentry', 'Die IP Ranges für Office365 müssen jeweils auf der Firewall zusätzlich freigegeben werden');
INSERT INTO Server_Type (server_type) VALUES ('Core');
INSERT INTO Server_Type (server_type) VALUES ('Sentry');
INSERT INTO Authentication (auth) VALUES ('bWlBZG1pbjptb2JpbGVpcm9uMTIz');
INSERT INTO Contacts (lastname, firstname, email, mobile) VALUES ('Beiner', 'Armin', 'armin.beiner@hotmail.com', '+41795400123');
INSERT INTO Customers (name, id_contacts) VALUES ('Labor TEC-OWS', 1);
INSERT INTO Server (FQDN, DMZ_IN_IP, DMZ_OUT_IP, MGMT_IP, id_server_type, id_customer, id_auth) VALUES ('vsp02.cbu.mdm-mobile.ch', '10.100.110.20', '10.100.111.20', '10.100.100.10', 1, 1, 1);
INSERT INTO Server (FQDN, DMZ_IN_IP, DMZ_OUT_IP, MGMT_IP, id_server_type, id_customer, id_auth) VALUES ('vsp03.cbu.mdm-mobile.ch', '10.100.110.21', '10.100.111.21', '10.100.100.11', 1, 1, 1);


