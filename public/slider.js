const slides = document.querySelectorAll('.slide');
const circles = document.querySelectorAll('.circle');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const show = document.querySelector('#show');

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

const query = async () => {
  const response = await fetch('/api');
  const data = await response.json();
  return data;
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
show.addEventListener('click', async () => {
  const data = await query();
  if (data.msg === 'Server is offline...') return alert(data.msg);
  if (!data.players[0]) return alert('No player connected.');
  let playerList = '';
  data.players.forEach((player) => {
    const row = `
      <tr>
        <td>${player.raw.id}</td>
        <td>${player.name}</td>
        <td>${player.raw.score}</td>
        <td>${player.raw.ping}</td>
      </tr>
    `;
    playerList += row;
  });
  document.querySelector('.players').innerHTML = playerList;
  const table = document.querySelector('.online-table');
  if (show.innerHTML === 'Show') {
    table.style.opacity = 1;
    show.innerHTML = 'Hide';
  } else {
    table.style.opacity = 0;
    show.innerHTML = 'Show';
  }
});