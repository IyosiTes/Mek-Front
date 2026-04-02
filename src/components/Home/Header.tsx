import SearchBar from "../ui/SearchBar";


export default function Header() {
    return (
    <header
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-center "
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-2xl px-4 flex flex-col items-center gap-6">
        <h1 className="text-burg font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl mt-9 2xl:text-7xl">
          Welcome
        </h1>
        <p className="text-burg text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl mt-6">
          The first ecommerce platform for Ethiopian Orthodox goods and services
        </p>

        {/* Reusable SearchBar */}
        <SearchBar />
      </div>
    </header>
    );
}