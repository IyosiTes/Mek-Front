import { Outlet } from "react-router-dom";
import Topbar from "../ui/Topbar";
import Footer from "../ui/Footer";
import CommunityButton from "../ui/CommunityButton";

export default function Layout() {
    return (
        <>
        <Topbar />
        <main className="min-h-screen p-0">
            <Outlet />
            <CommunityButton />
        </main>
        <Footer />
        </>
    );
}