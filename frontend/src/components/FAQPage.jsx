import React from "react";

const FAQPage = () => {
  return (
    <main id="MainContent" className="w-full text-accent py-10">
      <div className="container mx-auto px-4">

        {/* Page Title */}
        <h1 className="text-center text-3xl font-semibold  mb-10">
          Frequently Asked Questions (FAQs)
        </h1>

        <div className="space-y-10 ">

          {/* SECTION 1 */}
          <div>
            <h2 className="text-xl font-bold ">Where Can I Shop?</h2>

            <div className="mt-4 space-y-3">
              <p className="font-bold">1. Where can I buy The Earth Store products?</p>
              <p className="pl-6 ">
                You can shop exclusively on our website. Simply browse our range of products and 
                place your order online for home delivery.
              </p>
            </div>
          </div>

          {/* SECTION 2 */}
          <div>
            <h2 className="text-xl font-bold ">Manage My Orders</h2>

            <div className="mt-4 space-y-3">
              {/* 1 */}
              <p className="font-bold">
                1. How do I get more information about an item before I place my order?
              </p>
              <p className="pl-6 ">
                In case you have any questions about a product, you can call/WhatsApp us at 
                <strong> +91-9266870168</strong>. You can also email us at{" "}
                <a href="mailto:store4explore@gmail.com" className="underline ">
                  store4explore@gmail.com
                </a>. We will be happy to assist you.
              </p>

              {/* 2 */}
              <p className="font-bold">
                2. Where are you based out of? Do you have a physical store?
              </p>
              <p className="pl-6 ">
                We are headquartered in Faridabad, Haryana and our warehouse is also located in Faridabad.
              </p>

              {/* 3 */}
              <p className="font-bold">3. How do I track the status of my order?</p>
              <p className="pl-6 ">
                As soon as your order has been placed, an email and WhatsApp notification with your 
                order details will be sent to you. You can track the shipment by clicking on the link 
                provided in the message/email.
              </p>

              {/* 4 */}
              <p className="font-bold">4. Do you accept B2B orders for restaurants or businesses?</p>
              <p className="pl-6 ">
                Yes, we accept B2B orders for restaurants, corporate gifting, and other business needs. 
                Please reach out for details on placing bulk orders.
              </p>
            </div>
          </div>

          {/* SECTION 3 */}
          <div>
            <h2 className="text-xl font-bold ">Bulk Orders & Customization</h2>

            <div className="mt-4 space-y-3">
              {/* 1 */}
              <p className="font-bold">
                1. How can I place a Bulk Order through The Earth Store?
              </p>
              <p className="pl-6 ">
                You can share your bulk order query with us via email or WhatsApp. Our team will contact you.
              </p>

              {/* 2 */}
              <p className="font-bold">
                2. How do I contact you for B2B inquiries?
              </p>
              <p className="pl-6 ">
                You can call or WhatsApp us at <strong>+91-9266870168</strong>.
                <br />
                Alternatively, email us at{" "}
                <a href="mailto:store4explore@gmail.com" className="underline ">
                  store4explore@gmail.com
                </a>.
                <br />
                We will be happy to assist you with your B2B inquiries.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default FAQPage;
