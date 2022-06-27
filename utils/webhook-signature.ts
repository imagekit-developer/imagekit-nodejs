import { createHmac } from "crypto";
import { isString } from "lodash";
import { WebhookEvent } from "../libs/interfaces";

const HASH_ALGORITHM = "sha256";

export class WebhookSignatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookSignatureError";
  }
}

enum WebhookSignatureItem {
  Timestamp = "t",
  Hmac = "hmac",
}
export class WebhookSignature {
  /**
   * @param timstamp - Webhook request timestamp
   * @param payload - Webhook payload as UTF8 encoded string
   * @param secret - Webhook secret as UTF8 encoded string
   * @returns Hmac with webhook secret as key and `${timestamp}.${payload}` as hash payload.
   */
  protected static computeHmac(
    timstamp: Date,
    payload: string,
    secret: string
  ) {
    const hashPayload = Buffer.from(`${timstamp.getTime()}.${payload}`);
    return createHmac(HASH_ALGORITHM, secret)
      .update(hashPayload)
      .digest("base64");
  }

  /**
   * @description Enum for Webhook signature item names
   */
  protected static SignatureItems = WebhookSignatureItem;

  /**
   * @description Extract items from webhook signature string
   */
  private static deserializeSignature(signature: string): {
    timestamp: Date;
    hmac: string;
  } {
    const items = signature.split(",");
    const itemMap: Map<string, string> = new Map(
      items.map((item) => item.split(":")).map(([key, value]) => [key, value])
    );
    const timestampString = itemMap.get(
      WebhookSignature.SignatureItems.Timestamp
    );
    const hmacString = itemMap.get(WebhookSignature.SignatureItems.Hmac);
    if (!isString(timestampString))
      throw new WebhookSignatureError("Invalid signature - timestamp missing");
    if (!isString(hmacString))
      throw new WebhookSignatureError("Invalid signature - hmac missing");
    return {
      timestamp: new Date(parseInt(timestampString)),
      hmac: hmacString,
    };
  }

  /**
   * @param payload - Webhook request (Raw body)
   * @param signature - Webhook signature as UTF8 encoded strings (Stored in `x-ik-signature` header of the request)
   * @param secret - Webhook secret as UTF8 encoded string [Copy from ImageKit dashboard](https://imagekit.io/dashboard/developer/webhooks)
   * @returns Verified timestamp and parsed webhook event
   */
  public static verify(
    payload: string | Uint8Array,
    signature: string,
    secret: string
  ) {
    const { timestamp, hmac } =
      WebhookSignature.deserializeSignature(signature);
    const payloadAsString = Buffer.from(payload).toString(); // Ensure payload as utf8 string
    const computedHmac = WebhookSignature.computeHmac(
      timestamp,
      payloadAsString,
      secret
    );
    if (hmac !== computedHmac) {
      throw new WebhookSignatureError("Incorrect signature");
    }
    return {
      timestamp,
      event: JSON.parse(payloadAsString) as WebhookEvent,
    };
  }
}

export const verify = WebhookSignature.verify;
