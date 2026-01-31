import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    conf_id: { type: String },
    tenant_id: { type: String },
    account_id: { type: String },
    conversation_id: { type: String },
    user_id: { type: String },
    request_type: { type: String },
    request_id: { type: String },
    requestContent_type: { type: String },
    requestContent_value: { type: String },
    start_Local_timestamp: { type: String },
    request_timestamp: { type: String },
    segmentation: { type: String },
    response_id: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    source: { type: String },
    body_payload: { type: Object },
    end_Local_timestamp: { type: String },
    start_end_interval: { type: String },
    response: { type: Object },
    response_status: { type: String },
    updatedAt_timestamp: { type: String },
    resolved_by: { type: String },
    escalated_to_human: { type: Boolean, default: false },
    abandoned: { type: Boolean, default: true },
    thumbs_up: { type: Boolean, default: false },
    thumbs_down: { type: Boolean, default: false },
    feedback_given: { type: Boolean, default: false },
    agent_conversationId: { type: String }
});

export default mongoose.model("conversations", ConversationSchema);
