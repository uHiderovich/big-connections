import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import sharp from 'sharp';

const imagesDir = resolve(process.cwd(), 'public/images');
const webpOptions = { quality: 80, effort: 6 };

// Исходники хранятся в 2x (`name@2x.ext`), из них получаются `name.webp` (1x) и `name@2x.webp`
const sources = [
  ...readdirSync(imagesDir).filter((file) => /^slide-.+@2x\.jpg$/.test(file)),
  '404@2x.png',
];

async function convert(file) {
  const input = resolve(imagesDir, file);
  const base = file.replace(/@2x\.\w+$/, '');
  const { width } = await sharp(input).metadata();

  await sharp(input).webp(webpOptions).toFile(resolve(imagesDir, `${base}@2x.webp`));
  await sharp(input)
    .resize({ width: Math.round(width / 2) })
    .webp(webpOptions)
    .toFile(resolve(imagesDir, `${base}.webp`));

  console.log(`${file} -> ${base}.webp, ${base}@2x.webp`);
}

for (const file of sources) {
  await convert(file);
}
