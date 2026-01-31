import { Router } from "express";
import { sendMessage, verify, sendTextMessage, sendImageMessage, sendTemplateMessage, sendLocation, sendintractiveList, sendintractiveButton, reuestLocation, welcomeSendTemplateMessage,sendreplyonMessageStatus,sendreplyonMessageText,sendreplyonMessageEmoji,sendreplyonMessageImg,sendreplyonMessageImgUrl } from "./controller/index.js";
import { authentication } from "./helper/index.js"
const messageRouter = Router();

// messageRouter.post("/webhook/:conf_id/:tenant_id/:account_id", sendMessage);
messageRouter.post("/webhook/:config_id", sendMessage);
// messageRouter.get("/webhook/:config_id/:tenant_id/:account_id", verify)
messageRouter.get("/webhook/:config_id", verify)
messageRouter.post("/text", authentication, sendTextMessage)
messageRouter.post("/image", authentication, sendImageMessage)
messageRouter.post("/welcometemplate", authentication, welcomeSendTemplateMessage)
messageRouter.post("/template", authentication, sendTemplateMessage)
messageRouter.post("/location", authentication, sendLocation)
messageRouter.post("/requestlocation", authentication, reuestLocation)
messageRouter.post("/interactiveList", authentication, sendintractiveList)
messageRouter.post("/interactiveButton", authentication, sendintractiveButton)
messageRouter.post("/replyonMessage/status", authentication, sendreplyonMessageStatus)
messageRouter.post("/replyonMessage/text", authentication, sendreplyonMessageText)
messageRouter.post("/replyonMessage/emoji", authentication, sendreplyonMessageEmoji)
messageRouter.post("/replyonMessage/image", authentication, sendreplyonMessageImg)
messageRouter.post("/replyonMessage/imageUrl", authentication, sendreplyonMessageImgUrl)
// messageRouter.get("/webhook",(req,res)=>{
//     console.log(">>>>>9 erbhook received")
// })
export default messageRouter;
