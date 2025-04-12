document.addEventListener('DOMContentLoaded', function() {

  const cookieNotice = document.getElementById('cookie-notice');
  const acceptButton = document.getElementById('accept-cookies');

  // Check if cookie consent was already given (using localStorage)
  if (!localStorage.getItem('cookieConsentGiven')) {
    if (cookieNotice) cookieNotice.style.display = 'flex'; // Show the notice (check if exists)
  }

  // Handle cookie acceptance
  if (acceptButton) {
    acceptButton.addEventListener('click', function() {
      localStorage.setItem('cookieConsentGiven', 'true');
      if (cookieNotice) cookieNotice.style.display = 'none';
    });
  }

  // Fade-in animation on scroll
  const fadeInElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Optional: Stop observing once visible
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    fadeInElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    // Make elements visible immediately or use a simpler scroll check
    fadeInElements.forEach(el => {
      el.classList.add('visible');
    });
  }

  // Add other interactive JS later
  // e.g., smooth scrolling, animations on scroll

});
