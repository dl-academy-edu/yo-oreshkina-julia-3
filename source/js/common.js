// базовый путь до сервера
const BASE_SERVER_PATH = 'https://academy.directlinedev.com';

// ф-ция открытия и закрытия форм
function popupHandler (popupClass, openPopupbtnClass, closePopupbtnClass) {
    const popup = document.querySelector(`.${popupClass}`);
    const openPopupbtn = document.querySelector(`.${openPopupbtnClass}`);
    const closePopupbtn = document.querySelector(`.${closePopupbtnClass}`);

    // проверка на наличие открывающей кнопки в обычном меню 
    if(!openPopupbtn) return;

    // проверка на наличие модального окна или если пользователь специально удалит класс через браузер
    if(!popup || !popup.classList.contains('visually-hidden')) return;

    openPopupbtn.addEventListener('click', openPopup);

    function openPopup() {
        window.scrollTo(0, 0);
        popup.classList.remove('visually-hidden');
        document.body.classList.add('no-scroll');
        window.addEventListener('keydown', escClosePopup);
        
        if(closePopupbtn) { // проверка на наличие закрывающей кнопки
        closePopupbtn.addEventListener('click', closePopup);
        }
    }

    function closePopup() {
        popup.classList.add('visually-hidden');
        document.body.classList.remove('no-scroll');
        window.removeEventListener('keydown', escClosePopup);
        if(closePopupbtn) { 
            closePopupbtn.removeEventListener('click', closePopup);
        }
    } 

    function escClosePopup(e) {
        if(e.code === "Escape" && !popup.classList.contains('visually-hidden')) {
            closePopup();
        }
    }
}
// ф-ция открытия и закрытия форм из бургер-меню
function popupMobileHandler(mobilePopupClass, openPopupBurgerbtnClass, closePopupbtnClass) {
    const menu = document.querySelector('.header__burger');
    const mobilePopup = document.querySelector(`.${mobilePopupClass}`);
    const openPopupBurgerbtn = document.querySelector(`.${openPopupBurgerbtnClass}`);
    const closePopupbtn = document.querySelector(`.${closePopupbtnClass}`);

    if(!menu && !openPopupBurgerbtn) return;
    if(!mobilePopup && !closePopupbtn) return;
   
    openPopupBurgerbtn.addEventListener('click', openMobilePopup);
   
    function openMobilePopup() {
        if(!menu.classList.contains('visually-hidden')) {
            menu.classList.add('visually-hidden');
        }
        window.scrollTo(0, 0);
        mobilePopup.classList.remove('visually-hidden');
        document.body.classList.add('no-scroll');

        closePopupbtn.addEventListener('click', closeMobilePopup);
    }

    function closeMobilePopup() {
        mobilePopup.classList.add('visually-hidden');
        document.body.classList.remove('no-scroll');
        closePopupbtn.removeEventListener('click', closeMobilePopup); 
    }      
}

//------------------------------   Бургер меню  -------------------------------

(function() {
    const openMenuBtn = document.querySelector('.header__burger-btn-open_js');
    const menu = document.querySelector('.header__burger');
    const closeMenuBtn = document.querySelector('.header__burger-btn-close_js');

    if(!openMenuBtn) return;
    if(!menu && !closeMenuBtn) return;

    openMenuBtn.addEventListener('click', openMenu);

    function openMenu() {
        menu.classList.remove('visually-hidden');
        document.body.classList.add('no-scroll');
        closeMenuBtn.focus();

        closeMenuBtn.addEventListener('click', closeMenu);
        window.addEventListener('keydown', escHandler);
    }

    function closeMenu() {
        menu.classList.add('visually-hidden');
        document.body.classList.remove('no-scroll'); 
        closeMenuBtn.removeEventListener('click', closeMenu);
        window.removeEventListener('keydown', escHandler);
    }

    function escHandler(e) {
        if(e.code === "Escape" && !menu.classList.contains('visually-hidden')) {
            closeMenu();
        }
    }
})();


