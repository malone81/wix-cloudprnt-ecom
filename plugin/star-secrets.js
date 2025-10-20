const { secrets } = require("wix-secrets-backend.v2");
const { elevate } = require("wix-auth");

const elevatedGetSecretValue = elevate(secrets.getSecretValue);

async function getSecretValue(name) {
  try {
    const secret = await elevatedGetSecretValue(name);
    return secret.value;
  } catch (err) {
    return { error: true, message: `Could not get ${name}: ${err.message}` };
  }
}

async function getStarDeviceId() {
  const value = await getSecretValue("STAR_DEVICE_ID");
  return value;
}

async function getStarApiKey() {
  const value = await getSecretValue("STAR_API_KEY");
  return value;
}

async function getStarDeviceGroup() {
  const value = await getSecretValue("STAR_DEVICE_GROUP");
  return value;
}

module.exports = {
  getStarDeviceId,
  getStarApiKey,
  getStarDeviceGroup,
};
