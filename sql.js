const sqlite3 = require('sqlite3').verbose();

//Open DB connection
let db = new sqlite3.Database('./tourney.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tourney database.');
});

var Tournament = null;
// Testing functions
addTournament("ranald");
addTournament("dammit");
addPlayer(1, "rob", "1;1");
addPlayer(1, "dob", "1;2");
addPlayer(1, "gob", "1;3");
addPlayer(1, "rob", "1;4");
getTournament(1);
console.log(Tournament);

//Close DB connection
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
  });
};

function addPlayer(tID, playerName, playerPosition){
  let sql = `INSERT INTO Players(name, wins, losses, position) VALUES(?,0,0,?)`;
  db.run(sql, [playerName, playerPosition], function(err) {
    if (err) {
      return console.log(err.message);
    }
    var pID = this.lastID;

    sql = `INSERT INTO TournamentPlayers(tid, pid) VALUES(` + tID + `, ?)`;
    db.run(sql, pID, function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
  });
}

function getTournament(tID){
  let sql =  `SELECT name FROM Tournament WHERE tID = ?`;
  db.run(sql, tID, function(err) {
    if (err) {
      return console.log(err.message);
    }
    Tournament = {"id" : tID, "players":[]};
  });

  sql = `SELECT playerID, name, wins, losses, position FROM Players JOIN TournamentPlayers ON Players.playerID = TournamentPlayers.pid where TournamentPlayers.tid = ?`;
  db.run(sql, tID, function(err) {
    if (err) {
      return console.log(err.message);
    }
    Tournament.players += {"id" : `${playerId}`, "name" : `${name}`, "wins" : `${wins}`, "losses" : `${losses}`, "position": `${position}`};
    //Create Player objects. JSON?
  });
}

function updatePlayerWin(pID){
  let sql = 'UPDATE Players SET wins = wins+1 WHERE playerID = ?';
  db.run(sql, pID, function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
}

function updatePlayerLoss(pID){
  let sql = 'UPDATE Players SET losses = losses+1 WHERE playerID = ?';
  db.run(sql, pID, function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
}

function updatePlayerPosition(pID, pos){
  let sql = 'UPDATE Players SET position = ? WHERE playerID = ?';
  db.run(sql, [pos, pID], function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
}
