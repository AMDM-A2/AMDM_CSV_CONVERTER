const { UV_FS_O_FILEMAP } = require('constants');
const csv = require('csv-parser');
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connecté à la base de données');
});

fs.createReadStream('data.csv')
    .pipe(csv({
        separator: ','
    }))
    .on('data', (data) => {
        
        ajouterLot(data.numeroLot);

        if(data.id == 'alert') {
            db.run(`INSERT INTO Alertes(idLot,heure) VALUES(?,?)`, [data.numeroLot,data.hour] , function(err) {
                if(err) {
                    return console.log(err.message);
                }
            });
        } else {

            db.run(`INSERT INTO Capteurs(libelle,idLot,heure,valeur) VALUES(?,?,?,?)`, [data.id,data.numeroLot,data.hour,data.value] , function(err) {
                if(err) {
                    return console.log(err.message);
                }
            });
                
        }


    });

function ajouterLot(lot) {
        db.run(`INSERT OR IGNORE INTO Lots(id) VALUES(?);`, [lot], function(err) {
            if (err) {
                return console.log(err.message);
            }
        });
}