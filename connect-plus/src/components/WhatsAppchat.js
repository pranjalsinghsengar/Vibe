// import { use, useState, useEffect } from "react";
// import axios from "axios";
// import { apiurl } from "../config/config";
// export default function WhatsAppChat() {
//   let api_key = localStorage.getItem("api_key");
//   const [recipient, setRecipient] = useState("");
//   const [sender, setSender] = useState("");
//   const [template, setTemplate] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!recipient || !sender || !template) {
//       alert("All fields are required.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const payload = {
//         moblie_number: sender,
//         customer_name: recipient,
//         template_name: template,
//         language_code: "en",
//       };
//       const response = await axios.post(`${apiurl}/api/whatsapp/message/template`, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           "api_key": api_key,
//         },
//       });
//       setLoading(false);
//       console.log("Message sent successfully:", response.data);
//     } catch (error) {
//       console.error("Error sending message:", error.response?.data || error.message);
//     }
//   };

//   console.log("api_key What", api_key);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-50 to-blue-50 p-6">
//       <div className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-xl border border-gray-200">
//         <div className="space-y-5">
//           {/* Recipient Selection */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">Recipients</label>
//             <input type="field" value={recipient} className="mt-2 w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" placeholder="Sender Name" onChange={(e) => setRecipient(e.target.value)} />
//           </div>

//           {/* Sender Input */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">Sender</label>
//             <input
//               type="text"
//               value={sender}
//               onChange={(e) => setSender(e.target.value)}
//               className="mt-2 w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
//               placeholder="Ex: Mobile No: +91 447860099299"
//             />
//           </div>

//           {/* WhatsApp Template Selection */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">WhatsApp Template Name</label>
//             <select
//               value={template}
//               onChange={(e) => setTemplate(e.target.value)}
//               className="mt-2 w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="">Select Template</option>
//               <option value="inficonnect_welcome1">Inficonnect_welcome1</option>
//             </select>
//           </div>

//           {/* Message Preview */}
//           <div className="p-5 bg-gray-50 rounded-lg text-gray-700 border border-gray-300">
//             <p className="text-sm font-semibold">Preview</p>
//             <p className="mt-2 text-gray-900">
//               Hi {recipient || "{First Name}"}, Welcome to the whatsapp service of inficonnect.
//               This is the testing template 👍!.
//             </p>
//           </div>

//           {/* Send Button */}
//           <button className="hover:bg-secondary hover:text-primary border border-secondary text-secondary text-sm  bg-primary w-full font-medium p-2 rounded-lg shadow-md flex justify-center items-center"
//             onClick={sendMessage}
//             disabled={loading}
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
//                 viewBox="0 0 24 24"
//               ></svg>
//             ) : (
//               "Send Message"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





















import { use, useState, useEffect } from "react";
import axios from "axios";
import { apiurl } from "../config/config";
export default function WhatsAppChat() {
  let api_key = localStorage.getItem("api_key");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!recipient || !sender || !template) {
      alert("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        // moblie_number: sender,
        // customer_name: recipient,
        // template_name: template,
        // language_code: "en",

        // "messaging_product": "whatsapp",
        // "to": `91${sender}`,
        // "type": "template",
        // "template": {
        //   "name": "hello_world",
        //   "language": {
        //     "code": "en_US"
        //   }

        // }
        
          "messaging_product": "whatsapp",    
           
          "to":  `91${sender}`,
          "type": "text",
          "text": {
              "body": recipient
          }
      
      };
      // const response = await axios.post(`${apiurl}/api/whatsapp/message/template`, payload, {
      const response = await axios.post(`https://graph.facebook.com/v20.0/480518401812550/messages?access_token=EAARsuNQCI1UBOwlg9eHWTmYPikk8iKuOC4mPZCUvFfjgk2Op1ZCd1WqwYoRuZBbfDBSnZAbePtpgSmrmxW8PKqH1sqtaXhyyHv7dobJ1hRAGPrEiNPEphYcn79YW66r9ZAO3ER3qDC0ejblkLLtAz8besFRomTpRek8SmDnihjbCSCALiQ7y8AMIcLS7lpdCIEQZDZD`, payload, {
        headers: {
          "Content-Type": "application/json",
          // "api_key": api_key,
          // 'Authorization' : "Bearer EAAPh4vtaoRcBO39hUKlwPkdMZAmRkU9nbtwQZBHW0r3qN0sJJivH6841vgo7zNNz0yZB4Yy4xMa79vEb4NULxsFzGJoZBA6e1XmM2qDsX1zRL952dJEXZAOcBPZCWlZBd0CA5rZCBhuOGsVCMSDtKv1IHKxQV8ddtAzHx4hs7WfbXRLufZBtVZALjRnCsRtrx72ZC1X8UiFwOP4AZBQjt31xfaLBfIJAkRce0m2VjPYZD"
        },
      });
      setLoading(false);
      console.log("Message sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  console.log("api_key What", api_key);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-50 to-blue-50 p-6">
      <div className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-xl border border-gray-200">
        <div className="space-y-5">
          {/* Recipient Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700">Send Message</label>
            <input type="field" value={recipient} className="mt-2 w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400" placeholder="Type Message" onChange={(e) => setRecipient(e.target.value)} />
          </div>

          {/* Sender Input */}
          <div>
            <label className="text-sm font-medium text-gray-700">Sender</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="mt-2 w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
              placeholder="Ex: Mobile No: +91 447860099299"
            />
          </div>

          {/* WhatsApp Template Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700">WhatsApp Template Name</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="mt-2 w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Template</option>
              <option value="inficonnect_welcome1">Inficonnect_welcome1</option>
            </select>
          </div>

          {/* Message Preview */}
          {/* <div className="p-5 bg-gray-50 rounded-lg text-gray-700 border border-gray-300">
            <p className="text-sm font-semibold">Preview</p>
            <p className="mt-2 text-gray-900">
              Hi {recipient || "{First Name}"}, Welcome to the whatsapp service of inficonnect.
              This is the testing template 👍!.
            </p>
          </div> */}

          {/* Send Button */}
          <button className="hover:bg-secondary hover:text-primary border border-secondary text-secondary text-sm  bg-primary w-full font-medium p-2 rounded-lg shadow-md flex justify-center items-center"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

