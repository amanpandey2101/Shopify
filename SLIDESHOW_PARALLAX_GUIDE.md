# Slideshow Parallax Effects Guide

This guide explains how to use the parallax scrolling effects in your Shopify theme, including both the enhanced slideshow section and the new Parallax Slideshow + Content wrapper section.

## What's New

I've implemented two types of parallax systems:

1. **Enhanced Slideshow Section**: Adds parallax effects within individual slideshow slides
2. **Parallax Slideshow + Content Section**: Creates a fixed slideshow background with scrolling content (like Product Grid) on top

## Files Added/Modified

### New Files:
- `assets/slideshow-parallax.js` - Modern parallax implementation for slideshow sections
- `assets/slideshow-parallax.css` - Optimized CSS for slideshow parallax effects
- `assets/parallax-slideshow.js` - JavaScript for the wrapper section with fixed background
- `assets/parallax-slideshow.css` - CSS for the wrapper section layout
- `sections/parallax-slideshow-wrapper.liquid` - New section that combines slideshow background with scrolling content
- `snippets/product-grid-section.liquid` - Product grid component for parallax wrapper
- `snippets/collection-list-section.liquid` - Collection list component for parallax wrapper  
- `snippets/text-content-section.liquid` - Text content component for parallax wrapper
- `snippets/image-banner-section.liquid` - Image banner component for parallax wrapper

### Modified Files:
- `sections/slideshow.liquid` - Added parallax settings and functionality
- `snippets/slideshow.liquid` - Added parallax data attribute support
- `blocks/_slide.liquid` - Added parallax data attributes to slide elements
- `assets/parallax-effect.js` - Fixed broken parallax calculations and improved performance

## How to Use

### Option 1: Enhanced Slideshow Section (Simple Parallax)

This adds subtle parallax effects within slideshow slides themselves.

1. Go to **Online Store > Themes > Customize**
2. Add or edit a **Slideshow** section
3. In the section settings, find **"Parallax Effects"**
4. Check **"Enable parallax scrolling"**
5. Choose your preferred **"Parallax intensity"** (Subtle, Moderate, or Strong)

### Option 2: Parallax Slideshow + Content Section (True Parallax)

This creates a fixed slideshow background with content that scrolls over it - perfect for Product Grids!

1. Go to **Online Store > Themes > Customize**
2. Click **"Add section"**
3. Choose **"Parallax Slideshow + Content"**
4. Configure the parallax settings (intensity, background speed, etc.)
5. Add a **"Slideshow Background"** block and configure your slides
6. Add content blocks like:
   - **Product Grid** - Shows products from a collection
   - **Collection List** - Displays multiple collections
   - **Text Content** - Rich text content
   - **Image Banner** - Hero images with text overlay

#### Adding a Product Grid to Parallax Background:

1. In your **"Parallax Slideshow + Content"** section
2. Click **"Add block"** 
3. Select **"Product Grid"**
4. Choose your collection
5. Set products per row (2-5)
6. Set number of rows (1-4)
7. Choose color scheme
8. The product grid will now scroll over your slideshow background with parallax effect!

## Section Comparison

| Feature | Enhanced Slideshow | Parallax Slideshow + Content |
|---------|-------------------|------------------------------|
| **Best For** | Simple parallax effects within slides | Complex layouts with scrolling content over background |
| **Product Grid** | ❌ Not supported | ✅ Full support with settings |
| **Collection List** | ❌ Not supported | ✅ Full support |
| **Text Content** | ✅ Within slides only | ✅ Scrolling sections |
| **Multiple Content Blocks** | ❌ Limited to slide content | ✅ Unlimited blocks |
| **Background Control** | ❌ Each slide is background | ✅ Fixed slideshow background |
| **Scroll Effect** | Subtle element movement | True parallax scrolling |
| **Performance** | Lighter | Slightly heavier |

## Technical Details

### Performance Optimizations

1. **Intersection Observer**: Only applies parallax when sections are visible
2. **RequestAnimationFrame**: Smooth, optimized scroll handling
3. **Hardware Acceleration**: Uses CSS 3D transforms for GPU acceleration
4. **Reduced Motion Support**: Automatically disables for users who prefer reduced motion
5. **Mobile Optimizations**: Reduced effects on smaller screens for better performance

### Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ iOS Safari (reduced performance, effects are scaled down)

### Accessibility Features

- **Respects prefers-reduced-motion**: Automatically disables parallax for users who prefer reduced motion
- **Focus management**: Pauses effects when elements are focused
- **High contrast support**: Adjusts overlay opacity for better text contrast
- **Screen reader friendly**: Effects don't interfere with screen reader navigation

## Customization

### CSS Variables

You can customize the parallax effects by modifying these CSS variables in your theme:

```css
:root {
  --parallax-speed-background: 0.5;
  --parallax-speed-text: 0.8;
  --parallax-speed-foreground: 1.2;
}
```

### Data Attributes

The system uses data attributes to control parallax behavior:

- `data-parallax="background"` - Slower movement for backgrounds
- `data-parallax="text"` - Moderate movement for text elements
- `data-parallax="foreground"` - Faster movement for foreground elements
- `data-parallax-speed="0.5"` - Custom speed multiplier

