
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

(function(){
    const profileImg = document.querySelector('.profile__avatar-wrapper_js');
    const profileName = document.querySelector('.profile__name_js');
    const profileSurname = document.querySelector('.profile__surname_js');
    const profileEmail = document.querySelector('.profile__email_js');
    const profileLocation = document.querySelector('.profile__location_js');
    const profileAge = document.querySelector('.profile__age_js');

    const editPasswordPopup = document.querySelector('.password-form__popup_js');
    const editPasswordForm = document.forms.editPasswordForm;
    const editPasswordInputs = editPasswordForm.querySelectorAll('.form__input_js');

    const editDataFormPopup = document.querySelector('.form-edit-data__popup_js');
    const editDataPopupBtn = document.querySelector('.profile__change-data-btn_js');
    const editDataForm = document.forms.editDataForm;
    const editDataInputs = editDataForm.querySelectorAll('.form__input_js');
    const labelFile = editDataForm.querySelector('.form-edit-data__file-text_js');
    const inputFile = editDataForm.querySelector('.form-edit-data__input-file_js');

    const deleteAccountBtn = document.querySelector('.profile__delete-btn_js');
    const serverMessagePopup = document.querySelector('.server-message_js');

    let profile = null;

    editDataForm.addEventListener('submit', changeData);
    editPasswordForm.addEventListener('submit', changePassword);
    deleteAccountBtn.addEventListener('click', deleteAccount);

    function changeData(e) {
        e.preventDefault();

        clearErrors(editDataForm);
        clearValidityMessage(editDataForm);

        let errors = {};

        editDataInputs.forEach(elem => {
            switch (elem.name) {
                case 'email': {
                    if(!isEmailCorrect(elem.value)) {
                        errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                    } else {
                        setValidityMessage(elem);
                    }
                    break;
                }
                case 'age': {
                    if(!isAgeCorrect(elem.value)) {
                        errors.age = 'The minimum age is 18 years!';
                    } else {
                        setValidityMessage(elem);
                    }
                    break;
                }
                default: {
                    if(elem.value.length <= 0) {
                        errors[elem.name] = 'This field is required';
                    } else {
                        setValidityMessage(elem);
                    }
                    break;
                }
            }    
        });
        console.log(errors);

        if(Object.keys(errors).length) {
            errorFormHandler(errors, editDataForm);
            return;
        }

        showLoader();
        const data = new FormData(editDataForm);
        
        sendRequest({
            method: 'PUT',
            url: '/api/users',
            body: data,
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        .then(response => {
            if(response.status === 401 || response.status === 403) {
                setErrorServerMessage(serverMessagePopup, response._message);
                setTimeout(() => { 
                    interactionModal(serverMessagePopup);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    location.pathname = '/';
                 }, 2000);
                return;
            }
            return response.json();
        })
        .then(response => {
            if(response.success) {
                setSuccessServerMessage(serverMessagePopup);
                clearValidityMessage(editDataForm);
                profile = response.data;
                renderProfile();
                setTimeout(() => { 
                    interactionModal(editDataFormPopup);
                    interactionModal(serverMessagePopup);
                 }, 2000)
            } else {
                throw response;
            }
        })
        .catch(err => {
            if(err._message) {
                setErrorServerMessage(serverMessagePopup, err._message);
                editDataForm.reset();
                setTimeout(() => { 
                    interactionModal(editDataFormPopup);
                    interactionModal(serverMessagePopup);
                 }, 2000);
            }
            if(err.errors.email === 'Данный email уже занят!') {
                setErrorServerMessage(serverMessagePopup, err.errors.email);
                clearValidityMessage(editDataForm);
                editDataForm.reset();
                setTimeout(() => { 
                    interactionModal(editDataFormPopup);
                    interactionModal(serverMessagePopup);
                 }, 2000);
            }
        })
        .finally(() => {
            removeLoader();
        }) 
    }

    function changePassword(e) {
        e.preventDefault();

        clearErrors(editPasswordForm);
        clearValidityMessage(editPasswordForm);

        const userData = getAllFormData(editPasswordForm);
        
        let errors = {};
        editPasswordInputs.forEach(elem => {
            if(elem.hasAttribute('required')){
                switch (elem.name) {
                    case 'repeatPassword': {
                        if(elem.value !== userData.newPassword) {
                            errors.repeatPassword = 'Please re-enter password (your entry does not match the password you entered)';
                        } else if(elem.value.length <= 0) {
                            errors.repeatPassword = 'This field is required';
                        } else {
                            setValidityMessage(elem);
                        }
                        break;
                    }
                    default: {
                        if(elem.value.length <= 0) {
                            errors[elem.name] = 'This field is required';
                        } else {
                            setValidityMessage(elem);
                        }
                        break;
                    }
                }
            }    
        });
        console.log(errors);
        
        if(Object.keys(errors).length) {
            errorFormHandler(errors, editPasswordForm);
            return;
        }

        const data = new FormData(editPasswordForm);
        showLoader();

        sendRequest({
            method: 'PUT',
            url: '/api/users',
            body: data,
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        .then(response => {
            if(response.status === 401 || response.status === 403) {
                setErrorServerMessage(serverMessagePopup, response._message);
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setTimeout(() => { 
                    interactionModal(serverMessagePopup);
                    location.pathname = '/';
                 }, 2000);
                return;
            }
            return response.json();
        })
        .then(response => {
            if(response.success) {
                console.log('Успешно');
                setSuccessServerMessage(serverMessagePopup);
                clearValidityMessage(editPasswordForm);
                editPasswordForm.reset();
                setTimeout(() => { 
                    interactionModal(editPasswordPopup);
                    interactionModal(serverMessagePopup);
                 }, 2000)
            } else {
                throw response;
            }
        })
        .catch(err => {
            if(err._message === "") {
                setErrorServerMessage(serverMessagePopup, 'The current password is not correct!');
                clearValidityMessage(editPasswordForm);
                clearErrors(editPasswordForm);
                editPasswordForm.reset();
                setTimeout(() => { 
                    interactionModal(editPasswordPopup);
                    interactionModal(serverMessagePopup);
                 }, 2000);
            }
        })
        .finally(() => {
            removeLoader();
        })
    }

    function deleteAccount(e) {
        e.preventDefault();
        showLoader(); 
        sendRequest({
            url: '/api/users/' + localStorage.getItem('userId'),
            method: 'DELETE',
            headers: {
            "x-access-token": localStorage.getItem('token'),
            },
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if(response.success) {
                setSuccessServerMessage(serverMessagePopup);
                console.log("Ваш аккаунт успешно удален!");
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setTimeout(() => {
                    interactionModal(serverMessagePopup);
                    location.pathname = '/';
                }, 2000)
            } else {
                throw response;
            }
        })
        .catch(err => {
            if(err._message) {
                setErrorServerMessage(serverMessagePopup, err._message);
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setTimeout(() => {
                    interactionModal(serverMessagePopup);
                    location.pathname = '/';
                }, 2000)
            }
        })
        .finally(() => {
            removeLoader();
        })
    }

    showLoader();
    getProfile();

    function getProfile() {
        sendRequest({
            url: `/api/users/${localStorage.getItem('userId')}`,
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(response => {
            if (response.success) {
                profile = response.data;
                renderProfile(profile); // отрисовка профиля
            } else {
                throw new Error(`${response.status} ${response.message}`)
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            removeLoader();
        }); 
    }

    editDataPopupBtn.addEventListener('click', () => renderInputsform(profile));

    function renderProfile() {
        profileImg.innerHTML = `<img src="${BASE_SERVER_PATH + profile.photoUrl}" class="profile__avatar" alt="photo of profile">`;
        profileName.innerText = profile.name;
        profileSurname.innerText = profile.surname;
        profileEmail.innerText = profile.email;
        profileLocation.innerText = profile.location;
        profileAge.innerText = profile.age;
    }
    function renderInputsform() {
        editDataForm.name.value = profile.name;
        editDataForm.surname.value = profile.surname;
        editDataForm.email.value = profile.email;
        editDataForm.location.value = profile.location;
        editDataForm.age.value = profile.age;
    }

    inputFile.addEventListener('change', setTextLabelFile, {once: true});

    function setTextLabelFile() {
        if(inputFile.value) {
            labelFile.innerText = `${inputFile.files.item(0).name}`;
        } else {
            labelFile.innerText = 'Choose a file...';
        }
    }
})();
