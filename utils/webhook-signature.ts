import { createHash } from "crypto";
import { WebhookEvent } from "../libs/interfaces";

const HASH_ALGORITHM = "sha1";

export class WebhookSignatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookSignatureError";
  }
}

/**
 * Generate SHA1 hash for given payload, timestamp and secret.
 * @param payload - Webhook payload (Raw request body)
 * @param timestamp - Webhook request timestamp (Generate while sending request)
 * @param secret - Webhook secret
 * @returns SHA1 hash encoded as base64 string
 */
export function makePayloadTimestampSha1Hash(
  payload: Uint8Array,
  timestamp: Date,
  secret: Uint8Array
): string {
  const timestampBigint = BigInt(timestamp.getTime());
  const timestampAsBytes = Buffer.alloc(8);
  timestampAsBytes.writeBigUInt64LE(timestampBigint);
  // Create hashPayload in sequence of: payload, timestamp, secret
  const hashPayload = Buffer.concat([payload, timestampAsBytes, secret]);
  return createHash(HASH_ALGORITHM).update(hashPayload).digest("base64");
}

enum WebhookSignatureItem {
  Timestamp = "t",
  PayloadTimestampSha1Hash = "p_t_sha1",
}

export function serializeSignature({
  timestamp,
  payloadTimestampSha1Hash,
}: {
  timestamp: Date;
  payloadTimestampSha1Hash: string;
}): string {
  const items: [string, string][] = [
    [WebhookSignatureItem.Timestamp, timestamp.getTime().toString()], // timestamp in miliseconds since epoch
    [WebhookSignatureItem.PayloadTimestampSha1Hash, payloadTimestampSha1Hash], // sha1(payload + timestamp + secret)
  ];
  return items.map(([key, value]) => `${key}:${value}`).join(",");
}

export function deserializeSignature(signature: string): {
  timestamp: Date;
  payloadTimestampSha1Hash: string;
} {
  const items = signature.split(",");
  const itemMap: Map<string, string> = new Map(
    items.map((item) => item.split(":")).map(([key, value]) => [key, value])
  );

  return {
    timestamp: new Date(Number(itemMap.get(WebhookSignatureItem.Timestamp)!)),
    payloadTimestampSha1Hash: itemMap.get(
      WebhookSignatureItem.PayloadTimestampSha1Hash
    )!,
  };
}

/**
 * Example
 * ```
 * const secret = '<secret>';
 * const webhookSignature = WebhookSignature.create(secret);
 *
 * // Create a signature for a payload
 * const payload = Buffer.from('{"hello": "world"}');
 * const signature = webhookSignature.sign(payload);
 *
 * // Verify the signature for a payload
 * const isValid = webhookSignature.verify(payload, signature);
 * ```
 */
export class WebhookSignature {
  private secret: Uint8Array;
  private expiryDurationMs: number;
  private eventIdSet: Set<string> | null;

  protected constructor(
    secret: Uint8Array,
    expiryDurationMs: number,
    checkDuplicateEventIds: boolean
  ) {
    this.secret = secret;
    this.expiryDurationMs = expiryDurationMs;
    this.eventIdSet = checkDuplicateEventIds ? new Set() : null;
  }
  /**
   * @param secret - Webhook secret
   * @param options.expiryDurationMs - Duration in miliseconds after which signature is expired (default: 1min) 
   * @param options.checkDuplicateEventIds - Check if event id is unique (default: true)
   */
  public static create(
    secret: Uint8Array | string,
    options: {
      expiryDurationMs?: number;
      checkDuplicateEventIds?: boolean;
    } = {}
  ) {
    const expiryDurationMs = options.expiryDurationMs ?? 1000 * 60;
    const checkDuplicateEventIds = options.checkDuplicateEventIds ?? false;
    return new WebhookSignature(
      Buffer.from(secret),
      expiryDurationMs,
      checkDuplicateEventIds
    );
  }
  /**
   * @param payload - Webhook payload (Raw request body)
   * @param timestamp - Webhook request timestamp (Generate while sending request)
   * @returns Webhook signature
   */
  public sign(
    payload: Uint8Array | string,
    options: { timestamp?: Date } = {}
  ): string {
    const timestamp = options.timestamp ?? new Date();
    const payloadTimestampSha1Hash = makePayloadTimestampSha1Hash(
      Buffer.from(payload),
      timestamp,
      this.secret
    );
    return serializeSignature({ timestamp, payloadTimestampSha1Hash });
  }
  /**
   * @param payload - Webhook payload (Raw request body)
   * @param signature - Webhook signature
   * @returns webhook event (parsed webhook request body)
   * @throws WebhookSignatureError if signature is invalid or expired
   */
  public verify(payload: Uint8Array | string, signature: string): WebhookEvent {
    const { timestamp, payloadTimestampSha1Hash } =
      deserializeSignature(signature);
    // Check if signature is expired
    const expiresAt = new Date(timestamp.getTime() + this.expiryDurationMs);
    const isExpired = Date.now() > expiresAt.getTime();
    if (isExpired) {
      throw new WebhookSignatureError("Signature expired");
    }
    // Check if signature is valid
    const calculatedPayloadTimestampSha1Hash = makePayloadTimestampSha1Hash(
      Buffer.from(payload),
      timestamp,
      this.secret
    );
    if (payloadTimestampSha1Hash !== calculatedPayloadTimestampSha1Hash) {
      throw new WebhookSignatureError("Signature is invalid");
    }
    // Parse event
    const parsedEvent = JSON.parse(payload.toString()) as WebhookEvent;
    // Check if the event id is unique
    if (this.eventIdSet !== null) {
      const eventIdSet = this.eventIdSet; // refrence copied for type safety
      if (eventIdSet.has(parsedEvent.id)) {
        throw new WebhookSignatureError("Duplicate event id");
      }
      eventIdSet.add(parsedEvent.id);
      const expiresIn = expiresAt.getTime() - Date.now();
      if (expiresIn > 0) {
        setTimeout(() => {
          eventIdSet.delete(parsedEvent.id);
        }, this.expiryDurationMs); // remove event id when signature expires
      }
    }
    return parsedEvent;
  }
}

export default WebhookSignature;
