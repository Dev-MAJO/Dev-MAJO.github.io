/* =========================================================
   Marc Joseph Respicio — Portfolio Scripts
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Typing animation ---------- */
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'Remote Support Specialist',
    'SEO Content & Blog Manager',
    'AI-Assisted Researcher',
    'Visual & Video Creator'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingEl.textContent = current.substring(0, charIndex);

    let delay = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800; // pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeLoop, delay);
  }

  if (typingEl) {
    typeLoop();
  }

  /* ---------- 2. Dark mode toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const THEME_KEY = 'mjr-portfolio-theme';

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* storage unavailable — theme just won't persist */
    }
  }

  // Apply saved theme, or fall back to system preference
  const savedTheme = getSavedTheme();
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        saveTheme('light');
      } else {
        root.setAttribute('data-theme', 'dark');
        saveTheme('dark');
      }
    });
  }

  /* ---------- 3. Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- 4. Navbar background on scroll + active link ---------- */
  const navbar = document.getElementById('navbar');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  if (sections.length && navLinkEls.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkEls.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- 5. Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- 6. Animated skill bars ---------- */
  const barFills = document.querySelectorAll('.bar-fill');

  if ('IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute('data-width') || '0';
          entry.target.style.width = `${target}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    barFills.forEach((bar) => barObserver.observe(bar));
  } else {
    barFills.forEach((bar) => {
      bar.style.width = `${bar.getAttribute('data-width') || 0}%`;
    });
  }

  /* ---------- 7. Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    const group = field.closest('.form-group');

    if (message) {
      group.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      group.classList.remove('invalid');
      errorEl.textContent = '';
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      let isValid = true;

      if (!name) {
        setError('name', 'Please enter your name.');
        isValid = false;
      } else {
        setError('name', '');
      }

      if (!email) {
        setError('email', 'Please enter your email.');
        isValid = false;
      } else if (!isValidEmail(email)) {
        setError('email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        setError('email', '');
      }

      if (!subject) {
        setError('subject', 'Please add a subject.');
        isValid = false;
      } else {
        setError('subject', '');
      }

      if (!message) {
        setError('message', 'Please write a short message.');
        isValid = false;
      } else {
        setError('message', '');
      }

if (!isValid) {
        formStatus.textContent = '';
        return;
      }

      formStatus.textContent = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => {
          if (response.ok) {
            formStatus.textContent = `Thanks, ${name}! Your message has been sent — I'll get back to you soon.`;
            form.reset();
          } else {
            formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
          }
        })
        .catch(() => {
          formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
        });
  }

});
