const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name'],
        maxlength: 32
    },
    
    email: {
        type: String,
        trim: true,
        required: [true, 'Please add an E-mail'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
    },
        
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must have at least six(6) characters'],
        match: [/^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
                'Password must contain at leat 1 uppercase letter, 1 lowercase letter, 1 digit and a special character'
            ],
    },

    about:{
        type: String,
        trim: true
    },

    avatar:{
        type: String,
        default: null
    },

    role: {
        type: Number,
        default: 0
    },

    history:{
        type: Array,
        default: []
    },
}, {timestamps: true})



// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600 
    });
}

module.exports = mongoose.model("User", userSchema);