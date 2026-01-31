import { Router } from "express";
import {
    createFlow, getFlows, deleteFlow

} from "./controller/index.js";
import { authenticateUser } from "../../middleware/jwt.js"
import { authentication } from "../middleware/authMiddleware.js"
const flowRouter = Router();

flowRouter.post("/create", authenticateUser, authentication, createFlow);
flowRouter.post("/delete", authenticateUser, authentication, deleteFlow);
flowRouter.get("/getFlows", authenticateUser, authentication, getFlows)
// flowRouter.post("/get", getTenantDetails);


export default flowRouter;