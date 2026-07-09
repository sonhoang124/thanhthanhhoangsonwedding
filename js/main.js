/* ==========================================================================
   Elena & Marcus — Wedding Invitation
   Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. Page Loading Screen
  --------------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add('loader--hidden');
  };
  window.addEventListener('load', () => {
    // small delay so the animation is perceptible even on fast connections
    setTimeout(hideLoader, 500);
  });
  // Failsafe in case 'load' fires unusually late (slow external assets)
  setTimeout(hideLoader, 3500);

const music = document.getElementById('bgMusic');
// setTimeout(music.play(), 1000);
// music.play();
const btn = document.getElementById('musicBtn');

btn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        btn.textContent = '🔊';
    } else {
        music.pause();
        btn.textContent = '🔇';
    }
});


  /* ---------------------------------------------------------------------
     2. AOS (Animate On Scroll) init
  --------------------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }


  /* ---------------------------------------------------------------------
     3. Sticky Navigation
  --------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });


  /* ---------------------------------------------------------------------
     4. Mobile Hamburger Menu
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const closeMenu = () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  };
  const openMenu = () => {
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ---------------------------------------------------------------------
     5. Smooth Scroll (native CSS handles most; this offsets for navbar)
  --------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ---------------------------------------------------------------------
     6. Active Navigation Highlight on Scroll
  --------------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let currentId = '';
    const scrollPos = window.scrollY + navbar.offsetHeight + 40;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  highlightNav();
  window.addEventListener('scroll', highlightNav, { passive: true });


  /* ---------------------------------------------------------------------
     7. Countdown Timer
  --------------------------------------------------------------------- */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const targetDate = new Date(countdownEl.dataset.target).getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    const pad = (n) => String(n).padStart(2, '0');

    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }


  /* ---------------------------------------------------------------------
     8. Gallery Lightbox (LightGallery)
  --------------------------------------------------------------------- */
  const galleryContainer = document.getElementById('lightgallery');
  if (galleryContainer && window.lightGallery) {
    lightGallery(galleryContainer, {
      selector: '.gallery-item',
      plugins: [window.lgZoom],
      speed: 400,
      download: false,
      counter: true
    });
  }


  /* ---------------------------------------------------------------------
     9. Lazy Loading Fallback (native loading="lazy" is set in HTML;
        this adds a fade-in once images finish loading)
  --------------------------------------------------------------------- */
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) return;
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
  });


  /* ---------------------------------------------------------------------
     10. RSVP Form Validation
  --------------------------------------------------------------------- */
  const form = document.getElementById('rsvpForm');
  const formMessage = document.getElementById('formMessage');

  const validators = {
    fullName: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    phone: (v) => /^[+()\-\s\d]{7,}$/.test(v.trim()) || 'Please enter a valid phone number.',
    guests: (v) => v !== '' || 'Please select the number of guests.'
  };

  const showFieldError = (field, message) => {
    const group = field.closest('.form-group');
    const errorEl = document.getElementById(`${field.id}-error`);
    group.classList.add('has-error');
    if (errorEl) errorEl.textContent = message;
  };

  const clearFieldError = (field) => {
    const group = field.closest('.form-group');
    const errorEl = document.getElementById(`${field.id}-error`);
    group.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
  };

  const validateField = (field) => {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    if (result === true) {
      clearFieldError(field);
      return true;
    }
    showFieldError(field, result);
    return false;
  };

  if (form) {
    ['fullName', 'email', 'phone', 'guests'].forEach(name => {
      const field = form.elements[name];
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('has-error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fieldsToCheck = ['fullName', 'email', 'phone', 'guests'].map(name => form.elements[name]);
      const allValid = fieldsToCheck.map(validateField).every(Boolean);

      formMessage.classList.remove('success', 'error');

      if (!allValid) {
        formMessage.textContent = 'Please correct the highlighted fields and try again.';
        formMessage.classList.add('error');
        fieldsToCheck.find(f => f.closest('.form-group').classList.contains('has-error'))?.focus();
        return;
      }

      // Simulate a successful submission (no backend included in this template)
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending&hellip;</span>';

      setTimeout(() => {
        formMessage.textContent = `Thank you! Your RSVP has been received — we can't wait to celebrate with you.`;
        formMessage.classList.add('success');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        form.reset();
      }, 900);
    });
  }


  /* ---------------------------------------------------------------------
     11. Ripple Button Effect
  --------------------------------------------------------------------- */
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });


  /* ---------------------------------------------------------------------
     12. Back to Top Button
  --------------------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ---------------------------------------------------------------------
     13. Footer Year
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
