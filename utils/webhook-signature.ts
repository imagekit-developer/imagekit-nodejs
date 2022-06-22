import { createHmac } from "crypto";
import { WebhookEvent } from "../libs/interfaces";

const HASH_ALGORITHM = "sha256";

export class WebhookSignatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookSignatureError";
  }
}

/**
 *
 * @param timstamp - Webhook request timestamp
 * @param payload - Webhook payload as UTF8 encoded string
 * @param secret - Webhook secret as UTF8 encoded string
 * @returns Hmac with webhook secret as key and `${timestamp}.${payload}` as hash payload.
 */
export function computeHmac(timstamp: Date, payload: string, secret: string) {
  const hashPayload = Buffer.from(`${timstamp.getTime()}.${payload}`);
  return createHmac(HASH_ALGORITHM, secret).update(hashPayload).digest("base64");
}

enum WebhookSignatureItem {
  Timestamp = "t",
  Hmac = "hmac",
}

function serializeSignature({
  timestamp,
  hmac,
}: {
  timestamp: Date;
  hmac: string;
}): string {
  const items: [string, string][] = [
    [WebhookSignatureItem.Timestamp, timestamp.getTime().toString()],
    [WebhookSignatureItem.Hmac, hmac],
  ];
  return items.map(([key, value]) => `${key}:${value}`).join(",");
}

function deserializeSignature(signature: string): {
  timestamp: Date;
  hmac: string;
} {
  const items = signature.split(",");
  const itemMap: Map<string, string> = new Map(
    items.map((item) => item.split(":")).map(([key, value]) => [key, value])
  );

  return {
    timestamp: new Date(Number(itemMap.get(WebhookSignatureItem.Timestamp)!)),
    hmac: itemMap.get(WebhookSignatureItem.Hmac)!,
  };
}

/**
 * 
 * @param payload - Webhook request body (Raw body)
 * @param secret - Webhook secret as UTF8 encoded string
 * @param options - `.timestamp` to explicitly set the timestamp
 * @returns 
 */
export function sign(
  payload: string | Uint8Array,
  secret: string,
  options: {
    timestamp?: Date;
  } = {}
) {
  const timestamp = options.timestamp ?? new Date();
  const payloadAsString = Buffer.from(payload).toString(); // Ensure payload as utf8 string
  return serializeSignature({
    timestamp,
    hmac: computeHmac(timestamp, payloadAsString, secret),
  });
}

/**
 * @param payload - Webhook request (Raw body)
 * @param signature - Webhook signature as UTF8 encoded strings (Stored in `x-ik-signature` header of the request)
 * @param secret - Webhook secret as UTF8 encoded string [Copy from ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks)
 * @returns Verified timestamp and parsed webhook event
 */
export function verify(
  payload: string | Uint8Array,
  signature: string,
  secret: string
) {
  const { timestamp, hmac } = deserializeSignature(signature);
  const payloadAsString = Buffer.from(payload).toString(); // Ensure payload as utf8 string
  const computedHmac = computeHmac(timestamp, payloadAsString, secret);
  if (hmac !== computedHmac) {
    throw new WebhookSignatureError("Invalid signature");
  }
  return {
    timestamp,
    event: JSON.parse(payloadAsString) as WebhookEvent,
  };
}
