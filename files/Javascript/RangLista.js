load();

async function getData()
{
    try{
        var all_users=await axios.get("/api/users");
        
        return all_users.data.users;
    }
    catch(err){

    }
}



async function load()
{
    var users=await getData();
    console.log(users);

    for(let i = 0;i<users.length;i++)
    {
        for(let j = 0; j<i;j++)
        {
            if(users[i].brojPoena>users[j].brojPoena)
            {
                var t=users[i];
                users[i]=users[j];
                users[j]=t;
            }
        }
    }
    console.log(users);
    var str = `
            <div class="rank-box">
                <span id="mesto" class="sing_h1">👑 PRVO MESTO 👑<br></span>
                <span class="sing_h1">${users[0].userName} ${users[0].poeni}</span>
            </div>
            <div class="rank-box2">
                <div class="rank-box3">
                    <span id="mesto" class="sing_h1">DRUGO MESTO<br></span>
                    <span class="sing_h1">${users[1].userName} ${users[1].poeni}</span>
                </div>
                <div class="rank-box3">
                    <span id="mesto" class="sing_h1">TREĆE MESTO<br></span>
                    <span class="sing_h1">${users[2].userName} ${users[2].poeni}</span>
                </div>
            </div>
            <div class="rank-box4">
              <span class="sing_h1">4. ${users[3].userName} ${users[3].poeni}</span>
              <hr>
              <span class="sing_h1">5. ${users[4].userName} ${users[4].poeni}</span>
              <hr>
              <span class="sing_h1">6. ${users[5].userName} ${users[5].poeni}</span>
              <hr>
              <span class="sing_h1">7. ${users[6].userName} ${users[6].poeni}</span>
              <hr>
              <span class="sing_h1">8. ${users[7].userName} ${users[7].poeni}</span>
              <hr>
              <span class="sing_h1">9. ${users[8].userName} ${users[8].poeni}</span>
              <hr>
              <span class="sing_h1">10. ${users[9].userName} ${users[9].poeni}</span>
            </div>
    `;
    document.getElementById("rang_forma").innerHTML=str;
}