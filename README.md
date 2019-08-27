NodeJS package that wraps [ImageKit.io](https://imagekit.io "ImageKit.io") upload APIs and URL builder logic with easy to use interfaces.

ImageKit.io provides ready-to-use image optimisation servers along with dedicated image storage, global CDN, on-the-fly image transformation like resize, crop, rotate directly from the URL and image uploads.

By using [ImageKit](https://imagekit.io "ImageKit"), you can experience about 30% improvement in page load time thanks to the tons of image optimizations that work out of the box without you putting in any effort. Migrating to ImageKit is super simple and takes just a few minutes with our Plug-and-Play technology. Images are delivered across the globe using a CDN ensuring lightning fast experience for your users.

## Installation

`npm install imagekit`

## Sample 

```
var ImageKit = require('imagekit');

var imagekit = new ImageKit({
   "imagekitId" : "demo",       
   "apiKey" : "myapikey",       
   "apiSecret" : "myapisecret", 
});

/*
    Returns
    https://demo.imagekit.io/img/tr:h-100,w-200,cm-resize:b-5_FF0000/default-image.jpg
*/
var url = imagekit.image("default-image.jpg")
              .transform({HEIGHT : 100, WIDTH : 200, CROP_MODE : "resize"})
              .transform({BORDER : "5_FF0000"})
              .url();


/*
    Uploads an image with the name my-image in the folder /images in your storage
 */
var uploadPromise = imagekit.upload(imageAsBase64String, {
                                "filename" : "my-image",
                                "folder" : "/images"
                            });

/*
    Uploads an image by specifying the HTTP URL
 */
var uploadPromise = imagekit.uploadViaURL("http://www.example.com/image.jpg", {
                                "filename" : "my-image",
                                "folder" : "/images"
                            });  
                            
uploadPromise.then(function(resp) {
    //handle upload success here    
}, function(err) {
    //handle upload failure here
});

/*
    Delete an image by specifying the image path that is returned in respone of upload API
 */
var deletePromise = imagekit.deleteFile("images/my-image.jpg");  
                            
deletePromise.then(function(resp) {
    //handle delete success here    
}, function(err) {
    //handle delete failure here
});
                      
/*
  Purge an image URL
*/
var purgePromise = imagekit.purgeFile("https://ik.imagekit.io/yourimagekitId/images/my-image.jpg");  
                          
purgePromise.then(function(resp) {
  //handle purge success here    
}, function(err) {
  //handle purge failure here
});

/*
    List uploaded files in media library.

    Provide skip and limit as paramters
 */
var listMediaFiles = imagekit.listUploadedMediaFiles(0,1000);
                            
listMediaFiles.then(function(resp) {
    //handle array of results
}, function(err) {
    //handle failure here
});

```

## Initialising the module
```
var ImageKit = require('imagekit');

var imagekit = new ImageKit({
   "imagekitId" : "demo",         /* required */
   "apiKey" : "myapikey",         /* required */
   "apiSecret" : "myapisecret",   /* required */
   "useSubdomain" : false,
   "useSecure" : false
});

```
### imagekitId (required, String)
The unique ID that is selected by you to uniquely identify your account and images. This can be accessed from the `Settings` section of your dashboard

### apiKey and apiSecret (required, String)
Key pair that is created when you register on ImageKit. The two keys can be accessed from the `Settings` section of your dashboard

*Do not share your API Secret with anyone or any client device.*

### useSubdomain (optional, Boolean)
*Default:* `false`

If set to `true`, your ImageKit ID will be used as the subdomain of the URL. If your ImageKit ID is `demo`, then the URL would begin with `http://demo.imagekit.io`. This works only for paid accounts. If set to `false`, the ImageKit ID is used in te URL path with the default subdomain `http://ik.imagekit.io/demo`.

### useSecure (option, Boolean)
*Default:* `false`

If set to `true` uses `https` protocol for the the generated image fetch URLs. Default is `http` protocol for image fetch URLs.
This setting impacts only the image fetch URLs. Image upload is done over `https` internally.

## Creating image URLs and HTML

An image instance has to be created before it can be subject to transforms or turned into a URL or HTML. The image instance is made up of the image name that has to be fetched and other optional parameters.

```
  /* without optional params */
  var img = imagekit.image('default-image.jpg');

  /* with optional params */
  var img = imagekit.image('default-image.jpg', { "pattern" : "image" });
```

### Optional parameters for image instance
  
**pattern** 
*Default* : "img"

The URL pattern which has to be used to fetch the image. URL patterns help identify the original sources of the image. You can read more about patterns and sources in [ImageKit Documentation](https://docs.imagekit.io "ImageKit Docs")

### Transforms in image URL

All transforms that are available in ImageKit can be added by using the `transform` function. The `transform` function works on an image instance.

Input to `transform` function is a key-value map with the transformation name as the key against the transformation value. Transformation name is passed in capital letters.


```
  var img = imagekit.image('default-image.jpg')
                    .transform({HEIGHT: 200, WIDTH: 100});
```

The transformation names are as follows

HEIGHT, WIDTH, QUALITY, CROP, CROP_MODE, FOCUS, FORMAT, ROUDED_CORNER, BORDER, ROTATION, BLUR, NAMED, OVERLAY_IMAGE, 
OVERLAY_X, OVERLAY_Y, OVERLAY_FOCUS, BACKGROUND, PROGRESSIVE, COLOR_PROFILE, METADATA

The documentation for these transformations can be found at [ImageKit Documentation](https://docs.imagekit.io "ImageKit Docs").

[Chained transformations](https://docs.imagekit.io "Chained Transformations") can be obtained by chaining calls to `transform` function

```
  var img = imagekit.image('default-image.jpg')
                    .transform({HEIGHT: 200, WIDTH: 100})
                    .transform({BORDER : "10_FF0000"})
                    .transform({ROTATE : 90})
```

### Output

The image instance or its transform can be used to generate the image URL or HTML with or without signature


**URL**

`.url()` function


```
  //generates an unsigned image URL.
  var img = imagekit.image('default-image.jpg')
                    .transform({HEIGHT: 200, WIDTH: 100})
                    .url();
```


**Signed URL**

`.signedUrl()` generates a signed URL of the image. Read more about [Signed URLs here](https://docs.imagekit.io "Signed URLs"). The function optionally accepts the expiry time in seconds after which the image URL will get expired. If no expiry time is specified then the signed URL does not expire (theoretically it does expire after an infinite time). Security using signatures can be enabled from your dashboard settings.

```
  //generates a URL that expires after 300 seconds and doesn't allow transformations to be changed
  var img = imagekit.image('default-image.jpg')
                    .transform({HEIGHT: 200, WIDTH: 100})
                    .signedUrl(300);
```


**HTML with unsigned URL**

`.html()` function gives the image tag with the unsigned URL. It optionally accepts an object where you can specify the `id` and the `className` to be given to the HTML tag. By default, `id` and `className` are considered empty.

`className` is a string which can contain multiple class names. Each class name is separated by a space

```
  //generates an HTML tag
  var img = imagekit.image('default-image.jpg')
                    .transform({HEIGHT: 200, WIDTH: 100})
                    .html({id : "my-image", className : "class1 class2 class3"});
```


**HTML with signed URL**

`.signedHtml()` is same as the `.html()` function except that it uses the signed URL for the image and to generate the signed URL accepts an additional optional parameter `expirySeconds`

```
  //generates an HTML tag
  var img = imagekit.image('default-image.jpg')
                    .transform({HEIGHT: 200, WIDTH: 100})
                    .html({id : "my-image", className : "class1 class2 class3", expirySeconds : 300});
```

By default, if `expirySeconds` is not specified, then the signed URL does not expire

## Uploading Images using base64

Images can be uploaded to your ImageKit Media Library using the `.upload()` function. The `.upload()` function accepts two arguments - the image to be uploaded and an additional object with different upload options.

The image to be uploaded should be passed as a `base64` encoded string.

```
var ImageKit = require('imagekit');

var imagekit = new ImageKit({
   "imagekitId" : "demo",       
   "apiKey" : "myapikey",       
   "apiSecret" : "myapisecret", 
});

/*
    Uploads an image with the name my-image in the folder /images in your storage
 */
var uploadPromise = imagekit.upload(imageAsBase64String, {
                                "filename" : "my-image",
                                "folder" : "/images"
                            });
                            
uploadPromise.then(function(resp) {
    //handle upload success here    
}, function(err) {
    //handle upload failure here
});
                            

```

## Uploading Images using remote HTTP URL

Images can be uploaded to your ImageKit Media Library using the `.uploadViaURL()` function. The `.uploadViaURL()` function accepts two arguments - the remote HTTP URL of the image to be uploaded and an additional object with different upload options.

```
var ImageKit = require('imagekit');

var imagekit = new ImageKit({
   "imagekitId" : "demo",       
   "apiKey" : "myapikey",       
   "apiSecret" : "myapisecret", 
});

/*
    Uploads an image by specifying the HTTP URL
 */
var uploadPromise = imagekit.uploadViaURL("http://www.example.com/image.jpg", {
                                "filename" : "my-image",
                                "folder" : "/images"
                            });
                            
uploadPromise.then(function(resp) {
    //handle upload success here    
}, function(err) {
    //handle upload failure here
});
                            

```

### Upload Options

**filename** (String, required)

The name with which the file has to be uploaded. You *should* inculde the file extension in the filename field.

**useUniqueFilename** (Boolean, optional)

Default value is true. 

Setting this field to true, adds a unique alphanumeric string at the end of the filename specified in the previous field (and before the file extension), to ensure that even if you already have a file with the same name in your media library, you don't override it accidentally.

**folder** (String, optional)
*Default:* "/"

Used to specify the folder in which the file has to be uploaded. By default it will be uploaded in the root of your media library. Folder names are relative to the root "/". For example if you want to upload the image in `files` folder of your media library, then the value of this parameter should be `/files`.

```
  var uploadPromise = imagekit.upload(<base64ImageString>, {
      "filename" : 'mysampleimage.jpg',
      "folder" : "/images"
  });
```

Both `.upload()` and `.uploadViaURL()` function returns a Promise that will be resolved on successful upload and rejected on any error (validation or server errors).

### Successful upload output

```
{
  "imagePath": "images/mysampleimage_BJyuWdf0.jpg",
  "size": 51198,
  "height": 300,
  "width": 444
}
```

The `size` is in bytes and `height` and `width` are in pixels. You can use the value of `imagePath` and use the `.image()` function of the SDK (mentioned above) to get the image URL as per requirement. The image is accessible immediately after upload.

### Failed upload

```
{
  "exception": true,
  "statusNumber": 1400,
  "statusCode": "BAD_REQUEST",
  "message": "Invalid file format"
}
```

You can read about the various `statusNumbers` and `statusCodes` in case of upload failure in the [Upload Documentation](https://docs.imagekit.io "Upload Documentation"). Apart from the generic status codes for upload, the SDK sends the following status codes in case validation or error occurs at SDK level itself.

| Status Codes   | Status Number | Meaning                                                            |
| ---------------|:-------------:| -------------------------------------------------------------------|
| BAD_REQUEST    |   2400        | Missing filename, ImageKit ID, API Secret or Key during upload     |
| SERVER_ERROR   |   2500        | Internal error while sending out upload request                    |


## Working Demo

A working demo for image fetch and upload is available in the `demo` folder. Run `npm install` in the root folder. Then in demo folder, in the file `server.js` update the module initialization parameters - ImageKit ID, API Key and Secret. These parameters can be obtained from your ImageKit dashboard after sign up. 

The demo server creates two routes - a sample page accessible at `http://localhost:3456/demo-page.html` to test image fetch and a `POST` api route `/rest/api/upload` that accepts a single file in the parameter `image` and uploads it to `/images` folder. You can try other endpoints as well.



## Change Log

### Version 1.5.0

npm audit fixes

### Version 1.4.3

Removed default URL endpoint setting

### Version 1.4.2

Fixed 1403 "ACCESS_FORBIDDEN" error.

### Version 1.4.0

Added wrapper for list media files API - https://docs.imagekit.io/?shell#get-media-library-file

### Version 1.3.0

Added support for upload file via remote HTTP URL, purging image on CDN, deleting image from media library.

### Version 1.0.7

Added support for new transforms in the URL like color profile, progressive JPEG, metadata, background.

### Version 1.0.8

Fix the base URL for image upload

### Version 1.1.0

Use the updated signature-related query parameters

### Version 1.2.0

Added support for upload image via remote HTTP URL
