import { Outlet } from "react-router-dom";
import Topbar from "../ui/Topbar";
import Footer from "../ui/Footer";

export default function Layout() {
    return (
        <>
        <Topbar />
        <main className="min-h-screen p-0">
            <Outlet />
        </main>
        <Footer />
        </>
    );
}