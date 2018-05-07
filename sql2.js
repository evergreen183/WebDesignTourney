const sqlite3 = require('sqlite3').verbose();
let db;


//USING ANY OF THESE FUNCTIONS REQUIRE YOU TO DO
// openDB().then( () => {function;} ).then ( () => {closeDB();});

//Open DB connection
function openDB(){
  return new Promise (function (fullfilled, reject){
    db = new sqlite3.Database('./tourney.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        reject(err.message);
        return;
      }
      fullfilled(console.log('Connected to the tourney database.'));
    });
  });
}

//var i;
//var tourn = {};


//Close DB connection
function closeDB(){
  return new Promise (function (fullfilled, reject){
    db.close((err) => {
      if (err) {
        reject(err.message);
        return;
      }
      fullfilled(console.log("Closed databased connection."))
    });
  });
}

//RETURNS ID
function addTournament() {
  return new Promise (function (fullfilled, reject){
    let sql = `INSERT INTO Tournament(data) VALUES(?)`;
    db.run(sql, "dummy", function(err) {
      if (err) {
        reject(err.message);
        return;
      }
      console.log("Tournament Added!");
      fullfilled(`${this.lastID}`);
    });
  });
}

//RETURNS OBJECT
function getTournament(tID){
  return new Promise (function (fullfilled, reject){
    let sql =  `SELECT data FROM Tournament WHERE tournID = ?`;
    db.get(sql, tID, function(err, row) {
      if (err) {
        reject(err.message);
        return;
      }
      var Tournament = {"id" : tID, "data" : row.data};
      console.log("Tournament Retrieved");
      fullfilled(Tournament);
    });
  });
}

function updateTournament(tID, tdata){
  return new Promise (function (fullfilled, reject){
    let sql = `UPDATE Tournament SET data = ? WHERE tournID = ?`;
    db.run(sql, [tdata, tID], function(err, row) {
      if (err) {
        reject(err.message);
        return;
      }
      fullfilled(console.log("Tournament Updated!"));
    });
  });
}
