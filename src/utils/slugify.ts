export function generateSlug(text: string) {
  if (!text) return "";

  return text
    .toString()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\d\-\u0E00-\u0E7F]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
