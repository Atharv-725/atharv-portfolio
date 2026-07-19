/* =============================================
   ATHARV DORLE — PORTFOLIO JAVASCRIPT
   script.js
   ============================================= */

/* =============================================
   1. NAVBAR — scroll shadow + active link highlight
   ============================================= */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  // Add shadow when scrolled
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* =============================================
   2. HAMBURGER MENU — mobile nav toggle
   ============================================= */
const hamburger = document.getElementById('hamburger');

// Create mobile nav dynamically from existing nav links
const mobileNav = document.createElement('div');
mobileNav.classList.add('mobile-nav');

const navItems = ['home','projects','skills','education','certificates','contact'];
navItems.forEach(item => {
  const a = document.createElement('a');
  a.href = `#${item}`;
  a.textContent = item.charAt(0).toUpperCase() + item.slice(1);
  a.addEventListener('click', closeMobileNav);
  mobileNav.appendChild(a);
});

document.body.appendChild(mobileNav);

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
    closeMobileNav();
  }
});

/* =============================================
   3. TYPEWRITER EFFECT — hero section
   ============================================= */
const roles = [
  'AI Enthusiast',
  'Machine Learning Engineer',
  'Deep Learning Explorer',
  'Computer Vision Developer',
  'Full Stack Developer'
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const twEl     = document.getElementById('typewriter');

function typeWriter() {
  const currentWord = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward
    twEl.textContent = currentWord.slice(0, ++charIndex);
    if (charIndex === currentWord.length) {
      // Pause at end of word then start deleting
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    // Deleting
    twEl.textContent = currentWord.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeWriter, isDeleting ? 55 : 95);
}

typeWriter();

/* =============================================
   4. SCROLL REVEAL — project cards fade in one by one
   ============================================= */
const projectCards = document.querySelectorAll('.project-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

projectCards.forEach(card => revealObserver.observe(card));



/* =============================================
   5. SCROLL REVEAL — education, cert, contact cards
   ============================================= */
const fadeEls = document.querySelectorAll(
  '.edu-card, .cert-card, .contact-card, .skill-item'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

fadeEls.forEach(el => {
  // Set initial hidden state
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(22px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

/* =============================================
   6. SCROLL DOWN INDICATOR — click to scroll to projects
   ============================================= */
const scrollDown = document.getElementById('scrollDown');
if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });
}

/* =============================================
   7. BACK TO TOP BUTTON — footer link
   ============================================= */
const backTop = document.getElementById('backTop');
if (backTop) {
  backTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =============================================
   8. SKILL ITEM — tooltip on hover
   ============================================= */
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  const name = item.querySelector('span').textContent;

  item.addEventListener('mouseenter', () => {
    item.title = name;
  });
});

/* =============================================
   9. ACTIVE SECTION HIGHLIGHT on nav click
   ============================================= */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

/* =============================================
   10. CURSOR BLINK — typewriter cursor
   ============================================= */
// Already handled in CSS via .cursor class animation

/* =============================================
   11. PAGE LOAD — smooth reveal of hero section
   ============================================= */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

/* =============================================
   12. COPY EMAIL — click on email contact card
   ============================================= */
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
  const href = card.getAttribute('href');
  if (href && href.startsWith('mailto:')) {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const email = href.replace('mailto:', '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('📋 Email copied to clipboard!');
        });
      } else {
        window.location.href = href;
      }
    });
  }
});

/* =============================================
   13. TOAST NOTIFICATION — helper function
   ============================================= */
function showToast(message) {
  // Remove existing toast
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;

  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    background:   'linear-gradient(135deg, #a855f7, #ec4899)',
    color:        '#fff',
    padding:      '0.7rem 1.2rem',
    borderRadius: '8px',
    fontSize:     '0.85rem',
    fontWeight:   '600',
    fontFamily:   "'Poppins', sans-serif",
    zIndex:       '9999',
    boxShadow:    '0 4px 20px rgba(236,72,153,0.35)',
    opacity:      '0',
    transform:    'translateY(10px)',
    transition:   'all 0.3s ease',
  });

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  // Animate out after 2.5s
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* =============================================
   14. SMOOTH SCROLL — all anchor links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =============================================
   15. THEME CUSTOMIZER — Change accent colors dynamically
   ============================================= */
