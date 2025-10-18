# Wix CloudPRNT + SPO Plugin

This plugin can be used to automatically print order tickets from Wix sites using a Star printer.
This is **not** an official package from Star Micronics or Wix.
Both Wix and StarPrinter.Online (SPO) will require paid subscriptions.

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
- On the left navigation bar, click **‘Public & Backend’**.
- If you don't have an **events.js** file, create one by clicking on the + symbol next to *Backend* and select 'Add .js file' - make sure to name it **events.js** 
- Copy the contents of **events.js** found in this repo into your **events.js** file.
- Click **‘Publish’** in the top right corner.

You should now be able to create an order (manually in the dashboard, or through the website) and the ticket will print.

## Support

For support, email olekdonkey@gmail.com
