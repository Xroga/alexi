/**
 * Alexi — Professional Content Writer
 * Landing page interactive behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== Mobile Navigation Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('nav__menu--open');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav__menu--open');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav__menu--open');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== Back to Top Button =====
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0.4';
        backToTop.style.pointerEvents = 'none';
      }
    });

    // Initial state
    backToTop.style.opacity = '0.4';
    backToTop.style.pointerEvents = 'none';
    backToTop.style.transition = 'opacity 0.3s ease';
  }

  // ===== Contact Form Validation =====
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    messageInput.addEventListener('blur', () => validateMessage());

    // Clear errors on input
    nameInput.addEventListener('input', () => { nameError.textContent = ''; });
    emailInput.addEventListener('input', () => { emailError.textContent = ''; });
    messageInput.addEventListener('input', () => { messageError.textContent = ''; });

    function validateName() {
      const value = nameInput.value.trim();
      if (!value) {
        nameError.textContent = 'Please enter your name.';
        return false;
      }
      if (value.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters.';
        return false;
      }
      nameError.textContent = '';
      return true;
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      if (!value) {
        emailError.textContent = 'Please enter your email address.';
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        emailError.textContent = 'Please enter a valid email address.';
        return false;
      }
      emailError.textContent = '';
      return true;
    }

    function validateMessage() {
      const value = messageInput.value.trim();
      if (!value) {
        messageError.textContent = 'Please enter your message.';
        return false;
      }
      if (value.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters.';
        return false;
      }
      messageError.textContent = '';
      return true;
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isMessageValid) {
        // Simulate form submission (in production, send to an API endpoint)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate network request
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          formSuccess.hidden = false;

          // Hide success message after 6 seconds
          setTimeout(() => {
            formSuccess.hidden = true;
          }, 6000);
        }, 1200);
      }
    });
  }

  // ===== Set Current Year in Footer =====
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== Smooth scroll for all anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Intersection Observer for fade-in animations =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe service cards and testimonials for entrance animation
  document.querySelectorAll('.service-card, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});