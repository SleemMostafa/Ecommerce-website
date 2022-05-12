const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const SellerSchema = mongoose.Schema({
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
  products: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
      required:false
    }   
  ],
});

SellerSchema.pre('save', function () {

  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
})

SellerSchema.pre('findOneAndUpdate', async function () {
  var salt = bcrypt.genSaltSync(10);

  this._update.password = await bcrypt.hash(this._update.password, salt)
})


var SellerModel = mongoose.model("seller", SellerSchema);

module.exports = SellerModel;
