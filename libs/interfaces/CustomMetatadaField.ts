export interface CustomMetadataFieldSchema {
    type: string;
    selectOptions?: (string | number | boolean)[];
    defaultValue?: string | number | boolean | (string | number | boolean)[];
    isValueRequired?: boolean;
    minValue?: string | number;
    maxValue?: string | number;
    minLength?: number;
    maxLength?: number;
}

export interface CustomMetadataFieldSchemaMinusType {
    selectOptions?: (string | number | boolean)[];
    defaultValue?: string | number | boolean | (string | number | boolean)[];
    isValueRequired?: boolean;
    minValue?: string | number;
    maxValue?: string | number;
    minLength?: number;
    maxLength?: number;
}
/**
 * Create a new custom metadata field
 *
 * @see {@link https://docs.imagekit.io/api-reference/custom-metadata-fields-api/create-custom-metadata-field}
 */
export interface CreateCustomMetadataFieldOptions {
    /**
     * Name of the metadata field, unique across all (deleted or not deleted) custom metadata fields.
     */
    name: string;
    /**
     * Label of the metadata field, unique across all non deleted custom metadata fields
     */
    label: string;
    /**
     * An object that describes the rules for the custom metadata key.
     */
    schema: CustomMetadataFieldSchema
}

export interface CustomMetadataField {
    id: string;
    /**
     * Name of the metadata field, unique across all (deleted or not deleted) custom metadata fields.
     */
    name: string;
    /**
     * Label of the metadata field, unique across all non deleted custom metadata fields
     */
    label: string;
    /**
     * An object that describes the rules for the custom metadata key.
     */
    schema: CustomMetadataFieldSchema
}

/**
 * Update the label or schema of an existing custom metadata field.
 *
 * @see {@link https://docs.imagekit.io/api-reference/custom-metadata-fields-api/update-custom-metadata-field}
 */
export interface UpdateCustomMetadataFieldOptions {
    /**
     * Label of the metadata field, unique across all non deleted custom metadata fields. This parameter is required if schema is not provided.
     */
    label?: string;
    /**
     * An object that describes the rules for the custom metadata key. This parameter is required if label is not provided. 
     * Note: type cannot be updated and will be ignored if sent with the schema. The schema will be validated as per the existing type.
     */
    schema?: CustomMetadataFieldSchemaMinusType
}