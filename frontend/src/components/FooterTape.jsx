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
             {/* <img src={upi} alt="UPI" className="w-10" />
             <img src={PayTM} alt="Paytm" className="w-10" />
             <img src={Visa} alt="Visa" className="w-10" />
             <img src={AME} alt="AMEX" className="w-10" />
             <img src={Master} alt="Mastercard" className="w-10" /> */}
               <img src="https://icon2.cleanpng.com/20180330/qzq/avc3fqk7p.webp" alt="UPI" className="w-10" />
             <img src="https://cdn.iconscout.com/icon/free/png-256/free-paytm-icon-svg-download-png-226448.png" alt="Paytm" className="w-10" />
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXsYt1Q5y_rq7uEJFx_R5M4oIl7vYQiYxpw&s" alt="Visa" className="w-10" />
             <img src="https://w7.pngwing.com/pngs/662/383/png-transparent-amex-payment-method-icon.png" alt="AMEX" className="w-10" />
             <img src="https://e7.pngegg.com/pngimages/910/492/png-clipart-mastercard-logo-credit-card-visa-brand-mastercard-text-label-thumbnail.png" alt="Mastercard" className="w-10" />
             
           </div>
    </div>

  );
};



export default FooterTape;
