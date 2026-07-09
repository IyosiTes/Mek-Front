// utils/timeAgo.ts

export function timeAgo(dateString: string) {
  const date = new Date(dateString);

  const seconds =
    Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals = [
    { label: "y", value: 31536000 },
    { label: "mo", value: 2592000 },
    { label: "d", value: 86400 },
    { label: "h", value: 3600 },
    { label: "m", value: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(
      seconds / interval.value
    );

    if (count >= 1) {
      return `${count}${interval.label}`;
    }
  }

  return "now";
}