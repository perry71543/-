import { categories, getCategoryBySlug, getSubcategoryBySlug } from "./categories";

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  subcategorySlug: string;
  price: number;
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

const lineUrl = "https://line.me/R/ti/p/@carcare";

const mockProducts: Product[] = [
  {
    slug: "iron-tar-reset-gel",
    name: "鐵粉柏油重置凝膠",
    categorySlug: "cleaning-decontamination",
    subcategorySlug: "iron-tar-remover",
    price: 580,
    image: "/products/decon-gel.svg",
    description: "針對車側與輪拱常見鐵粉、柏油點設計，洗前快速鬆動附著污染。",
    badge: "深層去污",
    featured: true,
    features: ["凝膠停留性佳", "適合局部污染處理", "洗前流程更有效率"],
    usage: ["車身降溫後噴灑於污染區", "靜置 2 至 4 分鐘", "以高壓水完整沖淨後再進入洗車步驟"],
    scenarios: ["高速通勤後的車側黑點", "輪拱與門檻柏油附著", "鍍膜或上蠟前的前處理"],
    shopeeUrl: "https://shopee.tw/search?keyword=%E5%8E%BB%E9%90%B5%E7%B2%89%20%E6%9F%8F%E6%B2%B9",
    lineUrl
  },
  {
    slug: "snow-foam-shampoo",
    name: "霧銀雪泡洗車精",
    categorySlug: "cleaning-decontamination",
    subcategorySlug: "car-shampoo",
    price: 420,
    image: "/products/snow-shampoo.svg",
    description: "高泡沫、好沖淨的日常洗車精，保留滑潤手感並降低洗痕風險。",
    badge: "日常首選",
    featured: true,
    features: ["綿密泡沫包覆髒污", "中性配方適合已上蠟車輛", "泡沫槍與手洗皆適用"],
    usage: ["依髒污程度稀釋", "搭配泡沫噴壺或水桶起泡", "由上而下清洗並保持手套潔淨"],
    scenarios: ["每週例行洗車", "鍍膜維護前清潔", "黑車降低乾擦風險"],
    shopeeUrl: "https://shopee.tw/search?keyword=%E6%B4%97%E8%BB%8A%E7%B2%BE",
    lineUrl
  },
  {
    slug: "mist-sealant-spray",
    name: "鏡面噴霧封體",
    categorySlug: "paint-protection",
    subcategorySlug: "spray-sealant",
    price: 760,
    image: "/products/sealant-spray.svg",
    description: "洗後快速補強光澤與撥水，適合維持車漆清透感的輕施工產品。",
    badge: "快速亮面",
    featured: true,
    features: ["濕車與乾車皆可施工", "提升滑度與水珠表現", "不易殘留厚重蠟影"],
    usage: ["洗淨後少量噴於漆面", "以短纖毛巾推開", "再用乾淨面翻亮收尾"],
    scenarios: ["洗後快速保養", "出門前提升亮度", "既有鍍膜的日常維護"],
    shopeeUrl: "https://shopee.tw/search?keyword=%E5%99%B4%E9%9C%A7%E5%B0%81%E9%AB%94",
    lineUrl
  },
  {
    slug: "ceramic-coating-kit",
    name: "陶瓷鍍膜入門組",
    categorySlug: "paint-protection",
    subcategorySlug: "ceramic-coating",
    price: 1680,
    image: "/products/ceramic-kit.svg",
    description: "適合完整前處理後施工，提供更持久的疏水、抗污與高亮防護。",
    badge: "高防護",
    featured: true,
    features: ["硬質光澤表現", "耐洗車性佳", "附施工海綿與收邊布"],
    usage: ["確認漆面潔淨乾燥", "分區薄擦並等待初固化", "以乾淨毛巾收乾至無殘影"],
    scenarios: ["新車保護", "拋光修復後封存亮度", "希望延長清潔週期的車主"],
    shopeeUrl: "https://shopee.tw/search?keyword=%E9%99%B6%E7%93%B7%E9%8D%8D%E8%86%9C",
    lineUrl
  },
  {
    slug: "bmd-premium-wax",
    name: "BMD 頂級棕櫚車蠟",
    categorySlug: "paint-protection",
    subcategorySlug: "premium-wax-bmd",
    price: 2380,
    image: "/products/premium-wax.svg",
    description: "偏展示取向的高階蠟品，強調濕潤深邃的黑車光澤與細膩觸感。",
    badge: "展示光澤",
    featured: true,
    features: ["棕櫚蠟質感", "深色車漆表現突出", "薄上薄下不厚重"],
    usage: ["以海綿薄薄塗佈", "等待霧化後輕柔下蠟", "使用長纖毛巾做最後翻亮"],
    scenarios: ["聚會與交車前整理", "深色車漆追求濕潤感", "鍍膜外層增添蠟感光澤"],
    shopeeUrl: "https://shopee.tw/search?keyword=BMD%20%E9%A0%82%E7%B4%9A%E8%BB%8A%E8%A0%9F",
    lineUrl
  },
  {
    slug: "interior-cleaner-matte",
    name: "霧面內裝清潔液",
    categorySlug: "interior-care",
    subcategorySlug: "interior-cleaner",
    price: 520,
    image: "/products/interior-cleaner.svg",
    description: "清潔儀表、門板與中控表面，留下乾淨低反光的原廠霧面質感。",
    features: ["低殘留清爽手感", "適合塑料與飾板", "不留下油亮膜感"],
    usage: ["噴於毛巾而非直接噴向電子區", "輕擦表面髒污", "以乾布帶走多餘水氣"],
    scenarios: ["日常車室整理", "飲料印與指紋清潔", "交車前內裝修整"],
    shopeeUrl: "https://shopee.tw/search?keyword=%E5%85%A7%E8%A3%9D%E6%B8%85%E6%BD%94",
    lineUrl
  },
  {
    slug: "tire-satin-dressing",
    name: "緞面輪胎保養乳",
    categorySlug: "interior-care",
    subcategorySlug: "tire-care",
    price: 480,
    image: "/products/tire-dressing.svg",
    description: "不過度油亮的輪胎保養乳，讓胎壁維持乾淨緞面與完整輪廓。",
    features: ["緞面不飛濺", "提升胎壁黑度", "適合洗後最後收尾"],
    usage: ["確認胎壁乾燥", "以海綿均勻塗佈", "靜置吸收後擦除多餘殘留"],
    scenarios: ["洗後輪胎收邊", "展車低調質感", "老化胎壁視覺修飾"],
    shopeeUrl: "https://shopee.tw/search?keyword=%E8%BC%AA%E8%83%8E%E4%BF%9D%E9%A4%8A",
    lineUrl
  },
  {
    slug: "dual-action-polisher",
    name: "DA 安全拋光機",
    categorySlug: "polishing-work",
    subcategorySlug: "polishing-machine",
    price: 3680,
    image: "/products/da-polisher.svg",
    description: "適合入門到進階施工的震拋機，兼顧修復效率與安全容錯。",
    features: ["雙向震拋軌跡", "分段轉速控制", "搭配棉盤可做多種漆況處理"],
    usage: ["從低速鋪料開始", "保持機身平貼漆面", "分區交叉移動並定期清潔棉盤"],
    scenarios: ["細紋與水痕修復", "上蠟前漆面整理", "工作室日常施工"],
    shopeeUrl: "https://shopee.tw/search?keyword=DA%20%E6%8B%8B%E5%85%89%E6%A9%9F",
    lineUrl
  },
  {
    slug: "microfiber-finishing-towel",
    name: "高密度收邊超纖布",
    categorySlug: "cleaning-decontamination",
    subcategorySlug: "cleaning-consumables",
    price: 260,
    image: "/products/microfiber-towel.svg",
    description: "柔軟高密度纖維，適合下蠟、擦拭封體與最後一道翻亮。",
    features: ["長短纖雙面用途", "邊線柔軟不刮手", "高吸附力不易掉毛"],
    usage: ["依用途分色管理", "施工中勤換乾淨面", "使用後以纖維布清潔劑清洗"],
    scenarios: ["下蠟與收鍍膜", "內裝細節擦拭", "洗後水痕收乾"],
    shopeeUrl: "https://shopee.tw/search?keyword=%E8%B6%85%E7%BA%96%E5%B8%83",
    lineUrl
  },
  {
    slug: "foam-sprayer-pro",
    name: "高壓泡沫噴壺組",
    categorySlug: "washing-tools",
    subcategorySlug: "foam-sprayer",
    price: 980,
    image: "/products/foam-sprayer.svg",
    description: "細緻泡沫覆蓋車身，讓預洗流程更均勻，也更有儀式感。",
    features: ["泡沫濃度可調", "透明瓶身方便掌握容量", "快拆接頭好清潔"],
    usage: ["依洗車精建議比例稀釋", "由下往上覆蓋泡沫", "等待髒污鬆動後高壓沖淨"],
    scenarios: ["預洗降低刮傷", "大型車快速覆蓋", "週末精緻洗車流程"],
    shopeeUrl: "https://shopee.tw/search?keyword=%E6%B3%A1%E6%B2%AB%E5%99%B4%E5%A3%BA",
    lineUrl
  }
];

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

export const products = validateProducts(mockProducts);

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
