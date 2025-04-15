/**
 * Walter A. Jablonowski - Personal Website
 * Main JavaScript Controller
 */

class WebsiteController
{
  constructor()
  {
    // Store references to DOM elements as class properties
    this.header = document.querySelector('header');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.body = document.body;
    this.backToTopButton = document.querySelector('.back-to-top');
    this.contactForm = document.getElementById('contact-form');
    this.requestCvButton = document.querySelector('.request-cv');
    this.cookieBanner = document.getElementById('cookie-consent');
    this.acceptCookieButton = document.getElementById('accept-cookies');
    this.declineCookieButton = document.getElementById('decline-cookies');
    this.tabLinks = document.querySelectorAll('.tab-link');
    this.tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize the website
    this.init();
  }
  
  /**
   * Initialize all website components
   */
  init()
  {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.initNavigation();
      this.initScrollAnimations();
      this.initBackToTop();
      this.initContactForm();
      this.initCookieConsent();
      this.initResponsiveAdjustments();
      this.initTabNavigation();
      
      // Add animation classes to elements
      document.querySelectorAll('.fade-in').forEach( (element, index) => {
        element.classList.add(`delay-${index % 3 + 1}`);
      });
    });
  }
  
  /**
   * Navigation functionality
   */
  initNavigation()
  {
    // Handle scroll events for header styling
    window.addEventListener('scroll', () => {
      if( window.scrollY > 50 )
        this.header.classList.add('scrolled');
      else
        this.header.classList.remove('scrolled');
      
      // Update active nav link based on scroll position
      this.updateActiveNavLink();
    });
    
    // Mobile menu toggle
    this.menuToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      this.menuToggle.querySelector('i').classList.toggle('fa-bars');
      this.menuToggle.querySelector('i').classList.toggle('fa-times');
      
      // Prevent body scrolling when menu is open
      this.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    this.navLinks.forEach( link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
        this.menuToggle.querySelector('i').classList.add('fa-bars');
        this.menuToggle.querySelector('i').classList.remove('fa-times');
        this.body.style.overflow = '';
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if( this.navMenu.classList.contains('active') && 
          ! this.navMenu.contains(e.target) && 
          ! this.menuToggle.contains(e.target)) {
        this.navMenu.classList.remove('active');
        this.menuToggle.querySelector('i').classList.add('fa-bars');
        this.menuToggle.querySelector('i').classList.remove('fa-times');
        this.body.style.overflow = '';
      }
    });
  }
  
  /**
   * Update active nav link based on scroll position
   */
  updateActiveNavLink()
  {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach( section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if( scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach( link => {
          link.classList.remove('active');
          if( link.getAttribute('href') === `#${sectionId}`)
            link.classList.add('active');
        });
      }
    });
  }
  
  /**
   * Scroll animations
   */
  initScrollAnimations()
  {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.service-card, .skill-category, .interest-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach( entry => {
        if( entry.isIntersecting ) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach( element => {
      observer.observe(element);
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach( entry => {
        if( entry.isIntersecting ) {
          const width = entry.target.style.width;
          entry.target.style.width = '0';
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    skillBars.forEach( bar => {
      skillObserver.observe(bar);
    });
  }
  
  /**
   * Back to top button
   */
  initBackToTop()
  {
    window.addEventListener('scroll', () => {
      if( window.scrollY > 500)
        this.backToTopButton.classList.add('show');
      else
        this.backToTopButton.classList.remove('show');
    });
    
    this.backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  /**
   * Contact form
   */
  initContactForm()
  {
    if( this.contactForm ) {
      this.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form (simple validation)
        if( ! name || ! email || ! subject || ! message ) {
          alert('Please fill in all fields');
          return;
        }
        
        // In a real implementation, you would send the form data to a server
        // For now, just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.contactForm.reset();
      });
    }
    
    // CV request button
    if( this.requestCvButton ) {
      this.requestCvButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Scroll to contact form
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill subject field
        const subjectField = document.getElementById('subject');
        if( subjectField )
          subjectField.value = 'CV Request';
      });
    }
  }
  
  /**
   * Cookie consent banner
   */
  initCookieConsent()
  {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if( cookieConsent === null && this.cookieBanner ) {
      // Show the cookie banner if no choice has been made
      this.cookieBanner.style.display = 'block';
    }
    
    // Handle accept button click
    if( this.acceptCookieButton ) {
      this.acceptCookieButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        this.cookieBanner.style.display = 'none';
        
        // Here you would initialize analytics or other cookie-dependent features
      });
    }
    
    // Handle decline button click
    if( this.declineCookieButton ) {
      this.declineCookieButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        this.cookieBanner.style.display = 'none';
      });
    }
  }
  
  /**
   * Responsive adjustments
   */
  initResponsiveAdjustments()
  {
    // Set the --vh value initially
    this.setVhProperty();
    
    // Update the --vh value on resize and orientation change
    window.addEventListener('resize', () => this.setVhProperty());
    window.addEventListener('orientationchange', () => this.setVhProperty());
    
    // Fix for iOS Safari 100vh issue
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if( isIOS )
      document.documentElement.classList.add('ios');
    
    // Adjust touch targets for better mobile experience
    const touchTargets = document.querySelectorAll('a:not(.logo a), button:not(.logo button), .nav-link, .btn');
    touchTargets.forEach( target => {
      if( window.getComputedStyle(target).getPropertyValue('padding') === '0px')
        target.style.padding = '8px';
    });
  }
  
  /**
   * Adjust viewport height for mobile browsers
   */
  setVhProperty()
  {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  /**
   * Tab navigation for Interests section
   */
  initTabNavigation()
  {
    if( this.tabLinks.length > 0 ) {
      this.tabLinks.forEach( link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Get the tab to show
          const tabId = link.getAttribute('data-tab');
          
          // Hide all tab contents
          this.tabContents.forEach( content => {
            content.style.display = 'none';
          });
          
          // Remove active class from all tab links
          this.tabLinks.forEach( tabLink => {
            tabLink.classList.remove('active');
          });
          
          // Show the selected tab content
          const selectedTab = document.getElementById(tabId + '-tab');
          if( selectedTab )
            selectedTab.style.display = 'block';
          
          // Add active class to the clicked tab link
          link.classList.add('active');
        });
      });
    }
  }
}
