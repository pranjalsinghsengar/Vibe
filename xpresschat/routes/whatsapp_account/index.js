import { Router } from "express";
import { createAccount, getTenantDetails, get_testing_api_key, getAllAccount, getAccoundbyId, AccountListByAdmin, updateAccountById } from "./controller/index.js";
import { authenticateUser } from "../../middleware/jwt.js";
const wAccountRouter = Router();

wAccountRouter.post("/create", authenticateUser, createAccount);
wAccountRouter.get("/get", authenticateUser, getAllAccount);
wAccountRouter.get("/testing_api_key", get_testing_api_key);
wAccountRouter.get("/get/:id", authenticateUser, getAccoundbyId);
wAccountRouter.put("/update/:id", authenticateUser, updateAccountById );
wAccountRouter.get("/accountListbyAdmin", authenticateUser, AccountListByAdmin)
// tenantRouter.post("/get", getTenantDetails);


export default wAccountRouter;
