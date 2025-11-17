//Les variaiables / tableaux //
let Update_worker_btn = document.getElementById("Update-worker-btn");
let close_btn = document.getElementById("close_btn");
let counter = 0;
let workers = [];
let workercarte = document.querySelector(".workercarte");


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
if(name==""||photolink.value==""||email==""||phonenumber==""){
    alert("error");
    e.preventDefault();
    document.getElementById("blurbackround").style.display="flex";
}
else{
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
workerszone.innerHTML+=`<div class="workercarte">
                        <div class="workerimage"; style="background:url(${worker.workerphotolink});background-size:cover"></div>
                        <div>
                        <div><b>${worker.workername}</b></div>
                       <div><p>${worker.workerrole}</p></div>
                       </div>
                       </div>`
for(element of workerszone){
workercarte.classList.add("workerszone");
}
}
})
photolink.addEventListener("change",(e)=>{
    document.getElementById("imageplace").style.backgroundImage=`url(${photolink.value})`;
})
