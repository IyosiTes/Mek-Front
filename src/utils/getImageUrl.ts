export function getImageUrl(path?: string) {
  if (!path) return "/placeholder.png";

  if (path.startsWith("http")) return path;

  return `${import.meta.env.VITE_API_URL}${path}`;
}