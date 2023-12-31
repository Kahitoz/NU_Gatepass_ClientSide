// G1_MessageModal.js
import React from "react";

const G1_MessageModal = ({ title, message, closeModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
        <div className="bg-background border border-black w-4/12 p-6 rounded-md">
          <h1 className="text-xl font-bold mb-4 text-center">{title}</h1>
          <p className={"m-2 p-1 rounded-md w-full text-center"}>{message}</p>
          <div className="flex justify-center">
            <button
              className="m-2 p-2 bg-blue-500 text-white"
              onClick={() => closeModal()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default G1_MessageModal;
