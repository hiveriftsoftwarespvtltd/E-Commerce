import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Pin,
  CreditCard,
  Heart,
} from "lucide-react";
import upi from "../assets/UPI_22.png";
import Visa from "../assets/Visa_22.webp";
import AME from "../assets/AMEx_22.png";
import PayTM from "../assets/PayTM_22.webp";
import Master from "../assets/Master_22.png";

// --- Your logo import ---
import Logo from "../assets/logo11.png"; // change to your logo path

const FooterTape = () => {
  return (
    

    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 py-2 md:h-[100px] mb-[100px] lg:mb-0">
        <img src={Logo} alt="logo" className="w-[150px]" />
        <p className="text-accent font-semibold">© {new Date().getFullYear()}, The Earth Store  in India</p>
        <div className="flex justify-center items-center gap-4">
             <img src={upi} alt="UPI" className="w-10" />
             <img src={PayTM} alt="Paytm" className="w-10" />
             <img src={Visa} alt="Visa" className="w-10" />
             <img src={AME} alt="AMEX" className="w-10" />
             <img src={Master} alt="Mastercard" className="w-10" />
           </div>
    </div>

  );
};



export default FooterTape;
