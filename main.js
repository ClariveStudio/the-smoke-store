document.addEventListener('DOMContentLoaded', function() {
  ageVerificationModal();
  stickyNav();
  mobileMenu();
  productFilter();
  scrollAnimations();
  contactForm();
  smoothScroll();
  initGallery();
});

const WHATSAPP_NUMBER = '919876543210';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20your%20products`;

function ageVerificationModal() {
  const modal = document.getElementById('age-modal');
  if (!modal) return;

  const verified = sessionStorage.getItem('age-verified');
  
  if (!verified) {
    modal.classList.add('active');
  }

  const enterBtn = modal.querySelector('.btn-enter');
  const exitBtn = modal.querySelector('.btn-exit');

  if (enterBtn) {
    enterBtn.addEventListener('click', function() {
      sessionStorage.setItem('age-verified', 'true');
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 400);
    });
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', function() {
      window.location.href = 'https://www.google.com';
    });
  }
}

function stickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

function mobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileClose = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
}

function productFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const category = btn.dataset.category;

      productCards.forEach(function(card) {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

function scrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.fade-in-up');
  elements.forEach(function(el) {
    observer.observe(el);
  });
}

function contactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    if (!name.value || !email.value || !message.value) {
      showToast('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email.value)) {
      showToast('Please enter a valid email address');
      return;
    }

    showToast('Thank you! We will get back to you soon.');
    form.reset();
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

function initGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImage = document.querySelector('.gallery-main');

  if (!thumbs.length || !mainImage) return;

  thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      const src = thumb.src;
      mainImage.src = src;

      thumbs.forEach(function(t) {
        t.classList.remove('active');
      });
      thumb.classList.add('active');
    });
  });
}

document.querySelectorAll('.whatsapp-link').forEach(function(link) {
  link.href = WHATSAPP_URL;
});

document.querySelectorAll('.btn-whatsapp, .btn-outline').forEach(function(btn) {
  if (btn.classList.contains('btn-whatsapp') || btn.textContent.toLowerCase().includes('whatsapp')) {
    btn.addEventListener('click', function() {
      window.open(WHATSAPP_URL, '_blank');
    });
  }
});