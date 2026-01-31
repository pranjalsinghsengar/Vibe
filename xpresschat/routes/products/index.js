import { Router } from "express";
import {
  Bulkcreate,
  getTenantDetails,
} from "./controller/index.js";

const productRouter = Router();

productRouter.post("/bulkcreate", Bulkcreate);
productRouter.post("/get", getTenantDetails);


export default productRouter;
