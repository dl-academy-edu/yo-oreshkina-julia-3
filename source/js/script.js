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

        const validityOldMessages =  document.querySelectorAll('.valid-message');
        for (let validityMessage of validityOldMessages) validityMessage.remove();
      
        const userData = getAllFormData(loginForm);
        console.log(userData);

        let errors = {};

        inputs.forEach(elem => {
            if(elem.hasAttribute('required')){
                switch (elem.name) {
                    case 'email': {
                        if(!isEmailCorrect(elem.value)) {
                            errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
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

    // разблокировка кнопки по нажатию на чекбокс и смена aria-label у input'ов
    userAgreement.addEventListener('click', () => agreementCheckedHandler(userAgreement, inputs, regFormBtn));

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Если есть ошибки стираем их для предотвращения эффекта накопления ошибок.
        const errorsOldMessages = document.querySelectorAll('.invalid-message'); 
        for (let error of errorsOldMessages) error.remove();

        // Если есть уведомления, что поле верно заполнено, стираем их для предотвращения эффекта накопления.
        const validityOldMessages =  document.querySelectorAll('.valid-message');
        for (let validityMessage of validityOldMessages) validityMessage.remove();

        const userData = getAllFormData(regForm); // кладем данные формы во временный объект
        console.log(userData);

        let errors = {};

        inputs.forEach(elem => {
            if(elem.hasAttribute('required')){
                switch (elem.name) {
                    case 'email': {
                        if(!isEmailCorrect(elem.value)) {
                            errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                        } else {
                            setValidityMessage(elem);
                        }
                        break;
                    }
                    case 'repeatPassword': {
                        if(elem.value !== userData.password || elem.value.length <= 0) {
                            errors.repeatPassword = 'Please re-enter password (your entry does not match the password you entered)';
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

    // разблокировка кнопки по нажатию на чекбокс и смена aria-label у input'ов
    userAgreement.addEventListener('click', () => agreementCheckedHandler(userAgreement, inputs, connectFormBtn));

    connectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const errorsOldMessages = document.querySelectorAll('.invalid-message'); 
        for (let error of errorsOldMessages) error.remove();

        const validityOldMessages =  document.querySelectorAll('.valid-message');
        for (let validityMessage of validityOldMessages) validityMessage.remove();

        const userData = getAllFormData(connectForm); // кладем данные формы во временный объект
        console.log(userData);
        
        let errors = {};

        inputs.forEach(elem => {
            if(elem.hasAttribute('required')){
                switch (elem.name) {
                    case 'fullName': {
                        if(!isConnectNameCorrect(elem.value)) {
                            errors.fullName = 'Please enter a valid full name (your entry is not in the format "Name Surname")';
                        } else {
                            setValidityMessage(elem);
                        }
                        break;
                    }
                    case 'email': {
                        if(!isEmailCorrect(elem.value)) {
                            errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
                        } else {
                            setValidityMessage(elem);
                        }
                        break;
                    }
                    case 'phone': {
                        if(!isPhoneCorrect(elem.value)) {
                            errors.phone = 'Please enter a valid phone';
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

        //типа отправили данные на сервер
        console.log(data);
    });
})();
/* __________________________________SLIDER________________________________ */
(function() {
    const slider = document.querySelector('.summary__slider_js');
    const wrapper = slider.querySelector('.summary__slider-wrapper_js');
    const innerWrapper = wrapper.querySelector('.summary__slider-inner_js');
    const btnBack = slider.querySelector('.summary__slider-btn-back_js');
    const btnNext = slider.querySelector('.summary__slider-btn-next_js');
    const pagination = slider.querySelector('.summary__slider-pagination_js');
    const slides = [...innerWrapper.querySelectorAll('.summary__slide_js')];
    const slidesCount = slides.length;
    const paginationDots = [];
    const animationDuration = 500; // время задержки анимации

    let timer = null;
    let slideWidth = wrapper.offsetWidth; // ширина wrapper
    let activeSlideIndex = 0;

    initWidth();
    createDots();
    setActiveSlide(0);

    window.addEventListener('resize', () => {
        initWidth();
        setActiveSlide(activeSlideIndex);
    });

    btnBack.addEventListener('click', () => {
        setActiveSlide(activeSlideIndex - 1);
    });
    btnNext.addEventListener('click', () => {
        setActiveSlide(activeSlideIndex + 1);
    });

    function setActiveSlide(index, withAnimation = true) {
        if(index < 0 || index >= slidesCount) return; // проверяем не было ли переключения без кнопки
        innerWrapper.style.transform = `translateX(${index * slideWidth * (-1)}px)`;

        if(withAnimation) {
            clearTimeout(timer);
            innerWrapper.style.transition = `transform ${animationDuration}ms`;
            timer = setTimeout(() => {
                innerWrapper.style.transition = ''; // снимаем анимацию на время задержки
            }, animationDuration);
        }

        if(index === 0) {
            btnBack.setAttribute('disabled', 'disabled');
        } else {
            btnBack.removeAttribute('disabled');
        }

        if(index === slidesCount - 1) {
            btnNext.setAttribute('disabled', 'disabled');
        } else {
            btnNext.removeAttribute('disabled');
        }

        paginationDots[activeSlideIndex].classList.remove('summary__slider-dot_active');
        paginationDots[index].classList.add('summary__slider-dot_active');


        activeSlideIndex = index; //обновляем значение для дальнейшего пролистывания
    }

    function initWidth() {
        slideWidth = wrapper.offsetWidth;

        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`; 
        });
    }
    function createDots() {
        for (let i = 0; i < slidesCount; i++) {
            const dot = createDot(i);
            paginationDots.push(dot);
            pagination.insertAdjacentElement('beforeEnd', dot);
        }
    }

    function createDot(index) {
        const dot = document.createElement('button');
        dot.classList.add('summary__slider-dot');

        if(index === activeSlideIndex) {
            dot.classList.add('summary__slider-dot_active');
        }

        dot.addEventListener('click', () => {
            setActiveSlide(index);
        });

        return dot;
    }
})();

/* ___________________________  SLIDER(swiper.js) __________________________ */
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });