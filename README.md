# Wix CloudPRNT + SPO Plugin

This plugin can be used to automatically print order tickets from Wix sites using a Star printer.
This is **not** an official package from Star Micronics or Wix.
Both Wix and StarPrinter.Online (SPO) will require paid subscriptions.

## Usage

Import using CommonJS:

```js
const { printFoodOrder } = require("wix-cloudprnt-ecom");
```

ES Modules:

```js
import { printFoodOrder } from "wix-cloudprnt-ecom";
```

In Wix, there are multiple triggers that can be used - I recommend _wixEcom_onOrderApproved_ which returns an event that contains the order object.

```js
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
```

## Requirements

- **Star CloudPRNT Printer** - https://star-emea.com/products/cloudprnt/ -> View Models - The printer must be CloudPRNT compatible.
- **StarPrinter.Online account** - contact <support@star-emea.com> in order to obtain an account
- **Wix Restaurant Orders (New)** - https://support.wix.com/en/article/wix-restaurants-adding-and-setting-up-wix-restaurants-orders-new
- **Active internet connection to the printer** - there are both WiFi and Wired Star printer models, please choose carefully depending on your environment.

## Installation

First, connect your printer to SPO according to the instructions found in the online manual e.g.

https://www.star-m.jp/products/s_print/oml/tsp100iv/manual/en/convenientFunctions/settingsCloudPRNT.htm

---

Next, from your SPO dashboard, obtain the following information:

- **Device group path**
- **Device ID of the printer**
- **API key**

**Device Group Path & Device ID**: Found on https://portal.starprinter.online/Devices by clicking the 3 dots next to your connected printer.

**API Key** - Found on https://portal.starprinter.online/ApiKeys.html. Create a new API key and only enable the **PrintToDevice** permission. It is recommended to create a separate API key for each Wix site.

Next, on your Wix dashboard, setup the secrets using the above information:

- Click on **‘Developer Tools’**.
- Select **‘Secrets Manager’**.
- Store the following 3 secret names and set the value to the ones copied from SPO. Description can be left blank.

  - **SPO_DEVICE_ID**
  - **SPO_API_KEY**
  - **SPO_DEVICE_GROUP**

---

Finally, you can use the plugin code:

- On your Wix Dashboard, click on the **'Home'** tab.
- Click **'Edit Site'**.
- Turn **Dev Mode On**.
- On the left navigation bar, click **Code**, then **‘Public & Backend’**.
- Navigate to the **Packages & Apps** section and next to _npm_ click the + symbol then "Install packages from npm".
- Search for "wix-cloudprnt-ecom" and click install. Once installed, you can use the package within your backend code, such as the events.js file:
- If you don't have an **events.js** file, create one by clicking on the + symbol next to _Backend_ in the _Backend & Public_ section and select 'Add .js file' - you must name it **events.js**.
- If you have an **events.js** file already, make a backup.
- Copy the contents of **events.js** found in this repo into your **events.js** file. This will allow you to print the order when it is approved.
- Click **‘Publish’** in the top right corner.

You should now be able to create an order (manually in the dashboard, or through the website) and the ticket will print.

## Questions & Issues

For any questions or issues, leave a message on GitHub.
