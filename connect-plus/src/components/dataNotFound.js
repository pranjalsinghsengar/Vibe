import React from 'react'

const page = ({ label }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center flex flex-col justify-center items-center p-2 md:p-8 max-w-lg  rounded-lg">
        <img src='/dataNotFoundGrey.png' className='w-24 h-auto mb-5'/>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-slate-600">
          Data Not Found
        </h1>
        <p className="text-lg text-gray-400 mb-6">
          We couldn't find any information for the {label}.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="border border-gray-200 text-sm md:text-base text-slate-600 hover:text-slate-800 px-4 md:px-6 py-2 rounded hover:border-gray-800 transition">
            Go Back
          </button>
          <button className="border border-gray-200 text-sm md:text-base text-slate-600 hover:text-slate-800 px-4 md:px-6 py-2 rounded hover:border-gray-800 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};
const container = ({ label }) => {
  return (
    <p className="text-lg text-gray-400 mb-6 text-center my-5">
      We couldn't find any information for the {label}.
    </p>
  );
};

const DataNotFound = { page, container };
export default DataNotFound