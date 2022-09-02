'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//selector
const header = document.querySelector('.header');
const msg = document.createElement('div');
const section1 = document.querySelector('#section--1');
const scrollTo = document.querySelector('.btn--scroll-to');

// //functionalities
scrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
// smooth scrolling features
const navAllLinks = document.querySelectorAll('.nav__link');

const navBar = document
  .querySelector('.nav__links')
  .addEventListener('click', function (e) {
    e.preventDefault();
    // smooth scrooll funcitonality
    if (e.target.classList.contains('nav__link')) {
      const sectionId = e.target.getAttribute('href');
      const selectSection = document.querySelector(sectionId);
      selectSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

// =============== tab section =============================
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //tab nav area
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //gaurd clause
  if (!clicked) return;
  clicked.classList.add('operations__tab--active');
  // content area
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// =============== defocused all but current=============================
const nav = document.querySelector('.nav');
const handleOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const focused = e.target;
    const siblings = focused.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== focused) {
        el.style.opacity = this;
      }
    });
  }
};
nav.addEventListener('mouseover', handleOpacity.bind(0.5));
nav.addEventListener('mouseout', handleOpacity.bind(1));

// =============== / sticky navbar on scroll  =============================
// =============== / sticky navbar on scrool OLD SCHOOL  =============================

// window.addEventListener('scroll', function (e) {
//   const section1Cord = section1.getBoundingClientRect();
//   console.log(section1Cord.top, this.window.scrollY);
//   if (section1Cord.top <= 60) nav.classList.add('sticky');
// });
// =============== / sticky navbar on scrool MODERN METHOD  =============================
const navHeight = nav.getBoundingClientRect().height;
const sticyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else {
    nav.classList.remove('sticky');
  }
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(sticyNav, options);
headerObserver.observe(header);

// =============== / reveal on scrool ========  =============================
const selectAllSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};
const option = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(revealSection, options);
selectAllSection.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// =============== / lazy image loaidng features ========  =============================
const allImg = document.querySelectorAll('img[data-src]');
const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('lazy-img');
    entry.target.src = entry.target.dataset.src;
    observer.unobserve(entry.target);
  }
};
const imgObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  //rootmargin to load image before user reach here
  rootMargin: '200px',
});
allImg.forEach(pic => {
  imgObserver.observe(pic);
});

// =============== / lazy image loaidng features ========  =============================
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let curSlide = 0;
const maxSlide = slides.length - 1;
//change slide through iteration
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// msg.classList.add('cookie-message');
// msg.innerHTML =
//   " We use cookies to improve the serivices of our website.<buttn class='btn btn--close-cookie'> Agree </button> ";
// header.prepend(msg);
// header.append(msg.cloneNode(true));
// console.log(header.getBoundingClientRect());
// console.log(window.pageXOffset, window.pageYOffset);

// styling with random color generator functions d

// const random = function (min, max) {
//   const random = Math.floor(Math.random() * max - min) + 1;
//   return random;
// };
// const randomColor = () =>
//   `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
// document.addEventListener('click', function (e) {
//   e.target.style.color = randomColor();
// });

// =============== old school  for smoth scrolling  =============================
// scrollTo.addEventListener('click', function (e) {
//   const sectCords = section1.getBoundingClientRect();
//   console.log(sectCords);
//   console.log(sectCords.left, sectCords.top);
//   window.scrollTo({
//     left: sectCords.left + window.pageXOffset,
//     top: sectCords.top + window.pageYOffset,
//     behavior: 'smooth',
//   });
// });
// =============== /old school =============================
