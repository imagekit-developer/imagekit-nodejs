import { createHmac } from "crypto";
import { isNaN } from "lodash";
import type { WebhookEvent } from "../libs/interfaces";

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
  V1 = "v1",
}

const HASH_ALGORITHM = "sha256";

/**
 * @param timstamp - Webhook request timestamp
 * @param payload - Webhook payload as UTF8 encoded string
 * @param secret - Webhook secret as UTF8 encoded string
 * @returns Hmac with webhook secret as key and `${timestamp}.${payload}` as hash payload.
 */
const computeHmac = (
  timstamp: Date,
  payload: string,
  secret: string
): string => {
  const hashPayload = `${timstamp.getTime()}.${payload}`;
  return createHmac(HASH_ALGORITHM, secret).update(hashPayload).digest("hex");
};

/**
 * @description Extract items from webhook signature string
 */
const deserializeSignature = (
  signature: string
): {
  timestamp: number;
  v1: string;
} => {
  const items = signature.split(",");
  const itemMap = items.map((item) => item.split("=")); // eg. [["t", 1656921250765], ["v1", 'afafafafafaf']]
  const timestampString = itemMap.find(
    ([key]) => key === SignatureItems.Timestamp
  )?.[1]; // eg. 1656921250765

  // parse timestamp
  if (timestampString === undefined) {
    throw new WebhookSignatureError("Timestamp missing");
  }
  const timestamp = parseInt(timestampString, 10);
  if (isNaN(timestamp) || timestamp < 0) {
    throw new WebhookSignatureError("Timestamp invalid");
  }

  // parse v1 signature
  const v1 = itemMap.find(([key]) => key === SignatureItems.V1)?.[1]; // eg. 'afafafafafaf'
  if (v1 === undefined) {
    throw new WebhookSignatureError("Signature missing");
  }

  return { timestamp, v1 };
};

/**
 * @param payload - Webhook request (Raw body)
 * @param signature - Webhook signature as UTF8 encoded strings (Stored in `x-ik-signature` header of the request)
 * @param secret - Webhook secret as UTF8 encoded string [Copy from ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks)
 * @returns \{ `timstamp`: Verified UNIX epoch timestamp if signature, `event`: Parsed webhook event payload \}
 */
export const verify = (
  payload: string | Uint8Array,
  signature: string,
  secret: string
): {
  timestamp: number;
  event: WebhookEvent;
} => {
  const { timestamp, v1 } = deserializeSignature(signature);
  const payloadAsString: string =
    typeof payload === "string"
      ? payload
      : Buffer.from(payload).toString("utf8");
  const computedHmac = computeHmac(
    new Date(timestamp),
    payloadAsString,
    secret
  );
  if (v1 !== computedHmac) {
    throw new WebhookSignatureError("Incorrect signature");
  }
  return {
    timestamp,
    event: JSON.parse(payloadAsString) as WebhookEvent,
  };
};
