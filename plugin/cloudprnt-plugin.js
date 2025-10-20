const { getStarDeviceId, getStarDeviceGroup, getStarApiKey } = require("./star-secrets");

const starUrl = (deviceGroup, deviceId) => `https://api.starprinter.online/v1/a/${deviceGroup}/d/${deviceId}/q`;

function getStarRequestSettings(apiKey, jobName, starMarkup) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "text/vnd.star.markup",
      "Star-Api-Key": apiKey,
      "Star-Job-Name": jobName,
    },
    body: starMarkup,
  };
}

/**
 * https://docs.starprinter.online/webapi/api_v1/api_printqueue_print.html
 * @param {string} starMarkup - print job data in Star Document Markup format
 * @param {string} jobName - track print jobs by SPO
 * @returns {Promise<any|Error>} - resolves to HTTP response or an error.
 */
async function sendToSPO(starMarkup, jobName) {
  const apiKey = await getStarApiKey();
  const deviceId = await getStarDeviceId();
  const deviceGroup = await getStarDeviceGroup();
  const url = starUrl(deviceGroup, deviceId);
  const settings = getStarRequestSettings(apiKey, jobName, starMarkup);

  try {
    const fetchResponse = await fetch(url, settings);
    const data = await fetchResponse.json();
    return data;
  } catch (err) {
    return { error: true, message: `Could not make request: ${err.message}` };
  }
}

module.exports = { sendToSPO };
