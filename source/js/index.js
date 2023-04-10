
    const btnOpenedRegform = document.querySelector('.registration-btn--open');
    const btnOpenedRegformFromMenu = document.querySelector('.burger-registration-btn--open');
    const registrationModal = document.querySelector('.registration-form__modal');
    const btnClosedRegform = document.querySelector('.registration-form__btn-close');
    const btnOpenedLoginform = document.querySelector('.login-btn--open');
    const btnOpenedLoginformFromMenu = document.querySelector('.burger-login-btn--open');
    const loginModal = document.querySelector('.login-form__modal');
    const btnClosedLoginform = document.querySelector('.login-form__btn-close');
    const btnOpenedConnectForm = document.querySelector('.footer__btn-connect');
    const connectModal = document.querySelector('.connect-form__modal');
    const btnClosedConnectform = document.querySelector('.connect-form__btn-close');
    
    function openModalWindow( modalWindow, btn) {
        btn.addEventListener('click', () => {
            window.scrollTo(0, 0);
            modalWindow.classList.remove('visually-hidden');
            document.body.classList.add('no-scroll');
        });
    }
    
    function closeModalWindow(modalWindow, btn) {
        btn.addEventListener('click', () => {
            modalWindow.classList.add('visually-hidden');
            document.body.classList.remove('no-scroll');
        });
        
        window.addEventListener('keydown', function(event) {
            if(event.code === "Escape" && !modalWindow.classList.contains('visually-hidden')) {
                modalWindow.classList.add('visually-hidden');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    openModalWindow(registrationModal, btnOpenedRegform);
    openModalWindow(loginModal, btnOpenedLoginform);
    openModalWindow(connectModal, btnOpenedConnectForm);
    openModalWindow(connectModal, btnOpenedRegformFromMenu);
    openModalWindow(connectModal, btnOpenedLoginformFromMenu);

    closeModalWindow(registrationModal, btnClosedRegform);
    closeModalWindow(loginModal, btnClosedLoginform);
    closeModalWindow(connectModal, btnClosedConnectform);


(function() {
    const btnOpenedMenu = document.querySelector('.header__burger-btn--open-js');
    const menu = document.querySelector('.header__burger');
    const btnClosedMenu = document.querySelector('.header__burger-btn--close-js');

    
    btnOpenedMenu.addEventListener('click', () => {
        menu.classList.remove('close');
        document.body.classList.add('no-scroll');
        btnClosedMenu.focus();
    });
   
    btnClosedMenu.addEventListener('click', () => {
        menu.classList.add('close');
        document.body.classList.remove('no-scroll');
    });

    window.addEventListener('keydown', function(e) {
        if(e.code === "Escape" && !menu.classList.contains('close')) {
            menu.classList.add('close');
            document.body.classList.remove('no-scroll');
        }
    });   

})();

