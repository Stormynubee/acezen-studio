const fs = require('fs');
const path = require('path');

const FRAME_COUNT = 120;
const OUTPUT_DIR = path.join(__dirname, '../public/images/sequence');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Generating ${FRAME_COUNT} placeholder frames in ${OUTPUT_DIR}...`);

for (let i = 0; i < FRAME_COUNT; i++) {
    // animated gradient effect based on frame index
    const hue = Math.floor((i / FRAME_COUNT) * 360);
    const progress = Math.floor((i / FRAME_COUNT) * 100);

    // High-end placeholder: Minimalist design with Frame counter and progress bar
    const svgContent = `
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(230,230,230);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(240,240,240);stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  
  <!-- Subtle Grid -->
  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" />

  <!-- Center Text -->
  <text x="50%" y="50%" font-family="Helvetica, Arial, sans-serif" font-size="200" fill="rgba(0,0,0,0.05)" text-anchor="middle" dominant-baseline="middle">
    ${i}
  </text>
  
  <!-- Progress Bar at bottom -->
  <rect x="0" y="1060" width="${(i / FRAME_COUNT) * 1920}" height="20" fill="#000" fill-opacity="0.1" />
  
  <!-- "Fog" Overlay to match theme -->
  <rect width="100%" height="100%" fill="rgba(230,230,230,0.2)" />
</svg>`;

    const fileName = `frame_${i}_delay-0.04s.svg`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), svgContent.trim());
}

console.log('Done! Placeholders generated.');
