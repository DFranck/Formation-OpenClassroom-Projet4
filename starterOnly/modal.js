function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const FormCloser = document.querySelector(".close");
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let birthdateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
let numberRegex = /^[0-9][0-9]?$/;
//ISSUE 2 selection de tout les input de type text et checkbox
const inputs = document.querySelectorAll(
  "input.text-control, input.checkbox-input"
);
//ISSUE 2 Selection de toute les radio
const whatChecked = Array.from(
  document.querySelectorAll(
    "#location1, #location2, #location3, #location4, #location5, #location6"
  )
);
//Messages derreurs
const firstErrorSpan = document.querySelector(".first-error");
firstErrorSpan.innerHTML = `<p>Veuillez renseigner 3 caractères minimum</p>`;
const lastErrorSpan = document.querySelector(".last-error");
lastErrorSpan.innerHTML = `<p>Veuillez renseigner 3 caractères minimum</p>`;
const emailErrorSpan = document.querySelector(".email-error");
emailErrorSpan.innerHTML = `<p>Votre adresse email n'est pas valide</p>`;
const birthdateErrorSpan = document.querySelector(".birthdate-error");
birthdateErrorSpan.innerHTML = "<p>Attention cette date n'est pas valide</p>";
const quantityErrorSpan = document.querySelector(".quantity-error");
quantityErrorSpan.innerHTML = "<p>Renseigner un chiffres entre 0 et 99</p>";
const locationsErrorSpan = document.querySelector(".locations-error");
locationsErrorSpan.innerHTML = "<p>Choisissez votre tournois</p>";
const cgvErrorSpan = document.querySelector(".cgv-error");
cgvErrorSpan.innerHTML = "<p>Veuillez accepter les CGV</p>";
const infosEventsSpan = document.querySelector(".infos-events");
infosEventsSpan.innerHTML =
  "<p>Nous vous tiendrons informé des prochains évènements</p>";
const cgv = document.getElementById("checkbox1");
const infosEvents = document.getElementById("checkbox2");
// ISSUE 2 variable qui dois finir sur true pour valider le formulaire
let formValid = false;
let firstNameOk = false;
let lastNameOk = false;
let emailOk = false;
let birthdateOk = false;
let quantityOk = false;
let tournamentOk = false;
let cgvOk = true;
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// ISSUE 1 Fermeture du formulaire avec la croix ".close"

FormCloser.addEventListener("click", () => {
  modalbg.style.display = "none";
});

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    checkinput(e.target);
  });
});

const checkinput = (input) => {
  let isOneChecked = whatChecked.some((checkbox) => checkbox.checked);
  if (
    input.id === "first" &&
    (input.value.length < 3 || input.value.includes(" "))
  ) {
    firstNameOk = false;
    firstErrorSpan.style.opacity = 1;
  } else if (input.id === "first") {
    firstNameOk = true;
    firstErrorSpan.style.opacity = 0;
  }
  if (
    input.id === "last" &&
    (input.value.length < 3 || input.value.includes(" "))
  ) {
    lastNameOk = false;
    lastErrorSpan.style.opacity = 1;
  } else if (input.id === "last") {
    lastNameOk = true;
    lastErrorSpan.style.opacity = 0;
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
    quantityOk = false;
    quantityErrorSpan.style.opacity = 1;
  } else if (input.id === "quantity" && numberRegex.test(input.value)) {
    quantityOk = true;
    quantityErrorSpan.style.opacity = 0;
  }
  if (!isOneChecked) {
    locationsErrorSpan.style.opacity = 1;
    tournamentOk = false;
  } else if (isOneChecked) {
    tournamentOk = true;
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

//ISSUE 2 FONCTION CONTROLE LORS DE SUBMIT
const controlForm = () => {
  if (
    firstNameOk &&
    lastNameOk &&
    emailOk &&
    birthdateOk &&
    quantityOk &&
    tournamentOk &&
    cgvOk
  ) {
    formValid = true;
  } else {
    formValid = false;
  }
  if (!firstNameOk) {
    firstErrorSpan.style.opacity = 1;
  }
  if (!lastNameOk) {
    lastErrorSpan.style.opacity = 1;
  }
  if (!emailOk) {
    emailErrorSpan.style.opacity = 1;
  }
  if (!birthdateOk) {
    birthdateErrorSpan.style.opacity = 1;
  }
  if (!quantityOk) {
    quantityErrorSpan.style.opacity = 1;
  }
  if (!tournamentOk) {
    locationsErrorSpan.style.opacity = 1;
  }
  if (!cgvOk) {
    cgvErrorSpan.style.opacity = 1;
  }
};
//ISSUE 2 APPEL FONCTION SUBMIT
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  controlForm();
  if (!formValid) {
    console.log("formulaire non complet");
  } else {
    document.querySelector(".submit-ok").innerHTML = `
    <h2>Merci ! Votre réservation a été reçue.</h2>
    `;
    document.querySelector("form").style.display = "none";
    document.querySelector("form").reset();
    firstNameOk = false;
    lastNameOk = false;
    emailOk = false;
    birthdateOk = false;
    quantityOk = false;
    tournamentOk = false;
    let intervalId = setInterval(() => {
      modalbg.style.display = "none";
      document.querySelector(".submit-ok").innerHTML = `
    `;
      document.querySelector("form").style.display = "block";
      clearInterval(intervalId);
    }, 3000);
  }
});
