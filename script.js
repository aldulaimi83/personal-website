// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const siteHeader = document.getElementById("siteHeader");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// Sticky header state
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
});

// Typing effect
const typingText = document.getElementById("typingText");

const phrases = [
  "Validation Engineer",
  "Electrical Engineer",
  "Cloud & AI Builder",
  "Startup-Minded Product Creator",
  "Incoming ASU Master’s Student"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentPhrase = phrases[phraseIndex];
  const currentText = currentPhrase.substring(0, charIndex);
  typingText.textContent = currentText;

  let speed = isDeleting ? 40 : 75;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1400;
    isDeleting = true;
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Active nav highlight
const sections = document.querySelectorAll("section[id]");

function setActiveNav() {
  let currentId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${currentId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

// Animated counter
const counters = document.querySelectorAll(".stat-number[data-target]");
let countersStarted = false;

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 70;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.ceil(current) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  };

  updateCounter();
}

const statsSection = document.querySelector(".stats-grid");

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            animateCounter(counter, target);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  statsObserver.observe(statsSection);
}
