const {
    UV_FS_O_FILEMAP
} = require('constants');
const csv = require('csv-parser');
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connecté à la base de données');
});

for (let i = 1; i < 1000; i++) {

    var nbProduits = getRandomInt(100);
    addLot(i);
    for (let j = 1; j < nbProduits; j++) {
        if (Math.random() > 0.9) {
            addAlerte(i);
        } else {
            addData(i);
        }
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addLot(lot) {
    db.run(`INSERT OR IGNORE INTO Lots(id) VALUES(?);`, [lot], function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
}

function addAlerte(i) {
    db.run(`INSERT INTO Alertes(idLot,date) VALUES(?,?)`, [i, randomDate(new Date(2020, 0, 1), new Date())], function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
}

function addData(i) {
    db.run(`INSERT INTO Data(idLot,capteur,date,valeur) VALUES(?,?,?,?)`, [i, getRandomInt(4)+1,randomDate(new Date(2020, 0, 1), new Date()), getRandomInt(100)], function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
}

function randomDate(start, end) {
    tmp = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
    date = tmp.slice(0,10);
    time = tmp.slice(11,19);
    return date + ' ' + time;
}
