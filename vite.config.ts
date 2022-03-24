/// <reference types="vitest" />

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Metronome",
        description: "Metronome web application with a modern UI",
        short_name: "Metronome",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ]
      },
      includeAssets: ["thumbnail.jpg"]
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts"
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/styles/abstract" as *;'
      }
    }
  }
});
