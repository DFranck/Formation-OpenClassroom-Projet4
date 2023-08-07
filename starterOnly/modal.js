function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
//Variables
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnCloser = document.querySelector(".close");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const birthdateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const numberRegex = /^[0-9][0-9]?$/;
const cgv = document.getElementById("checkbox1");
const infosEvents = document.getElementById("checkbox2");
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
let isFormValid = false;
let isFirstNameOk = false;
let isLastNameOk = false;
let isEmailOk = false;
let isBirthdateOk = false;
let isTournamentQuantityOk = false;
let isTournamentSelectOk = false;
let isCgvOk = false;

//Functions
const inputControl = (input) => {
  if (input.id === "firstName") {
    isFirstNameOk = input.value.replaceAll(" ", "").length >= 3;
    firstNameErrorSpan.style.opacity = isFirstNameOk ? 0 : 1;
  }
  if (input.id === "lastName") {
    isLastNameOk = input.value.replaceAll(" ", "").length >= 3;
    lastNameErrorSpan.style.opacity = isLastNameOk ? 0 : 1;
  }
  if (input.id === "email") {
    isEmailOk = emailRegex.test(input.value);
    emailErrorSpan.style.opacity = isEmailOk ? 0 : 1;
  }
  if (input.id === "birthdate") {
    isBirthdateOk = birthdateRegex.test(input.value);
    birthdateErrorSpan.style.opacity = isBirthdateOk ? 0 : 1;
  }
  if (input.id === "quantity") {
    isTournamentQuantityOk = numberRegex.test(input.value);
    quantityErrorSpan.style.opacity = isTournamentQuantityOk ? 0 : 1;
  }
  let isOneTournamentChecked = TournamentArray.some(
    (checkbox) => checkbox.checked
  );
  if (isOneTournamentChecked) {
    isTournamentSelectOk = isOneTournamentChecked ? true : false;
    locationsErrorSpan.style.opacity = isTournamentSelectOk ? 0 : 1;
  }
  if (input.id === "checkbox1") {
    isCgvOk = cgv.checked;
    cgvErrorSpan.style.opacity = isCgvOk ? 0 : 1;
  }
  infosEventsSpan.style.opacity = infosEvents.checked ? 1 : 0;
};

const onSubmitControl = () => {
  firstNameErrorSpan.style.opacity = isFirstNameOk ? 0 : 1;
  lastNameErrorSpan.style.opacity = isLastNameOk ? 0 : 1;
  emailErrorSpan.style.opacity = isEmailOk ? 0 : 1;
  birthdateErrorSpan.style.opacity = isBirthdateOk ? 0 : 1;
  quantityErrorSpan.style.opacity = isTournamentQuantityOk ? 0 : 1;
  locationsErrorSpan.style.opacity = isTournamentSelectOk ? 0 : 1;
  cgvErrorSpan.style.opacity = isCgvOk ? 0 : 1;
  if (
    (isFormValid =
      isFirstNameOk &&
      isLastNameOk &&
      isEmailOk &&
      isBirthdateOk &&
      isTournamentQuantityOk &&
      isTournamentSelectOk &&
      isCgvOk)
  )
    submitForm();
};

const submitForm = () => {
  document.querySelector(".submit-ok").innerHTML = `
  <p>Merci ! Votre réservation a été reçue.</p>
  `;
  document.querySelector("form").style.display = "none";
  document.querySelector("form").reset();
  isFirstNameOk = false;
  isLastNameOk = false;
  isEmailOk = false;
  isBirthdateOk = false;
  isTournamentQuantityOk = false;
  isTournamentSelectOk = false;
  isCgvOk = false;
  let intervalId = setInterval(() => {
    modalbg.style.display = "none";
    document.querySelector(".submit-ok").innerHTML = `
  `;
    document.querySelector("form").style.display = "block";
    clearInterval(intervalId);
  }, 3000);
};

//Events
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

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmitControl();
});
