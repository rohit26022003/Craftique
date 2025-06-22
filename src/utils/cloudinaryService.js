import axios from "axios";

const cloudName = "dzwef3uto";
const uploadPreset = "nqogh9cn";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );
  return response.data.secure_url;
};

export const deleteImageFromCloudinary = async (publicId) => {
  const response = await axios.delete(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      data: {
        public_id: publicId,
      },
    }
  );
  return response.data;
};

export const getPublicIdFromUrl = (url) => {
  const regex = /\/([^/]+)\.jpg$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

