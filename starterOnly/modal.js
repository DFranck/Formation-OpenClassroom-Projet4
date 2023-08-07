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
const cgv = document.getElementById("checkbox1");
const infosEvents = document.getElementById("checkbox2");
let formValid = false;
let firstNameOk = false;
let lastNameOk = false;
let emailOk = false;
let birthdateOk = false;
let tournamentQuantityOk = false;
let tournamentSelectOk = false;
let cgvOk = false;
const inputs = document.querySelectorAll(
  "input.text-control, input.checkbox-input"
);
const TournamentArray = Array.from(
  document.querySelectorAll(
    "#location1, #location2, #location3, #location4, #location5, #location6"
  )
);
const firstNameErrorSpan = document.querySelector(".first-error");
const lastNameErrorSpan = document.querySelector(".last-error");
const emailErrorSpan = document.querySelector(".email-error");
const birthdateErrorSpan = document.querySelector(".birthdate-error");
const quantityErrorSpan = document.querySelector(".quantity-error");
const locationsErrorSpan = document.querySelector(".locations-error");
const cgvErrorSpan = document.querySelector(".cgv-error");
const infosEventsSpan = document.querySelector(".infos-events");

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
  if (input.id === "firstName") {
    firstNameOk = input.value.replaceAll(" ", "").length >= 3;
    firstNameErrorSpan.style.opacity = firstNameOk ? 0 : 1;
  }
  if (input.id === "lastName") {
    lastNameOk = input.value.replaceAll(" ", "").length >= 3;
    lastNameErrorSpan.style.opacity = lastNameOk ? 0 : 1;
  }
  if (input.id === "email") {
    emailOk = emailRegex.test(input.value);
    emailErrorSpan.style.opacity = emailOk ? 0 : 1;
  }
  if (input.id === "birthdate") {
    birthdateOk = birthdateRegex.test(input.value);
    birthdateErrorSpan.style.opacity = birthdateOk ? 0 : 1;
  }
  if (input.id === "quantity") {
    tournamentQuantityOk = numberRegex.test(input.value);
    quantityErrorSpan.style.opacity = tournamentQuantityOk ? 0 : 1;
  }
  let isOneTournamentChecked = TournamentArray.some(
    (checkbox) => checkbox.checked
  );
  if (isOneTournamentChecked) {
    tournamentSelectOk = isOneTournamentChecked ? true : false;
    locationsErrorSpan.style.opacity = tournamentSelectOk ? 0 : 1;
  }
  if (input.id === "checkbox1") {
    cgvOk = cgv.checked;
    cgvErrorSpan.style.opacity = cgvOk ? 0 : 1;
  }
  infosEventsSpan.style.opacity = infosEvents.checked ? 1 : 0;
};

const onSubmitControl = () => {
  firstNameErrorSpan.style.opacity = firstNameOk ? 0 : 1;
  lastNameErrorSpan.style.opacity = lastNameOk ? 0 : 1;
  emailErrorSpan.style.opacity = emailOk ? 0 : 1;
  birthdateErrorSpan.style.opacity = birthdateOk ? 0 : 1;
  quantityErrorSpan.style.opacity = tournamentQuantityOk ? 0 : 1;
  locationsErrorSpan.style.opacity = tournamentSelectOk ? 0 : 1;
  cgvErrorSpan.style.opacity = cgvOk ? 0 : 1;
  if (
    (formValid =
      firstNameOk &&
      lastNameOk &&
      emailOk &&
      birthdateOk &&
      tournamentQuantityOk &&
      tournamentSelectOk &&
      cgvOk)
  )
    submitForm();
};

const submitForm = () => {
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
  cgvOk = false;
  let intervalId = setInterval(() => {
    modalbg.style.display = "none";
    document.querySelector(".submit-ok").innerHTML = `
  `;
    document.querySelector("form").style.display = "block";
    clearInterval(intervalId);
  }, 3000);
};
//ISSUE 2 APPEL FONCTION SUBMIT
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmitControl();
});
