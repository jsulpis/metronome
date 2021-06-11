module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  preset: "@vue/cli-plugin-unit-jest/presets/no-babel",
  transform: {
    "^.+\\.vue$": "vue-jest"
  }
};
