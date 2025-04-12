/**
 * Walter A. Jablonowski - Personal Homepage
 * Theme: Cool Developer
 * 
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    }, 500);
  });

  // Mobile Navigation
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if(nav.classList.contains('active') && !nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('active');
      burger.classList.remove('toggle');
      
      navLinks.forEach(link => {
        link.style.animation = '';
      });
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        // Close mobile menu if open
        if(nav.classList.contains('active')) {
          nav.classList.remove('active');
          burger.classList.remove('toggle');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active navigation based on scroll position
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if(pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if(item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if(window.pageYOffset > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Cookie Consent
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptCookiesButton = document.getElementById('accept-cookies');
  
  // Check if user has already accepted cookies
  if(!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
      cookieConsent.classList.add('active');
    }, 2000);
  }
  
  acceptCookiesButton.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.classList.remove('active');
  });

  // Skills Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Hide all tab contents
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Show the corresponding tab content
      const tabId = `${button.dataset.tab}-tab`;
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Animate skill bars when in viewport
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const progress = bar.dataset.progress;
      bar.style.width = `${progress}%`;
    });
  };
  
  // Initialize Intersection Observer for skill bars
  const skillsSection = document.querySelector('.skills');
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  if(skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // Form submission (for demo purposes)
  const contactForm = document.getElementById('contact-form');
  
  if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real implementation, you would send the form data to a server
      // For now, just show a success message
      const formData = new FormData(contactForm);
      let formValues = {};
      
      for(let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      
      // Clear form
      contactForm.reset();
      
      // Show success message (in a real implementation)
      alert('Thanks for your message! This is a demo form, so no message was actually sent.');
    });
  }

  // Initialize map
  const initMap = () => {
    // Bamberg coordinates
    const bambergCoords = [49.8988, 10.9027];
    
    // Create map
    const map = L.map('map').setView(bambergCoords, 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add marker for Bamberg
    L.marker(bambergCoords).addTo(map)
      .bindPopup('Walter A. Jablonowski<br>Bamberg, Germany')
      .openPopup();
  };
  
  // Load map script dynamically
  const loadMapScript = () => {
    const mapSection = document.querySelector('.map-section');
    
    if(mapSection) {
      // Create link element for Leaflet CSS
      const leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      document.head.appendChild(leafletCss);
      
      // Initialize map when Leaflet is loaded
      if(typeof L !== 'undefined') {
        initMap();
      } else {
        // Wait for Leaflet script to load
        window.addEventListener('load', () => {
          if(typeof L !== 'undefined') {
            initMap();
          }
        });
      }
    }
  };
  
  // Load map when the map section is in viewport
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        loadMapScript();
        mapObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  const mapSection = document.querySelector('.map-section');
  if(mapSection) {
    mapObserver.observe(mapSection);
  }

  // CV Request Modal (placeholder functionality)
  const cvRequestButtons = document.querySelectorAll('.request-cv');
  
  cvRequestButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'mailto:walter.a.jablonowski@gmail.com?subject=CV%20Request&body=Hello%20Walter,%0A%0AI%20would%20like%20to%20request%20your%20CV.%0A%0AThank%20you!';
    });
  });

  // Combine the two CSS files
  const combineStyles = () => {
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'css/styles2.css';
    document.head.appendChild(link1);
  };
  
  combineStyles();
});

// Burger menu animation
document.querySelector('.burger').addEventListener('click', function() {
  this.classList.toggle('toggle');
});

// Add toggle class to burger
const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
  const line1 = burger.querySelector('.line1');
  const line2 = burger.querySelector('.line2');
  const line3 = burger.querySelector('.line3');
  
  line1.classList.toggle('toggle');
  line2.classList.toggle('toggle');
  line3.classList.toggle('toggle');
});

// Add CSS for burger animation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .burger .line1.toggle {
      transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger .line2.toggle {
      opacity: 0;
    }
    
    .burger .line3.toggle {
      transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @keyframes navLinkFade {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  </style>
`);
