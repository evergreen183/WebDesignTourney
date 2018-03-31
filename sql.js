const sqlite3 = require('sqlite3').verbose();

//Open db connection
let db = new sqlite3.Database('./tourney.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tourney database.');
});

db.run(`INSERT INTO Players(playerID, name) VALUES(5, 'b')`, [], function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

//Close db connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});
