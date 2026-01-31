import { Router } from "express";
import { createContentPrice,uploadToGCP} from "./controller/index.js";
import {handleFileUpload} from "./helper/index.js"
const contentRouter = Router()
contentRouter.post("/create",createContentPrice)
contentRouter.post("/imageupload",handleFileUpload, uploadToGCP)
export default contentRouter;