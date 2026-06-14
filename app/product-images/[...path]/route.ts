import fs from "node:fs/promises";
import path from "node:path";

const PRODUCT_IMAGE_ROOT = path.resolve(process.cwd(), "products pic");

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

type ProductImageRouteProps = {
  params: Promise<{
    path: string[];
  }>;
};

function safeImagePath(segments: string[]) {
  const requestedPath = path.resolve(PRODUCT_IMAGE_ROOT, ...segments);
  const isInsideRoot =
    requestedPath === PRODUCT_IMAGE_ROOT || requestedPath.startsWith(`${PRODUCT_IMAGE_ROOT}${path.sep}`);

  if (!isInsideRoot) {
    return null;
  }

  return requestedPath;
}

export async function GET(_request: Request, { params }: ProductImageRouteProps) {
  const { path: segments } = await params;
  const imagePath = safeImagePath(segments);

  if (!imagePath) {
    return new Response("Invalid image path.", { status: 400 });
  }

  const extension = path.extname(imagePath).toLowerCase();
  const contentType = contentTypes[extension];

  if (!contentType) {
    return new Response("Unsupported image type.", { status: 415 });
  }

  try {
    const image = await fs.readFile(imagePath);

    return new Response(new Uint8Array(image), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType
      }
    });
  } catch {
    return new Response("Image not found.", { status: 404 });
  }
}
