const { contactDetailsTemplate, deliveryAddressTemplate } = require("./stm-templates");

function getOrderNumber(order) {
  return order.number ?? "#####";
}

function getPaymentStatus(order) {
  return order.paymentStatus ?? "MISSING PAYMENT STATUS";
}

function getTotalPrice(order) {
  return order.priceSummary?.totalPrice?.formattedAmount ?? "MISSING PRICE";
}

function getDeliveryMethod(order) {
  return order?.shippingInfo?.deliveryOption?.toUpperCase() ?? "MANUAL ORDER";
}

function getNumberOfItems(order) {
  if (!order?.lineItems || !Array.isArray(order.lineItems)) {
    console.warn("Invalid or missing lineItems");
    return 0;
  }

  return order.lineItems.reduce((acc, item) => acc + item.quantity, 0);
}

function getEstimatedDeliveryTime(order) {
  return order.shippingInfo?.logistics?.deliveryTime ?? "-";
}

function createDeliverySection(order) {
  let deliverySection = "";

  const { firstName = "", lastName = "", phone = "" } = order.billingInfo?.contactDetails || {};
  deliverySection += contactDetailsTemplate(firstName, lastName, phone);

  const address = order.shippingInfo?.logistics?.shippingDestination?.address;
  if (address) {
    const { addressLine1, addressLine2, city, postalCode } = address;
    deliverySection += deliveryAddressTemplate(addressLine1, addressLine2, city, postalCode);
  }

  return deliverySection;
}

module.exports = {
  getOrderNumber,
  getPaymentStatus,
  getTotalPrice,
  getDeliveryMethod,
  getNumberOfItems,
  getEstimatedDeliveryTime,
  createDeliverySection,
};
