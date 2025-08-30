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
  const steps = Array.from(document.querySelectorAll(".step"));
  const indicators = Array.from(document.querySelectorAll(".step-indicator li"));
  let currentStep = 0;

  const escapeRooms = document.querySelectorAll(".escape-room");
  const timeSlots   = document.querySelectorAll(".time-slot");
  let selectedRoom = "";
  let selectedTime = "";

  const summaryRoom  = document.getElementById("summary-room");
  const summaryTeam  = document.getElementById("summary-team");
  const summaryEmail = document.getElementById("summary-email");
  const summaryDate  = document.getElementById("summary-date");
  const summaryTime  = document.getElementById("summary-time");

  //Szobák kiválasztása 
  escapeRooms.forEach(btn => {
    btn.addEventListener("click", () => {
      escapeRooms.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedRoom = btn.textContent.trim();
    });
  });

  //időpont kiválasztás 
  timeSlots.forEach(btn => {
    btn.addEventListener("click", () => {
      timeSlots.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedTime = btn.textContent.trim();
    });
  });

 
  function updateIndicators(index) {
    if (!indicators.length) return;
    indicators.forEach((li, i) => {
      li.classList.toggle("active", i === index);
      li.setAttribute("aria-current", i === index ? "step" : "false");
    });
  }

  function showStep(index) {
    if (!steps.length) return;

    steps.forEach((step, i) => {
      step.style.display = (i === index) ? "" : "none";
      step.setAttribute("aria-hidden", i === index ? "false" : "true");
    });

    updateIndicators(index);

    // Foglalás gomb 
    const submitBtn = document.getElementById("submit");
    if (submitBtn) {
      if (index === steps.length - 1) {
        submitBtn.style.display = "inline-block";
        // Összegzés frissítése
        if (summaryRoom)  summaryRoom.textContent  = selectedRoom || "-";
        if (summaryTeam)  summaryTeam.textContent  = (document.getElementById("team-name")?.value || "").trim();
        if (summaryEmail) summaryEmail.textContent = (document.getElementById("email")?.value || "").trim();
        if (summaryDate)  summaryDate.textContent  = (document.getElementById("calendar")?.value || "").trim();
        if (summaryTime)  summaryTime.textContent  = selectedTime || "-";
      } else {
        submitBtn.style.display = "none";
      }
    }

    
    document.querySelector(".sidebar-layout")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // induláskor
  showStep(currentStep);

  // Tovább és Előző gombok 
  document.querySelectorAll(".next").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); 
      if (currentStep === 0 && !selectedRoom) {
        alert("Válassz szobát!");
        return;
      }
      if (currentStep === 1) {
        const dateOK = !!document.getElementById("calendar")?.value;
        if (!dateOK || !selectedTime) {
          alert("Válassz dátumot és időpontot!");
          return;
        }
      }
      if (currentStep === 2) {
        const team = (document.getElementById("team-name")?.value || "").trim();
        const mail = (document.getElementById("email")?.value || "").trim();
        if (!team || !mail) {
          alert("Add meg a csapat nevét és email címet!");
          return;
        }
      }
      currentStep = Math.min(currentStep + 1, steps.length - 1);
      showStep(currentStep);
    });
  });

  document.querySelectorAll(".prev").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); 
      currentStep = Math.max(currentStep - 1, 0);
      showStep(currentStep);
    });
  });

  // Sidebar lépésjelző 
  indicators.forEach((li, idx) => {
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      if (idx <= currentStep) {
        currentStep = idx;
        showStep(currentStep);
      }
    });
  });

  //Foglalás gomb átirányítás 
  document.getElementById("submit")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../sub/404.html";
  });
});

// GYIK kezelése
const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
if (answer.classList.contains("open")) {
  answer.style.maxHeight = null;
  answer.classList.remove("open");
} else {
  answer.style.maxHeight = answer.scrollHeight + "px";
  answer.classList.add("open");
}
  });
});

//review card
const container = document.querySelector('.review-scroll-container');

let scrollAmount = 0;
const speed = 1;
let animationId;

function autoScroll() {
  scrollAmount += speed;

  if (scrollAmount >= container.scrollWidth - container.clientWidth) {
    scrollAmount = 0;
  }

  container.scrollLeft = scrollAmount;
  animationId = requestAnimationFrame(autoScroll);
}

animationId = requestAnimationFrame(autoScroll);

container.addEventListener('click', () => {
  cancelAnimationFrame(animationId);
});


