document.addEventListener('DOMContentLoaded', function () {
  uiSelects()
  checkInputFill()
  headerBurger()
  headerDropPhones()
  anchor()
  clientsSlider()
  stagesSlider()
  gallerySlider()
  popupScripts()
  contacts()
  toTop()
  loader()
})

$(window).scroll(function () {
  const scrollValue = $(window).scrollTop()
  if (scrollValue > 110) {
    $('.header').addClass('header--scroll')
  } else {
    $('.header').removeClass('header--scroll')
  }
})

function loader() {
  $('html').addClass('ov-hidden')

  $(window).on('load', function () {
    $('html').removeClass('ov-hidden')
    $('.loader').fadeOut(400)
  })
}

function headerBurger() {
  $('.header__burger-btn').on('click', function () {
    if ($(this).hasClass('active')) {
      headerBurgerClose()
    } else {
      headerBurgerOpen()
    }
  })
  $('.header-overlay').on('click', function () {
    headerBurgerClose()
  })
}
function headerBurgerOpen() {
  $('html').addClass('ov-hidden')
  $('.header__burger-btn').addClass('active')
  $('.header').addClass('header--open')
  $('.header-overlay').fadeIn()
  $('.header-burger').fadeIn()
}
function headerBurgerClose() {
  $('.header__burger-btn').removeClass('active')
  $('.header').removeClass('header--open')
  $('html').removeClass('ov-hidden')
  $('.header-overlay').fadeOut()
  $('.header-burger').fadeOut()
}

function headerDropPhones() {
  const telButtons = [...document.querySelectorAll('.header__phones-open')]
  const dropContentVisivleClass = 'header__phones-drop--visible'
  for (const button of telButtons) {
    button.addEventListener('click', function () {
      this.classList.toggle('header__phones-open--active')
      this.parentElement.nextElementSibling.classList.toggle(dropContentVisivleClass)
    })
  }

  const dropContent = [...document.querySelectorAll('.header__phones-drop')]
  document.addEventListener('click', (event) => {
    const target = event.target
    let itsDropContent = false
    let dropIsActive = false
    for (const element of dropContent) {
      if (target === dropContent || element.contains(target)) {
        itsDropContent = true
      }
      if (element.classList.contains(dropContentVisivleClass)) {
        dropIsActive = true
      }
    }
    let itsButton = false
    for (const element of telButtons) {
      if (target === element) {
        itsButton = true
      }
    }
    if (!itsDropContent && !itsButton && dropIsActive) {
      for (const button of telButtons) {
        button.classList.remove('header__phones-open--active')
        button.parentElement.nextElementSibling.classList.remove(dropContentVisivleClass)
      }
    }
  })
}

function uiSelects() {
  const selects = document.querySelectorAll('.ui-select select')
  for (const select of selects) {
    const selectParent = select.parentElement
    $(select).select2({
      minimumResultsForSearch: Number.POSITIVE_INFINITY,
      width: 'auto',
      dropdownAutoWidth: true,
      dropdownParent: selectParent
    })
  }
}

function anchor() {
  $('.js-anchor').on('click', function (){
    const element = $(this).attr('href')
    const scrollValue = $(element).offset().top - $('.header').outerHeight() - 15
    $('html, body').animate({ scrollTop: scrollValue}, 400)
    return false
  })
}

function checkInputFill() {
  const uiInputs = document.querySelectorAll('.ui-input')
  if (uiInputs) {
    for (const element of uiInputs) {
      const input = element.querySelector('input')
      input.value !== '' ? input.classList.add('filled') : input.classList.remove('filled')
      input.addEventListener('input', function () {
        input.value !== '' ? input.classList.add('filled') : input.classList.remove('filled')
      })
    }
  }
}

function clientsSlider() {
  const clientsSwiper = new Swiper('.clients .swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    },
    breakpoints: {
      767: {
        spaceBetween: 30
      }
    }
  })
}

function stagesSlider() {
  const stagesSwiper = new Swiper('.stages .swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    },
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 25
      }
    }
  })
}

function gallerySlider() {
  const clientsSwiper = new Swiper('.gallery-slider .swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    centeredSlidesBounds: true,
    navigation: {
      nextEl: '.gallery-slider .swiper-button-next',
      prevEl: '.gallery-slider .swiper-button-prev'
    },
    breakpoints: {
      767: {
        spaceBetween: 30
      }
    }
  })
}

function popupScripts() {
  const galleryPopupThumb = new Swiper('.gallery-popup__thumb .swiper', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    loop: true,
    breakpoints: {
      767: {
        spaceBetween: 30
      }
    }
  })
  const galleryPopupSlider = new Swiper('.gallery-popup__slider .swiper', {
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    thumbs: {
      swiper: galleryPopupThumb
    }
  })

  $('.js-popup-gallery').on('click', function () {
    const activeIndex = $(this).index()
    Fancybox.bind('.js-popup-gallery', {
      mainClass: 'popup popup--gallery',
      parentEl: document.querySelector('.wrapper'),
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      hideScrollbar: true,
      touch: false,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false,
      closeButton: false,
      on: {
        done: (fancybox, slide) => {
          galleryPopupSlider.update()
          galleryPopupThumb.update()
          galleryPopupSlider.slideTo((activeIndex + 1), 300)
        }
      }
    })
  })

  Fancybox.bind('.js-popup-app', {
    mainClass: 'popup popup--app',
    parentEl: document.querySelector('.wrapper'),
    showClass: 'fancybox-zoomInUp',
    hideClass: 'fancybox-fadeOut',
    hideScrollbar: true,
    touch: false,
    autoFocus: true,
    trapFocus: true,
    dragToClose: false
  })

  Fancybox.defaults.ScrollLock = false
}

function contacts() {
  let myMap
  const mapzoom = $(window).width() > 767 ? 14 : 13
  const mapcenterX = $(window).width() > 767 ? 41.448003 : 41.468003

  ymaps.ready(init)
  function init() {
    myMap = new ymaps.Map('contactsMap', {
      center: [52.7591, mapcenterX],
      zoom: mapzoom,
      // controls: ['ZoomControlControl']
      controls: []
    })
    const placemark = new ymaps.Placemark([52.7591, 41.468003], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map_logo.png',
      iconImageSize: [103, 38],
      iconImageOffset: [-5, -30]
    })

    myMap.geoObjects.add(placemark)
    myMap.behaviors.disable('scrollZoom')
    if (window.innerWidth < 1025) {
      myMap.behaviors.disable('drag')
    }
  }
}

function toTop() {
  $('.footer__to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600)
    return false
  })
}
