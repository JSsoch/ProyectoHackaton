const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  let habits = [];
  
  function addHabit() {
    const habitName = document.getElementById("habitName").value;
    const frequency = document.getElementById("frequency").value;
  
    if (habitName && frequency) {
      db.collection("habits").add({
        name: habitName,
        frequency: parseInt(frequency),
        progress: 0
      }).then(() => {
        alert("Hábito agregado exitosamente.");
        loadHabits();
      }).catch(error => {
        console.error("Error al agregar hábito: ", error);
      });
    }
  }
  
  function loadHabits() {
    db.collection("habits").get().then(snapshot => {
      habits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderHabits();
    });
  }
  
  function renderHabits() {
    const habitsContainer = document.getElementById("habits");
    habitsContainer.innerHTML = "";
  
    habits.forEach(habit => {
      const habitElement = document.createElement("div");
      habitElement.className = "habit";
  
      const name = document.createElement("span");
      name.innerText = habit.name;
  
      const progressBar = document.createElement("div");
      progressBar.className = "progress-bar";
      progressBar.style.width = `${(habit.progress / habit.frequency) * 100}%`;
  
      habitElement.appendChild(name);
      habitElement.appendChild(progressBar);
      habitsContainer.appendChild(habitElement);
    });
  }
  
  function setupNotifications() {
    setInterval(() => {
      habits.forEach(habit => {
        if (habit.progress < habit.frequency) {
          alert(`No olvides trabajar en tu hábito: ${habit.name}`);
        }
      });
    }, 24 * 60 * 60 * 1000); 
  }
  
  // Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    loadHabits();
    setupNotifications();
  });