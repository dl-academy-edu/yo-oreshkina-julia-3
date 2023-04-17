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