/* -------------------- Функция прокрутки страницы вверх------------------ */

(function() {
    const btnToTop = document.querySelector('.button-to-top_js');

    if(!btnToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 1500) {
            btnToTop.classList.remove('visually-hidden');
        } else {
            btnToTop.classList.add('visually-hidden');
        }
        btnToTop.addEventListener('click', scrollToTop, {once: true});
    });

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
})();


/* -------------------------------- ФОРМЫ ---------------------------------- */

// функция получения данных из формы
function getAllFormData(form) {
    const inputs = form.querySelectorAll('input'); 
    const textareas = form.querySelectorAll('textarea'); 

    let result = {}; 

    for (let input of inputs) { 
        switch (input.type) {
            case 'radio': {
                if(input.checked) {
                    result[input.name] = input.value; 
                }
                break; 
            }
            case 'checkbox': {
                if(!result[input.name]) {
                    result[input.name] = [];
                }

                if(input.checked) {
                    result[input.name].push(input.value);
                }
                break;
            }
            case 'file': {
                result[input.name] = input.files; 
                break;
            }
            default: {
                result[input.name] = input.value;
            }
        }
    }

    for(let textarea of textareas) { 
        result[textarea.name] = textarea.value; 
    }

    return result; 
}

// проверка на корректное заполнение почты 

