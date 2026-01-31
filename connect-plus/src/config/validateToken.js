import axios from "axios";
import { apiurl } from "./config.js";

export const validateToken = async (token) => {
  try {
    const config = {
      method: "post",
      maxBodyLength: Infinity,

      url: `${apiurl}/api/whatsapp/user/verifytoken`,
      // url: `https://api-inficonnect.fixall.ai/admin/v1/user/verifytoken`,
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    
    const response = await axios.request(config);

    if (response.data?.success === true) {
      return response.data;
    } else {
      throw new Error("Token validation failed - Response not successful");
    }
  } catch (error) {
    console.error("Token validation error:", error);
    throw new Error("Token validation failed");
  }
};
