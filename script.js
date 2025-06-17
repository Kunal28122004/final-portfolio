// ----------- Initialize AOS (scroll animations) -----------
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// ----------- Custom Cursor Behavior -----------
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

function animateCursor() {
  posX += (mouseX - posX) / 9;
  posY += (mouseY - posY) / 9;
  cursorFollower.style.transform = `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))`;
  cursor.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.querySelectorAll('a, button, input, textarea, label').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.backgroundColor = '#ff0055';
    cursorFollower.style.borderColor = '#ff0055';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.backgroundColor = '#00fffc';
    cursorFollower.style.borderColor = '#00fffc';
  });
});

// ----------- Grab DOM Elements -----------
const hackerText = document.getElementById('hackerText');
const bypassAnimation = document.getElementById('bypassAnimation');
const accessDenied = document.getElementById('accessDenied');
const quantumIntro = document.getElementById('quantum-intro');
const portfolio = document.getElementById('portfolio');
const nav = document.getElementById('portfolio-nav');
const navLinks = nav.querySelectorAll('a');
const backToTopButton = document.getElementById('backToTop');
const aboutBio = document.getElementById('about-bio');
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// ----------- Typing and Messages -----------
const TYPING_SPEED = 40;
const MESSAGE_GAP = 150;
const BYPASS_SPEED = 400;
const messages = [
  "> BOOTING DEVELOPER ENVIRONMENT...",
  "> INITIALIZING CODE MODULES...",
  "> LINKING FRONTEND AND BACKEND SYSTEMS...",
  "> OPTIMIZING FOR RESPONSIVENESS AND SPEED...",
  "> ESTABLISHING DEVELOPER CONSOLE ACCESS..."
];
const bypassMessages = [
  "[!] Outdated design patterns detected... injecting modern UI frameworks",
  "[!] Routing through GitHub repositories...",
  "[*] AI-assisted optimization in progress...",
  "[+] Real-time project sync achieved",
  "[√] Portfolio systems online and operational"
];

let currentMessage = 0, currentChar = 0, currentBypass = 0;

function typeWriter() {
  if (currentChar < messages[currentMessage].length) {
    hackerText.innerHTML += messages[currentMessage].charAt(currentChar);
    currentChar++;
    setTimeout(typeWriter, Math.random() * 70 + TYPING_SPEED);
  } else {
    currentMessage++;
    currentChar = 0;
    if (currentMessage < messages.length) {
      setTimeout(() => {
        hackerText.innerHTML = "";
        typeWriter();
      }, MESSAGE_GAP);
    } else {
      startBypassAnimation();
    }
  }
}

function startBypassAnimation() {
  bypassAnimation.innerHTML = bypassMessages[0];
  currentBypass = 1;
  const bypassInterval = setInterval(() => {
    if (currentBypass < bypassMessages.length) {
      bypassAnimation.innerHTML = bypassMessages[currentBypass];
      currentBypass++;
      if (currentBypass === 5) {
        accessDenied.classList.add('access-granted');
        accessDenied.textContent = "ACCESS GRANTED";
      }
    } else {
      clearInterval(bypassInterval);
      setTimeout(fadeOutIntroShowPortfolio, 500);
    }
  }, BYPASS_SPEED);
}

// ----------- Matrix Rain -----------
const quantumChars = '01⨁⨂⨀⊗⊕↑↓←→⇄⇆⇌⇋⇔⇕⇖⇗⇘⇙⚛︎⌬⏣⏥⏦';
const fontSize = 18;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
const columns = Math.floor(canvas.width / fontSize);
const rainDrops = Array(columns).fill(-canvas.height / fontSize);

