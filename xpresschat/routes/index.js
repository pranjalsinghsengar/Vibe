import express from "express";
import tenantRouter from "./tenant/index.js";
import configurationRouter from "./configuration/index.js"
import userRouter from "./user/index.js";
import messageRouter from "./message/index.js";
import ticketRouter from "./ticket/index.js";
import accountRouter from "./whatsapp_account/index.js"
import whatsappRouter from "./whatsapp/index.js";
import contentRouter from "./msg_content/index.js"
import flowRouter from "./Flows/index.js";
import LeadRouter from "./Lead/index.js"
import dashboardRouter from "./dashboard/index.js";
import productRouter from "./products/index.js"
import walletRouter from "./wallet/index.js"
import chargesRouter from "./charges/index.js"
import shopifyRouter from "./shopify_orders/index.js";
import meta_verification from "./meta_verifaction/index.js";
import paymentRouter from "./payment/index.js"
import templateRouter from "./template/index.js";
let mainRouter = express.Router();

mainRouter.use("/tenant", tenantRouter);
mainRouter.use("/configuration", configurationRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/message", messageRouter);
mainRouter.use("/ticket", ticketRouter);
mainRouter.use("/account", accountRouter)
mainRouter.use("/whatsapp", whatsappRouter)
mainRouter.use("/content", contentRouter)
mainRouter.use("/flow", flowRouter)
mainRouter.use("/Lead", LeadRouter)
mainRouter.use("/dashboard", dashboardRouter)
mainRouter.use("/product", productRouter)
mainRouter.use("/wallet", walletRouter);
mainRouter.use("/shopify", shopifyRouter);
mainRouter.use('/verified', meta_verification)
mainRouter.use('/charges',chargesRouter)
mainRouter.use('/payment',paymentRouter)
mainRouter.use('/template',templateRouter)
export default mainRouter;
