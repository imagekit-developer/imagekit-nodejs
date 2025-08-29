// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface BaseOverlay {
  position?: OverlayPosition;

  timing?: OverlayTiming;

  [k: string]: string | OverlayPosition | OverlayTiming | undefined;
}

export interface ImageOverlay extends BaseOverlay {
  /**
   * Specifies the relative path to the image used as an overlay.
   */
  input: string;

  type: 'image';

  /**
   * The input path can be included in the layer as either `i-{input}` or
   * `ie-{base64_encoded_input}`. By default, the SDK determines the appropriate
   * format automatically. To always use base64 encoding (`ie-{base64}`), set this
   * parameter to `base64`. To always use plain text (`i-{input}`), set it to
   * `plain`.
   */
  encoding?: 'auto' | 'plain' | 'base64';

  /**
   * Array of transformations to be applied to the overlay image. Supported
   * transformations depends on the base/parent asset.
   */
  transformation?: Array<Transformation>;
}

/**
 * Specifies an overlay to be applied on the parent image or video. ImageKit
 * supports overlays including images, text, videos, subtitles, and solid colors.
 */
export type Overlay = TextOverlay | ImageOverlay | VideoOverlay | SubtitleOverlay | SolidColorOverlay;

export interface OverlayPosition {
  /**
   * Specifies the position of the overlay relative to the parent image or video.
   * Maps to `lfo` in the URL.
   */
  focus?:
    | 'center'
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
    | 'top_left'
    | 'top_right'
    | 'bottom_left'
    | 'bottom_right';

  /**
   * Specifies the x-coordinate of the top-left corner of the base asset where the
   * overlay's top-left corner will be positioned. It also accepts arithmetic
   * expressions such as `bw_mul_0.4` or `bw_sub_cw`. Maps to `lx` in the URL.
   */
  x?: number | string;

  /**
   * Specifies the y-coordinate of the top-left corner of the base asset where the
   * overlay's top-left corner will be positioned. It also accepts arithmetic
   * expressions such as `bh_mul_0.4` or `bh_sub_ch`. Maps to `ly` in the URL.
   */
  y?: number | string;

  [k: string]:
    | string
    | 'center'
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
    | 'top_left'
    | 'top_right'
    | 'bottom_left'
    | 'bottom_right'
    | number
    | string
    | undefined;
}

export interface OverlayTiming {
  /**
   * Specifies the duration (in seconds) during which the overlay should appear on
   * the base video. Accepts a positive number up to two decimal places (e.g., `20`
   * or `20.50`) and arithmetic expressions such as `bdu_mul_0.4` or `bdu_sub_idu`.
   * Applies only if the base asset is a video. Maps to `ldu` in the URL.
   */
  duration?: number | string;

  /**
   * Specifies the end time (in seconds) for when the overlay should disappear from
   * the base video. If both end and duration are provided, duration is ignored.
   * Accepts a positive number up to two decimal places (e.g., `20` or `20.50`) and
   * arithmetic expressions such as `bdu_mul_0.4` or `bdu_sub_idu`. Applies only if
   * the base asset is a video. Maps to `leo` in the URL.
   */
  end?: number | string;

  /**
   * Specifies the start time (in seconds) for when the overlay should appear on the
   * base video. Accepts a positive number up to two decimal places (e.g., `20` or
   * `20.50`) and arithmetic expressions such as `bdu_mul_0.4` or `bdu_sub_idu`.
   * Applies only if the base asset is a video. Maps to `lso` in the URL.
   */
  start?: number | string;

  [k: string]: string | number | string | undefined;
}

export interface SolidColorOverlay extends BaseOverlay {
  /**
   * Specifies the color of the block using an RGB hex code (e.g., `FF0000`), an RGBA
   * code (e.g., `FFAABB50`), or a color name (e.g., `red`). If an 8-character value
   * is provided, the last two characters represent the opacity level (from `00` for
   * 0.00 to `99` for 0.99).
   */
  color: string;

  type: 'solidColor';

  /**
   * Control width and height of the solid color overlay. Supported transformations
   * depend on the base/parent asset.
   */
  transformation?: Array<SolidColorOverlayTransformation>;
}

export interface SolidColorOverlayTransformation {
  /**
   * Alpha transparency level
   */
  alpha?: number;

  /**
   * Background color
   */
  background?: string;

  /**
   * Gradient effect for the overlay
   */
  gradient?: true | string;

  /**
   * Height of the solid color overlay
   */
  height?: number | string;

  /**
   * Corner radius of the solid color overlay
   */
  radius?: number | 'max';

  /**
   * Width of the solid color overlay
   */
  width?: number | string;

