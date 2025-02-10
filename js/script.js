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
        // // якоря 
        // on('click', '.scrollTo', function(e) {
        //         if (select(this.hash)) {
        //                 e.preventDefault();
        //                 const href = e.target.getAttribute("href");
        //                 const offsetTop = select(href).offsetTop - 70;
                
        //                 scroll({
        //                         top: offsetTop,
        //                         behavior: "smooth"
        //                 });
        //         }
        // }, true)
        
        // // бургер
        // on('click', '.js-burger', function(e){
        //         select('.js-burger').classList.toggle('clicked');
        //         select('nav').classList.toggle('show');
        //         select('.nav__overlay').classList.toggle('show');
        // })
        // on('click', '.nav__overlay, .nav__link',  function(e){
        //         e.preventDefault();
        //         select('.js-burger').classList.remove('clicked');
        //         select('nav').classList.remove('show');
        //         select('.nav__overlay').classList.remove('show');
        // }, true)


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
