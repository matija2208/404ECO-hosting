load();

async function getData()
{
    try
    {
        var users=await axios.get("/api/users");
        return users.data.users;
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

function render(post, i)
{
    var str="";
    for(let j = 0; j < 347 && j<post.tekst.length ; j++)
    {
        str+=post.tekst[j];
    }
    str+='...';
    if(i%2==0)
    {
        var card = `
            <div class="row kartica levo" id = "${post._id}" onclick = "bigBoy(this.id)">
                <div class="col-lg-6" class="post-kartica">
                    <div class="post">    
                        <h7 class="naslov">${post.naslov}</h7>   
                    </div>
                    <img src="${post.slika}" class="img-fluid slika" style="max-width: 60%; margin-left: 15%;" /> 
                </div>
                <div class="col-lg-6 pt-4 pt-lg-0">
                    <p id="tekst_kartice">${str}</p>
                </div>
            </div>
        `;
        document.getElementById("forma_postovi").innerHTML+=card;
    }
    else
    {
        var card = `
            <div class="row kartica desno" id = "${post._id}" onclick = "bigBoy(this.id)">
                <div class="col-lg-6" class="post-kartica">
                    <div class="post">    
                        <h7 class="naslov">${post.naslov}</h7>   
                    </div>
                    <img src="${post.slika}" class="img-fluid slika" style="max-width: 60%; margin-left: 15%;" /> 
                </div>
                <div class="col-lg-6 pt-4 pt-lg-0">
                <p id="tekst_kartice">${str}</p>
                </div>
            </div>
        `;
        document.getElementById("forma_postovi").innerHTML+=card;
    }
}

async function load()
{
    var all_posts=(await axios.get("/api/posts")).data.postss;
    
    for(let i=0;i<all_posts.length;i++)
    {
        render(all_posts[i],i);
    }
    
}

async function getPost(id)
{
    console.log(id);
    console.log("/api/posts/"+id)
    try{
        var post = (await axios.get("/api/posts/"+id));
        
        return post.data.postss;
    }
    catch(err)
    {
        console.log(err);
    }
     
}

async function bigBoy(id)
{
    
    var post=await getPost(id);

    var STR=`
        <div id="post_naslov-m">
            <h7 id="tema_post-m">${post.naslov}</h7>
            <div class="post-m">    
                <p id="post_tekst-m">
                    ${post.tekst} 
                </p>   
            </div>
            <img src="${post.slika}" class="img-fluid slika_post-m" /> 
        </div><br><br>
    `
    
    var t=true;
    var idKorisnika=localStorage.getItem("id");
    if(idKorisnika!==null)
    {
        for(var k=0;k<post.pokusali.length;k++)
        {
            if(post.pokusali[k]===idKorisnika)
            {
                t=false;
                break;
            }
        }
        if(t)
        {
            for(let i=0;i<post.brojPitanja;i++)
            {
                var x=post.pitanja[i].pitanje.split('/.!./');
                STR+=`
                <div class="container">
                    <div class="row kartica levo">
                        <div class="col-lg-6" class="post-kartica">
                            <div class="post">    
                                <h7 class="naslov">${x[0]}</h7>
                                <p id = "test${i}"></p>   
                            </div>
                            
                        </div>
                    <div class="col-lg-6 pt-4 pt-lg-0">
                        <form id="tekst_kartice">
                        <input type="radio" name="pitanja${i}" value = 1><span>${x[1]}</span><br>
                        <input type="radio" name="pitanja${i}" value = 2><span>${x[2]}</span><br>
                        <input type="radio" name="pitanja${i}" value = 3><span>${x[3]}</span>
                        </form>
                    </div>
                </div>
                `
            }
            STR+=`
                <button onclick = "proveriOdgovore('${id}')">ZAVRSI</button> 
            `;
        }
    }

    
    document.getElementById("forma_postovi").innerHTML=STR;
}

async function updatePoints(poeni)
{
    
    console.log("/api/users/1/"+localStorage.getItem("id"));
    try{
        await axios.put("/api/users/1/"+localStorage.getItem("id"),{poeni:poeni});
        console.log(1);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function proveriOdgovore(id)
{
    var post=await getPost(id);
    console.log(post);
    var poeni = 0;
   
    await axios.put("/api/posts/"+id,{id:localStorage.getItem("id")});

    for(let i = 0; i<post.brojPitanja;i++)
    {
        var tacanOdgovor = document.querySelector('input[name='+ 'pitanja' + i + ']:checked').value;
        
        console.log(i+"\t"+tacanOdgovor+"=="+post.pitanja[i].tacanOdgovor);
        if(tacanOdgovor==post.pitanja[i].tacanOdgovor)
        {
            document.getElementById("test"+i).innerHTML="Tacno!";
            document.getElementById("test"+i).style.color="green";
            poeni+=10; 
        }
        else
        {
            document.getElementById("test"+i).innerHTML="Netacno!";
            document.getElementById("test"+i).style.color="red";
        }
    }
    updatePoints(poeni);
}