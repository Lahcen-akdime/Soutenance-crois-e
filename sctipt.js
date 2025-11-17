//Les variaiables / tableaux //
const Update_worker_btn = document.getElementById("Update-worker-btn");
const close_btn = document.getElementById("close_btn");
let counter = 0;
let workers = [];
let allworkers = [];
const workercarte = document.querySelector(".workercarte");
const emailregex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{3,}$/gm ;
const phoneregex = /^\d{10}$/;
const lienregex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;


//Les button//
function displayform(){
    document.getElementById("blurbackround").style.display="flex";
}
// submit //
Update_worker_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    document.getElementById("blurbackround").style.display="none";
    let name = document.getElementById("name").value;
    let role = document.getElementsByTagName("select")[0].value;
    let photolink = document.getElementById("photolink");
    
    
    let email = document.getElementById("email").value;
    let phonenumber = document.getElementById("phonenumber").value;
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
    let workerszone = document.getElementsByClassName("workerszone")[0];
    counter+=1;
    workers.push(worker)
    console.log(workers)
    console.log(worker.id)
    //Feauture add//
    workerszone.innerHTML+=`<div class="workercarte" onClick ="listen(event)">
    <div class="workerimage"; style="background:url(${worker.workerphotolink});background-size:cover"></div>
    <div>
    <div><b>${worker.workername}</b></div>
    <div><p>${worker.workerrole}</p></div>
    </div>
    </div>`
 
    let workerscartes = document.querySelectorAll(".workercarte");
                    
// for(element of workerscartes){
// workercarte.classList.add("workerszone");
// allworkers = querySelectorAll(".workercarte");
// console.log(allworkers);
// }
}
})
function listen(e){
    e.target.addEventListener("click",(v)=>{
        alert("oui")
    })
 
}
photolink.addEventListener("change",(e)=>{
    document.getElementById("imageplace").style.backgroundImage=`url(${photolink.value})`;
})
