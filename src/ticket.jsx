import React, { useRef } from "react";
import Barcode from "react-barcode";
import { FaDownload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import techember from "./assets/Heading.png";
// import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketData = location?.state?.ticket;
  const ticketRef = useRef(null);

  if (!ticketData) {
    return (
      <div className="text-center text-white mt-10">No ticket data found.</div>
    );
  }

  

  // Function to download ticket as image
  const downloadTicket = () => {
    if (ticketRef.current) {
      domtoimage
        .toPng(ticketRef.current) // Use domtoimage.toPng
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "ticket.png";
          link.click();
        })
        .catch(function (error) {
          console.error("Error downloading image:", error);
        });
    }
  };
  return (
    <div ref={ticketRef} className="flex flex-col items-center justify-center min-h-screen bg-[#0E464F] p-8 sm:p-6 md:p-8 text-white w-full">
      <h1 className="text-xl sm:text-2xl font-bold text-center">
        Your Ticket is Booked!
      </h1>

      {/* Ticket Card */}
      <div
        className="bg-[#07373F] p-4 sm:p-6 rounded-lg shadow-lg relative mt-6 border border-gray-700 w-full max-w-md mx-auto"
      >
        {/* Ticket Header */}
        <div className="p-4 rounded-lg text-center">
          <img
            src={techember}
            alt="Techember Fest '25"
            className="w-3/4 mx-auto mb-4"
          />
          <p className="text-sm text-gray-300">
            📍 94 Ahmadu Street, Kaya, Lagos
          </p>
          <p className="text-sm text-gray-300">🗓️ March 15, 2025 | 7:00 PM</p>
        </div>

        {/* User Information */}
        <div className="bg-gradient-to-b from-[#07373F] to-[#0A0C11] p-6 rounded-lg shadow-lg text-center">
          <img
            src={ticketData.avatar}
            alt="User Avatar"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto border border-gray-500 mb-3"
          />
          <h3 className="text-lg font-bold">{ticketData.name}</h3>
          <p className="text-sm text-gray-300">{ticketData.email}</p>
          <p className="text-sm mt-2">
            🎟 Ticket Type: {ticketData.selectedTicket}
          </p>
          <p className="text-sm">
            🎫 Number of Tickets: {ticketData.ticketCount}
          </p>
          {ticketData.specialRequest && (
            <p className="text-sm text-gray-400">
              📝 {ticketData.specialRequest}
            </p>
          )}
        </div>

        {/* Barcode */}
        <div className="mt-4 flex justify-center">
          <div className="bg-white p-2 rounded-md flex flex-col items-center">
            <Barcode
              value="123456789012"
              format="CODE128"
              width={1.5}
              height={50}
            />
            <p className="text-black font-bold tracking-widest mt-2">
              123456789012
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          className="bg-gray-700 px-6 py-2 rounded-md text-white hover:bg-gray-600 w-full sm:w-auto"
          onClick={() => {
            navigate("/", { state: null });
          }}
        >
          Book Another Ticket
        </button>
        <button
          className="bg-blue-500 px-6 py-2 rounded-md text-white flex items-center justify-center gap-2 hover:bg-blue-600 w-full sm:w-auto"
          onClick={downloadTicket}
        >
          <FaDownload /> Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
