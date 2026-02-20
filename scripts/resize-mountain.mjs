import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/images/sequence';

async function optimize() {
    const fullDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDir)) {
        console.log(`Directory not found: ${fullDir}`);
        return;
    }

    const files = fs.readdirSync(fullDir).filter(f => f.match(/\.(webp|jpg|png)$/i));
    console.log(`Processing ${files.length} images in ${dir}...`);

    let totalSaved = 0;

    for (const file of files) {
        const inputPath = path.join(fullDir, file);
        const name = path.parse(file).name;
        // Skip temp files
        if (name.endsWith('_temp')) continue;

        const tempPath = path.join(fullDir, `${name}_temp.webp`);

        const inputBuffer = fs.readFileSync(inputPath);
        const statsBefore = inputBuffer.length;

        await sharp(inputBuffer)
            .resize({ width: 1000 }) // Resize to 1000px width (sufficient for BG)
            .webp({ quality: 40, effort: 6 })
            .toFile(tempPath);

        const statsAfter = fs.statSync(tempPath);
        totalSaved += (statsBefore - statsAfter.size);

        if (statsAfter.size > 0) {
            try {
                fs.unlinkSync(inputPath);
                fs.renameSync(tempPath, inputPath);
            } catch (e) {
                console.error(`Error renaming ${file}:`, e);
            }
        }
    }

    console.log(`Saved ${(totalSaved / 1024 / 1024).toFixed(2)} MB in ${dir}`);
}

optimize().catch(console.error);
