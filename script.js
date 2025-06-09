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
  cursorFollower.style.transform = `translate(${posX}px, ${posY}px)`;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ----------- Grab DOM Elements -----------
const hackerText      = document.getElementById('hackerText');
const bypassAnimation = document.getElementById('bypassAnimation');
const accessDenied    = document.getElementById('accessDenied');
const quantumIntro    = document.getElementById('quantum-intro');
const portfolio       = document.getElementById('portfolio');
const nav             = document.getElementById('portfolio-nav');
const navLinks        = nav.querySelectorAll('a');
const backToTopButton = document.getElementById('backToTop');
const aboutBio        = document.getElementById('about-bio');
const canvas          = document.getElementById('matrixCanvas');
const ctx             = canvas.getContext('2d');

// ----------- Messages for the Intro -----------
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

// ----------- Resize Canvas for Matrix Rain -----------
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

// ----------- Matrix-Rain Effect Variables -----------
const quantumChars = '01⨁⨂⨀⊗⊕↑↓←→⇄⇆⇌⇋⇔⇕⇖⇗⇘⇙⚛︎⌬⏣⏥⏦';
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const rainDrops = Array(columns).fill(-canvas.height / fontSize);

// ----------- Draw Matrix Rain -----------
function drawMatrix() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(0,4,40,0.8)');
  gradient.addColorStop(1, 'rgba(0,78,146,0.6)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.shadowBlur = 5;
  ctx.shadowColor = '#00fffc';
  ctx.fillStyle = '#00fffc';
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

// ----------- Typewriter for Intro Messages -----------
function typeWriter() {
  if (currentChar < messages[currentMessage].length) {
    hackerText.innerHTML += messages[currentMessage].charAt(currentChar);
    currentChar++;
    setTimeout(typeWriter, Math.random() * 80 + 30);
  } else {
    currentMessage++;
    currentChar = 0;
    if (currentMessage < messages.length) {
      setTimeout(() => {
        hackerText.innerHTML = "";
        typeWriter();
      }, 500);
    } else {
      startBypassAnimation();
    }
  }
}

// ----------- Bypass Animation Sequence -----------
function startBypassAnimation() {
  bypassAnimation.innerHTML = bypassMessages[0];
  currentBypass = 1;

  const bypassInterval = setInterval(() => {
    if (currentBypass < bypassMessages.length) {
      bypassAnimation.innerHTML = bypassMessages[currentBypass];
      currentBypass++;

      if (currentBypass === 3) {
        // At the third message, flip "ACCESS DENIED" to "ACCESS GRANTED"
        accessDenied.classList.add('access-granted');
        accessDenied.textContent = "ACCESS GRANTED";
      }
    } else {
      clearInterval(bypassInterval);
      fadeOutIntroShowPortfolio();
    }
  }, 800);
}

// ----------- Fade Out Intro & Show Portfolio -----------
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
    revealOnScroll(); // Trigger any "fade-in-up" that might already be in view
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3
    });
  }, 1000);
}

// ----------- Smooth Scroll & Active Nav Toggling -----------
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

// ----------- On Scroll: Update Active Link, Reveal Elements, Toggle Back-to-Top -----------
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

// ----------- “About Me” Typing Effect -----------
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

// ----------- Animate Skill Bars When In View -----------
function animateSkillBars() {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const targetValue = parseInt(bar.getAttribute('data-value'));
    let currentValue = 0;

    // Reset width and text content initially
    bar.style.width = '0%';
    bar.textContent = '0%';

    const interval = setInterval(() => {
      if (currentValue >= targetValue) {
        clearInterval(interval);
        bar.textContent = targetValue + '%';  // ensure final text
      } else {
        currentValue++;
        bar.style.width = currentValue + '%';
        bar.textContent = currentValue + '%';
      }
    }, 20); // adjust speed (ms) here
  });
}



// ----------- Back-to-Top Button -----------
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
function toggleBackToTop() {
  if (window.scrollY > window.innerHeight / 2) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
}

// ----------- Resize Canvas on Window Resize -----------
window.addEventListener('resize', () => {
  resizeCanvas();
});

// ----------- On Window Load: Start Matrix Rain + Intro Sequence -----------
window.addEventListener('load', () => {
  // Start the matrix-rain loop
  setInterval(drawMatrix, 50);

  // Delay so that "ACCESS DENIED" CSS animation plays before the typewriter
  setTimeout(() => {
    accessDenied.style.transform = "scale(1.2)";
    accessDenied.style.transition = "transform 0.5s ease";
    setTimeout(() => {
      accessDenied.style.transform = "scale(1)";
      typeWriter();
    }, 500);
  }, 1000);
});

// ----------- Contact Form Handler -----------
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const formResponse = document.getElementById('formResponse');
  formResponse.style.color = '#aaeeff';
  formResponse.textContent = "✓ Message sent! Thanks for reaching out.";
  e.target.reset();
});
