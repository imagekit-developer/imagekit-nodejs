// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface BaseOverlay {
  /**
   * Controls how the layer blends with the base image or underlying content. Maps to
   * `lm` in the URL. By default, layers completely cover the base image beneath
   * them. Layer modes change this behavior:
   *
   * - `multiply`: Multiplies the pixel values of the layer with the base image. The
   *   result is always darker than the original images. This is ideal for applying
   *   shadows or color tints.
   * - `displace`: Uses the layer as a displacement map to distort pixels in the base
   *   image. The red channel controls horizontal displacement, and the green channel
   *   controls vertical displacement. Requires `x` or `y` parameter to control
   *   displacement magnitude.
   * - `cutout`: Acts as an inverse mask where opaque areas of the layer turn the
   *   base image transparent, while transparent areas leave the base image
   *   unchanged. This mode functions like a hole-punch, effectively cutting the
   *   shape of the layer out of the underlying image.
   * - `cutter`: Acts as a shape mask where only the parts of the base image that
   *   fall inside the opaque area of the layer are preserved. This mode functions
   *   like a cookie-cutter, trimming the base image to match the specific dimensions
   *   and shape of the layer. See
   *   [Layer modes](https://imagekit.io/docs/add-overlays-on-images#layer-modes).
   */
  layerMode?: 'multiply' | 'cutter' | 'cutout' | 'displace';

  /**
   * Specifies the overlay's position relative to the parent asset. See
   * [Position of Layer](https://imagekit.io/docs/transformations#position-of-layer).
   */
  position?: OverlayPosition;

  /**
   * Specifies timing information for the overlay (only applicable if the base asset
   * is a video). See
   * [Position of Layer](https://imagekit.io/docs/transformations#position-of-layer).
   */
  timing?: OverlayTiming;
}

/**
 * Configuration object for an extension (base extensions only, not saved extension
 * references).
 */
export type ExtensionConfig =
  | ExtensionConfig.RemoveBg
  | ExtensionConfig.AutoTaggingExtension
  | ExtensionConfig.AIAutoDescription
  | ExtensionConfig.AITasks;

export namespace ExtensionConfig {
  export interface RemoveBg {
    /**
     * Specifies the background removal extension.
     */
    name: 'remove-bg';

    options?: RemoveBg.Options;
  }

  export namespace RemoveBg {
    export interface Options {
      /**
       * Whether to add an artificial shadow to the result. Default is false. Note:
       * Adding shadows is currently only supported for car photos.
       */
      add_shadow?: boolean;

      /**
       * Specifies a solid color background using hex code (e.g., "81d4fa", "fff") or
       * color name (e.g., "green"). If this parameter is set, `bg_image_url` must be
       * empty.
       */
      bg_color?: string;

      /**
       * Sets a background image from a URL. If this parameter is set, `bg_color` must be
       * empty.
       */
      bg_image_url?: string;

      /**
       * Allows semi-transparent regions in the result. Default is true. Note:
       * Semitransparency is currently only supported for car windows.
       */
      semitransparency?: boolean;
    }
  }

  export interface AutoTaggingExtension {
    /**
     * Maximum number of tags to attach to the asset.
     */
    maxTags: number;

    /**
     * Minimum confidence level for tags to be considered valid.
     */
    minConfidence: number;

    /**
     * Specifies the auto-tagging extension used.
     */
    name: 'google-auto-tagging' | 'aws-auto-tagging';
  }

  export interface AIAutoDescription {
    /**
     * Specifies the auto description extension.
     */
    name: 'ai-auto-description';
  }

  export interface AITasks {
    /**
     * Specifies the AI tasks extension for automated image analysis using AI models.
     */
    name: 'ai-tasks';

    /**
     * Array of task objects defining AI operations to perform on the asset.
     */
    tasks: Array<AITasks.SelectTags | AITasks.SelectMetadata | AITasks.YesNo>;
  }

  export namespace AITasks {
    export interface SelectTags {
      /**
       * The question or instruction for the AI to analyze the image.
       */
      instruction: string;

      /**
       * Task type that analyzes the image and adds matching tags from a vocabulary.
       */
      type: 'select_tags';

      /**
       * Maximum number of tags to select from the vocabulary.
       */
      max_selections?: number;

      /**
       * Minimum number of tags to select from the vocabulary.
       */
      min_selections?: number;

      /**
       * Array of possible tag values. Combined length of all strings must not exceed 500
       * characters. Cannot contain the `%` character.
       */
      vocabulary?: Array<string>;
    }

    export interface SelectMetadata {
      /**
       * Name of the custom metadata field to set. The field must exist in your account.
       */
      field: string;

      /**
       * The question or instruction for the AI to analyze the image.
       */
      instruction: string;

      /**
       * Task type that analyzes the image and sets a custom metadata field value from a
       * vocabulary.
       */
      type: 'select_metadata';

      /**
       * Maximum number of values to select from the vocabulary.
       */
      max_selections?: number;

      /**
       * Minimum number of values to select from the vocabulary.
       */
      min_selections?: number;

      /**
       * Array of possible values matching the custom metadata field type.
       */
      vocabulary?: Array<string | number | boolean>;
    }

    export interface YesNo {
      /**
       * The yes/no question for the AI to answer about the image.
       */
      instruction: string;

      /**
       * Task type that asks a yes/no question and executes actions based on the answer.
       */
      type: 'yes_no';

      /**
       * Actions to execute if the AI answers no.
       */
      on_no?: YesNo.OnNo;

      /**
       * Actions to execute if the AI cannot determine the answer.
       */
      on_unknown?: YesNo.OnUnknown;

      /**
       * Actions to execute if the AI answers yes.
       */
      on_yes?: YesNo.OnYes;
    }

    export namespace YesNo {
      /**
       * Actions to execute if the AI answers no.
       */
      export interface OnNo {
        /**
         * Array of tag strings to add to the asset.
         */
        add_tags?: Array<string>;

        /**
         * Array of tag strings to remove from the asset.
         */
        remove_tags?: Array<string>;

        /**
         * Array of custom metadata field updates.
         */
        set_metadata?: Array<OnNo.SetMetadata>;

        /**
         * Array of custom metadata fields to remove.
         */
        unset_metadata?: Array<OnNo.UnsetMetadata>;
      }

      export namespace OnNo {
        export interface SetMetadata {
          /**
           * Name of the custom metadata field to set.
           */
          field: string;

