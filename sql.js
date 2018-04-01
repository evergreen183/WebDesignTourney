const sqlite3 = require('sqlite3').verbose();

//Open db connection
function openDB(){
  let db = new sqlite3.Database('./tourney.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the tourney database.');
  });
}

//Close db connection
function closeDB(){
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
}

function addPlayer(pID, pname){
  openDB();
  let sql = `INSERT INTO Players(playerID, name) VALUES(` + pID + ', ?)';
  db.run(sql, pname, function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  closeDB();
};

function addTournament(tID, tname){
  openDB();
  let sql = `INSERT INTO Tournament(tournID, name) VALUES(` + tID + ', ?)';
  db.run(sql, tname, function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  closeDB();
}

function addMatch(tID, mID, pOneID, pTwoID){
  openDB();
  let sql = `INSERT INTO Matches(matchID, playerOne, playerTwo) VALUES(?,?,?)`;
  db.run(sql, [mID, pOneID, pTwoID], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

  sql = `INSERT INTO TournamentMatches(tournID, matchID) VALUES(?,?)`;
  db.run(sql, [tID, mID], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  closeDB();
}

function addWinner(mID, pID){
  openDB();
  let sql = `INSERT INTO MatchWinner(matchID, winner) VALUES(?,?)`;
  db.run(sql, [mID, pID], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  closeDB();
}
