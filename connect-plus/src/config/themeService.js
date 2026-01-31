import axios from "axios";
import { apiurl } from "./config";

// Fetch the theme from the API
export const fetchTheme = async (vendorObjId) => {
  try {
    const data = JSON.stringify({ vendorObjId });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiurl}/admin/v1/theme/get`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching theme:", error);
    throw error;
  }
};

// Update the theme via the API
export const updateTheme = async (themeData) => {
  try {

    console.log("themeData 29",themeData);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiurl}/admin/v1/theme/update`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(themeData),
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error updating theme:", error);
    throw error;
  }
};

export const fetchThemeAndVendor = async (vendorObjId) => {
  try {
    const data = JSON.stringify({ vendorObjId });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiurl}/api/vendor/details`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching theme:", error);
    throw error;
  }
};
