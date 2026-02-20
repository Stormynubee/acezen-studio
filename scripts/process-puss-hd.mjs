
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const SRC_DIR = 'C:/Users/storm/acezen/pussinbootsxbongocat';
const DST_DIR = 'public/images/pussinboots-hd';
const TOTAL_FRAMES = 240;

// Valid ranges: 1-110, 142-149, 207-240
// Skip: 111-141, 150-206
const isValidFrame = (i) => {
    if (i >= 1 && i <= 110) return true;
    if (i >= 142 && i <= 149) return true;
    if (i >= 207 && i <= 240) return true;
    return false;
};

async function main() {
    try {
        await fs.mkdir(DST_DIR, { recursive: true });
        console.log(`Processing frames from ${SRC_DIR} to ${DST_DIR}...`);

        let processedCount = 0;

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            if (!isValidFrame(i)) continue;

            const pad = String(i).padStart(3, '0');
            // Support both naming conventions? 'ezgif-frame-001.png'
            // The list_dir showed 'ezgif-frame-001.png'
            const srcNames = [
                `ezgif-frame-${pad}.png`,
                `frame_${pad}_delay-0.03s.png` // Fallback just in case
            ];

            let srcPath = null;
            for (const name of srcNames) {
                const p = path.join(SRC_DIR, name);
                try {
                    await fs.access(p);
                    srcPath = p;
                    break;
                } catch (e) { }
            }

            if (!srcPath) {
                console.warn(`Warning: Frame ${i} not found in source.`);
                continue;
            }

            const dstPath = path.join(DST_DIR, `ezgif-frame-${pad}.webp`);

            await sharp(srcPath)
                .resize({ width: 1000, withoutEnlargement: true }) // 1000px width is plenty for sidebar
                .sharpen({ sigma: 0.5 }) // Mild sharpen
                .webp({ quality: 92, effort: 6 }) // High Quality, Slow Effort
                .toFile(dstPath);

            processedCount++;
            if (processedCount % 10 === 0) process.stdout.write('.');
        }

        console.log(`\nDone! Processed ${processedCount} frames.`);

    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

main();
