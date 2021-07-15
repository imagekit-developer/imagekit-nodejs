/**
 * @see {@link https://docs.imagekit.io/features/image-transformations}
 */
const supportedTransforms: { [key: string]: string } = {
  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#width-w}
   */
  width: "w",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#height-h}
   */
  height: "h",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#aspect-ratio-ar}
   */
  aspectRatio: "ar",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#quality-q}
   */
  quality: "q",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#crop-crop-modes-and-focus}
   */
  crop: "c",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#crop-crop-modes-and-focus}
   */
  cropMode: "cm",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#focus-fo}
   */
  focus: "fo",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#examples-focus-using-cropped-image-coordinates}
   */
  x: "x",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#examples-focus-using-cropped-image-coordinates}
   */
  y: "y",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#format-f}
   */
  format: "f",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#radius-r}
   */
  radius: "r",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#background-color-bg}
   */
  background: "bg",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#border-b}
   */
  border: "b",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#rotate-rt}
   */
  rotation: "rt",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#rotate-rt}
   */
  rotate: "rt",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#blur-bl}
   */
  blur: "bl",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#named-transformation-n}
   */
  named: "n",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-image-oi}
   */
  overlayImage: "oi",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-image-aspect-ratio-oiar}
   */
  overlayImageAspectRatio: "oiar",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-image-background-oibg}
   */
  overlayImageBackground: "oibg",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-image-border-oib}
   */
  overlayImageBorder: "oib",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-image-dpr-oidpr}
   */
  overlayImageDPR: "oidpr",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-image-quality-oiq}
   */
  overlayImageQuality: "oiq",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-image-cropping}
   */
  overlayImageCropping: "oic",
  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#oifo}
   */
  overlayImageFocus: "oifo",
  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#trimming-of-the-overlay-image}
   */
  overlayImageTrim: "oit",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-x-position-ox}
   */
  overlayX: "ox",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-y-position-oy}
   */
  overlayY: "oy",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-focus-ofo}
   */
  overlayFocus: "ofo",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-height-oh}
   */
  overlayHeight: "oh",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-width-ow}
   */
  overlayWidth: "ow",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-ot}
   */
  overlayText: "ot",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-size-ots}
   */
  overlayTextFontSize: "ots",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-font-otf}
   */
  overlayTextFontFamily: "otf",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-color-otc}
   */
  overlayTextColor: "otc",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-transparency-oa}
   */
  overlayTextTransparency: "oa",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-transparency-oa}
   */
  overlayAlpha: "oa",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-typography-ott}
   */
  overlayTextTypography: "ott",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-background-obg}
   */
  overlayBackground: "obg",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-encoded-ote}
   */
  overlayTextEncoded: "ote",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-width-otw}
   */
  overlayTextWidth: "otw",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-background-otbg}
   */
  overlayTextBackground: "otbg",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-padding-otp}
   */
  overlayTextPadding: "otp",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-text-inner-alignment-otia}
   */
  overlayTextInnerAlignment: "otia",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/overlay#overlay-radius-or}
   */
  overlayRadius: "or",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#progressive-image-pr}
   */
  progressive: "pr",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#lossless-webp-and-png-lo}
   */
  lossless: "lo",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#trim-edges-t}
   */
  trim: "t",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#image-metadata-md}
   */
  metadata: "md",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#color-profile-cp}
   */
  colorProfile: "cp",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#default-image-di}
   */
  defaultImage: "di",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#dpr-dpr}
   */
  dpr: "dpr",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/image-enhancement-and-color-manipulation#sharpen-e-sharpen}
   */
  effectSharpen: "e-sharpen",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/image-enhancement-and-color-manipulation#unsharp-mask-e-usm}
   */
  effectUSM: "e-usm",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/image-enhancement-and-color-manipulation#contrast-stretch-e-contrast}
   */
  effectContrast: "e-contrast",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#grayscale-e-grayscale}
   */
  effectGray: "e-grayscale",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#original-image-orig}
   */
  original: "orig",
};

export default supportedTransforms;
