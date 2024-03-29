export interface DeleteFileVersionOptions {
    /**
   * The unique fileId of the uploaded file. fileId is returned in list files API and upload API.
   */
    fileId: string;
    /**
     * The unique versionId of the uploaded file's version. This is returned in list files API and upload API as id within the versionInfo parameter.
     */
    versionId: string;
}

export interface RestoreFileVersionOptions {
    /**
   * The unique fileId of the uploaded file. fileId is returned in list files API and upload API.
   */
    fileId: string;
    /**
     * The unique versionId of the uploaded file's version. This is returned in list files API and upload API as id within the versionInfo parameter.
     */
    versionId: string;
}