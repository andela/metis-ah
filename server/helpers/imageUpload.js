import cloudinary from 'cloudinary';
import { cloudinaryConfig } from '../config/cloudinary/cloudinaryConfig';
/**
 * @description This function uploads images to cloudinary
 * @param  {object} file The image uri to be uploaded
 * @param  {object} res http response object
 * @param {object} fields The request body
 * @returns {object} returns the response object cloudinary which contains the image url
 */
const imageUpload = (file, res, fields) => {
  // INITIALIZES CLOUDINARY LOCAL CONFIGURATIONS
  cloudinaryConfig();
  return cloudinary.v2.uploader.upload(file.content, (error, result) => {
    if (error) {
      return res.status(500).jsend.fail({
        message: 'Something, went wrong. please try again',
        error: error.message,
        formData: fields,
      });
    }
    return result;
  });
};

export default imageUpload;