          /**
           * Value to set for the custom metadata field. The value type should match the
           * custom metadata field type.
           */
          value: string | number | boolean | Array<string | number | boolean>;
        }

        export interface UnsetMetadata {
          /**
           * Name of the custom metadata field to remove.
           */
          field: string;
        }
      }

      /**
       * Actions to execute if the AI cannot determine the answer.
       */
      export interface OnUnknown {
        /**
         * Array of tag strings to add to the asset.
         */
        add_tags?: Array<string>;

        /**
         * Array of tag strings to remove from the asset.
         */
        remove_tags?: Array<string>;

        /**
         * Array of custom metadata field updates.
         */
        set_metadata?: Array<OnUnknown.SetMetadata>;

        /**
         * Array of custom metadata fields to remove.
         */
        unset_metadata?: Array<OnUnknown.UnsetMetadata>;
      }

      export namespace OnUnknown {
        export interface SetMetadata {
          /**
           * Name of the custom metadata field to set.
           */
          field: string;

          /**
           * Value to set for the custom metadata field. The value type should match the
           * custom metadata field type.
           */
          value: string | number | boolean | Array<string | number | boolean>;
        }

        export interface UnsetMetadata {
          /**
           * Name of the custom metadata field to remove.
           */
          field: string;
        }
      }

      /**
       * Actions to execute if the AI answers yes.
       */
      export interface OnYes {
        /**
         * Array of tag strings to add to the asset.
         */
        add_tags?: Array<string>;

        /**
         * Array of tag strings to remove from the asset.
         */
        remove_tags?: Array<string>;

        /**
         * Array of custom metadata field updates.
         */
        set_metadata?: Array<OnYes.SetMetadata>;

        /**
         * Array of custom metadata fields to remove.
         */
        unset_metadata?: Array<OnYes.UnsetMetadata>;
      }

      export namespace OnYes {
        export interface SetMetadata {
          /**
           * Name of the custom metadata field to set.
           */
          field: string;

          /**
           * Value to set for the custom metadata field. The value type should match the
           * custom metadata field type.
           */
          value: string | number | boolean | Array<string | number | boolean>;
        }

        export interface UnsetMetadata {
          /**
           * Name of the custom metadata field to remove.
           */
          field: string;
        }
      }
    }
  }
}

/**
 * Array of extensions to be applied to the asset. Each extension can be configured
 * with specific parameters based on the extension type.
 */
export type Extensions = Array<
  | Extensions.RemoveBg
  | Extensions.AutoTaggingExtension
  | Extensions.AIAutoDescription
  | Extensions.AITasks
  | Extensions.SavedExtension
>;

export namespace Extensions {
  export interface RemoveBg {
    /**
     * Specifies the background removal extension.
     */
    name: 'remove-bg';

    options?: RemoveBg.Options;
  }

  export namespace RemoveBg {
    export interface Options {
      /**
       * Whether to add an artificial shadow to the result. Default is false. Note:
       * Adding shadows is currently only supported for car photos.
       */
      add_shadow?: boolean;

      /**
       * Specifies a solid color background using hex code (e.g., "81d4fa", "fff") or
       * color name (e.g., "green"). If this parameter is set, `bg_image_url` must be
       * empty.
       */
      bg_color?: string;

      /**
       * Sets a background image from a URL. If this parameter is set, `bg_color` must be
       * empty.
       */
      bg_image_url?: string;

      /**
       * Allows semi-transparent regions in the result. Default is true. Note:
       * Semitransparency is currently only supported for car windows.
       */
      semitransparency?: boolean;
    }
  }

  export interface AutoTaggingExtension {
    /**
     * Maximum number of tags to attach to the asset.
     */
    maxTags: number;

    /**
     * Minimum confidence level for tags to be considered valid.
     */
    minConfidence: number;

    /**
     * Specifies the auto-tagging extension used.
     */
    name: 'google-auto-tagging' | 'aws-auto-tagging';
  }

  export interface AIAutoDescription {
    /**
     * Specifies the auto description extension.
     */
    name: 'ai-auto-description';
  }

  export interface AITasks {
    /**
     * Specifies the AI tasks extension for automated image analysis using AI models.
     */
    name: 'ai-tasks';

    /**
     * Array of task objects defining AI operations to perform on the asset.
     */
    tasks: Array<AITasks.SelectTags | AITasks.SelectMetadata | AITasks.YesNo>;
  }

  export namespace AITasks {
    export interface SelectTags {
      /**
       * The question or instruction for the AI to analyze the image.
       */
      instruction: string;

      /**
       * Task type that analyzes the image and adds matching tags from a vocabulary.
       */
      type: 'select_tags';

      /**
       * Maximum number of tags to select from the vocabulary.
       */
      max_selections?: number;

      /**
       * Minimum number of tags to select from the vocabulary.
       */
      min_selections?: number;

      /**
       * Array of possible tag values. Combined length of all strings must not exceed 500
       * characters. Cannot contain the `%` character.
       */
      vocabulary?: Array<string>;
    }

    export interface SelectMetadata {
      /**
       * Name of the custom metadata field to set. The field must exist in your account.
       */
      field: string;

      /**
       * The question or instruction for the AI to analyze the image.
       */
      instruction: string;

      /**
       * Task type that analyzes the image and sets a custom metadata field value from a
       * vocabulary.
       */
      type: 'select_metadata';

      /**
       * Maximum number of values to select from the vocabulary.
       */
      max_selections?: number;

      /**
       * Minimum number of values to select from the vocabulary.
       */
      min_selections?: number;

      /**
       * Array of possible values matching the custom metadata field type.
       */
      vocabulary?: Array<string | number | boolean>;
    }

    export interface YesNo {
      /**
       * The yes/no question for the AI to answer about the image.
       */
      instruction: string;

      /**
       * Task type that asks a yes/no question and executes actions based on the answer.
       */
      type: 'yes_no';

      /**
       * Actions to execute if the AI answers no.
       */
      on_no?: YesNo.OnNo;

      /**
       * Actions to execute if the AI cannot determine the answer.
       */
      on_unknown?: YesNo.OnUnknown;

      /**
       * Actions to execute if the AI answers yes.
       */
      on_yes?: YesNo.OnYes;
    }

    export namespace YesNo {
      /**
       * Actions to execute if the AI answers no.
       */
      export interface OnNo {
        /**
         * Array of tag strings to add to the asset.
         */
        add_tags?: Array<string>;

