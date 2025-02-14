import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai";
import { FaTicketAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const UsersDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(2);
  const { selectedTicket, ticketCount } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isGetTicketDisabled = !name || !email || !avatar || !specialRequest;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userDetails"));
    if (storedData) {
      setName(storedData.name || "");
      setEmail(storedData.email || "");
      setAvatar(storedData.avatar || "");
      setSpecialRequest(storedData.specialRequest || "");
    }
  }, [location.state]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userDetails"));
    const newData = { name, email, avatar, specialRequest };
    if (JSON.stringify(storedData) !== JSON.stringify(newData)) {
      localStorage.setItem("userDetails", JSON.stringify(newData));
    }
  }, [name, email, avatar, specialRequest]);

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!avatar) errors.avatar = "Profile photo is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadImageToCloudinary = async (file) => {
    if (!file) {
      setFormErrors({ ...formErrors, avatar: "No file selected" });
      toast.error("Please select an image file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setAvatar(data.secure_url);
      setFormErrors({ ...formErrors, avatar: null });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      setFormErrors({ ...formErrors, avatar: "Error uploading image" });
      toast.error(error.message || "Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm() && !isGetTicketDisabled) {
      const ticketData = {
        id: uuidv4(),
        name,
        email,
        avatar,
        specialRequest,
        selectedTicket,
        ticketCount,
      };

      toast.success("Ticket generated successfully!");
      navigate("/tickets", { state: { ticket: ticketData } });
    } else {
      toast.error("Please correct the form errors.");
    }

    setIsSubmitting(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => uploadImageToCloudinary(acceptedFiles[0]),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0E464F] p-6 sm:p-8 text-white w-full">
      <div className="bg-[#07373F] p-8 rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Attendee Details</h2>
          <span className="text-sm">Step {step}/2</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-md overflow-hidden mb-4">
          <div
            className="h-full bg-[#24A0B5] transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>
        <div className="bg-[#07373F] p-6 text-white rounded-lg shadow-lg w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300">
                Upload Profile Photo:
              </label>
              <div
                {...getRootProps()}
                className="border-2 border-[#197686] rounded-lg bg-[#0C525C] p-3 mt-1 cursor-pointer flex items-center justify-center gap-2"
              >
                <input {...getInputProps()} />
                {isUploading ? (
                  <span>Uploading...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    <AiOutlineUpload size={20} />
                    Drag & drop or click to upload
                  </span>
                )}
              </div>
              {formErrors.avatar && (
                <p className="text-red-500 text-sm mt-1">{formErrors.avatar}</p>
              )}
              {avatar && (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="mt-2 rounded-lg w-24 h-24 object-cover mx-auto"
                />
              )}
            </div>

            <label className="block text-gray-300">Enter your name:</label>
            <input
              type="text"
              className="w-full p-2 mt-1 rounded-lg bg-[#0C525C] text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}

            <label className="block text-gray-300">Enter your email:</label>
            <input
              type="email"
              className="w-full p-2 mt-1 rounded-lg bg-[#0C525C] text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}

            <label className="block text-gray-300">Special Request:</label>
            <textarea
              className="w-full p-2 mt-1 rounded-lg bg-[#0C525C] text-white"
              rows="3"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
            ></textarea>

            <div className="block lg:flex justify-between gap-4 mt-6">
              <button
                type="button"
                className="flex items-center gap-2 bg-gray-500 text-white h-1/2 mb-4 py-2 px-6 rounded-lg"
                onClick={() => {
                  localStorage.removeItem("userDetails");
                  setName("");
                  setEmail("");
                  setAvatar("");
                  setSpecialRequest("");
                  navigate(-1, { replace: true });
                }}
              >
                <AiOutlineArrowLeft size={20} /> Back
              </button>
              <button
                type="submit"
                className={`flex items-center gap-2 bg-[#24A0B5] text-white h-1/2 py-2 px-6 rounded-lg ${
                  isGetTicketDisabled
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#24A0B5]"
                }`}
                disabled={isGetTicketDisabled}
              >
                <FaTicketAlt size={20} />
                {isSubmitting ? "Submitting..." : "Get My Ticket"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsersDetails;
