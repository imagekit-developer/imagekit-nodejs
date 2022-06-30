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
    it("Invalid signature - timestamp missing", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const invalidSignature =
        "hmac=b6bc2aa82491c32f1cbef0eb52b7ffffff467ea65a03b5d4ccdcfb9e0941c946";
      try {
        verify(webhookRequest.rawBody, invalidSignature, webhookRequest.secret);
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Invalid signature - timestamp missing");
      }
    });
    it("Invalid signature - timestamp invalid", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const invalidSignature =
        "t=notANumber,v1=b6bc2aa82491c32f1cbef0eb52b7ffffff467ea65a03b5d4ccdcfb9e0941c946";
      try {
        verify(webhookRequest.rawBody, invalidSignature, webhookRequest.secret);
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Invalid signature - timestamp invalid");
      }
    });
    it("Invalid signature - hmac missing", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const invalidSignature = "t=1656326161409";
      try {
        verify(webhookRequest.rawBody, invalidSignature, webhookRequest.secret);
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Invalid signature - hmac missing");
      }
    });
    it("Incorrect signature - incorrect request body", () => {
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
        expect(e.message).to.equal("Incorrect signature");
      }
    });
    it("Incorrect signature - incorrect timestamp", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      const incorrectSignature = webhookRequest.signature.replace(
        `t=${webhookRequest.timestamp.getTime()}`,
        `t=${webhookRequest.timestamp.getTime() + 1}`
      ); // Correct timestamp replaced with incorrect timestamp
      try {
        verify(
          webhookRequest.rawBody,
          incorrectSignature,
          webhookRequest.secret
        );
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Incorrect signature");
      }
    });
    it("Incorrect signature - different secret", () => {
      const webhookRequest = SampleWebhookRequest.WEBHOOK_REQUEST_1;
      try {
        verify(
          webhookRequest.rawBody,
          webhookRequest.signature,
          "A different secret"
        );
        expect.fail("Expected exception");
      } catch (e) {
        expect(e.message).to.equal("Incorrect signature");
      }
    });
  });
});
