const mongoose = require("mongoose");



const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a product name'],
        maxlength: 32
    },
 
}, {timestamps: true})


// Return JWT token
// categorySchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: 3600 
//     });
// }


module.exports = mongoose.model("Category", categorySchema);