        /**
         * Array of tag strings to remove from the asset.
         */
        remove_tags?: Array<string>;

        /**
         * Array of custom metadata field updates.
         */
        set_metadata?: Array<OnNo.SetMetadata>;

        /**
         * Array of custom metadata fields to remove.
         */
        unset_metadata?: Array<OnNo.UnsetMetadata>;
      }

      export namespace OnNo {
        export interface SetMetadata {
          /**
           * Name of the custom metadata field to set.
           */
          field: string;

          /**
           * Value to set for the custom metadata field. The value type should match the
           * custom metadata field type.
           */
          value: string | number | boolean | Array<string | number | boolean>;
        }

        export interface UnsetMetadata {
          /**
           * Name of the custom metadata field to remove.
           */
          field: string;
        }
      }

      /**
       * Actions to execute if the AI cannot determine the answer.
       */
      export interface OnUnknown {
        /**
         * Array of tag strings to add to the asset.
         */
        add_tags?: Array<string>;

        /**
         * Array of tag strings to remove from the asset.
         */
        remove_tags?: Array<string>;

        /**
         * Array of custom metadata field updates.
         */
        set_metadata?: Array<OnUnknown.SetMetadata>;

        /**
         * Array of custom metadata fields to remove.
         */
        unset_metadata?: Array<OnUnknown.UnsetMetadata>;
      }

      export namespace OnUnknown {
        export interface SetMetadata {
          /**
           * Name of the custom metadata field to set.
           */
          field: string;

          /**
           * Value to set for the custom metadata field. The value type should match the
           * custom metadata field type.
           */
          value: string | number | boolean | Array<string | number | boolean>;
        }

        export interface UnsetMetadata {
          /**
           * Name of the custom metadata field to remove.
           */
          field: string;
        }
      }

      /**
       * Actions to execute if the AI answers yes.
       */
      export interface OnYes {
        /**
         * Array of tag strings to add to the asset.
         */
        add_tags?: Array<string>;

        /**
         * Array of tag strings to remove from the asset.
         */
        remove_tags?: Array<string>;

        /**
         * Array of custom metadata field updates.
         */
        set_metadata?: Array<OnYes.SetMetadata>;

        /**
         * Array of custom metadata fields to remove.
         */
        unset_metadata?: Array<OnYes.UnsetMetadata>;
      }

      export namespace OnYes {
        export interface SetMetadata {
          /**
           * Name of the custom metadata field to set.
           */
          field: string;

          /**
           * Value to set for the custom metadata field. The value type should match the
           * custom metadata field type.
           */
          value: string | number | boolean | Array<string | number | boolean>;
        }

        export interface UnsetMetadata {
          /**
           * Name of the custom metadata field to remove.
           */
          field: string;
        }
      }
    }
  }

  export interface SavedExtension {
    /**
     * The unique ID of the saved extension to apply.
     */
    id: string;

    /**
     * Indicates this is a reference to a saved extension.
     */
    name: 'saved-extension';
  }
}

/**
 * Options for generating responsive image attributes including `src`, `srcSet`,
 * and `sizes` for HTML `<img>` elements. This schema extends `SrcOptions` to add
 * support for responsive image generation with breakpoints.
 */
export interface GetImageAttributesOptions extends SrcOptions {
  /**
   * Custom list of **device-width breakpoints** in pixels. These define common
   * screen widths for responsive image generation.
   *
   * Defaults to `[640, 750, 828, 1080, 1200, 1920, 2048, 3840]`. Sorted
   * automatically.
   */
  deviceBreakpoints?: Array<number>;

  /**
   * Custom list of **image-specific breakpoints** in pixels. Useful for generating
   * small variants (e.g., placeholders or thumbnails).
   *
   * Merged with `deviceBreakpoints` before calculating `srcSet`. Defaults to
   * `[16, 32, 48, 64, 96, 128, 256, 384]`. Sorted automatically.
   */
  imageBreakpoints?: Array<number>;

  /**
   * The value for the HTML `sizes` attribute (e.g., `"100vw"` or
   * `"(min-width:768px) 50vw, 100vw"`).
   *
   * - If it includes one or more `vw` units, breakpoints smaller than the
   *   corresponding percentage of the smallest device width are excluded.
   * - If it contains no `vw` units, the full breakpoint list is used.
   *
   * Enables a width-based strategy and generates `w` descriptors in `srcSet`.
   */
  sizes?: string;

  /**
   * The intended display width of the image in pixels, used **only when the `sizes`
   * attribute is not provided**.
   *
   * Triggers a DPR-based strategy (1x and 2x variants) and generates `x` descriptors
   * in `srcSet`.
   *
   * Ignored if `sizes` is present.
   */
  width?: number;
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
   *
   * Regardless of the encoding method:
   *
   * - Leading and trailing slashes are removed.
   * - Remaining slashes within the path are replaced with `@@` when using plain
   *   text.
   */
  encoding?: 'auto' | 'plain' | 'base64';

  /**
   * Array of transformations to be applied to the overlay image. Supported
   * transformations depends on the base/parent asset. See overlays on
   * [Images](https://imagekit.io/docs/add-overlays-on-images#list-of-supported-image-transformations-in-image-layers)
   * and
   * [Videos](https://imagekit.io/docs/add-overlays-on-videos#list-of-transformations-supported-on-image-overlay).
   */
  transformation?: Array<Transformation>;
}

/**
 * Specifies an overlay to be applied on the parent image or video. ImageKit
 * supports overlays including images, text, videos, subtitles, and solid colors.
 * See
 * [Overlay using layers](https://imagekit.io/docs/transformations#overlay-using-layers).
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
   * expressions such as `bw_mul_0.4` or `bw_sub_cw`. Maps to `lx` in the URL. Learn
   * about
   * [Arithmetic expressions](https://imagekit.io/docs/arithmetic-expressions-in-transformations).
   */
  x?: number | string;

  /**
   * Specifies the y-coordinate of the top-left corner of the base asset where the
   * overlay's top-left corner will be positioned. It also accepts arithmetic
   * expressions such as `bh_mul_0.4` or `bh_sub_ch`. Maps to `ly` in the URL. Learn
   * about
   * [Arithmetic expressions](https://imagekit.io/docs/arithmetic-expressions-in-transformations).
   */
  y?: number | string;
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
}

