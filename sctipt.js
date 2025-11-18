//===================== Les variaiables / tableaux ==================================//
let counter = 0;
let counter2 = 0;
let workers = [];
let worker = {};
let experiences ;
let experience ={} ;
let workerszone = document.getElementsByClassName("workerszone")[0];
let workerexperiences = [];
const Update_worker_btn = document.getElementById("Update-worker-btn");
const close_btn = document.getElementById("close_btn");
const workercarte = document.querySelector(".workercarte");
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
// modal3 - add in section
const selectmodal = document.getElementsByClassName("forblurmodal3")[0];

// selectmodal.style.display="flex";


// addexperieces
const Addexperiencebtn = document.getElementById("Addexperience-btn");
const toaddnewexperiencecarte = document.getElementById("allexperiences");
const Experiencecarte = document.getElementsByClassName("Experiencecarte")[0];
modaldescription.style.display="none";
// =============================== Les button =========================================//
function displayform(){
    document.getElementById("blurbackround").style.display="flex";
}
// =============================== submit ============================================ //
Update_worker_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    document.getElementById("blurbackround").style.display="none";
    // ============================= inputs values =================================== //
    let name = document.getElementById("name").value;
    let role = document.getElementsByTagName("select")[0].value;
    let photolink = document.getElementById("photolink");
    let email = document.getElementById("email").value;
    let phonenumber = document.getElementById("phonenumber").value;
    // ================================ Regex ========================================= //
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
    // =========================== l'object d'experiences ================================= //
    // inputs experiences values 
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
        allexperiencestable.push(experience)
        counter2 +=1;
    });
    // ============================== l'object principale ================================= //
    worker = {
        id : counter ,
        workername : name ,
        workerrole : role,
        workerphotolink : photolink.value,
        workeremail : email,
        workerphonenumber : phonenumber,
        experiences : allexperiencestable ,
    }
    counter+=1;
    workerszone = document.getElementsByClassName("workerszone")[0];
    workers.push(worker)
    workerexperiences.push(experiences);
    console.log(worker)
    // ============================= Local storage setItem ==================================== //
    localStorage.setItem("worker",JSON.stringify(workers));
    // ===================================================================================== //
    affichage(workerszone,worker.id,worker.workerphotolink,worker.workername,worker.workerrole);


    // let workerscartes = document.querySelectorAll(".workercarte");
    // ============================== reste the form ====================================== //
    document.getElementsByTagName("form")[0].reset();
}
})
    // ================================== display image ==================================== //
photolink.addEventListener("change",(e)=>{
    document.getElementById("imageplace").style.backgroundImage=`url(${photolink.value})`;
})
    // ================================= add a experience =================================== // 
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
// ============================= display modal of description =============================== //
function showdescriptionmodal(e,objectid){
    console.log(e.currentTarget)
modaldescription.style.display="flex";
console.log(workers.find((x)=>x.id===objectid).workername);
workernameinmodal.innerHTML=`${workers.find((x)=>x.id===objectid).workername}`
workerroleinmodal.innerHTML=`${workers.find((x)=>x.id===objectid).workerrole}`
workerimageinmodal.style.backgroundImage=`url(${workers.find((x)=>x.id===objectid).workerphotolink})`
workeremailinmodal.innerHTML=`${workers.find((x)=>x.id===objectid).workeremail}`
workernumberinmodal.innerHTML=`${workers.find((x)=>x.id===objectid).workerphonenumber}`
let array = workers.find((x)=>x.id===objectid).experiences ;
for(element of array) {
workerexperiencesplace.innerHTML+=`
<div class="experiencediv">
    <div><h4 style="display: inline;">Place : </h4><p style="display: inline;">${element.companyname}</p></div>
                <ul>
                    <li><b>Role : </b><span>${element.role_in_company}</span></li>
                    <li><b>Period : </b><span>${element.date_debut_with_company}</span>- <span>${element.date_end_with_company}</span></li>
                </ul>
</div>`
};

}
function returntomain(){
    document.getElementById("blurbackround").style.display="none";
    modaldescription.style.display="none";
}
// ============================= Affichage ==================================== //
function affichage(workerszone,workerid,workerphotolink,workername,workerrole){
workerszone.innerHTML+=`<div class="workercarte" onClick ="showdescriptionmodal(event,${workerid})">
    <div class="workerimage"; style="background:url(${workerphotolink});background-size:cover"></div>
    <div>
    <div><b>${workername}</b></div>
    <div><p>${workerrole}</p></div>
    </div>
    </div>`
    localStorage.setItem("div",workerszone.innerHTML);

}
// let my_arr =[] ;
//     if(JSON.parse(localStorage.getItem('worker'))!=null){
//         my_arr = JSON.parse(localStorage.getItem('worker'));
//         for(let i =0;i<my_arr.length;i++){
//             workerszone.innerHTML+=`<div class="workercarte" onClick ="showdescriptionmodal(event,${Number(my_arr[i].id)})">
//     <div class="workerimage"; style="background:url(${my_arr[i].workerphotolink});background-size:cover"></div>
//     <div>
//     <div><b>${my_arr[i].workername}</b></div>
//     <div><p>${my_arr[i].workerrole}</p></div>
//     </div>
//     </div>`
//         }
//     }
//  if(localStorage.getItem('div')!=null){
//     workerszone.innerHTML= `${localStorage.getItem('div')}` 
//  }
   
    
