import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center gap-10">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold tracking-tight"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          Mekwerab
        </Link>

        {/* Tagline */}
        <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
          Follow the flock
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6">
          {[
            { icon: <FaFacebook />, link: "https://www.facebook.com/share/1Ariz3yUd5/" },
            { icon: <FaTelegram />, link: "https://t.me/eymuma" },
            { icon: <FaTwitter />, link: "https://x.com/IyosiTes" },
            { icon: <FaInstagram />, link: "https://www.instagram.com/mekwerab?igsh=cjI2eXJnYWloeGk=" },
            { icon: <FaDiscord />, link: "https://discord.gg/DtWwue6J" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className=" w-12 h-12 flex items-center justify-center border border-gray-500 rounded-full hover:border-white hover:scale-110 transition"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-700" />

        {/* ✅ Copyright ABOVE */}
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Mekwerab. All rights reserved.
        </p>

        {/* Policies BELOW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 text-center">
          <Link to="/Privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link to="/refund" className="hover:text-white">
            Refund Policy
          </Link>
          <Link to="/shipping" className="hover:text-white">
            Shipping Policy
          </Link>
        </div>

      </div>
    </footer>
  );
}
