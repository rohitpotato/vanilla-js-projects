const form = document.forms["notify_form"];
const input = form.getElementsByTagName("input");
const emailInput = input[0];
const emailError = document.querySelector(".email-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!emailInput.validity.valid) {
    showErrors();
  } else {
    clearErrors();
  }
});

function showErrors() {
  if (emailInput.validity.typeMismatch) {
    emailError.textContent = `Please provide a valid email address.`;
  } else if (emailInput.validity.valueMissing) {
    emailError.textContent = `Cant notify you without an email!`;
  }
  emailInput.classList.add("error");
}

function clearErrors() {
  emailError.textContent = "";
  emailInput.classList.remove("error");
}
