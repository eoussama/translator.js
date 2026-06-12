const dx = require("@eoussama/dx");



module.exports = dx({
  ignores: [
    "README.md",
    "dist/**",
    "demos/assets/js/**",
  ],
}).append(
  // Jest test environment globals and rule overrides
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "no-new": "off",
      "new-cap": "off",
      "jsdoc/require-description": "off",
      "jsdoc/require-param-description": "off",
    },
  },
  // Browser-facing demo scripts
  {
    files: ["demos/**/*.js"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        Event: "readonly",
        EOTranslator: "readonly",
        alert: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "no-alert": "off",
      "no-console": "off",
      "no-multi-str": "off",
    },
  },
);
