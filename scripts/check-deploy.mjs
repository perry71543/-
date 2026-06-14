import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const sourceTargets = [
  "app",
  "components",
  "config",
  "data",
  "lib",
  "next.config.mjs",
  "package.json",
  "tailwind.config.ts",
  "tsconfig.json",
  "tsconfig.typecheck.json"
];

const localPathPatterns = [
  { label: "macOS user path", pattern: /\/Users\// },
  { label: "private temp path", pattern: /\/private\// },
  { label: "localhost URL", pattern: /localhost|127\.0\.0\.1/ }
];

const errors = [];

function walk(target) {
  const fullPath = path.join(root, target);
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const stat = fs.statSync(fullPath);
  if (stat.isFile()) {
    return [fullPath];
  }

  const files = [];
  for (const entry of fs.readdirSync(fullPath)) {
    if (entry === "node_modules" || entry === ".next") {
      continue;
    }

    files.push(...walk(path.join(target, entry)));
  }

  return files;
}

function relative(filePath) {
  return path.relative(root, filePath);
}

const scannedFiles = sourceTargets.flatMap(walk);

for (const filePath of scannedFiles) {
  const text = fs.readFileSync(filePath, "utf8");
  for (const check of localPathPatterns) {
    if (check.pattern.test(text)) {
      errors.push(`${relative(filePath)} contains ${check.label}.`);
    }
  }

  if (/\/images\//.test(text) || /public\/images/.test(text)) {
    errors.push(`${relative(filePath)} references public/images instead of public/products.`);
  }
}

const publicImagesDir = path.join(publicDir, "images");
if (fs.existsSync(publicImagesDir)) {
  const remainingImages = walk(path.relative(root, publicImagesDir)).filter((filePath) =>
    /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(filePath)
  );

  if (remainingImages.length > 0) {
    errors.push(`public/images still contains image files: ${remainingImages.map(relative).join(", ")}`);
  }
}

const productData = fs.readFileSync(path.join(root, "data/products.ts"), "utf8");
const productImageMatches = [...productData.matchAll(/image:\s*"([^"]+)"/g)].map((match) => match[1]);

for (const imagePath of productImageMatches) {
  if (!imagePath.startsWith("/products/")) {
    errors.push(`Product image must start with /products/: ${imagePath}`);
    continue;
  }

  const assetPath = path.join(publicDir, imagePath.slice(1));
  if (!fs.existsSync(assetPath)) {
    errors.push(`Product image file does not exist: public${imagePath}`);
  }
}

const heroImage = path.join(publicDir, "products/hero-detailing.png");
if (!fs.existsSync(heroImage)) {
  errors.push("Hero image must exist at public/products/hero-detailing.png.");
}

if (errors.length > 0) {
  console.error("Deploy checks failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Deploy checks passed: no local paths, and all images are under public/products.");
