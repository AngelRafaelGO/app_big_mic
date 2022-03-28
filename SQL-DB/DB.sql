
CREATE TABLE materiel (
	nummateriel INT AUTO_INCREMENT PRIMARY KEY,
	nommateriel VARCHAR(255),
	descmateriel VARCHAR(255));

CREATE TABLE photos (
	numphoto INT AUTO_INCREMENT PRIMARY KEY,
	fichierphoto LONGBLOB,);

CREATE TABLE compte (
	numcompte INT AUTO_INCREMENT PRIMARY KEY,
	ville VARCHAR(255),
	pseudo VARCHAR(255),
    motdepasse VARCHAR(255),
	tel VARCHAR(255),
	mail VARCHAR(255),
	prenom VARCHAR(255),
	nom VARCHAR(255),
	numphoto INT,
FOREIGN KEY(numphoto) REFERENCES photos(numphoto));

CREATE TABLE lieux (
	numlieu INT AUTO_INCREMENT PRIMARY KEY,
	numcompte INT,
	nomlieu VARCHAR(255),
	desclieu VARCHAR(255),
	lienlieu VARCHAR(255),
	contraintelieu VARCHAR(255),
	adrlieu VARCHAR(255),
	nummateriel INT,
FOREIGN KEY(numcompte) REFERENCES compte(numcompte),
FOREIGN KEY(nummateriel) REFERENCES materiel(nummateriel));

CREATE TABLE galerielieux(
	numlieu INT AUTO_INCREMENT PRIMARY KEY,
	numphoto INT,
FOREIGN KEY(numlieu) REFERENCES lieux(numlieu),
FOREIGN KEY(numphoto) REFERENCES photos(numphoto));

CREATE TABLE prestations (
	numprest INT AUTO_INCREMENT PRIMARY KEY,
	numcompte INT,
	titreprest VARCHAR(255),
	descprest VARCHAR(255),
	lienprest VARCHAR(255),
	numphoto INT,
FOREIGN KEY(numcompte) REFERENCES compte(numcompte),
FOREIGN KEY(numphoto) REFERENCES photos(numphoto));

CREATE TABLE scenes (
	numscene INT AUTO_INCREMENT PRIMARY KEY,
	numcompte INT,
	titrescene VARCHAR(255),
	datescene VARCHAR(255),
	numphoto INT,
	criteres VARCHAR(255),
	recurrence VARCHAR(255),
	adrscene VARCHAR(255),
	descscene VARCHAR(255),
FOREIGN KEY(numcompte) REFERENCES compte(numcompte),
FOREIGN KEY(numphoto) REFERENCES photos(numphoto));

CREATE TABLE roles (
	numrole INT AUTO_INCREMENT PRIMARY KEY,
	nomrole VARCHAR(255));

CREATE TABLE Rolecompte (
	numcompte INT,
	numrole INT,
PRIMARY KEY(numcompte, numrole),
FOREIGN KEY(numcompte) REFERENCES compte(numcompte),
FOREIGN KEY(numrole) REFERENCES roles(numrole));

CREATE TABLE participants (
	numcompte INT,
	numscene INT,
PRIMARY KEY(numcompte, numscene),
FOREIGN KEY(numcompte) REFERENCES compte(numcompte),
FOREIGN KEY(numscene) REFERENCES scenes(numscene));

CREATE TABLE tags (
	numtag INT AUTO_INCREMENT PRIMARY KEY,
	nomtag VARCHAR(255));

CREATE TABLE tagscene (
	numtag INT,
	numscene INT,
PRIMARY KEY(numtag, numscene),
FOREIGN KEY(numtag) REFERENCES tags(numtag),
FOREIGN KEY(numscene) REFERENCES scenes(numscene));

CREATE TABLE taglieu (
	numtag INT,
	numlieu INT,
PRIMARY KEY(numtag, numlieu),
FOREIGN KEY(numtag) REFERENCES tags(numtag),
FOREIGN KEY(numlieu) REFERENCES lieux(numlieu));

CREATE TABLE tagprestation (
	numtag INT,
	numprest INT,
PRIMARY KEY(numtag, numprest),
FOREIGN KEY(numtag) REFERENCES tags(numtag),
FOREIGN KEY(numprest) REFERENCES prestations(numprest));
