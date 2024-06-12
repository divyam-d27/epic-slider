const app = document.querySelector(".app");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const bgImg = document.querySelector(".bg__img");

const slides = document.querySelectorAll(".slide__item");
const slidesImages = document.querySelectorAll(".slide__img");
const slidesContent = document.querySelectorAll(".item__content");
const previewSlides = document.querySelectorAll(".preview__item");

const slider = document.querySelector(".slider");

let currentSlide = 1;

let maxSlide = previewSlides.length;

// Switch Preview

const switchPreview = function (slide) {
  if (slide === 1) {
    previewSlides[0].style.transform = `translateX(${0}%)`;
    previewSlides[1].style.transform = `translateX(${0}%) scale(1.2)`;
    previewSlides[1].style.zIndex = 12;
    previewSlides[2].style.transform = `translateX(${0}%)`;
  } else if (slide === 2) {
    previewSlides[0].style.transform = `translateX(${200}%)`;
    previewSlides[1].style.transform = `translateX(${-100}%)`;
    previewSlides[2].style.transform = `translateX(${-100}%) scale(1.2)`;
    previewSlides[2].style.zIndex = 12;
  } else {
    previewSlides[0].style.transform = `translateX(${100}%) scale(1.2)`;
    previewSlides[0].style.zIndex = 12;
    previewSlides[1].style.transform = `translateX(${100}%)`;
    previewSlides[2].style.transform = `translateX(${-200}%)`;
  }
};

// Switch Background

const bgSwitch = function (slide) {
  bgImg.classList.add("opacity-0");
  setTimeout(() => {
    bgImg.src = `./assets/img${slide}.jpg`;
    bgImg.addEventListener("load", () => {
      bgImg.classList.remove("opacity-0");
    });
  }, 500);
};

//  Switch Slide
const switchSlide = function (slide) {
  slider.classList.add("hide");
  slides.forEach((el) => {
    el.classList.remove("slide__active");
  });
  slides[slide].classList.add("slide__active");
  bgImg.addEventListener("load", () => {
    slider.classList.remove("hide");
  });
  bgSwitch(slide);
  switchPreview(slide);
};

// Move to Previous Slide

const prevSlide = function () {
  previewSlides[currentSlide].style.zIndex = 0;

  if (currentSlide === 0) {
    currentSlide = 2;
  } else {
    currentSlide--;
  }
  switchSlide(currentSlide);
};

// Move to Next Slide

const nextSlide = function () {
  previewSlides[currentSlide].style.zIndex = 0;

  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  switchSlide(currentSlide);
};

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// on arrow keys
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

(function () {
  slides[currentSlide].style.zIndex = 1;
  previewSlides[currentSlide].style.transform = `scale(1.2)`;
  previewSlides[currentSlide].style.zIndex = 12;
})();
