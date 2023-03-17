const express = require('express')
const router = express.Router()
const {db} = require('../utilities/db')


router.post('/category/non_recrussive_main', (req, res) => {
  const res_=req.body
  if (res_.name != null){
    db.get(`SELECT * FROM categories WHERE name is "${res_.name}"`, (error, row) => {
      if (row != null){
        res.send("category name already exist")
      }else{
        db.run(`INSERT INTO categories(name,rec_type,enable) VALUES(?,?,?)`, 
            [res_.name,0,1],
            function(error){
                console.log(error);
            }
        );
        res.send("new category created")
      }
  });
  }
})

router.post("/category/recrussive", (req, res) => {
  const res_ = req.body;
  if (res_.name != null) {
    db.get(
      `SELECT * FROM categories WHERE name is "${res_.name}"`,
      (error, row) => {
        // console.log(row);
        if (row != null) {
          res.send("category name already exist");
        } else {
          db.serialize(() => {
            db.run(
              `INSERT INTO categories(name,rec_type,enable) VALUES(?,?,?)`,
              [res_.name, 1, 1],
              function (error) {
                console.log(error);
              }
            );

            db.all(
              `SELECT * FROM categories WHERE name is "${res_.name}"`,
              (error, row) => {
                // console.log(row);
                id = row[0].id;
                db.run(
                  `INSERT INTO recrussive_ref(catid,amount,duration_month,trigger_date) VALUES(?,?,?,?)`,
                  [id, res_.amount, res_.month, res_.date],
                  function (error) {
                    if (error) {
                      console.log(error);
                    }
                  }
                );
              }
            );
            res.send("new category created");
          });
        }
      }
    );
  }
});

router.post('/category/non_recrussive_join', (req, res) => {
  const res_=req.body
  if (res_.name != null){
    db.get(`SELECT * FROM categories WHERE name is "${res_.name}"`, (error, row) => {
      if (row != null){
        res.send("category name already exist")
      }else{
        db.serialize(() => {
          db.run(
            `INSERT INTO categories(name,rec_type,enable) VALUES(?,?,?)`,
            [res_.name, -1, 1],
            function (error) {
              console.log(error);
            }
          );

          db.all(
            `SELECT * FROM categories WHERE name is "${res_.name}"`,
            (error, row) => {
              // console.log(row);
              sid = row[0].id;

              db.all(
                `SELECT * FROM categories WHERE name is "${res_.category}"`,
                (error, row_) => {
                  // console.log(row);
                  did = row_[0].id;

                  db.run(
                    `INSERT INTO non_recrussive_ref(sid,did) VALUES(?,?)`,
                    [sid,did],
                    function (error) {
                      if (error) {
                        console.log(error);
                      }
                    }
                  );
                  res.send("new category created");
                })



            }
          );
          
        });
      }
  });
  }
})


module.exports = router