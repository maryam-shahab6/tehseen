const scenes = [...document.querySelectorAll(".scene")];
let current = 0;

function goTo(index) {
  scenes[current].classList.remove("active");
  current = index;
  scenes[current].classList.add("active");
}

/* =========================
   SOUNDS
========================= */

const sounds = {
  meow: new Audio("assets/cat-meow.mp3"),
  purr: new Audio("assets/cat-purr.mp3"),
  sparkle: new Audio("assets/sparkle.mp3"),
  birthday: new Audio("assets/cat-happy-birthday.mp3"),
  tada: new Audio("assets/tada.mp3"),
  envelope: new Audio("assets/envelope.mp3"),
  funnyMeow: new Audio("assets/funny-meow.mp3")
};

function playSound(sound) {
  if (!sound) return;

  sound.currentTime = 0;

  sound.play().catch(() => {
    console.log("Browser blocked the sound.");
  });
}


/* =========================
   SCENE 1 → SCENE 2
========================= */

document.getElementById("wakeBtn").addEventListener("click", () => {

  // Tiny purr first
  playSound(sounds.purr);

  setTimeout(() => {
    playSound(sounds.meow);
  }, 250);

  goTo(1);
});


/* =========================
   SCENE 2 → SCENE 3
========================= */

document.getElementById("birthdayBtn").addEventListener("click", () => {

  playSound(sounds.sparkle);

  goTo(2);
});


/* =========================
   CAKE
========================= */

const cake = document.getElementById("cake");

function cutCake() {

  if (cake.classList.contains("cut")) return;

  cake.classList.add("cut");

  cake.style.transform = "rotate(-3deg) scale(1.05)";

  document.querySelector(".cake-hint").textContent = "🎂✨";

  document.querySelector(".cake-text").textContent =
    "YES. THAT'S THE ONE.";

  // Cat sings Happy Birthday
  playSound(sounds.birthday);

  setTimeout(() => {

    goTo(3);

    // Celebration sound
    playSound(sounds.tada);

    makeConfetti();

  }, 850);
}

cake.addEventListener("click", cutCake);

cake.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    cutCake();
  }
});


/* =========================
   SCENE 4 → SCENE 5
========================= */

document.getElementById("letterBtn").addEventListener("click", () => {

  playSound(sounds.sparkle);

  goTo(4);
});


/* =========================
   OPEN ENVELOPE
========================= */

document.getElementById("envelope").addEventListener("click", () => {

  playSound(sounds.envelope);

  setTimeout(() => {
    goTo(5);
  }, 300);

});

document.getElementById("envelope").addEventListener("keydown", e => {

  if (e.key === "Enter" || e.key === " ") {

    playSound(sounds.envelope);

    setTimeout(() => {
      goTo(5);
    }, 300);

  }

});


/* =========================
   FINAL BUTTON
========================= */

document.getElementById("finishBtn").addEventListener("click", () => {

  goTo(6);

  // Funny cat sound
  setTimeout(() => {
    playSound(sounds.funnyMeow);
  }, 300);

});


/* =========================
   CONFETTI
========================= */

function makeConfetti() {

  const holder = document.getElementById("confetti");

  holder.innerHTML = "";

  for (let i = 0; i < 90; i++) {

    const p = document.createElement("span");

    p.className = "piece";

    p.style.left = Math.random() * 100 + "%";

    p.style.top = (-Math.random() * 30 - 5) + "%";

    p.style.animationDelay =
      (Math.random() * 1.2) + "s";

    p.style.background =
      `hsl(${Math.random() * 360}, 65%, 78%)`;

    p.style.transform =
      `rotate(${Math.random() * 180}deg)`;

    holder.appendChild(p);
  }
}


/* =========================
   ESCAPE = START OVER
========================= */

document.addEventListener("keydown", e => {

  if (e.key === "Escape") {
    goTo(0);
  }

});