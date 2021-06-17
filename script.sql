DROP TABLE IF EXISTS Alertes;
DROP TABLE IF EXISTS Produits;
DROP TABLE IF EXISTS TypesProduits;
DROP TABLE IF EXISTS Lots;

CREATE TABLE "Alertes" (
    "id"    INTEGER,
    "numeroLot"    INTEGER NOT NULL,
    "heure"    datetime NOT NULL,
    "valeur"    INTEGER,
    PRIMARY KEY("id"),
    FOREIGN KEY("numeroLot") REFERENCES "Lots"("id")
);

CREATE TABLE "Lots" (
    "id"    INTEGER,
    "description"    TEXT,
    PRIMARY KEY("id")
);

CREATE TABLE "Produits" (
    "id"    INTEGER,
    "typeProduit"    INTEGER NOT NULL,
    "numeroLot"    INTEGER NOT NULL,
    "heure"    datetime NOT NULL,
    "valeur"    INTEGER NOT NULL,
    FOREIGN KEY("numeroLot") REFERENCES Lots(id),
    PRIMARY KEY("id")
);