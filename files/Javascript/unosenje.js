var link;

function reportInfo(vars, showType = false) {
    if (showType === true); //console.log(typeof vars);
    //console.log(vars);
}

function addImg(ele, content) {
    var myDIV = document.querySelector(ele);
    var newContent = document.createElement('div');
    newContent.innerHTML = content;

    while (newContent.firstChild) {
        myDIV.appendChild(newContent.firstChild);
    }
}

var feedback = function(res) {
    reportInfo(res, true);
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        var content =
            'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>' 
             + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
        addImg('.status', content);
        link = get_link;
    }
};

new Imgur({
    clientid: 'a08fd223eb9d597', //You can change this ClientID
    callback: feedback
});

////////////// vvv za upitnik i objavljivanje



function generateInput(num){
    var questionTemplate = `
    <div id="Pitanje${num}">
        <hr>
        <h1 class="dropzone_narrate">Pitanje #${num}:</h1>

        <textarea id="pitanje${num}_tekst_input" type='text' style="resize: vertical;" placeholder='Tekst pitanja:'></textarea>

        <input class="odg_input" id="pitanje${num}_odg1_input" type='text' placeholder='Odgovor 1:'/> 
        <input class="RadioButton" type="radio" name="pitanje${num}_radio" value="1">

        <input class="odg_input" id="pitanje${num}_odg2_input" type='text' placeholder='Odgovor 2:'/> 
        <input class="RadioButton" type="radio" name="pitanje${num}_radio" value="2">

        <input class="odg_input" id="pitanje${num}_odg3_input" type='text' placeholder='Odgovor 3:'/> 
        <input class="RadioButton" type="radio" name="pitanje${num}_radio" value="3">
    </div>
    `;

    document.getElementById("Wrapper").innerHTML += questionTemplate; 
}

function generateTemplates(){
    var entries = document.getElementById("formaPost");
    var questionNum = entries.num_pitanja_input.value;

    if(questionNum > 10){
        entries.num_pitanja_input.value = 10;
    }

    if(questionNum < 0){
        entries.num_pitanja_input.value = 0;
    }

    document.getElementById("Wrapper").innerHTML="";
    for(let i = 1; i <= entries.num_pitanja_input.value; i++){
        generateInput(i);
    }
}

function validPosting(){
    let validated = 1;
    var entries = document.getElementById("formaPost");
    var questionNum = entries.num_pitanja_input.value;

    if(document.getElementById("naslov_input").value.length == 0){
        validated = 0;
    }

    if(document.getElementById("sadrzaj_input").value.length == 0){
        validated = 0;
    }

    for(let i = 1; i <= entries.num_pitanja_input.value; i++){
        var pitanjeTekst = (document.getElementById("pitanje"+i+"_tekst_input").value);
        var pitanje1 = (document.getElementById("pitanje"+i+"_odg1_input").value);
        var pitanje2 = (document.getElementById("pitanje"+i+"_odg2_input").value);
        var pitanje3 = (document.getElementById("pitanje"+i+"_odg3_input").value);
        var tacanodg = document.querySelector('input[name='+ 'pitanje' + i + '_radio' +']:checked').value;

        if(pitanjeTekst.length == 0 || pitanje1.length == 0 || pitanje2.length == 0 || pitanje3.length == 0 || tacanodg == null){
            validated = 0;
        }
    }

    if(validated == 1){
        document.getElementById("PostError").classList.add("Hidden2");
        objaviPost();
    }else{
        document.getElementById("PostError").classList.remove("Hidden2");
    }
}

async function objaviPost(){
    var LINK="www.404.in.rs";;
    var entries = document.getElementById("formaPost");
    
    var arr = [];

    for(let i = 1; i <= entries.num_pitanja_input.value; i++){


        var pitanjeTekst = (document.getElementById("pitanje"+i+"_tekst_input").value);
        var pitanje1 = (document.getElementById("pitanje"+i+"_odg1_input").value);
        var pitanje2 = (document.getElementById("pitanje"+i+"_odg2_input").value);
        var pitanje3 = (document.getElementById("pitanje"+i+"_odg3_input").value);
        var tacanodg = document.querySelector('input[name='+ 'pitanje' + i + '_radio' +']:checked').value;

        var str = pitanjeTekst + '/.!./' + pitanje1 + '/.!./' + pitanje2 + '/.!./' + pitanje3 + '/.!./';
        arr.push({
            pitanje:str,
            tacanOdgovor:tacanodg
        });
    }

    var new_post={
        naslov:entries.naslov_input.value,
        tekst:entries.sadrzaj_input.value,
        slika:link,
        brojPitanja:entries.num_pitanja_input.value,
        idKorisnika:localStorage.getItem("id"),
        pitanja:arr
    };

    try{
        var res = await axios.post(LINK + "/api/posts",new_post);
        console.log(res);
        location.href="Postovi.html";
    }
    catch(err){
        console.log(err);
    }
}