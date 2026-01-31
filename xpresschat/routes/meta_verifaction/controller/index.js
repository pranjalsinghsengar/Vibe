import axios from "axios";

const graph = axios.create({
    baseURL: `https://graph.facebook.com/v21.0`,
    timeout: 10000
});

export const exchangeCodeForToken = async (req, res) => {

    const { code, app_id, app_secret, wabaId, phoneNumberId }= req.body
    const url = `https://graph.facebook.com/v21.0/oauth/access_token`;

    const { data } = await axios.get(url, {
        params: {
            client_id: app_id,
            client_secret: app_secret,
            code
        }
    });

    console.log("console log >>>>>>>>>>>>>>>>>>>>>", data);
    const businessToken = data.access_token

    await subscribeWaba(code, app_id, app_secret, wabaId, phoneNumberId, businessToken)
    return data.access_token;
};

/**
 * STEP 2: Subscribe App to WABA Webhooks
 */
export const subscribeWaba = async (code, app_id, app_secret, wabaId, phoneNumberId, businessToken) => {
    const { data } = await graph.post(
        `/${wabaId}/subscribed_apps`,
        {},
        {
            headers: {
                Authorization: `Bearer ${businessToken}`
            }
        }
    );

   await registerPhoneNumber(phoneNumberId, businessToken)
};

/**
 * STEP 3: Register Business Phone Number
 */
export const registerPhoneNumber = async (
    phoneNumberId,
    businessToken,

) => {
    const { data } = await graph.post(
        `/${phoneNumberId}/register`,
        {
            messaging_product: "whatsapp",
            pin:'581203'
        },
        {
            headers: {
                Authorization: `Bearer ${businessToken}`,
                "Content-Type": "application/json"
            }
        }
    );
    console.log(
        "data test>>>>>><<<<<<<<<",data
    );
    return data;
};

/**
 * STEP 4: Send Test Message
 */
export const sendTestMessage = async (
    phoneNumberId,
    businessToken,
    to,
    body
) => {
    const { data } = await graph.post(
        `/${phoneNumberId}/messages`,
        {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to,
            type: "text",
            text: { body }
        },
        {
            headers: {
                Authorization: `Bearer ${businessToken}`,
                "Content-Type": "application/json"
            }
        }
    );

    return data;
};