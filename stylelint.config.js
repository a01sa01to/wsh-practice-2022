module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-config-prettier"],
  plugins: ["stylelint-order"],
  rules: {
    "function-no-unknown": null,
    "order/properties-alphabetical-order": true,
  },
};
