const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'academic-mysql.cc.gatech.edu',
    user: 'cs4400_Group_26',
    password: 'W3anEEq_',
    database: 'cs4400_Group_26',
    timezone: 'utc',
    dateStrings: true
});

router.route('/')
.get((req, res) => {
    connection.query(
        `SELECT Name,StopID,EnterFare,ClosedStatus,IsTrain,Intersection
        FROM Station NATURAL LEFT OUTER JOIN BusStationIntersection
        ORDER BY ${req.query.attr} ${req.query.asc === "true" ? "ASC" : "DESC"}
        `,
        (err, results) => {
            res.send({
                results
            });
        }
    );
});

module.exports = router;