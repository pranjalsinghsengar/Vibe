import { Router } from "express";
import { assignTicket, createTicket, getMyTickets, getTicketById, getTicketsByTenantObjId, getTicketsByUserObjId } from "./controller/index.js";

const ticketRouter = Router();

ticketRouter.post("/create", createTicket);
ticketRouter.post("/assign", assignTicket);
ticketRouter.post("/get/:ticketObjId", getTicketById);
ticketRouter.post("/get", getTicketsByTenantObjId);
ticketRouter.post("/get/assignee", getTicketsByUserObjId);
// ticketRouter.post("/create", create);
// ticketRouter.post("/get/all", getAllTickets);
// ticketRouter.post("/update", updateTicketsById);
// ticketRouter.post("/report", reportMasterData);

export default ticketRouter;
