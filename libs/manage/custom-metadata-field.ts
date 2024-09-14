/*
    Constants
*/
import errorMessages from "../constants/errorMessages";

/*
    Utils
*/
import respond from "../../utils/respond";
import request from "../../utils/request";

/*
    Interfaces
*/
import { IKCallback } from "../interfaces/IKCallback";
import {
    ImageKitOptions,
    CreateCustomMetadataFieldOptions,
    CustomMetadataField,
    UpdateCustomMetadataFieldOptions,
    GetCustomMetadataFieldsOptions,
} from "../interfaces";

const create = function (createCustomMetadataFieldOptions: CreateCustomMetadataFieldOptions, defaultOptions: ImageKitOptions, callback?: IKCallback<CustomMetadataField>) {
    const { name, label, schema } = createCustomMetadataFieldOptions;
    if (!name || !name.length) {
        respond(true, errorMessages.CMF_NAME_MISSING, callback);
        return;
    }

    if (!label || !label.length) {
        respond(true, errorMessages.CMF_LABEL_MISSING, callback);
        return;
    }

    if (!schema) {
        respond(true, errorMessages.CMF_SCHEMA_MISSING, callback);
        return;
    }

    if (!schema.type) {
        respond(true, errorMessages.CMF_SCHEMA_INVALID, callback);
        return;
    }

    var requestOptions = {
        url: "https://api.imagekit.io/v1/customMetadataFields",
        method: "POST",
        json: {
            name,
            label,
            schema
        },
    };

    request(requestOptions, defaultOptions, callback);
};

const list = function (
    getCustomMetadataFieldsOptions: GetCustomMetadataFieldsOptions,
    defaultOptions: ImageKitOptions,
    callback?: IKCallback<CustomMetadataField[]>,
) {
    const { includeDeleted = false } = getCustomMetadataFieldsOptions || {};
    var requestOptions = {
        url: "https://api.imagekit.io/v1/customMetadataFields",
        method: "GET",
        qs: { includeDeleted }
    };

    request(requestOptions, defaultOptions, callback);
};

const update = function (fieldId: string, updateCustomMetadataFieldOptions: UpdateCustomMetadataFieldOptions, defaultOptions: ImageKitOptions, callback?: IKCallback<CustomMetadataField>) {
    if (!fieldId || typeof fieldId !== "string" || !fieldId.length) {
        respond(true, errorMessages.CMF_FIELD_ID_MISSING, callback);
        return;
    }

    const { label, schema } = updateCustomMetadataFieldOptions;
    if (!label && !schema) {
        respond(true, errorMessages.CMF_LABEL_SCHEMA_MISSING, callback);
        return;
    }

    var requestBody: UpdateCustomMetadataFieldOptions = {};
    if (label) requestBody.label = label;
    if (schema) requestBody.schema = schema;

    var requestOptions = {
        url: `https://api.imagekit.io/v1/customMetadataFields/${fieldId}`,
        method: "PATCH",
        json: requestBody
    };

    request(requestOptions, defaultOptions, callback);
};

const deleteField = function (
    fieldId: string,
    defaultOptions: ImageKitOptions,
    callback?: IKCallback<void>,
) {
    if (!fieldId || typeof fieldId !== "string" || !fieldId.length) {
        respond(true, errorMessages.CMF_FIELD_ID_MISSING, callback);
        return;
    }
    var requestOptions = {
        url: `https://api.imagekit.io/v1/customMetadataFields/${fieldId}`,
        method: "DELETE",
    };

    request(requestOptions, defaultOptions, callback);
};

export default { create, list, update, deleteField };
