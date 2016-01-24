var express = require('express');
var serveStatic = require('serve-static');

var app = express();

var resourceDirs = [
    '/js',
    '/css',
    '/partials',
];

resourceDirs.forEach(function(path, index){
    app.use(path, express.static(__dirname + "/public" + path));
});

// send 404 for any path w/in the resource dirs that does not exist
// prevent these from falling through to the index
resourceDirs.forEach(function(path, index){
    app.all(path + '*', function (req, res) {
        res.sendStatus(404);
    });
});

app.use(function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
