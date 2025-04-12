// Main JavaScript for Walter A. Jablonowski's personal homepage

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initNavigation();
  initTypewriter();
  initSkillBars();
  initDiagrams();
  initCustomCursor();
  initCookieNotice();
  initContactForm();
  initScrollAnimation();
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const header = document.querySelector('header');
  const navLinksItems = document.querySelectorAll('.nav-link');

  // Toggle mobile navigation
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile navigation when clicking a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Typewriter effect
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  const phrases = [
    'AI first-Developer',
    'Web Developer',
    'SQL Expert',
    'Problem Solver'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of typing
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  if (typewriterElement) {
    setTimeout(type, 1000);
  }
}

// Animate skill bars on scroll
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const parent = bar.parentElement.parentElement;
      const percent = parent.querySelector('.skill-info span:last-child').textContent;
      bar.style.width = percent;
    });
  };

  // Animate on scroll to skills section
  const skillsSection = document.getElementById('skills');
  
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
  }
}

// Animate circular diagrams
function initDiagrams() {
  const diagrams = document.querySelectorAll('.diagram-circle');
  
  const animateDiagrams = () => {
    diagrams.forEach(diagram => {
      const percent = diagram.getAttribute('data-percent');
      const dashoffset = 502 - (502 * percent / 100);
      diagram.style.strokeDashoffset = dashoffset;
    });
  };

  // Animate on scroll to about section
  const aboutSection = document.getElementById('about');
  
  if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateDiagrams();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(aboutSection);
  }
}

// Custom cursor
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Delayed follower effect
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 100);
    });
    
    // Cursor hover effect on links and buttons
    const links = document.querySelectorAll('a, button, .nav-toggle');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }
}

// Cookie notice
function initCookieNotice() {
  const cookieNotice = document.getElementById('cookieNotice');
  const acceptCookies = document.getElementById('acceptCookies');
  
  if (cookieNotice && acceptCookies) {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
      // Show cookie notice after a delay
      setTimeout(() => {
        cookieNotice.classList.add('show');
      }, 2000);
      
      // Handle cookie acceptance
      acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieNotice.classList.remove('show');
      });
    }
  }
}

// Contact form (non-functional for now, just for design)
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // For now, just log the values
      console.log('Form submitted:', { name, email, subject, message });
      
      // Reset form
      contactForm.reset();
      
      // Show success message (would be implemented in a real form)
      alert('Thank you for your message! This is a design-only form and does not actually send messages.');
    });
  }
}

// Scroll animations
function initScrollAnimation() {
  // Smooth scroll to section when clicking navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.service-card, .interest-card');
  
  if (revealElements.length > 0) {
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial state
    revealElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(50px)';
      element.style.transition = 'all 0.8s ease';
    });
    
    // Add scroll event
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load
    revealOnScroll();
  }
}
