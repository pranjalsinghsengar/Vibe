import { Router } from "express";
const shopifyRouter = Router()

import { placeShopifyOrder,syncShopifyProducts } from "./controller/shopifyController.js";

shopifyRouter.post("/createShopifyOrder",placeShopifyOrder)
shopifyRouter.get("/syncShopifyProduct",syncShopifyProducts)

export default shopifyRouter;