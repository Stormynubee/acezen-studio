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

    // Process both .webp (already optimized) and any .jpg if they exist
    // Actually, I already converted them all to .webp. So I should read .webp
    const files = fs.readdirSync(fullDir).filter(f => f.match(/\.(webp|jpg|png)$/i));
    console.log(`Processing ${files.length} images in ${dir}...`);

    let totalSaved = 0;

    for (const file of files) {
        const inputPath = path.join(fullDir, file);
        const name = path.parse(file).name;
        // Skip temp files from previous failed run
        if (name.endsWith('_temp')) continue;
        // Output to temp file then rename? Or just overwrite?
        // Sharp cannot write to same file it is reading potentially.
        // Best to write to temp, then rename.
        const tempPath = path.join(fullDir, `${name}_temp.webp`);

        // Read to buffer to avoid file lock
        const inputBuffer = fs.readFileSync(inputPath);
        const statsBefore = inputBuffer.length;

        await sharp(inputBuffer)
            .resize({ width: 500 }) // Resize to 500px width (aspect ratio preserved)
            .webp({ quality: 40, effort: 6 })
            .toFile(tempPath);

        const statsAfter = fs.statSync(tempPath);
        totalSaved += (statsBefore - statsAfter.size);

        // Verify output exists and is non-zero
        if (statsAfter.size > 0) {
            try {
                fs.unlinkSync(inputPath); // Delete old
                fs.renameSync(tempPath, inputPath); // Rename new to old name
            } catch (e) {
                console.error(`Error renaming ${file}:`, e);
            }
        }
    }

    console.log(`Saved ${(totalSaved / 1024 / 1024).toFixed(2)} MB in ${dir}`);
}

optimize().catch(console.error);
