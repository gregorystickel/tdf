//const axios = require("axios");


function createStageCard (stage, year) {
    console.log('button clicked!')
    console.log(stage,year)
    axios.get('http://localhost:4000/api/stage', { params: { stage: stage, year: year}})
        .then(function (response) {
         console.log(response.data);
         let {origin, stage, type, winner, winner_country, year} = response.data[0]
         console.log(origin, stage, type, winner, winner_country, year);
         let div = document.createElement("li")
         div.innerHTML = `Year: ${year}<br>Stage: ${stage}<br>Rider name: ${winner}<br>Location: ${origin}<br>Type: ${type}<br>Country: ${winner_country}`
         const deleteBtn = document.createElement("button");
         deleteBtn.textContent = "Delete";
         deleteBtn.addEventListener("click", deleteCard);
         const results = document.querySelector("ul")
         div.appendChild(deleteBtn);
         results.appendChild(div)
    }).catch(function (error) {
         console.error(error);
    });
}

function deleteCard(event) {
    event.target.parentNode.remove();
    console.log("delete")
}

function createRiderCard (rider) {
    console.log('button clicked!')
    console.log(rider)
    axios.get('http://localhost:4000/api/rider', { params: { rider: rider}})
        .then(function (response) {
         console.log(response.data.length);
         for (let i = 0; i < response.data.length; i++) {
         let {origin, stage, type, winner, winner_country, year} = response.data[i]
         console.log(origin, stage, type, winner, winner_country, year);
         let div = document.createElement("li")
         div.innerHTML = `Year: ${year}<br>Stage: ${stage}<br>Rider name: ${winner}<br>Location: ${origin}<br>Type: ${type}<br>Country: ${winner_country}`
         const deleteBtn = document.createElement("button");
         deleteBtn.textContent = "Delete";
         deleteBtn.addEventListener("click", deleteCard);
         const results = document.querySelector("ul")
         div.appendChild(deleteBtn);
         results.appendChild(div)
        }
    }).catch(function (error) {
         console.error(error);
    });
}
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
   document.getElementById("myForm").style.display = "none";
  }
 
let submitStage = document.getElementById("submitStage")
let submitRider = document.getElementById("submitRider")
console.log(submitStage)
submitStage.addEventListener('click', function(){
    event.preventDefault();
    createStageCard(document.getElementById("stage").value, document.getElementById("year").value);
});
submitRider.addEventListener('click', function(){
    event.preventDefault();
    createRiderCard(document.getElementById("rider").value);
});