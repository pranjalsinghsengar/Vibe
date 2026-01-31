import  mongoose from "mongoose";

const apiRequestLogSchema = new mongoose.Schema(
  {
    service: {
      type: String, // payment-service, webhook-service
      required: true,
    },

    endpoint: {
      type: String, // /api/payment/create-order
      required: true,
    },

    method: {
      type: String, // POST, GET
      required: true,
    },

    headers: {
      type: Object, // full req.headers
    },

    body: {
      type: Object, // full req.body
    },

    query: {
      type: Object, // req.query
    },

    params: {
      type: Object, // req.params
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    }
  },
  {
    timestamps: true,
    strict: false, // 🔥 allows ANY extra fields
  }
);

const ApiRequestLog = mongoose.model("ApiRequestLog", apiRequestLogSchema);
export default ApiRequestLog