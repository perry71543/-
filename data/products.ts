import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { categories, getCategoryBySlug, getSubcategoryBySlug } from "./categories";

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  subcategorySlug: string;
  price?: number;
  image: string;
  description: string;
  badge?: string;
  featured?: boolean;
  features: string[];
  usage: string[];
  scenarios: string[];
  shopeeUrl: string;
  lineUrl: string;
};

const PRODUCT_IMAGE_ROOT = path.join(process.cwd(), "products pic");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const lineUrl = "https://line.me/R/ti/p/@carcare";

function isProductImage(fileName: string) {
  return imageExtensions.has(path.extname(fileName).toLowerCase());
}

function sortByDisplayName(a: string, b: string) {
  return a.localeCompare(b, "zh-Hant", { numeric: true });
}

function productNameFromFile(fileName: string) {
  return path.basename(fileName, path.extname(fileName)).trim().replace(/\s+/g, " ");
}

function productImageUrl(relativePath: string) {
  return `/product-images/${relativePath
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function compactSlugPart(value: string) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return slug.slice(0, 72).replace(/-+$/g, "");
}

function createProductSlug(
  categorySlug: string,
  subcategorySlug: string,
  name: string,
  relativePath: string
) {
  const readable = compactSlugPart(name) || "product";
  const hash = crypto.createHash("sha1").update(relativePath).digest("hex").slice(0, 8);

  return `${categorySlug}-${subcategorySlug}-${readable}-${hash}`;
}

function productDetails(categoryName: string, subcategoryName: string) {
  return {
    features: [
      `${subcategoryName}系列商品`,
      `適合${categoryName}相關流程搭配使用`,
      "可依需求搭配同分類工具與耗材"
    ],
    usage: [
      "依商品標示與施工環境調整用量或使用方式",
      "正式施工前先確認表面材質與清潔狀態",
      "搭配乾淨毛巾、海綿或工具，避免交叉污染"
    ],
    scenarios: [`${subcategoryName}流程補貨`, `${categoryName}商品選購`, "汽美工作室或 DIY 洗車使用"]
  };
}

function createProduct(
  category: (typeof categories)[number],
  subcategory: (typeof categories)[number]["subcategories"][number],
  filePath: string
): Product {
  const relativePath = path.relative(PRODUCT_IMAGE_ROOT, filePath);
  const name = productNameFromFile(path.basename(filePath));
  const details = productDetails(category.name, subcategory.name);

  return {
    slug: createProductSlug(category.slug, subcategory.slug, name, relativePath),
    name,
    categorySlug: category.slug,
    subcategorySlug: subcategory.slug,
    image: productImageUrl(relativePath),
    description: `${name}，歸類於「${category.name} / ${subcategory.name}」，適合依實際施工需求選購。`,
    badge: subcategory.name,
    features: details.features,
    usage: details.usage,
    scenarios: details.scenarios,
    shopeeUrl: `https://shopee.tw/search?keyword=${encodeURIComponent(name)}`,
    lineUrl
  };
}

function productFilesIn(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    return [];
  }

  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isProductImage(entry.name))
    .map((entry) => path.join(folderPath, entry.name))
    .sort((a, b) => sortByDisplayName(path.basename(a), path.basename(b)));
}

function directFileSubcategory(category: (typeof categories)[number]) {
  return (
    category.subcategories.find((subcategory) => subcategory.name === category.name) ??
    (category.subcategories.length === 1 ? category.subcategories[0] : null)
  );
}

function loadCatalogProducts() {
  if (!fs.existsSync(PRODUCT_IMAGE_ROOT)) {
    return [];
  }

  const catalogProducts: Product[] = [];

  for (const category of categories) {
    const categoryDir = path.join(PRODUCT_IMAGE_ROOT, category.name);

    if (!fs.existsSync(categoryDir)) {
      continue;
    }

    const fallbackSubcategory = directFileSubcategory(category);
    if (fallbackSubcategory) {
      for (const filePath of productFilesIn(categoryDir)) {
        catalogProducts.push(createProduct(category, fallbackSubcategory, filePath));
      }
    }

    for (const subcategory of category.subcategories) {
      const subcategoryDir = path.join(categoryDir, subcategory.name);

      for (const filePath of productFilesIn(subcategoryDir)) {
        catalogProducts.push(createProduct(category, subcategory, filePath));
      }
    }
  }

  return markFeaturedProducts(catalogProducts);
}

function markFeaturedProducts(catalogProducts: Product[]) {
  const featuredSlugs = new Set<string>();

  for (const category of categories.filter((category) => category.slug !== "others")) {
    const firstInCategory = catalogProducts.find((product) => product.categorySlug === category.slug);

    if (firstInCategory) {
      featuredSlugs.add(firstInCategory.slug);
    }
  }

  for (const product of catalogProducts) {
    if (featuredSlugs.size >= 6) {
      break;
    }

    featuredSlugs.add(product.slug);
  }

  return catalogProducts.map((product) => ({
    ...product,
    featured: featuredSlugs.has(product.slug)
  }));
}

function validateProducts(products: Product[]) {
  for (const product of products) {
    const category = getCategoryBySlug(product.categorySlug);
    const subcategory = getSubcategoryBySlug(product.categorySlug, product.subcategorySlug);

    if (!category || !subcategory) {
      throw new Error(
        `${product.name} uses a category that is not defined in config/category_rules.yaml.`
      );
    }
  }

  return products;
}

export const products = validateProducts(loadCatalogProducts());

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured).slice(0, 6);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductCategory(product: Product) {
  const category = categories.find((category) => category.slug === product.categorySlug);
  const subcategory = category?.subcategories.find(
    (subcategory) => subcategory.slug === product.subcategorySlug
  );

  if (!category || !subcategory) {
    throw new Error(`${product.name} has an invalid category.`);
  }

  return { category, subcategory };
}
