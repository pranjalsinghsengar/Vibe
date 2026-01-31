// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
//   {
//     tenant: {
//       tenantId: { type: String },
//       tenantName: { type: String },
//       tenantObjId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Tenant",
//       },
//     },

//     sender: {
//       senderId: { type: String },
//       senderName: { type: String },
//       senderObjId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "",
//       },
//     },

//     receivers: [ {
//       senderId: { type: String },
//       senderName: { type: String },
//       senderObjId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Sender",
//       },}],

//     content: { type: String, required: true }, // Message content

//     status: {
//       type: String,
//       enum: ["sent", "delivered", "read", "failed"],
//       default: "sent",
//     }, // Message status tracking

//     replyTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Message",
//       default: null,
//     },

//     isGroupMessage: { type: Boolean, default: false },

//     attachments: [
//       {
//         url: { type: String },
//         fileType: { type: String },
//       },
//     ],

//     deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Message", messageSchema);

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    tenant: {
      tenantId: { type: String },
      tenantName: { type: String },
      tenantObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },
    },

    sender: {
      senderId: { type: String }, // For guest users, a unique ID like session ID
      senderName: { type: String }, // Guest user name or 'Guest' label
      senderPhone: { type: String },
      senderEmail: { type: String },
      senderObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to the user if registered, can be null for guest
        default: null,
      },
    },

    receivers: [
      {
        receiverId: { type: String },
        receiverName: { type: String },
        receiverPhone: { type: String },
        receiverEmail: { type: String },
        receiverObjId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    content: { type: String, required: true },

    status: {
      type: String,
      enum: ["sent", "delivered", "read", "failed"],
      default: "sent",
    },

    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    attachments: [
      {
        url: { type: String },
        fileType: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);

export default Message;
