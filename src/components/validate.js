/*import { disableButton, enableButton } from '../components/utils';

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validSettings,
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validSettings.inputErrorClass);
  errorElement.classList.remove(validSettings.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, validSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validSettings,
    );
  } else {
    hideInputError(formElement, inputElement, validSettings);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validSettings) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validSettings.inactiveButtonClass);
  } else {
    enableButton(buttonElement, validSettings.inactiveButtonClass);
  }
};

const setFormListeners = (formElement, validSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validSettings.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    validSettings.submitButtonSelector,
  );
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validSettings);
      toggleButtonState(inputList, buttonElement, validSettings);
    });
    toggleButtonState(inputList, buttonElement, validSettings);
  });
};

export default function enableValidation(validSettings) {
  const formList = Array.from(
    document.querySelectorAll(`${validSettings.formSelector}`),
  );
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setFormListeners(formElement, validSettings);
  });
}*/
/*
Создание класса FormValidator
Создайте класс FormValidator, который настраивает валидацию полей формы:

    
    имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
    имеет публичный метод enableValidation, который включает валидацию формы.
    Для каждой проверяемой формы создавайте экземпляр класса FormValidator.
*/
export default class FormValidator {
  constructor(validSettings, formElement) {
    //принимает в конструктор объект настроек с селекторами и классами формы    
    this._inputSelector = validSettings.inputSelector
    this._submitButtonSelector = validSettings.submitButtonSelector
    this._inactiveButtonClass =  validSettings.inactiveButtonClass
    this._inputErrorClass = validSettings.inputErrorClass
    this._errorClass =  validSettings.errorClass    
    //принимает вторым параметром элемент той формы, которая валидируется
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); //todo 
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);      c
    } else {
      this._hideInputError(inputElement);      
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }


//---+++++Деактивирует submit формы+++++---
disableButton() {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.setAttribute('disabled', 'disabled');
};

//---+++++Активирует submit формы+++++---
enableButton() {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.removeAttribute('disabled', 'disabled');
};


//todo
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton(); //todo функция в utils дублируется      
    } else {
      this.enableButton(); //todo функция в utils дублируется      
    }
  };

//todo
  _setFormListeners() {     
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
      this._toggleButtonState();
    });
  };

//принимает вторым параметром элемент той формы, которая валидируется;
  enableValidation() {        
    this._formElement.addEventListener('submit', evt => {
        evt.preventDefault();          
      });
    this._setFormListeners();    
  }
}