  [k: string]: string | number | true | string | number | string | number | 'max' | undefined;
}

/**
 * Options for generating ImageKit URLs with transformations
 */
export interface SrcOptions {
  /**
   * Accepts a relative or absolute path of the resource. If a relative path is
   * provided, it is appended to the `urlEndpoint`. If an absolute path is provided,
   * `urlEndpoint` is ignored.
   */
  src: string;

  /**
   * Get your urlEndpoint from the
   * [ImageKit dashboard](https://imagekit.io/dashboard/url-endpoints).
   */
  urlEndpoint: string;

  /**
   * These are additional query parameters that you want to add to the final URL.
   * They can be any query parameters and not necessarily related to ImageKit. This
   * is especially useful if you want to add a versioning parameter to your URLs.
   */
  queryParameters?: { [key: string]: string | number };

  /**
   * An array of objects specifying the transformations to be applied in the URL. If
   * more than one transformation is specified, they are applied in the order they
   * are specified as chained transformations.
   */
  transformation?: Array<Transformation>;

  /**
   * By default, the transformation string is added as a query parameter in the URL,
   * e.g., `?tr=w-100,h-100`. If you want to add the transformation string in the
   * path of the URL, set this to `path`.
   */
  transformationPosition?: TransformationPosition;

  [k: string]:
    | string
    | string
    | { [key: string]: string | number }
    | Array<Transformation>
    | TransformationPosition
    | undefined;
}

/**
 * Available streaming resolutions for adaptive bitrate streaming
 */
export type StreamingResolution = '240' | '360' | '480' | '720' | '1080' | '1440' | '2160';

export interface SubtitleOverlay extends BaseOverlay {
  /**
   * Specifies the relative path to the subtitle file used as an overlay.
   */
  input: string;

  type: 'subtitle';

  /**
   * The input path can be included in the layer as either `i-{input}` or
   * `ie-{base64_encoded_input}`. By default, the SDK determines the appropriate
   * format automatically. To always use base64 encoding (`ie-{base64}`), set this
   * parameter to `base64`. To always use plain text (`i-{input}`), set it to
   * `plain`.
   */
  encoding?: 'auto' | 'plain' | 'base64';

  /**
   * Control styling of the subtitle.
   */
  transformation?: Array<SubtitleOverlayTransformation>;
}

export interface SubtitleOverlayTransformation {
  /**
   * Background color for subtitles
   */
  background?: string;

  /**
   * Text color for subtitles
   */
  color?: string;

  /**
   * Font family for subtitles
   */
  fontFamily?: string;

  /**
   * Font outline for subtitles
   */
  fontOutline?: string;

  /**
   * Font shadow for subtitles
   */
  fontShadow?: string;

  /**
   * Font size for subtitles
   */
  fontSize?: number | string;

  /**
   * Typography style for subtitles
   */
  typography?: 'b' | 'i' | 'b_i';

  [k: string]: string | number | string | 'b' | 'i' | 'b_i' | undefined;
}

export interface TextOverlay extends BaseOverlay {
  /**
   * Specifies the text to be displayed in the overlay. The SDK automatically handles
   * special characters and encoding.
   */
  text: string;

  type: 'text';

  /**
   * Text can be included in the layer as either `i-{input}` (plain text) or
   * `ie-{base64_encoded_input}` (base64). By default, the SDK selects the
   * appropriate format based on the input text. To always use base64
   * (`ie-{base64}`), set this parameter to `base64`. To always use plain text
   * (`i-{input}`), set it to `plain`.
   */
  encoding?: 'auto' | 'plain' | 'base64';

  /**
   * Control styling of the text overlay.
   */
  transformation?: Array<TextOverlayTransformation>;
}

export interface TextOverlayTransformation {
  /**
   * Specifies the transparency level of the text overlay. Accepts integers from `1`
   * to `9`.
   */
  alpha?: number;

  /**
   * Specifies the background color of the text overlay. Accepts an RGB hex code, an
   * RGBA code, or a color name.
   */
  background?: string;

  /**
   * Flip the text overlay horizontally, vertically, or both.
   */
  flip?: 'h' | 'v' | 'h_v' | 'v_h';

  /**
   * Specifies the font color of the overlaid text. Accepts an RGB hex code (e.g.,
   * `FF0000`), an RGBA code (e.g., `FFAABB50`), or a color name.
   */
  fontColor?: string;

  /**
   * Specifies the font family of the overlaid text. Choose from the supported fonts
   * list or use a custom font.
   */
  fontFamily?: string;

  /**
   * Specifies the font size of the overlaid text. Accepts a numeric value or an
   * arithmetic expression.
   */
  fontSize?: number | string;

