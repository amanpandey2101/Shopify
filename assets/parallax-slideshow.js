/**
 * Parallax Slideshow Wrapper
 * Creates parallax effect with fixed slideshow background and scrolling content
 */

class ParallaxSlideshowWrapper {
  constructor() {
    this.containers = [];
    this.isScrolling = false;
    this.rafId = null;
    this.init();
  }

  init() {
    // Find all parallax slideshow containers
    const containers = document.querySelectorAll('.parallax-slideshow-container');
    
    if (containers.length === 0) return;

    // Initialize each container
    containers.forEach(container => this.initContainer(container));

    // Bind scroll events
    this.bindEvents();

    // Respect user preferences for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disable();
      return;
    }

    console.log('Parallax slideshow wrapper initialized');
  }

  initContainer(container) {
    const background = container.querySelector('.parallax-slideshow-background');
    const content = container.querySelector('.parallax-scrolling-content');
    const spacer = container.querySelector('.parallax-spacer');
    
    if (!background || !content) return;

    const parallaxData = {
      container: container,
      background: background,
      content: content,
      spacer: spacer,
      isVisible: false,
      observer: null,
      backgroundSpeed: parseFloat(background.dataset.parallaxSpeed) || 0.5,
      intensity: this.getIntensityMultiplier(container)
    };

    // Set up intersection observer for performance
    parallaxData.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          parallaxData.isVisible = entry.isIntersecting;
          if (parallaxData.isVisible) {
            container.classList.add('parallax-active');
            container.classList.remove('loading');
            container.classList.add('loaded');
          } else {
            container.classList.remove('parallax-active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px'
      }
    );

    parallaxData.observer.observe(container);
    this.containers.push(parallaxData);

    // Set initial loading state
    container.classList.add('loading');
    
    // Remove loading state after a short delay
    setTimeout(() => {
      container.classList.remove('loading');
      container.classList.add('loaded');
    }, 100);
  }

  getIntensityMultiplier(container) {
    const multiplierElement = container.querySelector('[style*="--parallax-multiplier"]');
    if (multiplierElement) {
      const style = multiplierElement.getAttribute('style');
      const match = style.match(/--parallax-multiplier:\s*([\d.]+)/);
      if (match) {
        return parseFloat(match[1]);
      }
    }
    return 1.0; // Default moderate intensity
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
    if (mediaQuery.addListener) {
      mediaQuery.addListener((e) => {
        if (e.matches) {
          this.disable();
        } else {
          this.enable();
        }
      });
    }
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

    this.containers.forEach(parallaxData => {
      if (!parallaxData.isVisible) return;

      const containerRect = parallaxData.container.getBoundingClientRect();
      const containerTop = containerRect.top + scrollY;
      const containerHeight = containerRect.height;
      
      // Calculate scroll progress relative to container
      const scrollProgress = (scrollY - containerTop + windowHeight) / (containerHeight + windowHeight);
      
      // Only apply parallax if container is in reasonable view
      if (scrollProgress >= -0.1 && scrollProgress <= 1.1) {
        this.applyParallaxEffects(parallaxData, scrollY, scrollProgress);
      }
    });
  }

  applyParallaxEffects(parallaxData, scrollY, scrollProgress) {
    const { background, content, backgroundSpeed, intensity } = parallaxData;
    
    // Apply parallax to background (slower movement)
    if (background) {
      const bgSpeed = backgroundSpeed * intensity;
      const bgYPos = scrollY * bgSpeed;
      background.style.transform = `translate3d(0, ${bgYPos}px, 0)`;
    }

    // Apply subtle parallax to content (if needed)
    if (content && intensity > 1.0) {
      const contentSpeed = 0.1 * intensity;
      const contentYPos = scrollY * contentSpeed * -1;
      content.style.transform = `translate3d(0, ${contentYPos}px, 0)`;
    }
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
    this.containers.forEach(parallaxData => {
      if (parallaxData.background) {
        parallaxData.background.style.willChange = 'transform';
      }
      if (parallaxData.content) {
        parallaxData.content.style.willChange = 'transform';
      }
    });
  }

  disable() {
    // Remove all transforms and reset to normal layout
    this.containers.forEach(parallaxData => {
      if (parallaxData.background) {
        parallaxData.background.style.transform = 'translate3d(0, 0, 0)';
        parallaxData.background.style.position = 'relative';
        parallaxData.background.style.willChange = 'auto';
      }
      if (parallaxData.content) {
        parallaxData.content.style.transform = 'translate3d(0, 0, 0)';
        parallaxData.content.style.marginTop = '0';
        parallaxData.content.style.willChange = 'auto';
      }
      if (parallaxData.spacer) {
        parallaxData.spacer.style.display = 'none';
      }
    });
  }

  destroy() {
    this.disable();
    
    // Disconnect observers
    this.containers.forEach(parallaxData => {
      if (parallaxData.observer) {
        parallaxData.observer.disconnect();
      }
    });
    
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    
    this.containers = [];
  }
}

// Utility function to handle slideshow slide changes
function initializeSlideshowSlides() {
  const slideshows = document.querySelectorAll('.parallax-slideshow-background slideshow-component');
  
  slideshows.forEach(slideshow => {
    // Ensure slides have proper background coverage
    const slides = slideshow.querySelectorAll('slideshow-slide');
    slides.forEach(slide => {
      const imageContainer = slide.querySelector('.slide__image-container');
      if (imageContainer) {
        imageContainer.style.height = '100%';
        imageContainer.style.width = '100%';
        
        const image = imageContainer.querySelector('.slide__image, .slide__video');
        if (image) {
          image.style.objectFit = 'cover';
          image.style.objectPosition = 'center center';
          image.style.width = '100%';
          image.style.height = '100%';
        }
      }
    });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.parallax-slideshow-container')) {
    window.parallaxSlideshowWrapper = new ParallaxSlideshowWrapper();
    initializeSlideshowSlides();
  }
});

// Handle theme editor events
document.addEventListener('shopify:section:load', (event) => {
  if (event.target.classList.contains('parallax-slideshow-section')) {
    if (window.parallaxSlideshowWrapper) {
      window.parallaxSlideshowWrapper.destroy();
    }
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      window.parallaxSlideshowWrapper = new ParallaxSlideshowWrapper();
      initializeSlideshowSlides();
    }, 100);
  }
});

document.addEventListener('shopify:section:unload', (event) => {
  if (event.target.classList.contains('parallax-slideshow-section')) {
    if (window.parallaxSlideshowWrapper) {
      window.parallaxSlideshowWrapper.destroy();
    }
  }
});

// Handle block add/remove events
document.addEventListener('shopify:block:select', (event) => {
  const section = event.target.closest('.parallax-slideshow-section');
  if (section && window.parallaxSlideshowWrapper) {
    // Refresh parallax calculations when blocks change
    setTimeout(() => {
      window.parallaxSlideshowWrapper.updateParallax();
    }, 100);
  }
});

// Smooth scroll to content function (can be called from buttons)
function scrollToParallaxContent(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    const content = container.querySelector('.parallax-scrolling-content');
    if (content) {
      content.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

// Export for global use
window.scrollToParallaxContent = scrollToParallaxContent; 