import React from "react";
import { GoDot } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const AddPopUp = ({
  children,
  removePopUp,
  Background,
  className,
  width,
  height,
  closeButton,
  closeButtonClassName,
  maxHeight,
  cardContainerClassName,
}) => {
  return (
    <div
      className={`fixed inset-0 h-screen flex items-center justify-center z-20 ${cardContainerClassName} `}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/50" // Increased opacity for better overlay
        onClick={removePopUp}
      ></div>
      {/* {closeButton !== "false" && (
        <div
          className={`absolute right-5 hidden sm:block top-5 -mt-3  -mr-3  z-50`}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer bg-white hover:bg-gray-100 ${closeButtonClassName}`}
            onClick={removePopUp}
          >
            <RxCross2 className="text-lg" />
          </div>
        </div>
      )} */}

      {/* Popup container */}

      <div
        className={`relative z-60 w-11/12  rounded-xl p-4   ${Background ? Background : "bg-white shadow"
          } ${className}   ${width ? width : " md:max-w-[50rem]"}`} //apply "md" when change Width
        style={{
          height: height ? height : "80%",
          maxHeight: maxHeight ? maxHeight : "",
        }}
      >
        {closeButton !== "false" && (
          <div
            className={`absolute bottom-full right-0  mb-1  md:left-full  md:top-0  `}
          >
            <div
              className={`flex items-center justify-center md:w-8 w-5 md:h-8 h-5 rounded-lg md:rounded-xl ml-1 cursor-pointer bg-white hover:bg-gray-100 ${closeButtonClassName}`}
              onClick={removePopUp}
            >
              <RxCross2 className="text-sm md:text-lg" />
            </div>
          </div>
        )}
        <div className="overflow-auto w-full h-full">{children}</div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, onClick, color }) => (
  <div
    className="text-center w-full border rounded-xl cursor-pointer flex justify-between items-center px-3 py-3"
    onClick={onClick}
  >
    <p className="text-sm md:text-base font-semibold flex items-center gap-2  capitalize">
      <GoDot />
      {label}
    </p>
    <p
      className={` font-semibold text-gray-800 px-5 rounded-full text-xs md:text-sm`}
      style={{ backgroundColor: color }}
    >
      {value}
    </p>
  </div>
);
const confirmation = ({ isOpen, onClose, onConfirm, message, loading, loadingTitle, title, }) => {
  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-2 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 flex flex-col justify-evenly items-center aspect-square">
        <div className="w-36">
          <img src="/confirmationBackground.jpg" />
        </div>
        <div className=" ">
          <h2 className="text-lg font-semibold">Confirmation</h2>
        </div>
        <div className="w-[70%] mx-auto">
          <p className="text-gray-500 font-medium text-center">{message}</p>
        </div>
        <div className="flex justify-end gap-4 ">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ?
              <> <svg
                aria-hidden="true"
                role="status"
                className="inline w-3 h-3 lg:w-4 lg:h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg> {loadingTitle}
              </>
              : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Card = { AddPopUp, StatCard, confirmation };

export default Card;
