const express = require('express')
const router = express.Router()
const {db} = require('../utilities/db')


router.post("/category/getall_non_recrussive_main",(req,res)=>{
  db.all(`SELECT id,name FROM categories WHERE rec_type is 0`, (error, row) => {
  res.json(row)
  });
})

module.exports = router