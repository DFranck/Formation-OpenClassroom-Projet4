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
const formDataInput = document.querySelectorAll(".formData input");
const FormCloser = document.querySelector(".close");
const radioGroup = document.querySelectorAll(
  "input[type=radio][name=location]"
);

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

// Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  // Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

  let allConditionsMet = true;

  // Les données doivent être saisies correctement :
  formDataInput.forEach((input) => {
    let inputValue = input.value;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let numberRegex = /^\d+(\.\d+)?$/;
    let isSelect = Array.from(radioGroup).some((radio) => radio.checked);
    let cvg = document.getElementById("checkbox1").checked;

    // (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
    if (input.id === "first" && inputValue.length <= 2) {
      console.log("Encore quelque caracteres! pour le prénom");
      allConditionsMet = false;
    }
    // (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
    if (input.id === "last" && inputValue.length <= 2) {
      console.log("Encore quelque caracteres! pour le nom");
      allConditionsMet = false;
    }
    // (3) L'adresse électronique est valide.
    if (input.id === "email" && !emailRegex.test(inputValue)) {
      console.log("adresse email non valide!");
      allConditionsMet = false;
    }
    // (4) Pour le nombre de concours, une valeur numérique est saisie.
    if (input.id === "quantity" && !numberRegex.test(inputValue)) {
      console.log("Attention, veuillez saisir un nombre entre 0 et 99");
      allConditionsMet = false;
    }
    // (5) Un bouton radio est sélectionné.
    if (!isSelect) {
      console.log("Veuillez selectionner une localisation");
      allConditionsMet = false;
    }
    // (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
    if (!cvg) {
      console.log("veuillez accepter les CGV");
      allConditionsMet = false;
    }
  });
  if (allConditionsMet) {
    console.log("formulaire validé!");
  } else {
    e.preventDefault();
  }
});
