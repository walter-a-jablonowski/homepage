// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Initialize elements
  initNavigation();
  initScrollEffects();
  initCookieNotice();
  // Google Map will be initialized via callback
  animateSkillBars();
});

// Navigation functionality
function initNavigation() {
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('header');

  // Toggle mobile navigation
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Scroll effects
function initScrollEffects() {
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section');
  
  // Back to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Scroll reveal animation
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  // Add the in-view class to these elements when scrolled into view
  const animateElements = document.querySelectorAll(
    '.section-header, .about-text, .about-card, .service-item, ' +
    '.expertise-text, .expertise-diagram, .interest-card, ' +
    '.contact-form-container, .location-container'
  );
  
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// Cookie notice
function initCookieNotice() {
  const cookieNotice = document.getElementById('cookieNotice');
  const acceptButton = document.getElementById('acceptCookies');
  
  // Check if user has already accepted cookies
  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
      cookieNotice.classList.add('active');
    }, 1000);
  }
  
  acceptButton.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieNotice.classList.remove('active');
  });
}

// Google Map initialization
function initMap() {
  const mapElement = document.getElementById('map');
  
  if (mapElement) {
    // Coordinates for Bamberg, Germany
    const bamberg = { lat: 49.8988, lng: 10.9027 };
    
    const map = new google.maps.Map(mapElement, {
      zoom: 13,
      center: bamberg,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [{"color": "#242f3e"}]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#746855"}]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{"color": "#242f3e"}]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#d59563"}]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#d59563"}]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{"color": "#263c3f"}]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#6b9a76"}]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{"color": "#38414e"}]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#212a37"}]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#9ca5b3"}]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{"color": "#746855"}]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#1f2835"}]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#f3d19c"}]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{"color": "#2f3948"}]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#d59563"}]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{"color": "#17263c"}]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#515c6d"}]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [{"color": "#17263c"}]
        }
      ]
    });
    
    // Add a marker
    const marker = new google.maps.Marker({
      position: bamberg,
      map: map,
      title: 'Walter A. Jablonowski',
      animation: google.maps.Animation.DROP
    });
  }
}

// Contact form submission (demo only - not functional)
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here would go the actual form submission code
      // For now just show an alert
      alert(`Thank you for your message, ${name}! This is a design demo, so the form isn't functional yet.`);
      
      // Reset form
      contactForm.reset();
    });
  }
});

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  // Set initial width to 0
  skillBars.forEach(bar => {
    bar.style.width = '0';
  });
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the final width from the element's width attribute
        const width = entry.target.getAttribute('width');
        
        // Animate to final width
        setTimeout(() => {
          entry.target.style.transition = 'width 1.5s ease-out';
          entry.target.style.width = width;
        }, 200);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  // Observe each skill bar
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Add CSS classes for scroll animations
document.addEventListener('DOMContentLoaded', function() {
  // Add these styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-on-scroll.in-view {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});
