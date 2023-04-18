//TODO: можно ли объединить popupHandler и popupMobileHandler? и надо ли это делать?

// вызов функции открытия и закрытия формы входа
popupHandler('login-form__popup_js', 'header__login-btn_js', 'login-form__btn-close_js');
// вызов функции открытия и закрытия формы регистрации
popupHandler('registration-form__popup_js', 'header__reg-btn_js', 'registration-form__btn-close_js');
// вызов функции открытия и закрытия для отправки сообщения
popupHandler('connect-form__popup_js', 'footer__btn-connect_js', 'connect-form__btn-close_js');
// вызов функции открытия и закрытия форм из мобильного меню 
popupMobileHandler('login-form__popup_js', 'header__burger-login-btn_js', 'login-form__btn-close_js');

popupMobileHandler('registration-form__popup_js', 'header__burger-reg-btn_js', 'registration-form__btn-close_js');

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
    const error = errorCreator(messageError); // Получаем готовый div с ошибкой.
    input.classList.add('invalid'); // Вешаем класс ошибки. 
    input.insertAdjacentElement('beforeBegin', error); // Добавляем элемент в вёрстку.
    input.addEventListener('input', () => { // Вешаем слушатель инпут, который отработает тогда, когда пользователь начнет что-то снова вводить.
        error.remove(); // Удаляем ошибку.
        input.classList.remove('invalid'); // Удаляем класс ошибки.
    }, {once: true}); // В качестве объекта параметров делаем выполнение этого события одноразовым.
}

// создание элемента ошибки
function errorCreator(message) {
    let messageError = document.createElement('div'); 
    messageError.classList.add('invalid-message'); 
    messageError.innerText = message; // Кладём в него текст нашей ошибки.
    return messageError; // Возвращаем подготовленный div как результат выполнения нашей функции.
    // На момент завершения этой функции div не находится в вёрстке для того, чтобы он там появился мы его потом добавляем в него при помощи insertAdjacentElement.
}

//  вставка cooбщения для корректно заполненного поля

function setValidityMessage(input) { 
    const message = validityMessageCreator(); 
    input.classList.add('valid'); 
    input.insertAdjacentElement('beforeBegin', message);
}

// создание елемента c cообщением о правильности заполнения формы

function validityMessageCreator() {
    let validityMessage = document.createElement('div'); 
    validityMessage.classList.add('valid-message'); 
    validityMessage.innerText = 'All right'; 
    return validityMessage;
}

// РАБОТА С ФОРМОЙ АВТОРИЗАЦИИ

(function() {
    const loginForm = document.forms.loginForm;
    const loginFormBtn = loginForm.querySelector('.login-form__btn_js');
    const inputs = loginForm.querySelectorAll('.form__input_js');

    if(!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const errorsOldMessages = document.querySelectorAll('.invalid-message'); 
        for (let error of errorsOldMessages) error.remove(); 
      
        const userData = getAllFormData(loginForm);
        console.log(userData);

        let errors = {};

        inputs.forEach(elem => {
            if(elem.hasAttribute('required')){
                switch (elem.name) {
                    case 'email': {
                        if(!isEmailCorrect(elem.value)) {
                            errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                        }
                        break;
                    }
                    default: {
                        if(elem.value.length <= 0) {
                            errors[elem.name] = 'This field is required';
                        }
                        break;
                    }
                }    
            }
        });

        console.log(errors);
        
        if(Object.keys(errors).length) {
            Object.keys(errors).forEach((key) => {
                // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setErrorText(loginForm.elements[key], errors[key]); 
            });
            return; 
        }

        // конечный объект, который будет отправляться на сервер
        const data = {
            email: userData.email,
            password: userData.password,  
        };

        // где-то здесь возможно появится функция setValidityMessage(input)
        // TODO: К чему привязать эту функцию setValidityMessage(input)?????

        //типа отправили данные на сервер
        console.log(data);
    });
})();

// РАБОТА С ФОРМОЙ РЕГИСТРАЦИИ

