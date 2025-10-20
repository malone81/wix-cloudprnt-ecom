const { getLocalOrderTime } = require("./date-utilities");
const {
  getOrderNumber,
  getNumberOfItems,
  getPaymentStatus,
  getTotalPrice,
  getDeliveryMethod,
  getEstimatedDeliveryTime,
  createDeliverySection,
} = require("./order");

const { createOrderLineItems } = require("./line-items-formatting");
const wixSiteBackend = require("wix-site-backend");
const { foodOrderReceiptTemplate } = require("./stm-templates");
const { sendToSPO } = require("./cloudprnt-plugin");

/**
 * Deconstruct the order object and fill in the markup template
 * @param {Object} order - order details from Wix
 */
async function formatFoodOrderReceipt(order) {
  const orderNumber = getOrderNumber(order);
  const paymentStatus = getPaymentStatus(order);
  const totalPrice = getTotalPrice(order);

  const timeStamp = await getLocalOrderTime(order?._createdDate);
  const estimatedDeliveryDate = getEstimatedDeliveryTime(order);
  const deliveryMethod = getDeliveryMethod(order);
  const deliverySection = createDeliverySection(order);
  const orderLineItems = await createOrderLineItems(order);
  const businessName = await wixSiteBackend.generalInfo.getBusinessName();
  const numberOfItems = getNumberOfItems(order);

  const markup = foodOrderReceiptTemplate(
    businessName,
    orderNumber,
    timeStamp,
    estimatedDeliveryDate,
    deliveryMethod,
    orderLineItems,
    numberOfItems,
    totalPrice,
    paymentStatus,
    deliverySection
  );

  return markup;
}

// /**
//  * @param {Object} order - order details from Wix
//  * @returns {Promise<any>} - resolves to HTTP response or an error.
//  */
async function printFoodOrder(order) {
  try {
    const starMarkup = await formatFoodOrderReceipt(order);
    const printResponse = await sendToSPO(starMarkup, order.number);
    return printResponse;
  } catch (err) {
    return { error: true, message: err.message };
  }
}
module.exports = {
  formatFoodOrderReceipt,
  printFoodOrder,
};
