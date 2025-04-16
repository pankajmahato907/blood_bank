import React, { useState } from "react";

const RequestCard = ({ request }) => {
  const {
    name,
    phone,
    address,
    bloodGroup,
    note,
    requestForm,
    confirmed,
  } = request;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formImageURL = `http://localhost:3000/${requestForm.replace(/\\/g, "/")}`;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg border bg-white">
      <img
        className="w-full h-48 object-cover cursor-pointer"
        src={formImageURL}
        alt="Request Form"
        onClick={openModal}
      />

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 max-w-full max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing on image click
          >
            <img
              className="max-w-full max-h-screen object-contain"
              src={formImageURL}
              alt="Request Form Fullscreen"
            />
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 p-2 bg-red-600 text-white rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className="p-5">
        <h2 className="text-xl font-bold text-red-600 mb-1">{bloodGroup} Blood Needed</h2>
        <p className="text-gray-700 font-semibold">Name: <span className="font-normal">{name}</span></p>
        <p className="text-gray-700 font-semibold">Phone: <span className="font-normal">{phone}</span></p>
        <p className="text-gray-700 font-semibold">Address: <span className="font-normal">{address}</span></p>
        <p className="text-gray-700 font-semibold">Note: <span className="font-normal text-red-500">{note}</span></p>
        <p className="text-gray-700 font-semibold">Status: 
          <span className={`ml-2 font-bold ${confirmed ? 'text-green-600' : 'text-yellow-600'}`}>
            {confirmed ? "Confirmed" : "Pending"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default RequestCard;
