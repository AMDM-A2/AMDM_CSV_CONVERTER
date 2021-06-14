const csv = require('csv-parser');
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db', (err) => {
    if(err) {
      return console.error(err.message);
    }
    console.log('Connecté à la base de données');
  });

var i = 1;

fs.createReadStream('data.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => {
    db.run(`INSERT INTO Gestion(identifiant,numeroLot,hour,valeur) VALUES(?,?,?,?)`, [data.id,data.numeroLot,data.hour,data.value] , function(err) {
        if(err) {
            return console.log(err.message);
        }
    });
    i++;
  });