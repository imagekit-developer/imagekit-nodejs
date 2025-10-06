// Transformation utilities ported from JavaScript SDK
// This file is in src/lib/ to avoid conflicts with generated code

import type { SrcOptions, TransformationPosition } from '../resources/shared';
import { toBase64 } from '../internal/utils/base64';

const QUERY_TRANSFORMATION_POSITION: TransformationPosition = 'query';
const PATH_TRANSFORMATION_POSITION: TransformationPosition = 'path';
const CHAIN_TRANSFORM_DELIMITER: string = ':';
const TRANSFORM_DELIMITER: string = ',';
const TRANSFORM_KEY_VALUE_DELIMITER: string = '-';

/**
 * Supported transformations mapping
 * {@link https://imagekit.io/docs/transformations}
 */
export const supportedTransforms: { [key: string]: string } = {
  // Basic sizing & layout
  width: 'w',
  height: 'h',
  aspectRatio: 'ar',
  background: 'bg',
  border: 'b',
  crop: 'c',
  cropMode: 'cm',
  dpr: 'dpr',
  focus: 'fo',
  quality: 'q',
  x: 'x',
  xCenter: 'xc',
  y: 'y',
  yCenter: 'yc',
  format: 'f',
  videoCodec: 'vc',
  audioCodec: 'ac',
  radius: 'r',
  rotation: 'rt',
  blur: 'bl',
  named: 'n',
  defaultImage: 'di',
  flip: 'fl',
  original: 'orig',
  startOffset: 'so',
  endOffset: 'eo',
  duration: 'du',
  streamingResolutions: 'sr',

  // AI & advanced effects
  grayscale: 'e-grayscale',
  aiUpscale: 'e-upscale',
  aiRetouch: 'e-retouch',
  aiVariation: 'e-genvar',
  aiDropShadow: 'e-dropshadow',
  aiChangeBackground: 'e-changebg',
  aiRemoveBackground: 'e-bgremove',
  aiRemoveBackgroundExternal: 'e-removedotbg',
  aiEdit: 'e-edit',
  contrastStretch: 'e-contrast',
  shadow: 'e-shadow',
  sharpen: 'e-sharpen',
  unsharpMask: 'e-usm',
  gradient: 'e-gradient',

  // Other flags & finishing
  progressive: 'pr',
  lossless: 'lo',
  colorProfile: 'cp',
  metadata: 'md',
  opacity: 'o',
  trim: 't',
  zoom: 'z',
  page: 'pg',

  // Text overlay transformations
  fontSize: 'fs',
  fontFamily: 'ff',
  fontColor: 'co',
  innerAlignment: 'ia',
  padding: 'pa',
  alpha: 'al',
  typography: 'tg',
  lineHeight: 'lh',

  // Subtitles transformations
  fontOutline: 'fol',
  fontShadow: 'fsh',
  color: 'co',

  // Raw pass-through
  raw: 'raw',
};

export default {
  addAsQueryParameter: (options: SrcOptions): boolean => {
    return options.transformationPosition === QUERY_TRANSFORMATION_POSITION;
  },
  getTransformKey: function (transform: string): string {
    if (!transform) {
      return '';
    }

    return supportedTransforms[transform] || supportedTransforms[transform.toLowerCase()] || '';
  },
  getChainTransformDelimiter: function (): string {
    return CHAIN_TRANSFORM_DELIMITER;
  },
  getTransformDelimiter: function (): string {
    return TRANSFORM_DELIMITER;
  },
  getTransformKeyValueDelimiter: function (): string {
    return TRANSFORM_KEY_VALUE_DELIMITER;
  },
};

export const safeBtoa = function (str: string): string {
  // Use the SDK's built-in base64 utility that properly handles different runtimes
  return toBase64(str);
};
