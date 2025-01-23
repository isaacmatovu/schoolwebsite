import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const SIZES = {
    small: 640,
    medium: 1024,
    large: 1920
};

const QUALITY = {
    webp: 80,
    jpeg: 85
};

async function optimizeImages() {
    const sourceDir = './src/images';
    const files = await readdir(sourceDir);
    
    for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
        
        const sourcePath = join(sourceDir, file);
        const filename = file.split('.')[0];
        
        // Process each size
        for (const [size, width] of Object.entries(SIZES)) {
            const image = sharp(sourcePath);
            
            // Resize image
            image.resize(width, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
            
            // Save as WebP
            await image.clone()
                .webp({ quality: QUALITY.webp })
                .toFile(join(sourceDir, `${filename}-${size}.webp`));
            
            // Save as JPEG
            await image
                .jpeg({ quality: QUALITY.jpeg })
                .toFile(join(sourceDir, `${filename}-${size}.jpg`));
        }
        
        console.log(`Optimized: ${file}`);
    }
}

optimizeImages().catch(console.error);
