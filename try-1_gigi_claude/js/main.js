// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Current year for footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Navigation scroll effect
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  // Mobile navigation toggle
  navToggle.addEventListener('click', function() {
    navLinksContainer.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinksContainer.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Scroll event for navbar styling and active link highlighting
  window.addEventListener('scroll', function() {
    // Add background to navbar when scrolled
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active section in navigation
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Cookie consent
  const cookieConsent = document.getElementById('cookieConsent');
  const cookieAccept = document.getElementById('cookieAccept');

  // Show cookie consent if not accepted before
  if (!localStorage.getItem('cookieAccepted')) {
    setTimeout(() => {
      cookieConsent.classList.add('show');
    }, 1000);
  }

  // Handle cookie accept
  cookieAccept.addEventListener('click', function() {
    localStorage.setItem('cookieAccepted', 'true');
    cookieConsent.classList.remove('show');
  });

  // Experience details toggle
  const experienceBtn = document.getElementById('experienceBtn');
  const experienceDetails = document.getElementById('experienceDetails');

  experienceBtn.addEventListener('click', function() {
    experienceDetails.style.display = experienceDetails.style.display === 'block' ? 'none' : 'block';
    experienceBtn.textContent = experienceDetails.style.display === 'block' ? 'Read Less' : 'Read More';
  });

  // Tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and panes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      this.classList.add('active');
      document.getElementById(`tab-${this.dataset.tab}`).classList.add('active');
    });
  });

  // Contact form submission (placeholder)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Show success message (in a real implementation, this would send the form data)
      alert('Thank you for your message! This is a demo form and does not actually send messages.');
      contactForm.reset();
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initialize map if the map container exists
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    // Add Leaflet CSS
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(leafletCSS);

    // Initialize map (Bamberg, Germany coordinates)
    const map = L.map('map').setView([49.8988, 10.9027], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker for Bamberg
    L.marker([49.8988, 10.9027]).addTo(map)
      .bindPopup('Bamberg, Germany')
      .openPopup();
  }

  // Animate skill bars on scroll
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  };

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .experience-summary, .current-status');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
          
          // If this is a section with skill bars, animate them
          if (entry.target.classList.contains('skill-card') && entry.target.querySelectorAll('.progress').length > 0) {
            const bars = entry.target.querySelectorAll('.progress');
            bars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.width = bar.dataset.width || bar.style.width;
              }, index * 100);
            });
          }
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  };

  // Initialize animations
  animateSkillBars();
  animateOnScroll();

  // Add CSS class for animations
  document.body.classList.add('loaded');
});

// Add CSS styles for animations that weren't included in the main CSS
document.head.insertAdjacentHTML('beforeend', `
  <style>
    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate {
      animation: fadeInUp 0.6s ease forwards;
    }

    .skill-card, .project-card, .experience-summary, .current-status {
      opacity: 0;
    }

    .loaded .skill-card, .loaded .project-card, .loaded .experience-summary, .loaded .current-status {
      animation: fadeInUp 0.6s ease forwards;
    }

    .loaded .skill-card:nth-child(2) {
      animation-delay: 0.2s;
    }

    .loaded .skill-card:nth-child(3) {
      animation-delay: 0.4s;
    }

    .loaded .project-card:nth-child(2) {
      animation-delay: 0.2s;
    }

    .loaded .project-card:nth-child(3) {
      animation-delay: 0.4s;
    }

    /* Mobile Navigation */
    .nav-toggle {
      display: none;
    }

    .back-to-top {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: var(--transition);
      z-index: 99;
    }

    .back-to-top.show {
      opacity: 1;
      visibility: visible;
    }

    .back-to-top:hover {
      background-color: var(--secondary-color);
      transform: translateY(-5px);
    }

    /* Media Queries */
    @media (max-width: 992px) {
      .hero-content {
        flex-direction: column;
      }

      .hero-text {
        text-align: center;
        margin-bottom: 30px;
      }

      .hero-cta {
        justify-content: center;
      }

      .current-status {
        flex-direction: column;
        text-align: center;
      }

      .status-icon {
        margin: 0 auto 20px;
      }

      .status-links {
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .nav-toggle {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        transform: translateY(-150%);
        opacity: 0;
        transition: var(--transition);
        z-index: 99;
      }

      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
      }

      .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      .nav-toggle.active span:nth-child(2) {
        opacity: 0;
      }

      .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }

      .tab-header {
        flex-wrap: wrap;
      }

      .tab-btn {
        flex: 0 0 50%;
      }
    }

    @media (max-width: 576px) {
      .hero-text h1 {
        font-size: 2.5rem;
      }

      .hero-text h2 {
        font-size: 1.5rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .tab-btn {
        flex: 0 0 100%;
      }

      .contact-container {
        flex-direction: column;
      }

      .contact-info, .contact-form {
        width: 100%;
      }
    }
  </style>
`);