# Parallax Effect Setup Guide

This guide explains how to create a smooth parallax scrolling effect where a video section stays fixed while other sections scroll on top.

## What's Included

1. **CSS File**: `assets/parallax-effect.css` - Contains all the parallax styling
2. **JavaScript File**: `assets/parallax-effect.js` - Enhances performance and smooth scrolling
3. **Section Template**: `sections/parallax-wrapper.liquid` - Wrapper section for parallax effects
4. **Theme Integration**: Updated `layout/theme.liquid` to include CSS and JS files

## How to Use

### Step 1: Add the Parallax Container Section
1. Go to your Shopify admin
2. Navigate to Online Store > Themes > Customize
3. Add a new section and select "Parallax Container"

### Step 2: Add Your Video Section
1. Inside the Parallax Container, add a block
2. Choose your video section (could be a custom section with video background)
3. This will become your fixed background video

### Step 3: Add Your Product Section
1. Add another block to the Parallax Container
2. Choose "Product List" or any other section you want to scroll over the video
3. This section will scroll smoothly over the fixed video

### Step 4: Customize Settings
In the Parallax Container section, you can adjust:
- **Video Section Height**: How tall the video section should be (50-100vh)
- **Video Overlay**: Toggle dark overlay for better text readability
- **Overlay Opacity**: Adjust overlay darkness (0-80%)

## Advanced Customization

### CSS Variables
You can customize the parallax effect by modifying these CSS variables:

```css
:root {
  --parallax-scale: 2; /* Scale factor for video */
  --parallax-speed: 0.5; /* Scrolling speed multiplier */
}
```

### JavaScript Options
The parallax effect can be controlled via JavaScript:

```javascript
// Disable parallax effect
window.parallaxEffect.toggle(false);

// Enable parallax effect
window.parallaxEffect.toggle(true);
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ iOS Safari (limited performance)

## Performance Considerations

1. **Reduced Motion**: Automatically disables for users who prefer reduced motion
2. **Intersection Observer**: Only applies effects when sections are visible
3. **RequestAnimationFrame**: Optimized scroll handling for smooth performance
4. **Transform3D**: Uses hardware acceleration when available

## Troubleshooting

### Video Not Staying Fixed
- Ensure the video section is the first block in the Parallax Container
- Check that the video has `object-fit: cover` applied

### Scrolling Not Smooth
- Make sure `scroll-behavior: smooth` is enabled in your browser
- Check if reduced motion is enabled (this disables the effect)

### Performance Issues
- Reduce the number of parallax containers on a single page
- Consider using smaller video files or images instead of videos on mobile

## Mobile Optimization

The effect is optimized for mobile with:
- Reduced transform scale (1.5x instead of 2x)
- Simplified animations
- Automatic fallback for devices with limited performance

## Example Usage

1. **Hero Video + Product Grid**: Perfect for homepage hero sections
2. **Collection Video + Product List**: Great for collection pages
3. **Brand Video + Content Sections**: Ideal for about/brand pages

## Support

If you encounter any issues:
1. Check browser console for JavaScript errors
2. Ensure all files are properly uploaded to your theme
3. Verify that the section is properly configured
4. Test on different devices and browsers 