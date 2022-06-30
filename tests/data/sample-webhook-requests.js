const WEBHOOK_REQUEST_1_SECRET = "9rK6+3jL";
const WEBHOOK_REQUEST_1_TIMESTAMP = new Date(1655788406333);
const WEBHOOK_REQUEST_1_SIGNATURE =
  "t=1655788406333,v1=c960ec1a88aa47c43ea2451670263aed5e27be2cc85ef55e8a69e88bc8afaf02";
const WEBHOOK_REQUEST_1_RAW_BODY =
  '{"type":"video.transformation.accepted","id":"58e6d24d-6098-4319-be8d-40c3cb0a402d","created_at":"2022-06-20T11:59:58.461Z","request":{"x_request_id":"fa98fa2e-d6cd-45b4-acf5-bc1d2bbb8ba9","url":"http://ik.imagekit.io/demo/sample-video.mp4?tr=f-webm,q-10","user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0"},"data":{"asset":{"url":"http://ik.imagekit.io/demo/sample-video.mp4"},"transformation":{"type":"video-transformation","options":{"video_codec":"vp9","audio_codec":"opus","auto_rotate":true,"quality":10,"format":"webm"}}}}';

const WEBHOOK_REQUEST_1 = {
  secret: WEBHOOK_REQUEST_1_SECRET,
  timestamp: WEBHOOK_REQUEST_1_TIMESTAMP,
  signature: WEBHOOK_REQUEST_1_SIGNATURE,
  rawBody: WEBHOOK_REQUEST_1_RAW_BODY,
  body: JSON.parse(WEBHOOK_REQUEST_1_RAW_BODY),
};

module.exports.WEBHOOK_REQUEST_1 = Object.seal(WEBHOOK_REQUEST_1);

const WEBHOOK_REQUEST_2_SECRET = "wSU42WLC";
const WEBHOOK_REQUEST_2_TIMESTAMP = new Date(1655788407000);
const WEBHOOK_REQUEST_2_SIGNATURE =
  "t=1655788407000,v1=d66b01d8f1e158d1af7646184716037510ac8ce0a1e70b726a1b698f954785b2"
const WEBHOOK_REQUEST_2_RAW_BODY =
  '{"type":"video.transformation.ready","id":"a03031b5-ad5f-4985-8cf5-4de67630f6d7","created_at":"2022-06-20T12:00:11.703Z","request":{"x_request_id":"fa98fa2e-d6cd-45b4-acf5-bc1d2bbb8ba9","url":"http://ik.imagekit.io/demo/sample-video.mp4?tr=f-webm,q-10","user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0"},"timings":{"download_duration":2713,"encoding_duration":10175},"data":{"asset":{"url":"http://ik.imagekit.io/demo/sample-video.mp4"},"transformation":{"type":"video-transformation","options":{"video_codec":"vp9","audio_codec":"opus","auto_rotate":true,"quality":10,"format":"webm"},"output":{"url":"http://ik.imagekit.io/demo/sample-video.mp4?tr=f-webm,q-10","video_metadata":{"duration":15.023,"width":1280,"height":720,"bitrate":15.023}}}}}';

const WEBHOOK_REQUEST_2 = {
  secret: WEBHOOK_REQUEST_2_SECRET,
  timestamp: WEBHOOK_REQUEST_2_TIMESTAMP,
  signature: WEBHOOK_REQUEST_2_SIGNATURE,
  rawBody: WEBHOOK_REQUEST_2_RAW_BODY,
  body: JSON.parse(WEBHOOK_REQUEST_2_RAW_BODY),
};

module.exports.WEBHOOK_REQUEST_2 = Object.seal(WEBHOOK_REQUEST_2);

const WEBHOOK_REQUEST_3_SECRET = "bzDIb9L/";
const WEBHOOK_REQUEST_3_TIMESTAMP = new Date(1655795539264);
const WEBHOOK_REQUEST_3_SIGNATURE =
  "t=1655795539264,v1=b6bc2aa82491c32f1cbef0eb52b7ffaa51467ea65a03b5d4ccdcfb9e0941c946"
const WEBHOOK_REQUEST_3_RAW_BODY =
  '{"type":"video.transformation.error","request":{"x_request_id":"f005b939-7ca3-4310-9e1e-009239b3616b","url":"http://ik.imagekit.io/demo/sample-video.mp4?tr=l-image,i-nonexistent.png,l-end","user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0"},"id":"293a65c6-ceb4-4b62-a10b-5f3333860fae","created_at":"2022-06-20T12:14:02.353Z","data":{"asset":{"url":"http://ik.imagekit.io/demo/sample-video.mp4"},"transformation":{"type":"video-transformation","options":{"video_codec":"vp9","audio_codec":"opus","auto_rotate":true,"quality":50,"format":"webm"},"error":{"reason":"download_failed"}}}}';

const WEBHOOK_REQUEST_3 = {
  secret: WEBHOOK_REQUEST_3_SECRET,
  timestamp: WEBHOOK_REQUEST_3_TIMESTAMP,
  signature: WEBHOOK_REQUEST_3_SIGNATURE,
  rawBody: WEBHOOK_REQUEST_3_RAW_BODY,
  body: JSON.parse(WEBHOOK_REQUEST_3_RAW_BODY),
};

module.exports.WEBHOOK_REQUEST_3 = Object.seal(WEBHOOK_REQUEST_3);
