// ------------------------------------------------styles
import './index.css';

// ----------------------------------------------validate
import enableValidation from '../components/validate';

// -------------------------------------------------utils
import {
  generateCards,
  disableButton,
  handleImageLoaderState,
  setBtnLabel
} from '../components/utils';

// --------------------------------------------------card
import { addCard } from '../components/card';

// -------------------------------------------------modal
import { openPopup, closePopup } from '../components/modal';

// ---------------------------------------------------API
import {
  getUserInfo,
  getCards,
  setUserInfo,
  setAvatar,
  postCard
} from '../components/API';
// ------------------------------------------------------

// Параметры валидации
const validSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
};

//---+++++Глобальные переменные+++++---
//профиль
export let currentUserId = null;
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileAvatar = profile.querySelector('.profile__avatar');
const avatarSpinner = profile.querySelector('.profile__spinner');
//Pop-Up редактирования профиля
const popupEdit = document.querySelector('.popup-edit');
const popupEditInputName = popupEdit.querySelector('.form__input_type_name');
const popupEditInputAbout = popupEdit.querySelector('.form__input_type_about');
const popupEditForm = popupEdit.querySelector('.form');
const popupEditBtn = popupEdit.querySelector('.form__submit');
//Pop-Up редактирования аватара
const popupAvatar = document.querySelector('.popup-avatar');
const popupAvatarForm = popupAvatar.querySelector('.form');
const popupAvatarInput = document.querySelector(
  '.form__input_type_avatar-link'
);
const popupAvatarBtn = popupAvatar.querySelector('.form__submit');
const popupAdd = document.querySelector('.popup-add');
const popupAddForm = popupAdd.querySelector('.form');
const popupAddBtn = popupAdd.querySelector('.form__submit');
const popupAddInputImgTitle = popupAdd.querySelector(
  '.form__input_type_img-title'
);
const popupAddInputImgLink = popupAdd.querySelector(
  '.form__input_type_img-link'
);
const popupList = Array.from(document.querySelectorAll('.popup'));

//Заполняет профиль
const renderProfile = (name, about) => {
  profileName.textContent = name;
  profileAbout.textContent = about;
};

//Заполняет форму попапа редактирования профиля
const renderProfileForm = () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputAbout.value = profileAbout.textContent;
};

//---+++++Загрузка данных+++++---
const loadData = Promise.all([getUserInfo(), getCards()])
  .then(data => {
    currentUserId = data[0]._id;
    renderProfile(data[0].name, data[0].about);
    profileAvatar.setAttribute('src', `${data[0].avatar}`);
    generateCards(data[1]);
  })
  .catch(err => console.log(err));

// Накладывает слушатель событий на все Pop-up-ы (закрытие)
function setPopupListener() {
  popupList.forEach(item => {
    item.addEventListener('click', evt => {
      if (
        evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__close-btn')
      )
        closePopup(evt.target.closest('.popup'));
    });
  });
}

//Кнопка "редактировать"
document.querySelector('.page-btn_type_edit').addEventListener('click', () => {
  renderProfileForm();
  openPopup(popupEdit);
});

//Кнопка редактирования аватара
document
  .querySelector('.profile__avatar-container')
  .addEventListener('click', () => openPopup(popupAvatar));

//Кнопка "добавить карточку"
document
  .querySelector('.page-btn_type_add')
  .addEventListener('click', () => openPopup(popupAdd));

//Функцианал редактирования профиля
popupEditForm.addEventListener('submit', () => {
  const profile = {
    name: `${popupEditInputName.value}`,
    about: `${popupEditInputAbout.value}`
  };
  setBtnLabel(popupEditBtn, true);
  setUserInfo(profile)
    .then(data => {
      renderProfile(data.name, data.about);
      closePopup(popupEdit);
      setBtnLabel(popupEditBtn, false, 'Сохранить');
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
});

// Функцианал редактирования аватара
popupAvatar.addEventListener('submit', () => {
  const link = popupAvatarInput.value;
  setBtnLabel(popupAvatarBtn, true);
  handleImageLoaderState(profileAvatar, avatarSpinner, 'profile__avatar_error');
  setAvatar(link)
    .then(data => {
      profileAvatar.setAttribute('src', data.avatar);
      disableButton(popupAvatarBtn, validSettings.inactiveButtonClass);
      setBtnLabel(popupAvatarBtn, false, 'Сохранить');
      closePopup(popupAvatar);
      popupAvatarForm.reset();
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
});

//Функционал добавления карточки
popupAddForm.addEventListener('submit', () => {
  const data = {
    name: popupAddInputImgTitle.value,
    link: popupAddInputImgLink.value
  };
  setBtnLabel(popupAddBtn, true);
  postCard(data)
    .then(res => {
      addCard(res);
      disableButton(popupAddBtn, validSettings.inactiveButtonClass);
      setBtnLabel(popupAddBtn, false, 'Создать');
      closePopup(popupAdd);
      popupAddForm.reset();
    })
    .catch(err => {
      console.log(err); // выводим ошибку в консоль
    });
});

enableValidation(validSettings);

setPopupListener();

handleImageLoaderState(profileAvatar, avatarSpinner, 'profile__avatar_error');

// ******************************************ЭТА ФУНКЦИЯ УБИРАЕТ БАГ!******************************************
// **________________________________________________________________________________________________________**
// **       При загрузке страницы на мгновение видны скрытые модальные окна. Баг возникает рандомно.         **
// **    Так происходит из-за того, что окна скрыты с помощью комбинации CSS свойств visability              **
// **    и opacity вместо свойства display для реализации анимации при открытии/закрытии, так как            **
// **    свойство display не анимируется. Изменение этого свойства добавлением класса ломает анимацию.       **
// **       Для решения этой проблемы, всем модальным окнам изначально применено свойство display: none;,    **
// **    данная функция ассинхронно меняет это свойство, что позволяет избежать бага.                        **
// **       Лучше способа не придумал, баг не критиный, но мне не нравится. Если есть идеи,                  **
// **    как решить это лучше - поделитесь, буду признателен!                                                **
// **________________________________________________________________________________________________________**
const makePopupsVisible = popupList =>
  popupList.forEach(popup => (popup.style.display = 'flex'));
setTimeout(() => makePopupsVisible(popupList), 100);
// ************************************************************************************************************
