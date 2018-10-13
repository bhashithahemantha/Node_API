var helpers = require('../config/helperFunctions.js');
var userModel = require('../models/userModel.js');



module.exports = function(server) { // makes things in the parenthasis are public using exports

    // get all users
    server.get("/", function(req, res, next) {
        userModel.find({}, function (err, users) {
            helpers.success(res, next, users);
        });
    });
    
    // get a user
    server.get("/user/:id", function(req, res, next) {
        // check for id error
        req.assert('id', 'id is required and must be numeric').notEmpty().isInt();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
        }
        userModel.findOne({_id: req.params.id}, function (err, users) {
            if (err) {
                helpers.failure(res, next, 'something went wrong while fetching user', 500);
            }
            if (user === null) {
                helpers.failure(res, next, 'user could not be found', 404);
            }
            helpers.success(res, next, user);
        });
    });

    // register a user
    server.post("/user", function(req, res, next) {
        // check for first name,last name, email and career error
        req.assert('first_name', 'first name is required').notEmpty();
        req.assert('last_name', 'last name is required').notEmpty();
        req.assert('email', 'email is required and must be a valid email').notEmpty().isEmail();
        req.assert('career', 'career must be either student, teacher or parent').notEmpty().isIn(['student','teacher','parent']);
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors, 400);
        }
        // var user = req.params;
        // max_user_id++;
        // user.id = max_user_id;
        // users[user.id] = user;
        var user = new userModel(); // replacing fack database code with instence of userModel
        user.first_name = req.params.first_name; // filling the user properties
        user.last_name = req.params.last_name;
        user.email = req.params.email;
        user.career = req.params.career;
        user.save(function(err) { // save users after checking errors
            if(err) {
                helpers.failure(res, next, 'error saving user to the database', 500);
            }
            helpers.success(res, next, user);
        });
    });

    // modify user details of a particular user
    server.put("/user/:id", function(req, res, next) {
        // check for id error
        req.assert('id', 'id is required and must be numeric').notEmpty().isInt();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
        }
        // handling user not found error
        if (typeof(users[req.params.id]) === 'undefined') {
            helpers.failure(res, next, 'user could not be found', 404);
        }
        var user = users[parseInt(req.params.id)];
        var updates = req.params;
        for(var item in updates){
            user[item] = updates[item];
        }
        helpers.success(res, next, user);
    });

    // delete user details of a particular user
    server.del("/user/:id", function(req, res, next) {
        // check for id error
        req.assert('id', 'id is required and must not be empty').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
        }
        // handling user not found error
        if (typeof(users[req.params.id]) === 'undefined') {
            helpers.failure(res, next, 'user could not be found', 404);
        }
        delete users[parseInt(req.params.id)];
        helpers.success(res, next, []);
    });

}