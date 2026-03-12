import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return(
<div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-nf to-white text-center px-4"> 
     <h1 className="text-7xl font-extrabold text-[#a83232] tracking-wide"> 404 </h1>
    <p className="mt-4 text-2xl font-semibold text-gray-800"> Page not found </p> 
     <p className="mt-2 text-gray-600 max-w-md"> The page you’re looking for doesn’t exist. Maybe explore our collections or return home. </p> 
    <div className="mt-6 w-full max-w-md"> <input type="text" placeholder="Search products..." className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a83232]" /> 
     </div> 
      <Link to="/" className="mt-6 inline-block px-6 py-3 bg-[#a83232] text-white rounded-lg shadow hover:bg-[#8c2a2a] transition" > Go back home </Link> 
       <div className="mt-10 text-sm text-gray-500 italic"> Inspired by Ethiopian Orthodox heritage • Mek </div>
        </div>
    );
}