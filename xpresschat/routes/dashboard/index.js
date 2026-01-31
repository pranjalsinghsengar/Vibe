import { Router } from "express"
import { authenticateUser } from "../../middleware/jwt.js";
import { getDashboardDetails, GetMediaById } from "./controller/index.js"
const dashboardRouter = Router()
dashboardRouter.get("/alldata", authenticateUser, getDashboardDetails)
// dashboardRouter.get("/alldata/v2", authenticateUser, getDashboardDetailsV2)
dashboardRouter.get("/getMediaById", authenticateUser, GetMediaById)
export default dashboardRouter