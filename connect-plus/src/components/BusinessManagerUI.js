import { useState } from "react";

export default function BusinessManagerUI() {
  const [loading, setLoading] = useState(false);

  const handleAction = (action) => {
    setLoading(true);
    setTimeout(() => {
      alert(`${action} completed!`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex gap-3 justify-between bg-gray-50 text-sm py-6 px-4 rounded-lg">
        {[
          {
            title: "Complete Your Profile",
            description: "Add your business logo and description to increase brand trustworthiness.",
            action: "Profile Completed",
            buttonText: "Complete Profile",
          },
          {
            title: "Explore Message Types",
            description: "Learn more about the difference between message templates and free-form messages.",
            action: "Templates Discovered",
            buttonText: "Discover Templates",
          },
          {
            title: "Send a Broadcast",
            description: "Keep the conversation going through our one-way communication interface.",
            action: "Broadcast Sent",
            buttonText: "Go to Broadcast",
          },
        ].map((item, index) => (
          <div key={index} className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl mb-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <button
              onClick={() => handleAction(item.action)}
              disabled={loading}
              className="mt-4  px-4 py-2  rounded-md hover:bg-secondary hover:text-primary border border-secondary text-secondary text-sm  bg-primary transition"
            >
              {loading ? "Processing..." : item.buttonText}
            </button>
          </div>
        ))}

      </div>
      <div className="flex mb-3 mt-3 px-2">
        <button className="px-5 py-2 hover:bg-secondary hover:text-primary border border-secondary text-secondary text-sm  bg-primary focus:outline-none">
          DONE
        </button>
        
      </div>
    </div>
  );
}
