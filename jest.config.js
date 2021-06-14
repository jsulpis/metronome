module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  transform: {
    "^.+\\.vue$": "vue-jest"
  }
};
