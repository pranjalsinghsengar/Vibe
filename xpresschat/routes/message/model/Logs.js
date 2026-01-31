import mongoose from "mongoose";

const LogsSchema = new mongoose.Schema({
    conf_id: { type: String },
    tenant_id: { type: String },
    user_name: { type: String },
    account_id: { type: String },
    user_id: { type: String },
    request_intent: { type: String },
    request_type: { type: String },
    request_id: { type: String },
    requestContent_type: { type: String },
    requestContent_value: { type: String },
    requestLocal_timestamp: { type: String },
    request_timestamp: { type: String },
    response_id: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    source: { type: String },
    body_payload: { type: Object },
    conversation_id: { type: String },
    responseLocal_timestamp: { type: String },
    requestResposnse_interval: { type: String },
    response: { type: Object },
    response_intent: { type: Object },
    response_status: { type: String },
    updatedAt_timestamp: { type: String }
});

export default mongoose.model("logs", LogsSchema);
