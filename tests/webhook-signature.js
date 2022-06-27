import { Webhook } from "../index";
import { expect } from "chai";
import SampleWebhookRequest from "./data/sample-webhook-requests";

describe("WebhookSignature", function () {
  const { verify } = Webhook;

  context("Test Webhook.verify() - Positive cases", () => {
    it("WEBHOOK_REQUEST_1", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const { timestamp, event } = verify(
        webhookRequest.rawBody,
        webhookRequest.signature,
        webhookRequest.secret
      );
      expect(timestamp.getTime()).to.equal(webhookRequest.timestamp.getTime());
      expect(event).to.deep.equal(webhookRequest.body);
    });
    it("WEBHOOK_REQUEST_2", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const { timestamp, event } = verify(
        webhookRequest.rawBody,
        webhookRequest.signature,
        webhookRequest.secret
      );
      expect(timestamp.getTime()).to.equal(webhookRequest.timestamp.getTime());
      expect(event).to.deep.equal(webhookRequest.body);
    });
    it("WEBHOOK_REQUEST_3", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const { timestamp, event } = verify(
        webhookRequest.rawBody,
        webhookRequest.signature,
        webhookRequest.secret
      );
      expect(timestamp.getTime()).to.equal(webhookRequest.timestamp.getTime());
      expect(event).to.deep.equal(webhookRequest.body);
    });
  });

  context("Test WebhookSignature.verify() - Negative cases", () => {
    it("Invalid signature - incorrect request body", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const incorrectBody = { hello: "world" };
      const incorrectRawBody = JSON.stringify(incorrectBody);
      try {
        verify(
          incorrectRawBody,
          webhookRequest.signature,
          webhookRequest.secret
        );
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Invalid signature");
      }
    });
    it("Invalid signature - incorrect timestamp", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const incorrectSignature = webhookRequest.signature.replace(
        `t:${webhookRequest.timestamp.getTime()}`,
        `t:${webhookRequest.timestamp.getTime() + 1}`
      ); // Correct timestamp replaced with incorrect timestamp
      try {
        verify(
          webhookRequest.rawBody,
          incorrectSignature,
          webhookRequest.secret
        );
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Invalid signature");
      }
    });
    it("Invalid signature - different secret", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      try {
        verify(
          webhookRequest.rawBody,
          webhookRequest.signature,
          "A different secret"
        );
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Invalid signature");
      }
    });
  });
});
