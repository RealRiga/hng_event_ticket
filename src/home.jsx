import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import techember from "./assets/Heading.png";

export default function Home() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(0);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const isNextDisabled = !selectedTicket || ticketCount === 0;

  const handleCancel = () => {
    setSelectedTicket(null);
    setTicketCount(0);
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setStep((prevStep) => prevStep + 1);
      navigate("/users-details", {
        state: { selectedTicket, ticketCount },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0E464F] p-6 sm:p-8 text-white w-full">
      <div className="bg-[#07373F] p-6 sm:p-8 rounded-lg w-full max-w-lg shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Ticket Selection</h2>
          <span className="text-sm">Step {step}/2</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-700 rounded-md overflow-hidden mb-4">
          <div
            className="h-full bg-[#24A0B5] transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        {/* Event Card */}
        <div className="bg-gradient-radial from-[#07373F] to-[#0A0C11] p-6 text-white rounded-lg shadow-2xl border-[#24A0B5] border-2">
          <div className="text-center">
            <img src={techember} alt="Techember Fest '25" className="w-full max-w-xs mx-auto mb-4" />
            <p className="text-sm text-gray-300">Join us for an unforgettable experience at Techember Fest '25!</p>
            <div className="flex flex-col items-center gap-2 mt-2 text-sm">
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-400" /> March 15, 2025 | 7:00 PM
              </span>
              <span className="flex items-center gap-2">
                📍 94 Ahmadu Street, Kaya, Lagos
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Selection */}
        <p className="text-gray-300 mt-4">Select Ticket Type:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mt-2">
          {[
            { price: "0", type: "Regular ACCESS", icon: <FaTicketAlt /> },
            { price: "250", type: "VIP ACCESS", icon: <FaTicketAlt /> },
            { price: "350", type: "VVIP ACCESS", icon: <FaTicketAlt /> },
          ].map((ticket) => (
            <button
              key={ticket.type}
              className={`p-4 border shadow-2xl rounded-lg text-center transition-all duration-200 flex flex-col items-center gap-1 ${
                selectedTicket === ticket.type
                  ? "bg-[#12464E] border-[#197686] text-white"
                  : "bg-transparent border-[#12464E] text-white"
              }`}
              onClick={() => setSelectedTicket(ticket.type)}
            >
              {ticket.icon}
              <h4 className="font-bold">{ticket.type}</h4>
              <p className="text-sm">${ticket.price}</p>
            </button>
          ))}
        </div>

        {/* Number of Tickets */}
        <p className="text-gray-300 mt-4">Number of Tickets:</p>
        <div className="flex items-center gap-2 mt-2">
          <FaUsers className="text-gray-400" />
          <select
            className="p-2 border rounded-lg w-full bg-[#07373F] text-white"
            value={ticketCount}
            onChange={(e) => setTicketCount(Number(e.target.value))}
          >
            <option value="0">Select</option>
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1} className="bg-white text-black">
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            className="bg-gray-500 text-white w-1/2 py-2 px-6 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`py-2 px-6 rounded-lg w-1/2 transition-all duration-200 ${
              isNextDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-[#24A0B5]"
            }`}
            disabled={isNextDisabled}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
