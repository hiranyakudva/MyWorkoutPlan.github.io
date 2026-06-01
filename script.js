const warmup = [
  "Arm Circles – 10 each direction",
  "Hip Circles – 10 each direction",
  "Leg Swings - 10 each",
  "Glute Bridges - 10",
  "Squats – 10",
  "Lunges - 10"

];

const cooldown = [
  "Shoulder Stretch - 30 sec",
  "Quad Stretch - 30 sec",
  "Hamstring Stretch - 30 sec",
  "Knee to chest - 30 sec",
  "Cat and Cow - 30 sec",
  "Child’s Pose – 30 sec"
];

const plan = {
  "Day 1 - Full Body": [
    { name: "Back Row", gif: "gifs/day1/backrow.gif" },
    { name: "Dumbell Squat", gif: "gifs/day1/dumbellsquat.gif" },
    { name: "Goblet March", gif: "gifs/day1/gobletmarch.gif" },
    { name: "Overhead Tricep Extension", gif: "gifs/day1/overheadtriceps.gif" },
    { name: "Overhead Press and Crunch", gif: "gifs/day1/pressandcrunch.gif" },
    { name: "Squat and Bicep Curl", gif: "gifs/day1/squatandcurl.gif" }
  ],
  "Day 2 - Arms": [
    { name: "Single Arm Reverse Grip Row", gif: "gifs/day2/singlearmbackrow.gif" },
    { name: "Back Row and Bicep Curl", gif: "gifs/day2/backrowandhammercurl.gif" },
    { name: "Flip Grip Bicep Curls", gif: "gifs/day2/flipgripbicepcurls.gif" },
    { name: "Hammer Curl and Shoulder Press", gif: "gifs/day2/hammercurlandpress.gif" },
    { name: "Dumbell Chest Press", gif: "gifs/day2/chestpress.gif" },
    { name: "Single Arm Tricep Kickback", gif: "gifs/day2/tricepkickback.gif" }
  ],
  "Day 3 - Leg day": [
    { name: "Jump Rope", gif: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif" }
  ]
};

const buttonContainer = document.getElementById("dayButtons");
const workoutContainer = document.getElementById("workout");

/* SHOW DAY */
function showDay(dayName) {
  workoutContainer.innerHTML = `<h2>${dayName}</h2>`;

  // 🔥 Warm-up
  workoutContainer.innerHTML += `
    <div class="section">
      <h3>🔥 Warm-up</h3>
      <ul>
        ${warmup.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;

  // 🏋️ Main workout (with GIFs)
  if (!plan[dayName]) {
  dayName = Object.keys(plan)[0]; // fallback safely
}
  plan[dayName].forEach(ex => {
    workoutContainer.innerHTML += `
      <div class="exercise">
        <p>${ex.name}</p>
        <img data-src="${ex.gif}" class="lazy" onclick="window.open('${ex.gif}', '_blank')">
      </div>
    `;
  });

  // ❄️ Cool-down
  workoutContainer.innerHTML += `
    <div class="section">
      <h3>❄️ Cool-down</h3>
      <ul>
        ${cooldown.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;

  // ✅ Done button
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

  // toggle button text
  const doneDays = JSON.parse(localStorage.getItem("doneDays")) || [];
  const doneBtn = document.getElementById("doneBtn");

  if (doneDays.includes(dayName)) {
    doneBtn.innerText = "❌ Undo Completed";
  } else {
    doneBtn.innerText = "✅ Mark Day as Done";
  }

  initLazyLoad();
  window.scrollTo({ top: 0, behavior: "smooth" });
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
    // FIRST remove all done states
    btn.classList.remove("done");

    // THEN add only if needed
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

if (savedDay && plan[savedDay]) {
  showDay(savedDay);
} else {
  showDay(Object.keys(plan)[0]);
}
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

function resetProgress() {
  const confirmReset = confirm("Reset all progress?");

  if (!confirmReset) return;

  localStorage.removeItem("doneDays");

  updateDoneButtons();   // now properly clears colors
  updateProgress();

  const savedDay = localStorage.getItem("selectedDay");
  showDay(savedDay || Object.keys(plan)[0]);
}

document.getElementById("resetBtn").onclick = resetProgress;
