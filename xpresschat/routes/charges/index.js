import { Router } from "express";

import { rechargeRequest, uploadTransactionScreenshot, getUserTransactionHistory, createcharge, chargeListbySuperadmin, chargeListbyadmin, chargeDeletebySuperadmin, DetailsTransaction } from "./controller/index.js";

import { authenticateUser } from "../../middleware/jwt.js";
// import { authenticateUser } from "../../middleware/jwt.js";
import { authorizeSuperAdminUser, authorizeMasterAdminUser } from "../../middleware/authorize.js"
const walletRouter = Router();
// import { authenticateUser } from "../../middleware/jwt.js";
walletRouter.post("/recharge", authenticateUser, rechargeRequest);
walletRouter.post("/create", authenticateUser, authorizeSuperAdminUser, createcharge)
walletRouter.post("/listbyadmin", authenticateUser, chargeListbyadmin)
walletRouter.post("/listbysuperadmin", authenticateUser, authorizeSuperAdminUser, chargeListbySuperadmin)
walletRouter.delete("/chargebysuperadmin/:id", authenticateUser, authorizeSuperAdminUser, chargeDeletebySuperadmin)
// walletRouter.post("/charge", authenticateUser, authorizeSuperAdminUser, createcharge)
walletRouter.post("/uploadTransaction", uploadTransactionScreenshot)
walletRouter.get("/transactiondetails/:id", authenticateUser, authorizeSuperAdminUser, DetailsTransaction)
walletRouter.get("/history", getUserTransactionHistory);







export default walletRouter;