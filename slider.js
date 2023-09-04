const slides = document.querySelectorAll('.slide');
const circles = document.querySelectorAll('.circle');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const show = document.querySelector('#show');
const closeBtn = document.querySelector('.close-btn');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalMessage = document.querySelector('.message');

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
  const response = await fetch('https://dg-clan.com/api/players/?ip=51.178.185.229:7777');
  const data = await response.json();
  return data;
};

const openModal = () => {
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.opacity = 1;
    modalContent.style.transform = 'translateY(100px)';
  }, 10);
}

const closeModal = () => {
  modalContent.style.transform = 'translateY(-100px)';
  modal.style.opacity = 0;
  setTimeout(() => modal.style.display = 'none', 400);
}

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
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target == modal) closeModal();
});
show.addEventListener('click', async () => {
  const table = document.querySelector('.online-table');
  if (show.innerHTML === 'Show') {
    const data = await query();
    if (data.msg === 'Server is offline...') {
      modalMessage.innerHTML = data.msg;
      openModal();
      return setTimeout(closeModal, 10000);
    }
    if (!data.players[0]) {
      modalMessage.innerHTML = 'No players online...';
      openModal();
      return setTimeout(closeModal, 10000);
    }
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
    table.style.opacity = 1;
    show.innerHTML = 'Hide';
  } else {
    table.style.opacity = 0;
    show.innerHTML = 'Show';
  }
});