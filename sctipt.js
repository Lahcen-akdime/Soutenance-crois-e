//____________________________ Les variaiables / tableaux _____________________________ //
let counter2 = 0 ; //pour le counter d'experience
let workerszone = document.getElementsByClassName("workerszone")[0]; // aside worker place
// _______________________________ Local storage data _________________________________ //
let newid = JSON.parse(localStorage.getItem("id")) || 0 ;           // id de chaque object
let workersmemory = JSON.parse(localStorage.getItem("worker"))||[];    // array of objects
// ____________________________________________________________________________________ //
const formCreateWorker = document.getElementById("form-create-worker");
const workercarte = document.querySelector(".workercarte");          // class css de carte
// regex
const emailregex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{3,}$/gm ;
const phoneregex = /^\d{10}$/;
const lienregex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
// modal2
const modaldescription = document.getElementsByClassName("forblurmodal2")[0];
const workernameinmodal = document.getElementById("worker-name");
const workerroleinmodal = document.getElementById("worker-role");
const workerimageinmodal = document.getElementById("image2place");
const workeremailinmodal = document.getElementById("worker-email");
const workernumberinmodal = document.getElementById("worker-phone");
const workerexperiencesplace = document.getElementById("experiences-place");
const workerlocationinmodal = document.getElementById("location");
// modal3 - add in section
const selectmodal = document.getElementsByClassName("forblurmodal3")[0];
const workersplaceinselectmodal = document.getElementById("workersplace")
// addexperieces
const Addexperiencebtn = document.getElementById("Addexperience-btn");
const toaddnewexperiencecarte = document.getElementById("allexperiences");
const Experiencecarte = document.getElementsByClassName("Experiencecarte")[0];
// ______________________________ Les button _______________________________//
function displayform(){
    document.getElementById("blurbackround").style.display="flex";
}
// ________________________________ submit _________________________________ //
formCreateWorker.addEventListener("submit",(e)=>{
    e.preventDefault();
    document.getElementById("blurbackround").style.display="none";
    // __________________________ inputs values ____________________________ //
    let name = document.getElementById("name").value;
    let role = document.getElementsByTagName("select")[0].value;
    let photolink = document.getElementById("photolink");
    let email = document.getElementById("email").value;
    let phonenumber = document.getElementById("phonenumber").value;
    // _______________________________ Regex _______________________________ //
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
    // _____________________________ l'object d'experiences _____________________________ //
    let AllExperiencecartes = document.querySelectorAll(".Experiencecarte");
    let allexperiencestable = [];
    AllExperiencecartes.forEach(element => {
        let company = element.querySelector("#companyname").value;
        let role_incompany = element.querySelector("#role-in-company").value;
        let datedebut = element.querySelector("#debut").value;
        let datefin = element.querySelector("#fin").value;
        experience = {
            id : counter2 ,
            companyname : company,
            role_in_company : role_incompany,
            date_debut_with_company : datedebut,
            date_end_with_company : datefin,
        }
        counter2 +=1;
        allexperiencestable.push(experience)
    });
    // _____________________________ l'object principale _____________________________ //
    const worker = {
        id : newid++ ,
        workername : name ,
        workerrole : role,
        workerphotolink : photolink.value,
        workeremail : email,
        workerphonenumber : phonenumber,
        experiences : allexperiencestable ,
        workerlocation : "Unassigned" ,
    }
    workersmemory.push(worker)
    // _____________________________ Local storage setItem _____________________________ //
    localStorage.setItem("worker",JSON.stringify(workersmemory));
    localStorage.setItem("id",JSON.stringify(newid));
    // ________________________________ Affichage ______________________________________ //
    affichage();
    // ______________________________ reste the form ___________________________________ //
    document.getElementsByTagName("form")[0].reset();
    workerexperiencesplace.innerHTML=`
<div class="experiencediv">
    <div>
        <h4 style="display: inline;">Place : </h4>
        <p style="display: inline;">${element.companyname}</p>
    </div>
            <ul>
                <li><b>Role : </b><span>${element.role_in_company}</span></li>
                <li><b>Period : </b><span>${element.date_debut_with_company}</span> / 
                <span>${element.date_end_with_company}</span></li>
            </ul>
</div>`
}})
    // _____________________________ display image ____________________________________ //
