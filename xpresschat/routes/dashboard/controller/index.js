import Logs from "../../message/model/Logs.js"
import User from "../../user/model/index.js"
import WhatsappAccount from "../../whatsapp_account/model/index.js"
import Conversation from "../../message/model/conversation.js"
import axios from "axios"
// export const getDashboardDetailsV2 = async (req, res) => {
//     try {
//         if (!req.query.startDate || !req.query.endDate) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Both startDate and endDate are required."
//             });
//         }
//         const startDate = new Date(req.query.startDate); // Replace with your desired date
//         const endDate = new Date(req.query.endDate);
//         const startOfDay = new Date(startDate.setHours(0, 0, 0, 0));
//         const endOfDay = new Date(endDate.setHours(23, 59, 59, 999));
//         console.log(">>>>>>>11", startOfDay, endOfDay)
//         const userDetails = await User.findOne({ id: req.user.user_id }, { tenant: 1 })
//         const distinctUserCount = await Logs.distinct("user_id", { tenant_id: userDetails.tenant.tenantId }).then(userIds => userIds.length);
//         const distinctWhatsappAccountCount = await WhatsappAccount.distinct("id", { tenant_id: userDetails.tenant.tenantId }).then(userIds => userIds.length);
//         const AvgResponseTime = await Logs.aggregate([
//             {
//                 $match: {
//                     tenant_id: userDetails.tenant.tenantId,
//                     request_type: "messages",
//                     created_at: { $gte: startOfDay, $lte: endOfDay }
//                 }
//             },
//             {
//                 $addFields: {
//                     numericDuration: { $toDouble: "$requestResposnse_interval" }
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     averageDuration: { $avg: "$numericDuration" }
//                 }
//             }
//         ]);

//         const top_query = await Logs.aggregate([
//             {
//                 $match: {
//                     tenant_id: userDetails.tenant.tenantId,
//                     request_type: "messages",
//                     requestContent_value: { $ne: null },
//                     created_at: { $gte: startOfDay, $lte: endOfDay }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$requestContent_value",
//                     count: { $sum: 1 }
//                 }
//             },
//             { $sort: { count: -1 } },
//             { $limit: 10 }
//         ]);

//         console.log(">>>>>>>>>>>>>.", AvgResponseTime, top_query)


//         const average = AvgResponseTime[0]?.averageDuration || 0;
//         const totalCount = await Conversation.countDocuments({ tenant_id: userDetails.tenant.tenantId });
//         const numberOfConversations = await Conversation.aggregate([
//             {
//                 $match: {
//                     tenant_id: userDetails.tenant.tenantId,
//                     created_at: { $gte: startOfDay, $lte: endOfDay }
//                 }
//             },
//             {
//                 $addFields: {
//                     interval_as_number: {
//                         $toDouble: "$start_end_interval"
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     total_conversations: { $sum: 1 },
//                     average_interval: { $avg: "$interval_as_number" }
//                 }
//             }
//         ]);

//         const percent = (count) => totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) + "%" : "0%";
//         const count = await Conversation.countDocuments({
//             abandoned: true,
//             thumbs_up: true,
//             thumbs_down: true,
//             feedback_given: true
//         });

//         const [abandonedCount, thumbsUpCount, thumbsDownCount, feedbackGivenCount, escalatedToHumanCount] = await Promise.all([
//             Conversation.countDocuments({ abandoned: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//             Conversation.countDocuments({ thumbs_up: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//             Conversation.countDocuments({ thumbs_down: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//             Conversation.countDocuments({ feedback_given: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//             Conversation.countDocuments({ escalated_to_human: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//         ]);

//         return res.status(200).send({ sucess: true, data: { User: distinctUserCount, Whatsapp_Account: distinctWhatsappAccountCount, Average_response_time: average / 1000, Top_Query: top_query, conversations: { total: numberOfConversations.length > 0 ? numberOfConversations[0].total_conversations : 0, average_conversation_time: numberOfConversations.length > 0 ? numberOfConversations[0].average_interval / 60000 : 0, abandonedCount: { count: abandonedCount, percentage: percent(abandonedCount) }, thumbsUpCount: { count: thumbsUpCount, percentage: percent(thumbsUpCount) }, thumbsDownCount: { count: thumbsDownCount, percentage: percent(thumbsDownCount) }, feedbackGivenCount: { count: feedbackGivenCount, percentage: percent(feedbackGivenCount) }, escalatedToHumanCount: { count: escalatedToHumanCount, percentage: percent(escalatedToHumanCount) } } } })
//     } catch (error) {
//         console.error("Error creating tenant or superadmin:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// }

