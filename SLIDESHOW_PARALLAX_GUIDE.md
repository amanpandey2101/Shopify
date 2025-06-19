# Slideshow Parallax Effects Guide

This guide explains how to use the new parallax scrolling effects in the slideshow section of your Shopify theme.

## What's New

I've implemented a modern, performance-optimized parallax scrolling system for the slideshow section that uses native browser APIs and respects user preferences for reduced motion.

## Files Added/Modified

### New Files:
- `assets/slideshow-parallax.js` - Modern parallax implementation using Intersection Observer and Web Animations API
- `assets/slideshow-parallax.css` - Optimized CSS for parallax effects with performance considerations

### Modified Files:
- `sections/slideshow.liquid` - Added parallax settings and functionality
- `snippets/slideshow.liquid` - Added parallax data attribute support
- `blocks/_slide.liquid` - Added parallax data attributes to slide elements
- `assets/parallax-effect.js` - Fixed broken parallax calculations and improved performance

## How to Use

### 1. Enable Parallax in Theme Customizer

1. Go to **Online Store > Themes > Customize**
2. Add or edit a **Slideshow** section
3. In the section settings, find **"Parallax Effects"**
4. Check **"Enable parallax scrolling"**
5. Choose your preferred **"Parallax intensity"** (Subtle, Moderate, or Strong)

### 2. Parallax Presets

The theme now includes a new preset called **"Slideshow with Parallax"** that comes pre-configured with:
- Parallax effects enabled
- Moderate intensity setting
- Large slide height for better visual impact

### 3. How It Works

The parallax system creates depth by moving different elements at different speeds:

- **Background images/videos**: Move slower than scroll (0.5x speed)
- **Text content**: Moves at a moderate speed (0.8x speed)  
- **Foreground elements**: Can move faster for dramatic effect (1.2x speed)

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

- **Subtle**: Gentle, barely noticeable parallax
- **Moderate**: Balanced parallax effect (default)
- **Strong**: Dramatic parallax movement

## Troubleshooting

### Parallax Not Working

1. **Check if enabled**: Ensure "Enable parallax scrolling" is checked in section settings
2. **Browser support**: Verify you're using a supported browser
3. **Reduced motion**: Check if "Reduce motion" is enabled in your system accessibility settings
4. **Console errors**: Open browser developer tools and check for JavaScript errors

### Performance Issues

1. **Reduce intensity**: Try using "Subtle" instead of "Strong"
2. **Limit sections**: Don't use too many parallax sections on one page
3. **Mobile performance**: Effects are automatically reduced on mobile devices
4. **Image optimization**: Ensure your slide images are properly optimized

### Visual Issues

1. **Background gaps**: The system automatically scales backgrounds to prevent gaps
2. **Text readability**: Overlays are automatically applied for better text contrast
3. **Alignment issues**: Check that your slide content is properly centered

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

## Best Practices

### Design Tips

1. **Use high-quality images**: Parallax draws attention to your visuals
2. **Ensure contrast**: Make sure text is readable over moving backgrounds
3. **Test on mobile**: Always verify the experience on different devices
4. **Don't overuse**: Parallax works best when used sparingly

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