export function generateRandomChars(): string {
  const chars = "23456789abcdefghjkmnpqrstuvwxz".split("")
  return Array.from(new Array(5), (_) => chars[Math.floor(Math.random() * chars.length)]).join("")
}