function isEmailCorrect(email) {
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

// проверка на возраст пользователя

function isAgeCorrect(age) {
    return (!isNaN(age) && age !== null && age >= 18);
}

// проверка на корректное заполнение номера телефона

function isPhoneCorrect(phone) {
    return phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

// проверка на корректное заполнение поля What is your name?

function isConnectNameCorrect(fullName) {
    return fullName.match(/^[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?$/);
}

//разблокировка кнопки и переименование aria-label по отмеченному чекбоксу

function agreementCheckedHandler(checkbox, inputs, btn) {
    // проверка на отмеченный чекбокс
    if(checkbox.checked) {
        inputs.forEach(elem => {
            if(elem.getAttribute('aria-label') === 'checkbox is not selected') {
                elem.setAttribute('aria-label', 'checkbox was selected');
            }
        });
        btn.removeAttribute('disabled');
    } else { 
        inputs.forEach(elem => {
            elem.setAttribute('aria-label', 'checkbox is not selected');
        });
        btn.setAttribute('disabled', 'disabled');
    }  
}

// появление-удаление ошибки для некорректно заполненного поля

function setErrorText(input, messageError) { 
    const error = errorCreator(messageError);
    input.classList.add('invalid');
    input.insertAdjacentElement('beforeBegin', error);
    input.addEventListener('input', () => {
        error.remove(); // Удаляем ошибку.
        input.classList.remove('invalid');
    }, {once: true});
}

// создание элемента ошибки
function errorCreator(message) {
    let messageError = document.createElement('div'); 
    messageError.classList.add('invalid-message'); 
    messageError.innerText = message; 
    return messageError;
}

//  вставка cooбщения о корректно заполненном поле

function setValidityMessage(input) { 
    const message = validityMessageCreator(); 
    input.classList.add('valid'); 
    input.insertAdjacentElement('beforeBegin', message);
    input.addEventListener('input', () => {
        message.remove(); 
        input.classList.remove('valid'); 
    }, {once: true}); 
}

// создание елемента c cообщением о правильности заполнения формы

function validityMessageCreator() {
    let validityMessage = document.createElement('div'); 
    validityMessage.classList.add('valid-message'); 
    validityMessage.innerText = 'All right'; 
    return validityMessage;
}

//ф-ция для переключения модальных окон

function interactionModal(modal) {
    modal.classList.toggle('visually-hidden');
    document.body.classList.remove('no-scroll');
}

// функция создания элемента
function createElement(elem, className) {
    let element = document.createElement(elem);
    element.classList.add(className);
    return element;
}

// функция отрисовки лоадера
function createPreloader() {
   let preloader = createElement('div', 'loader');
   let spinner = createElement('div', 'spinner-border');
   preloader.insertAdjacentElement('afterBegin', spinner);
   return preloader;
}

// показать лоадер
function showLoader() {
    let loader = createPreloader();
    document.body.insertAdjacentElement('afterBegin', loader);
}

// убрать лоадер
function removeLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.remove(); 
}

// функция переключения страниц после авторизации

function rerenderLinks() {
    
    const loginBtn = document.querySelector('.header__login-btn_js');
    const registerBtn = document.querySelector('.header__reg-btn_js');
    const toProfileLink = document.querySelector('.header__profile-link_js');
   // localStorage.removeItem('token'); // убрать, когда будет написана функция удаления акаунта
    const isLogin = localStorage.getItem('token');
    if(isLogin) {
        // токен присутсвует
        loginBtn.classList.add('visually-hidden');
        registerBtn.classList.add('visually-hidden');
        toProfileLink.classList.remove('visually-hidden');
    } else {
        // токен отсутствует
        loginBtn.classList.remove('visually-hidden');
        registerBtn.classList.remove('visually-hidden');
        toProfileLink.classList.add('visually-hidden');
    }
}

function rerenderBurgerLinks() {
    const loginBurgerBtn = document.querySelector('.header__burger-login-btn_js');
    const registerBurgerBtn = document.querySelector('.header__burger-reg-btn_js');
    const toProfileBurgerLink = document.querySelector('.header__burger-profile-link_js');

    const isLogin = localStorage.getItem('token');
    if(isLogin) {
        // токен присутсвует
        loginBurgerBtn.classList.add('visually-hidden');
        registerBurgerBtn.classList.add('visually-hidden');
        toProfileBurgerLink.classList.remove('visually-hidden');
    } else {
        // токен отсутствует
        loginBurgerBtn.classList.remove('visually-hidden');
        registerBurgerBtn.classList.remove('visually-hidden');
        toProfileBurgerLink.classList.add('visually-hidden');
    }
}   

// функция заготовки для создания запроса

function sendRequest({url, method = 'GET', headers, body = null}) {
    return fetch(BASE_SERVER_PATH + url, {
        method,
        headers,
        body,
    })
}

// функция установки ошибок на полях форм
function errorFormHandler(errors, form) {
    if(!errors) return;
    if(Object.keys(errors).length) {
      Object.keys(errors).forEach(key => {
        const messageError = errors[key];
        const input = form.elements[key];
        setErrorText(input, messageError);
      })
      return;
    }
  }

  // функция удаления ошибок на полях форм
  function clearErrors(element) {
    const messages = element.querySelectorAll('.invalid-message');
    const invalids = element.querySelectorAll('.invalid');
    messages.forEach(message => message.remove());
    invalids.forEach(invalid => invalid.classList.remove('invalid'));
  }

  // функция удаления сообщений All right! на полях форм
  function clearValidityMessage(element) {
    const messages = element.querySelectorAll('.valid-message');
    const valids = element.querySelectorAll('.valid');
    messages.forEach(message => message.remove());
    valids.forEach(invalid => invalid.classList.remove('valid'));
  }

  // функция оповещения ошибки сервера
  function setErrorServerMessage(element, error) {
    const serverMessage = createElement('div', 'server-message__text-error');
    serverMessage.innerText = `The form was sent but the server transmits an error: “${error}”`;
    element.insertAdjacentElement('afterBegin', serverMessage);
    if (element.classList.contains('visually-hidden'))
    interactionModal(element);
    setTimeout(() => { 
        serverMessage.remove();
     }, 3000)
  }

  // функция оповещения об успешном запросе
  function setSuccessServerMessage(element) {
    const serverMessage = createElement('div', 'server-message__text-success');
    serverMessage.innerText = 'Form has been sent successfully';
    element.insertAdjacentElement('afterBegin', serverMessage);
    if (element.classList.contains('visually-hidden'))
    interactionModal(element);
    setTimeout(() => { 
        serverMessage.remove();
     }, 3000)
  }

  