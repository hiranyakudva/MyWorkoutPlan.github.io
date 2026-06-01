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

  // highlight active button
  document.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText === dayName) {
      btn.classList.add("active");
    }
  });

  // scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// create buttons
for (let day in plan) {
  const btn = document.createElement("button");
  btn.innerText = day;
  btn.onclick = () => showDay(day);
  buttonContainer.appendChild(btn);

  // Auto-scroll to top on day change
  window.scrollTo(0, 0);

  //Remember last selected day
  localStorage.setItem("selectedDay", dayName);
  
}

const savedDay = localStorage.getItem("selectedDay");
showDay(savedDay || Object.keys(plan)[0]);
