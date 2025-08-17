//Map
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleMapBtn");
  const mapContainer = document.getElementById("mapContainer");

  toggleBtn.addEventListener("click", function () {
    mapContainer.classList.toggle("visible");
  });
});

//Burger menü
function toggleMenu() {
  const nav = document.querySelector('.navigation');
  nav.classList.toggle('active');
}

//foglalás
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;

  const escapeRooms = document.querySelectorAll(".escape-room");
  const timeSlots = document.querySelectorAll(".time-slot");
  let selectedRoom = "";
  let selectedTime = "";

  const summaryRoom = document.getElementById("summary-room");
  const summaryTeam = document.getElementById("summary-team");
  const summaryEmail = document.getElementById("summary-email");
  const summaryDate = document.getElementById("summary-date");
  const summaryTime = document.getElementById("summary-time");

  // Szobák kiválasztása
  escapeRooms.forEach(btn => {
    btn.addEventListener("click", () => {
      escapeRooms.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");  // kiválasztott szobának selected osztály
      selectedRoom = btn.textContent;
    });
  });

  // Időpont kiválasztás
  timeSlots.forEach(btn => {
    btn.addEventListener("click", () => {
      timeSlots.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");  // kiválasztott időpontnak selected osztály
      selectedTime = btn.textContent;
    });
  });

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = (i === index) ? "block" : "none";
    });

    // Foglalás gomb csak a STEP 3-nál
    const submitBtn = document.getElementById("submit");
    if (index === steps.length - 1) {
      submitBtn.style.display = "inline-block";

      // Összegzés frissítése
      summaryRoom.textContent = selectedRoom || "-";
      summaryTeam.textContent = document.getElementById("team-name").value;
      summaryEmail.textContent = document.getElementById("email").value;
      summaryDate.textContent = document.getElementById("calendar").value;
      summaryTime.textContent = selectedTime || "-";
    } else {
      submitBtn.style.display = "none";
    }
  }

  showStep(currentStep);

  // Tovább és előző gombok
  document.querySelectorAll(".next").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep === 0 && !selectedRoom) return alert("Válassz szobát!");
      if (currentStep === 1 && (!document.getElementById("calendar").value || !selectedTime)) return alert("Válassz dátumot és időpontot!");
      if (currentStep === 2 && (!document.getElementById("team-name").value || !document.getElementById("email").value)) return alert("Add meg a csapat nevét és email címet!");
      currentStep = Math.min(currentStep + 1, steps.length - 1);
      showStep(currentStep);
    });
  });

  document.querySelectorAll(".prev").forEach(btn => {
    btn.addEventListener("click", () => {
      currentStep = Math.max(currentStep - 1, 0);
      showStep(currentStep);
    });
  });

  // Foglalás gomb átirányítás
  document.getElementById("submit").addEventListener("click", () => {
    window.location.href = "../sub/404.html";
  });
});

// FAQ kezelése
const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
