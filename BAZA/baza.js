const mongoose = require("mongoose");

async function connect_baza(){
    try{
        const link="mongodb+srv://jakoje:jastemnemnista@cluster0.vhbul.mongodb.net/jakoje?retryWrites=true&w=majority";;
        /*
        username: jakoje
        password: jastemnemnista
        */

        //konekt
        const connection = await mongoose.connect(link, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log("Baza uspesna");
    }
    catch(err){
        console.log(`Error: ${err.message}`);
    }
}

module.exports = connect_baza;