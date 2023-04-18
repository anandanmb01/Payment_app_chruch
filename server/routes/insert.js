const { response } = require("express");
const express = require("express");
const router = express.Router();
const { db } = require("../utilities/db");

router.post("/member", (req, res) => {
  console.log(req.body);
  let response = req.body;
  db.run(
    `INSERT INTO members(name,family,phone,regid,remarks) VALUES(?,?,?,?,?)`,
    [
      response.name,
      response.family,
      response.phone,
      response.reg_id,
      response.remark,
    ],
    function (error) {
      console.log(error);
    }
  );
});
router.post("/payment", (req, res) => {
  let response = req.body;
  let amount = 0;
  if (response.trans_type === "credit") {
    amount = Number(response.amount);
  } else {
    amount = -1 * Number(response.amount);
  }

  db.serialize(() => {
    db.get(
      `SELECT * FROM categories WHERE id is "${response.category}"`,
      (error, row) => {
        if (row != null) {
          // console.log(row);
          if (row.rec_type == -1) {
            db.get(
              `SELECT * FROM non_recrussive_ref WHERE sid is "${response.category}"`,
              (error, row) => {
                // console.log(row);

                db.run(
                  `INSERT INTO payments(persid,catid,catidref,amount,date,enable,remarks,billno,jf) VALUES(?,?,?,?,?,?,?,?,?)`,
                  [
                    response.id,
                    response.category,
                    row.did,
                    amount,
                    response.date,
                    1,
                    "",
                    response.billno,
                    response.jf,
                  ],
                  function (error) {
                    console.log(error);
                  }
                );
              }
            );
          } else {
            db.run(
              `INSERT INTO payments(persid,catid,catidref,amount,date,enable,remarks,billno,jf) VALUES(?,?,?,?,?,?,?,?,?)`,
              [
                response.id,
                response.category,
                response.category,
                amount,
                response.date,
                1,
                "",
                response.billno,
                response.jf,
              ],
              function (error) {
                console.log(error);
              }
            );
          }
        }
      }
    );
  });
  res.send("ok");
});

router.post("/npmpayment", (req, res) => {
  let response = req.body;
  let amount = 0;
  if (response.trans_type === "credit") {
    amount = Number(response.amount);
  } else {
    amount = -1 * Number(response.amount);
  }

  db.serialize(() => {
    db.get(
      `SELECT * FROM categories WHERE id is "${response.category}"`,
      (error, row) => {
        if (row != null) {
          // console.log(row);
          if (row.rec_type == -1) {
            db.get(
              `SELECT * FROM non_recrussive_ref WHERE sid is "${response.category}"`,
              (error, row) => {
                db.run(
                  `INSERT INTO members(name,family,remarks,npm) VALUES(?,?,?,?)`,
                  [response.name, response.family, "NPM", 1],
                  function (error) {
                    if (error) {
                      console.log(error);
                    } else {
                      db.get(
                        `SELECT * FROM members WHERE id = ?`,
                        [this.lastID],
                        function (err, row) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log(row);
                            db.run(
                              `INSERT INTO payments(persid,catid,catidref,amount,date,enable,remarks,billno,jf) VALUES(?,?,?,?,?,?,?,?,?)`,
                              [
                                row.id,
                                response.category,
                                row.did,
                                amount,
                                response.date,
                                1,
                                "",
                                response.billno,
                                response.jf,
                              ],
                              function (error) {
                                console.log(error);
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            );
          } else {
            db.run(
              `INSERT INTO members(name,family,remarks,npm) VALUES(?,?,?,?)`,
              [response.name, response.family, "NPM", 1],
              function (error) {
                if (error) {
                  console.log(error);
                } else {
                  db.get(
                    `SELECT * FROM members WHERE id = ?`,
                    [this.lastID],
                    function (err, row) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(row);
                        db.run(
                          `INSERT INTO payments(persid,catid,catidref,amount,date,enable,remarks,billno,jf) VALUES(?,?,?,?,?,?,?,?,?)`,
                          [
                            row.id,
                            response.category,
                            row.did,
                            amount,
                            response.date,
                            1,
                            "",
                            response.billno,
                            response.jf,
                          ],
                          function (error) {
                            console.log(error);
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  });
  res.send("ok");
});

module.exports = router;
