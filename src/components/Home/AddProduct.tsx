import { FiPlus } from "react-icons/fi";

export function AddProductCard() {
  const phone = "251964172402";

  return (
    <a
      href={`tel:${phone}`}
      className="
        group
        bg-white
        rounded
        shadow
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* Image Area */}
      <div
        className="
          h-48
          flex
          items-center
          justify-center
          bg-linear-to-br
          from-red-50
          to-red-100
          border-b
        "
      >
        <div
          className="
            w-20
            h-20
            rounded-full
            bg-white
            shadow-md

            flex
            items-center
            justify-center

            group-hover:scale-110
            transition
          "
        >
          <FiPlus
            size={38}
            className="text-red-600"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3">
        <h3 className="text-lg font-semibold text-dgray">
          Add Your Product
        </h3>

        <p className="text-dgray text-sm mt-1">
         ምርት እና አገልግሎትዎን በምኵራብ ገፅ ላይ ለማስተዋወቅ
        </p>

        <span
          className="
            inline-block
            mt-3
            px-3
            py-1
            rounded-full
            bg-bird
            text-red-600
            text-xs
            font-medium
          "
        >
          Contact Us
        </span>
      </div>
    </a>
  );
}