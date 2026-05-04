import React from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  PinIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FOOTER_LINKS = {
  menu: [
    { label: "Household", link: "/products?category=Household" },
    { label: "Gadgets", link: "/products?category=Gadgets" },
    { label: "Gifts", link: "/products?category=Gifts" },
    { label: "Home Decor", link: "/products?category=HomeDecor" },
    { label: "Car Interior", link: "/products?category=CarInterior" },
    { label: "Car Exterior", link: "/products?category=CarExterior" },
    { label: "Accessories", link: "/products?category=Accessories" },
  ],

  support: [
    { label: "Shipping Policy", link: "/ShippingPolicy" },

    { label: "Privacy", link: "/PrivacyPolicy" },
    { label: "Terms of Service", link: "/TermsOfService" },
    { label: "Contact Us", link: "/ContactPage" },
  ],

  social: [
    {
      label: "Facebook",
      link: "https://www.facebook.com/yourstoreforexplore",
      icon: <Facebook size={18} />,
    },

    {
      label: "Instagram",
      link: "https://www.instagram.com/storeforexplore/",
      icon: <Instagram size={18} />,
    },
  ],
};

// --------------------------------------------------------
// FOOTER COMPONENT
// --------------------------------------------------------
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="py-12 bg-light-accent-1 flex justify-center items-center md:pl-40 mt-3">
      <div
        className="w-full max-w-[900px] mx-auto px-5 
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {/* Menu */}
        <div className="text-accent ">
          <h4 className="text-lg font-semibold mb-4 uppercase">Menu</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.menu.map((item, index) => (
              <li
                key={index}
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="text-accent ">
          <h4 className="text-lg font-semibold mb-4 uppercase">Here to help</h4>

          <p className="text-sm mb-3">
            Have a question? You may find an answer in our FAQs.
          </p>

          <p className="flex items-center gap-2">
            <MessageCircle size={18} className="text-accent" />
            <a
              href="https://wa.me/919266870168"
              className="hover:text-blue-500"
            >
              Click to chat
            </a>
          </p>

          <p className="mt-2 flex items-center gap-2">
            <Phone size={18} />
            +91 9266870168
          </p>

          <p className="mt-2 flex items-center gap-2">
            <Mail size={18} />
            <a
              href="mailto:store4explore@gmail.com"
              className="hover:text-blue-500"
            >
              Send us an email
            </a>
          </p>

          <div className="mt-3 flex items-start gap-2 text-sm">
            <Clock size={18} />
            <div>
              <p>Mon–Fri: 10:00 am - 5:00 pm</p>
              <p>Sat: 11:00 am - 4:00 pm</p>
              <p>Sun: Not Available</p>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="text-accent ">
          <h4 className="text-lg font-semibold mb-4 uppercase">Follow us</h4>
          <ul className="space-y-2">
            {FOOTER_LINKS.social.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  target="_blank"
                  className="flex items-center gap-2 hover:text-blue-500"
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
