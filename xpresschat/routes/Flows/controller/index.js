import Flow from "../model/Flow.js"
import Node from "../model/Node.js"
import Edge from "../model/Edge.js"
import { generateFlowId } from "../helper/index.js"
export const deleteFlow = async (req, res) => {
  try {
    // const tenantId = await generateTenantId();
    console.log(">>>>>>333", req.headers, req.user, req.whatsapp_account)

    const { flow } = req.body
    const flow_id = flow.id
    const flow_data = await Flow.deleteOne({ uniqueid: flow_id })
    const node_data = await Node.deleteMany({ flow_id: flow_id })
    const edge_data = await Edge.deleteMany({ flow_id: flow_id })
    if (flow_data.acknowledged == true, node_data.acknowledged == true, edge_data.acknowledged == true)
      return res.status(200).json({ success: true, message: 'Flow deleted successfully' });
    else
      return res.status(404).json({ success: false, message: 'Flow not Found' });
    console.log(flow_data, node_data, edge_data)



  } catch (error) {
    console.error("Error creating tenant or superadmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const createFlow = async (req, res) => {
  try {
    // const tenantId = await generateTenantId();
    console.log(">>>>>>333", req.headers, req.user, req.whatsapp_account)
    const { nodes, edges, flow } = req.body
    let flow_id, newFlow

    if (!flow.id) {
      if (flow.status == 'active') {
        const result = await Flow.updateMany({ account_id: req.whatsapp_account.id }, {
          $set: {
            status: "in-active"
          }
        })
      }

      flow_id = await generateFlowId()
      newFlow = new Flow({
        uniqueid: flow_id,
        name: flow.name,
        account_id: req.whatsapp_account.id,
        status: flow.status,
        body_payload: req.body,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log(">>>>", newFlow)
      await newFlow.save();
      //   return
    }
    else {
      flow_id = flow.id
      const updatedFlow = await Flow.updateOne({ uniqueid: flow_id }, { body_payload: req.body, status: flow.status })
      // const flow_data=await Flow.deleteOne({uniqueid: flow_id})
      const node_data = await Node.deleteMany({ flow_id: flow_id })
      const edge_data = await Edge.deleteMany({ flow_id: flow_id })
    }


    for (const node of nodes) {
      const newNode = new Node({
        uniqueid: node.id,
        account_id: req.whatsapp_account.id,
        type: node.questionType,
        content: node,
        metadata: node,
        flow_id: flow_id,

      });

      await newNode.save();
    }
    const newEdge = new Edge({
      account_id: req.whatsapp_account.id,
      from_node: "0",
      to_node: edges[0].source,
      flow_id: flow_id,

    });

    await newEdge.save();
    for (const edge of edges) {
      const newEdge = new Edge({
        account_id: req.whatsapp_account.id,
        from_node: edge.source,
        to_node: edge.target,
        flow_id: flow_id,

      });

      await newEdge.save();
    }

    return res.status(201).json({
      success: true,
      message: "Node Edge and flow saved successfully",
      flow: newFlow
    });
    return

    const {
      username, //avinash
      email, //avinash@gmail.com
      tenantname,//0clik
      phone,//9856743567
      password,//admin@12345
      address,//{"name":"John Doe","line1":"123 Main Street","line2":"Apt 4B","city":"New York","province":"New York","zip":"10001","country":"United States","province_code":"NY","country_code":"US"}
      server_domain, //http://localhost:
      features,
      preferences,//{"language":"en","timeZone":"UTC","referralCode":"ABC123XYZ"}
      billing,//{"paymentMethod":"paypal","billingCycle":"annually"}
      status,//{"status":"active"}
    } = req.body;

    console.log(JSON.stringify(req.body));
    // Validate required fields
    if (!username || !email || !password || !tenantname) {
      return res.status(400).json({
        success: false,
        message:
          "username, email, password, and tenantname details are required.",
      });
    }

    // Find the tenant
    const tenant = await configuration.findOne({ email: email });
    if (tenant) {
      return res.status(400).json({
        success: false,
        message: "an account with this email already exists {Tenant}",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "an account with this email already exists {User}",
      });
    }

    // Create the tenant
    const tenantId = await generateTenantId();
    console.log(tenantId);
    const newTenant = new configuration({
      id: tenantId,
      name: tenantname,
      email,
      phone,
      address: address,
      server_domain: server_domain,
      status: status || "active",
    });

    console.log("newTenant", newTenant);

    await newTenant.save();

    // Hash password for the superadmin
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let userId = await generateUserId();

    // Create Superadmin user for the tenant
    const superadminUser = new User({
      id: userId,
      name: username,
      email,
      phone,
      password: hashedPassword,
      userType: "superadmin",
      tenant: {
        tenantObjId: newTenant?._id,
        tenantId: newTenant?.id,
        tenantName: newTenant?.name,
      },
      address,
      permissions: [],
      priceChart: {}

    });

    await superadminUser.save();

    // Assign admin details to the tenant
    newTenant.admin = {
      adminName: superadminUser?.name,
      adminId: superadminUser?.id,
      adminObjId: superadminUser?._id,
      adminEmail: superadminUser?.email,
      adminPhone: superadminUser?.phone,
    };
    await newTenant.save();

    return res.status(201).json({
      success: true,
      message: "Tenant and Superadmin user created successfully",
      tenant: newTenant,
      user: superadminUser,
    });
  } catch (error) {
    console.error("Error creating tenant or superadmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getFlows = async (req, res) => {
  try {
    // const tenantId = await generateTenantId();
    console.log(">>>>>>333", req.headers, req.user, req.whatsapp_account)
    const flows = await Flow.find({ account_id: req.whatsapp_account.id });
    const data = []
    for (let i of flows) {
      i.body_payload.flow.id = i.uniqueid
      i.body_payload.flow.status = i.status
      data.push(i.body_payload)
    }



    return res.status(200).json({
      success: true,
      message: "Flows fetched successfully",
      data,
    });

  } catch (error) {
    console.error("Error creating tenant or superadmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};