let classes = JSON.parse(localStorage.getItem("classes")) || [];

function saveData() {
  localStorage.setItem("classes", JSON.stringify(classes));
}

function render() {
  let container = document.getElementById("classes");
  container.innerHTML = "";

  classes.forEach((cls, index) => {
    container.innerHTML += `
      <div>
        <h3>${cls.name}</h3>
        <p>Attended: ${cls.attended} / ${cls.total}</p>
        <button onclick="markAttended(${index})">✅ Attend</button>
      </div>
    `;
  });
}

function addClass() {
  let name = prompt("Class name?");
  let total = prompt("Total sessions?");

  classes.push({
    name,
    total: parseInt(total),
    attended: 0
  });

  saveData();
  render();
}

function markAttended(index) {
  classes[index].attended++;
  saveData();
  render();
}

render();
