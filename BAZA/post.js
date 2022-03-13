const mongoose = require("mongoose");

var PitanjeSchema=new mongoose.Schema({
    pitanje:{
        type:String,
        trim:true,
        required:true
    },
    tacanOdgovor:{
        type:Number,
        required:true
    }
    
})

var PostSchema = new mongoose.Schema({
    naslov:{
        type:String,
        trim:true,
        required:true
    },
    tekst:{
        type:String,
        trim:true,
        required:true
    },
    slika:{
        type:String,
        trim:true,
        required:true
    },
    brojPitanja:{
        type:Number,
        required:true
    },
    idKorisnika:{
        type:String,
        trim:true,
        required:true
    },

    pitanja:[{
        type:PitanjeSchema,
        required:true
    }],

    pokusali:[{
        type:String,
        trim:true,
        required:true    
    }]

});

module.exports=mongoose.model("post", PostSchema);