const form = document.forms["reg_form"];
const formInputs = document.forms["reg_form"].getElementsByTagName("input");

// Using constraint validation API

[...formInputs].forEach((input) => {
  input.addEventListener("input", (e) => {
    if (isInputValid(input)) {
      clearError(input);
    } else {
      showError(input);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  [...formInputs].forEach((input) => {
    if (!isInputValid(input)) {
      showError(input);
    }
  });
});

function isInputValid(input) {
  if (!input.validity.valid) {
    return false;
  }
  return true;
}

function showError(input) {
  const fieldName = input.getAttribute("placeholder");
  const inputType = input.getAttribute("type");
  const [errorMessage, errorIcon] = getErrorElements(input);
  if (input.validity.valueMissing) {
    errorMessage.textContent = `${fieldName} cannot be empty.`;
  } else if (input.validity.typeMismatch) {
    errorMessage.textContent = `Looks like this is not a valid ${inputType}`;
  } else if (input.validity.tooShort) {
    errorMessage.textContent = `${fieldName} should be at least ${input.minLength}.`;
  }
  errorIcon.classList.add("active");
  input.classList.add("error");
}

function clearError(input) {
  const [errorMessage, errorIcon] = getErrorElements(input);
  errorIcon.classList.remove("active");
  errorMessage.textContent = "";
  input.classList.remove("error");
}

function getErrorElements(input) {
  let errorMessage;
  let errorIcon;
  [...input.parentNode.children]
    .filter((element) => element !== input)
    .map((element) => {
      if (element.classList.contains("error-message")) {
        errorMessage = element;
      } else {
        errorIcon = element;
      }
    });
  return [errorMessage, errorIcon];
}
