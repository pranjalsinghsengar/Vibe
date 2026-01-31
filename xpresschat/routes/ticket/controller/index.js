import Tenant from "../../tenant/model/index.js";
import User from "../../user/model/index.js";
import { generateTicketId } from "../helper/index.js";
import Ticket from "../model/index.js";

export const createTicket = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      subject,
      category,
      subcategory,
      description,
      tenantObjId,
    } = req.body;

    const tenant = await Tenant.findById(tenantObjId);
    if (!tenant) {
      return res
        .status(400)
        .json({ success: false, message: "Tenant not found" });
    }
    let ticketId = await generateTicketId();
    const ticket = new Ticket({
      id: ticketId,
      firstname,
      lastname,
      email,
      subject,
      category,
      subcategory,
      description,
      tenant: {
        tenantObjId: tenant?._id,
        tenantId: tenant?.id,
        tenantName: tenant?.name,
      },
    });

    await ticket.save();
    res
      .status(201)
      .json({ success: true, message: "Ticket created successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const assignTicket = async (req, res) => {
  try {
    const { ticketObjId, assignor, assignee } = req.body;

    const ticket = await Ticket.findById(ticketObjId);
    if (!ticket)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });

    const assignedTo = await User.findById(assignee?.userObjId);
    if (!assignee)
      return res
        .status(404)
        .json({ success: false, message: "assignee not found" });

    const assignedby = await User.findById(assignor?.userObjId);
    if (!ticket)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });

    ticket.assignor = {
      userId: assignedby?.id,
      userName: assignedby?.name,
      userObjId: assignedby?._id,
      timestamp: new Date(),
    };
    ticket.assignee = {
      userId: assignedTo?.id,
      userName: assignedTo?.name,
      userObjId: assignedTo?._id,
      timestamp: new Date(),
    };

    ticket.log.push({
      action: ` Ticket (${ticket?.id}) assigned to ${assignedTo?.name} (${assignedTo?.id}) by ${assignedby?.name} (${assignedby?.id})`,
      performedBy: {
        userId: assignedby?.id,
        userName: assignedby?.name,
        userObjId: assignedby?._id,
      },
      timestamp: new Date(),
    });

    await ticket.save();
    res.json({ message: "Ticket assigned successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const resolveTicket = async (req, res) => {
  try {
    const { userId, userName } = req.body;
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = "Resolved";
    ticket.resolvedby = {
      userId,
      userName,
      userObjId: new mongoose.Types.ObjectId(userId),
      timestamp: new Date(),
    };

    ticket.log.push({
      action: "Marked as Resolved",
      performedBy: {
        userId,
        userName,
        userObjId: new mongoose.Types.ObjectId(userId),
      },
      timestamp: new Date(),
    });

    await ticket.save();
    res.json({ message: "Ticket resolved successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const addNotes = async (req, res) => {
  try {
    const { userId, userName, content } = req.body;
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const note = {
      addedBy: {
        userId,
        userName,
        userObjId: new mongoose.Types.ObjectId(userId),
      },
      content,
      timestamp: new Date(),
    };

    ticket.notes.push(note);

    ticket.log.push({
      action: "Added a note",
      performedBy: {
        userId,
        userName,
        userObjId: new mongoose.Types.ObjectId(userId),
      },
      timestamp: new Date(),
    });

    await ticket.save();
    res.json({ message: "Note added successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, userId, userName } = req.body;
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = status;

    ticket.log.push({
      action: `Status changed to ${status}`,
      performedBy: {
        userId,
        userName,
        userObjId: new mongoose.Types.ObjectId(userId),
      },
      timestamp: new Date(),
    });

    await ticket.save();
    res.json({ message: "Status updated successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const changePriority = async (req, res) => {
  try {
    const { priority, userId, userName } = req.body;
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.priority = priority;

    ticket.log.push({
      action: `Priority changed to ${priority}`,
      performedBy: {
        userId,
        userName,
        userObjId: new mongoose.Types.ObjectId(userId),
      },
      timestamp: new Date(),
    });

    await ticket.save();
    res.json({ message: "Priority updated successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getTicketsByUserObjId = async (req, res) => {
  try {
    const { userObjId, tenantObjId } = req.body;

    if (!userObjId) {
      return res
        .status(404)
        .json({ success: false, message: "email not found" });
    }
    const tickets = await Ticket.find({ "assignee.userObjId":userObjId }).sort({ createdAt: -1 });

    if (!tickets) {
      return res
        .status(404)
        .json({ success: false, message: "Tickets not found" });
    }
    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTicketsByTenantObjId = async (req, res) => {
  try {
    const { tenantObjId ,page = 1, limit = 10 } = req.body;

    if (!tenantObjId) {
      return res
        .status(404)
        .json({ success: false, message: "tenantObjId not found" });
    }


    const tickets = await Ticket.find({ "tenant.tenantObjId":tenantObjId }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));

        // Get the total count for pagination info
        const totalTickets = await Ticket.countDocuments({ "tenant.tenantObjId":tenantObjId });

    if (!tickets) {
      return res
        .status(404)
        .json({ success: false, message: "Tickets not found" });
    }
    return res.status(200).json({
      success: true,
      pagination: {
        totalTickets,
        totalPages: Math.ceil(totalTickets / limit),
        currentPage: parseInt(page),
      },
      tickets: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "email not found" });
    }
    const tickets = await Ticket.find({ email: email }).sort({ createdAt: -1 });

    if (!tickets) {
      return res
        .status(404)
        .json({ success: false, message: "Tickets not found" });
    }
    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });

    if (!tickets) {
      return res
        .status(404)
        .json({ success: false, message: "Tickets not found" });
    }

    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { ticketObjId } = req.params;
    const ticket = await Ticket.findById(ticketObjId);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    return res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateTicketsById = async (req, res) => {
  try {
    const { _id, assignedTo, assignedby, resolvedby, notes, ...updateFields } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ticket ID" });
    }

    const updateData = { ...updateFields };

    if (assignedTo?.user) {
      updateData["assignedTo"] = {
        ...assignedTo,
        timestamp: assignedTo.timestamp || new Date(),
      };
    }

    if (assignedby?.user) {
      updateData["assignedby"] = {
        ...assignedby,
        timestamp: assignedby.timestamp || new Date(),
      };
    }

    if (resolvedby?.user) {
      updateData["resolvedby"] = {
        ...resolvedby,
        timestamp: resolvedby.timestamp || new Date(),
      };
    }

    if (notes?.content) {
      updateData["notes"] = {
        ...notes,
        timestamp: notes.timestamp || new Date(),
      };
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTicket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: updatedTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// export const reportMasterData = async (req, res) => {
//   try {
//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0); // Set to the start of the day

//     const todayEnd = new Date();
//     todayEnd.setHours(23, 59, 59, 999); // Set to the end of the day

//     const statuses = [
//       "Open",
//       "Resolved",
//       "Pending",
//       "Cancelled",
//       "Close",
//       "Hold",
//       "Completed",
//     ];

//     // Get total counts for all statuses
//     const totalCounts = await Ticket.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     // Get today's counts for all statuses
//     const todayCounts = await Ticket.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: todayStart, $lte: todayEnd },
//         },
//       },
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     // Format response
//     const formattedResponse = statuses.map((status) => {
//       const totalCount =
//         totalCounts.find((item) => item._id === status)?.count || 0;
//       const todayCount =
//         todayCounts.find((item) => item._id === status)?.count || 0;

//       return {
//         status,
//         total: totalCount,
//         today: todayCount,
//       };
//     });

//     res.status(200).json({ success: true, data: formattedResponse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const reportMasterData = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Set to the start of the day

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Set to the end of the day

    const statuses = [
      "Open",
      "Resolved",
      "Pending",
      "Cancelled",
      "Close",
      "Hold",
      "Completed",
    ];

    // Get total counts for all statuses
    const totalCounts = await Ticket.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get today's counts for all statuses
    const todayCounts = await Ticket.aggregate([
      {
        $match: {
          createdAt: { $gte: todayStart, $lte: todayEnd },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Format response as an object
    const formattedResponse = {};
    statuses.forEach((status) => {
      const totalCount =
        totalCounts.find((item) => item._id === status)?.count || 0;
      const todayCount =
        todayCounts.find((item) => item._id === status)?.count || 0;

      formattedResponse[status] = {
        total: totalCount,
        today: todayCount,
      };
    });

    res.status(200).json({ success: true, data: formattedResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
