class ParallaxEffect {
  constructor() {
    this.initParallax();
    this.bindEvents();
  }

  initParallax() {
    this.parallaxContainers = document.querySelectorAll('.parallax-container');
    this.isScrolling = false;
    
    // Initialize Intersection Observer for performance
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('parallax-active');
        } else {
          entry.target.classList.remove('parallax-active');
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe all parallax containers
    this.parallaxContainers.forEach(container => {
      this.observer.observe(container);
    });
  }

  bindEvents() {
    // Throttled scroll event for performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Handle resize events
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disableParallax();
    }
  }

  updateParallax() {
    const scrollY = window.pageYOffset;
    
    this.parallaxContainers.forEach(container => {
      if (container.classList.contains('parallax-active')) {
        const videoElement = container.querySelector('.parallax-video');
        const contentElement = container.querySelector('.parallax-content');
        
        if (videoElement && contentElement) {
          // Calculate parallax offset
          const containerRect = container.getBoundingClientRect();
          const speed = 0.5; // Parallax speed multiplier
          
          // Apply transform to create parallax effect
          const translateY = scrollY * speed;
          videoElement.style.transform = `translateZ(-1px) scale(2) translateY(${translateY}px)`;
        }
      }
    });
  }

  handleResize() {
    // Recalculate positions on resize
    this.updateParallax();
  }

  disableParallax() {
    // Disable parallax for users who prefer reduced motion
    document.documentElement.style.setProperty('--parallax-enabled', '0');
    
    this.parallaxContainers.forEach(container => {
      const videoElement = container.querySelector('.parallax-video');
      if (videoElement) {
        videoElement.style.transform = 'none';
        videoElement.style.position = 'relative';
      }
    });
  }

  // Public method to enable/disable parallax
  toggle(enabled = true) {
    if (enabled) {
      this.initParallax();
    } else {
      this.disableParallax();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if parallax containers exist
  if (document.querySelector('.parallax-container')) {
    window.parallaxEffect = new ParallaxEffect();
  }
});

// Smooth scrolling enhancement
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', smoothScroll);

// Performance monitoring
if (typeof window.requestIdleCallback === 'function') {
  window.requestIdleCallback(() => {
    console.log('Parallax effect initialized');
  });
} 