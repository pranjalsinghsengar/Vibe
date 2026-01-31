export default function WhatsAppSenderInfo() {
    return (
      <div className="flex">
        <div className="">
            {/* WhatsApp Funds Account Info */}
            <div className="p-5 bg-white rounded-lg text-gray-700 border border-gray-300 shadow-sm">
              <h2 className="font-semibold text-gray-900">Add Funds to Your Account</h2>
              <p className="mt-2 text-md text-gray-900">
                Taking the next step is easy. Add funds to your account to start connecting with your customers over WhatsApp.
              </p>
              <p className="mt-2 text-gray-700 text-sm">
                WhatsApp is charged per conversation, not per individual message. Conversations are 24-hour message threads between you and your customers.
                There are two main conversation types on WhatsApp: those started by your business (business-initiated), which you already tried in the first step,
                and those started by your customers (user-initiated).
              </p>
              <p className="mt-2 text-sm text-gray-700">
                For a detailed breakdown of how conversations are priced on WhatsApp, visit the <span className="text-blue-600 cursor-pointer">Pricing</span> page.
              </p>
            </div>
  
            {/* Register Button */}
            <div className="flex mb-3 mt-3 px-2">
              <button className="px-5 py-2 hover:bg-secondary hover:text-primary border border-secondary text-secondary text-sm  bg-primary focus:outline-none">
                ADD FUNDS
              </button>
            </div>
          </div>
      </div>
    );
  }
  