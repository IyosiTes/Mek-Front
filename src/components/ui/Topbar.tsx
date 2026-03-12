import { Link } from "react-router-dom"
import { FaUser, FaShoppingCart } from "react-icons/fa"
import { NavBarLinks } from "../ui/NavBarLinks";
import { useCart} from "../../hooks/usecart"
import { useAuth } from "../../hooks/useAuth";
import ProfileMenu from "../Home/ProfileMenu";



export default function Topbar() {
  const { user } = useAuth();
  const { data: cart} = useCart();
  return (//w-full flex justify-center  relative mt-6 ,w-[90%] sm:w-[90%] max-w-screen-4xl   flex items-center justify-between px-3 sm:px-4 py-2 rounded-b-xl  shadow-md bg-white
    <div className=" fixed top-0 left-0 w-full flex justify-center z-50 mt-4">
      <div className="w-[90%] sm:w-[90%] max-w-screen-4xl flex items-center justify-between px-3 sm:px-4 py-2 rounded-b-xl rounded-t-xl shadow-md bg-white">
        
        <Link to="/" className="cursor-pointer font-family-logo 
                text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl 
                font-semibold tracking-tight text-gray-900">
          Mekurab
        </Link>

         <nav className="hidden xl:flex gap-8 text-gray-700 text-base xl:text-lg 2xl:text-xl">
                    {NavBarLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="hover:text-Hover transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

            <div className="flex items-center gap-2 sm:gap-5 text-gray-700 
                        text-sm sm:text-lg xl:text-xl 2xl:text-2xl">
          <Link to="/Register" className="px-2 py-1 text-xs sm:text-sm xl:text-base 2xl:text-lg 
                      font-medium text-white bg-main rounded-md hover:bg-Hover transition-colors">
            Create Account
          </Link>
         {/* <Link to="/profile">
          <FaUser className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 cursor-pointer hover:text-Hover transition-colors" />
          </Link>*/}{user ? (
  <ProfileMenu />
) : (
  <Link to="/login">
    <FaUser className="w-5 h-5 cursor-pointer hover:text-Hover transition" />
  </Link>
)}
          <Link to="/cart" className="relative items-center inline-flex">
          <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 cursor-pointer hover:text-Hover transition-colors" />
          { cart && cart.total_items > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cart.total_items}
            </span>
          )}
          </Link>
        </div>
      </div>
    </div>
  );
}
//          <Link to="/about" className="hover:text-Hover transition-colors">About</Link>
     //     <Link to="/contact" className="hover:text-Hover transition-colors">Contact</Link>
     //     <Link to="/privacy" className="hover:text-Hover transition-colors">Privacy Policy</Link>