(function() {
    const regForm = document.forms.regForm;
    const inputs = regForm.querySelectorAll('.form__input_js');
    const regFormBtn = regForm.querySelector('.registration-form__btn_js');
    const userAgreement = regForm.elements.agreement;

    if(!regForm) return;

    // разбокировка кнопки по нажатию на чекбокс и смена aria-label у input'ов
    userAgreement.addEventListener('click', () => agreementCheckedHandler(userAgreement, inputs, regFormBtn));

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const errorsOldMessages = document.querySelectorAll('.invalid-message'); // Смотрим есть ли у нас элементы ошибок
        for (let error of errorsOldMessages) error.remove(); // Если они есть стираем их для предотвращения эффекта накопления ошибок.

        const userData = getAllFormData(regForm); // кладем данные формы во временный объект
        console.log(userData);

        let errors = {};

        inputs.forEach(elem => {
            if(elem.hasAttribute('required')){
                switch (elem.name) {
                    case 'email': {
                        if(!isEmailCorrect(elem.value)) {
                            errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                        }
                        break;
                    }
                    case 'repeatPassword': {
                        if(elem.value !== userData.password) {
                            errors.repeatPassword = 'Please re-enter password (your entry does not match the password you entered)';
                        }
                        break;
                    }
                    default: {
                        if(elem.value.length <= 0) {
                            errors[elem.name] = 'This field is required';
                        }
                        break;
                    }
                }    
            }
        });

        console.log(errors);
        
        if(Object.keys(errors).length) {
            Object.keys(errors).forEach((key) => {
                setErrorText(regForm.elements[key], errors[key]); // Вызываем функцию, устанавливающую ошибку.
            });
            return; 
        }

        // конечный объект, который будет отправляться на сервер
        const data = {
            email: userData.email,
            name: userData.name,
            surname: userData.surname,
            password: userData.password,
            location: userData.location,
            age: userData.age,
        };

        // где-то здесь возможно появится функция setValidityMessage(input)
        // TODO: К чему привязать эту функцию setValidityMessage(input)?????

        //типа отправили данные на сервер
        console.log(data);
    });
})();

//  РАБОТА С ФОРМОЙ ОТПРАВКИ СООБЩЕНИЯ

(function() {
    const connectForm = document.forms.connectForm;
    const inputs = connectForm.querySelectorAll('.form__input_js');
    const connectFormBtn = connectForm.querySelector('.connect-form__btn_js');
    const userAgreement = connectForm.elements.connectAgreement;

    if(!connectForm) return;

    // разбокировка кнопки по нажатию на чекбокс и смена aria-label у input'ов
    userAgreement.addEventListener('click', () => agreementCheckedHandler(userAgreement, inputs, connectFormBtn));

    connectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const errorsOldMessages = document.querySelectorAll('.invalid-message'); // Смотрим есть ли у нас элементы ошибок
        for (let error of errorsOldMessages) error.remove(); // Если они есть стираем их для предотвращения эффекта накопления ошибок.

        const userData = getAllFormData(connectForm); // кладем данные формы во временный объект
        console.log(userData);
        
        let errors = {};

        inputs.forEach(elem => {
            if(elem.hasAttribute('required')){
                switch (elem.name) {
                    case 'fullName': {
                        if(!isConnectNameCorrect(elem.value)) {
                            errors.fullName = 'Please enter a valid full name (your entry is not in the format "Name Surname")';
                        }
                        break;
                    }
                    case 'email': {
                        if(!isEmailCorrect(elem.value)) {
                            errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                        }
                        break;
                    }
                    case 'phone': {
                        if(!isPhoneCorrect(elem.value)) {
                            errors.phone = 'Please enter a valid phone';
                        }
                        break;
                    }
                    default: {
                        if(elem.value.length <= 0) {
                            errors[elem.name] = 'This field is required';
                        }
                        break;
                    }
                }    
            }
        });

        console.log(errors);
        
        if(Object.keys(errors).length) {
            Object.keys(errors).forEach((key) => {
                setErrorText(connectForm.elements[key], errors[key]); // Вызываем функцию, устанавливающую ошибку.
            });
            return; 
        }

        // конечный объект, который будет отправляться на сервер
        const data = {
            fullName: userData.fullName,
            massageSubject: userData.subject,
            email: userData.email,
            phone: userData.phone,
            messageText: userData.message,
        };

        // где-то здесь возможно появится функция setValidityMessage(input)
        // TODO: К чему привязать эту функцию setValidityMessage(input)?????

        //типа отправили данные на сервер
        console.log(data);
    });
})();