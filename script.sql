DROP TABLE IF EXISTS Alertes;
DROP TABLE IF EXISTS Produits;
DROP TABLE IF EXISTS TypesProduits;
DROP TABLE IF EXISTS Lots;
DROP TABLE IF EXISTS Gestion;

CREATE TABLE "Lots" (
    "id"    INTEGER,
    "description"    TEXT,
    PRIMARY KEY("id")
);

CREATE TABLE "Alertes" (
    "id"    INTEGER,
    "idLot"    INTEGER NOT NULL,
    "heure"    datetime NOT NULL,
    "description"    TEXT,
    PRIMARY KEY("id"),
    FOREIGN KEY("idLot") REFERENCES "Lots"("id")
);

CREATE TABLE "Capteurs" (
    "id"    INTEGER,
    "idLot"    INTEGER NOT NULL,
    "heure"    datetime NOT NULL,
    "libelle"    TEXT NOT NULL,
    "valeur"    INTEGER NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY("idLot") REFERENCES Lots(id)
);