### Intensity Settings

The parallax intensity setting affects the overall strength of the effect:

- **Subtle**: Gentle, barely noticeable parallax (0.3x multiplier)
- **Moderate**: Balanced parallax effect (1.0x multiplier) - default
- **Strong**: Dramatic parallax movement (1.8x multiplier)

## Content Block Types

### Product Grid Block
- **Collection**: Choose which products to display
- **Products per row**: 2-5 products
- **Rows**: 1-4 rows
- **Color scheme**: Theme color schemes
- **Responsive**: Automatically adjusts for mobile

### Collection List Block
- **Collections**: Select multiple collections
- **Auto-sizing**: Responsive grid layout
- **Image fallbacks**: Uses collection or first product image

### Text Content Block
- **Rich text**: Full HTML support
- **Headings**: H2, H3, H4 styling
- **Lists**: Bullet and numbered lists
- **Links**: Styled theme links

### Image Banner Block
- **Hero images**: Full-width banners
- **Overlay text**: Title and subtitle
- **Call-to-action**: Optional button with link
- **Hover effects**: Image zoom and content lift

## Troubleshooting

### Parallax Not Working

1. **Check if enabled**: Ensure "Enable parallax scrolling" is checked in section settings
2. **Browser support**: Verify you're using a supported browser
3. **Reduced motion**: Check if "Reduce motion" is enabled in your system accessibility settings
4. **Console errors**: Open browser developer tools and check for JavaScript errors

### Product Grid Not Showing

1. **Collection selected**: Make sure you've selected a collection with products
2. **Products exist**: Verify the collection has published products
3. **Block added**: Ensure you've added a "Product Grid" block to your section
4. **Section type**: Make sure you're using "Parallax Slideshow + Content" section

### Performance Issues

1. **Reduce intensity**: Try using "Subtle" instead of "Strong"
2. **Limit sections**: Don't use too many parallax sections on one page
3. **Mobile performance**: Effects are automatically reduced on mobile devices
4. **Image optimization**: Ensure your slide images are properly optimized

### Visual Issues

1. **Background gaps**: The system automatically scales backgrounds to prevent gaps
2. **Text readability**: Overlays are automatically applied for better text contrast
3. **Alignment issues**: Check that your slide content is properly centered
4. **Content overlap**: Adjust background overlay opacity if content is hard to read

## What Was Fixed

### Previous Parallax Implementation Issues

The old parallax system had several problems that have been resolved:

1. **Incorrect CSS transforms**: Fixed broken `translateZ(-1px) scale(2)` calculations
2. **Performance problems**: Added proper throttling and intersection observers
3. **Mobile issues**: Implemented mobile-specific optimizations
4. **Accessibility**: Added proper reduced motion support
5. **Browser compatibility**: Fixed issues with different browsers

### Improvements Made

1. **Modern APIs**: Uses Intersection Observer and Web Animations API
2. **Better performance**: 60fps smooth scrolling with GPU acceleration
3. **Responsive design**: Adapts to different screen sizes automatically
4. **Theme editor support**: Works properly in Shopify's theme customizer
5. **Error handling**: Graceful fallbacks when features aren't supported
6. **Content flexibility**: Support for multiple content types in parallax wrapper

## Best Practices

### Design Tips

1. **Use high-quality images**: Parallax draws attention to your visuals
2. **Ensure contrast**: Make sure text is readable over moving backgrounds
3. **Test on mobile**: Always verify the experience on different devices
4. **Don't overuse**: Parallax works best when used sparingly
5. **Content hierarchy**: Use parallax to guide user attention, not distract

### Performance Tips

1. **Optimize images**: Use WebP format when possible
2. **Limit sections**: No more than 2-3 parallax sections per page
3. **Monitor metrics**: Check Core Web Vitals in Google Search Console
4. **Test loading**: Ensure fast loading times even with parallax effects

### Accessibility Tips

1. **Provide alternatives**: Ensure content is accessible without parallax
2. **Test with screen readers**: Verify navigation works properly
3. **Respect preferences**: The system automatically handles reduced motion
4. **Focus indicators**: Ensure focus states are visible during parallax

## Support

If you encounter any issues with the parallax effects:

1. Check the browser console for error messages
2. Verify your theme is up to date
3. Test in different browsers and devices
4. Ensure all files are properly uploaded to your theme

The parallax system is designed to fail gracefully - if there are any issues, the slideshow will continue to work normally without the parallax effects.

## Quick Setup Guide

### For Product Grid with Parallax Background:

1. **Add Section**: Choose "Parallax Slideshow + Content"
2. **Add Slideshow Block**: Configure your background slides
3. **Add Product Grid Block**: 
   - Select collection
   - Set grid layout (4x2 recommended)
   - Choose color scheme
4. **Configure Parallax**:
   - Set intensity to "Moderate"
   - Adjust background speed (5/10 recommended)
   - Enable background overlay (30% opacity)
5. **Preview and Adjust**: Test on different devices and adjust settings as needed

This creates a stunning effect where your slideshow stays fixed in the background while your product grid scrolls smoothly over it with parallax movement! 