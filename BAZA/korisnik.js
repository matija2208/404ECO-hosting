const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    userName:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    tipKorisnika:{
        type:String,
        trim:true,
        required:true
    },
    poeni:{
        type:Number,
        required:true
    },
    
    brojTelefona:{
        type:String,
        trim:true,
        required:false
    },
    opis:{
        type:String,
        trim:true,
        required:false
    }
});

module.exports=mongoose.model("user", UserSchema);