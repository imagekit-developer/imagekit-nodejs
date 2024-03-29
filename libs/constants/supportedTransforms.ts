/**
 * @see {@link https://docs.imagekit.io/features/image-transformations}
 */
const supportedTransforms = {
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
   * @link https://docs.imagekit.io/features/image-transformations/image-enhancement-and-color-manipulation#shadow-e-shadow
   */
  effectShadow: "e-shadow",

  /**
   * @link https://docs.imagekit.io/features/image-transformations/image-enhancement-and-color-manipulation#gradient-e-gradient
   */
  effectGradient: "e-gradient",

  /**
   * @see {@link https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#original-image-orig}
   */
  original: "orig",
};

export default supportedTransforms as { [key: string]: string };
export type SupportedTransformsParam = keyof typeof supportedTransforms;
