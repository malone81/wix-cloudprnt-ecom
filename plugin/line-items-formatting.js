const { itemModifiers } = require("wix-restaurants.v2");

const MAX_LINE_CHARS = 35;
const INDENT = 50;

async function getModifier(modifierId) {
  const result = await itemModifiers.getModifier(modifierId);
  return result;
}

async function createOrderLineItems(order) {
  let orderLineItems = "";
  try {
    for (const item of order.lineItems) {
      orderLineItems += await createItemMarkup(item);
    }
    return orderLineItems;
  } catch (err) {
    console.warn("Error with line items", err);
    return orderLineItems;
  }
}

async function createItemMarkup(item) {
  let itemMarkup = "";
  itemMarkup += createItemFirstLineMarkup(item);
  const options = item.catalogReference.options;
  if ("modifierGroups" in options) {
    const modifierNames = await getModifierNames(options.modifierGroups);
    itemMarkup += await createItemModifiersMarkup(modifierNames);
  }
  if ("specialRequests" in options) {
    itemMarkup += createItemOptionMarkup(options.specialRequests);
  }
  itemMarkup += "\n";
  return itemMarkup;
}

function createItemFirstLineMarkup(item) {
  return `[bold:on][column: left ${item.quantity}x  ${item.productName.original.slice(0, MAX_LINE_CHARS)}; right ${
    item.price.formattedAmount
  }; indent 0][bold: off]\n`;
}

async function getModifierNames(modifierGroups) {
  const modifierNames = [];
  for (const modifierLists of modifierGroups) {
    for (const modifier of modifierLists.modifiers) {
      const tempModifier = await getModifier(modifier._id);
      modifierNames.push(tempModifier.name);
    }
  }
  return modifierNames;
}

async function createItemModifiersMarkup(modifierNames) {
  let modifiersMarkup = "";
  modifierNames.forEach((modifier) => {
    modifiersMarkup += createItemOptionMarkup(modifier);
  });
  return modifiersMarkup;
}

function createItemOptionMarkup(option) {
  return `[column: left - ${option}; indent ${INDENT}]\n`;
}

module.exports = {
  createOrderLineItems,
};
