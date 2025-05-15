
import { useState } from "react";

export function useStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const json = localStorage.getItem(key);
    if (json != null) return JSON.parse(json);
    return initialValue;
  });

  function setStoredValue(val: T) {
    localStorage.setItem(key, JSON.stringify(val));
    setValue(val);
  }

  return [value, setStoredValue] as const;
}