photolink.addEventListener("change",(e)=>{
    document.getElementById("imageplace").style.backgroundImage=`url(${photolink.value})`;
})
    // ______________________________ add a experience ________________________________ // 
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
})
// __________________________ display modal of description ___________________________ //
function showdescriptionmodal(objectid){

// let array1 = 
modaldescription.style.display="flex";
let selectedworker = workersmemory.find((x)=>x.id===objectid);
workernameinmodal.innerHTML=selectedworker.workername
workerroleinmodal.innerHTML=selectedworker.workerrole
workerimageinmodal.style.backgroundImage=`url(${selectedworker.workerphotolink})`
workeremailinmodal.innerHTML=selectedworker.workeremail
workernumberinmodal.innerHTML= selectedworker.workerphonenumber
workerlocationinmodal.innerHTML =selectedworker.workerlocation
let array2 = selectedworker.experiences ;
workerexperiencesplace.innerHTML="";
for(element of array2) {
workerexperiencesplace.innerHTML+=`
<div class="experiencediv">
    <div>
        <h4 style="display: inline;">Place : </h4>
        <p style="display: inline;">${element.companyname}</p>
    </div>
            <ul>
                <li><b>Role : </b><span>${element.role_in_company}</span></li>
                <li><b>Period : </b><span>${element.date_debut_with_company}</span> / 
                <span>${element.date_end_with_company}</span></li>
            </ul>
</div>`
}}
function returntomain(){
    document.getElementById("blurbackround").style.display="none";
    modaldescription.style.display="none";
selectmodal.style.display="none";
}
// ________________________________ Affichage _____________________________________ //
function affichage (){
workerszone.innerHTML=""
 workersmemory.forEach(element => {
    if(element.workerlocation=="Unassigned"){
    workerszone.innerHTML+=`<div class="workercarte" data-loc-ation="unassigned"
     onClick="showdescriptionmodal(${element.id})">
        <div class="workerimage"; style="background:url(${element.workerphotolink});
        background-size:cover"></div>
        <div>
        <div><b>${element.workername}</b></div>
        <div><p>${element.workerrole}</p></div>
        </div>
        </div>`
}})}
affichage()
// _________________________________ Modal 3 _____________________________________ //
function showselectmodal(id,value){
    selectmodal.style.display="flex";
    workersplaceinselectmodal.innerHTML=""
    workersmemory.forEach(element=>{
// conditions pour les paraméttres de chaque sale  
    if(id==element.workerrole){
        afficherleworker(element,value);
    }
    if(element.workerrole=="Netoyage" && value != "vault"){
           afficherleworker(element,value);
        }
    else if(element.workerrole=="Autre"){
            if(value=="staff" || value=="vault" || value=="conference"){
             afficherleworker(element,value);
            }
        }
    else if(element.workerrole=="Manager"){
           afficherleworker(element,value);
}
})}

function afficherleworker(element,value){
 workersplaceinselectmodal.innerHTML+=`
            <div id="selectcarte" onClick= "displayin_zone(${element.id},${value})">
                                <div class="workerimage" style="background:url(${element.workerphotolink});
                                background-size:cover"></div>
                                <div>
                                    <div><b>${element.workername}</b></div>
                                    <div><p>${element.workerrole}</p></div>
                                </div>
            </div>
            `
}
// _______________________________________ workers in Zone ____________________________________________ //
function displayin_zone(id){
workersmemory.find((x)=>x.id===id).workerlocation = "sécurité";
affichage()
}
    
