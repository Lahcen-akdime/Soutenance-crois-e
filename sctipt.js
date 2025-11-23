//____________________________ Les variaiables / tableaux _____________________________ //
let counter2 = 0; //pour le counter d'experience //
let workerszone = document.querySelector(".workerszone"); // aside worker place
let zones = document.getElementsByClassName("zonecrd");
// _______________________________ Local storage data _________________________________ //
let newid = JSON.parse(localStorage.getItem("id")) || 0; // id de chaque object //
let workersmemory = JSON.parse(localStorage.getItem("worker")) || []; // array of objects
// ____________________________________________________________________________________ //
const formCreateWorker = document.getElementById("form-create-worker");
const workercarte = document.querySelector(".workercarte"); // class css de carte
// regex
const emailregex = /^[\w.-]+@[\w-]+\.[A-Za-z]{2,}$/;
const phoneregex = /^\d{10}$/;
const lienregex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
const dateregex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20[0-9]{2})$/;
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
const workersplaceinselectmodal = document.getElementById("workersplace");
// addexperieces
const Addexperiencebtn = document.getElementById("Addexperience-btn");
const toaddnewexperiencecarte = document.getElementById("allexperiences");
const Experiencecarte = document.getElementsByClassName("Experiencecarte")[0];
// ________________________________ add a experience ___________________________________ //
Addexperiencebtn.addEventListener("click", (e) => {
  toaddnewexperiencecarte.insertAdjacentHTML("beforeend", `<div class="Experiencecarte">
                <label for="">Company :</label>
                <input type="text" id="companyname">
                <label for="">Role :</label>
                <input type="text" id="role-in-company">
                <label for="">From :</label>
                <input type="date" id="debut">
                <label for="">To :</label>
                <input type="date" id="fin">
            </div>`);
});

