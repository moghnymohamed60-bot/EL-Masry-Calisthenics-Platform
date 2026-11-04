/**
 * backend/src/storage/mediaStorageAdapter.ts
 * Replaceable Media Storage Adapter for Cloudinary, AWS S3, or local static media URLs.
 */

export interface MediaUploadResult {
  url: string;
  provider: "cloudinary" | "s3" | "external_url";
  mimeType: string;
}

export const mediaStorageAdapter = {
  async storeMediaReference(url: string, mimeType = "video/mp4"): Promise<MediaUploadResult> {
    const provider = process.env.CLOUDINARY_CLOUD_NAME
      ? "cloudinary"
      : process.env.S3_BUCKET_NAME
      ? "s3"
      : "external_url";

    return {
      url: url.trim(),
      provider,
      mimeType,
    };
  },
};

