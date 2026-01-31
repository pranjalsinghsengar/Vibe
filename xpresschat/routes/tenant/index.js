import { Router } from "express";
import {
  createTenantWithSuperadmin,
  getTenantDetails,
} from "./controller/index.js";

const tenantRouter = Router();

tenantRouter.post("/create", createTenantWithSuperadmin);
tenantRouter.post("/get", getTenantDetails);


export default tenantRouter;
