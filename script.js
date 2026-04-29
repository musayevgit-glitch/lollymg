const preloader = document.getElementById("preloader");
const cursor = document.getElementById("cursor");
const cursorLabel = document.getElementById("cursorLabel");
const projectFollower = document.getElementById("projectFollower");
const projectFollowerLabel = document.getElementById("projectFollowerLabel");
const heroObject = document.getElementById("heroObject");
const ambientA = document.getElementById("ambientA");
const ambientB = document.getElementById("ambientB");
const ambientC = document.getElementById("ambientC");

const state = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  fx: window.innerWidth / 2,
  fy: window.innerHeight / 2,
};

window.addEventListener("load", () => {
  setTimeout(() => preloader.classList.add("hidden"), 950);
});

const moveCursor = (event) => {
  state.x = event.clientX;
  state.y = event.clientY;

  const nx = (event.clientX / window.innerWidth - 0.5) * 2;
  const ny = (event.clientY / window.innerHeight - 0.5) * 2;

  ambientA.style.transform = `translate(${nx * 26}px, ${ny * 20}px)`;
  ambientB.style.transform = `translate(${nx * -22}px, ${ny * 28}px)`;
  ambientC.style.transform = `translate(${nx * 18}px, ${ny * -24}px)`;

  if (projectFollower.classList.contains("active")) {
    projectFollower.style.left = `${event.clientX}px`;
    projectFollower.style.top = `${event.clientY}px`;
  }
};

window.addEventListener("mousemove", moveCursor);

const animateCursor = () => {
  state.fx += (state.x - state.fx) * 0.18;
  state.fy += (state.y - state.fy) * 0.18;
  cursor.style.left = `${state.fx}px`;
  cursor.style.top = `${state.fy}px`;

  requestAnimationFrame(animateCursor);
};

requestAnimationFrame(animateCursor);

const magneticItems = document.querySelectorAll("[data-magnetic]");
magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const px = event.clientX - rect.left - rect.width / 2;
    const py = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${px * 0.15}px, ${py * 0.15}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0, 0)";
  });

  item.addEventListener("mouseenter", () => {
    cursor.style.width = "160px";
    cursor.style.height = "160px";
    cursorLabel.textContent = "engage";
  });

  item.addEventListener("mouseleave", () => {
    cursor.style.width = "120px";
    cursor.style.height = "120px";
    cursorLabel.textContent = "";
  });
});

const panels = document.querySelectorAll("[data-panel]");
panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    panels.forEach((el) => el.classList.remove("active"));
    panel.classList.add("active");
  });
});

const projects = document.querySelectorAll(".project");
projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    projectFollower.classList.add("active");
    projectFollower.style.background = `radial-gradient(circle at 30% 30%, #ffffff, ${project.dataset.color})`;
    projectFollowerLabel.textContent = project.dataset.label;
    cursor.style.width = "190px";
    cursor.style.height = "190px";
    cursorLabel.textContent = "open";
  });

  project.addEventListener("mouseleave", () => {
    projectFollower.classList.remove("active");
    cursor.style.width = "120px";
    cursor.style.height = "120px";
    cursorLabel.textContent = "";
  });

  project.addEventListener("mousemove", (event) => {
    projectFollower.style.left = `${event.clientX}px`;
    projectFollower.style.top = `${event.clientY}px`;
  });
});

const revealTargets = document.querySelectorAll("section, .panel, .project");
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  heroObject.style.transform = `rotate(${progress * 260}deg) scale(${1 + progress * 0.08})`;
});

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim() || "there";

  formNote.textContent = `Thanks, ${name}. Your request was received. ASTRA team will contact you within 24 hours.`;
  contactForm.reset();
});
