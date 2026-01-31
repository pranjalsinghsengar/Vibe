import mongoose from "mongoose";

const resetPwd = new mongoose.Schema(
  {
    id: {
        type: String,
        required: true,
        unique: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },
  },
  { timestamps: true }
);

resetPwd.index({ email: 1 }, { unique: true });

const resetPwdModel = mongoose.model("resetPwd", resetPwd);

export default resetPwdModel;
