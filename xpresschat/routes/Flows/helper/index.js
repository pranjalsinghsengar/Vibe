import Flow from "../model/Flow.js"

export const generateFlowId= async () => {
    const tenant = await Flow.findOne().sort({ uniqueid: -1 });
     console.log(">>>>>>23456",tenant,tenant?.uniqueid)
    if (tenant) {
      return parseInt(tenant?.uniqueid) + 1;
    }
    return 50001;
  };