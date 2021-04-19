const slides = document.querySelectorAll('.slide');
const circles = document.querySelectorAll('.circle');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

const nextSlide = () => {
  const current = document.querySelector('.current');
  const currentCircle = document.querySelector('.current-circle');
  current.classList.remove('current');
  currentCircle.classList.remove('current-circle');
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add('current');
    currentCircle.nextElementSibling.classList.add('current-circle');
  } else {
    slides[0].classList.add('current');
    circles[0].classList.add('current-circle');
  }
};

const prevSlide = () => {
  const current = document.querySelector('.current');
  const currentCircle = document.querySelector('.current-circle');
  current.classList.remove('current');
  currentCircle.classList.remove('current-circle');
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add('current');
    currentCircle.previousElementSibling.classList.add('current-circle');
  } else {
    slides[slides.length - 1].classList.add('current');
    circles[slides.length - 1].classList.add('current-circle');
  }
};

let slideInterval;
next.addEventListener('click', () => {
  nextSlide();
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 10000);
});
prev.addEventListener('click', () => {
  prevSlide();
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 10000);
});
circles.forEach((circle) => {
  circle.addEventListener('click', () => {
    const current = document.querySelector('.current');
    const currentCircle = document.querySelector('.current-circle');
    current.classList.remove('current');
    currentCircle.classList.remove('current-circle');
    circles[[...circles].indexOf(circle)].classList.add('current-circle');
    slides[[...circles].indexOf(circle)].classList.add('current');
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 10000);
  });
});
slideInterval = setInterval(nextSlide, 10000);