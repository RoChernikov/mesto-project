const showInputError = (formElement, inputElement, errorMessage, validSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validSettings.errorClass)
};

const hideInputError = (formElement, inputElement, validSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validSettings.inputErrorClass);
  errorElement.classList.remove(validSettings.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, validSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validSettings);
  } else {
    hideInputError(formElement, inputElement, validSettings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validSettings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(validSettings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};


const setFormListeners = (formElement, validSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validSettings.inputSelector));
  const buttonElement = formElement.querySelector(validSettings.submitButtonSelector)
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validSettings)
      toggleButtonState(inputList, buttonElement, validSettings);
    });
    toggleButtonState(inputList, buttonElement, validSettings);
  });
};

export default function enableValidation(validSettings) {
  const formList = Array.from(document.querySelectorAll(`${validSettings.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setFormListeners(formElement, validSettings);
  });
};