function displayform() {
  document.getElementById("blurbackround").style.display = "flex";
  // ______________________ clear the experiences place ____________________________ //
    toaddnewexperiencecarte.innerHTML= `<div class="Experiencecarte">
                <label for="">Company :</label>
                <input type="text" id="companyname">
                <label for="">Role :</label>
                <input type="text" id="role-in-company">
                <label for="">From :</label>
                <input type="date" id="debut">
                <label for="">To :</label>
                <input type="date" id="fin">
            </div>`
}
// _______________________________ display image ___________________________________ //
photolink.addEventListener("change", (e) => {
document.getElementById("imageplace").style.backgroundImage = `url(${photolink.value})`;
});
// _____________________________________ submit ______________________________________ //
formCreateWorker.addEventListener("submit", (e) => {
  e.preventDefault();
  // date experiences regex //
let AllExperiencecartes = document.querySelectorAll(".Experiencecarte");
    AllExperiencecartes.forEach(experienceCard => {
      let datedebut = experienceCard.querySelector("#debut").value;
      let datefin = experienceCard.querySelector("#fin").value;
    if(new Date(datedebut) > new Date()){
     alert("Pardon ! la date de debut d'experience est incorrect");
    }
    else if(new Date(datedebut) > new Date(datefin)){
    alert("Pardon ! la date de fin d'experience est incorrect");
    }
  });
  // __________________________ inputs values _____________________________ //
  let name = document.getElementById("name").value;
  let role = document.getElementsByTagName("select")[0].value;
  let photolink = document.getElementById("photolink");
  let email = document.getElementById("email").value;
  let phonenumber = document.getElementById("phonenumber").value;
  // _______________________________ Regex _______________________________ //
  if (name.trim() == "" || email.trim() == "" || phonenumber.trim() == "") {
    alert("Le formulaire est vide !");
   } else if (!emailregex.test(email)) {
    alert("pardon , l'email est incorrect , entrez la form correct de gmail pour valider");
   }
  else {
    // _____________________________ l'object d'experiences _____________________________ //
    let allexperiencestable = [];
let AllExperiencecartes = document.querySelectorAll(".Experiencecarte");
    AllExperiencecartes.forEach((experienceCard) => {
      let company = experienceCard.querySelector("#companyname").value;
      let role_incompany = experienceCard.querySelector("#role-in-company").value;
      let datedebut = experienceCard.querySelector("#debut").value;
      let datefin = experienceCard.querySelector("#fin").value;
      experience = {
        id: counter2,
        companyname: company,
        role_in_company: role_incompany,
        date_debut_with_company: datedebut,
        date_end_with_company: datefin,
      };
      counter2 += 1;
      allexperiencestable.push(experience);
    });
    // _____________________________ l'object principale _____________________________ //
    const worker = {
      id: newid++,
      workername: name,
      workerrole: role,
      workerphotolink: photolink.value,
      workeremail: email,
      workerphonenumber: phonenumber,
      experiences: allexperiencestable,
      workerlocation: "Unassigned",
    };
    workersmemory.push(worker);
    // _____________________________ Local storage setItem _____________________________ //
    localStorage.setItem("worker", JSON.stringify(workersmemory));
    localStorage.setItem("id", JSON.stringify(newid));
    // ______________________________ reset the form ___________________________________ //
    document.getElementById("blurbackround").style.display = "none"; 
    document.getElementsByTagName("form")[0].reset();
    // ________________________________ Affichage ______________________________________ //
    affichage();
  }
});
// ________________________ display modal of description _______________________________ //
function showdescriptionmodal(objectid) {
 const workerexperiencesplace = document.getElementById("experiences-place");
  modaldescription.style.display = "flex";
  let selectedworker = workersmemory.find((x) => x.id === objectid);
  workernameinmodal.innerHTML = selectedworker.workername;
  workerroleinmodal.innerHTML = selectedworker.workerrole;
  workerimageinmodal.style.backgroundImage = `url(${selectedworker.workerphotolink})`;
  workeremailinmodal.innerHTML = selectedworker.workeremail;
  workernumberinmodal.innerHTML = selectedworker.workerphonenumber;
  workerlocationinmodal.innerHTML = selectedworker.workerlocation;
  let array2 = selectedworker.experiences;
  workerexperiencesplace.innerHTML = "";
  array2.forEach(element =>{
    workerexperiencesplace.innerHTML += `
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
  })
}
function returntomain() {
  document.getElementById("blurbackround").style.display = "none";
  modaldescription.style.display = "none";
  selectmodal.style.display = "none";
}
// __________________________________________ Affichage __________________________________________ //
function affichage() {
  workerszone.innerHTML = "";
  workersmemory.forEach((element) => {
    if (element.workerlocation == "Unassigned") {
      workerszone.innerHTML += `<div class="workercarte" data-loc-ation="unassigned"
     onClick="showdescriptionmodal(${element.id})">
        <div class="workerimage"; style="background:url(${element.workerphotolink});
        background-size:cover"></div>
        <div>
        <div><b>${element.workername}</b></div>
        <div><p>${element.workerrole}</p></div>
        </div>
        </div>`;
    }
  });
}
// __________________________________________ Modal 3 __________________________________________ //
function showselectmodal(id, value) {
  selectmodal.style.display = "flex";
  workersplaceinselectmodal.innerHTML = "";
  workersmemory.forEach((element) => {
    if (element.workerlocation == "Unassigned") {
      // conditions pour les paraméttres de chaque sale
      if (id == element.workerrole) {
        afficherleworker(element, value);
      }
      if (element.workerrole == "Netoyage" && value != "vault") {
        afficherleworker(element, value);
      } else if (element.workerrole == "Autre") {
        if (value == "staff" || value == "vault" || value == "conference") {
          afficherleworker(element, value);
        }
      } else if (element.workerrole == "Manager") {
        afficherleworker(element, value);
      }
    }
  });
}
function afficherleworker(element, value) {
  workersplaceinselectmodal.innerHTML += `
            <div id="selectcarte" onClick= "assigner_displayin_zone(${element.id},'${value}')">
                                <div class="workerimage" style="background:url(${element.workerphotolink});background-size:cover">
                                </div>
                                <div>
                                    <div><b>${element.workername}</b></div>
                                    <div><p>${element.workerrole}</p></div>
                                </div>
            </div>
            `;
}
// __________________________________________ Add workers in Zone __________________________________________ //
function assigner_displayin_zone(id, value) {
  const worker = workersmemory.find((x) => x.id === id);
  worker.workerlocation = value
  localStorage.setItem("worker", JSON.stringify(workersmemory));
  load_displayin_zone(worker, value);
  selectmodal.style.display = "none";
Zone_empty_red_background()
}
function load_displayin_zone(worker, value) {
  // console.log(value)
  const workerplace = document.getElementsByClassName(value)[0];
  workerplace.innerHTML += `<div class="carte"><div style="display:flex" onClick="showdescriptionmodal(${worker.id})">
                           <div class="image3place" style = "background : url(${worker.workerphotolink});background-size:cover"></div>
                           <div style="font-size:10px;margin:0" > name : ${worker.workername} <br>role : ${worker.workerrole}</div></div>
                           <button id="deletebtn" onClick="restoretoaside(${worker.id})">-</button>
                    </div>`;     
  affichage();
}
function restoretoaside(id) {
  workersmemory.find((x) => x.id === id).workerlocation = "Unassigned";
  localStorage.setItem("worker", JSON.stringify(workersmemory));
 organization ()
Zone_empty_red_background()

}
// __________________________________ Display worker by location in Zone _____________________________________ //
function organization (){
  // clear toute les zones
 Array.from(zones).forEach(zone => {
     zone.innerHTML=""
  })
  //
workersmemory.forEach(element => {
  if(element.workerlocation!="Unassigned"){
    load_displayin_zone(element, element.workerlocation)
  }
  });
  affichage();
}
organization ()
// _______________________________________ Zone empty == red background _______________________________________ //
function Zone_empty_red_background() {
  Array.from(zones).forEach(zone => {
      if(zone.querySelector(".carte")==null){
       zone.parentElement.style.background ="rgba(248, 3, 3, 0.30)";
      }
      else{
       zone.parentElement.style.background=" rgba(4, 252, 8, 0.16)";
      }
   })
}
Zone_empty_red_background()


