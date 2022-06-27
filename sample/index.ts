import ImageKit from "../index";

const CONFIG_OPTIONS = {
  publicKey: "your_public_api_key",
  privateKey: "your_private_api_key",
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
};

const imagekit = new ImageKit(CONFIG_OPTIONS);

// imagekit.createCustomMetadataField({
//   label: "test", name: "test", schema: {
//     type: "Text",
//     minLength: 1,
//     maxLength: 5
// } })