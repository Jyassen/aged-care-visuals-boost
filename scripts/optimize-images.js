import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname } from 'path';

const imagesDir = 'public/images';
const optimizedDir = 'public/images-optimized';

// Quality settings
const JPEG_QUALITY = 85;
const PNG_QUALITY = 90;
const MAX_WIDTH = 2400; // Maximum width for desktop displays

async function optimizeImages() {
  try {
    const files = await readdir(imagesDir);
    
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      const inputPath = join(imagesDir, file);
      const outputPath = join(imagesDir, file);
      
      // Skip if not an image
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        console.log(`Skipping ${file} (not an image)`);
        continue;
      }

      console.log(`Optimizing ${file}...`);

      try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Resize if too large
        if (metadata.width > MAX_WIDTH) {
          image.resize(MAX_WIDTH, null, {
            withoutEnlargement: true,
            fit: 'inside'
          });
        }

        // Apply format-specific optimizations
        if (['.jpg', '.jpeg'].includes(ext)) {
          await image
            .jpeg({ 
              quality: JPEG_QUALITY, 
              progressive: true,
              mozjpeg: true 
            })
            .toFile(outputPath + '.tmp');
        } else if (ext === '.png') {
          await image
            .png({ 
              quality: PNG_QUALITY, 
              compressionLevel: 9,
              progressive: true 
            })
            .toFile(outputPath + '.tmp');
        }

        // Replace original with optimized version
        const fs = await import('fs');
        const stats = fs.statSync(inputPath);
        const newStats = fs.statSync(outputPath + '.tmp');
        
        console.log(`  Original: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
        console.log(`  Optimized: ${(newStats.size / 1024 / 1024).toFixed(2)}MB`);
        console.log(`  Savings: ${((1 - newStats.size / stats.size) * 100).toFixed(1)}%`);
        
        fs.renameSync(outputPath + '.tmp', outputPath);
      } catch (err) {
        console.error(`  Error processing ${file}:`, err.message);
      }
    }

    console.log('\n✅ Image optimization complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

optimizeImages();

