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

async function Provera()
{
    var entries = document.getElementById("formaLogin");

    var userName = entries.mail.value;
    var password = entries.lozinka.value;

    var all_users= await getData();

    var t = false;

    all_users.forEach(i => {
        if((i.email===userName || i.userName===userName)&&(i.password==password))
        {
            localStorage.setItem("id",i._id);
            location.href="index.html";
        }
    });

}