module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  transform: {
    "^.+\\.vue$": "vue-jest"
  },
  moduleNameMapper: {
    "virtual:pwa-register/vue": "<rootDir>/node_modules/vite-plugin-pwa/dist/index.js"
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.{vue,ts,js}", "!**/main.ts", "!**/*.d.ts"]
};
