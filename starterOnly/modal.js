function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnCloser = document.querySelector(".close");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const birthdateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const numberRegex = /^[0-9][0-9]?$/;
let formValid = false;
let firstNameOk = false;
let lastNameOk = false;
let emailOk = false;
let birthdateOk = false;
let tournamentQuantityOk = false;
let tournamentSelectOk = false;
let cgvOk = true;
const inputs = document.querySelectorAll(
  "input.text-control, input.checkbox-input"
);
const TournamentArray = Array.from(
  document.querySelectorAll(
    "#location1, #location2, #location3, #location4, #location5, #location6"
  )
);
const firstNameErrorSpan = document.querySelector(".first-error");
firstNameErrorSpan.innerHTML = `<p>Veuillez renseigner 3 caractères minimum</p>`;
const lastNameErrorSpan = document.querySelector(".last-error");
lastNameErrorSpan.innerHTML = `<p>Veuillez renseigner 3 caractères minimum</p>`;
const emailErrorSpan = document.querySelector(".email-error");
emailErrorSpan.innerHTML = `<p>Votre adresse email n'est pas valide</p>`;
const birthdateErrorSpan = document.querySelector(".birthdate-error");
birthdateErrorSpan.innerHTML = "<p>Attention cette date n'est pas valide</p>";
const quantityErrorSpan = document.querySelector(".quantity-error");
quantityErrorSpan.innerHTML = "<p>Renseigner un chiffres entre 0 et 99</p>";
const locationsErrorSpan = document.querySelector(".locations-error");
locationsErrorSpan.innerHTML = "<p>Choisissez votre tournoi</p>";
const cgvErrorSpan = document.querySelector(".cgv-error");
cgvErrorSpan.innerHTML = "<p>Veuillez accepter les CGV</p>";
const infosEventsSpan = document.querySelector(".infos-events");
infosEventsSpan.innerHTML =
  "<p>Nous vous tiendrons informé des prochains évènements</p>";
const cgv = document.getElementById("checkbox1");
const infosEvents = document.getElementById("checkbox2");

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  modalbg.style.display = "block";
}
modalBtnCloser.addEventListener("click", () => {
  modalbg.style.display = "none";
});

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    inputControl(e.target);
  });
});

const inputControl = (input) => {
  let isOneTournamentChecked = TournamentArray.some(
    (checkbox) => checkbox.checked
  );
  if (
    input.id === "first" &&
    (input.value.length < 3 || input.value.includes(" "))
  ) {
    firstNameOk = false;
    firstNameErrorSpan.style.opacity = 1;
  } else if (input.id === "first") {
    firstNameOk = true;
    firstNameErrorSpan.style.opacity = 0;
  }
  if (
    input.id === "last" &&
    (input.value.length < 3 || input.value.includes(" "))
  ) {
    lastNameOk = false;
    lastNameErrorSpan.style.opacity = 1;
  } else if (input.id === "last") {
    lastNameOk = true;
    lastNameErrorSpan.style.opacity = 0;
  }
  if (input.id === "email" && !emailRegex.test(input.value)) {
    emailOk = false;
    emailErrorSpan.style.opacity = 1;
  } else if (input.id === "email") {
    emailOk = true;
    emailErrorSpan.style.opacity = 0;
  }
  if (input.id === "birthdate" && !birthdateRegex.test(input.value)) {
    birthdateOk = false;
    birthdateErrorSpan.style.opacity = 1;
  } else if (input.id === "birthdate") {
    birthdateOk = true;
    birthdateErrorSpan.style.opacity = 0;
  }
  if (input.id === "quantity" && !numberRegex.test(input.value)) {
    tournamentQuantityOk = false;
    quantityErrorSpan.style.opacity = 1;
  } else if (input.id === "quantity" && numberRegex.test(input.value)) {
    tournamentQuantityOk = true;
    quantityErrorSpan.style.opacity = 0;
  }
  if (!isOneTournamentChecked) {
    locationsErrorSpan.style.opacity = 1;
    tournamentSelectOk = false;
  } else if (isOneTournamentChecked) {
    tournamentSelectOk = true;
    locationsErrorSpan.style.opacity = 0;
  }
  if (!cgv.checked) {
    cgvOk = false;
    cgvErrorSpan.style.opacity = 1;
  } else {
    cgvOk = true;
    cgvErrorSpan.style.opacity = 0;
  }
  if (infosEvents.checked) {
    infosEventsSpan.style.opacity = 1;
  } else {
    infosEventsSpan.style.opacity = 0;
  }
};

const FormControl = () => {
  if (
    firstNameOk &&
    lastNameOk &&
    emailOk &&
    birthdateOk &&
    tournamentQuantityOk &&
    tournamentSelectOk &&
    cgvOk
  ) {
    formValid = true;
  } else {
    formValid = false;
  }
  if (!firstNameOk) {
    firstNameErrorSpan.style.opacity = 1;
  }
  if (!lastNameOk) {
    lastNameErrorSpan.style.opacity = 1;
  }
  if (!emailOk) {
    emailErrorSpan.style.opacity = 1;
  }
  if (!birthdateOk) {
    birthdateErrorSpan.style.opacity = 1;
  }
  if (!tournamentQuantityOk) {
    quantityErrorSpan.style.opacity = 1;
  }
  if (!tournamentSelectOk) {
    locationsErrorSpan.style.opacity = 1;
  }
  if (!cgvOk) {
    cgvErrorSpan.style.opacity = 1;
  }
};
//ISSUE 2 APPEL FONCTION SUBMIT
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  FormControl();
  if (!formValid) {
    console.log("formulaire non complet");
  } else {
    document.querySelector(".submit-ok").innerHTML = `
    <p>Merci ! Votre réservation a été reçue.</p>
    `;
    document.querySelector("form").style.display = "none";
    document.querySelector("form").reset();
    firstNameOk = false;
    lastNameOk = false;
    emailOk = false;
    birthdateOk = false;
    tournamentQuantityOk = false;
    tournamentSelectOk = false;
    let intervalId = setInterval(() => {
      modalbg.style.display = "none";
      document.querySelector(".submit-ok").innerHTML = `
    `;
      document.querySelector("form").style.display = "block";
      clearInterval(intervalId);
    }, 3000);
  }
});