/**
 * Resulting set of attributes suitable for an HTML `<img>` element. Useful for
 * enabling responsive image loading with `srcSet` and `sizes`.
 */
export interface ResponsiveImageAttributes {
  /**
   * URL for the _largest_ candidate (assigned to plain `src`).
   */
  src: string;

  /**
   * `sizes` returned (or synthesised as `100vw`). The value for the HTML `sizes`
   * attribute.
   */
  sizes?: string;

  /**
   * Candidate set with `w` or `x` descriptors. Multiple image URLs separated by
   * commas, each with a descriptor.
   */
  srcSet?: string;

  /**
   * Width as a number (if `width` was provided in the input options).
   */
  width?: number;
}

/**
 * Saved extension object containing extension configuration.
 */
export interface SavedExtension {
  /**
   * Unique identifier of the saved extension.
   */
  id?: string;

  /**
   * Configuration object for an extension (base extensions only, not saved extension
   * references).
   */
  config?: ExtensionConfig;

  /**
   * Timestamp when the saved extension was created.
   */
  createdAt?: string;

  /**
   * Description of the saved extension.
   */
  description?: string;

  /**
   * Name of the saved extension.
   */
  name?: string;

  /**
   * Timestamp when the saved extension was last updated.
   */
  updatedAt?: string;
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
   * depend on the base/parent asset. See overlays on
   * [Images](https://imagekit.io/docs/add-overlays-on-images#apply-transformation-on-solid-color-overlay)
   * and
   * [Videos](https://imagekit.io/docs/add-overlays-on-videos#apply-transformations-on-solid-color-block-overlay).
   */
  transformation?: Array<SolidColorOverlayTransformation>;
}

export interface SolidColorOverlayTransformation {
  /**
   * Specifies the transparency level of the overlaid solid color layer. Supports
   * integers from `1` to `9`.
   */
  alpha?: number;

  /**
   * Specifies the background color of the solid color overlay. Accepts an RGB hex
   * code (e.g., `FF0000`), an RGBA code (e.g., `FFAABB50`), or a color name.
   */
  background?: string;

  /**
   * Creates a linear gradient with two colors. Pass `true` for a default gradient,
   * or provide a string for a custom gradient. Only works if the base asset is an
   * image. See
   * [gradient](https://imagekit.io/docs/effects-and-enhancements#gradient---e-gradient).
   */
  gradient?: true | string;

  /**
   * Controls the height of the solid color overlay. Accepts a numeric value or an
   * arithmetic expression. Learn about
   * [arithmetic expressions](https://imagekit.io/docs/arithmetic-expressions-in-transformations).
   */
  height?: number | string;

  /**
   * Specifies the corner radius of the solid color overlay.
   *
   * - Single value (positive integer): Applied to all corners (e.g., `20`).
   * - `max`: Creates a circular or oval shape.
   * - Per-corner array: Provide four underscore-separated values representing
   *   top-left, top-right, bottom-right, and bottom-left corners respectively (e.g.,
   *   `10_20_30_40`). See
   *   [Radius](https://imagekit.io/docs/effects-and-enhancements#radius---r).
   */
  radius?: number | 'max' | string;

  /**
   * Controls the width of the solid color overlay. Accepts a numeric value or an
   * arithmetic expression (e.g., `bw_mul_0.2` or `bh_div_2`). Learn about
   * [arithmetic expressions](https://imagekit.io/docs/arithmetic-expressions-in-transformations).
   */
  width?: number | string;
}

/**
 * Options for generating ImageKit URLs with transformations. See the
 * [Transformations guide](https://imagekit.io/docs/transformations).
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
   * When you want the signed URL to expire, specified in seconds. If `expiresIn` is
   * anything above 0, the URL will always be signed even if `signed` is set to
   * false. If not specified and `signed` is `true`, the signed URL will not expire
   * (valid indefinitely).
   *
   * Example: Setting `expiresIn: 3600` will make the URL expire 1 hour from
   * generation time. After the expiry time, the signed URL will no longer be valid
   * and ImageKit will return a 401 Unauthorized status code.
   *
   * [Learn more](https://imagekit.io/docs/media-delivery-basic-security#how-to-generate-signed-urls).
   */
  expiresIn?: number;

  /**
   * These are additional query parameters that you want to add to the final URL.
   * They can be any query parameters and not necessarily related to ImageKit. This
   * is especially useful if you want to add a versioning parameter to your URLs.
   */
  queryParameters?: { [key: string]: string };

  /**
   * Whether to sign the URL or not. Set this to `true` if you want to generate a
   * signed URL. If `signed` is `true` and `expiresIn` is not specified, the signed
   * URL will not expire (valid indefinitely). Note: If `expiresIn` is set to any
   * value above 0, the URL will always be signed regardless of this setting.
   * [Learn more](https://imagekit.io/docs/media-delivery-basic-security#how-to-generate-signed-urls).
   */
  signed?: boolean;

  /**
   * An array of objects specifying the transformations to be applied in the URL. If
   * more than one transformation is specified, they are applied in the order they
   * are specified as chained transformations. See
   * [Chained transformations](https://imagekit.io/docs/transformations#chained-transformations).
   */
  transformation?: Array<Transformation>;

  /**
   * By default, the transformation string is added as a query parameter in the URL,
   * e.g., `?tr=w-100,h-100`. If you want to add the transformation string in the
   * path of the URL, set this to `path`. Learn more in the
   * [Transformations guide](https://imagekit.io/docs/transformations).
   */
  transformationPosition?: TransformationPosition;
}

/**
 * Available streaming resolutions for
 * [adaptive bitrate streaming](https://imagekit.io/docs/adaptive-bitrate-streaming)
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
   *
   * Regardless of the encoding method:
   *
   * - Leading and trailing slashes are removed.
   * - Remaining slashes within the path are replaced with `@@` when using plain
   *   text.
   */
  encoding?: 'auto' | 'plain' | 'base64';

  /**
   * Control styling of the subtitle. See
   * [Styling subtitles](https://imagekit.io/docs/add-overlays-on-videos#styling-controls-for-subtitles-layer).
   */
  transformation?: Array<SubtitleOverlayTransformation>;
}

/**
 * Subtitle styling options.
 * [Learn more](https://imagekit.io/docs/add-overlays-on-videos#styling-controls-for-subtitles-layer)
 * from the docs.
 */
