/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [
    'dist/**',
    'node_modules/**',
  ],
  rules: {
    'color-hex-length': 'long',
    'no-descending-specificity': null,
  },
};
