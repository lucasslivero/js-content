import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function safeSessionStorageGetItem<T>(key: string): T | null {
  try {
    const data = sessionStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch {
    return null;
  }
}