export interface SubtitleOverlayTransformation {
  /**
   * Specifies the subtitle background color using a standard color name, an RGB
   * color code (e.g., FF0000), or an RGBA color code (e.g., FFAABB50).
   *
   * [Subtitle styling options](https://imagekit.io/docs/add-overlays-on-videos#styling-controls-for-subtitles-layer)
   */
  background?: string;

  /**
   * Sets the font color of the subtitle text using a standard color name, an RGB
   * color code (e.g., FF0000), or an RGBA color code (e.g., FFAABB50).
   *
   * [Subtitle styling options](https://imagekit.io/docs/add-overlays-on-videos#styling-controls-for-subtitles-layer)
   */
  color?: string;

  /**
   * Sets the font family of subtitle text. Refer to the
   * [supported fonts documented](https://imagekit.io/docs/add-overlays-on-images#supported-text-font-list)
   * in the ImageKit transformations guide.
   */
  fontFamily?: string;

  /**
   * Sets the font outline of the subtitle text. Requires the outline width (an
   * integer) and the outline color (as an RGB color code, RGBA color code, or
   * standard web color name) separated by an underscore. Example: `fol-2_blue`
   * (outline width of 2px and outline color blue), `fol-2_A1CCDD` (outline width of
   * 2px and outline color `#A1CCDD`) and `fol-2_A1CCDD50` (outline width of 2px and
   * outline color `#A1CCDD` at 50% opacity).
   *
   * [Subtitle styling options](https://imagekit.io/docs/add-overlays-on-videos#styling-controls-for-subtitles-layer)
   */
  fontOutline?: string;

  /**
   * Sets the font shadow for the subtitle text. Requires the shadow color (as an RGB
   * color code, RGBA color code, or standard web color name) and shadow indent (an
   * integer) separated by an underscore. Example: `fsh-blue_2` (shadow color blue,
   * indent of 2px), `fsh-A1CCDD_3` (shadow color `#A1CCDD`, indent of 3px),
   * `fsh-A1CCDD50_3` (shadow color `#A1CCDD` at 50% opacity, indent of 3px).
   *
   * [Subtitle styling options](https://imagekit.io/docs/add-overlays-on-videos#styling-controls-for-subtitles-layer)
   */
  fontShadow?: string;

  /**
   * Sets the font size of subtitle text.
   *
   * [Subtitle styling options](https://imagekit.io/docs/add-overlays-on-videos#styling-controls-for-subtitles-layer)
   */
  fontSize?: number;

  /**
   * Sets the typography style of the subtitle text. Supports values are `b` for
   * bold, `i` for italics, and `b_i` for bold with italics.
   *
   * [Subtitle styling options](https://imagekit.io/docs/add-overlays-on-videos#styling-controls-for-subtitles-layer)
   */
  typography?: 'b' | 'i' | 'b_i';
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
   *
   * Regardless of the encoding method, the input text is always percent-encoded to
   * ensure it is URL-safe.
   */
  encoding?: 'auto' | 'plain' | 'base64';

  /**
   * Control styling of the text overlay. See
   * [Text overlays](https://imagekit.io/docs/add-overlays-on-images#text-overlay).
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
   * Flip/mirror the text horizontally, vertically, or in both directions. Acceptable
   * values: `h` (horizontal), `v` (vertical), `h_v` (horizontal and vertical), or
   * `v_h`.
   */
  flip?: 'h' | 'v' | 'h_v' | 'v_h';

  /**
   * Specifies the font color of the overlaid text. Accepts an RGB hex code (e.g.,
   * `FF0000`), an RGBA code (e.g., `FFAABB50`), or a color name.
   */
  fontColor?: string;

  /**
   * Specifies the font family of the overlaid text. Choose from the supported fonts
   * list or use a custom font. See
   * [Supported fonts](https://imagekit.io/docs/add-overlays-on-images#supported-text-font-list)
   * and
   * [Custom font](https://imagekit.io/docs/add-overlays-on-images#change-font-family-in-text-overlay).
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
   * Specifies the line height for multi-line text overlays. It will come into effect
   * only if the text wraps over multiple lines. Accepts either an integer value or
   * an arithmetic expression.
   */
  lineHeight?: number | string;

  /**
   * Specifies the padding around the overlaid text. Can be provided as a single
   * positive integer or multiple values separated by underscores (following CSS
   * shorthand order). Arithmetic expressions are also accepted.
   */
  padding?: number | string;

  /**
   * Specifies the corner radius:
   *
   * - Single value (positive integer): Applied to all corners (e.g., `20`).
   * - `max`: Creates a circular or oval shape.
   * - Per-corner array: Provide four underscore-separated values representing
   *   top-left, top-right, bottom-right, and bottom-left corners respectively (e.g.,
   *   `10_20_30_40`). See
   *   [Radius](https://imagekit.io/docs/effects-and-enhancements#radius---r).
   */
  radius?: number | 'max' | string;

  /**
   * Specifies the rotation angle of the text overlay. Accepts a numeric value for
   * clockwise rotation or a string prefixed with "N" for counter-clockwise rotation.
   */
  rotation?: number | string;

  /**
   * Specifies the typography style of the text. Supported values:
   *
   * - Single styles: `b` (bold), `i` (italic), `strikethrough`.
   * - Combinations: Any combination separated by underscores, e.g., `b_i`,
   *   `b_i_strikethrough`.
   */
  typography?: string;

  /**
   * Specifies the maximum width (in pixels) of the overlaid text. The text wraps
   * automatically, and arithmetic expressions (e.g., `bw_mul_0.2` or `bh_div_2`) are
   * supported. Useful when used in conjunction with the `background`. Learn about
   * [Arithmetic expressions](https://imagekit.io/docs/arithmetic-expressions-in-transformations).
   */
  width?: number | string;
}

/**
 * The SDK provides easy-to-use names for transformations. These names are
 * converted to the corresponding transformation string before being added to the
 * URL. SDKs are updated regularly to support new transformations. If you want to
 * use a transformation that is not supported by the SDK, You can use the `raw`
 * parameter to pass the transformation string directly. See the
 * [Transformations documentation](https://imagekit.io/docs/transformations).
 */
export interface Transformation {
  /**
   * Uses AI to change the background. Provide a text prompt or a base64-encoded
   * prompt, e.g., `prompt-snow road` or `prompte-[urlencoded_base64_encoded_text]`.
   * Not supported inside overlay. See
   * [AI Change Background](https://imagekit.io/docs/ai-transformations#change-background-e-changebg).
   */
  aiChangeBackground?: string;

