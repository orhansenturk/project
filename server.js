var cfg = require('./server.cfg.json');
var getQuestions = require('./src/getQuestions')(require(cfg.questions));
var server = require('./src/express/routes')(getQuestions, cfg);

server.listen(cfg.port, cfg.address, function () {
    console.log('Server listening on port ' + cfg.address + ':' + cfg.port + '!');
});
