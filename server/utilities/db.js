const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs')

dbPath=path.join(__dirname,"../database")
let db = null;

try {
    if (fs.existsSync(path.join(dbPath,'/db.db'))) {
        db = new sqlite3.Database(path.join(dbPath,'/db.db'));
    }else{
        db = new sqlite3.Database(path.join(dbPath,'/db.db'));
        db.serialize(()=>{
            db.run(`CREATE TABLE members (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                family TEXT NOT NULL,
                phone TEXT,
                regid TEXT,
                remarks TEXT 
            )`)
            db.run(`CREATE TABLE categories (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                rec_type INTEGER NOT NULL,
                enable INTEGER
            )`)
            db.run(`CREATE TABLE recrussive_ref (
                id INTEGER PRIMARY KEY,
                catid INTEGER ,
                amount INTEGER,
                duration_month INTEGER,
                trigger_date INTEGER,
                FOREIGN KEY (catid)
                REFERENCES categories (id) 
            )`)
            db.run(`CREATE TABLE non_recrussive_ref (
                id INTEGER PRIMARY KEY,
                sid INTEGER ,
                did INTEGER,
                FOREIGN KEY (sid)
                REFERENCES categories (id),
                FOREIGN KEY (did)
                REFERENCES categories (id)
            )`)
            db.run(`CREATE TABLE payment_lookup (
                id INTEGER PRIMARY KEY,
                persid INTEGER ,
                catid INTEGER,
                date DATE,
                FOREIGN KEY (persid)
                REFERENCES members (id)
            )`)
            db.run(`CREATE TABLE payments (
                id INTEGER PRIMARY KEY,
                persid INTEGER ,
                catid INTEGER,
                catidref INTEGER,
                amount INTEGER,
                date DATE,
                enable INTEGER,
                remarks TEXT,
                FOREIGN KEY (persid)
                REFERENCES members (id),
                FOREIGN KEY (catid)
                REFERENCES categories (id),
                FOREIGN KEY (catidref)
                REFERENCES categories (id)
            )`)
        })
    }
  } catch(err) {
    console.error(err)
  }




// db.get('select * from payments',(e,d)=>{

//     console.log(d);
    
// })

// db.run('INSERT INTO categories (name,rec_type,enable) VALUES(abc,1,1)')


module.exports.db=db
// exports.db={db,get}