import { contactDetailsTemplate, deliveryAddressTemplate } from "./stm-templates.js";
export function getOrderNumber(order) {
  return order.number ?? "#####";
}

export function getPaymentStatus(order) {
  return order.paymentStatus ?? "MISSING PAYMENT STATUS";
}

export function getTotalPrice(order) {
  return order.priceSummary?.totalPrice?.formattedAmount ?? "MISSING PRICE";
}

export function getDeliveryMethod(order) {
  return order?.shippingInfo?.deliveryOption?.toUpperCase() ?? "MANUAL ORDER";
}

export function getNumberOfItems(order) {
  if (!order?.lineItems || !Array.isArray(order.lineItems)) {
    console.warn("Invalid or missing lineItems");
    return 0;
  }

  return order.lineItems.reduce((acc, item) => acc + item.quantity, 0);
}

export function getEstimatedDeliveryTime(order) {
  return order.shippingInfo?.logistics?.deliveryTime ?? "-";
}

export function createDeliverySection(order) {
  let deliverySection = "";

  const { firstName = "", lastName = "", phone = "" } = order.billingInfo?.contactDetails;
  deliverySection += contactDetailsTemplate(firstName, lastName, phone);

  const address = order.shippingInfo?.logistics?.shippingDestination?.address;
  if (address) {
    const { addressLine1, addressLine2, city, postalCode } = address;
    deliverySection += deliveryAddressTemplate(addressLine1, addressLine2, city, postalCode);
  }

  return deliverySection;
}
