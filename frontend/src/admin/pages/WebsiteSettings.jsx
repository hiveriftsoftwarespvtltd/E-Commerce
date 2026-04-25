import { useState } from "react";

export default function WebsiteSettings() {
  // ACTIVE TAB
  const [activeTab, setActiveTab] = useState("general");

  // GENERAL TAB STATE
  const [siteName, setSiteName] = useState("Crockery Store");
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [generalMsg, setGeneralMsg] = useState("");

  // CONTACT TAB STATE
  const [contact, setContact] = useState({
    email: "support@crockerystore.com",
    phone: "+1 234 567 8900",
    address: "123 Main Street, New York, NY 10001",
  });
  const [contactMsg, setContactMsg] = useState("");
  const [errors, setErrors] = useState({});

  // SOCIAL TAB STATE
  const [social, setSocial] = useState({
    facebook: "https://facebook.com/crockerystore",
    instagram: "https://instagram.com/crockerystore",
    twitter: "https://twitter.com/crockerystore",
  });
  const [socialMsg, setSocialMsg] = useState("");

  // PAYMENT TAB STATE
  const [payment, setPayment] = useState({
    stripeKey: "",
    paypalEmail: "",
  });
  const [paymentMsg, setPaymentMsg] = useState("");

  // VALIDATE FIELDS
  const validate = (obj) => {
    let err = {};
    Object.keys(obj).forEach((key) => {
      if (!obj[key].trim()) err[key] = "This field is required";
    });
    return err;
  };

  // ----------------------------------------
  // GENERAL SAVE
  // ----------------------------------------
  const saveGeneral = () => {
    if (!siteName.trim()) {
      setGeneralMsg("Website name is required");
      return;
    }

    setGeneralMsg("Saved successfully ✔");
    setTimeout(() => setGeneralMsg(""), 2000);
  };

  // ----------------------------------------
  // CONTACT SAVE
  // ----------------------------------------
  const saveContact = () => {
    const err = validate(contact);
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    setContactMsg("Saved successfully ✔");
    setTimeout(() => setContactMsg(""), 2000);
  };

  // ----------------------------------------
  // SOCIAL SAVE
  // ----------------------------------------
  const saveSocial = () => {
    const err = validate(social);
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    setSocialMsg("Saved successfully ✔");
    setTimeout(() => setSocialMsg(""), 2000);
  };

  // ----------------------------------------
  // PAYMENT SAVE
  // ----------------------------------------
  const savePayment = () => {
    const err = validate(payment);
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    setPaymentMsg("Saved successfully ✔");
    setTimeout(() => setPaymentMsg(""), 2000);
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* TITLE */}
        <div>
          <h1>Website Settings</h1>
          <p className="text-gray-600">Configure your website settings</p>
        </div>

        {/* -------------------------------------- */}
        {/* TABS */}
        {/* -------------------------------------- */}
        <div className="flex flex-col gap-2 space-y-6">

          {/* TAB BUTTONS */}
          <div
            role="tablist"
            className="bg-muted text-muted-foreground h-9 w-fit items-center rounded-xl p-[3px] flex"
          >
            {["general", "contact", "social", "payment"].map((tab) => (
              <button
                key={tab}
                role="tab"
                onClick={() => setActiveTab(tab)}
                className={`
                  inline-flex h-[calc(100%-1px)] items-center justify-center 
                  gap-1.5 rounded-xl px-2 py-1 text-sm font-medium 
                  transition-all
                  ${activeTab === tab
                    ? "bg-white text-black border"
                    : "text-gray-600"}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* ------------------------------------------------ */}
          {/* GENERAL TAB */}
          {/* ------------------------------------------------ */}
          {activeTab === "general" && (
            <div className="bg-card rounded-xl border">

              <div className="px-6 pt-6 pb-6 space-y-6">
                <h4 className="text-lg font-medium">General Settings</h4>

                {/* WEBSITE NAME */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website Name</label>
                  <input
                    className="border border-gray-300 rounded-md px-3 py-1 h-9 w-full"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>

                {/* LOGO */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      {logo ? (
                        <img
                          src={URL.createObjectURL(logo)}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400">Logo Preview</span>
                      )}
                    </div>

                    <input
                      type="file"
                      onChange={(e) => setLogo(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* FAVICON */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Favicon</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      {favicon ? (
                        <img
                          src={URL.createObjectURL(favicon)}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">Icon</span>
                      )}
                    </div>

                    <input
                      type="file"
                      onChange={(e) => setFavicon(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                {generalMsg && (
                  <p className="text-green-600 text-sm">{generalMsg}</p>
                )}

                <button
                  onClick={saveGeneral}
                  className="bg-black text-white px-4 py-2 rounded-md text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* CONTACT TAB */}
          {/* ------------------------------------------------ */}
          {activeTab === "contact" && (
            <div className="bg-card rounded-xl border px-6 py-6 space-y-4">
              <h4 className="text-lg font-medium">Contact Information</h4>

              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  className="border border-gray-300 rounded-md px-3 py-1 h-9 w-full"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>

              {/* PHONE */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  className="border border-gray-300 rounded-md px-3 py-1 h-9 w-full"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* ADDRESS */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Business Address</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-1 h-9 w-full"
                  value={contact.address}
                  onChange={(e) =>
                    setContact({ ...contact, address: e.target.value })
                  }
                />
                {errors.address && (
                  <p className="text-red-600 text-sm">{errors.address}</p>
                )}
              </div>

              {contactMsg && (
                <p className="text-green-600 text-sm">{contactMsg}</p>
              )}

              <button
                onClick={saveContact}
                className="bg-black text-white px-4 py-2 rounded-md text-sm"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* SOCIAL TAB */}
          {/* ------------------------------------------------ */}
          {activeTab === "social" && (
            <div className="bg-card rounded-xl border px-6 py-6 space-y-4">
              <h4 className="text-lg font-medium">Social Media Links</h4>

              {["facebook", "instagram", "twitter"].map((key) => (
                <div key={key} className="space-y-1">
                  <label className="text-sm font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    className="border border-gray-300 rounded-md px-3 py-1 h-9 w-full"
                    value={social[key]}
                    onChange={(e) =>
                      setSocial({ ...social, [key]: e.target.value })
                    }
                  />
                  {errors[key] && (
                    <p className="text-red-600 text-sm">{errors[key]}</p>
                  )}
                </div>
              ))}

              {socialMsg && (
                <p className="text-green-600 text-sm">{socialMsg}</p>
              )}

              <button
                onClick={saveSocial}
                className="bg-black text-white px-4 py-2 rounded-md text-sm"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* PAYMENT TAB */}
          {/* ------------------------------------------------ */}
          {activeTab === "payment" && (
            <div className="bg-card rounded-xl border px-6 py-6 space-y-4">
              <h4 className="text-lg font-medium">Payment Gateway Settings</h4>

              <div className="space-y-1">
                <label className="text-sm font-medium">Stripe API Key</label>
                <input
                  type="password"
                  className="border border-gray-300 rounded-md px-3 py-1 h-9 w-full"
                  value={payment.stripeKey}
                  onChange={(e) =>
                    setPayment({ ...payment, stripeKey: e.target.value })
                  }
                />
                {errors.stripeKey && (
                  <p className="text-red-600 text-sm">{errors.stripeKey}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">
                  PayPal Business Email
                </label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-1 h-9 w-full"
                  value={payment.paypalEmail}
                  onChange={(e) =>
                    setPayment({ ...payment, paypalEmail: e.target.value })
                  }
                />
                {errors.paypalEmail && (
                  <p className="text-red-600 text-sm">{errors.paypalEmail}</p>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Never share your API keys publicly.
                  Store them securely and use environment variables in
                  production.
                </p>
              </div>

              {paymentMsg && (
                <p className="text-green-600 text-sm">{paymentMsg}</p>
              )}

              <button
                onClick={savePayment}
                className="bg-black text-white px-4 py-2 rounded-md text-sm"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
