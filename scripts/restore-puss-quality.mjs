import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/images/pussinboots';

async function optimize() {
    const fullDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDir)) {
        console.log(`Directory not found: ${fullDir}`);
        return;
    }

    const files = fs.readdirSync(fullDir).filter(f => f.match(/\.(webp|jpg|png)$/i));
    console.log(`Restoring ${files.length} images in ${dir} to High Quality...`);

    let totalSaved = 0;

    for (const file of files) {
        const inputPath = path.join(fullDir, file);
        const name = path.parse(file).name;
        if (name.endsWith('_temp')) continue;

        const tempPath = path.join(fullDir, `${name}_temp.webp`);

        const inputBuffer = fs.readFileSync(inputPath);
        const statsBefore = inputBuffer.length;

        // Restoration: 1200px width (High Detail), Quality 90
        await sharp(inputBuffer)
            .resize({ width: 1200, kernel: sharp.kernel.lanczos3 })
            .webp({ quality: 90, effort: 6 })
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

    console.log(`Restored Puss. Size Change: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (Negative means growth)`);
}

optimize().catch(console.error);
