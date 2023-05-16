
// вызов функции открытия и закрытия формы редактирования пароля
popupHandler('password-form__popup_js', 'profile__change-password-btn_js', 'password-form__btn-close_js');
// вызов функции открытия и закрытия редактирования данных профиля
popupHandler('form-edit-data__popup_js', 'profile__change-data-btn_js', 'form-edit-data__btn-close_js');

// функция выделение текущей страницы как активной
(function() {
    const currentPage = document.querySelector('.header__profile-link_js');
    const currentBurgerPage = document.querySelector('.header__burger-profile-link_js');
    currentPage.classList.add('header__link_active');
    currentBurgerPage.classList.add('header__link_active');
})();
// Инициализация ссылок в меню при аутентификации
(function setMenuLinks() {
    rerenderLinks();
    rerenderBurgerLinks();
})();
