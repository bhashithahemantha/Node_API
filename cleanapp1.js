
var restify = require('restify');
var server = restify.createServer();
var setupController = require('./controllers/setupController.js'); // creating anonimous functions
var userController = require('./controllers/userController.js');
var restifyValidator = require('restify-validator'); // getting restify validator
var mongoose = require('mongoose'); // getting mongoose
var config = require('./config/dbConnections.js');

mongoose.connect(config.getMongoConnection());
setupController(server, restify, restifyValidator); //call the anonimous functions
userController(server);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
// // standardize the response
// function respond(res, next, status, data, http_code) {
//     var response = {
//         'status' : status,
//         'data' : data
//     };
//     res.setHeader('content-type', 'application/json');
//     res.writeHead(http_code);
//     res.end(JSON.stringify(response));
//     return next();
// }

// // success function
// function success(res, next, data) {
//     respond(res, next, 'success', data, 200);
// }

// // failure function
// function failure(res, next, data, http_code) {
//     respond(res, next, 'failure', data, http_code);
// }




// server.use(restify.acceptParser(server.acceptable));
// server.use(restify.bodyParser());
// server.use(restify.queryParser());


// var users = {};
// var max_user_id = 0;



// server.get("/", function(req, res, next) {
//     success(res, next, users);
// });

// server.get("/user/:id", function(req, res, next) {
//     // handling user not found error
//     if (typeof(users[req.params.id]) === 'undefined') {
//         failure(res, next, 'user could not be found', 404);
//     }
//     success(res, next, users[parseInt(req.params.id)]);
// });

// server.post("/user", function(req, res, next) {
//     var user = req.params;
//     max_user_id++;
//     user.id = max_user_id;
//     users[user.id] = user;
//     success(res, next, user);
// });

// server.put("/user/:id", function(req, res, next) {
//     // handling user not found error
//     if (typeof(users[req.params.id]) === 'undefined') {
//         failure(res, next, 'user could not be found', 404);
//     }
//     var user = users[parseInt(req.params.id)];
//     var updates = req.params;
//     for(var item in updates){
//         user[item] = updates[item];
//     }
//     success(res, next, user);
// });

// server.del("/user/:id", function(req, res, next) {
//     // handling user not found error
//     if (typeof(users[req.params.id]) === 'undefined') {
//         failure(res, next, 'user could not be found', 404);
//     }
//     delete users[parseInt(req.params.id)];
//     success(res, next, []);
// });


