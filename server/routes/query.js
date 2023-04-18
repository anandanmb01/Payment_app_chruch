const express = require("express");
const router = express.Router();
const { db } = require("../utilities/db");

router.post("/category/getall_non_recrussive_main", (req, res) => {
  db.all(`SELECT id,name FROM categories WHERE rec_type is 0`, (error, row) => {
    res.json(row);
  });
});

router.post("/getmembers", (req, res) => {
  db.all(`SELECT id,name, family,npm FROM members`, (error, row) => {
    if (error) {
      res.status(400);
    } else {
      res.json(row);
    }
  });
});

router.post("/getcategory", (req, res) => {
  db.all(`SELECT id,name,rec_type from categories`, (error, row) => {
    if (error) {
      res.status(400);
    } else {
      res.json(row);
    }
  });
});

router.post("/getpayments", (req, res) => {
  db.all(
    `SELECT m.name, m.family,c.name as category,p.date,p.amount,p.billno,p.jf from payments as p join members as m on p.persid = m.id join categories as c on c.id=p.catid`,
    (error, row) => {
      if (error) {
        res.status(400);
      } else {
        res.json(row);
      }
    }
  );
});

router.post("/getcreditreport", (req, res) => {
  console.log(req.body);
  db.all(
    `SELECT c.name as category, sum(p.amount) as amount  from payments as p join categories as c on c.id=p.catid where p.amount > 0 group by p.catid`,
    (error, row) => {
      if (error) {
        res.status(400);
      } else {
        res.json(row);
      }
    }
  );
});

router.post("/getspentreport", (req, res) => {
  console.log(req.body);
  db.all(
    `SELECT c.name as category, sum(p.amount) as amount from payments as p join categories as c on c.id=p.catid where p.amount < 0 group by p.catid`,
    (error, row) => {
      if (error) {
        res.status(400);
      } else {
        res.json(row);
      }
    }
  );
});

router.post("/getcreditsummaryreport", (req, res) => {
  console.log(req.body);
  db.all(
    `SELECT c.name as category, sum(p.amount) as amount from payments as p join categories as c on c.id=p.catidref where p.amount > 0 group by p.catidref`,
    (error, row) => {
      if (error) {
        res.status(400);
      } else {
        res.json(row);
      }
    }
  );
});

router.post("/getspentsummaryreport", (req, res) => {
  console.log(req.body);
  db.all(
    `SELECT c.name as category, sum(p.amount) as amount from payments as p join categories as c on c.id=p.catidref where p.amount < 0 group by p.catidref`,
    (error, row) => {
      if (error) {
        res.status(400);
      } else {
        res.json(row);
      }
    }
  );
});

router.post("/getsummaryreport", (req, res) => {
  console.log(req.body);
  db.all(
    `SELECT c.name as category, sum(p.amount) as amount from payments as p join categories as c on c.id=p.catidref group by p.catidref`,
    (error, row) => {
      if (error) {
        res.status(400);
      } else {
        res.json(row);
      }
    }
  );
});

router.post("/getspecificsummaryreport", (req, res) => {
  console.log(req.body);
  db.all(
    `SELECT c.name as category, sum(p.amount) as amount from payments as p join categories as c on c.id=p.catid group by p.catid`,
    (error, row) => {
      if (error) {
        res.status(400);
      } else {
        res.json(row);
      }
    }
  );
});

module.exports = router;
