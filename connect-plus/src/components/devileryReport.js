import { use, useState, useEffect } from "react";
import axios from "axios";
import { apiurl } from "../config/config";

export default function deliveryReport() {

  return (
    <div className="p-6">
          {/* Message Preview */}
          <div className="p-5  border border-gray-300">
            <h3 className="text-lg  mt-2">No delivery logs available to view</h3>
            <p className="mt-2 text-gray-900">Return to the previous step to send a test message</p>
          </div>
          {/* Send Button */}
            <button className="hover:bg-secondary hover:text-primary border border-secondary text-secondary text-sm  bg-primary  font-medium p-2 shadow-md mt-5">Continue</button>
    </div>
  );
}
