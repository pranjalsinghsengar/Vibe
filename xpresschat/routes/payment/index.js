import { Router } from "express";
import {
  createpayment,
  getTenantDetails, getConfiguration,makePayment,updatePaymentbyId, getpayment, deletePaymentbyId,verifyPayment,paymentWebhook
} from "./controller/index.js";
import { authenticateUser } from "../../middleware/jwt.js";
import { authorizeSuperAdminUser, authorizeMasterAdminUser } from "../../middleware/authorize.js"
import { verify } from "crypto";
const tenantRouter = Router();

tenantRouter.post("/create",authenticateUser, authorizeSuperAdminUser,createpayment);
tenantRouter.post("/get",authenticateUser, authorizeSuperAdminUser,getpayment);
tenantRouter.post("/makepayment",authenticateUser,makePayment)
tenantRouter.post("/verify",authenticateUser,verifyPayment)
tenantRouter.post("/payment-webhook",paymentWebhook)
tenantRouter.post("/updatebyId",authenticateUser, authorizeSuperAdminUser,updatePaymentbyId);
tenantRouter.post("/deletebyId",authenticateUser, authorizeSuperAdminUser,deletePaymentbyId);
tenantRouter.get("/theme_data", getConfiguration)
// tenantRouter.post("/get", getTenantDetails);


export default tenantRouter;
