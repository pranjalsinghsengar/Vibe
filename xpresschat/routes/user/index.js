import { Router } from "express";
import {
  createUser,
  loginUser,
  verifyUserToken, updateRate, getUserbyId,
  updateConfiguration, getSuperadminList, getAdminList, getsuperadminInfo, getadminlistofsuperadmin,
  GetCustomerListByAdmin, UserHistory, getPendingRequests, approveRecharge, rechargeRequest, UpdateAccountDetails, SuperadminBankDetails, adminBankDetails, GetAllCustomerListByAdmin, getSuperUserbyId,
  updateSuperadminInfo
} from "./controller/index.js";
import { authenticateUser } from "../../middleware/jwt.js";
// import { authenticateUser } from "../../middleware/jwt.js";
import { authorizeSuperAdminUser, authorizeMasterAdminUser } from "../../middleware/authorize.js"
const userRouter = Router();

userRouter.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/verifytoken", authenticateUser, verifyUserToken);
userRouter.post("/update_price", updateRate)
userRouter.get("/user", authenticateUser, getUserbyId)
userRouter.get("/Superadminuser", authenticateUser, authorizeSuperAdminUser, getSuperUserbyId)
userRouter.post("/addtheme", authenticateUser, authorizeSuperAdminUser, updateConfiguration)
userRouter.post("/getsuperadminlist", authenticateUser, authorizeMasterAdminUser, getSuperadminList)
userRouter.post("/getadminlist", authenticateUser, authorizeSuperAdminUser, getAdminList)
userRouter.get("/getadminInfo", authenticateUser, getsuperadminInfo)
userRouter.put("/superadmin/update/:id", authenticateUser, updateSuperadminInfo)
userRouter.get("/getadminlistofsuperadmin", authenticateUser, authorizeMasterAdminUser, getadminlistofsuperadmin)
userRouter.get("/getCustomerListofadmin", authenticateUser, GetCustomerListByAdmin)
userRouter.get("/getAllCustomerListofadmin", authenticateUser, GetAllCustomerListByAdmin)
userRouter.get("/getCustomerHistory", authenticateUser, UserHistory)
userRouter.get("/pending-recharges", authenticateUser, authorizeSuperAdminUser, getPendingRequests)
userRouter.post("/update-bank_details", authenticateUser, authorizeSuperAdminUser, UpdateAccountDetails)
userRouter.get("/approve-transaction", authenticateUser, approveRecharge)
userRouter.post("/recharge", authenticateUser, rechargeRequest);
userRouter.get("/banking_detialsbysuperadmin", authenticateUser, authorizeSuperAdminUser, SuperadminBankDetails)
userRouter.get("/banking_detialsbyadmin", authenticateUser, adminBankDetails)
// userRouter.get("/getadminInfobymasteradmin", authenticateUser, authorizeMasterAdminUser, getadminInfo)
// userRouter.post("/get/all", getAllUserByVendorObjIdmAll);
// userRouter.post("/get", getAllUserByOrganizationObjId);
// userRouter.post("/get/store", getAllUserByVendorObjIdAndStoreObjId);
// userRouter.post("/get/:userObjId", getOrganizationUserById);
// userRouter.post("/update/:id", updateUser);
// userRouter.post("/master", getAllMasters);
// userRouter.delete("/delete/:userObjId", deleteUser);
// userRouter.post("/delete", deleteUsers);

// userRouter.post("/sendResetPasswordLink", sendResetPasswordLink);
// userRouter.post("/resetPassword", resetPassword);

export default userRouter;
