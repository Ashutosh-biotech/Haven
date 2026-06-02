import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React from "react";

export default function UserLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>


    );
}
