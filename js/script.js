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
        if (window.scrollY > 100) {
                selectHeader.classList.add('scrolling')
        } else {
                selectHeader.classList.remove('scrolling')
        }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(window, headerScrolled)
        }
        // слайдер в первом блоке 
        var swiperServices = select('.swiperServices');
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
        var swiperGraphics = document.querySelector('.swiperGraphics');
        if(swiperGraphics){
                var swiper = new Swiper(swiperGraphics, {
                        loop: true,
                        speed: 1000,
                }); 
                const paginationBullets = document.querySelectorAll('.swiper-pagination-tab');
                if(paginationBullets){
                        paginationBullets.forEach((bullet) => {
                                bullet.addEventListener('click', function() {
                                        const slideIndex = parseInt(bullet.getAttribute('data-slide'));
                                        swiper.slideTo(slideIndex);
                                });
                        });
                }
                swiper.on('slideChange', function() {
                        const currentIndex = swiper.realIndex;
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

        // // observer, анимация на скролле 
        // const inViewport = (element, observer) => {
        // element.forEach(entry => {
        //         entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
        //         element.forEach(item => {
        //         if(item.target.classList.contains('is-inViewport') && !item.target.classList.contains('watched')){
        //         item.target.classList.add("watched");
        //         }
        //         })
        // });
        // };
        // let ioConfiguration = {
        // rootMargin: '0% 0% 0% 0%',
        // threshold: 0.2
        // };
        // const Obs = new IntersectionObserver(inViewport, ioConfiguration);
        // const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
        // const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
        // ELs_inViewport.forEach(EL => {
        // Obs.observe(EL, obsOptions);
        // });

})

