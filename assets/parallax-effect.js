class ParallaxEffect {
  constructor() {
    this.parallaxContainers = [];
    this.isScrolling = false;
    this.observer = null;
    this.resizeTimeout = null;
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
      threshold: 0.1,
      rootMargin: '50px 0px'
    });

    // Observe all parallax containers
    this.parallaxContainers.forEach(container => {
      if (container && this.observer) {
        this.observer.observe(container);
      }
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
    }, { passive: true });

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
    const windowHeight = window.innerHeight;
    
    this.parallaxContainers.forEach(container => {
      if (container && container.classList.contains('parallax-active')) {
        const videoElement = container.querySelector('.parallax-video');
        const contentElement = container.querySelector('.parallax-content');
        
        if (videoElement && contentElement) {
          // Get container position and dimensions
          const containerRect = container.getBoundingClientRect();
          const containerTop = containerRect.top + scrollY;
          const containerHeight = containerRect.height;
          
          // Calculate scroll progress relative to container
          const scrollProgress = (scrollY - containerTop + windowHeight) / (containerHeight + windowHeight);
          
          // Only apply parallax when container is in reasonable view
          if (scrollProgress >= -0.1 && scrollProgress <= 1.1) {
            // Fixed parallax calculation - move background slower than scroll
            const speed = 0.5;
            const yPos = (scrollY - containerTop) * speed;
            
            // Use proper 3D transform for hardware acceleration
            if (videoElement instanceof HTMLElement) {
              videoElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
              videoElement.style.transformOrigin = 'center center';
            }
          }
        }
      }
    });
  }

  handleResize() {
    // Debounce resize events
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.updateParallax();
    }, 100);
  }

  disableParallax() {
    // Disable parallax for users who prefer reduced motion
    document.documentElement.style.setProperty('--parallax-enabled', '0');
    
    this.parallaxContainers.forEach(container => {
      if (container) {
        const videoElement = container.querySelector('.parallax-video');
        if (videoElement instanceof HTMLElement) {
          videoElement.style.transform = 'translate3d(0, 0, 0)';
          videoElement.style.willChange = 'auto';
        }
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

  destroy() {
    // Clean up observers and event listeners
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    // Reset all transforms
    this.disableParallax();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if parallax containers exist
  if (document.querySelector('.parallax-container')) {
    if (!window.parallaxEffect) {
      window.parallaxEffect = new ParallaxEffect();
    }
  }
});

// Smooth scrolling enhancement
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = targetId ? document.querySelector(targetId) : null;
      
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

// Handle theme editor events
document.addEventListener('shopify:section:load', () => {
  if (window.parallaxEffect && typeof window.parallaxEffect.destroy === 'function') {
    window.parallaxEffect.destroy();
  }
  if (document.querySelector('.parallax-container')) {
    window.parallaxEffect = new ParallaxEffect();
  }
});

document.addEventListener('shopify:section:unload', () => {
  if (window.parallaxEffect && typeof window.parallaxEffect.destroy === 'function') {
    window.parallaxEffect.destroy();
  }
});

// Performance monitoring
if (typeof window.requestIdleCallback === 'function') {
  window.requestIdleCallback(() => {
    console.log('Parallax effect initialized');
  });
} 