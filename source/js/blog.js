// вызов функции открытия и закрытия формы входа
popupHandler('popup__login-form_js', 'header__login-btn_js', 'login-form__btn-close_js');
// вызов функции открытия и закрытия формы регистрации
popupHandler('popup__registration-form_js', 'header__reg-btn_js', 'registration-form__btn-close_js');
// вызов функции открытия и закрытия для отправки сообщения
popupHandler('popup__connect-form_js', 'footer__btn-connect_js', 'connect-form__btn-close_js');
// вызов функции открытия и закрытия форм из мобильного меню 
popupMobileHandler('popup__login-form_js', 'header__burger-login-btn_js', 'login-form__btn-close_js');
popupMobileHandler('popup__registration-form_js', 'header__burger-reg-btn_js', 'registration-form__btn-close_js');
