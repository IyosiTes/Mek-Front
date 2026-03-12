import { Link } from "react-router-dom";
import { NavBarLinks } from "./NavBarLinks";
import { FaFacebook, FaTelegram, FaTwitter,  } from "react-icons/fa";


export default function Footer() {
 return (
   <footer className="w-full bg-main shadow-inner mt-10">
      <div className="max-w-screen-4xl mx-auto px-4 py-8 sm:py-10 md:py-12 xl:py-16 2xl:py-20 flex flex-col md:flex-col items-center justify-center gap-6">
        
        {/* Logo / Branding */}
        <Link to="/" className="font-family-logo xl:items-center md:flex md-items-center text-lg sm:text-xl  md:text-2xl xl:text-3xl 2xl:text-4xl  font-bold text-gray">
          Mekurab
        </Link>

 
            <div className="flex justify-center gap-6 text-gray text-xl md:text-2xl xl:text-3xl">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="hover:text-sky transition-colors" />
      </a>
  
      <a href="https://t.me" target="_blank" rel="noopener noreferrer">
        <FaTelegram className="hover:text-sky transition-colors" />
      </a>
                <a href="https://tw.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="hover:text-dark transition-colors" />
      </a>

    </div>
            {/* Footer navigation links */}
        <nav className="flex    justify-center gap-6 md:9 text-gray text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl">
          {NavBarLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="hover:text-dark transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-gray text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl">
          © {new Date().getFullYear()} Mekurab. All rights reserved.
        </p>
      </div>
    </footer>
 ) ;
}

