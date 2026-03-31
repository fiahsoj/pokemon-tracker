import sqlite3 from "sqlite3"

const db = new sqlite3.Database("./pokemon.db", (err) => {
  if (err) {
    console.error("Database error:", err.message)
  } else {
    console.log("Connected to SQLite database")
  }
})

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY,
      name TEXT,
      setId INTEGER
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS collections (
      userId INTEGER,
      cardId INTEGER
    )
  `)

})

export default db