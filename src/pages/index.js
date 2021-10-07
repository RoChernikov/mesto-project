import './index.css';
import initialCards from '../components/initial-сards';
import {
  generateInitialCards
} from '../components/utils'
import enableValidation from '../components/validate';
import addCard from '../components/card'
import {
  openPopup,
  closePopup
} from '../components/modal'

const validSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

//---+++++Глобальные переменные+++++---

//профиль
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
//Pop-Up редактирования профиля
const popupEdit = document.querySelector('.popup-edit');
const popupEditInputName = popupEdit.querySelector('.form__input_type_name');
const popupEditInputAbout = popupEdit.querySelector('.form__input_type_about');
const popupEditForm = popupEdit.querySelector('.form');
//Pop-Up добавления карточки
const popupAdd = document.querySelector('.popup-add');
const popupAddForm = popupAdd.querySelector('.form');
const popupAddInputImgTitle = popupAdd.querySelector(
  '.form__input_type_img-title'
);
const popupAddInputImgLink = popupAdd.querySelector(
  '.form__input_type_img-link'
);
const popupList = document.querySelectorAll('.popup');

// Функция накладывает слушатель событий на все Pop-up-ы (закрытие)
function setPopupListener() {
  popupList.forEach(item => {
    item.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
        closePopup(evt.target.closest('.popup'));
    })
  })
}
setPopupListener();

//Кнопка "редактировать"
document.querySelector('.page-btn_type_edit').addEventListener('click', () => {
  openPopup(popupEdit);
  popupEditInputName.value = profileName.textContent;
  popupEditInputAbout.value = profileAbout.textContent;
});

//Функцианал редактирования профиля
popupEditForm.addEventListener('submit', evt => {
  profileName.textContent = popupEditInputName.value;
  profileAbout.textContent = popupEditInputAbout.value;
  closePopup(popupEdit);
});

//Кнопка "добавить"
document
  .querySelector('.page-btn_type_add')
  .addEventListener('click', () => openPopup(popupAdd));

//Функционал добавления карточки
popupAddForm.addEventListener('submit', evt => {
  const data = {
    name: popupAddInputImgTitle.value,
    link: popupAddInputImgLink.value,
  };
  popupAddForm.reset();
  enableValidation(validSettings);
  addCard(data);
  closePopup(popupAdd);
});

const renderProfileForm = () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputAbout.value = profileAbout.textContent;
}

renderProfileForm();

generateInitialCards(initialCards);

enableValidation(validSettings);