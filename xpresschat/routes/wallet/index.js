import { Router } from "express";

import { rechargeRequest, uploadTransactionScreenshot, getUserTransactionHistory, createPlan, PlanListbySuperadmin, PlanListbyadmin, PlanDeletebySuperadmin, DetailsTransaction } from "./controller/index.js";

import { authenticateUser } from "../../middleware/jwt.js";
// import { authenticateUser } from "../../middleware/jwt.js";
import { authorizeSuperAdminUser, authorizeMasterAdminUser } from "../../middleware/authorize.js"
const walletRouter = Router();
// import { authenticateUser } from "../../middleware/jwt.js";
walletRouter.post("/recharge", authenticateUser, rechargeRequest);
walletRouter.post("/plan", authenticateUser, authorizeSuperAdminUser, createPlan)
walletRouter.get("/planlistbyadmin", authenticateUser, PlanListbyadmin)
walletRouter.get("/planlistbysuperadmin", authenticateUser, authorizeSuperAdminUser, PlanListbySuperadmin)
walletRouter.delete("/planbysuperadmin/:id", authenticateUser, authorizeSuperAdminUser, PlanDeletebySuperadmin)
// walletRouter.post("/plan", authenticateUser, authorizeSuperAdminUser, createPlan)
walletRouter.post("/uploadTransaction", uploadTransactionScreenshot)
walletRouter.get("/transactiondetails/:id", authenticateUser, authorizeSuperAdminUser, DetailsTransaction)
walletRouter.get("/history", getUserTransactionHistory);







export default walletRouter;