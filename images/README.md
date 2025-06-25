# Image Assets for MCP-EDA Hub

This directory contains image assets for the MCP-EDA Hub website.

## Current Files

- `share-banner.svg` - Social media sharing banner (1200x630)
- `wechat-share.svg` - WeChat specific sharing image (500x500)

## Important Notes for Deployment

### Image Format Conversion Required

For optimal social media sharing compatibility, especially with WeChat and other platforms, the SVG files need to be converted to raster formats:

1. **share-banner.svg** → **share-banner.png**
   - Dimensions: 1200x630 pixels
   - Used for: Open Graph (Facebook, LinkedIn) and Twitter Card
   - Quality: High quality PNG-24 with transparency support

2. **wechat-share.svg** → **wechat-share.jpg**
   - Dimensions: 500x500 pixels
   - Used for: WeChat sharing preview
   - Quality: High quality JPEG (90-95% quality)
   - Note: WeChat prefers JPG format over PNG

### Conversion Commands

You can use ImageMagick or similar tools to convert:

```bash
# Convert share-banner.svg to PNG
convert -density 300 -resize 1200x630 share-banner.svg share-banner.png

# Convert wechat-share.svg to JPG
convert -density 300 -resize 500x500 -background white -flatten wechat-share.svg wechat-share.jpg
```

### Additional Images Needed (Optional)

- `favicon-32x32.png` - Browser favicon (32x32)
- `favicon-16x16.png` - Browser favicon (16x16)
- `apple-touch-icon.png` - Apple devices icon (180x180)

These can be generated from the logo SVG in the HTML or created separately.