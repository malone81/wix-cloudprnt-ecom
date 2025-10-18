import { secrets } from "wix-secrets-backend.v2";
import { elevate } from "wix-auth";

const elevatedGetSecretValue = elevate(secrets.getSecretValue);

async function getSecretValue(name) {
  try {
    const secret = await elevatedGetSecretValue(name);
    return secret.value;
  } catch (err) {
    return { error: true, message: `Could not get ${name}: ${err.message}` };
  }
}

export async function getStarDeviceId() {
  const value = await getSecretValue("STAR_DEVICE_ID");
  return value;
}

export async function getStarApiKey() {
  const value = await getSecretValue("STAR_API_KEY");
  return value;
}

export async function getStarDeviceGroup() {
  const value = await getSecretValue("STAR_DEVICE_GROUP");
  return value;
}