  /**
   * Adds an AI-based drop shadow around a foreground object on a transparent or
   * removed background. Optionally, control the direction, elevation, and saturation
   * of the light source (e.g., `az-45` to change light direction). Pass `true` for
   * the default drop shadow, or provide a string for a custom drop shadow. Supported
   * inside overlay. See
   * [AI Drop Shadow](https://imagekit.io/docs/ai-transformations#ai-drop-shadow-e-dropshadow).
   */
  aiDropShadow?: true | string;

  /**
   * Uses AI to edit images based on a text prompt. Provide a text prompt or a
   * base64-encoded prompt, e.g., `prompt-snow road` or
   * `prompte-[urlencoded_base64_encoded_text]`. Not supported inside overlay.
   * See [AI Edit](https://imagekit.io/docs/ai-transformations#edit-image-e-edit).
   */
  aiEdit?: string;

  /**
   * Applies ImageKit's in-house background removal. Supported inside overlay. See
   * [AI Background Removal](https://imagekit.io/docs/ai-transformations#imagekit-background-removal-e-bgremove).
   */
  aiRemoveBackground?: true;

  /**
   * Uses third-party background removal. Note: It is recommended to use
   * aiRemoveBackground, ImageKit's in-house solution, which is more cost-effective.
   * Supported inside overlay. See
   * [External Background Removal](https://imagekit.io/docs/ai-transformations#background-removal-e-removedotbg).
   */
  aiRemoveBackgroundExternal?: true;

  /**
   * Performs AI-based retouching to improve faces or product shots. Not supported
   * inside overlay. See
   * [AI Retouch](https://imagekit.io/docs/ai-transformations#retouch-e-retouch).
   */
  aiRetouch?: true;

  /**
   * Upscales images beyond their original dimensions using AI. Not supported inside
   * overlay. See
   * [AI Upscale](https://imagekit.io/docs/ai-transformations#upscale-e-upscale).
   */
  aiUpscale?: true;

  /**
   * Generates a variation of an image using AI. This produces a new image with
   * slight variations from the original, such as changes in color, texture, and
   * other visual elements, while preserving the structure and essence of the
   * original image. Not supported inside overlay. See
   * [AI Generate Variations](https://imagekit.io/docs/ai-transformations#generate-variations-of-an-image-e-genvar).
   */
  aiVariation?: true;

  /**
   * Specifies the aspect ratio for the output, e.g., "ar-4-3". Typically used with
   * either width or height (but not both). For example: aspectRatio = `4:3`, `4_3`,
   * or an expression like `iar_div_2`. See
   * [Image resize and crop – Aspect ratio](https://imagekit.io/docs/image-resize-and-crop#aspect-ratio---ar).
   */
  aspectRatio?: number | string;

  /**
   * Specifies the audio codec, e.g., `aac`, `opus`, or `none`. See
   * [Audio codec](https://imagekit.io/docs/video-optimization#audio-codec---ac).
   */
  audioCodec?: 'aac' | 'opus' | 'none';

  /**
   * Specifies the background to be used in conjunction with certain cropping
   * strategies when resizing an image.
   *
   * - A solid color: e.g., `red`, `F3F3F3`, `AAFF0010`. See
   *   [Solid color background](https://imagekit.io/docs/effects-and-enhancements#solid-color-background).
   * - Dominant color: `dominant` extracts the dominant color from the image. See
   *   [Dominant color background](https://imagekit.io/docs/effects-and-enhancements#dominant-color-background).
   * - Gradient: `gradient_dominant` or `gradient_dominant_2` creates a gradient
   *   using the dominant colors. Optionally specify palette size (2 or 4), e.g.,
   *   `gradient_dominant_4`. See
   *   [Gradient background](https://imagekit.io/docs/effects-and-enhancements#gradient-background).
   * - A blurred background: e.g., `blurred`, `blurred_25_N15`, etc. See
   *   [Blurred background](https://imagekit.io/docs/effects-and-enhancements#blurred-background).
   * - Expand the image boundaries using generative fill: `genfill`. Not supported
   *   inside overlay. Optionally, control the background scene by passing a text
   *   prompt: `genfill[:-prompt-${text}]` or
   *   `genfill[:-prompte-${urlencoded_base64_encoded_text}]`. See
   *   [Generative fill background](https://imagekit.io/docs/ai-transformations#generative-fill-bg-genfill).
   */
  background?: string;

  /**
   * Specifies the Gaussian blur level. Accepts an integer value between 1 and 100,
   * or an expression like `bl-10`. See
   * [Blur](https://imagekit.io/docs/effects-and-enhancements#blur---bl).
   */
  blur?: number;

  /**
   * Adds a border to the output media. Accepts a string in the format
   * `<border-width>_<hex-code>` (e.g., `5_FFF000` for a 5px yellow border), or an
   * expression like `ih_div_20_FF00FF`. See
   * [Border](https://imagekit.io/docs/effects-and-enhancements#border---b).
   */
  border?: string;

  /**
   * Indicates whether the output image should retain the original color profile. See
   * [Color profile](https://imagekit.io/docs/image-optimization#color-profile---cp).
   */
  colorProfile?: boolean;

  /**
   * Replaces colors in the image. Supports three formats:
   *
   * - `toColor` - Replace dominant color with the specified color.
   * - `toColor_tolerance` - Replace dominant color with specified tolerance (0-100).
   * - `toColor_tolerance_fromColor` - Replace a specific color with another within
   *   tolerance range. Colors can be hex codes (e.g., `FF0022`) or names (e.g.,
   *   `red`, `blue`). See
   *   [Color replacement](https://imagekit.io/docs/effects-and-enhancements#color-replace---cr).
   */
  colorReplace?: string;

  /**
   * Automatically enhances the contrast of an image (contrast stretch). See
   * [Contrast Stretch](https://imagekit.io/docs/effects-and-enhancements#contrast-stretch---e-contrast).
   */
  contrastStretch?: true;

  /**
   * Crop modes for image resizing. See
   * [Crop modes & focus](https://imagekit.io/docs/image-resize-and-crop#crop-crop-modes--focus).
   */
  crop?: 'force' | 'at_max' | 'at_max_enlarge' | 'at_least' | 'maintain_ratio';

