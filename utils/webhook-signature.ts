import { createHmac } from "crypto";
import { isNaN, isString } from "lodash";
import { WebhookEvent } from "../libs/interfaces";

const HASH_ALGORITHM = "sha256";

class WebhookSignatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookSignatureError";
  }
}

/**
 * @description Enum for Webhook signature item names
 */
 enum SignatureItems {
  Timestamp = "t",
  HmacV1 = "v1",
}

/**
 * @param timstamp - Webhook request timestamp
 * @param payload - Webhook payload as UTF8 encoded string
 * @param secret - Webhook secret as UTF8 encoded string
 * @returns Hmac with webhook secret as key and `${timestamp}.${payload}` as hash payload.
 */
const computeHmac = (timstamp: Date, payload: string, secret: string) => {
  const hashPayload = `${timstamp.getTime()}.${payload}`;
  return createHmac(HASH_ALGORITHM, secret).update(hashPayload).digest("hex");
};

/**
 * @description Extract items from webhook signature string
 */
const deserializeSignature = (signature: string) => {
  const items = signature.split(",");
  const itemMap = items.map((item) => item.split("="));
  const timestampString = itemMap.find(
    ([key]) => key === SignatureItems.Timestamp
  )?.[1];

  // parse timestamp
  if (timestampString === undefined) {
    throw new WebhookSignatureError("Invalid signature - timestamp missing");
  }
  const timestampMillis = parseInt(timestampString, 10);
  if (isNaN(timestampMillis) || timestampMillis < 0) {
    throw new WebhookSignatureError("Invalid signature - timestamp invalid");
  }
  const timestamp = new Date(timestampMillis);

  // parse hmac
  const hmacV1 = itemMap.find(([key]) => key === SignatureItems.HmacV1)?.[1];
  if (hmacV1 === undefined) {
    throw new WebhookSignatureError("Invalid signature - hmac missing");
  }

  return { timestamp, hmacV1 };
};

/**
 * @param payload - Webhook request (Raw body)
 * @param signature - Webhook signature as UTF8 encoded strings (Stored in `x-ik-signature` header of the request)
 * @param secret - Webhook secret as UTF8 encoded string [Copy from ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks)
 * @returns Verified timestamp and parsed webhook event
 */
export const verify = (
  payload: string | Uint8Array,
  signature: string,
  secret: string
) => {
  const { timestamp, hmacV1 } = deserializeSignature(signature);
  const payloadAsString: string =
    typeof payload === "string"
      ? payload
      : Buffer.from(payload).toString("utf8");
  const computedHmac = computeHmac(timestamp, payloadAsString, secret);
  if (hmacV1 !== computedHmac) {
    throw new WebhookSignatureError("Incorrect signature");
  }
  return {
    timestamp,
    event: JSON.parse(payloadAsString),
  };
};
