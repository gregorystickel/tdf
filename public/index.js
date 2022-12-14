function createStageCard(stage, year) {
  console.log(stage, year);
  axios
    .get("/api/stage", {
      params: { stage: stage, year: year },
    })
    .then(function (response) {
      console.log(response.data);
      if (response.data.length !== 0) {
        let { origin, stage, type, winner, winner_country, year } =
          response.data[0];
        console.log(origin, stage, type, winner, winner_country, year);
        let div = document.createElement("li");
        div.innerHTML = `Year: ${year}<br>Stage: ${stage}<br>Rider name: ${winner}<br>Location: ${origin}<br>Type: ${type}<br>Country: ${winner_country}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", deleteCard);
        const results = document.querySelector("ul");
        div.appendChild(deleteBtn);
        results.appendChild(div);
        console.log(response.data.length);
      } else {
        alert("No Records Found");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function deleteCard(event) {
  event.target.parentNode.remove();
  console.log("delete");
}

function createRiderCard(rider) {
  console.log(rider);
  axios
    .get("/api/rider", { params: { rider: rider } })
    .then(function (response) {
      console.log(response.data.length);
      for (let i = 0; i < response.data.length; i++) {
        let { origin, stage, type, winner, winner_country, year } =
          response.data[i];
        console.log(origin, stage, type, winner, winner_country, year);
        let div = document.createElement("li");
        div.innerHTML = `Year: ${year}<br>Stage: ${stage}<br>Rider name: ${winner}<br>Location: ${origin}<br>Type: ${type}<br>Country: ${winner_country}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", deleteCard);
        const results = document.querySelector("ul");
        div.appendChild(deleteBtn);
        results.appendChild(div);
      }
      if (response.data.length == 0) {
        alert("No Records Found");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function createNewData(
  stage,
  year,
  distance,
  origin,
  destination,
  type,
  winner,
  winner_country
) {
  console.log("button clicked!");
  console.log(
    stage,
    year,
    distance,
    origin,
    destination,
    type,
    winner,
    winner_country
  );
  axios
    .post("/api/data", {
      stage: stage,
      year: year,
      distance: distance,
      origin: origin,
      destination: destination,
      type: type,
      winner: winner,
      winner_country: winner_country,
    })
    .then(function (response) {
      console.log(response);
      if (response.data[1] === false) {
        alert("Data Already Exists!");
      } else {
        alert("Data Submitted Successfully");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
function deleteData(stage, year) {
  if (
    document.getElementById("deleteStage").value.length === 0 ||
    document.getElementById("deleteYear").value.length === 0
  ) {
    alert("There is an empty field!");
  } else {
    axios
      .delete("/api/data", {
        data: {
          stage: stage,
          year: year,
        },
      })

      .then(function (response) {
        console.log(response);
        if (response.data > 0) {
          alert(`Records Deleted: ${response.data}`);
        } else {
          alert("No Records Found");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("No Records Found");
      });
  }
}

function openEntryForm() {
  document.getElementById("enterData").style.display = "block";
  document.getElementById("enterData").scrollIntoView(true);
}

function closeEntryForm() {
  document.getElementById("enterData").style.display = "none";
}

function openDeleteForm() {
  document.getElementById("deleteDataForm").style.display = "block";
}

function closeDeleteForm() {
  document.getElementById("deleteDataForm").style.display = "none";
}

let submitStage = document.getElementById("submitStage");
let submitRider = document.getElementById("submitRider");
let submitNewData = document.getElementById("enterNewData");
let submitDeleteData = document.getElementById("deleteData");

submitStage.addEventListener("click", function () {
  event.preventDefault();
  createStageCard(
    document.getElementById("stage").value,
    document.getElementById("year").value
  );
});
submitRider.addEventListener("click", function () {
  event.preventDefault();
  createRiderCard(document.getElementById("rider").value);
});
submitNewData.addEventListener("click", function () {
  event.preventDefault();
  if (
    document.getElementById("enterStage").value.length == 0 ||
    document.getElementById("enterYear").value.length == 0 ||
    document.getElementById("enterDistance").value.length == 0 ||
    document.getElementById("enterOrigin").value.length == 0 ||
    document.getElementById("enterDestination").value.length == 0 ||
    document.getElementById("enterType").value.length == 0 ||
    document.getElementById("enterWinner").value.length == 0 ||
    document.getElementById("enterCountry").value.length == 0
  ) {
    alert("There is an empty field!");
  } else {
    createNewData(
      document.getElementById("enterStage").value,
      document.getElementById("enterYear").value,
      document.getElementById("enterDistance").value,
      document.getElementById("enterOrigin").value,
      document.getElementById("enterDestination").value,
      document.getElementById("enterType").value,
      document.getElementById("enterWinner").value,
      document.getElementById("enterCountry").value
    );
  }
});
submitDeleteData.addEventListener("click", function () {
  event.preventDefault();
  deleteData(
    document.getElementById("deleteStage").value,
    document.getElementById("deleteYear").value
  );
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