  /**
   * Additional crop modes for image resizing. See
   * [Crop modes & focus](https://imagekit.io/docs/image-resize-and-crop#crop-crop-modes--focus).
   */
  cropMode?: 'pad_resize' | 'extract' | 'pad_extract';

  /**
   * Specifies a fallback image if the resource is not found, e.g., a URL or file
   * path. See
   * [Default image](https://imagekit.io/docs/image-transformation#default-image---di).
   */
  defaultImage?: string;

  /**
   * Distorts the shape of an image. Supports two modes:
   *
   * - Perspective distortion: `p-x1_y1_x2_y2_x3_y3_x4_y4` changes the position of
   *   the four corners starting clockwise from top-left.
   * - Arc distortion: `a-degrees` curves the image upwards (positive values) or
   *   downwards (negative values). See
   *   [Distort effect](https://imagekit.io/docs/effects-and-enhancements#distort---e-distort).
   */
  distort?: string;

  /**
   * Accepts values between 0.1 and 5, or `auto` for automatic device pixel ratio
   * (DPR) calculation. Also accepts arithmetic expressions.
   *
   * - Learn about
   *   [Arithmetic expressions](https://imagekit.io/docs/arithmetic-expressions-in-transformations).
   * - See [DPR](https://imagekit.io/docs/image-resize-and-crop#dpr---dpr).
   */
  dpr?: number;

  /**
   * Specifies the duration (in seconds) for trimming videos, e.g., `5` or `10.5`.
   * Typically used with startOffset to indicate the length from the start offset.
   * Arithmetic expressions are supported. See
   * [Trim videos – Duration](https://imagekit.io/docs/trim-videos#duration---du).
   */
  duration?: number | string;

  /**
   * Specifies the end offset (in seconds) for trimming videos, e.g., `5` or `10.5`.
   * Typically used with startOffset to define a time window. Arithmetic expressions
   * are supported. See
   * [Trim videos – End offset](https://imagekit.io/docs/trim-videos#end-offset---eo).
   */
  endOffset?: number | string;

  /**
   * Flips or mirrors an image either horizontally, vertically, or both. Acceptable
   * values: `h` (horizontal), `v` (vertical), `h_v` (horizontal and vertical), or
   * `v_h`. See [Flip](https://imagekit.io/docs/effects-and-enhancements#flip---fl).
   */
  flip?: 'h' | 'v' | 'h_v' | 'v_h';

  /**
   * Refines padding and cropping behavior for pad resize, maintain ratio, and
   * extract crop modes. Supports manual positions and coordinate-based focus. With
   * AI-based cropping, you can automatically keep key subjects in frame—such as
   * faces or detected objects (e.g., `fo-face`, `fo-person`, `fo-car`)— while
   * resizing.
   *
   * - See [Focus](https://imagekit.io/docs/image-resize-and-crop#focus---fo).
   * - [Object aware cropping](https://imagekit.io/docs/image-resize-and-crop#object-aware-cropping---fo-object-name)
   */
  focus?: string;

  /**
   * Specifies the output format for images or videos, e.g., `jpg`, `png`, `webp`,
   * `mp4`, or `auto`. You can also pass `orig` for images to return the original
   * format. ImageKit automatically delivers images and videos in the optimal format
   * based on device support unless overridden by the dashboard settings or the
   * format parameter. See
   * [Image format](https://imagekit.io/docs/image-optimization#format---f) and
   * [Video format](https://imagekit.io/docs/video-optimization#format---f).
   */
  format?: 'auto' | 'webp' | 'jpg' | 'jpeg' | 'png' | 'gif' | 'svg' | 'mp4' | 'webm' | 'avif' | 'orig';

  /**
   * Creates a linear gradient with two colors. Pass `true` for a default gradient,
   * or provide a string for a custom gradient. See
   * [Gradient](https://imagekit.io/docs/effects-and-enhancements#gradient---e-gradient).
   */
  gradient?: true | string;

  /**
   * Enables a grayscale effect for images. See
   * [Grayscale](https://imagekit.io/docs/effects-and-enhancements#grayscale---e-grayscale).
   */
  grayscale?: true;

  /**
   * Specifies the height of the output. If a value between 0 and 1 is provided, it
   * is treated as a percentage (e.g., `0.5` represents 50% of the original height).
   * You can also supply arithmetic expressions (e.g., `ih_mul_0.5`). Height
   * transformation –
   * [Images](https://imagekit.io/docs/image-resize-and-crop#height---h) ·
   * [Videos](https://imagekit.io/docs/video-resize-and-crop#height---h)
   */
  height?: number | string;

  /**
   * Specifies whether the output image (in JPEG or PNG) should be compressed
   * losslessly. See
   * [Lossless compression](https://imagekit.io/docs/image-optimization#lossless-webp-and-png---lo).
   */
  lossless?: boolean;

  /**
   * By default, ImageKit removes all metadata during automatic image compression.
   * Set this to true to preserve metadata. See
   * [Image metadata](https://imagekit.io/docs/image-optimization#image-metadata---md).
   */
  metadata?: boolean;

  /**
   * Named transformation reference. See
   * [Named transformations](https://imagekit.io/docs/transformations#named-transformations).
   */
  named?: string;

  /**
   * Specifies the opacity level of the output image. See
   * [Opacity](https://imagekit.io/docs/effects-and-enhancements#opacity---o).
   */
  opacity?: number;

  /**
   * If set to true, serves the original file without applying any transformations.
   * See
   * [Deliver original file as-is](https://imagekit.io/docs/core-delivery-features#deliver-original-file-as-is---orig-true).
   */
  original?: boolean;

  /**
   * Specifies an overlay to be applied on the parent image or video. ImageKit
   * supports overlays including images, text, videos, subtitles, and solid colors.
   * See
   * [Overlay using layers](https://imagekit.io/docs/transformations#overlay-using-layers).
   */
  overlay?: Overlay;

  /**
   * Extracts a specific page or frame from multi-page or layered files (PDF, PSD,
   * AI). For example, specify by number (e.g., `2`), a range (e.g., `3-4` for the
   * 2nd and 3rd layers), or by name (e.g., `name-layer-4` for a PSD layer). See
   * [Thumbnail extraction](https://imagekit.io/docs/vector-and-animated-images#get-thumbnail-from-psd-pdf-ai-eps-and-animated-files).
   */
  page?: number | string;

