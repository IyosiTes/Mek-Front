import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      {/* Close button */}
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <Link to="/" className="text-gray-500 hover:text-gray-800 text-2xl font-bold">
          ×
        </Link>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At Mekwerab, we respect your privacy. We collect only the information necessary
          to provide our services, such as name, email, and shipping details. Your data is
          never sold to third parties.
        </p>
        <p className="mb-4">
          We use your information to process orders, communicate with you, and improve
          your shopping experience.
        </p>
        <p>
          By using our platform, you agree to the collection and use of information in
          accordance with this policy.
        </p>
      </div>
    </div>
  );
}