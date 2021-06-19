DROP TABLE IF EXISTS Alertes;
DROP TABLE IF EXISTS Capteurs;
DROP TABLE IF EXISTS Lots;
DROP TABLE IF EXISTS Data;

CREATE TABLE "Lots" (
    "id"    INTEGER,
    "description"    TEXT,
    PRIMARY KEY("id")
);

CREATE TABLE "Alertes" (
    "id"    INTEGER,
    "idLot"    INTEGER NOT NULL,
    "date"    DATETIME NOT NULL,
    "description"    TEXT,
    PRIMARY KEY("id"),
    FOREIGN KEY("idLot") REFERENCES "Lots"("id")
);

CREATE TABLE "Capteurs" (
    "id"    INTEGER,
    "libelle"    TEXT NOT NULL,
    "description"    TEXT,
    PRIMARY KEY("id")
);

CREATE TABLE "Data" (
    "id"    INTEGER,
    "idLot"    INTEGER NOT NULL,
	"capteur"    INTEGER NOT NULL,
    "date"    DATETIME NOT NULL,
    "valeur"    INTEGER NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY("idLot") REFERENCES Lots(id),
	FOREIGN KEY("capteur") REFERENCES Capteurs(id)
);