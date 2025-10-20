const cloudprntPlugin = require("./plugin/cloudprnt-plugin");
const foodOrder = require("./plugin/food-order");

module.exports = {
  ...cloudprntPlugin,
  ...foodOrder,
};
