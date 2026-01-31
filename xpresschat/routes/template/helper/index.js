// import Tenant from "../model/index.js";

export const generateTenantId = async () => {
  // const tenant = await Tenant.findOne().sort({ id: -1 });
  let tenant=null

  if (tenant) {
    return parseInt(tenant?.id) + 1;
  }
  return 30001;
};