const themeDefs = {
  purple: {
    accent: '#a855f7',
    accent2: '#ec4899',
    accent3: '#22d3ee',
    border: 'rgba(236, 72, 153, 0.22)',
    card: 'rgba(30, 20, 56, 0.55)',
    tagBg: 'rgba(168, 85, 247, 0.14)',
    tagColor: '#e3c9ff',
    tagBorder: 'rgba(168, 85, 247, 0.35)'
  },
  cyber: {
    accent: '#06b6d4',
    accent2: '#6366f1',
    accent3: '#ec4899',
    border: 'rgba(99, 102, 241, 0.25)',
    card: 'rgba(12, 20, 46, 0.55)',
    tagBg: 'rgba(6, 182, 212, 0.14)',
    tagColor: '#cffafe',
    tagBorder: 'rgba(6, 182, 212, 0.35)'
  },
  emerald: {
    accent: '#10b981',
    accent2: '#06b6d4',
    accent3: '#eab308',
    border: 'rgba(6, 182, 212, 0.25)',
    card: 'rgba(12, 38, 28, 0.55)',
    tagBg: 'rgba(16, 185, 129, 0.14)',
    tagColor: '#d1fae5',
    tagBorder: 'rgba(16, 185, 129, 0.35)'
  },
  solar: {
    accent: '#f97316',
    accent2: '#ef4444',
    accent3: '#ec4899',
    border: 'rgba(239, 68, 68, 0.25)',
    card: 'rgba(46, 18, 12, 0.55)',
    tagBg: 'rgba(249, 115, 22, 0.14)',
    tagColor: '#ffedd5',
    tagBorder: 'rgba(249, 115, 22, 0.35)'
  }
};

const themeDots = document.querySelectorAll('.theme-dot');

function applyTheme(themeName) {
  const definition = themeDefs[themeName] || themeDefs.purple;
  const root = document.documentElement;

  root.style.setProperty('--accent', definition.accent);
  root.style.setProperty('--accent2', definition.accent2);
  root.style.setProperty('--accent3', definition.accent3);
  root.style.setProperty('--border', definition.border);
  root.style.setProperty('--card', definition.card);
  root.style.setProperty('--tag-bg', definition.tagBg);
  root.style.setProperty('--tag-color', definition.tagColor);
  root.style.setProperty('--tag-border', definition.tagBorder);

  themeDots.forEach(dot => {
    dot.classList.toggle('active', dot.dataset.theme === themeName);
  });

  localStorage.setItem('portfolioTheme', themeName);
}

themeDots.forEach(dot => {
  dot.addEventListener('click', () => {
    applyTheme(dot.dataset.theme);
  });
});

applyTheme(localStorage.getItem('portfolioTheme') || 'purple');

/* =============================================
   16. PARTICLE NETWORK BACKGROUND — animated tech grid
   ============================================= */
(function initParticleNetwork() {
  const canvas = document.getElementById('particle-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const colors = ['#a855f7', '#ec4899', '#22d3ee'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LINK_DIST = 170;

  let particles = [];
  let width, height, dpr;
  let animationId = null;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width  = window.innerWidth;
    height = window.innerHeight;
    canvas.width  = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width  = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(150, Math.max(45, Math.round((width * height) / 10000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.9,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }

  function drawDots() {
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.55;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(180, 140, 255, ' + (0.5 * (1 - dist / LINK_DIST)) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x <= 0 || p.x >= width)  p.vx *= -1;
      if (p.y <= 0 || p.y >= height) p.vy *= -1;
    });

    drawDots();
    drawLinks();

    animationId = requestAnimationFrame(step);
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    drawDots();
    drawLinks();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reduceMotion) drawStatic();
    }, 150);
  });

  let isCanvasVisible = true;
  const canvasObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isCanvasVisible = entry.isIntersecting;
      if (isCanvasVisible) {
        if (!animationId && !reduceMotion) {
          step();
        }
      } else {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }
    });
  }, { threshold: 0 });

  const homeSection = document.getElementById('home');
  if (homeSection) {
    canvasObserver.observe(homeSection);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden || !isCanvasVisible) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else if (!reduceMotion) {
      if (!animationId) step();
    }
  });

  resize();
  if (reduceMotion) {
    drawStatic();
  } else {
    // Animation is now started dynamically by the canvasObserver on load
    if (reduceMotion) drawStatic();
  }
})();
