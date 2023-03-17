const sqlite3 = require('sqlite3');
const path = require('path');

dbPath=path.join(__dirname,"../database")
const db = new sqlite3.Database(path.join(dbPath,'/db.db'));

// db.get('select * from payments',(e,d)=>{

//     console.log(d);
    
// })

// db.run('INSERT INTO categories (name,rec_type,enable) VALUES(abc,1,1)')


module.exports.db=db
// exports.db={db,get}