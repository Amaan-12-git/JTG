let card = document.querySelectorAll('.card');
let arr = Array.from(card);
arr.forEach((e, i) => {
  e.style.left = `${-278 + i * 365}px`;
});
let dots = document.querySelector(".navs").querySelectorAll("img");
function updateDots(curr, prev) {
    dots.forEach((e, i)=>{
        if(i == prev) {
            e.src = "assets/icons/Dot.svg";
        } else if(i == curr) {
            e.src = "assets/icons/ActiveDot.svg"
        }
    })
}
function slider(num) {
    arr.forEach((e, idx)=>{
        let value = Number.parseInt(e.style.left.split('px')[0]);
        if(value + num > 1183) {
            e.style.left = "1500px";
            setTimeout(() => {
                e.style.transition = 'none';
                e.style.left = "-342px"
                }, 500);
            setTimeout(() => {
                e.style.transition = 'left 0.45s linear';
                e.style.left = "-278px";
                }, 600);
            setTimeout(() => {
                e.style.transition = 'left 1s linear';
                }, 1000);
        } else if(value + num < -278) {
            e.style.left = "-600px";
            setTimeout(() => {
                e.style.transition = 'none';
                e.style.left = "1300px"
                }, 500);
            setTimeout(() => {
                e.style.transition = 'left 0.45s linear';
                e.style.left = "1182px";
                }, 600);
            setTimeout(() => {
                e.style.transition = 'left 1s linear';
                }, 1000);
        } else {
            if(e.style.left == "87px" && num > 0) {
                updateDots(idx, (idx + 1) % 5);
            } else if(e.style.left == "817px" && num < 0) {
                updateDots(idx, idx == 0 ? 4 : idx - 1);
            }
            value += num;
            e.style.left = `${value}px`;
        }
    });
}
let intervalId;

function startAutoSlide() {
  intervalId = setInterval(() => {
    slider(-365);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(intervalId);
  startAutoSlide();
}

startAutoSlide();

let less = document.querySelector(".less");
let greater = document.querySelector(".greater");

less.addEventListener('click', () => {
  slider(365);
  resetAutoSlide();
});

greater.addEventListener('click', () => {
  slider(-365);
  resetAutoSlide();
});
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    slider(365);
      resetAutoSlide();
  }
  if (e.key === 'ArrowRight') {
    slider(-365);
      resetAutoSlide();
  }
});

let form = document.querySelector("form");
let modalOverlay = document.getElementById("modalOverlay");
let closeModal = document.getElementById("closeModal");
let btn = document.getElementsByClassName("hero-content")[0].getElementsByTagName('button')[0];

form.addEventListener("submit", (e) =>{
  e.preventDefault();
  document.body.classList.add("modal-open");
  modalOverlay.style.display = "flex";
  modalOverlay.getElementsByTagName('h2')[0].innerHTML = "Thank you for submitting your information!";
  modalOverlay.getElementsByTagName('p')[0].innerHTML = "We will review your submission and get back to you shortly.";
});

btn.addEventListener('click', (e) =>{
  e.preventDefault();
  document.body.classList.add("modal-open");
  modalOverlay.style.display = "flex";
  modalOverlay.getElementsByTagName('h2')[0].innerHTML = "Let’s Get Started!";
  modalOverlay.getElementsByTagName('p')[0].innerHTML = "Please fill out the form below to get started.";
});

closeModal.addEventListener("click",  () =>{
  modalOverlay.style.display = "none";
  document.body.classList.remove("modal-open");
  form.reset();
});
