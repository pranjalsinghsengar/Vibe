import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    tenant: {
      tenantId: { type: String },
      tenantName: { type: String },
      tenantObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },
    },
    subject: { type: String },
    category: { type: String },
    subcategory: { type: String },
    description: { type: String },
    status: {
      type: String,
      enum: [
        "Open",
        "Resolved",
        "Pending",
        "Assigned",
        "Cancelled",
        "Close",
        "Hold",
        "Completed",
      ],
      default: "Pending",
    },
    assignee: {
      userName: { type: String },
      userId: { type: String },
      userObjId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date },
    },
    assignor: {
      userName: { type: String },
      userId: { type: String },
      userObjId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date },
    },
    resolver: {
      userName: { type: String },
      userId: { type: String },
      userObjId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date },
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    notes: [
      {
        addedBy: {
          userName: { type: String },
          userId: { type: String },
          userObjId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
        content: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    feedback: {
      rating: { type: Number, min: 1, max: 5 }, // Customer rating
      comments: { type: String }, // Customer comments
    },
    log: [
      {
        action: { type: String }, // e.g., "Status changed", "Assigned to user"
        performedBy: {
          userName: { type: String },
          userId: { type: String },
          userObjId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

ticketSchema.pre("save", function (next) {
  if (this.assignee.user && !this.assignee.timestamp) {
    this.assignee.timestamp = Date.now();
  }
  if (this.assignor.user && !this.assignor.timestamp) {
    this.assignor.timestamp = Date.now();
  }
  if (this.resolver.user && !this.resolver.timestamp) {
    this.resolver.timestamp = Date.now();
  }
  if (this.notes.content && !this.notes.timestamp) {
    this.notes.timestamp = Date.now();
  }
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
