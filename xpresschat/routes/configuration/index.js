import { Router } from "express";
import {
  createConfiguration,
  getTenantDetails, getConfiguration
} from "./controller/index.js";
import { authenticateUser } from "../../middleware/jwt.js";
import { authorizeMasterAdminUser } from "../../middleware/authorize.js"
const tenantRouter = Router();

tenantRouter.post("/create", authenticateUser, authorizeMasterAdminUser, createConfiguration);
tenantRouter.get("/theme_data", getConfiguration)
// tenantRouter.post("/get", getTenantDetails);


export default tenantRouter;
