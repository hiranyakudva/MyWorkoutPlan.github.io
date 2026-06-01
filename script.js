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

const container = document.getElementById("days");

for (let day in plan) {
  const dayDiv = document.createElement("div");
  dayDiv.className = "day";

  dayDiv.innerHTML = `<h2>${day}</h2>`;

  plan[day].forEach(ex => {
    dayDiv.innerHTML += `
      <div class="exercise">
        <p>${ex.name}</p>
        <img src="${ex.gif}">
      </div>
    `;
  });

  container.appendChild(dayDiv);
}