  /**
   * Specifies the inner alignment of the text when width is more than the text
   * length.
   */
  innerAlignment?: 'left' | 'right' | 'center';

  /**
   * Specifies the line height of the text overlay.
   */
  lineHeight?: number | string;

  /**
   * Specifies the padding around the overlaid text. Can be provided as a single
   * positive integer or multiple values separated by underscores (following CSS
   * shorthand order). Arithmetic expressions are also accepted.
   */
  padding?: number | string;

  /**
   * Specifies the corner radius of the text overlay. Set to `max` to achieve a
   * circular or oval shape.
   */
  radius?: number | 'max';

  /**
   * Specifies the rotation angle of the text overlay. Accepts a numeric value for
   * clockwise rotation or a string prefixed with "N" for counter-clockwise rotation.
   */
  rotation?: number | string;

  /**
   * Specifies the typography style of the text. Supported values: `b` for bold, `i`
   * for italics, and `b_i` for bold with italics.
   */
  typography?: 'b' | 'i' | 'b_i';

  /**
   * Specifies the maximum width (in pixels) of the overlaid text. The text wraps
   * automatically, and arithmetic expressions (e.g., `bw_mul_0.2` or `bh_div_2`) are
   * supported. Useful when used in conjunction with the `background`.
   */
  width?: number | string;

  [k: string]:
    | string
    | number
    | 'h'
    | 'v'
    | 'h_v'
    | 'v_h'
    | number
    | string
    | 'left'
    | 'right'
    | 'center'
    | number
    | 'max'
    | 'b'
    | 'i'
    | 'b_i'
    | undefined;
}

/**
 * The SDK provides easy-to-use names for transformations. These names are
 * converted to the corresponding transformation string before being added to the
 * URL. SDKs are updated regularly to support new transformations. If you want to
 * use a transformation that is not supported by the SDK, You can use the `raw`
 * parameter to pass the transformation string directly.
 */
export interface Transformation {
  /**
   * Uses AI to change the background. Provide a text prompt or a base64-encoded
   * prompt, e.g., `prompt-snow road` or `prompte-[urlencoded_base64_encoded_text]`.
   * Not supported inside overlay.
   */
  aiChangeBackground?: string;

  /**
   * Adds an AI-based drop shadow around a foreground object on a transparent or
   * removed background. Optionally, control the direction, elevation, and saturation
   * of the light source (e.g., `az-45` to change light direction). Pass `true` for
   * the default drop shadow, or provide a string for a custom drop shadow. Supported
   * inside overlay.
   */
  aiDropShadow?: true | string;

  /**
   * Applies ImageKit's in-house background removal. Supported inside overlay.
   */
  aiRemoveBackground?: true;

  /**
   * Uses third-party background removal. Note: It is recommended to use
   * aiRemoveBackground, ImageKit's in-house solution, which is more cost-effective.
   * Supported inside overlay.
   */
  aiRemoveBackgroundExternal?: true;

  /**
   * Performs AI-based retouching to improve faces or product shots. Not supported
   * inside overlay.
   */
  aiRetouch?: true;

  /**
   * Upscales images beyond their original dimensions using AI. Not supported inside
   * overlay.
   */
  aiUpscale?: true;

  /**
   * Generates a variation of an image using AI. This produces a new image with
   * slight variations from the original, such as changes in color, texture, and
   * other visual elements, while preserving the structure and essence of the
   * original image. Not supported inside overlay.
   */
  aiVariation?: true;

  /**
   * Specifies the aspect ratio for the output, e.g., "ar-4-3". Typically used with
   * either width or height (but not both). For example: aspectRatio = `4:3`, `4_3`,
   * or an expression like `iar_div_2`.
   */
  aspectRatio?: number | string;

  /**
   * Specifies the audio codec, e.g., `aac`, `opus`, or `none`.
   */
  audioCodec?: 'aac' | 'opus' | 'none';

  /**
   * Specifies the background to be used in conjunction with certain cropping
   * strategies when resizing an image.
   *
   * - A solid color: e.g., `red`, `F3F3F3`, `AAFF0010`.
   * - A blurred background: e.g., `blurred`, `blurred_25_N15`, etc.
   * - Expand the image boundaries using generative fill: `genfill`. Not supported
   *   inside overlay. Optionally, control the background scene by passing a text
   *   prompt: `genfill[:-prompt-${text}]` or
   *   `genfill[:-prompte-${urlencoded_base64_encoded_text}]`.
   */
  background?: string;

  /**
   * Specifies the Gaussian blur level. Accepts an integer value between 1 and 100,
   * or an expression like `bl-10`.
   */
  blur?: number;

