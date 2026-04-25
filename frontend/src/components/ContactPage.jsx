import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors = {};

    if (form.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email.";

    if (form.phone.trim().length < 10)
      newErrors.phone = "Phone must be at least 10 digits.";

    if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess("Message sent successfully!");
    }
  };

  return (
    <main id="MainContent" className="w-full text-accent">

      {/* Empty spacer */}
      <div className="w-full">
        <div className="container mx-auto pt-8"></div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10">

          {/* MAP LEFT SIDE */}
          <div className="w-full md:w-1/3 mb-6">
            <div className="relative w-full h-[450px] rounded overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.012346033749!2d77.31740734673913!3d28.37302698106527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddd37c2a03b3%3A0xda82744df57e31b9!2sThe%20Earth%20Store!5e0!3m2!1sen!2sin!4v1698564188273!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* FORM RIGHT SIDE */}
          <div className="w-full md:w-2/3 mx-auto">
            <h3 className="text-2xl font-semibold ">
              Drop Us A Line
            </h3>

            <p className="text-lg text-[#858585] mb-6">
              We’re happy to answer any questions you have or provide you with an estimate.
              Just send us a message below.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* NAME */}
              <div>
                <label className="font-medium ">NAME (required)</label>
                <input
                  type="text"
                  placeholder="Please enter your name"
                  className="w-full border border-light-accent-3 bg-light-accent-1 rounded px-3 py-2 focus:ring focus:outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="font-medium ">EMAIL (required)</label>
                <input
                  type="email"
                  placeholder="Please enter your email address"
                  className="w-full border border-light-accent-3 bg-light-accent-1 rounded px-3 py-2 focus:ring focus:outline-none"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* PHONE */}
              <div>
                <label className="font-medium ">PHONE NUMBER (required)</label>
                <input
                  type="tel"
                  placeholder="Please enter your phone number"
                  className="w-full border border-light-accent-3 bg-light-accent-1 rounded px-3 py-2 focus:ring focus:outline-none "
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="font-medium ">YOUR MESSAGE (required)</label>
                <textarea
                  rows="8"
                  placeholder="Please enter your message"
                  className="w-full border border-light-accent-3 bg-light-accent-1 rounded px-3 py-2 focus:ring focus:outline-none resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* SUCCESS MESSAGE */}
              {success && (
                <p className="text-green-600 font-medium">{success}</p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-bold-accent-1 transition cursor-pointer"
              >
                SUBMIT
              </button>

            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-16"></div>
    </main>
  );
};

export default ContactPage;