export const getDashboardDetails = async (req, res) => {
    try {
        if (!req.query.startDate || !req.query.endDate) {
            return res.status(400).json({
                success: false,
                message: "Both startDate and endDate are required."
            });
        }

        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);
        const startOfDay = new Date(startDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(endDate.setHours(23, 59, 59, 999));

        const userDetails = await User.findOne({ id: req.user.user_id }, { tenant: 1 });
        const tenantId = userDetails.tenant.tenantId;

        // Aggregate data by date
        const conversationData = await Conversation.aggregate([
            {
                $match: {
                    tenant_id: tenantId,
                    created_at: { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$created_at" }
                    },
                    total_conversations: { $sum: 1 },
                    escalated_to_human: {
                        $sum: { $cond: [{ $eq: ["$escalated_to_human", true] }, 1, 0] }
                    },
                    thumbs_up: {
                        $sum: { $cond: [{ $eq: ["$thumbs_up", true] }, 1, 0] }
                    },
                    thumbs_down: {
                        $sum: { $cond: [{ $eq: ["$thumbs_down", true] }, 1, 0] }
                    },
                    feedback_given: {
                        $sum: { $cond: [{ $eq: ["$feedback_given", true] }, 1, 0] }
                    },
                    abandoned: {
                        $sum: { $cond: [{ $eq: ["$abandoned", true] }, 1, 0] }
                    },
                    ticket: {
                        $sum: { $cond: [{ $eq: ["$ticket", true] }, 1, 0] }
                    },
                    average_conversation_time: {
                        $avg: { $toDouble: "$start_end_interval" } // In milliseconds
                    }
                }
            },
            {
                $sort: { _id: 1 } // Sort by date ascending
            },
            {
                $project: {
                    date: "$_id",
                    total_conversations: 1,
                    escalated_to_human: 1,
                    thumbs_up: 1,
                    thumbs_down: 1,
                    feedback_given: 1,
                    abandoned: 1,
                    ticket: 1,
                    average_conversation_time: { $divide: ["$average_conversation_time", 60000] }, // Convert to minutes
                    cost: 1,
                    _id: 0
                }
            }
        ]);

        // Existing aggregations for other metrics
        const distinctUserCount = await Logs.distinct("user_id", { tenant_id: tenantId }).then(userIds => userIds.length);
        const distinctWhatsappAccountCount = await WhatsappAccount.distinct("id", { tenant_id: tenantId }).then(userIds => userIds.length);

        const AvgResponseTime = await Logs.aggregate([
            {
                $match: {
                    tenant_id: tenantId,
                    request_type: "messages",
                    created_at: { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $addFields: {
                    numericDuration: { $toDouble: "$requestResposnse_interval" }
                }
            },
            {
                $group: {
                    _id: null,
                    averageDuration: { $avg: "$numericDuration" }
                }
            }
        ]);

        const top_query = await Logs.aggregate([
            {
                $match: {
                    tenant_id: tenantId,
                    request_type: "messages",
                    requestContent_value: { $ne: null },
                    created_at: { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $group: {
                    _id: "$requestContent_value",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        const average = AvgResponseTime[0]?.averageDuration || 0;
        const totalCount = await Conversation.countDocuments({ tenant_id: tenantId });

        const [abandonedCount, thumbsUpCount, thumbsDownCount, feedbackGivenCount, escalatedToHumanCount] = await Promise.all([
            Conversation.countDocuments({ abandoned: true, tenant_id: tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
            Conversation.countDocuments({ thumbs_up: true, tenant_id: tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
            Conversation.countDocuments({ thumbs_down: true, tenant_id: tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
            Conversation.countDocuments({ feedback_given: true, tenant_id: tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
            Conversation.countDocuments({ escalated_to_human: true, tenant_id: tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
        ]);

        const percent = (count) => totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) + "%" : "0%";

        return res.status(200).json({
            success: true,
            data: {
                User: distinctUserCount,
                Whatsapp_Account: distinctWhatsappAccountCount,
                Average_response_time: average / 1000,
                Top_Query: top_query,
                conversations: {
                    total: conversationData.reduce((sum, day) => sum + day.total_conversations, 0),
                    abandonedCount: { count: abandonedCount, percentage: percent(abandonedCount) },
                    thumbsUpCount: { count: thumbsUpCount, percentage: percent(thumbsUpCount) },
                    thumbsDownCount: { count: thumbsDownCount, percentage: percent(thumbsDownCount) },
                    feedbackGivenCount: { count: feedbackGivenCount, percentage: percent(feedbackGivenCount) },
                    escalatedToHumanCount: { count: escalatedToHumanCount, percentage: percent(escalatedToHumanCount) }
                },
                dashboardMatrics: conversationData
            }
        });
    } catch (error) {
        console.error("Error in getDashboardDetailsV2:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
// export const getDashboardDetails = async (req, res) => {
//     try {
//         if (!req.query.startDate || !req.query.endDate) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Both startDate and endDate are required."
//             });
//         }
//         const startDate = new Date(req.query.startDate); // Replace with your desired date
//         const endDate = new Date(req.query.endDate);
//         const startOfDay = new Date(startDate.setHours(0, 0, 0, 0));
//         const endOfDay = new Date(endDate.setHours(23, 59, 59, 999));
//         console.log(">>>>>>>11", startOfDay, endOfDay)
//         const userDetails = await User.findOne({ id: req.user.user_id }, { tenant: 1 })
//         const distinctUserCount = await Logs.distinct("user_id", { tenant_id: userDetails.tenant.tenantId }).then(userIds => userIds.length);
//         const distinctWhatsappAccountCount = await WhatsappAccount.distinct("id", { tenant_id: userDetails.tenant.tenantId }).then(userIds => userIds.length);
//         const AvgResponseTime = await Logs.aggregate([
//             {
//                 $match: {
//                     tenant_id: userDetails.tenant.tenantId,
//                     request_type: "messages",
//                     created_at: { $gte: startOfDay, $lte: endOfDay }
//                 }
//             },
//             {
//                 $addFields: {
//                     numericDuration: { $toDouble: "$requestResposnse_interval" }
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     averageDuration: { $avg: "$numericDuration" }
//                 }
//             }
//         ]);

//         const top_query = await Logs.aggregate([
//             {
//                 $match: {
//                     tenant_id: userDetails.tenant.tenantId,
//                     request_type: "messages",
//                     requestContent_value: { $ne: null },
//                     created_at: { $gte: startOfDay, $lte: endOfDay }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$requestContent_value",
//                     count: { $sum: 1 }
//                 }
//             },
//             { $sort: { count: -1 } },
//             { $limit: 10 }
//         ]);

//         console.log(">>>>>>>>>>>>>.", AvgResponseTime, top_query)


//         const average = AvgResponseTime[0]?.averageDuration || 0;
//         const totalCount = await Conversation.countDocuments({ tenant_id: userDetails.tenant.tenantId });
//         const numberOfConversations = await Conversation.aggregate([
//             {
//                 $match: {
//                     tenant_id: userDetails.tenant.tenantId,
//                     created_at: { $gte: startOfDay, $lte: endOfDay }
//                 }
//             },
//             {
//                 $addFields: {
//                     interval_as_number: {
//                         $toDouble: "$start_end_interval"
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     total_conversations: { $sum: 1 },
//                     average_interval: { $avg: "$interval_as_number" }
//                 }
//             }
//         ]);

//         const percent = (count) => totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) + "%" : "0%";
//         const count = await Conversation.countDocuments({
//             abandoned: true,
//             thumbs_up: true,
//             thumbs_down: true,
//             feedback_given: true
//         });

//         const [abandonedCount, thumbsUpCount, thumbsDownCount, feedbackGivenCount, escalatedToHumanCount] = await Promise.all([
//             Conversation.countDocuments({ abandoned: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//             Conversation.countDocuments({ thumbs_up: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//             Conversation.countDocuments({ thumbs_down: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//             Conversation.countDocuments({ feedback_given: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//             Conversation.countDocuments({ escalated_to_human: true, tenant_id: userDetails.tenant.tenantId, created_at: { $gte: startOfDay, $lte: endOfDay } }),
//         ]);

//         return res.status(200).send({ sucess: true, data: { User: distinctUserCount, Whatsapp_Account: distinctWhatsappAccountCount, Average_response_time: average / 1000, Top_Query: top_query, conversations: { total: numberOfConversations.length > 0 ? numberOfConversations[0].total_conversations : 0, average_conversation_time: numberOfConversations.length > 0 ? numberOfConversations[0].average_interval / 60000 : 0, abandonedCount: { count: abandonedCount, percentage: percent(abandonedCount) }, thumbsUpCount: { count: thumbsUpCount, percentage: percent(thumbsUpCount) }, thumbsDownCount: { count: thumbsDownCount, percentage: percent(thumbsDownCount) }, feedbackGivenCount: { count: feedbackGivenCount, percentage: percent(feedbackGivenCount) }, escalatedToHumanCount: { count: escalatedToHumanCount, percentage: percent(escalatedToHumanCount) } } } })
//     } catch (error) {
//         console.error("Error creating tenant or superadmin:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// }

export const GetMediaById = async (req, res) => {
    try {
        // const id = req.query.id
        console.log(">>>>>>>>>93", req.user)
        // return res.statusCode(200)
        const account_data = await WhatsappAccount.findOne({
            id: req.query.account_id
        })
        const { PHONE_NUMBER_ID, meta_api_access_token } = account_data
        const metaRes = await axios({
            method: "GET",
            url: `https://graph.facebook.com/v19.0/${req.query.media_id}`,
            headers: {
                Authorization: `Bearer ${meta_api_access_token}`,
            },
        });

        console.log(">>>>>>>>>>>>>", metaRes.data)
        // return res.statusCode(200)
        const mediaUrl = metaRes.data.url;
        console.log(">>>>>>>>>>mediaUrl", mediaUrl)
        const mediaRes = await axios.get(mediaUrl, {
            headers: {
                Authorization: `Bearer ${meta_api_access_token}`,
            },
            responseType: 'stream',
        });
        res.setHeader('Content-Type', mediaRes.headers['content-type']);
        res.setHeader('Content-Length', mediaRes.headers['content-length']);

        mediaRes.data.pipe(res);

    } catch (error) {
        console.error("Error creating tenant or superadmin:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
