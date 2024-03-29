type RequiredSchema<T> = {
    isValueRequired: true;
    defaultValue: T;
} | {
    isValueRequired?: false;
    defaultValue?: T;
};

type CustomMetadataTextField = RequiredSchema<string> & {
    type: "Text";
    minLength?: number;
    maxLength?: number;
};

type CustomMetadataTextareaField = RequiredSchema<string> & {
    type: "Textarea";
    minLength?: number;
    maxLength?: number;
};

type CustomMetadataNumberField = RequiredSchema<number> & {
    type: "Number";
    minValue?: string | number;
    maxValue?: string | number;
};

type CustomMetadataDateField = RequiredSchema<number> & {
    type: "Date";
    minValue?: string | number;
    maxValue?: string | number;
};

type CustomMetadataBooleanField = RequiredSchema<Boolean> & {
    type: "Boolean";
};

type CustomMetadataSingleSelectField = RequiredSchema<Array<string | boolean | number>> & {
    type: "SingleSelect";
    selectOptions: Array<string | boolean | number>;
};

type CustomMetadataMultiSelectField = RequiredSchema<Array<string | boolean | number>> & {
    type: "MultiSelect";
    selectOptions: Array<string | boolean | number>;
};

export type CustomMetadataFieldSchema =
    | CustomMetadataTextField
    | CustomMetadataTextareaField
    | CustomMetadataNumberField
    | CustomMetadataDateField
    | CustomMetadataBooleanField
    | CustomMetadataSingleSelectField
    | CustomMetadataMultiSelectField;

export type CustomMetadataFieldSchemaMinusType =
    | Omit<CustomMetadataTextField, "type">
    | Omit<CustomMetadataTextareaField, "type">
    | Omit<CustomMetadataNumberField, "type">
    | Omit<CustomMetadataDateField, "type">
    | Omit<CustomMetadataBooleanField, "type">
    | Omit<CustomMetadataSingleSelectField, "type">
    | Omit<CustomMetadataMultiSelectField, "type">;

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

export interface GetCustomMetadataFieldsOptions {
    /**
     * Set it to true if you want to receive deleted fields as well in the API response.
     */
    includeDeleted?: boolean;
}