  /**
   * Specifies whether the output JPEG image should be rendered progressively.
   * Progressive loading begins with a low-quality, pixelated version of the full
   * image, which gradually improves to provide a faster perceived load time. See
   * [Progressive images](https://imagekit.io/docs/image-optimization#progressive-image---pr).
   */
  progressive?: boolean;

  /**
   * Specifies the quality of the output image for lossy formats such as JPEG, WebP,
   * and AVIF. A higher quality value results in a larger file size with better
   * quality, while a lower value produces a smaller file size with reduced quality.
   * See [Quality](https://imagekit.io/docs/image-optimization#quality---q).
   */
  quality?: number;

  /**
   * Specifies the corner radius for rounded corners.
   *
   * - Single value (positive integer): Applied to all corners (e.g., `20`).
   * - `max`: Creates a circular or oval shape.
   * - Per-corner array: Provide four underscore-separated values representing
   *   top-left, top-right, bottom-right, and bottom-left corners respectively (e.g.,
   *   `10_20_30_40`). See
   *   [Radius](https://imagekit.io/docs/effects-and-enhancements#radius---r).
   */
  radius?: number | 'max' | string;

  /**
   * Pass any transformation not directly supported by the SDK. This transformation
   * string is appended to the URL as provided.
   */
  raw?: string;

  /**
   * Specifies the rotation angle in degrees. Positive values rotate the image
   * clockwise; you can also use, for example, `N40` for counterclockwise rotation or
   * `auto` to use the orientation specified in the image's EXIF data. For videos,
   * only the following values are supported: 0, 90, 180, 270, or 360. See
   * [Rotate](https://imagekit.io/docs/effects-and-enhancements#rotate---rt).
   */
  rotation?: number | string;

  /**
   * Adds a shadow beneath solid objects in an image with a transparent background.
   * For AI-based drop shadows, refer to aiDropShadow. Pass `true` for a default
   * shadow, or provide a string for a custom shadow. See
   * [Shadow](https://imagekit.io/docs/effects-and-enhancements#shadow---e-shadow).
   */
  shadow?: true | string;

  /**
   * Sharpens the input image, highlighting edges and finer details. Pass `true` for
   * default sharpening, or provide a numeric value for custom sharpening. See
   * [Sharpen](https://imagekit.io/docs/effects-and-enhancements#sharpen---e-sharpen).
   */
  sharpen?: true | number;

  /**
   * Specifies the start offset (in seconds) for trimming videos, e.g., `5` or
   * `10.5`. Arithmetic expressions are also supported. See
   * [Trim videos – Start offset](https://imagekit.io/docs/trim-videos#start-offset---so).
   */
  startOffset?: number | string;

  /**
   * An array of resolutions for adaptive bitrate streaming, e.g., [`240`, `360`,
   * `480`, `720`, `1080`]. See
   * [Adaptive Bitrate Streaming](https://imagekit.io/docs/adaptive-bitrate-streaming).
   */
  streamingResolutions?: Array<StreamingResolution>;

  /**
   * Useful for images with a solid or nearly solid background and a central object.
   * This parameter trims the background, leaving only the central object in the
   * output image. See
   * [Trim edges](https://imagekit.io/docs/effects-and-enhancements#trim-edges---t).
   */
  trim?: true | number;

  /**
   * Applies Unsharp Masking (USM), an image sharpening technique. Pass `true` for a
   * default unsharp mask, or provide a string for a custom unsharp mask. See
   * [Unsharp Mask](https://imagekit.io/docs/effects-and-enhancements#unsharp-mask---e-usm).
   */
  unsharpMask?: true | string;

  /**
   * Specifies the video codec, e.g., `h264`, `vp9`, `av1`, or `none`. See
   * [Video codec](https://imagekit.io/docs/video-optimization#video-codec---vc).
   */
  videoCodec?: 'h264' | 'vp9' | 'av1' | 'none';

  /**
   * Specifies the width of the output. If a value between 0 and 1 is provided, it is
   * treated as a percentage (e.g., `0.4` represents 40% of the original width). You
   * can also supply arithmetic expressions (e.g., `iw_div_2`). Width transformation
   * – [Images](https://imagekit.io/docs/image-resize-and-crop#width---w) ·
   * [Videos](https://imagekit.io/docs/video-resize-and-crop#width---w)
   */
  width?: number | string;

  /**
   * Focus using cropped image coordinates - X coordinate. See
   * [Focus using cropped coordinates](https://imagekit.io/docs/image-resize-and-crop#example---focus-using-cropped-image-coordinates).
   */
  x?: number | string;

  /**
   * Focus using cropped image coordinates - X center coordinate. See
   * [Focus using cropped coordinates](https://imagekit.io/docs/image-resize-and-crop#example---focus-using-cropped-image-coordinates).
   */
  xCenter?: number | string;

  /**
   * Focus using cropped image coordinates - Y coordinate. See
   * [Focus using cropped coordinates](https://imagekit.io/docs/image-resize-and-crop#example---focus-using-cropped-image-coordinates).
   */
  y?: number | string;

  /**
   * Focus using cropped image coordinates - Y center coordinate. See
   * [Focus using cropped coordinates](https://imagekit.io/docs/image-resize-and-crop#example---focus-using-cropped-image-coordinates).
   */
  yCenter?: number | string;

  /**
   * Accepts a numeric value that determines how much to zoom in or out of the
   * cropped area. It should be used in conjunction with fo-face or fo-<object_name>.
   * See [Zoom](https://imagekit.io/docs/image-resize-and-crop#zoom---z).
   */
  zoom?: number;
}

/**
 * By default, the transformation string is added as a query parameter in the URL,
 * e.g., `?tr=w-100,h-100`. If you want to add the transformation string in the
 * path of the URL, set this to `path`. Learn more in the
 * [Transformations guide](https://imagekit.io/docs/transformations).
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
   *
   * Regardless of the encoding method:
   *
   * - Leading and trailing slashes are removed.
   * - Remaining slashes within the path are replaced with `@@` when using plain
   *   text.
   */
  encoding?: 'auto' | 'plain' | 'base64';

  /**
   * Array of transformation to be applied to the overlay video. Except
   * `streamingResolutions`, all other video transformations are supported. See
   * [Video transformations](https://imagekit.io/docs/video-transformation).
   */
  transformation?: Array<Transformation>;
}
