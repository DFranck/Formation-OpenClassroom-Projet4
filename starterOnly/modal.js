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
let formValid = true;
inputs.forEach((input) => {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let birthdateRegex =
    /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  let numberRegex = /^\d+(\.\d+)?$/;
  input.addEventListener("input", (e) => {
    console.log(`Dans ${input.id}, il est écrit ${input.value}`);
    if (input.id === "first" && input.value.length < 3) {
      formValid = false;
      console.log(`Veuillez renseigner au minimum 3 caractères dans prénom`);
    }
    if (input.id === "last" && input.value.length < 3) {
      formValid = false;
      console.log(`Veuillez renseigner au minimum 3 caractères dans nom`);
    }
    if (input.id === "email" && !emailRegex.test(input.value)) {
      formValid = false;
      console.log(`Attention votre adresse email n'est pas valide`);
    }
    if (input.id === birthdate && birthdateRegex.test(input.value)) {
      formValid = false;
      console.log("Attention cette date n'est pas valide");
    }
    if (input.id === quantity && numberRegex.test(input.value)) {
      formValid = false;
      console.log("Veuillez ne renseigner uniquement des chiffres de 0 a 99");
    }
  });
});

const controlForm = () => {
  formValid = true;
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let birthdateRegex =
    /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  let numberRegex = /^\d+(\.\d+)?$/;
  inputs.forEach((input) => {
    if (input.id === "first" && input.value.length < 3) {
      formValid = false;
      console.log(`Veuillez renseigner au minimum 3 caractères dans prénom`);
    }
    if (input.id === "last" && input.value.length < 3) {
      formValid = false;
      console.log(`Veuillez renseigner au minimum 3 caractères dans nom`);
    }
    if (input.id === "email" && !emailRegex.test(input.value)) {
      formValid = false;
      console.log(`Attention votre adresse email n'est pas valide`);
    }
    if (input.id === birthdate && !birthdateRegex.test(input.value)) {
      formValid = false;
      console.log("Attention cette date n'est pas valide");
    }
    if (
      input.id === quantity &&
      !numberRegex.test(input.value) &&
      input.min > 0 &&
      input.length < 99
    ) {
      formValid = false;
      console.log("Veuillez ne renseigner uniquement des chiffres de 0 a 99");
    }
  });
};
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  controlForm();
  if (!formValid) {
    console.log("formulaire non complet");
  } else {
    console.log("Félicitation vous ètes inscrit");
  }
  e.preventDefault();
});
