import { printFoodOrder } from "wix-cloudprnt-ecom";

export async function wixEcom_onOrderApproved(event) {
  const order = event?.data?.order;
  if (!order) return;
  try {
    const result = await printFoodOrder(order);
    console.log(result);
  } catch (err) {
    console.warn("Failed to print order:", err);
  }
}
