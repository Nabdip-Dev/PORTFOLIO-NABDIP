import cloudinary from "../config/cloudinary.js";

/** Streams a Multer memory buffer to Cloudinary and resolves with { url, publicId }. */
export function uploadBufferToCloudinary(buffer, { folder, resourceType = "image" }) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error || !result) return reject(error || new Error("Upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

export async function deleteFromCloudinary(publicId, resourceType = "image") {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
