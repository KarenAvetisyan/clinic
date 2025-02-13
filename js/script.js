document.addEventListener('DOMContentLoaded', function(){
        /*Easy selector helper function */
        const select = (el, all = false) => {
                el = el.trim()
                if (all) {
                return [...document.querySelectorAll(el)]
                } else {
                return document.querySelector(el)
                }
        }
        /* Easy event listener function */
        const on = (type, el, listener, all = false) => {
                let selectEl = select(el, all)
                if (selectEl) {
                if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                selectEl.addEventListener(type, listener)
                }
                }
        }
        /* Easy on scroll event listener  */
        const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
        }
        
        // бургер 
        var burger = select('.js-burger')
        var nav = select('.nav');
        document.addEventListener('click', e => {
        if(!e.target.matches('.burger')){}
                else{
                        burger.classList.toggle('clicked');
                        nav.classList.toggle('show');
                }
                if(!e.target.matches('.nav__link')){}
                else {
                        e.preventDefault();
                        burger.classList.remove('clicked');
                        nav.classList.remove('show');
                }
        })
        // хедер при при скролле 
        let selectHeader = select('.header')
        if (selectHeader) {
        const headerScrolled = () => {
        if (window.scrollY > 40) {
                selectHeader.classList.add('scrolling')
        } else {
                selectHeader.classList.remove('scrolling')
        }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(window, headerScrolled)
        }
        // слайдер в первом блоке 
        const swiperServices = select('.swiperServices');
        if(swiperServices){
                new Swiper(swiperServices, {
                slidesPerView: 'auto',
                autoplay: true,
                autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                },
                pagination: {
                        el: ".swiper-pagination",
                },
                breakpoints: {
                        768: {
                                slidesPerView: 1,
                        },
                        992: {
                                slidesPerView: 2,
                        },
                        1200: {
                                slidesPerView: 3,
                        },
                },
        });
        }
        // слайдер графики
        const swiperGraphics = document.querySelector('.swiperGraphics');
        if(swiperGraphics){
                var swiperGraph = new Swiper(swiperGraphics, {
                        loop: true,
                        speed: 1000,
                }); 
                const paginationBullets = document.querySelectorAll('.js-graph-tab');
                if(paginationBullets){
                        paginationBullets.forEach((bullet) => {
                                bullet.addEventListener('click', function() {
                                        const slideIndex = parseInt(bullet.getAttribute('data-slide'));
                                        swiperGraph.slideTo(slideIndex);
                                });
                        });
                }
                swiperGraph.on('slideChange', function() {
                        const currentIndex = swiperGraph.realIndex;
                        paginationBullets.forEach((bullet, index) => {
                          if (index === currentIndex) {
                            bullet.classList.add('active');
                          } else {
                            bullet.classList.remove('active');
                          }
                        });
                });
        }
        // якоря 
        const header = select('.header');
        on('click', '.scrollTo', function(e) {
        if (select(this.hash)) {
                e.preventDefault();
                const href = e.target.getAttribute("href");
                if(header){
                        var offsetTop = select(href).offsetTop - header.offsetHeight;
                }
                else {
                        var offsetTop = select(href).offsetTop - header.offsetHeight;
                }
                scroll({
                        top: offsetTop,
                        behavior: "smooth"
                });
        }
        }, true)
        //  активный пункт меню при скролее
        let navbarlinks = select('.scrollTo', true)
        const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
        } else {
                navbarlink.classList.remove('active')
        }
        })
        }
        window.addEventListener('load', navbarlinksActive)
        onscroll(document, navbarlinksActive)

        // слайдер Калькулятор и Форма заявки
        const swiperCalculatorForm = document.querySelector('.swiperCalculatorForm');
        if(swiperCalculatorForm){
                var swiperCalc = new Swiper(swiperCalculatorForm, {
                        loop: false,
                        speed: 1000,
                        spaceBetween: 10,
                }); 
                const paginationCalcBullets = document.querySelectorAll('.js-calc-tab');
                if(paginationCalcBullets){
                        paginationCalcBullets.forEach((bullet) => {
                                bullet.addEventListener('click', function() {
                                        const slideIndex = parseInt(bullet.getAttribute('data-slide'));
                                        swiperCalc.slideTo(slideIndex);
                                });
                        });
                }
                swiperCalc.on('slideChange', function() {
                        const currentIndex = swiperCalc.realIndex;
                        paginationCalcBullets.forEach((bullet, index) => {
                          if (index === currentIndex) {
                            bullet.classList.add('active');
                          } else {
                            bullet.classList.remove('active');
                          }
                          if(select(".js-form-slide").classList.contains('active')){
                                select('.js-form-next-slide').classList.add('hide');
                                select('.js-form-submit').classList.remove('hide');
                          }
                          else {
                                select('.js-form-next-slide').classList.remove('hide');
                                select('.js-form-submit').classList.add('hide');
                          }
                        });
                });
        }

        // кнопка далее функционал 
        document.addEventListener('click', e => {
                if(!e.target.matches('.js-form-next-slide')){}
                else {
                     if(select(".js-form-slide")) {
                        select(".js-form-slide").click();
                     }
                }
        })

        // Пользователей +/-
        // document.addEventListener('click', function(e) {
        //         if (e.target.matches('.js-increase')) {
        //             const inputField = e.target.closest('.js-form-qnt').querySelector('.js-count');
        //             inputField.value = parseInt(inputField.value) + 1;
        //         } 
        //         else if (e.target.matches('.js-decrease')) {
        //             const inputField = e.target.closest('.js-form-qnt').querySelector('.js-count');
        //             let newValue = parseInt(inputField.value) - 1;
        //             if (newValue < 1) {
        //                 newValue = 1;
        //             }
        //             inputField.value = newValue;
        //         }
        // });
        
       
})

