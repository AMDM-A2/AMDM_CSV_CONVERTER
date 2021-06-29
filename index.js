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
    })
    .on('data', (data) => {
        
        addLot(data.numeroLot);
	    
        if(data.id == 'alert') {
            db.run(`INSERT INTO Alertes(idLot,date) VALUES(?,?)`, [data.numeroLot,data.hour] , function(err) {
                if(err) {
                    return console.log(err.message);
                }
            });
        } else {
            addCapteur(data.id);
            getIdCapteur(data.id)
            .then(function(idCapteur){
                console.log(idCapteur);
                db.run(`INSERT INTO Data(idLot,capteur,date,valeur) VALUES(?,?,?,?)`, [data.numeroLot,idCapteur,data.hour,data.value] , function(err) {
                    if(err) {
                        return console.log(err.message);
                    }
                });  
            })
            .catch(function(err){
                console.log(err);
            })
                   
        }
    }));

function addLot(lot) {
        db.run(`INSERT OR IGNORE INTO Lots(id) VALUES(?);`, [lot], function(err) {
            if(err) {
                return console.log(err.message);
            }
        });
}

function addCapteur(capteur) {
        db.run(`INSERT OR IGNORE INTO Capteurs(libelle) VALUES(?);`, [capteur], function(err) {
            if(err) {
                return console.log(err.message);
            }
        });
}



function getIdCapteur(capteur) {
    return new Promise(function(resolve, reject){
        db.get(`SELECT id FROM Capteurs WHERE libelle = ?;`, [capteur], function(err, row) {
            if(err) {
                return console.log(err.message);
            }
            if(row === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(row.id);
            }
        });
    }
  )}

