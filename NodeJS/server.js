const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

mysqlConnection.connect((err) => {
  if (!err)
    console.log('DB connect succeeded.');
  else
    console.log('DB connection failed')
});

app.listen(3009, () => console.log('Express server is running'))

app.get('/crypto', (req, res) => {
  mysqlConnection.query("SELECT * FROM crypto WHERE Date='Dec 04, 2019' OR Date='NOV 04, 2019' OR Date='NOV 28, 2019'", (err, rows, fields) => {
    if (!err) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(getList(rows));
    }
    else
      console.log(err)
  })
})

const getList = (rows) => {
  const newList = []
  for (index = 0; index < rows.length; index = index + 3) {
    if (rows[index].Currency != null) {
      newList.push({
        coin: rows[index].Currency,
        price: '$' + rows[index].Close,
        aDay: ((parseFloat(rows[index].Close) - parseFloat(rows[index].Open)) * 100 / parseFloat(rows[index].Open)).toFixed(1) + '%',
        sevenDay: ((parseFloat(rows[index].Close) - parseFloat(rows[index + 1].Close)) * 100 / parseFloat(rows[index + 1].Close)).toFixed(1) + '%',
        aMonth: ((parseFloat(rows[index].Close) - parseFloat(rows[index + 2].Close)) * 100 / parseFloat(rows[index + 2].Close)).toFixed(1) + '%',
        volume: '$' + rows[index].Volume,
        mktCap: '$' + rows[index].Market_Cap
      });
    }
  }
  return newList
}