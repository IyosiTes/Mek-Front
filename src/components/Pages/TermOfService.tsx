import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <Link to="/" className="text-gray-500 hover:text-gray-800 text-2xl font-bold">
          ×
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to Mekwerab! By using our website, you agree to comply with our terms
          and conditions.
        </p>
        <p className="mb-4">
          Orders placed on Mekwerab are subject to availability and confirmation of the
          order price.
        </p>
        <p className="mb-4">
          You are responsible for providing accurate information and keeping your account
          secure.
        </p>
        <p>
          We reserve the right to refuse service or cancel orders at our discretion.
        </p>
      </div>
    </div>
  );
}