function drawMatrix() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(0,4,40,0.8)');
  gradient.addColorStop(1, 'rgba(0,78,146,0.6)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.shadowBlur = 5;
  ctx.font = `bold ${fontSize}px 'Courier New', monospace`;

  for (let i = 0; i < rainDrops.length; i++) {
    const text = quantumChars.charAt(Math.floor(Math.random() * quantumChars.length));
    const yPos = rainDrops[i] * fontSize;
    const opacity = Math.min(1, (canvas.height - yPos) / canvas.height);
    ctx.globalAlpha = opacity * 0.7;

    if (Math.random() > 0.9) {
      ctx.fillStyle = '#ff00ff';
      ctx.shadowColor = '#ff00ff';
    } else {
      ctx.fillStyle = '#00fffc';
      ctx.shadowColor = '#00fffc';
    }

    ctx.fillText(text, i * fontSize, yPos);

    if (yPos < 0 && Math.random() > 0.97) {
      rainDrops[i] = canvas.height / fontSize;
    }
    rainDrops[i]--;
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}
setInterval(drawMatrix, 50);

// ----------- Fade In Portfolio -----------
function fadeOutIntroShowPortfolio() {
  quantumIntro.style.opacity = '0';
  setTimeout(() => {
    quantumIntro.style.display = 'none';
    portfolio.classList.add('visible');
    nav.style.display = 'flex';
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[0].classList.add('active');
    window.scrollTo(0, 0);
    startAboutTyping();
    revealOnScroll();
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3
    });
  }, 1000);
}

// ----------- Nav & Scroll Behavior -----------
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    targetSection.focus();
  });
});

window.addEventListener('scroll', () => {
  if (!portfolio.classList.contains('visible')) return;
  updateActiveNav();
  revealOnScroll();
  toggleBackToTop();
});

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  navLinks.forEach(link => {
    const targetSection = document.querySelector(link.hash);
    if (!targetSection) return;
    if (
      targetSection.offsetTop <= scrollPos &&
      (targetSection.offsetTop + targetSection.offsetHeight) > scrollPos
    ) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

function revealOnScroll() {
  document.querySelectorAll('.fade-in-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.9) {
      el.classList.add('visible');
    }
  });
}

// ----------- About Me Typing -----------
const aboutText = "Web wizard, hackathon warrior, and future-ready developer blending code, logic, and a spark of rebellion.";
function startAboutTyping() {
  let i = 0;
  aboutBio.textContent = "";
  function type() {
    if (i < aboutText.length) {
      aboutBio.textContent += aboutText.charAt(i);
      i++;
      setTimeout(type, 45);
    }
  }
  type();
}

// ----------- Skill Bar Animation -----------
function animateSkillBars() {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const targetValue = parseInt(bar.getAttribute('data-value'));
    let currentValue = 0;
    bar.style.width = '0%';
    bar.textContent = '0%';

    const interval = setInterval(() => {
      if (currentValue >= targetValue) {
        clearInterval(interval);
        bar.textContent = targetValue + '%';
      } else {
        currentValue++;
        bar.style.width = currentValue + '%';
        bar.textContent = currentValue + '%';
      }
    }, 15);
  });
}

const skillsSection = document.querySelector('#skills');
let skillsAnimated = false;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      animateSkillBars();
      skillsAnimated = true;
    }
  });
}, { threshold: 0.4 });

if (skillsSection) {
  observer.observe(skillsSection);
}

// ----------- Contact Form -----------
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  emailjs.send("your_service_id", "your_template_id", {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value
  })
  .then(() => {
    formResponse.textContent = '✅ Message sent successfully!';
    formResponse.style.color = 'lightgreen';
    contactForm.reset();
  })
  .catch((error) => {
    console.error('EmailJS Error:', error);
    formResponse.textContent = '❌ Failed to send message. Try again.';
    formResponse.style.color = 'red';
  });
});

// ----------- Back to Top Button -----------
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function toggleBackToTop() {
  if (window.scrollY > window.innerHeight / 2) {
    backToTopButton.style.display = 'flex';
  } else {
    backToTopButton.style.display = 'none';
  }
}
toggleBackToTop();

// ----------- Resize Canvas -----------
window.addEventListener('resize', resizeCanvas);

// ----------- Start Sequence on Load -----------
window.addEventListener('load', () => {
  setTimeout(() => {
    accessDenied.style.transform = "scale(1.2)";
    accessDenied.style.transition = "transform 0.5s ease";
    setTimeout(() => {
      accessDenied.style.transform = "scale(1)";
      typeWriter();
    }, 500);
  }, 1000);
});
