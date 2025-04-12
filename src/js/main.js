/**
 * Walter A. Jablonowski - Personal Website
 * Main JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initBackToTop();
  initContactForm();
  initCookieConsent();
  
  // Add animation classes to elements
  document.querySelectorAll('.fade-in').forEach((element, index) => {
    element.classList.add(`delay-${index % 3 + 1}`);
  });
});

/**
 * Navigation functionality
 */
function initNavigation() {
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Handle scroll events for header styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.querySelector('i').classList.add('fa-bars');
      menuToggle.querySelector('i').classList.remove('fa-times');
    });
  });
  
  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/**
 * Scroll animations
 */
function initScrollAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll('.service-card, .skill-category, .interest-card, .timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-level');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
}

/**
 * Back to top button
 */
function initBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Contact form
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Validate form (simple validation)
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // In a real implementation, you would send the form data to a server
      // For now, just show a success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // CV request button
  const requestCvButton = document.querySelector('.request-cv');
  
  if (requestCvButton) {
    requestCvButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Scroll to contact form
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
      
      // Pre-fill subject field
      if (document.getElementById('subject')) {
        document.getElementById('subject').value = 'CV Request';
      }
    });
  }
}

/**
 * Cookie consent banner
 */
function initCookieConsent() {
  const cookieBanner = document.getElementById('cookie-consent');
  const acceptButton = document.getElementById('accept-cookies');
  const declineButton = document.getElementById('decline-cookies');
  
  // Check if user has already made a choice
  const cookieConsent = localStorage.getItem('cookieConsent');
  
  if (cookieConsent === null) {
    // Show the cookie banner if no choice has been made
    cookieBanner.style.display = 'block';
  }
  
  // Handle accept button click
  acceptButton.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.style.display = 'none';
    
    // Here you would initialize analytics or other cookie-dependent features
  });
  
  // Handle decline button click
  declineButton.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.style.display = 'none';
  });
}
