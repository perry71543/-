import fs from "node:fs";
import path from "node:path";

export type Subcategory = {
  name: string;
  slug: string;
  keywords: string[];
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
};

const CONFIG_PATH = path.join(process.cwd(), "config/category_rules.yaml");

function readScalar(rawValue: string) {
  const value = rawValue.trim();
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function valueAfter(trimmedLine: string, key: string) {
  return readScalar(trimmedLine.slice(`${key}:`.length));
}

function parseCategoryRules(yaml: string): Category[] {
  const categories: Category[] = [];
  let currentCategory: Category | null = null;
  let currentSubcategory: Subcategory | null = null;

  for (const line of yaml.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || trimmed === "categories:") {
      continue;
    }

    const indent = line.length - line.trimStart().length;

    if (indent === 2 && trimmed.startsWith("- name:")) {
      currentCategory = {
        name: valueAfter(trimmed.slice(2).trim(), "name"),
        slug: "",
        description: "",
        subcategories: []
      };
      currentSubcategory = null;
      categories.push(currentCategory);
      continue;
    }

    if (!currentCategory) {
      continue;
    }

    if (indent === 4 && trimmed.startsWith("slug:")) {
      currentCategory.slug = valueAfter(trimmed, "slug");
      continue;
    }

    if (indent === 4 && trimmed.startsWith("description:")) {
      currentCategory.description = valueAfter(trimmed, "description");
      continue;
    }

    if (indent === 6 && trimmed.startsWith("- name:")) {
      currentSubcategory = {
        name: valueAfter(trimmed.slice(2).trim(), "name"),
        slug: "",
        keywords: []
      };
      currentCategory.subcategories.push(currentSubcategory);
      continue;
    }

    if (!currentSubcategory) {
      continue;
    }

    if (indent === 8 && trimmed.startsWith("slug:")) {
      currentSubcategory.slug = valueAfter(trimmed, "slug");
      continue;
    }

    if (indent === 10 && trimmed.startsWith("- ")) {
      currentSubcategory.keywords.push(readScalar(trimmed.slice(2)));
    }
  }

  return categories;
}

function loadCategories() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("Missing config/category_rules.yaml. Product categories must come from this file.");
  }

  const categories = parseCategoryRules(fs.readFileSync(CONFIG_PATH, "utf8"));

  if (categories.length === 0) {
    throw new Error("config/category_rules.yaml does not contain any categories.");
  }

  for (const category of categories) {
    if (!category.name || !category.slug || category.subcategories.length === 0) {
      throw new Error(`Invalid category rule: ${category.name || "(empty)"}`);
    }

    for (const subcategory of category.subcategories) {
      if (!subcategory.name || !subcategory.slug) {
        throw new Error(`Invalid subcategory rule under ${category.name}`);
      }
    }
  }

  return categories;
}

export const categories = loadCategories();

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  return getCategoryBySlug(categorySlug)?.subcategories.find(
    (subcategory) => subcategory.slug === subcategorySlug
  );
}

export function getFeaturedCategories() {
  return categories.filter((category) => category.slug !== "others").slice(0, 5);
}
