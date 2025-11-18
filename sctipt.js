// Les variaiables / tableaux //
let counter = 0;
let counter2 = 0;
let workers = [];
let workerexperiences = [];
let AllExperiencecartes ;
const Update_worker_btn = document.getElementById("Update-worker-btn");
const close_btn = document.getElementById("close_btn");
const workercarte = document.querySelector(".workercarte");
const emailregex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{3,}$/gm ;
const phoneregex = /^\d{10}$/;
const lienregex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
const modaldescription=document.getElementsByClassName("forblurmodal2")[0];
const Addexperiencebtn = document.getElementById("Addexperience-btn");
const toaddnewexperiencecarte = document.getElementById("allexperiences");
const Experiencecarte = document.getElementsByClassName("Experiencecarte")[0];
modaldescription.style.display="none";
//Les button//
function displayform(){
    document.getElementById("blurbackround").style.display="flex";
}
// submit //
Update_worker_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    document.getElementById("blurbackround").style.display="none";
    // inputs values
    let name = document.getElementById("name").value;
    let role = document.getElementsByTagName("select")[0].value;
    let photolink = document.getElementById("photolink");
    let email = document.getElementById("email").value;
    let phonenumber = document.getElementById("phonenumber").value;
    // inputs experiences values 
    let company = document.getElementById("companyname").value;
    let role_incompany = document.getElementById("role-in-company").value;
    let datedebut = document.getElementById("debut").value;
    let datefin = document.getElementById("fin").value;
    // Regex //
if(name==""||photolink.value==""||email==""||phonenumber==""){
        alert("error");
        e.preventDefault();
    document.getElementById("blurbackround").style.display="flex";
}
    else if(!lienregex.test(photolink.value)){
    alert("Le lien est pas correct")
    document.getElementById("blurbackround").style.display="flex";
    return;
}
    else if(!emailregex.test(email)){
    alert("pardon , l'email est incorrect , entrez la form correct de gmail pour valider")
    document.getElementById("blurbackround").style.display="flex";
    return;
}
    else if(!phoneregex.test(phonenumber)){
    alert("pardon , le numero est incorrect , entrez 10 nombres pour valider")
    document.getElementById("blurbackround").style.display="flex";
    return;
}

else{
    // l'object principale 
    let worker = {
        id : counter ,
        workername : name ,
        workerrole : role,
        workerphotolink : photolink.value,
        workeremail : email,
        workerphonenumber : phonenumber,
    }
    counter+=1;
    let workerszone = document.getElementsByClassName("workerszone")[0];
    workers.push(worker)
    console.log(worker.id)
    // l'object d'experiences 
    let experience = {
        id : counter2 ,
        companyname : company ,
        role_in_company : role_incompany,
        date_debut_with_company : datedebut,
        date_end_with_company : datefin,
    }
    counter2 +=1;
    console.log(experience);
    workerexperiences.push(experience);
    console.log(workerexperiences)
    //Feauture add//
    workerszone.innerHTML+=`<div class="workercarte" onClick ="showdescriptionmodal(event)">
    <div class="workerimage"; style="background:url(${worker.workerphotolink});background-size:cover"></div>
    <div>
    <div><b>${worker.workername}</b></div>
    <div><p>${worker.workerrole}</p></div>
    </div>
    </div>`
    let workerscartes = document.querySelectorAll(".workercarte");
}
})
// display image
photolink.addEventListener("change",(e)=>{
    document.getElementById("imageplace").style.backgroundImage=`url(${photolink.value})`;
})
// add a experience 
Addexperiencebtn.addEventListener("click",(e)=>{
toaddnewexperiencecarte.innerHTML+=`<div class="Experiencecarte">
                <label for="">Company :</label>
                <input type="text" id="companyname">
                <label for="">Role :</label>
                <input type="text" id="role-in-company">
                <label for="">From :</label>
                <input type="date" id="debut">
                <label for="">To :</label>
                <input type="date" id="fin">
            </div>`;
let AllExperiencecartes = document.getElementsByClassName("Experiencecarte");
})
// display modal of description
function showdescriptionmodal(e){
    console.log(e.currentTarget)
modaldescription.style.display="flex";
// document.getElementsByClassName("modal2")[0].innerHTML
}
function returntomain(){
    document.getElementById("blurbackround").style.display="none";
    modaldescription.style.display="none";
}

