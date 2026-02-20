import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = 'C:/Users/storm/acezen/Mountain sequence'; // External Source
const targetDir = 'public/images/sequence';

async function optimize() {
    if (!fs.existsSync(sourceDir)) {
        console.error(`Source not found: ${sourceDir}`);
        return;
    }

    // Ensure target dir exists
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const files = fs.readdirSync(sourceDir).filter(f => f.match(/\.(png|jpg|jpeg)$/i));
    console.log(`Processing ${files.length} frames from ${sourceDir}...`);

    let totalSaved = 0;

    for (const file of files) {
        const inputPath = path.join(sourceDir, file);
        const name = path.parse(file).name;
        const outputPath = path.join(process.cwd(), targetDir, `${name}.webp`);

        const inputBuffer = fs.readFileSync(inputPath);

        // Single Pass: Crop Watermark -> Resize 1920 -> Mild Sharpen -> WebP Q80 (Balanced)
        const metadata = await sharp(inputBuffer).metadata();
        const cropHeight = Math.floor(metadata.height * 0.92); // Cut off bottom 8%

        await sharp(inputBuffer)
            .extract({ left: 0, top: 0, width: metadata.width, height: cropHeight })
            .resize({ width: 1920, kernel: sharp.kernel.lanczos3 })
            .sharpen({ sigma: 0.5 }) // Very mild sharpness
            .webp({ quality: 80, effort: 6 }) // Q80: Visually identical to Q90 but ~30% smaller
            .toFile(outputPath);

        // Log progress every 50 frames
        if (parseInt(name) % 50 === 0) console.log(`Processed frame ${name}`);
    }
    console.log('Done!');
}

optimize().catch(console.error);
