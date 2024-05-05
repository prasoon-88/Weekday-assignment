import { DropdownProps } from "./constants";

export const getLabels = (value: string, array: DropdownProps[]) => {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (value == array[i].value) return array[i].label;
  }
  return "";
};

export const capitalizeWords = (str: string) => {
  if (!str) {
    return "";
  }
  const inString: string = String(str);
  return inString
    ? inString.replace(/\b\w/g, (char) => char.toUpperCase())
    : "";
};

export function ensureWWW(link: string): string {
  if (link && !link.includes("www")) {
    if (link.startsWith("https://")) {
      return link.replace("https://", "https://www.");
    } else if (link.startsWith("http://")) {
      return link.replace("http://", "https://www.");
    } else {
      return "https://www." + link;
    }
  }

  return link;
}
