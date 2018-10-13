var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var userSchema = new Schema({
 id: ObjectId,
 first_name: String,
 last_name: String,
 email: String,
 career: String
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
