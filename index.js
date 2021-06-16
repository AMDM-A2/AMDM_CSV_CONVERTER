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
        separator: ';'
    }))
    .on('data', (data) => {
        
        //remplissage des lots
        db.run(`INSERT OR IGNORE INTO Lots(id) VALUES(?);`, [data.numeroLot], function(err) {
            if (err) {
                return console.log(err.message);
            }
        });

        if(data.id == 'alert') {
            db.run(`INSERT INTO Alertes(numeroLot,heure,valeur) VALUES(?,?,?)`, [data.numeroLot,data.hour,data.value] , function(err) {
                if(err) {
                    return console.log(err.message);
                }
            });
        } else {

            db.run(`INSERT INTO Produits(typeProduit,numeroLot,heure,valeur) VALUES(?,?,?,?)`, [data.id,data.numeroLot,data.hour,data.value] , function(err) {
                if(err) {
                    return console.log(err.message);
                }
            });
                



            
        }


    });