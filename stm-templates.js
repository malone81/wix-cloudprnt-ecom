export const foodOrderReceiptTemplate = (
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
) =>
  `
    [align: left]\
    [bold: on]\
    [magnify: width 2; height 2]\
    ${businessName}
    [align: center]\
    [magnify: width 3; height 3]\
    [negative: on]\
    #${orderNumber}\
    [align: left]\
    [plain]\
    [align: left]\
    [magnify: width 1; height 1]
    Placed at ${timeStamp}\
    [bold: on]
    Due at ${estimatedDeliveryDate}\
    [bold: off]\
    [upperline: on]
    [space: count 48]\
    [align: center]
    [plain]\
    [bold: on]\
    [magnify: width 2; height 2]
    ${deliveryMethod}\
    [plain]
    [upperline: on]
    [space: count 48]\
    [bold: off]\
    [underline: on]\
    [plain]
    [align: left]\
    ${orderLineItems}\
    ------------------------------------------------
    [column: left No. of items; right ${numberOfItems}; indent 0]
    [column: left Total; right ${totalPrice}]

    [column: left Payment Status; right ${paymentStatus}]\
    [upperline: on]
    [space: count 48]\
    [plain]\
    [align: left]\
    [bold: on]\
    ${deliverySection}\
    [bold: off]\
    ------------------------------------------------
    [align: center]\
    Thank you for ordering from ${businessName}\
    [plain]\
    [cut: feed; partial]
    `;

export const contactDetailsTemplate = (firstName, lastName, phone) =>
  `
    ${firstName} ${lastName}
    ${phone}
    `;

export const deliveryAddressTemplate = (addressLine1 = "", addressLine2, city = "", postalCode = "") =>
  `
    ${addressLine1}${addressLine2 && `\n${addressLine2}`}
    ${city}
    ${postalCode}
    `;