  /**
   * Adds a border to the output media. Accepts a string in the format
   * `<border-width>_<hex-code>` (e.g., `5_FFF000` for a 5px yellow border), or an
   * expression like `ih_div_20_FF00FF`.
   */
  border?: string;

  /**
   * Indicates whether the output image should retain the original color profile.
   */
  colorProfile?: boolean;

  /**
   * Automatically enhances the contrast of an image (contrast stretch).
   */
  contrastStretch?: true;

  /**
   * Crop modes for image resizing
   */
  crop?: 'force' | 'at_max' | 'at_max_enlarge' | 'at_least' | 'maintain_ratio';

  /**
   * Additional crop modes for image resizing
   */
  cropMode?: 'pad_resize' | 'extract' | 'pad_extract';

  /**
   * Specifies a fallback image if the resource is not found, e.g., a URL or file
   * path.
   */
  defaultImage?: string;

  /**
   * Accepts values between 0.1 and 5, or `auto` for automatic device pixel ratio
   * (DPR) calculation.
   */
  dpr?: number;

  /**
   * Specifies the duration (in seconds) for trimming videos, e.g., `5` or `10.5`.
   * Typically used with startOffset to indicate the length from the start offset.
   * Arithmetic expressions are supported.
   */
  duration?: number | string;

  /**
   * Specifies the end offset (in seconds) for trimming videos, e.g., `5` or `10.5`.
   * Typically used with startOffset to define a time window. Arithmetic expressions
   * are supported.
   */
  endOffset?: number | string;

  /**
   * Flips or mirrors an image either horizontally, vertically, or both. Acceptable
   * values: `h` (horizontal), `v` (vertical), `h_v` (horizontal and vertical), or
   * `v_h`.
   */
  flip?: 'h' | 'v' | 'h_v' | 'v_h';

  /**
   * This parameter can be used with pad resize, maintain ratio, or extract crop to
   * modify the padding or cropping behavior.
   */
  focus?: string;

  /**
   * Specifies the output format for images or videos, e.g., `jpg`, `png`, `webp`,
   * `mp4`, or `auto`. You can also pass `orig` for images to return the original
   * format. ImageKit automatically delivers images and videos in the optimal format
   * based on device support unless overridden by the dashboard settings or the
   * format parameter.
   */
  format?: 'auto' | 'webp' | 'jpg' | 'jpeg' | 'png' | 'gif' | 'svg' | 'mp4' | 'webm' | 'avif' | 'orig';

  /**
   * Creates a linear gradient with two colors. Pass `true` for a default gradient,
   * or provide a string for a custom gradient.
   */
  gradient?: true | string;

  /**
   * Enables a grayscale effect for images.
   */
  grayscale?: true;

  /**
   * Specifies the height of the output. If a value between 0 and 1 is provided, it
   * is treated as a percentage (e.g., `0.5` represents 50% of the original height).
   * You can also supply arithmetic expressions (e.g., `ih_mul_0.5`).
   */
  height?: number | string;

  /**
   * Specifies whether the output image (in JPEG or PNG) should be compressed
   * losslessly.
   */
  lossless?: boolean;

  /**
   * By default, ImageKit removes all metadata during automatic image compression.
   * Set this to true to preserve metadata.
   */
  metadata?: boolean;

  /**
   * Named transformation reference
   */
  named?: string;

  /**
   * Specifies the opacity level of the output image.
   */
  opacity?: number;

  /**
   * If set to true, serves the original file without applying any transformations.
   */
  original?: boolean;

  /**
   * Specifies an overlay to be applied on the parent image or video. ImageKit
   * supports overlays including images, text, videos, subtitles, and solid colors.
   */
  overlay?: Overlay;

  /**
   * Extracts a specific page or frame from multi-page or layered files (PDF, PSD,
   * AI). For example, specify by number (e.g., `2`), a range (e.g., `3-4` for the
   * 2nd and 3rd layers), or by name (e.g., `name-layer-4` for a PSD layer).
   */
  page?: number | string;

  /**
   * Specifies whether the output JPEG image should be rendered progressively.
   * Progressive loading begins with a low-quality, pixelated version of the full
   * image, which gradually improves to provide a faster perceived load time.
   */
  progressive?: boolean;

  /**
   * Specifies the quality of the output image for lossy formats such as JPEG, WebP,
   * and AVIF. A higher quality value results in a larger file size with better
   * quality, while a lower value produces a smaller file size with reduced quality.
   */
  quality?: number;

  /**
   * Specifies the corner radius for rounded corners (e.g., 20) or `max` for
   * circular/oval shapes.
   */
  radius?: number | 'max';

