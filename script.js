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
  previewSlides.forEach((el) => (el.style.zIndex = "0"));
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
  } else if (slide === 0) {
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
  switchColor(slide);
  bgSwitch(slide);
  switchPreview(slide);
};

// Switch primary color
const switchColor = function (slide) {
  if (slide === 1)
    document.documentElement.style.setProperty("--primary-color", "#f32314");
  if (slide === 2)
    document.documentElement.style.setProperty("--primary-color", "#ffe81a");
  if (slide === 0)
    document.documentElement.style.setProperty("--primary-color", "#17f5f9");
};

// Move to Previous Slide
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = 2;
  } else {
    currentSlide--;
  }
  switchSlide(currentSlide);
};

// Move to Next Slide
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  switchSlide(currentSlide);
};

// Event Listeners on Buttons
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Event Listeners on arrow keys
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

// Event Listeners on each preview slide
previewSlides.forEach((pSlide) => {
  pSlide.addEventListener("click", (e) => {
    let slideNum = Number(e.currentTarget.dataset.slideNum);
    switchSlide(slideNum);
    currentSlide = slideNum;
  });
});

// Initialization function
(function () {
  previewSlides[currentSlide].style.transform = `scale(1.2)`;
  previewSlides[currentSlide].style.zIndex = 12;
})();
