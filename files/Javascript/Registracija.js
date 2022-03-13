var valid_test;
var extraLogin = 0;

function everything_filled(entries){
    if(entries.ime_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyNameWarning").classList.remove("Hidden2");
    } else document.getElementById("EmptyNameWarning").classList.add("Hidden2");

    if(entries.mail_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyMailWarning").classList.remove("Hidden2");
    } else document.getElementById("EmptyMailWarning").classList.add("Hidden2");

    if(entries.pass_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyPassWarning").classList.remove("Hidden2");
    } else document.getElementById("EmptyPassWarning").classList.add("Hidden2");

    if(entries.pass_repeat.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyRepeatWarning").classList.remove("Hidden2");
    } else document.getElementById("EmptyRepeatWarning").classList.add("Hidden2");


    if(extraLogin){
        if(entries.tel_input.value.length == 0 ){
            valid_test = false;
            document.getElementById("BadTelephoneInput").classList.remove("Hidden2");
        } else document.getElementById("BadTelephoneInput").classList.add("Hidden2");
    }
}

function regex_valid_mail(entries){
    var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var tekst = entries.mail_input.value;
    var test = tekst.match(pattern);

    if (test == null) {
        document.getElementById("ErrorMailWarning").classList.remove("Hidden2");
        valid_test = false;
    } else{
      console.log("validiran email korisnika...");
      document.getElementById("ErrorMailWarning").classList.add("Hidden2");
    }
}

function regex_valid_pass(entries){
   var pattern = entries.pass_input.value.length;
   if(pattern<8){
     valid_test = false;
     document.getElementById("ErrorPassWarning").classList.remove("Hidden2");
   }else{
    console.log("validirana lozinka korisnika...");
    document.getElementById("ErrorPassWarning").classList.add("Hidden2");
   }
}

function regex_valid_repeat(entries){
    var password = entries.pass_input.value;
    var repeatPass = entries.pass_repeat.value;
    if(password != repeatPass){
        valid_test = false;
        document.getElementById("ErrorRepeatWarning").classList.remove("Hidden2");
    } else{
        console.log("validirana ponovljena lozinka korisnika...");
        document.getElementById("ErrorRepeatWarning").classList.add("Hidden2");
    }
}

async function registruj(entries){
    var link="www.404.in.rs";
    if(!extraLogin)
    {
        let newUser={
            userName:entries.ime_input.value,
            email:entries.mail_input.value,
            password:entries.pass_input.value
        };
        try
        {
            var res=await axios.post(link + "/api/users",newUser);
            //console.log(res);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    else
    {
        let newUser={
            userName:entries.ime_input.value,
            email:entries.mail_input.value,
            password:entries.pass_input.value,
            brojTelefona:entries.tel_input.value,
            opis:entries.opisInput.value
        };
        try
        {
            var res=await axios.post(link + "/api/users",newUser);
            //console.log(res);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    
    
}

async function getData()
{
    try
    {
        var users=await axios.get("www.404.in.rs/api/users");
        return users.data.users;
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

async function ValidirajRegister(){
    valid_test = true;
    var entries = document.getElementById("forma");
    everything_filled(entries);
    regex_valid_mail(entries)
    regex_valid_pass(entries);
    regex_valid_repeat(entries);

    if(valid_test == true){
        var users = await getData();
        var t=true;
        users.forEach(i => {
            if(i.email===entries.mail_input.value || i.userName===entries.ime_input.value)
            {
                t=false;
            }
        });
        if(t){
            await registruj(entries);
            location.href="Login.html";
        }else{
            document.getElementById("SameMailWarning").classList.remove("Hidden2");
        }
    } 
    else
    {
        console.log("Korisnik se ne registruje");
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

async function Provera()
{
    let x=getCookie("username");
    console.log(x);

    var entries = document.getElementById("formaLogin");
    var email=entries.mail.value;
    var password=entries.lozinka.value;

    var users=await getData();
    var id="";
    var t=false;

    users.forEach(i => {
        if(email===i.email && password===i.password)
        {
            id=i._id;
            t=true;
        }
    });

    if(t)//Ako prodje if znaci da je unet postojeci mail i password
    {
        //dodati pravljenje kolacica sa vrednoscu korisnikovog id-a
        document.getElementById("LoginError").classList.add("Hidden2");
        
        localStorage.setItem("id",id);
        //console.log(localStorage.getItem("id"));
        
        location.href="Login.html";
    }
    else
    {
        document.getElementById("LoginError").classList.remove("Hidden2"); //dodati poruku da je omasen mail ili password
        console.log(0);
    }
}

function showDiv(){
    var thediv = document.getElementById("ExtraInfoDiv");
    thediv.classList.remove("Hidden2");

    extraLogin = 1;
}

function hideDiv(){
    var thediv = document.getElementById("ExtraInfoDiv");
    thediv.classList.add("Hidden2");

    extraLogin = 0;
}