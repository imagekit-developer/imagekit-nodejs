import { Webhook } from "../index";
import { expect } from "chai";
import SampleWebhookRequest from "./data/sample-webhook-requests";

// Sample webhook data
const WEBHOOK_REQUEST_SAMPLE_SECRET = "whsec_xeO2UNkfKMQnfJf7Q/Qx+fYptL1wabXd";
const WEBHOOK_REQUEST_SAMPLE_TIMESTAMP = new Date(1655788406333);
const WEBHOOK_REQUEST_SAMPLE_SIGNATURE_HEADER =
  "t=1655788406333,v1=d30758f47fcb31e1fa0109d3b3e2a6c623e699aaf1461cba6bd462ef58ea4b31";
const WEBHOOK_REQUEST_SAMPLE_RAW_BODY =
  '{"type":"video.transformation.accepted","id":"58e6d24d-6098-4319-be8d-40c3cb0a402d","created_at":"2022-06-20T11:59:58.461Z","request":{"x_request_id":"fa98fa2e-d6cd-45b4-acf5-bc1d2bbb8ba9","url":"http://ik.imagekit.io/demo/sample-video.mp4?tr=f-webm,q-10","user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0"},"data":{"asset":{"url":"http://ik.imagekit.io/demo/sample-video.mp4"},"transformation":{"type":"video-transformation","options":{"video_codec":"vp9","audio_codec":"opus","auto_rotate":true,"quality":10,"format":"webm"}}}}';
const WEBHOOK_REQUEST_SAMPLE = Object.seal({
  secret: WEBHOOK_REQUEST_SAMPLE_SECRET,
  timestamp: WEBHOOK_REQUEST_SAMPLE_TIMESTAMP,
  signatureHeader: WEBHOOK_REQUEST_SAMPLE_SIGNATURE_HEADER,
  rawBody: WEBHOOK_REQUEST_SAMPLE_RAW_BODY,
  body: JSON.parse(WEBHOOK_REQUEST_SAMPLE_RAW_BODY),
});

describe("WebhookSignature", function () {
  const { verify } = Webhook;

  context("Test Webhook.verify() - Positive cases", () => {
    it("Verify with body as string", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const { timestamp, event } = verify(
        webhookRequest.rawBody,
        webhookRequest.signatureHeader,
        webhookRequest.secret
      )
      expect(timestamp).to.equal(webhookRequest.timestamp.getTime())
      expect(event).to.deep.equal(webhookRequest.body)
    })
    it("Verify with body as Buffer", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const { timestamp, event } = verify(
        Buffer.from(webhookRequest.rawBody),
        webhookRequest.signatureHeader,
        webhookRequest.secret
      )
      expect(timestamp).to.equal(webhookRequest.timestamp.getTime())
      expect(event).to.deep.equal(webhookRequest.body)
    })
    it("Verify with body as Uint8Array", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const rawBody = Uint8Array.from(Buffer.from(webhookRequest.rawBody))
      const { timestamp, event } = verify(rawBody, webhookRequest.signatureHeader, webhookRequest.secret)
      expect(timestamp).to.equal(webhookRequest.timestamp.getTime())
      expect(event).to.deep.equal(webhookRequest.body)
    })
  });

  context("Test WebhookSignature.verify() - Negative cases", () => {
    it("Timestamp missing", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const invalidSignature = "v1=b6bc2aa82491c32f1cbef0eb52b7ffffff467ea65a03b5d4ccdcfb9e0941c946"
      try {
        verify(webhookRequest.rawBody, invalidSignature, webhookRequest.secret)
        expect.fail("Expected exception")
      } catch (e) {
        expect(e.message).to.equal("Timestamp missing")
      }
    })
    it("Timestamp invalid", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const invalidSignature = "t=notANumber,v1=b6bc2aa82491c32f1cbef0eb52b7ffffff467ea65a03b5d4ccdcfb9e0941c946"
      try {
        verify(webhookRequest.rawBody, invalidSignature, webhookRequest.secret)
        expect.fail("Expected exception")
      } catch (e) {
        expect(e.message).to.equal("Timestamp invalid")
      }
    })
    it("Signature missing", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const invalidSignature = "t=1656326161409"
      try {
        verify(webhookRequest.rawBody, invalidSignature, webhookRequest.secret)
        expect.fail("Expected exception")
      } catch (e) {
        expect(e.message).to.equal("Signature missing")
      }
    })
    it("Incorrect signature - v1 manipulated", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const invalidSignature = `t=${webhookRequest.timestamp.getTime()},v1=d66b01d8f1e158d1af7646184716037510ac8ce0a1e70b726a1b698f954785b2`
      try {
        verify(webhookRequest.rawBody, invalidSignature, webhookRequest.secret)
        expect.fail("Expected exception")
      } catch (e) {
        expect(e.message).to.equal("Incorrect signature")
      }
    })
    it("Incorrect signature - incorrect request body", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const incorrectBody = { hello: "world" }
      const incorrectRawBody = JSON.stringify(incorrectBody)
      try {
        verify(incorrectRawBody, webhookRequest.signatureHeader, webhookRequest.secret)
        expect.fail("Expected exception")
      } catch (e) {
        expect(e.message).to.equal("Incorrect signature")
      }
    })
    it("Incorrect signature - timestamp manipulated", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      const incorrectSignature = webhookRequest.signatureHeader.replace(
        `t=${webhookRequest.timestamp.getTime()}`,
        `t=${webhookRequest.timestamp.getTime() + 1}`
      ) // Correct timestamp replaced with incorrect timestamp
      try {
        verify(webhookRequest.rawBody, incorrectSignature, webhookRequest.secret)
        expect.fail("Expected exception")
      } catch (e) {
        expect(e.message).to.equal("Incorrect signature")
      }
    })
    it("Incorrect signature - different secret", () => {
      const webhookRequest = WEBHOOK_REQUEST_SAMPLE
      try {
        verify(webhookRequest.rawBody, webhookRequest.signatureHeader, "A different secret")
        expect.fail("Expected exception")
      } catch (e) {
        expect(e.message).to.equal("Incorrect signature")
      }
    })
  });
});
