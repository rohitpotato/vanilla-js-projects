const form = document.getElementsByTagName("form")[0];
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const errorIcon = document.querySelector(".error-icon");

emailInput.addEventListener("input", (e) => {
  if (emailInput.validity.valid) {
    emailError.textContent = "";
    errorIcon.classList.add("hidden");
  } else {
    showError();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!emailInput.validity.valid) {
    showError();
  }
});

function showError() {
  if (emailInput.validity.valueMissing) {
    emailError.textContent = "You need to enter an e-mail address.";
  } else if (emailInput.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an e-mail address.";
  } else if (emailInput.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  emailError.className = "error";
  errorIcon.classList.remove("hidden");
}
