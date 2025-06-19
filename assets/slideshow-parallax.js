/**
 * Slideshow Parallax Effects
 * Uses native browser APIs for smooth parallax scrolling on slideshow sections
 */

class SlideshowParallax {
  constructor() {
    this.slideshows = [];
    this.isScrolling = false;
    this.rafId = null;
    this.intensityMultipliers = {
      subtle: 0.3,
      moderate: 1.0,
      strong: 1.8
    };
    this.init();
  }

  init() {
    // Find all slideshow sections with parallax enabled
    const slideshowSections = document.querySelectorAll('.slideshow-parallax');
    
    if (slideshowSections.length === 0) return;

    // Initialize each slideshow
    slideshowSections.forEach(section => this.initSlideshow(section));

    // Bind scroll events
    this.bindEvents();

    // Respect user preferences for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disable();
      return;
    }

    console.log('Slideshow parallax initialized');
  }

  initSlideshow(section) {
    const intensity = section.dataset.parallaxIntensity || 'moderate';
    const multiplier = this.intensityMultipliers[intensity] || 1.0;
    
    const slideshow = {
      element: section,
      slides: section.querySelectorAll('slideshow-slide'),
      container: section.querySelector('slideshow-slides'),
      isVisible: false,
      observer: null,
      intensity: multiplier
    };

    // Set up intersection observer for performance
    slideshow.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          slideshow.isVisible = entry.isIntersecting;
          if (slideshow.isVisible) {
            section.classList.add('parallax-active');
          } else {
            section.classList.remove('parallax-active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    slideshow.observer.observe(section);
    this.slideshows.push(slideshow);

    // Add parallax layers to slides
    this.setupParallaxLayers(slideshow);
  }

  setupParallaxLayers(slideshow) {
    slideshow.slides.forEach((slide, index) => {
      // Create parallax layers for different elements
      const backgroundElements = slide.querySelectorAll('[data-parallax="background"]');
      const foregroundElements = slide.querySelectorAll('[data-parallax="foreground"]');
      const textElements = slide.querySelectorAll('[data-parallax="text"]');

      // Set up background parallax (slower movement)
      backgroundElements.forEach(element => {
        element.style.willChange = 'transform';
        const baseSpeed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
        element.dataset.parallaxSpeed = (baseSpeed * slideshow.intensity).toString();
      });

      // Set up foreground parallax (faster movement)
      foregroundElements.forEach(element => {
        element.style.willChange = 'transform';
        const baseSpeed = parseFloat(element.dataset.parallaxSpeed) || 1.2;
        element.dataset.parallaxSpeed = (baseSpeed * slideshow.intensity).toString();
      });

      // Set up text parallax (subtle movement)
      textElements.forEach(element => {
        element.style.willChange = 'transform';
        const baseSpeed = parseFloat(element.dataset.parallaxSpeed) || 0.8;
        element.dataset.parallaxSpeed = (baseSpeed * slideshow.intensity).toString();
      });
    });
  }

  bindEvents() {
    // Throttled scroll event for performance
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    
    // Handle resize events
    window.addEventListener('resize', this.handleResize.bind(this));

    // Handle visibility change (pause when tab is hidden)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });

    // Handle reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addListener((e) => {
      if (e.matches) {
        this.disable();
      } else {
        this.enable();
      }
    });
  }

  handleScroll() {
    if (this.isScrolling) return;
    
    this.isScrolling = true;
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    this.rafId = requestAnimationFrame(() => {
      this.updateParallax();
      this.isScrolling = false;
    });
  }

  updateParallax() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    this.slideshows.forEach(slideshow => {
      if (!slideshow.isVisible) return;

      const rect = slideshow.element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      
      // Calculate how much of the element is in view
      const scrollProgress = (scrollY - elementTop + windowHeight) / (elementHeight + windowHeight);
      
      // Only apply parallax if element is in reasonable view
      if (scrollProgress >= -0.1 && scrollProgress <= 1.1) {
        this.applyParallaxToSlideshow(slideshow, scrollProgress, scrollY);
      }
    });
  }

  applyParallaxToSlideshow(slideshow, scrollProgress, scrollY) {
    slideshow.slides.forEach(slide => {
      // Apply parallax to background elements
      const backgroundElements = slide.querySelectorAll('[data-parallax="background"]');
      backgroundElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
        const yPos = (scrollY - slideshow.element.offsetTop) * speed;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      // Apply parallax to foreground elements
      const foregroundElements = slide.querySelectorAll('[data-parallax="foreground"]');
      foregroundElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 1.2;
        const yPos = (scrollY - slideshow.element.offsetTop) * speed * -1; // Reverse direction
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      // Apply parallax to text elements
      const textElements = slide.querySelectorAll('[data-parallax="text"]');
      textElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.8;
        const yPos = (scrollY - slideshow.element.offsetTop) * speed * -0.5;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    });
  }

  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.updateParallax();
    }, 100);
  }

  pause() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  resume() {
    if (!this.rafId) {
      this.handleScroll();
    }
  }

  enable() {
    // Re-enable parallax effects
    this.slideshows.forEach(slideshow => {
      slideshow.slides.forEach(slide => {
        const parallaxElements = slide.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
          element.style.willChange = 'transform';
        });
      });
    });
  }

  disable() {
    // Remove all transforms
    this.slideshows.forEach(slideshow => {
      slideshow.slides.forEach(slide => {
        const parallaxElements = slide.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
          element.style.transform = 'translate3d(0, 0, 0)';
          element.style.willChange = 'auto';
        });
      });
    });
  }

  destroy() {
    this.disable();
    
    // Disconnect observers
    this.slideshows.forEach(slideshow => {
      if (slideshow.observer) {
        slideshow.observer.disconnect();
      }
    });
    
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    
    this.slideshows = [];
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.slideshow-parallax')) {
    window.slideshowParallax = new SlideshowParallax();
  }
});

// Handle theme editor events
document.addEventListener('shopify:section:load', () => {
  if (window.slideshowParallax) {
    window.slideshowParallax.destroy();
  }
  if (document.querySelector('.slideshow-parallax')) {
    window.slideshowParallax = new SlideshowParallax();
  }
});

document.addEventListener('shopify:section:unload', () => {
  if (window.slideshowParallax) {
    window.slideshowParallax.destroy();
  }
}); 