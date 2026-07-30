/**
 * Forces a Cloudinary-hosted file to download instead of opening inline —
 * plain <a download> only works same-origin, and Cloudinary URLs are a
 * different origin, so browsers silently ignore the `download` attribute
 * and just navigate to the PDF instead. Inserting Cloudinary's `fl_attachment`
 * delivery flag makes Cloudinary itself send Content-Disposition: attachment,
 * which works regardless of origin.
 */
export function toAttachmentUrl(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("fl_attachment")) return url;
  return url.replace("/upload/", "/upload/fl_attachment/");
}
