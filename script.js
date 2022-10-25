"use strict";

function debounce(func, wait = 50, immediate = true) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const SLIDES = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  SLIDES.forEach((slide) => {
    const SLIDE_IN_AT = window.scrollY + window.innerHeight - slide.height / 2;
    const SLIDE_BOTTOM = slide.offsetTop + slide.height;
    const IS_HALF_SHOWN = SLIDE_IN_AT > slide.offsetTop;
    const IS_NOT_SCROLLED_PAST = window.scrollY < SLIDE_BOTTOM;

    if (IS_HALF_SHOWN && IS_NOT_SCROLLED_PAST) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
