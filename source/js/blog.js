// вызов функции открытия и закрытия формы входа
popupHandler('popup__login-form_js', 'header__login-btn_js', 'login-form__btn-close_js');
// вызов функции открытия и закрытия формы регистрации
popupHandler('popup__registration-form_js', 'header__reg-btn_js', 'registration-form__btn-close_js');
// вызов функции открытия и закрытия для отправки сообщения
popupHandler('popup__connect-form_js', 'footer__btn-connect_js', 'connect-form__btn-close_js');
// вызов функции открытия и закрытия форм из мобильного меню 
popupMobileHandler('popup__login-form_js', 'header__burger-login-btn_js', 'login-form__btn-close_js');
popupMobileHandler('popup__registration-form_js', 'header__burger-reg-btn_js', 'registration-form__btn-close_js');

/* _______________________________ FILTER __________________________________ */
// получение  и отрисовка тегов  и постов
(function() {
    const filter = document.forms.filterForm;
    const resetBtn = filter.querySelector('.filter__reset-btn_js');
    const btnBack = document.querySelector('.blog__btn-back_js');
    const btnNext = document.querySelector('.blog__btn-next_js');
    const defaultPostsCountOnPage = 10;
 
    filter.addEventListener('submit', (e) => {
        e.preventDefault();  
        
        let data = {
           page: 0,
        };

        data.name = filter.elements.name.value;
        data.tags = [...filter.elements.tags]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        data.comments = [...filter.elements.comments]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        data.sorts = ([...filter.elements.sorts]
            .find(radio => radio.checked) || {value: null}).value;
        data.countShow = ([...filter.elements.countShow]
            .find(count => count.checked) || {value: null}).value;
        data.views = ([...filter.elements.views]
            .find(view => view.checked) || {value: null}).value;

        //console.log(data);
        getPostsData(data); // получаем данные с фильтра для дальнейшей работы с ними
        setSearchParams(data); // устанавливаем параметры поиска
    });

    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_SERVER_PATH + '/api/tags')
    xhr.send();
    showLoader();
    xhr.onload = () => {
        const tags = JSON.parse(xhr.response).data;
        const tagsBox = document.querySelector('.filter__tags-inner_js');
        tags.forEach(tag => {
            const tagHTML = createTag(tag);
            tagsBox.insertAdjacentHTML('beforeend', tagHTML);
        });

        if(!location.search.length && localStorage.getItem('searchParams')) {
            location.search = localStorage.getItem('searchParams');
        };

        const params = getParamsFromLocation(); // получаем данные из location.search
        //console.log(params);
        setDataToFilter(params);
        getPostsData(params);

        removeLoader();
    }

    if(btnBack) {
        btnBack.addEventListener('click', () => {
            setActivePostsPage(getParamsFromLocation().page - 1);
        });
    }
    if(btnNext) {
        btnNext.addEventListener('click', () => {
            setActivePostsPage(getParamsFromLocation().page + 1);
        });
    }

    if(resetBtn) {
        resetBtn.addEventListener('click', () => {
            if(location.search.length && localStorage.getItem('searchParams')) {
                history.replaceState(null, null, window.location.pathname);
            };
        });
    }

    // из данной функции получаем объект с текущими данными
    function getParamsFromLocation() {
        let searchParams = new URLSearchParams(location.search);
        return {
            name: searchParams.get('name') || '',
            tags: searchParams.getAll('tags'),
            comments: searchParams.getAll('comments'),
            sorts: searchParams.get('sorts'),
            views: searchParams.get('views'),
            countShow: searchParams.get('countShow'),
            page: +searchParams.get('page' || 0,)
        }
    }

    function setSearchParams(data) {  // функция формирующая location.search
        let searchParams = new URLSearchParams();
        searchParams.set('name', data.name);
        data.tags.forEach(tag => {
            searchParams.append('tags', tag);
        });
        if(data.sorts) {
            searchParams.set('sorts', data.sorts);
        }
        if(data.views) {
            searchParams.set('views', data.views);
        }
        if(data.comments) {
            data.comments.forEach(comment => {
                searchParams.append('comments', comment);
            });
        }
        if(data.countShow) {
            searchParams.set('countShow', data.countShow);
        } 
        if(data.page) {
            searchParams.append('page', data.page);
        } else {
            searchParams.set('page', 0);
        }

        history.replaceState(null, document.title, '?' + searchParams.toString());
        localStorage.setItem('searchParams', searchParams.toString()); // сохраняем данные фильтра и постов в локальном хранилище
    }

    // функция, формирующая посты по данным с сервера
    function getPostsData(params) {
        const result = document.querySelector('.posts_js'); // получаем контейнер под посты
        const links = document.querySelector('.blog__pagination_js'); // получаем контейнер под ссылки на странички постов

        let xhr = new XMLHttpRequest();
        let searchParams = new URLSearchParams();
        searchParams.set('v', '1.0.0');

        if(params.tags && Array.isArray(params.tags) && params.tags.length) {
            searchParams.set('tags', JSON.stringify(params.tags));
        }

        let filter = {};

        if(params.name) {
            filter.title = params.name;
        }

        if(params.comments.length) {
            let selectedCommentsCount = [params.comments[0].split('-')[0], params.comments[params.comments.length-1].split('-')[1]];
            //console.log(selectedCommentsCount);
            filter.commentsCount = {"$between": selectedCommentsCount};
        }

        if (params.views) {
            let selectedViews = (params.views).split('-');
            //console.log(selectedViews);
            filter.views = {"$between": selectedViews};
        };

        searchParams.set('filter', JSON.stringify(filter));

        let selectedPostsCountOnPage = defaultPostsCountOnPage;

        if(+params.countShow) {
            selectedPostsCountOnPage = +params.countShow;
        }

        searchParams.set('limit', selectedPostsCountOnPage);

        if(+params.page) {
            searchParams.set('offset', (+params.page) * selectedPostsCountOnPage);
        }

        if(params.sorts) {
            searchParams.set('sort', JSON.stringify([params.sorts, 'DESC']));
        }

        xhr.open('GET', BASE_SERVER_PATH + '/api/posts?' + searchParams.toString());
        xhr.send();
        showLoader();
        result.innerHTML = '';
        links.innerHTML = '';
        xhr.onload = () => {
            const response = JSON.parse(xhr.response);
            let dataPosts = '';
            response.data.forEach(post => {
                dataPosts += createCard({
                    title: post.title, 
                    text: post.text, 
                    comments: post.commentsCount, 
                    date: dateProcessing(post.date), 
                    views: post.views, 
                    photo: post.photo, 
                    tags: post.tags
                })
            });

            result.innerHTML = dataPosts;

            const pageCount = Math.ceil(response.count / selectedPostsCountOnPage);
            for(let i = 0; i < pageCount; i++) {
                const link = createLinkElement(i);
                links.insertAdjacentElement('beforeend', link);
            }

            if(btnBack) {
                if(getParamsFromLocation().page === 0) {
                    btnBack.setAttribute('disabled', '');
                } else {
                    btnBack.removeAttribute('disabled');
                }
            }
            if(btnNext) {
                // если страница одна, или последняя (отсчет от 0)
                if(pageCount === 0 || getParamsFromLocation().page === (pageCount - 1)) {
                    btnNext.setAttribute('disabled', '');
                } else {
                    btnNext.removeAttribute('disabled');
                }
            }
            removeLoader();
        }
    }

    function createLinkElement(page) {
        const link = document.createElement('a');
        link.href = '?page=' + page;
        link.innerText = `${page + 1}`;
        link.classList.add('blog__link_js');
        link.classList.add('blog__link');

        let params = getParamsFromLocation();
        if (page === +params.page) {
            link.classList.add('active');
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            setActivePostsPage(page); 
        });

        return link;
    }

    function setActivePostsPage(page) {
        const links = document.querySelectorAll('.blog__link_js');
        let searchParams = new URLSearchParams(location.search);
        let params = getParamsFromLocation();

        links[params.page].classList.remove('active');
        searchParams.set('page', page);
        links[page].classList.add('active');

        history.replaceState(null, document.title, '?' + searchParams.toString());
        getPostsData(getParamsFromLocation());
    }

    function setDataToFilter(data) {
        const form = document.forms.filterForm;
        form.elements.name.value = data.name;
        form.elements.tags.forEach(checkbox => {
            checkbox.checked = data.tags.includes(checkbox.value);
        });
        form.elements.sorts.forEach(radio => {
            radio.checked = data.sorts === radio.value;
        });
        form.elements.views.forEach(view => {
            view.checked = data.views === view.value;
        });
        form.elements.comments.forEach(comment => {
            comment.checked = data.comments.includes(comment.value);
        });
        form.elements.countShow.forEach(item => {
            item.checked = data.countShow === item.value;
        });
    }

    function createCard({title, text, comments, date, views, photo, tags}) {
        return `
            <div class="card">
            <picture class="card__photo-wrapper">
                <source class="card__photo" srcset="${BASE_SERVER_PATH}${photo.desktopPhotoUrl}, ${BASE_SERVER_PATH}${photo.desktop2xPhotoUrl} 2x" media="(min-width: 769px)">
                <source class="card__photo" srcset="${BASE_SERVER_PATH}${photo.tabletPhotoUrl}, ${BASE_SERVER_PATH}${photo.tablet2xPhotoUrl} 2x" media="(min-width: 376px) and (max-width: 768px)">
                <source class="card__photo" srcset="${BASE_SERVER_PATH}${photo.mobilePhotoUrl}, ${BASE_SERVER_PATH}${photo.mobile2xPhotoUrl} 2x" media="(max-width: 375px)">
                <img class="card__photo" src="${BASE_SERVER_PATH}${photo.desktopPhotoUrl}" alt="${title}">
            </picture>
            <div class="card__wrapper">
                <div class="card__tags">
                ${tags.map(tag => `<span style="background-color: ${tag.color}"></span>`).join('')}
                </div>
                <div class="card__inner">
                <p class="card__date">${date}</p>
                <p class="card__views">${views} views</p>
                <p class="card__comments">${comments} comments</p>
                </div>
                <h5 class="card__title">${title}</h5>
                <p class="card__text">${text}</p>
                <a class="card__link" href="#">Go to this post</a>
            </div>
            </div>`
    }

    function createTag({id, name, color}) {
        return `<div class="tag-wrapper">
            <input class="tag-input" type="checkbox" id="tags-${id}" name="tags" value="${id}" aria-label="${name}">
            <label class="tag-label" for="tags-${id}" style="border-color: ${color}"></label>
        </div>`; 
    }

    function dateProcessing(dateFromServer) {
        let date = new Date(dateFromServer);

        let yearValue = date.getFullYear();
        let monthValue = date.getMonth() + 1;
        let dayValue = date.getDate();

        if (monthValue < 10) {
            monthValue = '0' + monthValue;
        }
        if(dayValue < 10) {
            dayValue = '0' + dayValue;
        }
        const finalDate = `${dayValue}.${monthValue}.${yearValue}`;
        return finalDate;
    }

})();
