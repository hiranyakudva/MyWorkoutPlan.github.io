const plan = {
  "Day 1 - Legs": [
    { name: "Squats", gif: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif" },
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

function showDay(dayName) {
  workoutContainer.innerHTML = `<h2>${dayName}</h2>`;

  plan[dayName].forEach(ex => {
    workoutContainer.innerHTML += `
      <div class="exercise">
        <p>${ex.name}</p>
        <img src="${ex.gif}" onclick="window.open('${ex.gif}', '_blank')">
      </div>
    `;
  });

  // Add DONE button
  workoutContainer.innerHTML += `
    <button class="done-btn" onclick="markDone('${dayName}')">
      ✅ Mark Day as Done
    </button>
  `;

  // highlight active
  document.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText === dayName) {
      btn.classList.add("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// create buttons
for (let day in plan) {
  const btn = document.createElement("button");
  btn.innerText = day;
  btn.onclick = () => {
  showDay(day);
  localStorage.setItem("selectedDay", day);
};
  buttonContainer.appendChild(btn);

  // Auto-scroll to top on day change
  window.scrollTo(0, 0);

  //Remember last selected day
  localStorage.setItem("selectedDay", dayName);
  
}

function markDone(dayName) {
  let doneDays = JSON.parse(localStorage.getItem("doneDays")) || [];

  if (!doneDays.includes(dayName)) {
    doneDays.push(dayName);
  }

  localStorage.setItem("doneDays", JSON.stringify(doneDays));

  updateDoneButtons();
  updateProgress();
}

function updateDoneButtons() {
  let doneDays = JSON.parse(localStorage.getItem("doneDays")) || [];

  document.querySelectorAll("#dayButtons button").forEach(btn => {
    if (doneDays.includes(btn.innerText)) {
      btn.classList.add("done");
    }
  });
}

const savedDay = localStorage.getItem("selectedDay");
const savedDay = localStorage.getItem("selectedDay");
showDay(savedDay || Object.keys(plan)[0]);

updateDoneButtons();
function updateProgress() {
  const totalDays = Object.keys(plan).length;
  const doneDays = JSON.parse(localStorage.getItem("doneDays")) || [];

  const doneCount = doneDays.length;

  // Update text
  document.getElementById("progressText").innerText =
    `Day ${doneCount}/${totalDays} done`;

  // Update bar
  const percent = (doneCount / totalDays) * 100;
  document.getElementById("progressFill").style.width = percent + "%";
}
