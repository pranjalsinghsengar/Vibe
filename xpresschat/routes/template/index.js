import { Router } from "express";
import { createAccount, getTenantDetails, get_testing_api_key, getAllAccount, getAccoundbyId, AccountListByAdmin, updateAccountById,deleteAccoundbyId,updateAccount } from "./controller/index.js";
import { authenticateUser } from "../../middleware/jwt.js";
const tempateRouter = Router();

tempateRouter.post("/create", authenticateUser, createAccount);
tempateRouter.post("/get", authenticateUser, getAllAccount);
// tempateRouter.get("/testing_api_key", get_testing_api_key);
tempateRouter.post("/update/:id", authenticateUser, updateAccount);
tempateRouter.post("/get/:id", authenticateUser, getAccoundbyId);
tempateRouter.post("/delete/:id", authenticateUser, deleteAccoundbyId);
// tempateRouter.put("/update/:id", authenticateUser, updateAccountById );
// tempateRouter.get("/accountListbyAdmin", authenticateUser, AccountListByAdmin)
// tenantRouter.post("/get", getTenantDetails);


export default tempateRouter;
