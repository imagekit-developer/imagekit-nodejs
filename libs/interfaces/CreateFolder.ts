export interface CreateFolderOptions {
    /**
     * The folder will be created with this name. All characters except alphabets and numbers (inclusive of unicode letters, marks, and numerals in other languages) will be replaced by an underscore i.e. _.
     */
    folderName: string;
    /**
     * The folder where the new folder should be created, for root use / else the path e.g. containing/folder/.
     * Note: If any folder(s) is not present in the parentFolderPath parameter, it will be automatically created. For example, if you pass /product/images/summer, then product, images, and summer folders will be created if they don't already exist.
     */
    parentFolderPath: string;
}