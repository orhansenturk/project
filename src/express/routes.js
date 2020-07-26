var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var questionsByCategory = [];
var categoriesList = [];

app.use(express.static(path.join(__dirname, 'public/static/')));

app.use(bodyParser.urlencoded({extended: false, limit: '50mb', parameterLimit: 1000000}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/questions-by-category', function(req, res){
    res.send({
        questions: questionsByCategory
    });
});

app.get('/categories', function(req, res){
    res.send({
        categories: categoriesList
    });
});

module.exports = function(data, cfg){
    questionsByCategory = data.questions;
    categoriesList = data.categories;
    return app;
}