const express = require("express");
const app = express();
const cors = require("cors");

const baza = require("./BAZA/baza");
const user = require("./BAZA/korisnik");
const post = require("./BAZA/post");

const PORT=80;

//pokretanje servera
app.listen(PORT, function()
{
    console.log("Server slusa na portu : "+PORT);
});

//Povezivanje sa mongodb bazom
baza();

//ubacivanje podrske za json
app.use(express.json());
//disable-ovanje cors greske
app.use(cors());

//deo za hostovanje fronta
app.get("/", function(req,res){
    res.sendFile('/home/smorovs/404ECO-hosting/files/index.html');
});
app.get("/:file", function(req,res){
    var file=req.params.file;
    res.sendFile('/home/smorovs/404ECO-hosting/files/' + file);
});

//userAPI

    app.get("/api/users", async function(req,res){
        try{
            const all_users = await user.find();
            res.json({
                uspesno:true,
                users:all_users
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });
    app.get("/api/users/:id", async function(req,res){
        try{
            const USER = await user.findById(req.params.id)
            res.json({
                uspesno:true,
                user:USER
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.post("/api/users", async function(req,res){
        try{
            const new_user = new user({
                email:req.body.email,
                userName:req.body.userName,
                password:req.body.password,
                tipKorisnika:"Korisnik",
                poeni:0,

                brojTelefona:req.body.brojTelefona,
                opis:req.body.opis
            });

            const saved_user = await new_user.save();

            res.json({
                uspesneost:true,
                id:saved_user._id,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });
    
    app.put("/api/users/:mod/:id", async function(req,res){
        try{
            const USER = await user.findById(req.params.id);
            
            if(req.params.mod==0)
            {
                USER.tipKorisnika=req.body.tipKorisnika;
            }
            else
            {
                USER.poeni+=req.body.poeni;
            }

            await USER.save();
            res.json({
                uspesno:true,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.delete("/api/users/:id", async function(req,res){
        try{
            const USER = await user.findById(req.params.id);
            await USER.delete();
            res.json({
                uspesno:true,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

//PostAPI
    app.get("/api/posts", async function(req,res){
        try{
            const all_posts = await post.find();
            res.json({
                uspesno:true,
                postss:all_posts
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.get("/api/posts/:id", async function(req,res){
        try{
            const POST = await post.findById(req.params.id);
            res.json({
                uspesno:true,
                postss:POST
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.post("/api/posts", async function(req,res){
        try{
            const new_post = new post({
                naslov:req.body.naslov,
                tekst:req.body.tekst,
                slika:req.body.slika,
                brojPitanja:req.body.brojPitanja,
                pitanja:req.body.pitanja,
                idKorisnika:req.body.idKorisnika,
                pokusali:[]
            });

            const saved_post = await new_post.save();

            res.json({
                uspesneost:true
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.delete("/api/posts/:id", async function(req,res){
        try{
            const POST = await post.findById(req.params.id);
            await POST.delete();
            res.json({
                uspesno:true
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.put("/api/posts/:id", async function(req,res){
        try{
            const POST = await post.findById(req.params.id);
            POST.pokusali.push(req.body.id);
            await POST.save();
            res.json({
                uspesno:true
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    