  /**
   * Pass any transformation not directly supported by the SDK. This transformation
   * string is appended to the URL as provided.
   */
  raw?: string;

  /**
   * Specifies the rotation angle in degrees. Positive values rotate the image
   * clockwise; you can also use, for example, `N40` for counterclockwise rotation or
   * `auto` to use the orientation specified in the image's EXIF data. For videos,
   * only the following values are supported: 0, 90, 180, 270, or 360.
   */
  rotation?: number | string;

  /**
   * Adds a shadow beneath solid objects in an image with a transparent background.
   * For AI-based drop shadows, refer to aiDropShadow. Pass `true` for a default
   * shadow, or provide a string for a custom shadow.
   */
  shadow?: true | string;

  /**
   * Sharpens the input image, highlighting edges and finer details. Pass `true` for
   * default sharpening, or provide a numeric value for custom sharpening.
   */
  sharpen?: true | number;

  /**
   * Specifies the start offset (in seconds) for trimming videos, e.g., `5` or
   * `10.5`. Arithmetic expressions are also supported.
   */
  startOffset?: number | string;

  /**
   * An array of resolutions for adaptive bitrate streaming, e.g., [`240`, `360`,
   * `480`, `720`, `1080`].
   */
  streamingResolutions?: Array<StreamingResolution>;

  /**
   * Useful for images with a solid or nearly solid background and a central object.
   * This parameter trims the background, leaving only the central object in the
   * output image.
   */
  trim?: true | number;

  /**
   * Applies Unsharp Masking (USM), an image sharpening technique. Pass `true` for a
   * default unsharp mask, or provide a string for a custom unsharp mask.
   */
  unsharpMask?: true | string;

  /**
   * Specifies the video codec, e.g., `h264`, `vp9`, `av1`, or `none`.
   */
  videoCodec?: 'h264' | 'vp9' | 'av1' | 'none';

  /**
   * Specifies the width of the output. If a value between 0 and 1 is provided, it is
   * treated as a percentage (e.g., `0.4` represents 40% of the original width). You
   * can also supply arithmetic expressions (e.g., `iw_div_2`).
   */
  width?: number | string;

  /**
   * Focus using cropped image coordinates - X coordinate
   */
  x?: number | string;

  /**
   * Focus using cropped image coordinates - X center coordinate
   */
  xCenter?: number | string;

  /**
   * Focus using cropped image coordinates - Y coordinate
   */
  y?: number | string;

  /**
   * Focus using cropped image coordinates - Y center coordinate
   */
  yCenter?: number | string;

  /**
   * Accepts a numeric value that determines how much to zoom in or out of the
   * cropped area. It should be used in conjunction with fo-face or fo-<object_name>.
   */
  zoom?: number;

  [k: string]:
    | string
    | true
    | string
    | true
    | number
    | string
    | 'aac'
    | 'opus'
    | 'none'
    | number
    | boolean
    | 'force'
    | 'at_max'
    | 'at_max_enlarge'
    | 'at_least'
    | 'maintain_ratio'
    | 'pad_resize'
    | 'extract'
    | 'pad_extract'
    | 'h'
    | 'v'
    | 'h_v'
    | 'v_h'
    | 'auto'
    | 'webp'
    | 'jpg'
    | 'jpeg'
    | 'png'
    | 'gif'
    | 'svg'
    | 'mp4'
    | 'webm'
    | 'avif'
    | 'orig'
    | Overlay
    | number
    | 'max'
    | true
    | number
    | Array<StreamingResolution>
    | 'h264'
    | 'vp9'
    | 'av1'
    | 'none'
    | undefined;
}

/**
 * By default, the transformation string is added as a query parameter in the URL,
 * e.g., `?tr=w-100,h-100`. If you want to add the transformation string in the
 * path of the URL, set this to `path`.
 */
export type TransformationPosition = 'path' | 'query';

export interface VideoOverlay extends BaseOverlay {
  /**
   * Specifies the relative path to the video used as an overlay.
   */
  input: string;

  type: 'video';

  /**
   * The input path can be included in the layer as either `i-{input}` or
   * `ie-{base64_encoded_input}`. By default, the SDK determines the appropriate
   * format automatically. To always use base64 encoding (`ie-{base64}`), set this
   * parameter to `base64`. To always use plain text (`i-{input}`), set it to
   * `plain`.
   */
  encoding?: 'auto' | 'plain' | 'base64';

  /**
   * Array of transformation to be applied to the overlay video. Except
   * `streamingResolutions`, all other video transformations are supported.
   */
  transformation?: Array<Transformation>;
}
