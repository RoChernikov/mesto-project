export default function enableValidation(validSettings) {

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${validSettings.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${validSettings.errorClass}`)
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${validSettings.inputErrorClass}`);
    errorElement.classList.remove(`${validSettings.errorClass}`);
    errorElement.textContent = '';
  };

  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${validSettings.inactiveButtonClass}`);
    } else {
      buttonElement.classList.remove(`${validSettings.inactiveButtonClass}`);
    }
  };

  const setFormListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`${validSettings.inputSelector}`));
    const buttonElement = formElement.querySelector(`${validSettings.submitButtonSelector}`)
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
      });
      toggleButtonState(inputList, buttonElement);
    });

    inputList.forEach(inputElement => {
      inputElement.addEventListener('keydown', evt => {
        if (evt.key === 'Enter') {
          if (hasInvalidInput(inputList))
            evt.preventDefault();
          isValid(formElement, inputElement);
        }
      })
    })
  };

  const formList = Array.from(document.querySelectorAll(`${validSettings.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setFormListeners(formElement);
  });
};