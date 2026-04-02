import { Link } from "react-router-dom"
import { FaUser, FaShoppingCart } from "react-icons/fa"
import { useCart} from "../../hooks/usecart"
import { useAuth } from "../../hooks/useAuth";
import ProfileMenu from "../Home/ProfileMenu";



export default function Topbar() {
  const { user } = useAuth();
  const { data: cart} = useCart();
  return (//w-full flex justify-center  relative mt-6 ,w-[90%] sm:w-[90%] max-w-screen-4xl   flex items-center justify-between px-3 sm:px-4 py-2 rounded-b-xl  shadow-md bg-white
    <div className=" fixed top-0 left-0 w-full flex justify-center z-50 mt-4 ">
      <div className="w-[90%] sm:w-[90%] max-w-screen-4xl flex items-center justify-between px-3 sm:px-4 py-2 rounded-b-xl rounded-t-xl shadow-md bg-ivory">
        
        <Link to="/" className="cursor-pointer italic
                text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl 
                font-medium tracking-tight text-dark">
          Mekwerab
        </Link>

 

            <div className="flex items-center gap-2 sm:gap-5 text-gray-700 
                        text-sm sm:text-lg xl:text-xl 2xl:text-2xl">
       {!user && (   <Link to="/Register" className="px-1 py-0.5 text-xs sm:text-sm xl:text-base 2xl:text-lg 
                      font-light text-white bg-main rounded-2xl hover:bg-Hover transition-colors ">
            Create Account
          </Link>)}

  
        {user ? (
        <ProfileMenu />
          ) : (
      <Link to="/login">
      <FaUser className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 cursor-pointer hover:text-burg transition" />
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



