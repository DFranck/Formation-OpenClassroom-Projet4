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

//============================================================
//with gpt4
//============================================================
// const formDataInput = document.querySelectorAll(".formData input");
// const radioGroup = document.querySelectorAll(
//   "input[type=radio][name=location]"
// );
// // Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
// document.querySelector("form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   // Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

//   let allConditionsMet = true;

//   // Les données doivent être saisies correctement :
//   formDataInput.forEach((input) => {
//     let inputValue = input.value;
//     let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     let numberRegex = /^\d+(\.\d+)?$/;
//     let isSelect = Array.from(radioGroup).some((radio) => radio.checked);
//     let cvg = document.getElementById("checkbox1").checked;

//     // (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
//     if (input.id === "first" && inputValue.length <= 2) {
//       console.log("Encore quelque caracteres! pour le prénom");
//       allConditionsMet = false;
//     }
//     // (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
//     if (input.id === "last" && inputValue.length <= 2) {
//       console.log("Encore quelque caracteres! pour le nom");
//       allConditionsMet = false;
//     }
//     // (3) L'adresse électronique est valide.
//     if (input.id === "email" && !emailRegex.test(inputValue)) {
//       console.log("adresse email non valide!");
//       allConditionsMet = false;
//     }
//     // (4) Pour le nombre de concours, une valeur numérique est saisie.
//     if (input.id === "quantity" && !numberRegex.test(inputValue)) {
//       console.log("Attention, veuillez saisir un nombre entre 0 et 99");
//       allConditionsMet = false;
//     }
//     // (5) Un bouton radio est sélectionné.
//     if (!isSelect) {
//       console.log("Veuillez selectionner une localisation");
//       allConditionsMet = false;
//     }
//     // (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
//     if (!cvg) {
//       console.log("veuillez accepter les CGV");
//       allConditionsMet = false;
//     }
//   });
//   if (allConditionsMet) {
//     console.log("formulaire validé!");
//   } else {
//     e.preventDefault();
//   }
// });

//=======================================================
// Retry alone 4e essai
//=======================================================
const inputs = document.querySelectorAll(
  "input.text-control, input.checkbox-input"
);
const whatChecked = Array.from(
  document.querySelectorAll(
    "#location1, #location2, #location3, #location4, #location5, #location6"
  )
);
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

let formValid = true;

inputs.forEach((input) => {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let birthdateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  let numberRegex = /^[0-9][0-9]?$/;

  input.addEventListener("input", (e) => {
    let isOneChecked = whatChecked.some((checkbox) => checkbox.checked);
    console.log(`Dans ${input.id}, il est écrit ${input.value}`);
    if (input.id === "first" && input.value.length < 3) {
      formValid = false;
      firstErrorSpan.innerHTML = `<p>Veuillez renseigner au minimum 3 caractères dans prénom</p>`;
    } else {
      firstErrorSpan.innerHTML = ``;
    }
    if (input.id === "last" && input.value.length < 3) {
      formValid = false;
      lastErrorSpan.innerHTML = `Veuillez renseigner au minimum 3 caractères dans nom`;
    } else {
      lastErrorSpan.innerHTML = ``;
    }
    if (input.id === "email" && !emailRegex.test(input.value)) {
      formValid = false;
      emailErrorSpan.innerHTML = `Attention votre adresse email n'est pas valide`;
    } else {
      emailErrorSpan.innerHTML = ``;
    }
    if (input.id === "birthdate" && !birthdateRegex.test(input.value)) {
      formValid = false;
      birthdateErrorSpan.innerHTML = "Attention cette date n'est pas valide";
    } else {
      birthdateErrorSpan.innerHTML = "";
    }
    if (input.id === "quantity" && !numberRegex.test(input.value)) {
      formValid = false;
      quantityErrorSpan.innerHTML =
        "Veuillez ne renseigner uniquement des chiffres de 0 a 99";
    } else {
      quantityErrorSpan.innerHTML = "";
    }
    if (!isOneChecked) {
      formValid = false;
      locationsErrorSpan.innerHTML =
        "Veuillez selection le tournoi que vous souhaitez faire";
    } else {
      locationsErrorSpan.innerHTML = "";
    }
    if (!cgv.checked) {
      formValid = false;
      cgvErrorSpan.innerHTML = "Veuillez accepter les CGV";
    } else {
      cgvErrorSpan.innerHTML = "";
    }
    if (infosEvents.checked) {
    }
  });
});

const controlForm = () => {
  formValid = true;
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let birthdateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  let numberRegex = /^[0-9][0-9]?$/;

  inputs.forEach((input) => {
    let isOneChecked = whatChecked.some((checkbox) => checkbox.checked);
    if (input.id === "first" && input.value.length < 3) {
      formValid = false;
      firstErrorSpan.innerHTML = `Veuillez renseigner au minimum 3 caractères dans prénom`;
    }
    if (input.id === "last" && input.value.length < 3) {
      formValid = false;
      lastErrorSpan.innerHTML = `Veuillez renseigner au minimum 3 caractères dans nom`;
    }
    if (input.id === "email" && !emailRegex.test(input.value)) {
      formValid = false;
      emailErrorSpan.innerHTML = `Attention votre adresse email n'est pas valide`;
    }
    if (input.id === "birthdate" && !birthdateRegex.test(input.value)) {
      formValid = false;
      birthdateErrorSpan.innerHTML = "Attention cette date n'est pas valide";
    }
    if (input.id === "quantity" && !numberRegex.test(input.value)) {
      formValid = false;
      quantityErrorSpan.innerHTML =
        "Veuillez ne renseigner uniquement des chiffres de 0 a 99";
    }
    if (!isOneChecked) {
      formValid = false;
      locationsErrorSpan.innerHTML =
        "Veuillez selection le tournoi que vous souhaitez faire";
    }
    if (!cgv.checked) {
      formValid = false;
      cgvErrorSpan.innerHTML = "Veuillez accepter les CGV";
    }
    if (infosEvents.checked) {
      console.log("Ok nous vous tiendrons informé des prochains évèneemnts");
    }
  });
};
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
