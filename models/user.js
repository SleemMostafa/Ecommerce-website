const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 140,
    required: true,
  },
  isAdmin:{
    typeof:Boolean,
    default:false
  },
  products:{
    type:Array
  },
});

userSchema.pre('save', function () {

  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
})

userSchema.pre('findOneAndUpdate', async function () {
  var salt = bcrypt.genSaltSync(10);

  this._update.password = await bcrypt.hash(this._update.password, salt)
})

var userModel = mongoose.model("User", userSchema);

module.exports = userModel;