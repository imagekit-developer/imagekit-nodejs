# ImageKit.io Node.js SDK

[![NPM version](<https://img.shields.io/npm/v/@imagekit/nodejs.svg?label=npm%20(stable)>)](https://npmjs.org/package/@imagekit/nodejs) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@imagekit/nodejs)

The ImageKit Node.js SDK is a comprehensive library designed to simplify the integration of ImageKit into your server-side applications. It provides powerful tools for working with the ImageKit REST API, including building and transforming URLs, generating signed URLs for secure content delivery, verifying webhooks, and handling file uploads. With robust TypeScript support, this SDK ensures excellent type safety and a seamless developer experience.

The full API of this library is documented in [api.md](api.md). All request parameters and response types are fully typed and importable, offering unparalleled TypeScript support. This ensures that you can rely on accurate type definitions and enjoy a smooth development workflow with modern editors.

For additional details, refer to the [ImageKit REST API documentation](https://imagekit.io/docs/api-reference).

If you are looking to integrate file uploads in browsers, use one of our [frontend SDKs](https://imagekit.io/docs/quick-start-guides#front-end).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Request & Response types](#request--response-types)
- [File uploads](#file-uploads)
- [URL generation](#url-generation)
  - [Basic URL generation](#basic-url-generation)
  - [URL generation with transformations](#url-generation-with-transformations)
  - [URL generation with image overlay](#url-generation-with-image-overlay)
  - [URL generation with text overlay](#url-generation-with-text-overlay)
  - [URL generation with multiple overlays](#url-generation-with-multiple-overlays)
  - [Signed URLs for secure delivery](#signed-urls-for-secure-delivery)
  - [Using Raw parameter for custom transformations](#using-raw-parameter-for-custom-transformations)
- [Authentication parameters for client-side uploads](#authentication-parameters-for-client-side-uploads)
- [Webhook verification](#webhook-verification)
  - [Verifying webhook signatures](#verifying-webhook-signatures)
- [Handling errors](#handling-errors)
  - [Retries](#retries)
  - [Timeouts](#timeouts)
- [Advanced Usage](#advanced-usage)
  - [Accessing raw Response data (e.g., headers)](#accessing-raw-response-data-eg-headers)
  - [Logging](#logging)
  - [Making custom/undocumented requests](#making-customundocumented-requests)
  - [Customizing the fetch client](#customizing-the-fetch-client)
  - [Fetch options](#fetch-options)
- [Semantic versioning](#semantic-versioning)
- [Requirements](#requirements)
- [Contributing](#contributing)

## Installation

```sh
npm install @imagekit/nodejs
```

## Usage

The full API of this library can be found in [api.md](api.md).

<!-- prettier-ignore -->
```js
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
});

const response = await client.files.upload({
  file: fs.createReadStream('path/to/file'),
  fileName: 'file-name.jpg',
});

console.log(response);
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

<!-- prettier-ignore -->
```ts
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
});

const params: ImageKit.FileUploadParams = {
  file: fs.createReadStream('path/to/file'),
  fileName: 'file-name.jpg',
};
const response: ImageKit.FileUploadResponse = await client.files.upload(params);
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## File uploads

Request parameters that correspond to file uploads can be passed in many different forms:

- `File` (or an object with the same structure)
- a `fetch` `Response` (or an object with the same structure)
- an `fs.ReadStream`
- the return value of our `toFile` helper

```ts
import fs from 'fs';
import ImageKit, { toFile } from '@imagekit/nodejs';

const client = new ImageKit();

// If you have access to Node `fs` we recommend using `fs.createReadStream()`:
await client.files.upload({ file: fs.createReadStream('/path/to/file'), fileName: 'fileName' });

// Or if you have the web `File` API you can pass a `File` instance:
await client.files.upload({ file: new File(['my bytes'], 'file'), fileName: 'fileName' });

// You can also pass a `fetch` `Response`:
await client.files.upload({ file: await fetch('https://somesite/file'), fileName: 'fileName' });

// Finally, if none of the above are convenient, you can use our `toFile` helper:
await client.files.upload({ file: await toFile(Buffer.from('my bytes'), 'file'), fileName: 'fileName' });
await client.files.upload({ file: await toFile(new Uint8Array([0, 1, 2]), 'file'), fileName: 'fileName' });
```

## URL generation

The ImageKit SDK provides a powerful `helper.buildSrc()` method for generating optimized image and video URLs with transformations. Here are examples ranging from simple URLs to complex transformations with overlays and signed URLs.

### Basic URL generation

Generate a simple URL without any transformations:

```ts
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
});

// Basic URL without transformations
const url = client.helper.buildSrc({
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
  src: '/path/to/image.jpg',
});
// Result: https://ik.imagekit.io/your_imagekit_id/path/to/image.jpg
```

### URL generation with transformations

Apply common transformations like resizing, cropping, and format conversion:

```ts
// URL with basic transformations
const transformedUrl = client.helper.buildSrc({
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
  src: '/path/to/image.jpg',
  transformation: [
    {
      width: 400,
      height: 300,
      crop: 'maintain_ratio',
      quality: 80,
      format: 'webp',
    },
  ],
});
// Result: https://ik.imagekit.io/your_imagekit_id/path/to/image.jpg?tr=w-400,h-300,c-maintain_ratio,q-80,f-webp
```

### URL generation with image overlay

Add image overlays to your base image:

```ts
// URL with image overlay
const imageOverlayUrl = client.helper.buildSrc({
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
  src: '/path/to/base-image.jpg',
  transformation: [
    {
      width: 500,
      height: 400,
      overlay: {
        type: 'image',
        input: '/path/to/overlay-logo.png',
        position: {
          x: 10,
          y: 10,
        },
        transformation: [
          {
            width: 100,
            height: 50,
          },
        ],
      },
    },
  ],
});
// Result: URL with image overlay positioned at x:10, y:10
```

### URL generation with text overlay

Add customized text overlays:

```ts
// URL with text overlay
const textOverlayUrl = client.helper.buildSrc({
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
  src: '/path/to/base-image.jpg',
  transformation: [
    {
      width: 600,
      height: 400,
      overlay: {
        type: 'text',
        text: 'Sample Text Overlay',
        position: {
          x: 50,
          y: 50,
          focus: 'center',
        },
        transformation: [
          {
            fontSize: 40,
            fontFamily: 'Arial',
            fontColor: 'FFFFFF',
            typography: 'b', // bold
          },
        ],
      },
    },
  ],
});
// Result: URL with bold white Arial text overlay at center position
```

### URL generation with multiple overlays

Combine multiple overlays for complex compositions:

```ts
// URL with multiple overlays (text + image)
const multipleOverlaysUrl = client.helper.buildSrc({
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
  src: '/path/to/base-image.jpg',
  transformation: [
    {
      width: 800,
      height: 600,
      overlay: {
        type: 'text',
        text: 'Header Text',
        position: { x: 20, y: 20 },
        transformation: [{ fontSize: 30, fontColor: '000000' }],
      },
    },
    {
      overlay: {
        type: 'image',
        input: '/watermark.png',
        position: { focus: 'bottom_right' },
        transformation: [{ width: 100, opacity: 70 }],
      },
    },
  ],
});
// Result: URL with text overlay at top-left and semi-transparent watermark at bottom-right
```

### Signed URLs for secure delivery

Generate signed URLs that expire after a specified time for secure content delivery:

```ts
// Generate a signed URL that expires in 1 hour (3600 seconds)
const signedUrl = client.helper.buildSrc({
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
  src: '/private/secure-image.jpg',
  transformation: [
    {
      width: 400,
      height: 300,
      quality: 90,
    },
  ],
  signed: true,
  expiresIn: 3600, // URL expires in 1 hour
});
// Result: URL with signature parameters (?ik-t=timestamp&ik-s=signature)

// Generate a signed URL that doesn't expire
const permanentSignedUrl = client.helper.buildSrc({
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
  src: '/private/secure-image.jpg',
  signed: true,
  // No expiresIn means the URL won't expire
});
// Result: URL with signature parameter (?ik-s=signature)
```

### Using Raw parameter for custom transformations

ImageKit frequently adds new transformation parameters that might not yet be documented in the SDK. You can use the `raw` parameter to access these features or create custom transformation strings:

```ts
// Using raw parameter for custom transformations
const customTransformUrl = client.helper.buildSrc({
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
  src: '/path/to/image.jpg',
  transformation: [
    {
      width: 400,
      height: 300,
      raw: 'something-new',
    },
  ],
});
// Result: https://ik.imagekit.io/your_imagekit_id/path/to/image.jpg?tr=w-400,h-300,something-new
```

## Authentication parameters for client-side uploads

Generate authentication parameters for secure client-side file uploads:

```ts
// Generate authentication parameters for client-side uploads
const authParams = client.helper.getAuthenticationParameters();
console.log(authParams);
// Result: { token: 'uuid-token', expire: timestamp, signature: 'hmac-signature' }

// Generate with custom token and expiry
const customAuthParams = client.helper.getAuthenticationParameters('my-custom-token', 1800);
console.log(customAuthParams);
// Result: { token: 'my-custom-token', expire: 1800, signature: 'hmac-signature' }
```

These authentication parameters can be used in client-side upload forms to securely upload files without exposing your private API key.

## Webhook verification

The ImageKit SDK provides utilities to verify webhook signatures for secure event handling. This ensures that webhook requests are actually coming from ImageKit and haven't been tampered with.

### Verifying webhook signatures

```ts
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
  webhookSecret: process.env['IMAGEKIT_WEBHOOK_SECRET'], // Required for webhook verification
});

try {
  // Verify and unwrap webhook payload
  const event = client.webhooks.unwrap(
    webhookBody, // Raw webhook payload (string)
    {
      headers: webhookHeaders, // Request headers containing signature
    },
  );

  console.log('Webhook signature is valid');
  console.log('Event type:', event.type);
  console.log('Event data:', event.data);
  // Process the webhook event
} catch (error) {
  console.log('Invalid webhook signature or malformed payload');
  // Reject the request
}
```

For detailed information about webhook setup, signature verification, and handling different webhook events, refer to the [ImageKit webhook documentation](https://imagekit.io/docs/webhooks#verify-webhook-signature).

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- prettier-ignore -->
```ts
const response = await client.files
  .upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' })
  .catch(async (err) => {
    if (err instanceof ImageKit.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.headers); // {server: 'nginx', ...}
    } else {
      throw err;
    }
  });
```

Error codes are as follows:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const client = new ImageKit({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.files.upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const client = new ImageKit({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await client.files.upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.
This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.
Unlike `.asResponse()` this method consumes the body, returning once it is parsed.

<!-- prettier-ignore -->
```ts
const client = new ImageKit();

const response = await client.files
  .upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' })
  .asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: response, response: raw } = await client.files
  .upload({ file: fs.createReadStream('path/to/file'), fileName: 'file-name.jpg' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(response.videoCodec);
```

### Logging

> [!IMPORTANT]
> All log messages are intended for debugging only. The format and content of log messages
> may change between releases.

#### Log levels

The log level can be configured in two ways:

1. Via the `IMAGE_KIT_LOG` environment variable
2. Using the `logLevel` client option (overrides the environment variable if set)

```ts
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  logLevel: 'debug', // Show all log messages
});
```

Available log levels, from most to least verbose:

- `'debug'` - Show debug messages, info, warnings, and errors
- `'info'` - Show info messages, warnings, and errors
- `'warn'` - Show warnings and errors (default)
- `'error'` - Show only errors
- `'off'` - Disable all logging

At the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.
Some authentication-related headers are redacted, but sensitive data in request and response bodies
may still be visible.

#### Custom logger

By default, this library logs to `globalThis.console`. You can also provide a custom logger.
Most logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.

When providing a custom logger, the `logLevel` option still controls which messages are emitted, messages
below the configured level will not be sent to your logger.

```ts
import ImageKit from '@imagekit/nodejs';
import pino from 'pino';

const logger = pino();

const client = new ImageKit({
  logger: logger.child({ name: 'ImageKit' }),
  logLevel: 'debug', // Send all messages to pino, allowing it to filter
});
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```ts
await client.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

#### Undocumented request params

To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
send will be sent as-is.

```ts
client.files.upload({
  // ...
  // @ts-expect-error baz is not yet public
  baz: 'undocumented option',
});
```

For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
extra param in the body.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request params, we do not
validate or strip extra properties from the response from the API.

### Customizing the fetch client

By default, this library expects a global `fetch` function is defined.

If you want to use a different `fetch` function, you can either polyfill the global:

```ts
import fetch from 'my-fetch';

globalThis.fetch = fetch;
```

Or pass it to the client:

```ts
import ImageKit from '@imagekit/nodejs';
import fetch from 'my-fetch';

const client = new ImageKit({ fetch });
```

### Fetch options

If you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)

```ts
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  fetchOptions: {
    // `RequestInit` options
  },
});
```

#### Configuring proxies

To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy
options to requests:

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg" align="top" width="18" height="21"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>

```ts
import ImageKit from '@imagekit/nodejs';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const client = new ImageKit({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg" align="top" width="18" height="21"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>

```ts
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg" align="top" width="18" height="21"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>

```ts
import ImageKit from 'npm:@imagekit/nodejs';

const httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });
const client = new ImageKit({
  fetchOptions: {
    client: httpClient,
  },
});
```

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/imagekit-developer/imagekit-nodejs/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).
