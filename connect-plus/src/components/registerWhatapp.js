export default function WhatsAppSenderInfo() {
    return (
      <div className="">
        <div className="w-full border border-gray-200">

            {/* WhatsApp Registration Info */}
            <div className="p-5 bg-white text-gray-700  shadow-sm">
              <h2 className="font-semibold text-gray-900">Register a WhatsApp Sender</h2>
              <p className="mt-2 text-gray-700">
                You can test WhatsApp using a shared sender and predefined message templates. However, to send live traffic, you must
                register a WhatsApp sender with Meta. Ensure you have:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li><span className="font-semibold">Verified phone number:</span> Use a number not linked to any other WhatsApp account. You can buy a number during registration.</li>
                <li><span className="font-semibold">Facebook Business Account:</span> You need a Facebook business account with administrator access.</li>
                <li><span className="font-semibold">Display name:</span> Choose a name that follows WhatsApp policies. This will be visible to recipients.</li>
              </ul>
              <p className="mt-2 text-gray-700">
                Once registered, your sender will be active within 30 minutes, though initial limitations may apply until WhatsApp approves your account.
              </p>
              <p className="mt-2 text-gray-700">
                For added credibility, verify your business after registering your sender.
              </p>
            </div>
  
            {/* Register Button */}
            <div className="flex mt-3 mb-3 px-2">
              <button className="px-5 py-2 hover:bg-secondary hover:text-primary border border-secondary text-secondary text-sm  bg-primary focus:outline-none">
                Register Sender
              </button>
            </div>
          </div>
      </div>
    );
  }
  