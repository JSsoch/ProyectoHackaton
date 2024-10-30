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
  const weeklyProgress = [5, 6, 7, 5, 8, 6, 7];
const monthlyProgress = [20, 23, 25, 30, 22, 24, 27, 25, 29, 26, 30, 28];

function renderWeeklyProgressChart() {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Progreso Semanal',
                data: weeklyProgress,
                backgroundColor: '#76c7c0',
                borderColor: '#5ab3b2',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function renderMonthlyProgressChart() {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: monthlyProgress.length }, (_, i) => `Día ${i + 1}`),
            datasets: [{
                label: 'Progreso Mensual',
                data: monthlyProgress,
                borderColor: '#ff9f40',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    renderWeeklyProgressChart();
    renderMonthlyProgressChart();
});

function requestNotificationPermission() {
  if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
              console.log("Permiso de notificación concedido.");
          } else {
              console.log("Permiso de notificación denegado.");
          }
      });
  }
}

// Función para mostrar notificación personalizada
function sendCustomNotification(habitName) {
  const currentHour = new Date().getHours();
  let greeting = '';

  if (currentHour < 12) {
      greeting = 'Buenos días';
  } else if (currentHour < 18) {
      greeting = 'Buenas tardes';
  } else {
      greeting = 'Buenas noches';
  }

  const message = `${greeting}, ¡es hora de trabajar en tu hábito: ${habitName}!`;

  if (Notification.permission === 'granted') {
      new Notification('Recordatorio de Hábito', {
          body: message,
          icon: 'icono.png' // Agrega el ícono adecuado si tienes uno
      });
  }
}

// Ejemplo: enviar notificación personalizada para un hábito en específico
document.addEventListener('DOMContentLoaded', () => {
  requestNotificationPermission();
  // Puedes ajustar esto según la lógica de tus hábitos
  setInterval(() => {
      sendCustomNotification("Lectura de 20 minutos");
  }, 60 * 60 * 1000); // Ejemplo: notificación cada hora
});