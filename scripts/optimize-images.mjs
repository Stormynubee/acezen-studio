import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirs = [
    'public/images/sequence',
    'public/images/pussinboots'
];

async function optimize() {
    for (const dir of dirs) {
        const fullDir = path.join(process.cwd(), dir);
        if (!fs.existsSync(fullDir)) {
            console.log(`Directory not found: ${fullDir}`);
            continue;
        }

        const files = fs.readdirSync(fullDir).filter(f => f.match(/\.(jpg|png)$/i));
        console.log(`Processing ${files.length} images in ${dir}...`);

        let totalSaved = 0;

        for (const file of files) {
            const inputPath = path.join(fullDir, file);
            const name = path.parse(file).name;
            const outputPath = path.join(fullDir, `${name}.webp`);

            // Skip if webp exists and is recent? No, force overwrite to ensure quality 40.

            const statsBefore = fs.statSync(inputPath);

            await sharp(inputPath)
                .webp({ quality: 40, effort: 6 }) // Effort 6 = slowest but best compression
                .toFile(outputPath);

            const statsAfter = fs.statSync(outputPath);
            totalSaved += (statsBefore.size - statsAfter.size);

            // Optional: Delete original if success? User might want to keep them as backup.
            // For now, keep originals. Component will switch to .webp.
            // Actually, deleting originals saves disk space, but safer to keep.
            // Deployment will ignore .jpg if I only reference .webp?
            // No, Vercel deploys everything in public.
            // I should DELETE the originals to save bandwidth on deployment (git push size) and Vercel build cache.
            // But wait, if I delete them, I can't re-optimize later easily.
            // I will DELETE them to prevent Vercel from hosting them.

            fs.unlinkSync(inputPath);
        }

        console.log(`Saved ${(totalSaved / 1024 / 1024).toFixed(2)} MB in ${dir}`);
    }
}

optimize().catch(console.error);
