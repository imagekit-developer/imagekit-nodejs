import ImageKit from "../index";
import { expect } from "chai";
import SampleWebhookRequest from "./data/sample-webhook-requests";

describe("WebhookSignature", function () {
  const { WebhookSignature } = ImageKit;

  context("Test WebhookSignature.sign()", () => {
    it("WEBHOOK_REQUEST_1", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const webhookSignature = WebhookSignature.create(webhookRequest.secret, {
        checkDuplicateEventIds: false,
      });
      const signature = webhookSignature.sign(webhookRequest.rawBody, {
        timestamp: webhookRequest.timestamp,
      });
      expect(signature).to.equal(webhookRequest.signature);
    });
    it("WEBHOOK_REQUEST_2", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_2;
      const webhookSignature = WebhookSignature.create(webhookRequest.secret, {
        checkDuplicateEventIds: false,
      });
      const signature = webhookSignature.sign(webhookRequest.rawBody, {
        timestamp: webhookRequest.timestamp,
      });
      expect(signature).to.equal(webhookRequest.signature);
    });
    it("WEBHOOK_REQUEST_3", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_3;
      const webhookSignature = WebhookSignature.create(webhookRequest.secret, {
        checkDuplicateEventIds: false,
      });
      const signature = webhookSignature.sign(webhookRequest.rawBody, {
        timestamp: webhookRequest.timestamp,
      });
      expect(signature).to.equal(webhookRequest.signature);
    });
  });

  context("Test WebhookSignature.verify() - Positive cases", () => {
    it("WEBHOOK_REQUEST_1", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const webhookSignature = WebhookSignature.create(webhookRequest.secret, {
        checkDuplicateEventIds: false,
        expiryDurationMs: Infinity,
      });
      const event = webhookSignature.verify(
        webhookRequest.rawBody,
        webhookRequest.signature
      );
      expect(event).to.deep.equal(webhookRequest.body);
    });
    it("WEBHOOK_REQUEST_2", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_2;
      const webhookSignature = WebhookSignature.create(webhookRequest.secret, {
        checkDuplicateEventIds: false,
        expiryDurationMs: Infinity,
      });
      const event = webhookSignature.verify(
        webhookRequest.rawBody,
        webhookRequest.signature
      );
      expect(event).to.deep.equal(webhookRequest.body);
    });
    it("WEBHOOK_REQUEST_3", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_3;
      const webhookSignature = WebhookSignature.create(webhookRequest.secret, {
        checkDuplicateEventIds: false,
        expiryDurationMs: Infinity,
      });
      const event = webhookSignature.verify(
        webhookRequest.rawBody,
        webhookRequest.signature
      );
      expect(event).to.deep.equal(webhookRequest.body);
    });
  });

  context("Test WebhookSignature.verify() - Negative cases", () => {
    it("Signature expired", () => {
      const expiryDurationMs = 50;
      const signatureTimestamp = Date.now() - expiryDurationMs - 1;
      const signature = `t:${signatureTimestamp},p_t_sha1:nMNyNLjThKkPHjlkXk4vxIQIgaM=`;
      const webhookSignature = WebhookSignature.create("secret", {
        expiryDurationMs,
      });
      try {
        webhookSignature.verify("", signature);
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Signature expired");
      }
    });
    it("Signature is invalid - incorrect payload", () => {
      const webhookRequest1 = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const webhookRequest2 = SampleWebhookRequest.WEBHOOK_REQUEST_2;
      const webhookSignature = WebhookSignature.create(webhookRequest1.secret, {
        checkDuplicateEventIds: false,
        expiryDurationMs: Infinity,
      });
      try {
        webhookSignature.verify(
          webhookRequest2.rawBody, // Incorrect payload
          webhookRequest1.signature
        );
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Signature is invalid");
      }
    });
    it("Signature is invalid - incorrect timestamp", () => {
      const webhookRequest1 = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const webhookSignature = WebhookSignature.create(webhookRequest1.secret, {
        checkDuplicateEventIds: false,
        expiryDurationMs: Infinity,
      });
      const signature = webhookRequest1.signature.replace(
        `t:${webhookRequest1.timestamp.getTime()}`,
        `t:${webhookRequest1.timestamp.getTime() + 1}`
      ); // Correct timestamp replaced with incorrect timestamp
      try {
        webhookSignature.verify(webhookRequest1.rawBody, signature);
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Signature is invalid");
      }
    });
  });

  context("Test WebhookSignature.verify() - Duplicate event ids", () => {
    it("checkDuplicateEventIds: false", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const webhookSignature = WebhookSignature.create(webhookRequest.secret, {
        checkDuplicateEventIds: false,
        expiryDurationMs: 1000, // 1 second
      });
      expect(webhookSignature.eventIdSet).to.be.null;
      // Signature with latest timestamp
      const freshSignature = webhookSignature.sign(webhookRequest.rawBody);
      // 1st event
      const { id: event1Id } = webhookSignature.verify(
        webhookRequest.rawBody,
        freshSignature
      );
      // 2nd event (duplicate event id)
      const { id: event2Id } = webhookSignature.verify(
        webhookRequest.rawBody,
        freshSignature
      );
      expect(event1Id).to.equal(event2Id);
    });
    it("checkDuplicateEventIds: true", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const webhookSignature = WebhookSignature.create(webhookRequest.secret, {
        checkDuplicateEventIds: true,
        expiryDurationMs: 1000, // 1 second
      });
      expect(webhookSignature.eventIdSet).to.be.instanceOf(Set);
      // Signature with latest timestamp
      const freshSignature = webhookSignature.sign(webhookRequest.rawBody);
      // 1st event
      webhookSignature.verify(webhookRequest.rawBody, freshSignature);
      // 2nd event (duplicate event id)
      try {
        webhookSignature.verify(webhookRequest.rawBody, freshSignature);
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Duplicate event id");
      }
    });
  });
});
