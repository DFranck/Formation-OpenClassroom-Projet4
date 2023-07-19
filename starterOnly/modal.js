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
const formData = document.querySelectorAll(".formData");
const FormCloser = document.querySelector(".close");
//selection de tout les input de type text et checkbox
const inputs = document.querySelectorAll(
  "input.text-control, input.checkbox-input"
);
//Selection de toute les radio
const whatChecked = Array.from(
  document.querySelectorAll(
    "#location1, #location2, #location3, #location4, #location5, #location6"
  )
);
//selection des spans pour les messages derreurs
const firstErrorSpan = document.querySelector(".first-error");
const lastErrorSpan = document.querySelector(".last-error");
const emailErrorSpan = document.querySelector(".email-error");
const birthdateErrorSpan = document.querySelector(".birthdate-error");
const quantityErrorSpan = document.querySelector(".quantity-error");
const locationsErrorSpan = document.querySelector(".locations-error");
const cgvErrorSpan = document.querySelector(".cgv-error");
const infosEventsSpan = document.querySelector(".infos-events");
const cgv = document.getElementById("checkbox1");
const infosEvents = document.getElementById("checkbox2");
// variable qui dois finir sur true pour valider le formulaire
let formValid = true;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Fermeture du formulaire avec la croix ".close"

FormCloser.addEventListener("click", () => {
  modalbg.style.display = "none";
});

//Ecoute CHAQUE INPUT
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    checkinput(e.target);
  });
});
//FONCTION CONTROLE CHAQUE INPUT a chaque changement d'input
const checkinput = (input) => {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let birthdateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  let numberRegex = /^[0-9][0-9]?$/;
  //controle if a radio is checked
  let isOneChecked = whatChecked.some((checkbox) => checkbox.checked);
  //controle le prénom et ajoute un message si celui ci n'est pas correct
  if (input.id === "first" && input.value.length < 3) {
    formValid = false;
    firstErrorSpan.innerHTML = `<p>Veuillez renseigner au minimum 3 caractères dans prénom</p>`;
  } else if (input.id === "first" && input.value.length >= 3) {
    firstErrorSpan.innerHTML = ``;
  }

  //controle le nom et ajoute un message si celui ci n'est pas correct
  if (input.id === "last" && input.value.length < 3) {
    formValid = false;
    lastErrorSpan.innerHTML = `<p>Veuillez renseigner au minimum 3 caractères dans nom</p>`;
  } else if (input.id === "last" && input.value.length >= 3) {
    lastErrorSpan.innerHTML = ``;
  }
  //controle lemail et ajoute un message si celui ci n'est pas correct
  if (input.id === "email" && !emailRegex.test(input.value)) {
    formValid = false;
    emailErrorSpan.innerHTML = `<p>Attention votre adresse email n'est pas valide</p>`;
  } else if (input.id === "email" && emailRegex.test(input.value)) {
    emailErrorSpan.innerHTML = ``;
  }
  //controle la date de naissance et ajoute un message si celle ci n'est pas correct
  if (input.id === "birthdate" && !birthdateRegex.test(input.value)) {
    formValid = false;
    birthdateErrorSpan.innerHTML =
      "<p>Attention cette date n'est pas valide</p>";
  } else if (input.id === "birthdate" && birthdateRegex.test(input.value)) {
    birthdateErrorSpan.innerHTML = "";
  }
  //controle le nombre de tournoi et ajoute un message si celui ci n'est pas correct
  if (input.id === "quantity" && !numberRegex.test(input.value)) {
    formValid = false;
    quantityErrorSpan.innerHTML =
      "<p>Veuillez ne renseigner uniquement des chiffres de 0 a 99</p>";
  } else if (input.id === "quantity" && numberRegex.test(input.value)) {
    quantityErrorSpan.innerHTML = "";
  }
  //controle la selection de radio et ajoute un message si celle ci n'est pas correct
  if (!isOneChecked) {
    formValid = false;
    locationsErrorSpan.innerHTML =
      "<p>Veuillez selection le tournoi que vous souhaitez faire</p>";
  } else {
    locationsErrorSpan.innerHTML = "";
  }
  //controle laccord des CGV et ajoute un message si celle ci n'est pas correct
  if (!cgv.checked) {
    formValid = false;
    cgvErrorSpan.innerHTML = "<p>Veuillez accepter les CGV</p>";
  } else {
    cgvErrorSpan.innerHTML = "";
  }
  //controle si l'utilisateur souhaite recevoir des news et ajoute un message si celle ci est souhaitée
  if (infosEvents.checked) {
    infosEventsSpan.innerHTML =
      "<p>Nous vous tiendrons informé des prochains évèneemnts</p>";
  } else {
    infosEventsSpan.innerHTML = "<p></p>";
  }
};
//FONCTION CONTROLE LORS DE SUBMIT
const controlForm = () => {
  formValid = true;
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let birthdateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  let numberRegex = /^[0-9][0-9]?$/;

  inputs.forEach((input) => {
    let isOneChecked = whatChecked.some((checkbox) => checkbox.checked);
    if (input.id === "first" && input.value.length < 3) {
      formValid = false;
      firstErrorSpan.innerHTML = `<p>Veuillez renseigner au minimum 3 caractères dans prénom</p>`;
    }
    if (input.id === "last" && input.value.length < 3) {
      formValid = false;
      lastErrorSpan.innerHTML = `<p>Veuillez renseigner au minimum 3 caractères dans nom</p>`;
    }
    if (input.id === "email" && !emailRegex.test(input.value)) {
      formValid = false;
      emailErrorSpan.innerHTML = `<p>Attention votre adresse email n'est pas valide</p>`;
    }
    if (input.id === "birthdate" && !birthdateRegex.test(input.value)) {
      formValid = false;
      birthdateErrorSpan.innerHTML =
        "<p>Attention cette date n'est pas valide</p>";
    }
    if (input.id === "quantity" && !numberRegex.test(input.value)) {
      formValid = false;
      quantityErrorSpan.innerHTML =
        "<p>Veuillez ne renseigner uniquement des chiffres de 0 a 99</p>";
    }
    if (!isOneChecked) {
      formValid = false;
      locationsErrorSpan.innerHTML =
        "<p>Veuillez selection le tournoi que vous souhaitez faire</p>";
    }
    if (!cgv.checked) {
      formValid = false;
      cgvErrorSpan.innerHTML = "<p>Veuillez accepter les CGV</p>";
    }
    if (infosEvents.checked) {
      infosEventsSpan.innerHTML =
        "<p>Nous vous tiendrons informé des prochains évèneemnts</p>";
    }
  });
};

//APPEL FONCTION SUBMIT
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  controlForm();
  if (!formValid) {
    console.log("formulaire non complet");
  } else {
    alert("Félicitation vous ètes inscrit");
    let formData = new FormData(e.target);

    for (let [key, value] of formData.entries()) {
      localStorage.setItem(key, value);
    }
  }
  e.preventDefault();
});
