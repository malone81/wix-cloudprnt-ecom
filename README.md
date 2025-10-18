# Wix CloudPRNT + SPO Plugin

This plugin can be used to automatically print order tickets from Wix sites using a Star printer.

## Requirements

- **Star CloudPRNT Printer** - https://star-emea.com/products/cloudprnt/ -> View Models
- **StarPrinter.Online (SPO) account** - contact <support@star-emea.com>
- **Wix Restaurant Orders (New)** - https://support.wix.com/en/article/wix-restaurants-adding-and-setting-up-wix-restaurants-orders-new
- **Active internet connection to the printer**

## Installation

First, setup CloudPRNT connection on the Star printer according to the instructions found in the online manual e.g. TSP100IV.

https://www.star-m.jp/products/s_print/oml/tsp100iv/manual/en/convenientFunctions/settingsCloudPRNT.htm

---

Next, from your SPO dashboard, copy the following information:

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

Finally, install the plugin code:

- On your Wix Dashboard, click on the **'Home'** tab.
- Click **'Edit Site'**.
- Turn **Dev Mode On**.
- On the left navigation bar, click **‘Public & Backend’**.
- Copy the **Plugin** folder in this repository and paste
- Copy the contents of **index.js** found in this repo into your **events.js** file.
- Click **‘Publish’** in the top right corner.

You should now be able to create an order (manually in the dashboard, or through the front-end) and the ticket will print.

## Support

For support, email support@star-emea.com
