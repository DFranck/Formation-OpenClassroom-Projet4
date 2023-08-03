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
//ISSUE 2 selection de tout les input de type text et checkbox
const inputs = document.querySelectorAll(
  "input.text-control, input.checkbox-input"
);
//selection des spans pour les messages derreurs

// const firstErrorSpan = document.querySelector(".last-error");
// const lastErrorSpan = document.querySelector(".last-error");
// const emailErrorSpan = document.querySelector(".email-error");
// const birthdateErrorSpan = document.querySelector(".birthdate-error");
// const quantityErrorSpan = document.querySelector(".quantity-error");
// const locationsErrorSpan = document.querySelector(".locations-error");
// const cgvErrorSpan = document.querySelector(".cgv-error");
const infosEventsSpan = document.querySelector(".infos-events");
const cgv = document.getElementById("checkbox1");
const infosEvents = document.getElementById("checkbox2");
// ISSUE 2 variable qui dois finir sur true pour valider le formulaire
let formValid = true;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let birthdateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
let numberRegex = /^[0-9][0-9]?$/;
//ISSUE 2 Selection de toute les radio
const whatChecked = Array.from(
  document.querySelectorAll(
    "#location1, #location2, #location3, #location4, #location5, #location6"
  )
);

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

//=====================================================
//Functions
//=====================================================

const inputValid = () => {
  let isOneRadioChecked = whatChecked.some((checkbox) => checkbox.checked);
  inputs.forEach((input) => {
    let errorSpan = document.querySelector(
      `span[data-for-input="${input.id}"]`
    );
    if (
      input.id === "firstName" &&
      (input.value.length < 3 || input.value.includes(" "))
    ) {
      formValid = false;
      errorSpan.innerHTML = `<p>Veuillez renseigner 3 caractères minimum</p>`;
    } else if (input.id === "firstName" && input.value.trim().length >= 3) {
      errorSpan.innerHTML = ``;
    }
    if (input.id === "lastName" && input.value.trim().length < 3) {
      formValid = false;
      errorSpan.innerHTML = `<p>Veuillez renseigner 3 caractères minimum</p>`;
    } else if (input.id === "lastName" && input.value.trim().length >= 3) {
      errorSpan.innerHTML = ``;
    }
    //controle lemail et ajoute un message si celui ci n'est pas correct
    if (input.id === "email" && !emailRegex.test(input.value)) {
      formValid = false;
      errorSpan.innerHTML = `<p>Votre adresse email n'est pas valide</p>`;
    } else if (input.id === "email" && emailRegex.test(input.value)) {
      errorSpan.innerHTML = ``;
    }
    //controle la date de naissance et ajoute un message si celle ci n'est pas correct
    if (input.id === "birthdate" && !birthdateRegex.test(input.value)) {
      formValid = false;
      errorSpan.innerHTML = "<p>Attention cette date n'est pas valide</p>";
    } else if (input.id === "birthdate" && birthdateRegex.test(input.value)) {
      errorSpan.innerHTML = "";
    }
    //controle le nombre de tournoi et ajoute un message si celui ci n'est pas correct
    if (input.id === "quantity" && !numberRegex.test(input.value)) {
      formValid = false;
      errorSpan.innerHTML = "<p>Renseigner un chiffres entre 0 et 99</p>";
    } else if (input.id === "quantity" && numberRegex.test(input.value)) {
      errorSpan.innerHTML = "<p></p>";
    }

    if (!isOneRadioChecked) {
      errorSpan.innerHTML = "test";
    } else {
      errorSpan.innerHTML = "<p></p>";
    }
    //controle laccord des CGV et ajoute un message si celle ci n'est pas correct
    if (!cgv.checked) {
      formValid = false;
      errorSpan.innerHTML = "<p>Veuillez accepter les CGV</p>";
    } else {
      errorSpan.innerHTML = "<p></p>";
    }
    //controle si l'utilisateur souhaite recevoir des news et ajoute un message si celle ci est souhaitée
    if (infosEvents.checked) {
      infosEventsSpan.innerHTML =
        "<p>Nous vous tiendrons informé des prochains évènements</p>";
    } else {
      infosEventsSpan.innerHTML = "<p></p>";
    }
  });
};

//=====================================================
//LOGIQUE
//=====================================================

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    inputValid();
  });
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  formValid = true;
  inputValid();
  if (!formValid) {
  } else {
    document.querySelector(".submit-ok").innerHTML = `
    <h2>Merci ! Votre réservation a été reçue.</h2>
    `;
    document.querySelector("form").style.display = "none";
    document.querySelector("form").reset();
    let intervalId = setInterval(() => {
      modalbg.style.display = "none";
      document.querySelector(".submit-ok").innerHTML = `
      `;
      document.querySelector("form").style.display = "block";
      clearInterval(intervalId);
    }, 3000);
  }
});
