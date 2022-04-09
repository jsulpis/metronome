/// <reference types="vite/client" />

interface Navigator {
  wakeLock: {
    request: (type: string) => Promise<void>;
  };
}