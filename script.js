const plan = {
  "Day 1 - Full Body": [
    { name: "Back Row", gif: "gifs/day1/backrow.gif" },
    { name: "Lunges", gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" }
  ],
  "Day 2 - Upper Body": [
    { name: "Push-ups", gif: "https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" },
    { name: "Band Row", gif: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif" }
  ],
  "Day 3 - Cardio": [
    { name: "Jump Rope", gif: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif" }
  ]
};

const buttonContainer = document.getElementById("dayButtons");
const workoutContainer = document.getElementById("workout");

/* SHOW DAY */
function showDay(dayName) {
  workoutContainer.innerHTML = `<h2>${dayName}</h2>`;

  plan[dayName].forEach(ex => {
    workoutContainer.innerHTML += `
      <div class="exercise">
        <p>${ex.name}</p>
        <img data-src="${ex.gif}" class="lazy" onclick="window.open('${ex.gif}', '_blank')">
      </div>
    `;
  });

  workoutContainer.innerHTML += `
    <button class="done-btn" id="doneBtn" onclick="markDone('${dayName}')">
      ✅ Mark Day as Done
    </button>
  `;

  // active button
  document.querySelectorAll("#dayButtons button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText === dayName) {
      btn.classList.add("active");
    }
  });

  // change button text if already done
  const doneDays = JSON.parse(localStorage.getItem("doneDays")) || [];
const doneBtn = document.getElementById("doneBtn");

if (doneDays.includes(dayName)) {
  doneBtn.innerText = "❌ Undo Completed";
} else {
  doneBtn.innerText = "✅ Mark Day as Done";
}

  window.scrollTo({ top: 0, behavior: "smooth" });
  initLazyLoad();
}

/* CREATE BUTTONS */
for (let day in plan) {
  const btn = document.createElement("button");
  btn.innerText = day;
  btn.onclick = () => {
    showDay(day);
    localStorage.setItem("selectedDay", day);
  };
  buttonContainer.appendChild(btn);
}

/* MARK DONE */
function markDone(dayName) {
  let doneDays = JSON.parse(localStorage.getItem("doneDays")) || [];

  if (doneDays.includes(dayName)) {
    // REMOVE (undo)
    doneDays = doneDays.filter(d => d !== dayName);
  } else {
    // ADD
    doneDays.push(dayName);
  }

  localStorage.setItem("doneDays", JSON.stringify(doneDays));

  updateDoneButtons();
  updateProgress();
  showDay(dayName);
}

/* UPDATE BUTTON COLORS */
function updateDoneButtons() {
  let doneDays = JSON.parse(localStorage.getItem("doneDays")) || [];

  document.querySelectorAll("#dayButtons button").forEach(btn => {
    if (doneDays.includes(btn.innerText)) {
      btn.classList.add("done");
    }
  });
}

/* PROGRESS BAR */
function updateProgress() {
  const totalDays = Object.keys(plan).length;
  const doneDays = JSON.parse(localStorage.getItem("doneDays")) || [];

  const doneCount = doneDays.length;

  document.getElementById("progressText").innerText =
    `Day ${doneCount}/${totalDays} done`;

  const percent = (doneCount / totalDays) * 100;
  document.getElementById("progressFill").style.width = percent + "%";
}

/* LOAD */
const savedDay = localStorage.getItem("selectedDay");
showDay(savedDay || Object.keys(plan)[0]);

updateDoneButtons();
updateProgress();

function initLazyLoad() {
  const images = document.querySelectorAll("img.lazy");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        obs.unobserve(img);
      }
    });
  });

  images.forEach(img => observer.observe(img));
}
