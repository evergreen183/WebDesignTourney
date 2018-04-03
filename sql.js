const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./tourney.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tourney database.');
});

addTournament("ranald");
addTournament("dammit");
addPlayer(1, "rob");
addPlayer(1, "dob");
addPlayer(1, "gob");
addPlayer(1, "rob");

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});

function addTournament(tournamentName){
  let sql = `INSERT INTO Tournament(name) VALUES(?)`;
  db.run(sql, tournamentName, function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
};

function addPlayer(tID, playerName, playerPosition){
  let sql = `INSERT INTO Players(name, wins, loses, position) VALUES(` + playerName + `,0,0,` + playerPosition`)`;
  db.run(sql, playerName, function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    var pID = this.lastID;

    sql = `INSERT INTO TournamentPlayers(tid, pid) VALUES(` + tID + `, ?)`;
    db.run(sql, pID, function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  });
}
