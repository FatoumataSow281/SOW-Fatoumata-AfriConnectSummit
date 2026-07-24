// ===== ATTENDRE QUE LE DOM SOIT CHARGÉ =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== ANNÉE DYNAMIQUE DANS LE FOOTER =====
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});

// ===== DARK MODE =====
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  // 1. Au chargement de la page : vérifier si un thème est déjà enregistré
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('bi-moon-stars', 'bi-sun');
  }

  // 2. Au clic sur le bouton : basculer le thème
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeIcon.classList.replace('bi-sun', 'bi-moon-stars');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeIcon.classList.replace('bi-moon-stars', 'bi-sun');
    }
  });

  // ===== NAVBAR DYNAMIQUE AU SCROLL =====
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== MENU HAMBURGER (MOBILE) =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Fermer le menu quand on clique sur un lien (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // ===== COMPTE À REBOURS =====
  const countdownEl = document.getElementById('countdown');

  if (countdownEl) {
    const eventDate = new Date('2026-11-12T09:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        countdownEl.innerHTML = '<p>L\'événement a commencé !</p>';
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
  }

  // ===== COMPTEURS ANIMÉS AU SCROLL =====
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500; // durée totale de l'animation en ms
    const stepTime = 16; // environ 60 images par seconde
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const counterInterval = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(counterInterval);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // n'anime qu'une seule fois
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
  }

  // ===== ANIMATIONS AU SCROLL (fade-in / slide-in) =====
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ===== ONGLETS DU PROGRAMME =====
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetDay = button.getAttribute('data-day');

      // 1. Retirer "active" de tous les boutons et contenus
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach(content => content.classList.remove('active'));

      // 2. Ajouter "active" au bouton cliqué et au contenu correspondant
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      document.getElementById(targetDay).classList.add('active');
    });
  });

  // ===== FILTRAGE DYNAMIQUE DES INTERVENANTS =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const speakerCards = document.querySelectorAll('.speakers-grid-full .speaker-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      // 1. Gérer l'état actif des boutons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. Afficher/masquer les cartes selon la catégorie
      speakerCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
  // ===== VALIDATION DU FORMULAIRE =====
  const form = document.getElementById('registration-form');

  if (form) {
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const participationType = document.getElementById('participation-type');
    const country = document.getElementById('country');
    const message = document.getElementById('message');
    const successMessage = document.getElementById('success-message');

    // Fonction utilitaire : affiche une erreur sur un champ
    function showError(input, errorText) {
      input.classList.add('error');
      input.classList.remove('valid');
      const errorSpan = input.parentElement.querySelector('.error-message');
      errorSpan.textContent = errorText;
    }

    // Fonction utilitaire : marque un champ comme valide
    function showValid(input) {
      input.classList.add('valid');
      input.classList.remove('error');
      const errorSpan = input.parentElement.querySelector('.error-message');
      errorSpan.textContent = '';
    }
    // ===== ÉCOUTE DE LA SOUMISSION DU FORMULAIRE =====
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // empêche le rechargement de page par défaut

      let isFormValid = true;

      // --- Nom complet ---
      if (fullname.value.trim() === '') {
        showError(fullname, 'Le nom complet est requis.');
        isFormValid = false;
      } else {
        showValid(fullname);
      }

      // --- Email (regex) ---
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Veuillez entrer un email valide.');
        isFormValid = false;
      } else {
        showValid(email);
      }

      // --- Téléphone (minimum 8 chiffres) ---
      const phoneDigits = phone.value.replace(/\D/g, ''); // garde uniquement les chiffres
      if (phoneDigits.length < 8) {
        showError(phone, 'Le téléphone doit contenir au moins 8 chiffres.');
        isFormValid = false;
      } else {
        showValid(phone);
      }

      // --- Type de participation ---
      if (participationType.value === '') {
        showError(participationType, 'Veuillez choisir un type de participation.');
        isFormValid = false;
      } else {
        showValid(participationType);
      }

      // --- Pays ---
      if (country.value === '') {
        showError(country, 'Veuillez choisir votre pays.');
        isFormValid = false;
      } else {
        showValid(country);
      }

      // --- Message (minimum 20 caractères) ---
      if (message.value.trim().length < 20) {
        showError(message, 'Le message doit contenir au moins 20 caractères.');
        isFormValid = false;
      } else {
        showValid(message);
      }

      // --- Si tout est valide : afficher le succès et réinitialiser ---
      if (isFormValid) {
        successMessage.textContent = 'Inscription envoyée avec succès ! Nous vous recontacterons bientôt.';
        successMessage.classList.add('visible');
        form.reset();

        // Retirer les classes valid après reset (champs redeviennent neutres)
        [fullname, email, phone, participationType, country, message].forEach(input => {
          input.classList.remove('valid');
        });

        // Masquer le message de succès après quelques secondes
        setTimeout(() => {
          successMessage.classList.remove('visible');
        }, 5000);
      } else {
        successMessage.classList.remove('visible');
      }
    });
  } // fin du if (form)

  // ===== BOUTON RETOUR EN HAUT =====
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

